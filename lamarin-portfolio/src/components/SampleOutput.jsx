import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const tabs = [
  { id: 'evaluate',  label: 'Evaluasi Lowongan',     labelEN: 'Job Evaluation' },
  { id: 'compare',   label: 'Perbandingan Lowongan',  labelEN: 'Job Comparison' },
  { id: 'interview', label: 'Persiapan Interview',    labelEN: 'Interview Ready' },
]

export default function SampleOutput() {
  const [activeTab, setActiveTab] = useState('evaluate')
  const [ref, inView] = useInView()

  return (
    <section id="contoh" className="py-28 md:py-36 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div ref={ref} className={`mb-12 reveal ${inView ? 'visible' : ''}`}>
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-full mb-5">
            Sample Output
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.05] max-w-xl">
            Ini yang kamu terima —<br />
            <span className="text-slate-400 font-bold">bukan template, laporan nyata.</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-[50ch] leading-relaxed">
            Setiap laporan ditulis spesifik untuk CV dan lowongan kamu. Data dianonimkan untuk contoh ini.
          </p>
        </div>

        {/* Tab switcher */}
        <div className={`flex flex-wrap gap-2 mb-8 reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PDF Mockup */}
        <div className={`reveal reveal-delay-3 ${inView ? 'visible' : ''}`}>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl">
              {/* "Browser/viewer" frame hint */}
              <div className="bg-stone-200 rounded-t-xl px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-stone-400" />
                  <div className="w-3 h-3 rounded-full bg-stone-300" />
                  <div className="w-3 h-3 rounded-full bg-stone-300" />
                </div>
                <div className="flex-1 mx-3 bg-stone-100 rounded-md px-3 py-1 text-xs text-stone-400 font-medium">
                  lamarin-report-{activeTab}-2026.pdf
                </div>
              </div>

              {/* PDF Document */}
              <div className="paper-shadow rounded-b-xl overflow-hidden bg-white">
                {/* PDF Header bar */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-1">LamarIn</div>
                      <div className="text-white text-lg font-bold">
                        {activeTab === 'evaluate'  && 'Laporan Evaluasi Lowongan'}
                        {activeTab === 'compare'   && 'Laporan Perbandingan Lowongan'}
                        {activeTab === 'interview' && 'Laporan Persiapan Interview'}
                      </div>
                      <div className="text-orange-100 text-xs mt-1">AI Job Search Intelligence · Konfidensial</div>
                    </div>
                    <div className="text-right text-orange-100 text-xs">
                      <div>29 April 2026</div>
                      <div className="mt-1 px-2 py-0.5 bg-orange-400/40 rounded text-orange-50 text-[10px] font-medium">
                        {activeTab === 'evaluate'  ? 'EVALUASI' : activeTab === 'compare' ? 'KOMPARASI' : 'INTERVIEW'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Content */}
                <div className="px-8 py-6">
                  {activeTab === 'evaluate'  && <EvaluateContent />}
                  {activeTab === 'compare'   && <CompareContent />}
                  {activeTab === 'interview' && <InterviewContent />}
                </div>

                {/* PDF Footer */}
                <div className="px-8 py-4 border-t border-stone-100 bg-stone-50">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-stone-400">
                      LamarIn · lamarin.id · Dokumen ini bersifat konfidensial
                    </div>
                    <div className="text-xs text-stone-300">Hal. 1 / 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3 pb-1 border-b border-stone-100">
      {children}
    </div>
  )
}

function EvaluateContent() {
  return (
    <div className="space-y-7">
      {/* Meta */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs text-stone-400 mb-0.5">Kandidat</div>
          <div className="font-semibold text-stone-900">Full Stack Developer</div>
          <div className="text-stone-500 text-xs">3 tahun pengalaman · Surabaya</div>
        </div>
        <div>
          <div className="text-xs text-stone-400 mb-0.5">Posisi Dilamar</div>
          <div className="font-semibold text-stone-900">Full Stack Developer ERP</div>
          <div className="text-stone-500 text-xs">PT Manufaktur Besar · Surabaya</div>
        </div>
      </div>

      {/* Score */}
      <div>
        <SectionLabel>Skor Kesesuaian · Fit Score</SectionLabel>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-stone-400 mb-1.5">
              <span>0</span><span>5.0</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2.5 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-950 tabular-nums">3.8<span className="text-base font-normal text-stone-400">/5</span></div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-green-700">Direkomendasikan untuk Apply</span>
        </div>
      </div>

      {/* Match table */}
      <div>
        <SectionLabel>Analisis Persyaratan · Requirements Analysis</SectionLabel>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-stone-500">Persyaratan Lowongan</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-stone-500 hidden sm:table-cell">Keterangan CV</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-stone-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                { req: 'React.js',        note: '5+ proyek production',      status: 'match',   label: 'Strong Match' },
                { req: 'Node.js / Backend',note: '3 proyek REST API',          status: 'match',   label: 'Match' },
                { req: '2–3 tahun exp',   note: '3 tahun aktif',              status: 'match',   label: 'Match' },
                { req: 'Domisili Surabaya',note: 'Sudah di Surabaya',          status: 'match',   label: 'Strong Match' },
                { req: 'SQL / RDBMS',     note: 'MySQL ada, belum highlight', status: 'partial', label: 'Partial' },
                { req: 'C# / .NET',       note: 'Belum ada di CV',            status: 'gap',     label: 'Gap' },
              ].map((row) => (
                <tr key={row.req} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-stone-800 text-xs">{row.req}</td>
                  <td className="px-4 py-2.5 text-stone-500 text-xs hidden sm:table-cell">{row.note}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      row.status === 'match'   ? 'bg-green-50 text-green-700 border border-green-200' :
                      row.status === 'partial' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                                                 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {row.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap + Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Gap Terbesar · C# / .NET</div>
          <p className="text-xs text-orange-900 leading-relaxed">
            Bukan blocker. Reframe bagian backend untuk menonjolkan &ldquo;API design + database architecture.&rdquo; Di cover letter, ceritakan kemampuan belajar stack baru &mdash; contoh: dalam 3 bulan pernah switch ke full-stack Next.js + TypeScript.
          </p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Estimasi Gaji Market</div>
          <div className="text-lg font-bold text-stone-950 tabular-nums">Rp 7 – 8,5 juta<span className="text-xs font-normal text-stone-400"> /bulan</span></div>
          <div className="text-xs text-stone-400 mt-1">Mid-level · Surabaya · 2026</div>
          <div className="text-xs text-orange-600 font-semibold mt-2">Rekomendasi buka di Rp 7.000.000</div>
        </div>
      </div>
    </div>
  )
}

function CompareContent() {
  const options = [
    { name: 'Pilihan A', score: 3.65, cv: 4, gaji: 3, growth: 4, stack: 4, winner: true },
    { name: 'Pilihan B', score: 3.00, cv: 4, gaji: 1, growth: 2, stack: 4, winner: false },
    { name: 'Pilihan C', score: 2.75, cv: 3, gaji: 2, growth: 3, stack: 2, winner: false },
    { name: 'Pilihan D', score: 1.85, cv: 2, gaji: 1, growth: 2, stack: 2, winner: false, skip: true },
  ]

  return (
    <div className="space-y-7">
      {/* Meta */}
      <div>
        <div className="text-xs text-stone-400 mb-0.5">Kandidat</div>
        <div className="font-semibold text-stone-900">Frontend Developer · 2+ tahun · React + TypeScript</div>
        <div className="text-stone-500 text-xs mt-0.5">4 lowongan dibandingkan · 10 dimensi penilaian</div>
      </div>

      {/* Ranking */}
      <div>
        <SectionLabel>Ranking Final · Final Ranking</SectionLabel>
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => (
            <div key={opt.name} className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
              opt.winner ? 'bg-green-50 border-green-200' :
              opt.skip   ? 'bg-red-50/50 border-red-100 opacity-70' :
                           'bg-stone-50 border-stone-200'
            }`}>
              <div className={`text-lg font-bold tabular-nums w-6 text-center ${
                opt.winner ? 'text-green-700' : opt.skip ? 'text-red-400' : 'text-stone-400'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${opt.winner ? 'text-green-900' : opt.skip ? 'text-red-500' : 'text-stone-700'}`}>
                    {opt.name}
                  </span>
                  {opt.winner && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Apply Duluan</span>
                  )}
                  {opt.skip && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-wide">Skip</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-base font-bold tabular-nums ${opt.winner ? 'text-green-700' : opt.skip ? 'text-red-400' : 'text-stone-600'}`}>
                  {opt.score}<span className="text-xs font-normal text-stone-400">/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dimension table */}
      <div>
        <SectionLabel>Matriks Penilaian · Scoring Matrix</SectionLabel>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-stone-500">Dimensi</th>
                {options.map(o => (
                  <th key={o.name} className={`text-center px-3 py-2.5 font-semibold ${o.winner ? 'text-green-700' : 'text-stone-400'}`}>
                    {o.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                { label: 'Match CV',      key: 'cv' },
                { label: 'Estimasi Gaji', key: 'gaji' },
                { label: 'Growth',        key: 'growth' },
                { label: 'Tech Stack',    key: 'stack' },
              ].map(dim => (
                <tr key={dim.key} className="hover:bg-stone-50">
                  <td className="px-4 py-2.5 text-stone-600 font-medium">{dim.label}</td>
                  {options.map(o => (
                    <td key={o.name} className="px-3 py-2.5 text-center">
                      <ScorePip value={o[dim.key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-stone-50 border-t border-stone-200">
                <td className="px-4 py-2.5 font-bold text-stone-700">Total</td>
                {options.map(o => (
                  <td key={o.name} className={`px-3 py-2.5 text-center font-bold tabular-nums ${o.winner ? 'text-green-700' : 'text-stone-600'}`}>
                    {o.score}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ScorePip({ value }) {
  const colors = ['', 'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-lime-300', 'bg-green-400']
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= value ? colors[value] : 'bg-stone-100'}`} />
      ))}
    </div>
  )
}

function InterviewContent() {
  return (
    <div className="space-y-7">
      {/* Meta */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-stone-400 mb-0.5">Perusahaan</div>
          <div className="font-semibold text-stone-900">Klinik Kecantikan (8+ cabang)</div>
          <div className="text-xs text-stone-500 mt-0.5">Posisi: Mobile App Developer</div>
        </div>
        <div>
          <div className="text-xs text-stone-400 mb-0.5">Estimasi Proses</div>
          <div className="font-semibold text-stone-900">3 round · 7–10 hari</div>
          <div className="text-xs text-stone-500 mt-0.5">Sumber: Glassdoor, LinkedIn, forum komunitas</div>
        </div>
      </div>

      {/* Rounds */}
      <div>
        <SectionLabel>Proses Hiring · Hiring Process</SectionLabel>
        <div className="flex flex-col gap-2">
          {[
            { round: 'Round 1', type: 'Screening HR', duration: '20–30 menit', focus: 'Gaji, availability, komunikasi' },
            { round: 'Round 2', type: 'Technical Assessment', duration: '60–90 menit', focus: 'Live coding + system design' },
            { round: 'Round 3', type: 'Final Interview', duration: '30–45 menit', focus: 'Tech Lead + Engineering Manager' },
          ].map((r) => (
            <div key={r.round} className="flex items-start gap-3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="w-16 flex-shrink-0">
                <div className="text-xs font-bold text-orange-600">{r.round}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{r.duration}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-800">{r.type}</div>
                <div className="text-xs text-stone-500 mt-0.5">{r.focus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Q&A */}
      <div>
        <SectionLabel>Contoh Pertanyaan + Jawaban · Sample Q&amp;A</SectionLabel>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Pertanyaan yang Kemungkinan Ditanya</div>
            <p className="text-sm font-medium text-stone-900 italic">
              &ldquo;Kamu tidak punya pengalaman React Native. Kenapa kami harus hire kamu?&rdquo;
            </p>
          </div>
          <div className="px-4 py-3 bg-green-50/50">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1.5">Jawaban yang Disarankan</div>
            <p className="text-xs text-stone-700 leading-relaxed">
              &ldquo;Saya belum ship React Native app, tapi dalam 18 bulan saya sudah belajar 4 framework berbeda di production: React, Next.js, TypeScript, dan Electron. React Native secara konsep mirip Electron — JavaScript + native bridge. Saya butuh 1 minggu untuk buat prototype kecil, dan sprint pertama saya sudah bisa produktif di codebase kalian.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Salary strategy */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Strategi Negosiasi Gaji</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-sm font-bold text-stone-950 tabular-nums">Rp 7 juta</div>
            <div className="text-[10px] text-orange-600 font-semibold mt-0.5">Buka negosiasi di</div>
          </div>
          <div>
            <div className="text-sm font-bold text-stone-950 tabular-nums">5,5–8,5 jt</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Range market</div>
          </div>
          <div>
            <div className="text-sm font-bold text-stone-950 tabular-nums">6,5 juta</div>
            <div className="text-[10px] text-red-500 font-semibold mt-0.5">Jangan di bawah</div>
          </div>
        </div>
        <p className="text-xs text-orange-900 mt-3 leading-relaxed">
          Justifikasi: &ldquo;Saya bawa full-stack background — bisa handle backend API sekaligus mobile UI. Itu menghemat waktu onboarding tim.&rdquo;
        </p>
      </div>
    </div>
  )
}
