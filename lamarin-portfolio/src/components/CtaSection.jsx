import { useInView } from '../hooks/useInView'

const WA_URL = `https://wa.me/6281234567890?text=Halo%20LamarIn!%20Saya%20mau%20mulai%20sekarang.`

export default function CtaSection() {
  const [ref, inView] = useInView()

  return (
    <section className="py-28 md:py-36 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl bg-stone-950 px-8 md:px-16 py-16 md:py-20 reveal ${inView ? 'visible' : ''}`}
        >
          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-700/10 blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            {/* Text */}
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full mb-6">
                Ready to Start?
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.04]">
                Satu langkah menuju<br />
                lamaran yang <span className="text-orange-400">tepat sasaran.</span>
              </h2>
              <p className="text-stone-400 mt-4 leading-relaxed max-w-[44ch]">
                Tidak ada daftar akun. Tidak ada meeting. Kirim CV kamu sekarang, dan terima laporan PDF dalam hitungan jam.
              </p>
            </div>

            {/* CTA block */}
            <div className="flex flex-col gap-4 md:w-64 flex-shrink-0">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 px-6 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl text-base transition-all duration-200 active:scale-[0.98] shadow-lg shadow-orange-500/25"
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
                className="flex items-center justify-center py-4 px-6 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white font-semibold rounded-2xl text-base transition-all duration-200 active:scale-[0.98]"
              >
                Lihat Semua Paket
              </a>

              <div className="text-center text-xs text-stone-500 mt-1">
                Delivery 1–6 jam kerja &middot; Bayar via transfer
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
