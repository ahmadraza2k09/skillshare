interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'mark';
  light?: boolean;
}

const sizes = {
  sm: { mark: 28, text: 'text-lg' },
  md: { mark: 36, text: 'text-2xl' },
  lg: { mark: 52, text: 'text-4xl' },
};

export default function Logo({ size = 'md', variant = 'full', light = false }: LogoProps) {
  const s = sizes[size];

  const mark = (
    <svg
      width={s.mark}
      height={s.mark}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="9" fill="#1B5E3B" />
      {/* Left person */}
      <circle cx="11" cy="13" r="3.5" fill="white" />
      <path
        d="M11 17 L11 26 M11 21 L19 22.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right person */}
      <circle cx="29" cy="13" r="3.5" fill="white" />
      <path
        d="M29 17 L29 26 M29 21 L21 22.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Meeting point — the spark of connection */}
      <circle cx="20" cy="22.5" r="3.2" fill="#E8820C" />
    </svg>
  );

  if (variant === 'mark') return mark;

  return (
    <div className="flex items-center gap-2.5">
      {mark}
      <span
        className={`${s.text} font-display font-semibold tracking-tight leading-none ${light ? 'text-white' : 'text-[#141210]'}`}
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Khayr
      </span>
    </div>
  );
}
