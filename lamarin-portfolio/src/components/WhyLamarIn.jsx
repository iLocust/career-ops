import { useInView } from '../hooks/useInView'

const reasons = [
  {
    titleEN: 'AI-Powered Research',
    title: 'Bukan Template',
    desc: 'Setiap laporan dianalisis dari data real-time — bukan copy-paste template. AI membaca lowongan, CV kamu, dan kondisi market sekaligus.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    titleEN: 'Multi-Source Intelligence',
    title: 'Data dari Semua Sumber',
    desc: 'JobStreet, LinkedIn, Glassdoor, Glassdoor Interview, PayScale, Indeed, data hiring Indonesia — semua jadi satu laporan yang padat dan relevan.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    titleEN: 'Fast Delivery',
    title: 'Hasil dalam Jam',
    desc: 'Delivery 1–6 jam kerja. Tidak ada waiting list berminggu-minggu. Kirim pagi, terima sore — siap lamar hari yang sama.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    titleEN: 'Privacy First',
    title: 'CV Kamu Aman',
    desc: 'CV tidak disimpan di server manapun setelah laporan selesai. Tidak ada akun, tidak ada tracking, tidak ada iklan. Selesai, beres.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
]

export default function WhyLamarIn() {
  const [ref, inView] = useInView()

  return (
    <section className="py-28 md:py-36 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading */}
          <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-6">
              Why LamarIn
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05]">
              Kenapa pakai<br />
              <span className="text-orange-500">LamarIn</span>,<br />
              <span className="text-slate-400 font-bold text-3xl md:text-4xl">bukan bikin sendiri?</span>
            </h2>
            <p className="text-stone-500 mt-5 leading-relaxed max-w-[42ch]">
              Kamu bisa googling sendiri, tapi hasilnya generik. LamarIn baca CV kamu, baca lowongannya, cek market, dan kasih laporan yang spesifik untuk situasi kamu — bukan untuk semua orang.
            </p>

            {/* Quote/testimonial */}
            <div className="mt-8 border-l-2 border-orange-500 pl-5">
              <p className="text-stone-600 text-sm italic leading-relaxed">
                &ldquo;Saya udah apply 30 lowongan tanpa hasil. Setelah pakai LamarIn untuk evaluasi 5 lowongan, saya baru sadar CV saya tidak match dengan role yang saya incar. Sekarang sudah interview di 3 perusahaan.&rdquo;
              </p>
              <div className="mt-2 text-xs text-stone-400">Frontend Developer · Jakarta · 2026</div>
            </div>
          </div>

          {/* Right — reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div
                key={r.titleEN}
                className={`flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-200 card-spotlight reveal reveal-delay-${i + 1} ${inView ? 'visible' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">{r.titleEN}</div>
                  <h3 className="text-base font-bold text-stone-950 mb-1.5">{r.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
