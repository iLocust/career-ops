import { useInView } from '../hooks/useInView'

const steps = [
  {
    number: '01',
    title: 'Kirim CV Kamu',
    titleEN: 'Send Your CV',
    desc: 'Kirim CV dalam format apapun — PDF, Word, atau paste teks langsung di WhatsApp. Tidak perlu akun, tidak perlu daftar.',
    icon: <UploadIcon />,
  },
  {
    number: '02',
    title: 'Pilih Paket',
    titleEN: 'Choose a Package',
    desc: 'Pilih layanan yang kamu butuhkan — evaluasi satu lowongan, bandingkan beberapa, atau siapkan interview. Bayar sekali, proses langsung.',
    icon: <PackageIcon />,
  },
  {
    number: '03',
    title: 'Terima Laporan PDF',
    titleEN: 'Receive Your PDF',
    desc: 'Dalam 1–6 jam kerja, laporan lengkap dikirim ke WhatsApp atau email kamu. Siap dipakai, tidak perlu diedit lagi.',
    icon: <InboxIcon />,
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section id="cara-kerja" className="py-28 md:py-36 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div ref={ref} className={`mb-20 reveal ${inView ? 'visible' : ''}`}>
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-5">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05]">
            Tiga langkah,<br />
            <span className="text-slate-400 font-bold">hasil nyata.</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-[44ch] leading-relaxed">
            Tidak ada platform baru untuk dipelajari. Tidak ada meeting. Semua via WhatsApp.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative bg-white p-8 md:p-10 flex flex-col gap-6 group reveal reveal-delay-${i + 1} ${inView ? 'visible' : ''}`}
            >
              {/* Large decorative number */}
              <div className="absolute top-6 right-6 text-7xl font-black text-slate-50 select-none leading-none tabular-nums pointer-events-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/30">
                {step.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-xs font-semibold text-slate-400 mb-1 tracking-wide">{step.titleEN}</div>
                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>

              {/* Step connector arrow — desktop only, not on last item */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* Document body */}
      <path d="M5 3h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" fill="white" fillOpacity="0.2"/>
      <path d="M13 3v4h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 3h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Upload arrow */}
      <path d="M11 9v6M8.5 11.5L11 9l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PackageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* Checkmark list */}
      <rect x="3" y="4" width="16" height="14" rx="2" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
      <path d="M7 8.5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 11h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function InboxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {/* Inbox tray */}
      <path d="M3 13h3l2 3h6l2-3h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 13V6a1 1 0 011-1h14a1 1 0 011 1v7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Download arrow */}
      <path d="M11 5v5M8.5 7.5L11 10l2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
