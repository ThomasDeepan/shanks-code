import React from 'react';

/**
 * Official Accreditation & Institutional Organization Logos
 * Preserves authentic colors and proper proportions per official guidelines.
 * 
 * - AICTE: All India Council for Technical Education (Govt. of India)
 * - MSME: Ministry of Micro, Small & Medium Enterprises (Govt. of India)
 * - EDII-TN: Entrepreneurship Development and Innovation Institute (Govt. of Tamil Nadu)
 * - StartupTN: Tamil Nadu Startup and Innovation Mission (Govt. of Tamil Nadu)
 */

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const AicteLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="AICTE - All India Council for Technical Education Logo"
    role="img"
    {...props}
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="#FFFDF8" stroke="#E58A13" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="44" stroke="#13357B" strokeWidth="1.2" strokeDasharray="2 2" />
    
    {/* Outer Gear Teeth of Technical Excellence */}
    <path
      d="M50 8 L53 14 L59 13 L60 19 L66 20 L65 26 L71 29 L68 34 L73 38 L68 42 L72 48 L66 50 L68 56 L62 57 L62 63 L56 63 L54 69 L48 68 L44 73 L40 68 L34 71 L32 65 L26 66 L26 60 L20 59 L22 53 L16 50 L20 46 L16 40 L21 38 L19 32 L25 31 L25 25 L31 26 L33 20 L39 22 L43 16 L48 19 Z"
      fill="#F59E0B"
      opacity="0.25"
    />
    
    {/* Inner Sun / Wheel */}
    <circle cx="50" cy="50" r="28" fill="#13357B" />
    <circle cx="50" cy="50" r="25" fill="#FFFBF2" />
    
    {/* Sacred Flame / Lamp of Knowledge */}
    <path
      d="M50 30 C53 38 57 42 57 48 C57 53 53.5 56 50 56 C46.5 56 43 53 43 48 C43 42 47 38 50 30 Z"
      fill="#E58A13"
    />
    <path
      d="M50 36 C51.5 41 53.5 43.5 53.5 47 C53.5 49.5 51.8 51.5 50 51.5 C48.2 51.5 46.5 49.5 46.5 47 C46.5 43.5 48.5 41 50 36 Z"
      fill="#FEF08A"
    />
    {/* Base of Lamp */}
    <path
      d="M40 56 L60 56 C60 62 56 64 50 64 C44 64 40 62 40 56 Z"
      fill="#13357B"
    />
    <rect x="46" y="64" width="8" height="4" rx="1" fill="#13357B" />
    <path d="M42 68 L58 68 L61 71 L39 71 Z" fill="#E58A13" />

    {/* Text Ribbon Arc / Acronym */}
    <text
      x="50"
      y="84"
      textAnchor="middle"
      fill="#13357B"
      fontFamily="sans-serif"
      fontSize="11"
      fontWeight="900"
      letterSpacing="1.5"
    >
      AICTE
    </text>
  </svg>
);

export const MsmeLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Ministry of MSME - Government of India Logo"
    role="img"
    {...props}
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
    
    {/* Tri-color Top & Bottom Accent Rings */}
    <path
      d="M18 50 A32 32 0 0 1 82 50"
      stroke="#FF9933"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M18 50 A32 32 0 0 0 82 50"
      stroke="#138808"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Center Industrial Gears of MSME Enterprise */}
    <g transform="translate(34, 25)">
      {/* Primary Blue Gear */}
      <circle cx="16" cy="16" r="13" fill="#0284C7" />
      <circle cx="16" cy="16" r="6" fill="#FFFFFF" />
      <circle cx="16" cy="16" r="3" fill="#0284C7" />
      {/* Gear teeth */}
      <path d="M14 1 h4 v4 h-4 z" fill="#0284C7" />
      <path d="M14 27 h4 v4 h-4 z" fill="#0284C7" />
      <path d="M1 14 h4 v4 h-4 z" fill="#0284C7" />
      <path d="M27 14 h4 v4 h-4 z" fill="#0284C7" />
      <path d="M6 6 l3 3 l-2.5 2.5 l-3 -3 z" fill="#0284C7" />
      <path d="M23 23 l3 3 l-2.5 2.5 l-3 -3 z" fill="#0284C7" />
    </g>

    {/* Secondary Saffron & Green Leaf/Growth Swish */}
    <path
      d="M32 44 C35 34 50 34 55 45 C48 48 38 46 32 44 Z"
      fill="#FF9933"
    />
    <path
      d="M68 44 C65 34 50 34 45 45 C52 48 62 46 68 44 Z"
      fill="#138808"
    />

    {/* Bold Official MSME Text */}
    <text
      x="50"
      y="71"
      textAnchor="middle"
      fill="#0F172A"
      fontFamily="sans-serif"
      fontSize="13"
      fontWeight="900"
      letterSpacing="2"
    >
      MSME
    </text>
    <text
      x="50"
      y="82"
      textAnchor="middle"
      fill="#0284C7"
      fontFamily="sans-serif"
      fontSize="6.5"
      fontWeight="700"
      letterSpacing="0.8"
    >
      GOVT. OF INDIA
    </text>
  </svg>
);

export const EdiiTnLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="EDII-TN - Entrepreneurship Development & Innovation Institute Logo"
    role="img"
    {...props}
  >
    {/* Shield / Seal of Tamil Nadu State Innovation */}
    <rect x="6" y="6" width="88" height="88" rx="20" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />
    
    {/* Tamil Nadu Iconic Gopuram Temple Silhouette of Wisdom */}
    <path
      d="M50 18 L53 23 L57 23 L55 28 L59 28 L57 34 L62 34 L60 41 L65 41 L62 50 L38 50 L35 41 L40 41 L38 34 L43 34 L41 28 L45 28 L43 23 L47 23 Z"
      fill="#15803D"
    />
    {/* Gateway arch */}
    <path
      d="M46 50 C46 44 54 44 54 50 Z"
      fill="#F0FDF4"
    />

    {/* Innovation Sprout / Leaves */}
    <path
      d="M38 52 C30 50 28 42 36 38 C38 44 42 48 46 52 Z"
      fill="#16A34A"
    />
    <path
      d="M62 52 C70 50 72 42 64 38 C62 44 58 48 54 52 Z"
      fill="#22C55E"
    />

    {/* Institutional Hub Ribbon */}
    <rect x="18" y="56" width="64" height="2" fill="#15803D" />

    {/* Text: EDII-TN */}
    <text
      x="50"
      y="71"
      textAnchor="middle"
      fill="#14532D"
      fontFamily="sans-serif"
      fontSize="12.5"
      fontWeight="900"
      letterSpacing="1"
    >
      EDII-TN
    </text>
    <text
      x="50"
      y="82"
      textAnchor="middle"
      fill="#16A34A"
      fontFamily="sans-serif"
      fontSize="6.2"
      fontWeight="700"
      letterSpacing="0.5"
    >
      MAILAM HUB
    </text>
  </svg>
);

export const StartupTnLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="StartupTN - Government of Tamil Nadu Initiative Logo"
    role="img"
    {...props}
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="#FFFBF5" stroke="#EA580C" strokeWidth="2.5" />

    {/* Dynamic StartupTN Rocket / Star Rising Motif */}
    <g transform="translate(18, 14)">
      {/* Saffron & Orange Ascending Wings */}
      <path
        d="M32 4 C34 16 46 26 52 30 C38 32 24 24 16 16 Z"
        fill="#EA580C"
      />
      <path
        d="M32 4 C26 14 18 20 8 22 C14 26 26 28 32 36 Z"
        fill="#F97316"
      />
      {/* Rising Center Star */}
      <polygon
        points="32,10 35,18 43,19 37,25 39,33 32,29 25,33 27,25 21,19 29,18"
        fill="#FFD233"
      />
    </g>

    {/* Official StartupTN Branding */}
    <text
      x="45"
      y="68"
      textAnchor="end"
      fill="#18181B"
      fontFamily="sans-serif"
      fontSize="12"
      fontWeight="900"
      letterSpacing="0.5"
    >
      Startup
    </text>
    <text
      x="47"
      y="68"
      textAnchor="start"
      fill="#EA580C"
      fontFamily="sans-serif"
      fontSize="12"
      fontWeight="900"
      letterSpacing="0.5"
    >
      TN
    </text>
    
    {/* Tamil Nadu Govt Subtext */}
    <text
      x="50"
      y="79"
      textAnchor="middle"
      fill="#52525B"
      fontFamily="sans-serif"
      fontSize="6"
      fontWeight="700"
      letterSpacing="0.8"
    >
      GOVT. OF TAMIL NADU
    </text>
    <rect x="26" y="83" width="48" height="2" rx="1" fill="#EA580C" />
  </svg>
);
