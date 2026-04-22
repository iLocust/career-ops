import express from 'express';
import { spawn } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createRequire } from 'module';
const _require = createRequire(import.meta.url);
const pdfParse = _require('pdf-parse');

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENTS_DIR = join(__dirname, 'clients');
const app = express();
const PORT = 3131;

app.use(express.json({ limit: '2mb' }));
app.use(express.static(join(__dirname, 'public')));

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/parse-pdf', upload.single('pdf'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file uploaded' });
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (e) {
    res.status(422).json({ error: 'failed to parse PDF: ' + e.message });
  }
});

function readFileIfExists(p) {
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
}

function slugify(name) {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'client';
}

function listClients() {
  if (!existsSync(CLIENTS_DIR)) return [];
  return readdirSync(CLIENTS_DIR)
    .filter(n => !n.startsWith('_') && !n.startsWith('.'))
    .filter(n => statSync(join(CLIENTS_DIR, n)).isDirectory())
    .map(slug => {
      const metaPath = join(CLIENTS_DIR, slug, 'meta.json');
      let name = slug;
      if (existsSync(metaPath)) {
        try { name = JSON.parse(readFileSync(metaPath, 'utf8')).name || slug; } catch {}
      }
      return { slug, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getClient(slug) {
  const dir = join(CLIENTS_DIR, slug);
  if (!existsSync(dir)) return null;
  const metaPath = join(dir, 'meta.json');
  let name = slug;
  if (existsSync(metaPath)) {
    try { name = JSON.parse(readFileSync(metaPath, 'utf8')).name || slug; } catch {}
  }
  return {
    slug,
    name,
    cv: readFileIfExists(join(dir, 'cv.md')),
    profile: readFileIfExists(join(dir, 'profile.md')),
  };
}

function ensureClientDir(slug) {
  const dir = join(CLIENTS_DIR, slug);
  mkdirSync(dir, { recursive: true });
  mkdirSync(join(dir, 'reports'), { recursive: true });
  return dir;
}

function nextReportNumber(clientDir) {
  const reportsDir = join(clientDir, 'reports');
  if (!existsSync(reportsDir)) return 1;
  const nums = readdirSync(reportsDir)
    .map(f => parseInt(f.split('-')[0], 10))
    .filter(n => !isNaN(n));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

function buildPrompt(mode, cv, jd, extraContext, clientProfile) {
  const shared = readFileIfExists(join(__dirname, 'modes/_shared.md'));
  const profile = clientProfile
    || readFileIfExists(join(__dirname, 'modes/_profile.md'))
    || readFileIfExists(join(__dirname, 'modes/_profile.template.md'));

  let modeInstructions = '';
  if (mode === 'evaluate') modeInstructions = readFileIfExists(join(__dirname, 'modes/oferta.md'));
  else if (mode === 'compare') modeInstructions = readFileIfExists(join(__dirname, 'modes/ofertas.md'));
  else if (mode === 'interview') modeInstructions = readFileIfExists(join(__dirname, 'modes/interview-prep.md'));

  return [
    '# System Context', shared,
    '# Candidate Profile', profile,
    '# Candidate CV', cv,
    '# Mode Instructions', modeInstructions,
    '# Task', extraContext || '',
    jd ? `# Job Description / Input\n${jd}` : '',
  ].filter(Boolean).join('\n\n');
}

// ---------- Client management ----------

app.get('/api/clients', (_req, res) => {
  res.json(listClients());
});

app.get('/api/clients/:slug', (req, res) => {
  const c = getClient(req.params.slug);
  if (!c) return res.status(404).json({ error: 'client not found' });
  res.json(c);
});

app.post('/api/clients', (req, res) => {
  const { name, cv, profile } = req.body || {};
  if (!name || !cv) return res.status(400).json({ error: 'name and cv are required' });

  let slug = slugify(name);
  if (existsSync(join(CLIENTS_DIR, slug))) {
    let i = 2;
    while (existsSync(join(CLIENTS_DIR, `${slug}-${i}`))) i++;
    slug = `${slug}-${i}`;
  }

  const dir = ensureClientDir(slug);
  writeFileSync(join(dir, 'cv.md'), cv);
  const profileContent = profile && profile.trim()
    ? profile
    : readFileIfExists(join(CLIENTS_DIR, '_template', 'profile.md'))
      || readFileIfExists(join(__dirname, 'modes/_profile.template.md'));
  writeFileSync(join(dir, 'profile.md'), profileContent);
  writeFileSync(join(dir, 'meta.json'), JSON.stringify({ name, createdAt: new Date().toISOString() }, null, 2));

  res.json({ slug, name });
});

app.put('/api/clients/:slug', (req, res) => {
  const { slug } = req.params;
  const dir = join(CLIENTS_DIR, slug);
  if (!existsSync(dir)) return res.status(404).json({ error: 'client not found' });
  const { cv, profile } = req.body || {};
  if (typeof cv === 'string') writeFileSync(join(dir, 'cv.md'), cv);
  if (typeof profile === 'string') writeFileSync(join(dir, 'profile.md'), profile);
  res.json({ ok: true });
});

app.delete('/api/clients/:slug', (req, res) => {
  const { slug } = req.params;
  const dir = join(CLIENTS_DIR, slug);
  if (!existsSync(dir)) return res.status(404).json({ error: 'client not found' });
  rmSync(dir, { recursive: true, force: true });
  res.json({ ok: true });
});

// ---------- Reports ----------

app.get('/api/clients/:slug/reports', (req, res) => {
  const { slug } = req.params;
  const dir = join(CLIENTS_DIR, slug);
  if (!existsSync(dir)) return res.status(404).json({ error: 'client not found' });
  const reportsDir = join(dir, 'reports');
  if (!existsSync(reportsDir)) return res.json([]);
  const files = readdirSync(reportsDir)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a))
    .map(f => {
      const raw = readFileIfExists(join(reportsDir, f));
      const scoreMatch = raw.match(/\*\*Score:\*\*\s*([\d.]+)/);
      const legitMatch = raw.match(/\*\*Legitimacy:\*\*\s*([^\n]+)/);
      return {
        filename: f,
        score: scoreMatch ? scoreMatch[1] : null,
        legitimacy: legitMatch ? legitMatch[1].trim() : null,
      };
    });
  res.json(files);
});

app.get('/api/clients/:slug/reports/:filename', (req, res) => {
  const { slug, filename } = req.params;
  const filePath = join(CLIENTS_DIR, slug, 'reports', filename);
  if (!existsSync(filePath)) return res.status(404).json({ error: 'report not found' });
  res.type('text/plain').send(readFileSync(filePath, 'utf8'));
});

// ---------- Evaluate (SSE stream) ----------

app.post('/api/evaluate', (req, res) => {
  const { mode, cv, jd, company, role, clientId } = req.body;

  if (!mode || !cv) {
    return res.status(400).json({ error: 'mode and cv are required' });
  }

  let clientProfile = null;
  let clientDir = null;
  if (clientId) {
    const c = getClient(clientId);
    if (!c) return res.status(404).json({ error: 'client not found' });
    clientProfile = c.profile;
    clientDir = join(CLIENTS_DIR, clientId);
  }

  let extraContext = '';
  if (mode === 'interview') {
    if (!company || !role) return res.status(400).json({ error: 'company and role required for interview mode' });
    extraContext = `Prepare interview intel for: ${company} — ${role}`;
  }

  const prompt = buildPrompt(mode, cv, jd, extraContext, clientProfile);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);
  };

  send('status', 'Claude is thinking...');

  const proc = spawn('claude', [
    '-p',
    '--output-format', 'stream-json',
    '--verbose',
    '--dangerously-skip-permissions',
    '--model', 'haiku',
    '--effort', 'low',
    '--tools', 'WebSearch,WebFetch',
  ], {
    cwd: __dirname,
    env: { ...process.env },
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  proc.stdin.on('error', () => {});
  proc.stdin.write(prompt);
  proc.stdin.end();

  let buffer = '';
  let sawAssistantText = false;
  let lastResult = '';
  let fullText = '';

  proc.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'assistant' && Array.isArray(obj.message?.content)) {
          for (const block of obj.message.content) {
            if (block.type === 'text' && block.text) {
              sawAssistantText = true;
              fullText += block.text;
              send('text', block.text);
            }
          }
        }
        if (obj.type === 'result') {
          if (obj.is_error) send('error', obj.result || 'claude returned is_error=true');
          else if (obj.result) lastResult = obj.result;
        }
      } catch { /* non-JSON line, ignore */ }
    }
  });

  proc.stderr.on('data', (chunk) => {
    const msg = chunk.toString();
    if (msg.includes('Error:') || msg.includes('error:')) {
      send('error', msg.trim());
    }
  });

  proc.on('exit', (code, sig) => {
    if (!sawAssistantText && lastResult) {
      fullText = lastResult;
      send('text', lastResult);
    }
    if (!sawAssistantText && !lastResult && code !== 0) {
      send('error', `claude exited with code ${code}${sig ? ' (signal ' + sig + ')' : ''}`);
    }
  });

  proc.stdout.on('end', () => {
    if (buffer.trim()) {
      try {
        const obj = JSON.parse(buffer);
        if (obj.type === 'assistant' && Array.isArray(obj.message?.content)) {
          for (const block of obj.message.content) {
            if (block.type === 'text' && block.text) {
              fullText += block.text;
              send('text', block.text);
            }
          }
        }
      } catch { /* ignore */ }
    }

    // Save report to client folder
    if (clientDir && fullText.trim()) {
      try {
        const num = String(nextReportNumber(clientDir)).padStart(3, '0');
        const date = new Date().toISOString().slice(0, 10);
        const companySlug = (company ? slugify(company) : mode) || 'report';
        const filename = `${num}-${companySlug}-${date}.md`;
        const header = [
          `# ${company || 'Report'} — ${mode}`,
          `**Date:** ${date}`,
          company ? `**Company:** ${company}` : '',
          role ? `**Role:** ${role}` : '',
          '---',
        ].filter(Boolean).join('\n');
        writeFileSync(join(clientDir, 'reports', filename), header + '\n\n' + fullText + '\n');
        send('saved', `clients/${clientId}/reports/${filename}`);
      } catch (e) {
        send('error', `save failed: ${e.message}`);
      }
    }

    send('done', '');
    res.end();
  });

  res.on('close', () => {
    if (!res.writableEnded) proc.kill();
  });
});

// ---------- Health ----------

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    clientsCount: listClients().length,
    sharedMode: existsSync(join(__dirname, 'modes/_shared.md')),
  });
});

app.listen(PORT, () => {
  console.log(`\n  career-ops web UI`);
  console.log(`  → http://localhost:${PORT}\n`);
});
