export default function Logo({ className = '', size = 'md', light = false }) {
  const textSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'
  const iconSize = size === 'lg' ? 36 : size === 'sm' ? 24 : 30

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <rect width="30" height="30" rx="7" fill="#f97316" />
        <path
          d="M10 20L18 10M18 10H12M18 10V16"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`${textSize} font-bold tracking-tight`}>
        <span className={light ? 'text-white' : 'text-slate-950'}>Lamar</span>
        <span className={light ? 'text-orange-400' : 'text-orange-500'}>In</span>
      </span>
    </div>
  )
}
