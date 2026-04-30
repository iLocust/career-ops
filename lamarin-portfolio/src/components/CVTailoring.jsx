import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const examples = [
  {
    tab: 'IT / Dev',
    candidate: { name: 'Rizky Firmansyah', location: 'Surabaya', email: 'rizky@email.com', phone: '0812-3456-7890' },
    jd: {
      role: 'Frontend Developer',
      company: 'PT Teknologi Nusantara',
      badge: 'Tech / Startup',
      requirements: [
        'React.js & TypeScript (min 1 thn)',
        'Integrasi REST API',
        'Git & workflow Agile/Scrum',
        'Komunikasi lintas tim',
      ],
    },
    before: {
      title: 'Web Developer',
      summary: 'Pengembang web dengan pengalaman 2 tahun menggunakan HTML, CSS, dan JavaScript. Pernah mengerjakan beberapa proyek kecil untuk klien perusahaan.',
      expTitle: 'Web Developer',
      expCompany: 'PT ABC Solusi Digital',
      expPeriod: '2022 – kini',
      bullets: [
        'Membuat halaman web untuk klien perusahaan',
        'Membantu tim dengan berbagai tugas coding',
        'Menjaga agar website tetap berjalan dengan baik',
      ],
      skills: 'HTML, CSS, JavaScript, PHP, Bootstrap, jQuery',
    },
    after: {
      title: 'Frontend Developer',
      summary: [
        { t: 'Frontend Developer', h: true },
        { t: ' berpengalaman 2 tahun membangun antarmuka modern dengan ', h: false },
        { t: 'React.js & TypeScript', h: true },
        { t: '. Terbiasa ', h: false },
        { t: 'integrasi REST API', h: true },
        { t: ' dan kolaborasi tim lintas fungsi via ', h: false },
        { t: 'Git & Agile', h: true },
        { t: '.', h: false },
      ],
      expTitle: 'Web Developer',
      expCompany: 'PT ABC Solusi Digital',
      expPeriod: '2022 – kini',
      bullets: [
        [
          { t: 'Membangun UI komponen dengan ', h: false },
          { t: 'React.js & TypeScript', h: true },
          { t: ' untuk 3 produk SaaS dengan 500+ pengguna aktif', h: false },
        ],
        [
          { t: 'Mengintegrasikan ', h: false },
          { t: 'REST API', h: true },
          { t: ' backend ke frontend, memotong waktu load halaman 40%', h: false },
        ],
        [
          { t: 'Berkolaborasi dalam sprint ', h: false },
          { t: 'Agile', h: true },
          { t: ' 2-minggu menggunakan ', h: false },
          { t: 'Git', h: true },
          { t: ' (GitFlow) bersama 5 anggota tim', h: false },
        ],
      ],
      skills: [
        { t: 'React.js', h: true }, { t: 'TypeScript', h: true }, { t: 'REST API', h: true },
        { t: 'Git', h: true }, { t: 'JavaScript', h: false }, { t: 'HTML/CSS', h: false },
        { t: 'Bootstrap', h: false },
      ],
    },
    changes: [
      'Judul diubah ke "Frontend Developer" sesuai posisi lowongan',
      'Bullet diubah dari task biasa ke achievement bermetrik',
      'Skills diurutkan: keyword lowongan (React, TypeScript) duluan',
    ],
  },
  {
    tab: 'Finance',
    candidate: { name: 'Dewi Anggraeni', location: 'Bandung', email: 'dewi.anggraeni@gmail.com', phone: '0813-5678-9012' },
    jd: {
      role: 'Staff Akunting',
      company: 'PT Solusi Keuangan',
      badge: 'Keuangan / Manufaktur',
      requirements: [
        'Laporan keuangan bulanan',
        'Rekonsiliasi bank & jurnal umum',
        'Perpajakan PPh 21/23',
        'Pengalaman akuntansi 1+ tahun',
      ],
    },
    before: {
      title: 'Staff Administrasi',
      summary: 'Lulusan Akuntansi dengan pengalaman kerja di bidang administrasi umum. Pernah magang selama 3 bulan di perusahaan distribusi. Teliti dan cepat belajar.',
      expTitle: 'Staff Administrasi',
      expCompany: 'CV Maju Bersama',
      expPeriod: '2023 – kini',
      bullets: [
        'Mengurus administrasi harian kantor',
        'Membuat laporan bulanan untuk atasan',
        'Mengelola dokumen dan arsip perusahaan',
      ],
      skills: 'Microsoft Excel, Microsoft Word, Google Sheets, email',
    },
    after: {
      title: 'Staff Akunting',
      summary: [
        { t: 'Staff Akunting', h: true },
        { t: ' dengan pengalaman 1+ tahun dalam ', h: false },
        { t: 'penyusunan laporan keuangan', h: true },
        { t: ' dan ', h: false },
        { t: 'rekonsiliasi bank', h: true },
        { t: '. Familiar dengan prosedur ', h: false },
        { t: 'perpajakan PPh 21/23', h: true },
        { t: ' dan jurnal umum perusahaan distribusi.', h: false },
      ],
      expTitle: 'Staff Administrasi',
      expCompany: 'CV Maju Bersama',
      expPeriod: '2023 – kini',
      bullets: [
        [
          { t: 'Menyusun ', h: false },
          { t: 'laporan keuangan bulanan', h: true },
          { t: ' (neraca & laba rugi) untuk 2 divisi perusahaan', h: false },
        ],
        [
          { t: 'Melakukan ', h: false },
          { t: 'rekonsiliasi bank', h: true },
          { t: ' & membuat ', h: false },
          { t: 'jurnal umum', h: true },
          { t: ' dengan zero error selama 12 bulan berturut-turut', h: false },
        ],
        [
          { t: 'Membantu pelaporan ', h: false },
          { t: 'PPh 21/23', h: true },
          { t: ' dan koordinasi dengan konsultan pajak eksternal', h: false },
        ],
      ],
      skills: [
        { t: 'Laporan Keuangan', h: true }, { t: 'Rekonsiliasi Bank', h: true },
        { t: 'PPh 21/23', h: true }, { t: 'Jurnal Umum', h: true },
        { t: 'Microsoft Excel', h: false }, { t: 'Google Sheets', h: false },
      ],
    },
    changes: [
      '"Staff Admin" diposisikan ulang sebagai "Staff Akunting"',
      'Pengalaman magang 3 bln diubah ke 1+ tahun relevan nyata',
      'Keahlian pajak yang tersembunyi digali dan disorot',
    ],
  },
  {
    tab: 'Marketing',
    candidate: { name: 'Bagas Prasetyo', location: 'Jakarta', email: 'bagas.p@gmail.com', phone: '0857-2345-6789' },
    jd: {
      role: 'Digital Marketing Specialist',
      company: 'PT Brand Nusantara',
      badge: 'Consumer / FMCG',
      requirements: [
        'Kampanye Meta Ads & Google Ads',
        'Analisis ROAS, CTR, CPA',
        'Pembuatan konten & copywriting',
        'Target audience research',
      ],
    },
    before: {
      title: 'Content Creator',
      summary: 'Content creator dengan pengalaman kelola media sosial brand lokal. Suka desain dan bikin konten yang menarik. Berpengalaman di Instagram dan TikTok.',
      expTitle: 'Content Creator Freelance',
      expCompany: 'Berbagai Brand Lokal',
      expPeriod: '2022 – kini',
      bullets: [
        'Membuat konten untuk Instagram dan TikTok',
        'Boost postingan dengan budget kecil',
        'Bikin caption dan desain grafis untuk feed',
      ],
      skills: 'Instagram, TikTok, Canva, CapCut, Photoshop',
    },
    after: {
      title: 'Digital Marketing Specialist',
      summary: [
        { t: 'Digital Marketing Specialist', h: true },
        { t: ' dengan 2+ tahun pengalaman mengelola ', h: false },
        { t: 'kampanye Meta Ads', h: true },
        { t: ' untuk brand consumer. Terbiasa menganalisis ', h: false },
        { t: 'ROAS, CTR, & CPA', h: true },
        { t: ' untuk optimasi ', h: false },
        { t: 'target audience', h: true },
        { t: ' dan konversi.', h: false },
      ],
      expTitle: 'Digital Marketing Specialist Freelance',
      expCompany: 'Berbagai Brand Lokal',
      expPeriod: '2022 – kini',
      bullets: [
        [
          { t: 'Mengelola ', h: false },
          { t: 'kampanye Meta Ads', h: true },
          { t: ' dengan budget Rp 5–20 juta/bulan, rata-rata ', h: false },
          { t: 'ROAS 3.2x', h: true },
        ],
        [
          { t: 'Menganalisis ', h: false },
          { t: 'CTR & CPA', h: true },
          { t: ' tiap kampanye untuk optimasi ', h: false },
          { t: 'target audience', h: true },
          { t: ' dan jadwal tayang iklan', h: false },
        ],
        [
          { t: 'Memproduksi ', h: false },
          { t: 'copywriting', h: true },
          { t: ' dan visual konten untuk 10+ brand FMCG, total reach 2M+ impression', h: false },
        ],
      ],
      skills: [
        { t: 'Meta Ads', h: true }, { t: 'Google Ads', h: true }, { t: 'ROAS / CTR / CPA', h: true },
        { t: 'Copywriting', h: true }, { t: 'Canva', h: false }, { t: 'CapCut', h: false }, { t: 'Photoshop', h: false },
      ],
    },
    changes: [
      '"Content Creator" diposisikan ulang ke "Digital Marketing Specialist"',
      'Budget & metrik nyata (ROAS 3.2x) ditambahkan untuk credibility',
      'Platform iklan (Meta Ads, Google Ads) disorot di semua section',
    ],
  },
]

export default function CVTailoring() {
  const [ref, inView] = useInView()
  const [activeTab, setActiveTab] = useState(0)
  const [fading, setFading] = useState(false)

  const switchTab = (i) => {
    if (i === activeTab) return
    setFading(true)
    setTimeout(() => { setActiveTab(i); setFading(false) }, 280)
  }

  const ex = examples[activeTab]

  return (
    <section id="cv-tailoring" className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div ref={ref} className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-5">
            CV Tailoring
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05]">
              1 CV, banyak lowongan —<br />
              <span className="text-orange-500">banyak CV yang beda.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-[34ch] text-left md:text-right leading-relaxed">
              Kirim CV-mu sekali. Pilih lowongan sebanyak yang kamu mau. Tiap lowongan dapat CV-nya sendiri yang sudah ditailor.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mb-10 reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>
          {examples.map((e, i) => (
            <button
              key={e.tab}
              onClick={() => switchTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === activeTab
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              {e.tab}
            </button>
          ))}
        </div>

        {/* Story — 3 column flow */}
        <div
          className={`reveal reveal-delay-2 ${inView ? 'visible' : ''}`}
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_156px_1fr] gap-4 items-start">

            {/* ① CV Awal */}
            <div>
              <StepBadge n="1" label="CV Awal Kamu" />
              <ATSDocument candidate={ex.candidate} data={ex.before} isAfter={false} />
            </div>

            {/* Middle connector */}
            <div className="hidden lg:flex flex-col items-center gap-3 pt-10">
              {/* JD card */}
              <JDCard jd={ex.jd} />
              {/* Arrow down */}
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-orange-200" />
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/30">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 3v8M4 8l3 3 3-3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.15em] mt-1">Output</div>
              </div>
            </div>

            {/* JD card — mobile only, shown between the two CVs */}
            <div className="lg:hidden">
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-orange-100" />
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 3v8M4 8l3 3 3-3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1 h-px bg-orange-100" />
              </div>
              <JDCard jd={ex.jd} horizontal />
            </div>

            {/* ② CV Tailored */}
            <div>
              <StepBadge n="2" label="CV Setelah Ditailor" isAfter />
              <ATSDocument candidate={ex.candidate} data={ex.after} isAfter={true} />
            </div>
          </div>

          {/* What changed */}
          <div className="mt-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-3">Yang diubah LamarIn</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ex.changes.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                      <path d="M1.5 4l2 2 3-3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-xs text-slate-600 leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function StepBadge({ n, label, isAfter }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${isAfter ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
        {n}
      </div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      {isAfter && (
        <span className="ml-1 px-2 py-0.5 bg-orange-50 border border-orange-200 rounded-full text-[9px] font-bold text-orange-600">
          Keyword lowongan disorot
        </span>
      )}
    </div>
  )
}

function JDCard({ jd, horizontal }) {
  if (horizontal) {
    return (
      <div className="bg-orange-500 rounded-2xl p-4 text-white">
        <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-200 mb-0.5">Lowongan yang Kamu Kirim</div>
        <div className="text-sm font-black tracking-tight">{jd.role}</div>
        <div className="text-[10px] text-orange-200 mb-3">{jd.company} · {jd.badge}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {jd.requirements.map((r, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-orange-50">
              <span className="text-orange-300 flex-shrink-0">›</span>
              {r}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-orange-500 rounded-2xl p-4 text-white shadow-lg shadow-orange-500/25">
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-200 mb-1">Lowongan yang Kamu Kirim</div>
      <div className="text-sm font-black tracking-tight leading-tight">{jd.role}</div>
      <div className="text-[10px] text-orange-200 mt-0.5 mb-3">{jd.company}</div>
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-200 mb-2">Kualifikasi</div>
      <ul className="space-y-2">
        {jd.requirements.map((r, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[10px] text-orange-50 leading-tight">
            <span className="text-orange-300 flex-shrink-0 mt-px">›</span>
            {r}
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-orange-400/50 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
        <span className="text-[9px] text-orange-200">LamarIn sedang analisis...</span>
      </div>
    </div>
  )
}

function ATSDocument({ candidate, data, isAfter }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{
        border: isAfter ? '1.5px solid rgba(249,115,22,0.25)' : '1px solid #e2e8f0',
        boxShadow: isAfter
          ? '0 0 0 4px rgba(249,115,22,0.05), 0 4px 24px rgba(249,115,22,0.08)'
          : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Document top bar */}
      <div className={`px-5 py-3 border-b flex items-center justify-between gap-2 ${isAfter ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isAfter ? 'bg-orange-400' : 'bg-slate-300'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isAfter ? 'text-orange-600' : 'text-slate-400'}`}>
            {isAfter ? 'ATS-Optimized CV' : 'CV Original'}
          </span>
        </div>
        {isAfter && (
          <span className="text-[9px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
            Siap ATS
          </span>
        )}
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* CV Header — name block */}
        <div className="pb-4 border-b border-slate-100">
          <div className="text-sm font-black text-slate-950 tracking-tight uppercase">{candidate.name}</div>
          <div className={`text-[10px] font-semibold mt-0.5 ${isAfter ? 'text-orange-600' : 'text-slate-500'}`}>
            {isAfter ? data.title : data.title}
          </div>
          <div className="text-[9px] text-slate-400 mt-0.5">{candidate.location} · {candidate.email} · {candidate.phone}</div>
        </div>

        {/* RANGKUMAN PROFIL */}
        <CVSection title="RANGKUMAN PROFIL">
          <p className="text-[10px] text-slate-600 leading-relaxed">
            {isAfter
              ? data.summary.map((chunk, i) =>
                  chunk.h
                    ? <mark key={i} className="bg-orange-100 text-orange-700 font-semibold not-italic rounded-sm px-0.5">{chunk.t}</mark>
                    : <span key={i}>{chunk.t}</span>
                )
              : data.summary
            }
          </p>
        </CVSection>

        {/* PENGALAMAN KERJA */}
        <CVSection title="PENGALAMAN KERJA">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-slate-900">{data.expTitle}</span>
              <span className="text-[9px] text-slate-400 flex-shrink-0 tabular-nums">{data.expPeriod}</span>
            </div>
            <div className="text-[9px] text-slate-500 mb-2.5">{data.expCompany}</div>
            <ul className="space-y-2">
              {data.bullets.map((bullet, bi) => (
                <li key={bi} className="flex items-start gap-2">
                  <span className="text-slate-300 text-[10px] leading-relaxed flex-shrink-0 mt-px">•</span>
                  <span className="text-[10px] text-slate-600 leading-relaxed">
                    {isAfter
                      ? bullet.map((chunk, ci) =>
                          chunk.h
                            ? <mark key={ci} className="bg-orange-100 text-orange-700 font-semibold not-italic rounded-sm px-0.5">{chunk.t}</mark>
                            : <span key={ci}>{chunk.t}</span>
                        )
                      : bullet
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CVSection>

        {/* KEAHLIAN */}
        <CVSection title="KEAHLIAN">
          {isAfter
            ? <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-[9px] font-semibold ${
                      s.h ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {s.t}
                  </span>
                ))}
              </div>
            : <p className="text-[10px] text-slate-600">{data.skills}</p>
          }
        </CVSection>
      </div>

      {/* Document footer */}
      <div className={`px-5 py-2.5 border-t ${isAfter ? 'bg-orange-50/50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
        <div className="flex items-center justify-between">
          <span className="text-[8px] text-slate-400 tracking-wide">Curriculum Vitae · {candidate.name}</span>
          {isAfter && (
            <span className="text-[8px] font-bold text-orange-500">Ditailor oleh LamarIn</span>
          )}
        </div>
      </div>
    </div>
  )
}

function CVSection({ title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[8px] font-black text-slate-400 tracking-[0.22em] whitespace-nowrap">{title}</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      {children}
    </div>
  )
}
