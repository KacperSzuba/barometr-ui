import type { SVGProps } from "react";

/**
 * The application's icon set — paths transcribed 1:1 from the prototypes.
 *
 * `lucide-react` is deliberately not used: the current release has redrawn
 * shapes (Map, Building, Sliders, Activity, Settings and LifeBuoy among others),
 * so swapping it in would change how the interface looks. The set is closed —
 * 22 icons.
 */

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number;
  strokeWidth?: number;
}

type IconComponent = (props: IconProps) => React.ReactElement;

const icon = (children: React.ReactNode): IconComponent =>
  function Icon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
    );
  };

/* ——— brand and navigation ——————————————————————————————— */

export const Activity = icon(<path d="M22 12h-4l-3 9L9 3l-3 9H2" />);

export const PanelLeft = icon(
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
  </>,
);

export const Map = icon(
  <>
    <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
    <path d="M9 3v15" />
    <path d="M15 6v15" />
  </>,
);

export const Globe = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
  </>,
);

export const Briefcase = icon(
  <>
    <rect width="18" height="13" x="3" y="7" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </>,
);

export const Building = icon(
  <>
    <rect width="14" height="18" x="5" y="3" rx="2" />
    <path d="M9 8h.01" />
    <path d="M15 8h.01" />
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M10 21v-4h4v4" />
  </>,
);

export const Landmark = icon(
  <>
    <path d="M3 21h18" />
    <path d="m12 3 9 6H3z" />
    <path d="M6 9v9" />
    <path d="M12 9v9" />
    <path d="M18 9v9" />
  </>,
);

export const Cpu = icon(
  <>
    <rect width="12" height="12" x="6" y="6" rx="2" />
    <path d="M9 2v3" />
    <path d="M15 2v3" />
    <path d="M9 19v3" />
    <path d="M15 19v3" />
    <path d="M2 9h3" />
    <path d="M2 15h3" />
    <path d="M19 9h3" />
    <path d="M19 15h3" />
  </>,
);

export const CreditCard = icon(
  <>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
  </>,
);

export const Sliders = icon(
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
    <circle cx="9" cy="6" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="8" cy="18" r="2" />
  </>,
);

export const Settings = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>,
);

export const LifeBuoy = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="m4.9 4.9 4.2 4.2" />
    <path d="m14.9 14.9 4.2 4.2" />
    <path d="m14.9 9.1 4.2-4.2" />
    <path d="m4.9 19.1 4.2-4.2" />
  </>,
);

export const LogOut = icon(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </>,
);

export const Menu = icon(
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </>,
);

/* ——— content ————————————————————————————————————————————— */

export const Check = icon(<path d="M20 6 9 17l-5-5" />);

export const ArrowRight = icon(
  <>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>,
);

export const ArrowUpRight = icon(
  <>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </>,
);

export const Shield = icon(
  <path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />,
);

export const Sparkle = icon(<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />);

export const Database = icon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </>,
);

export const TriangleAlert = icon(
  <>
    <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </>,
);

export const Lock = icon(
  <>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>,
);

export type { IconComponent };
