// Set di icone "linea" semplici per servizi/ambienti.
// Tutte usano `currentColor` così seguono il colore del testo del genitore.
// Per aggiungerne una: definisci un componente e registralo nella mappa `icons`.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function Svg({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

function Wave(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 9c2 0 2.5-2 4.5-2S10 9 12 9s2.5-2 4.5-2S19 9 21 9" />
      <path d="M3 14c2 0 2.5-2 4.5-2S10 14 12 14s2.5-2 4.5-2S19 14 21 14" />
      <path d="M3 19c2 0 2.5-2 4.5-2S10 19 12 19s2.5-2 4.5-2S19 19 21 19" />
    </Svg>
  );
}

function Snowflake(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M5.6 5.6l12.8 12.8" />
      <path d="M18.4 5.6L5.6 18.4" />
      <path d="M9 4l3 3 3-3" />
      <path d="M9 20l3-3 3 3" />
      <path d="M4 9l3 3-3 3" />
      <path d="M20 9l-3 3 3 3" />
    </Svg>
  );
}

function Wifi(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 9.5C5.5 7 8.6 5.5 12 5.5S18.5 7 21 9.5" />
      <path d="M6 12.5c1.7-1.7 3.8-2.7 6-2.7s4.3 1 6 2.7" />
      <path d="M9 15.5c.9-.8 1.9-1.3 3-1.3s2.1.5 3 1.3" />
      <circle cx="12" cy="18.5" r="0.7" fill="currentColor" stroke="none" />
    </Svg>
  );
}

function Kitchen(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <circle cx="8" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <rect x="8" y="13" width="8" height="5" rx="0.5" />
    </Svg>
  );
}

function Washer(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="14" r="4.5" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="7" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}

function Parking(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M10 17V8h3.5a2.5 2.5 0 0 1 0 5H10" />
    </Svg>
  );
}

function Tv(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </Svg>
  );
}

function Linens(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 18V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
      <path d="M3 14h18" />
      <path d="M3 18h18" />
      <path d="M7 8v4" />
      <path d="M17 8v4" />
    </Svg>
  );
}

function Sofa(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12v-2a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2" />
      <path d="M3 12h18a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
      <path d="M6 18v2" />
      <path d="M18 18v2" />
    </Svg>
  );
}

function Bed(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 18V8" />
      <path d="M21 18v-5a3 3 0 0 0-3-3H10v-2" />
      <path d="M3 13h18" />
      <circle cx="7" cy="11.5" r="1.5" />
      <path d="M3 21v-3" />
      <path d="M21 21v-3" />
    </Svg>
  );
}

function Bath(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z" />
      <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
      <path d="M5 19l-1 2" />
      <path d="M19 19l1 2" />
    </Svg>
  );
}

const icons = {
  wave: Wave,
  snowflake: Snowflake,
  wifi: Wifi,
  kitchen: Kitchen,
  washer: Washer,
  parking: Parking,
  tv: Tv,
  linens: Linens,
  sofa: Sofa,
  bed: Bed,
  bath: Bath,
} as const;

export type IconName = keyof typeof icons;

type Props = IconProps & { name: IconName };

export function Icon({ name, ...rest }: Props) {
  const Cmp = icons[name];
  return <Cmp {...rest} />;
}
