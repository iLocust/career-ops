import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'

const WA_URL = `https://wa.me/6281234567890?text=Halo%20LamarIn!%20Saya%20mau%20mulai.`

const stats = [
  { value: 1200, suffix: '+', label: 'CV Dioptimasi' },
  { value: 6,    suffix: ' jam', label: 'Delivery Maks' },
  { value: 98,   suffix: '%',    label: 'Klien Puas' },
]

const reportCards = [
  {
    category: 'IT / Dev',
    candidate: 'Full Stack Developer · 3 tahun',
    currentRole: 'Full Stack Dev ERP — PT Manufaktur Besar',
    score: 3.8,
    scoreBar: '76%',
    status: 'Direkomendasikan untuk Apply',
    statusColor: 'green',
    skills: [
      { req: 'React.js',    status: 'match',   label: 'Strong' },
      { req: 'Node.js',     status: 'match',   label: 'Match' },
      { req: 'SQL / RDBMS', status: 'partial', label: 'Partial' },
      { req: 'C# / .NET',   status: 'gap',     label: 'Gap' },
    ],
    salary: 'Rp 7.000.000 – 8.500.000 / bln',
    location: 'Surabaya · Mid-level · 2026',
  },
  {
    category: 'Marketing',
    candidate: 'Digital Marketing · 2 tahun',
    currentRole: 'Marketing Specialist — PT Ritel Nasional',
    score: 4.2,
    scoreBar: '84%',
    status: 'Sangat Direkomendasikan',
    statusColor: 'green',
    skills: [
      { req: 'Social Media Ads', status: 'match',   label: 'Strong' },
      { req: 'Google Analytics', status: 'match',   label: 'Match' },
      { req: 'SEO / SEM',        status: 'partial', label: 'Partial' },
      { req: 'Copywriting',      status: 'match',   label: 'Match' },
    ],
    salary: 'Rp 5.500.000 – 7.000.000 / bln',
    location: 'Jakarta · Mid-level · 2026',
  },
  {
    category: 'Finance',
    candidate: 'Staff Akunting · 4 tahun',
    currentRole: 'Akuntan Senior — PT Distribusi Jaya',
    score: 3.5,
    scoreBar: '70%',
    status: 'Pertimbangkan Apply',
    statusColor: 'orange',
    skills: [
      { req: 'SAP / ERP',       status: 'gap',     label: 'Gap' },
      { req: 'Laporan Keuangan', status: 'match',   label: 'Strong' },
      { req: 'Excel Lanjutan',   status: 'match',   label: 'Match' },
      { req: 'Perpajakan',       status: 'partial', label: 'Partial' },
    ],
    salary: 'Rp 6.000.000 – 8.000.000 / bln',
    location: 'Bandung · Senior · 2026',
  },
  {
    category: 'HR',
    candidate: 'HR Generalist · 3 tahun',
    currentRole: 'HRD Staff — PT Manufaktur Nusantara',
    score: 4.0,
    scoreBar: '80%',
    status: 'Direkomendasikan untuk Apply',
    statusColor: 'green',
    skills: [
      { req: 'Rekrutmen & Seleksi', status: 'match',   label: 'Strong' },
      { req: 'Payroll & BPJS',      status: 'match',   label: 'Match' },
      { req: 'HR Information System', status: 'partial', label: 'Partial' },
      { req: 'Training & Dev',      status: 'gap',     label: 'Gap' },
    ],
    salary: 'Rp 5.000.000 – 6.500.000 / bln',
    location: 'Bekasi · Mid-level · 2026',
  },
  {
    category: 'Admin',
    candidate: 'Staff Admin · 2 tahun',
    currentRole: 'Administrasi Umum — CV Logistik Andalan',
    score: 4.5,
    scoreBar: '90%',
    status: 'Sangat Direkomendasikan',
    statusColor: 'green',
    skills: [
      { req: 'Microsoft Office', status: 'match',   label: 'Strong' },
      { req: 'Korespondensi',    status: 'match',   label: 'Match' },
      { req: 'Administrasi PO',  status: 'match',   label: 'Match' },
      { req: 'Inventory Dasar',  status: 'partial', label: 'Partial' },
    ],
    salary: 'Rp 4.000.000 – 5.500.000 / bln',
    location: 'Tangerang · Junior · 2026',
  },
]

function StatItem({ stat, active }) {
  const count = useCounter(stat.value, 1800, active)
  return (
    <div>
      <div className="text-2xl font-bold text-white tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
    </div>
  )
}

export default function Hero() {
  const [statsRef, statsInView] = useInView()
  const [cardIndex, setCardIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCardIndex((i) => (i + 1) % reportCards.length)
        setFading(false)
      }, 300)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const card = reportCards[cardIndex]

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden bg-zinc-950">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #71717a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Orange glow — right side, behind card */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-orange-500/20 blur-[120px]" />
      </div>

      {/* Secondary glow — left bottom */}
      <div className="absolute -left-32 bottom-0 w-96 h-96 pointer-events-none">
        <div className="w-full h-full rounded-full bg-orange-600/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-0">

          {/* Left — content */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
                AI-Powered · Made in Indonesia
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[1.04]">
                Lamar Lebih<br />
                <span className="text-orange-400">Cerdas.</span>
              </h1>
              <p className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter text-zinc-600 leading-tight mt-2">
                Dapat Lebih Banyak.
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-[50ch]">
              Kirim 1 CV, pilih beberapa lowongan — dapat CV yang sudah ditailor untuk tiap posisi, plus laporan evaluasi lengkap. Semua masuk WhatsApp dalam jam.
            </p>
            <span className="text-zinc-600 text-sm -mt-4">1 CV · banyak lowongan · banyak output. No meetings.</span>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-orange-500/25"
              >
                <WhatsAppIcon />
                Chat WhatsApp
              </a>
              <a
                href="#harga"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#harga')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Lihat Paket
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center gap-8 pt-4 border-t border-zinc-800">
              {stats.map((s) => (
                <StatItem key={s.label} stat={s} active={statsInView} />
              ))}
            </div>
          </div>

          {/* Right — floating report card */}
          <div className="relative flex items-center justify-center lg:justify-end min-h-[460px]">
            {/* Ghost card behind */}
            <div className="absolute top-6 right-0 lg:right-6 w-64 opacity-20 blur-sm rotate-2 translate-y-6 pointer-events-none scale-95">
              <ReportPreviewCard card={reportCards[(cardIndex + 1) % reportCards.length]} fading={false} />
            </div>

            {/* Category tabs */}
            <div className="absolute top-0 right-0 lg:right-6 flex gap-1.5 z-20">
              {reportCards.map((c, i) => (
                <button
                  key={c.category}
                  onClick={() => { setFading(true); setTimeout(() => { setCardIndex(i); setFading(false) }, 300) }}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    i === cardIndex
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {c.category}
                </button>
              ))}
            </div>

            {/* Main card */}
            <div
              className="relative z-10 w-72 md:w-80 animate-float rounded-2xl mt-10"
              style={{
                boxShadow: '0 0 0 1px rgba(249,115,22,0.12), 0 24px 60px rgba(249,115,22,0.18), 0 8px 20px rgba(0,0,0,0.4)',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <ReportPreviewCard card={card} fading={fading} />
            </div>

            {/* Delivery badge */}
            <div
              className="absolute bottom-4 left-0 lg:-left-8 bg-zinc-900 border border-zinc-700/60 rounded-2xl px-4 py-3 flex items-center gap-3 z-20 animate-float-slow"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)' }}
            >
              <div className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Laporan terkirim</div>
                <div className="text-xs text-zinc-500">via WhatsApp · 2 jam lalu</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function ReportPreviewCard({ card }) {
  const statusColors = {
    green: { bg: 'bg-green-50', border: 'border-green-100', dot: 'bg-green-500', text: 'text-green-700' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-100', dot: 'bg-orange-500', text: 'text-orange-700' },
  }
  const sc = statusColors[card.statusColor] || statusColors.green

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-orange-100 text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5">LamarIn</div>
            <div className="text-white text-sm font-bold leading-tight">Laporan Evaluasi<br />Lowongan</div>
          </div>
          <div className="text-right">
            <div className="text-orange-200 text-[9px]">29 Apr 2026</div>
            <div className="mt-1 px-2 py-0.5 bg-white/15 rounded text-white text-[9px] font-semibold">{card.category.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Candidate */}
        <div>
          <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Kandidat</div>
          <div className="text-xs font-bold text-slate-900">{card.candidate}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{card.currentRole}</div>
        </div>

        {/* Score */}
        <div>
          <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-2">Skor Kesesuaian</div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-1.5 rounded-full" style={{ width: card.scoreBar }} />
            </div>
            <span className="text-base font-bold text-slate-900 tabular-nums">{card.score}<span className="text-[10px] font-normal text-slate-400">/5</span></span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${sc.bg} border ${sc.border} rounded-lg`}>
            <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            <span className={`text-[9px] font-bold ${sc.text}`}>{card.status}</span>
          </div>
        </div>

        {/* Match rows */}
        <div className="space-y-1.5">
          {card.skills.map((row) => (
            <div key={row.req} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
              <span className="text-[10px] text-slate-600">{row.req}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                row.status === 'match'   ? 'bg-green-50 text-green-700' :
                row.status === 'partial' ? 'bg-orange-50 text-orange-600' :
                                           'bg-red-50 text-red-500'
              }`}>
                {row.label}
              </span>
            </div>
          ))}
        </div>

        {/* Salary */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Estimasi Gaji</div>
          <div className="text-xs font-bold text-slate-900 tabular-nums">{card.salary}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">{card.location}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-slate-50 border-t border-slate-100">
        <div className="text-[8px] text-slate-400 text-center tracking-wide">LamarIn — AI Job Search Intelligence</div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
