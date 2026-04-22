import type { SVGProps } from "react";

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function CertificateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="13" rx="1" />
      <path d="M8 10h8M8 13h5" />
      <path d="M9 17v3l3-1.5L15 20v-3" />
    </svg>
  );
}

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 20c0-9 7-16 16-16 0 9-7 16-16 16z" />
      <path d="M4 20c4-4 8-7 12-10" />
    </svg>
  );
}

export function HandsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M8 11V6a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11 11V5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M14 11V6a1.5 1.5 0 0 1 3 0v9a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-3l-1.5-1.5a1 1 0 0 1 1.4-1.4L8 11" />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4.5 4.5h4l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 2.5 6.5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14 4h6v6" />
      <path d="M10 14L20 4" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function MuscleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 14c0-3 2-5 5-5h2a4 4 0 0 1 4 4c0 3-2 5-2 8" />
      <path d="M13 9V7a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v3c0 2-1 4-3 5" />
      <path d="M6 16c-1 1-1 3 0 4" />
    </svg>
  );
}

export function NeckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="6" r="3" />
      <path d="M9 9c0 2 1 3 3 3s3-1 3-3" />
      <path d="M6 20c0-4 3-7 6-7s6 3 6 7" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M15 3h-2a3.5 3.5 0 0 0-3.5 3.5V9H7v3h2.5v9h3v-9H15l.5-3h-3V7a1 1 0 0 1 1-1H15V3z" />
    </svg>
  );
}
