import React from 'react';

interface TfdMarkProps {
  className?: string;
}

/**
 * Bespoke architectural stencil & optical-datum brand mark for The Future Department.
 * Combines a chamfered foundry plate, calibration crosshair ticks, and interlocked T-F-D geometry.
 */
export const TfdMark: React.FC<TfdMarkProps> = ({ className = 'h-10 w-10' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Chamfered Outer Foundry Plate */}
      <path
        d="M2 2H52L62 12V62H2V2Z"
        fill="#0A0B0A"
        stroke="#C6FF00"
        strokeWidth="3"
      />
      {/* Corner Calibration Fold */}
      <path d="M51 2V13H62" stroke="#C6FF00" strokeWidth="2" />
      {/* 4-Axis Metrology Reticle Ticks */}
      <line x1="32" y1="2" x2="32" y2="8" stroke="#C6FF00" strokeWidth="2" />
      <line x1="32" y1="56" x2="32" y2="62" stroke="#C6FF00" strokeWidth="2" />
      <line x1="2" y1="32" x2="8" y2="32" stroke="#C6FF00" strokeWidth="2" />
      <line x1="56" y1="32" x2="62" y2="32" stroke="#C6FF00" strokeWidth="2" />
      {/* Interlocked Stencil T / F / D Monogram */}
      <rect x="12" y="14" width="40" height="6" fill="#C6FF00" />
      <rect x="12" y="23" width="7" height="27" fill="#C6FF00" />
      <rect x="22" y="29" width="12" height="6" fill="#C6FF00" />
      <path
        d="M37 23H46L52 29V44L46 50H37V23ZM43 29V44H46V29H43Z"
        fill="#F4F4F0"
      />
      <rect x="22" y="43" width="7" height="7" fill="#C6FF00" />
    </svg>
  );
};

