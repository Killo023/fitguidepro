import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 60" 
      width="200" 
      height="60"
      {...props}>
      <g fill="currentColor">
        {/* Left Barbell */}
        <rect x="25" y="15" width="8" height="30" rx="2"></rect>
        <rect x="15" y="12" width="8" height="36" rx="2"></rect>
        <rect x="35" y="22.5" width="5" height="15" rx="1"></rect>
        <path d="M42,25 h-5 v10 h5 z"></path>
        <circle cx="10" cy="25" r="1.5"></circle>
        <circle cx="10" cy="35" r="1.5"></circle>
        <path d="M5 30 h10"></path>

        {/* Right Barbell */}
        <rect x="167" y="15" width="8" height="30" rx="2"></rect>
        <rect x="177" y="12" width="8" height="36" rx="2"></rect>
        <rect x="160" y="22.5" width="5" height="15" rx="1"></rect>
        <path d="M153,25 h5 v10 h-5 z"></path>
        <circle cx="190" cy="25" r="1.5"></circle>
        <circle cx="190" cy="35" r="1.5"></circle>
        <path d="M185 30 h10"></path>
        
        {/* Circuit lines */}
        <path stroke="currentColor" strokeWidth="1.5" fill="none" d="
          M50 15 h5 l10 -10 h15 l5 5
          M75 10 h40
          M120 10 l5 -5 h15 l10 10 h5
          M50 45 h5 l10 10 h15 l5 -5
          M75 50 h40
          M120 50 l5 5 h15 l10 -10 h5
          M100 5 V0
          M100 55 v5
          M70 10 l-5 -5
          M130 10 l5 -5
          M70 50 l-5 5
          M130 50 l5 5
        "></path>
        
        {/* Dots */}
        <circle cx="50" cy="15" r="2"></circle><circle cx="150" cy="15" r="2"></circle>
        <circle cx="50" cy="45" r="2"></circle><circle cx="150" cy="45" r="2"></circle>
        <circle cx="70" cy="5" r="2"></circle><circle cx="130" cy="5" r="2"></circle>
        <circle cx="70" cy="55" r="2"></circle><circle cx="130"cy="55" r="2"></circle>
        <circle cx="100" cy="0" r="2"></circle><circle cx="100" cy="60" r="2"></circle>
        <circle cx="60" cy="25" r="2"></circle><circle cx="60" cy="35" r="2"></circle>
        <circle cx="140" cy="25" r="2"></circle><circle cx="140" cy="35" r="2"></circle>

      </g>
    </svg>
  );
}


export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
