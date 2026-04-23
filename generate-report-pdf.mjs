#!/usr/bin/env node

/**
 * generate-report-pdf.mjs — Convert report .md files to PDF via Playwright
 *
 * Usage:
 *   node generate-report-pdf.mjs <input.md> [output.pdf]
 *   node generate-report-pdf.mjs clients/dimas-alexandra/reports/006-ms-glow-clinic.md
 *
 * Strips AI "thinking" preamble text before rendering.
 * Output defaults to same directory as input, same name with .pdf extension.
 */

import { chromium } from 'playwright';
import { resolve, dirname, basename, extname } from 'path';
import { readFile, writeFile, mkdirSync } from 'fs';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Remove AI "thinking" preamble lines from report markdown.
 *
 * These are conversational sentences the model emits before the actual report
 * content — e.g. "I'll evaluate this posting. Let me first check..." They appear
 * before the first real heading (## or ###) or structured content (| table |).
 *
 * Strategy:
 * 1. Split into lines
 * 2. Find the first "anchor" line — a line that is part of the real report:
 *    - A markdown heading (##, ###)
 *    - A table row (|)
 *    - A horizontal rule (---) that follows content (not preamble separator)
 *    - A bold label (**Label:**)
 *    - But NOT the very first # heading (that's the title, keep it)
 * 3. Within header block (before first ---), only strip lines that look like
 *    prose sentences emitted by the AI, not structured metadata.
 */
function stripThinkingText(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let inHeader = true; // first section before first ---
  let headerDone = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (inHeader && !headerDone) {
      // Detect end of header block
      if (trimmed === '---' && i > 0) {
        headerDone = true;
        inHeader = false;
        result.push(line);
        continue;
      }

      // Keep structured header lines: headings, bold metadata, empty lines
      if (
        trimmed === '' ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('**') ||
        trimmed.startsWith('- ') ||
        trimmed.startsWith('* ')
      ) {
        result.push(line);
        continue;
      }

      // This is prose text in the header — skip it (AI thinking)
      continue;
    }

    // After header: strip inline thinking text that appears between structured content.
    // Pattern: a non-empty line that doesn't start with any markdown structural character,
    // is followed or preceded by structured content, and reads like a sentence.
    // We detect "thinking lines" as lines that:
    //   - Don't start with #, |, -, *, >, `, ~, or whitespace (code indent)
    //   - End with punctuation that suggests a sentence (".", ":", "!")
    //   - AND match known AI preamble patterns
    if (isThinkingLine(trimmed)) {
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

/**
 * Heuristic: is this line AI "thinking" prose that should be removed?
 * Only catches high-confidence cases to avoid false positives on real content.
 */
function isThinkingLine(trimmed) {
  if (!trimmed) return false;
  // Must not be a structural markdown line
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('|') ||
    trimmed.startsWith('-') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('>') ||
    trimmed.startsWith('`') ||
    trimmed.startsWith('~') ||
    trimmed.startsWith('!') ||
    trimmed.startsWith('[') ||
    trimmed.startsWith('**') ||
    /^\d+\./.test(trimmed) // ordered list
  ) return false;

  // Known AI preamble patterns (high-confidence, won't false-positive on report content)
  const patterns = [
    /^I'll\s/i,
    /^I will\s/i,
    /^Let me\s/i,
    /^Now I'll\s/i,
    /^Now let me\s/i,
    /^I've scored\s/i,
    /^I've analyzed\s/i,
    /^I've prepared\s/i,
    /^I've compiled\s/i,
    /^Based on (the|my|your)\s/i,
    /^Here('s| is) (the|my|your|a)\s/i,
    /^Let's (start|begin|look|check)\s/i,
  ];

  return patterns.some(p => p.test(trimmed));
}

function buildHtml(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a1a;
    background: #fff;
    padding: 0;
  }

  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 4px;
  }

  h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 6px;
  }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 20px;
    margin-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
  }

  h3 {
    font-size: 11.5pt;
    font-weight: 600;
    color: #334155;
    margin-top: 14px;
    margin-bottom: 6px;
  }

  h4 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #475569;
    margin-top: 10px;
    margin-bottom: 4px;
  }

  p {
    margin-bottom: 8px;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 8px;
  }

  li {
    margin-bottom: 3px;
  }

  li > ul, li > ol {
    margin-top: 3px;
    margin-bottom: 3px;
  }

  strong { font-weight: 600; }
  em { font-style: italic; }

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 16px 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 10pt;
    page-break-inside: avoid;
  }

  th {
    background: #f1f5f9;
    color: #1e293b;
    font-weight: 600;
    text-align: left;
    padding: 6px 10px;
    border: 1px solid #cbd5e1;
  }

  td {
    padding: 5px 10px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Code */
  code {
    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 9.5pt;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
  }

  pre {
    background: #f1f5f9;
    padding: 10px 14px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 10px;
  }

  pre code {
    background: none;
    padding: 0;
  }

  /* Blockquote */
  blockquote {
    border-left: 3px solid #94a3b8;
    padding-left: 12px;
    color: #475569;
    margin: 10px 0;
    font-style: italic;
  }

  /* Score / badge callout */
  .score-badge {
    display: inline-block;
    background: #0f172a;
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 10pt;
  }

  /* Print */
  @media print {
    body { background: #fff; }
    .page { max-width: 100%; padding: 0; }
    table { page-break-inside: avoid; }
    h2, h3 { page-break-after: avoid; }
  }
</style>
</head>
<body>
<div class="page">
${body}
</div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: node generate-report-pdf.mjs <input.md> [output.pdf]');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-report-pdf.mjs clients/dimas-alexandra/reports/006-ms-glow-clinic-2026-04-22.md');
    console.log('  node generate-report-pdf.mjs reports/001-busana-2026-04-22.md output/busana-report.pdf');
    process.exit(0);
  }

  const inputPath = resolve(args[0]);
  const outputPath = args[1]
    ? resolve(args[1])
    : resolve(dirname(inputPath), basename(inputPath, extname(inputPath)) + '.pdf');

  // Read markdown
  let raw;
  try {
    raw = await readFileAsync(inputPath, 'utf-8');
  } catch (e) {
    console.error(`❌ Cannot read file: ${inputPath}`);
    process.exit(1);
  }

  // Strip AI thinking text
  const cleaned = stripThinkingText(raw);
  const strippedLines = raw.split('\n').length - cleaned.split('\n').length;
  if (strippedLines > 0) {
    console.log(`🧹 Stripped ${strippedLines} thinking lines`);
  }

  // Extract title from first H1
  const titleMatch = cleaned.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : basename(inputPath, '.md');

  // Convert markdown to HTML
  const { marked } = await import('marked');
  const body = marked.parse(cleaned);
  const html = buildHtml(title, body);

  // Render to PDF with Playwright
  console.log(`📄 Input:  ${inputPath}`);
  console.log(`📁 Output: ${outputPath}`);

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0.7in', right: '0.7in', bottom: '0.7in', left: '0.7in' },
    });

    await writeFileAsync(outputPath, pdfBuffer);

    const pdfString = pdfBuffer.toString('latin1');
    const pageCount = (pdfString.match(/\/Type\s*\/Page[^s]/g) || []).length;

    console.log(`✅ PDF generated: ${outputPath}`);
    console.log(`📊 Pages: ${pageCount} | Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
