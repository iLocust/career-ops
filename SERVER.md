# career-ops Web Server

`server.mjs` menjalankan web UI lokal untuk career-ops di `http://localhost:3131`.

## Menjalankan Server

```bash
node server.mjs
```

Server berjalan di port `3131`. Tidak ada konfigurasi tambahan yang diperlukan — cukup pastikan `modes/` dan `clients/` ada di direktori yang sama.

---

## Struktur

```
career-ops/
├── server.mjs          # Express server
├── public/
│   └── index.html      # Web UI (single-page)
└── clients/
    └── {slug}/
        ├── meta.json   # { name, createdAt }
        ├── cv.md       # CV klien
        ├── profile.md  # Profile/preferensi klien
        └── reports/    # Laporan evaluasi tersimpan
```

---

## Web UI

Antarmuka dua-panel dengan dark theme:

**Panel Kiri — Input**
- **Client selector** — pilih klien atau mode ad-hoc (tanpa klien)
- **Mode tabs** — tiga mode analisis
- **Form input** — fields menyesuaikan mode yang dipilih
- **Run button** — kirim ke Claude dan streaming hasilnya

**Panel Kanan — Output**
- Streaming markdown yang di-render secara real-time
- Status pill: `idle` / `running` / `done` / `error`
- Tombol copy untuk menyalin hasil

### Mode

| Mode | Fungsi | Fields |
|------|--------|--------|
| **Evaluate** | Evaluasi satu job offer (A-F scoring) | CV, Company, Job Description |
| **Compare** | Bandingkan beberapa JD sekaligus | CV, multiple JDs (dipisah `---`) |
| **Interview** | Siapkan intel interview | CV, Company, Role, JD (opsional) |

---

## API Endpoints

### `GET /api/health`
Status server.

```json
{ "ok": true, "clientsCount": 3, "sharedMode": true }
```

---

### `GET /api/clients`
Daftar semua klien.

```json
[{ "slug": "budi-surya", "name": "Budi Surya" }]
```

---

### `GET /api/clients/:slug`
Detail satu klien.

```json
{
  "slug": "budi-surya",
  "name": "Budi Surya",
  "cv": "# Budi Surya\n...",
  "profile": "## Archetypes\n..."
}
```

---

### `POST /api/clients`
Buat klien baru. `name` dan `cv` wajib diisi.

**Request:**
```json
{
  "name": "Budi Surya",
  "cv": "# Budi Surya\n...",
  "profile": "optional notes..."
}
```

**Response:**
```json
{ "slug": "budi-surya", "name": "Budi Surya" }
```

Jika `profile` dikosongkan, server menggunakan `clients/_template/profile.md` atau `modes/_profile.template.md` sebagai default.

---

### `PUT /api/clients/:slug`
Update CV dan/atau profile klien.

**Request:**
```json
{ "cv": "updated CV...", "profile": "updated profile..." }
```

---

### `POST /api/evaluate`
Jalankan evaluasi. Streaming SSE (`text/event-stream`).

**Request body:**

| Field | Wajib | Keterangan |
|-------|-------|------------|
| `mode` | ✅ | `evaluate`, `compare`, atau `interview` |
| `cv` | ✅ | Teks CV kandidat |
| `jd` | — | Job description atau URL |
| `company` | — | Nama perusahaan (untuk nama file report) |
| `role` | — | Judul peran (wajib di mode `interview`) |
| `clientId` | — | Slug klien (jika ada, report disimpan otomatis) |

**SSE Events:**

| type | Isi `data` | Keterangan |
|------|-----------|------------|
| `status` | string | Pesan status awal ("Claude is thinking...") |
| `text` | string | Potongan teks markdown dari Claude |
| `saved` | path | Path file report yang tersimpan |
| `error` | string | Pesan error |
| `done` | `""` | Evaluasi selesai |

**Contoh konsumsi SSE:**
```js
const res = await fetch('/api/evaluate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mode: 'evaluate', cv: '...', jd: '...' }),
});
const reader = res.body.getReader();
// baca stream line per line, parse JSON setiap event
```

---

## Manajemen Klien

Setiap klien disimpan sebagai folder di `clients/{slug}/`. Slug digenerate otomatis dari nama (lowercase, alphanumeric, max 40 karakter).

Report otomatis tersimpan jika `clientId` dikirim saat evaluasi:
- Format nama file: `{###}-{company-slug}-{YYYY-MM-DD}.md`
- Disimpan di: `clients/{slug}/reports/`

**Template klien:** Buat folder `clients/_template/profile.md` sebagai default profile untuk klien baru.

---

## Bagaimana Evaluasi Bekerja

1. Server membaca `modes/_shared.md`, `modes/_profile.md` (atau profile klien), dan file mode yang sesuai (`modes/oferta.md`, `modes/ofertas.md`, `modes/interview-prep.md`)
2. Semua digabung menjadi satu prompt
3. Claude CLI dijalankan via `spawn('claude', [...])` dengan flag:
   - `--output-format stream-json` — streaming JSON line per line
   - `--model haiku --effort low` — cepat dan hemat token
   - `--tools WebSearch,WebFetch` — Claude bisa fetch URL jika dibutuhkan
4. Output di-stream ke client via SSE
5. Setelah selesai, jika ada `clientId`, report disimpan ke disk

---

## Catatan

- Server hanya berjalan lokal — tidak ada autentikasi
- Batas payload request: 2MB
- Claude CLI harus sudah terinstall dan terautentikasi di sistem
- File di `public/` di-serve sebagai static files
