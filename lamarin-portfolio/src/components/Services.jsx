import { useInView } from '../hooks/useInView'

const services = [
  {
    tag: 'CV Tailor',
    title: '1 CV, Banyak Lowongan',
    desc: 'Kirim CV-mu sekali. Pilih lowongan sebanyak yang kamu mau. Tiap lowongan dapat CV-nya sendiri yang sudah ditailor — keyword dioptimasi, format ATS, siap kirim.',
    price: 'Rp 15.000',
    priceNote: '/ lowongan',
    features: ['CV ditailor per lowongan', 'Keyword ATS dioptimasi', 'Laporan evaluasi + skor fit'],
    accent: 'amber',
    featured: true,
  },
  {
    tag: 'Job Evaluation',
    title: 'Evaluasi Lowongan',
    desc: 'Kirim link atau teks lowongan — dapat laporan lengkap: skor fit, gap analysis, estimasi gaji, verifikasi legitimasi.',
    price: 'Rp 10.000',
    priceNote: '/ lowongan',
    features: ['Skor fit (X/5)', 'Gap analysis + mitigasi', 'Estimasi gaji market', 'Verifikasi ghost job'],
    accent: 'stone',
    featured: false,
  },
  {
    tag: 'Bundle 5 Lowongan',
    title: 'Kirim 1 CV, Dapat 5',
    desc: 'Pilih 5 lowongan, kirim 1 CV — dapat 5 CV berbeda yang sudah ditailor sesuai tiap posisi, plus 5 laporan evaluasi lengkap.',
    price: 'Rp 50.000',
    priceNote: '5 lowongan',
    features: ['5x CV Tailor + Evaluasi', '1 CV, 5 output berbeda', 'Hemat Rp 25.000', 'Priority delivery'],
    accent: 'stone',
    featured: false,
  },
  {
    tag: 'Interview Ready',
    title: 'Persiapan Interview',
    desc: 'Setor nama perusahaan + lowongan → dapat intel interview lengkap: pertanyaan teknis + jawaban, strategi negosiasi gaji, red flag Q&A.',
    price: 'Rp 30.000',
    priceNote: '/ perusahaan',
    features: ['6+ pertanyaan teknis', 'Jawaban disesuaikan CV', 'STAR behavioral answers', 'Strategi negosiasi gaji'],
    accent: 'stone',
    featured: false,
  },
]

export default function Services() {
  const [ref, inView] = useInView()

  return (
    <section id="layanan" className="py-28 md:py-36 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div ref={ref} className={`mb-16 reveal ${inView ? 'visible' : ''}`}>
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-5">
            Our Services
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05]">
              Semua yang kamu butuhkan<br className="hidden md:block" />
              <span className="text-slate-400 font-bold">untuk lamar dengan percaya diri.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-[30ch] text-left md:text-right leading-relaxed">
              Kirim 1 CV, pilih banyak lowongan.<br />Dapat CV berbeda untuk tiap posisi.
            </p>
          </div>
        </div>

        {/* Grid: 2x2 asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.tag}
              service={svc}
              delay={i + 1}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service, delay, inView }) {
  const isFeatured = service.featured

  return (
    <div className={`
      relative flex flex-col gap-6 p-7 rounded-2xl border
      reveal reveal-delay-${delay} ${inView ? 'visible' : ''}
      ${isFeatured
        ? 'bg-orange-500 border-orange-400 text-white'
        : 'bg-white border-slate-200 card-spotlight'
      }
    `}>
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full tracking-wide shadow-sm">
            Paling Sering Dipakai
          </span>
        </div>
      )}

      {/* Tag + price row */}
      <div className="flex items-start justify-between gap-4">
        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg tracking-wide ${
          isFeatured ? 'bg-orange-400/40 text-orange-50' : 'bg-slate-100 text-slate-500'
        }`}>
          {service.tag}
        </span>
        <div className="text-right flex-shrink-0">
          <div className={`text-xl font-bold tabular-nums ${isFeatured ? 'text-white' : 'text-slate-950'}`}>
            {service.price}
          </div>
          {service.priceNote && (
            <div className={`text-xs mt-0.5 ${isFeatured ? 'text-orange-100' : 'text-slate-400'}`}>
              {service.priceNote}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className={`text-xl font-black mb-2 tracking-tighter ${isFeatured ? 'text-white' : 'text-slate-950'}`}>
          {service.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isFeatured ? 'text-orange-50' : 'text-slate-500'}`}>
          {service.desc}
        </p>
      </div>

      {/* Features list */}
      <ul className="flex flex-col gap-1.5">
        {service.features.map((f) => (
          <li key={f} className={`flex items-center gap-2 text-sm ${isFeatured ? 'text-orange-50' : 'text-slate-600'}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" fill={isFeatured ? 'rgba(255,255,255,0.2)' : '#fff7ed'} />
              <path d="M4.5 7l2 2 3-3" stroke={isFeatured ? 'white' : '#f97316'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
