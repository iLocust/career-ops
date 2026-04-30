import { useInView } from '../hooks/useInView'

const WA_URL = `https://wa.me/6281234567890?text=Halo%20LamarIn!%20Saya%20tertarik%20dengan%20`

const packages = [
  {
    id: 'evaluate',
    tier: 'entry',
    name: 'Evaluasi Lowongan',
    price: 'Rp 10.000',
    unit: '/ lowongan',
    desc: 'Laporan evaluasi per lowongan: skor fit, gap analysis, estimasi gaji market, cek ghost job.',
    features: ['Skor fit (X/5)', 'Gap analysis & mitigasi', 'Estimasi gaji market', 'Verifikasi ghost job'],
    cta: 'Evaluasi Lowongan',
    waText: 'Paket%20Evaluasi%20Lowongan',
  },
  {
    id: 'tailor',
    tier: 'hero',
    name: 'CV Tailor',
    badge: 'Paling Dicari',
    price: 'Rp 15.000',
    unit: '/ lowongan',
    desc: 'CV kamu ditailor khusus untuk 1 lowongan + laporan evaluasi lengkap. Kirim banyak, dapat banyak.',
    features: ['CV ditailor per lowongan', 'Keyword ATS dioptimasi', 'Laporan evaluasi + skor fit', 'Verifikasi ghost job'],
    cta: 'Tailor CV Saya',
    waText: 'Paket%20CV%20Tailor',
  },
  {
    id: 'interview',
    tier: 'standard',
    name: 'Interview Ready',
    price: 'Rp 30.000',
    unit: '/ perusahaan',
    desc: 'Intel interview lengkap: pertanyaan teknis, jawaban STAR, strategi negosiasi gaji.',
    features: ['6+ pertanyaan teknis', 'Jawaban disesuaikan CV', 'STAR behavioral answers', 'Strategi negosiasi gaji'],
    cta: 'Siapkan Interview',
    waText: 'Paket%20Interview%20Ready',
  },
  {
    id: 'bundle5',
    tier: 'accent',
    name: '5 Lowongan',
    price: 'Rp 50.000',
    unit: '5x CV Tailor',
    desc: 'Kirim 1 CV, pilih 5 lowongan — dapat 5 CV berbeda yang sudah ditailor + 5 laporan evaluasi.',
    features: ['5x CV Tailor + Evaluasi', '1 CV, 5 output berbeda', 'Keyword per lowongan dioptimasi', 'Hemat Rp 25.000'],
    cta: 'Pilih 5 Lowongan',
    waText: 'Paket%205%20Lowongan',
  },
  {
    id: 'bundle-full',
    tier: 'featured',
    name: 'Paket Lengkap',
    badge: 'Best Value',
    price: 'Rp 69.000',
    unit: 'paket bundling',
    desc: 'Kirim 1 CV, pilih 5 lowongan, siapkan 1 interview. Semua selesai dalam 1 hari kerja.',
    features: ['5x CV Tailor per lowongan', '5x Evaluasi Lowongan', '1x Persiapan Interview', 'Priority delivery', 'Hemat Rp 41.000'],
    cta: 'Ambil Paket Lengkap',
    waText: 'Paket%20Lengkap',
  },
]

export default function Pricing() {
  const [ref, inView] = useInView()
  const topRow    = packages.slice(0, 4)
  const bottomRow = packages.slice(4)

  return (
    <section id="harga" className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div ref={ref} className={`mb-16 reveal ${inView ? 'visible' : ''}`}>
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-5">
            Pricing
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05]">
              Bayar per kebutuhan.<br />
              <span className="text-slate-400 font-bold">Tidak ada langganan.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-[30ch] md:text-right leading-relaxed">
              Kirim 1 CV, pilih sebanyak lowongan yang kamu mau — dapat CV berbeda untuk tiap posisi.
            </p>
          </div>
        </div>

        {/* Top row — 4 tiered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {topRow.map((pkg, i) => (
            <PriceCard key={pkg.id} pkg={pkg} delay={i + 1} inView={inView} />
          ))}
        </div>

        {/* Bottom — featured bundle */}
        {bottomRow.map((pkg) => (
          <PriceCardFeatured key={pkg.id} pkg={pkg} inView={inView} />
        ))}

        <div className={`mt-10 text-center reveal reveal-delay-3 ${inView ? 'visible' : ''}`}>
          <p className="text-sm text-slate-400">
            Delivery via <span className="text-slate-600 font-semibold">WhatsApp</span> atau <span className="text-slate-600 font-semibold">Google Drive</span> · Tidak ada meeting · Tidak ada akun
          </p>
        </div>

      </div>
    </section>
  )
}

function PriceCard({ pkg, delay, inView }) {
  const isHero   = pkg.tier === 'hero'
  const isEntry  = pkg.tier === 'entry'
  const isAccent = pkg.tier === 'accent'

  const wrapperClass = isHero
    ? 'bg-white border-orange-300 shadow-lg shadow-orange-500/10 card-spotlight'
    : isEntry
      ? 'bg-slate-50 border-slate-200 card-spotlight'
      : isAccent
        ? 'bg-white border-slate-200 card-spotlight border-l-[3px] border-l-orange-400'
        : 'bg-white border-slate-200 card-spotlight'

  const textPrimary   = 'text-slate-950'
  const textSecondary = isHero ? 'text-slate-600'  : 'text-slate-500'
  const textMeta      = isHero ? 'text-orange-500'  : 'text-slate-400'
  const tagClass      = isHero
    ? 'bg-orange-500 text-white'
    : 'bg-slate-100 text-slate-500'
  const checkFill   = '#fff7ed'
  const checkStroke = '#f97316'

  return (
    <div className={`
      relative flex flex-col gap-5 p-6 rounded-2xl border
      reveal reveal-delay-${delay} ${inView ? 'visible' : ''}
      ${wrapperClass}
    `}>
      {/* Badge */}
      {pkg.badge && (
        <div className="absolute -top-3 left-5">
          <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full tracking-[0.12em] uppercase shadow-md shadow-orange-500/30">
            {pkg.badge}
          </span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mt-1">
        <span className={`inline-block px-2 py-1 text-[10px] font-bold rounded-lg tracking-wider uppercase ${tagClass}`}>
          {pkg.name}
        </span>
      </div>

      {/* Price */}
      <div>
        <div className={`text-2xl font-black tabular-nums tracking-tight ${isHero ? 'text-orange-600' : textPrimary}`}>
          {pkg.price}
        </div>
        <div className={`text-xs mt-0.5 ${textMeta}`}>{pkg.unit}</div>
      </div>

      <p className={`text-xs leading-relaxed flex-1 ${textSecondary}`}>{pkg.desc}</p>

      {/* Features */}
      <ul className="flex flex-col gap-1.5">
        {pkg.features.map((f) => (
          <li key={f} className={`flex items-center gap-2 text-xs ${textSecondary}`}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="flex-shrink-0">
              <circle cx="6.5" cy="6.5" r="5.5" fill={checkFill} />
              <path d="M4 6.5l2 2 3-3" stroke={checkStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA — pill with button-in-button arrow */}
      <a
        href={`${WA_URL}${pkg.waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
          isHero
            ? 'bg-orange-500 hover:bg-orange-400 text-white border border-transparent'
            : 'border border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-600'
        }`}
      >
        <span>{pkg.cta}</span>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
          isHero
            ? 'bg-white/20 group-hover:bg-white/30'
            : 'bg-slate-100 group-hover:bg-orange-50'
        }`}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke={isHero ? 'white' : '#64748b'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </a>
    </div>
  )
}

function PriceCardFeatured({ pkg, inView }) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl
      reveal reveal-delay-5 ${inView ? 'visible' : ''}
    `}>
      {/* Double-bezel outer shell */}
      <div className="p-px rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
        <div
          className="relative flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-[calc(1rem-1px)] bg-orange-500"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)' }}
        >
          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none rounded-[calc(1rem-1px)] overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange-400/30 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-orange-600/30 blur-xl" />
          </div>

          {pkg.badge && (
            <div className="absolute -top-3.5 left-8 z-10">
              <span className="px-4 py-1.5 bg-slate-950 text-white text-[10px] font-bold rounded-full tracking-[0.15em] uppercase shadow-xl">
                {pkg.badge}
              </span>
            </div>
          )}

          {/* Left */}
          <div className="relative z-10 flex-1">
            <div className="text-orange-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">{pkg.name}</div>
            <div className="text-5xl font-black tabular-nums text-white tracking-tighter">{pkg.price}</div>
            <div className="text-orange-200 text-sm mt-1">{pkg.unit}</div>
            <p className="text-orange-100 mt-5 leading-relaxed max-w-[40ch] text-sm">{pkg.desc}</p>
          </div>

          {/* Right */}
          <div className="relative z-10 flex flex-col gap-5 md:w-72 flex-shrink-0">
            <ul className="flex flex-col gap-2">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-orange-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0">
                    <circle cx="7" cy="7" r="6" fill="rgba(255,255,255,0.15)" />
                    <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA — white pill with button-in-button */}
            <a
              href={`${WA_URL}${pkg.waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-5 py-3.5 rounded-full bg-white hover:bg-orange-50 transition-colors duration-300 active:scale-[0.98]"
            >
              <span className="font-bold text-orange-700 text-sm">{pkg.cta}</span>
              <span className="w-8 h-8 rounded-full bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
