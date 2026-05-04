/**
 * Abstract hero visual: network nodes and paths suggesting systems, data flow, and continuity.
 */
export function InfinityGraphic() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
      aria-hidden
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full text-sky-400/40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#glow)" filter="url(#blur)" />
        <path
          d="M80 200 Q200 80 320 200 Q200 320 80 200"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M120 200 Q200 120 280 200 Q200 280 120 200"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M200 60 L240 140 L200 200 L160 140 Z"
          stroke="url(#lineGrad)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M200 240 L280 280 L200 340 L120 280 Z"
          stroke="url(#lineGrad)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
        />
        {[
          [200, 80],
          [320, 200],
          [200, 320],
          [80, 200],
          [260, 120],
          [140, 120],
          [260, 280],
          [140, 280],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="5"
              className="fill-sky-400/30 stroke-sky-300/50"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy} r="2" className="fill-sky-200/80" />
          </g>
        ))}
        <line
          x1="200"
          y1="80"
          x2="320"
          y2="200"
          stroke="url(#lineGrad)"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <line
          x1="320"
          y1="200"
          x2="200"
          y2="320"
          stroke="url(#lineGrad)"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <line
          x1="200"
          y1="320"
          x2="80"
          y2="200"
          stroke="url(#lineGrad)"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <line
          x1="80"
          y1="200"
          x2="200"
          y2="80"
          stroke="url(#lineGrad)"
          strokeWidth="0.6"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
