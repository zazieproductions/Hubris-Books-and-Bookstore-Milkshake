/* ---------------------------------------------------------------------------
   Hubris Munnytown — Chief Executive Rabbit.
   Rendered as an inline SVG so he is always available, never lazy-loaded,
   and impossible to block with an ad blocker. He is watching. Adorably.
--------------------------------------------------------------------------- */

interface BunnyProps {
  size?: number;
  className?: string;
  /** Adds the gold monocle. Worn in all official portraits since Q3 2025. */
  monocle?: boolean;
  /** Adds the tiny gold bow tie. Contractually required in marketing materials. */
  bowTie?: boolean;
  title?: string;
}

export function SmugBunny({ size = 48, className = "", monocle = true, bowTie = true, title }: BunnyProps) {
  return (
    <svg
      viewBox="0 0 120 132"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title ?? "Hubris Munnytown, Chief Executive Rabbit, looking smug"}
    >
      {/* ears */}
      <path d="M45 48 C35 22 39 4 50 4 C61 4 63 26 59 48 Z" fill="#FAF6ED" stroke="#0F1E3D" strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 45 C42 25 45 12 51 12 C56 12 57 29 54 45 Z" fill="#FF6FA5" opacity="0.5" />
      <path d="M75 48 C85 22 81 4 70 4 C59 4 57 26 61 48 Z" fill="#FAF6ED" stroke="#0F1E3D" strokeWidth="3" strokeLinejoin="round" />
      <path d="M72 45 C78 25 75 12 69 12 C64 12 63 29 66 45 Z" fill="#FF6FA5" opacity="0.5" />

      {/* head */}
      <ellipse cx="60" cy="78" rx="37" ry="33" fill="#FAF6ED" stroke="#0F1E3D" strokeWidth="3" />
      {/* cheek fluff */}
      <path d="M25 82 q-6 4 -2 9 q6 3 9 -3" fill="#FAF6ED" stroke="#0F1E3D" strokeWidth="2" />
      <path d="M95 82 q6 4 2 9 q-6 3 -9 -3" fill="#FAF6ED" stroke="#0F1E3D" strokeWidth="2" />

      {/* smug half-lidded eyes */}
      <g>
        <ellipse cx="46" cy="74" rx="8" ry="7" fill="#FFFFFF" stroke="#0F1E3D" strokeWidth="2" />
        <circle cx="48" cy="76" r="3.4" fill="#0F1E3D" />
        <path d="M38 73 Q46 65 54 73 Z" fill="#0F1E3D" opacity="0.9" />
        <ellipse cx="74" cy="74" rx="8" ry="7" fill="#FFFFFF" stroke="#0F1E3D" strokeWidth="2" />
        <circle cx="76" cy="76" r="3.4" fill="#0F1E3D" />
        <path d="M66 73 Q74 65 82 73 Z" fill="#0F1E3D" opacity="0.9" />
      </g>
      {/* raised brow — the money brow */}
      <path d="M36 62 Q46 55 56 60" fill="none" stroke="#0F1E3D" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 60 Q74 54 84 61" fill="none" stroke="#0F1E3D" strokeWidth="3" strokeLinecap="round" />

      {/* nose + smirk + one visible tooth */}
      <path d="M56 86 h8 l-4 5 z" fill="#FF6FA5" stroke="#0F1E3D" strokeWidth="1.5" />
      <path d="M49 96 Q60 104 74 93" fill="none" stroke="#0F1E3D" strokeWidth="3" strokeLinecap="round" />
      <rect x="59" y="97" width="6" height="7" rx="1" fill="#FFFFFF" stroke="#0F1E3D" strokeWidth="1.5" />

      {/* whiskers */}
      <g stroke="#0F1E3D" strokeWidth="1.6" strokeLinecap="round" opacity="0.65">
        <path d="M20 88 L36 90" />
        <path d="M21 96 L36 95" />
        <path d="M100 88 L84 90" />
        <path d="M99 96 L84 95" />
      </g>

      {monocle && (
        <g>
          <circle cx="74" cy="74" r="13" fill="none" stroke="#C9A227" strokeWidth="3" />
          <path d="M87 76 q8 8 6 18" fill="none" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {bowTie && (
        <g>
          <path d="M60 116 L42 108 L42 124 Z" fill="#C9A227" stroke="#0F1E3D" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M60 116 L78 108 L78 124 Z" fill="#C9A227" stroke="#0F1E3D" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="60" cy="116" r="5" fill="#E8CE6A" stroke="#0F1E3D" strokeWidth="2.5" />
        </g>
      )}
    </svg>
  );
}

/** Small round avatar used for bylines in the newsroom. */
export function BylineAvatar({ bunny, initials, color, size = 40 }: { bunny?: boolean; initials: string; color: string; size?: number }) {
  if (bunny) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full border-2 shrink-0"
        style={{ width: size, height: size, background: "#0F1E3D", borderColor: "#C9A227" }}
      >
        <SmugBunny size={size - 6} monocle={false} bowTie={false} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-mono font-bold text-white shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.34 }}
    >
      {initials}
    </span>
  );
}
