import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white'; 
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'color' }) => {
  // Matching the rose/terracotta color from the logo image
  const primaryColor = variant === 'color' ? '#be4b5d' : '#ffffff';
  const textColor = variant === 'color' ? 'text-[#be4b5d]' : 'text-white';
  const taglineColor = variant === 'color' ? 'text-slate-500' : 'text-rose-100';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stylized Uterus/Ovaries Icon */}
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        {/* Central Uterus Shape */}
        <path 
          d="M50 85C50 85 38 75 35 60C33 50 38 40 38 40H62C62 40 67 50 65 60C62 75 50 85 50 85Z" 
          stroke={primaryColor} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        {/* Fallopian Tubes */}
        <path d="M38 45C20 45 15 52 15 62" stroke={primaryColor} strokeWidth="5" strokeLinecap="round" />
        <path d="M62 45C80 45 85 52 85 62" stroke={primaryColor} strokeWidth="5" strokeLinecap="round" />
        
        {/* Ovaries */}
        <circle cx="15" cy="65" r="6" fill={primaryColor} />
        <circle cx="85" cy="65" r="6" fill={primaryColor} />

        {/* Sprout/Leaf Detail (representing the 'O' flourish from the original design) */}
        <path d="M50 40V30" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M50 30C50 30 58 22 62 28" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M50 35C50 35 44 28 40 32" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
      </svg>
      
      <div className="flex flex-col leading-none justify-center">
        <span className={`text-2xl font-bold tracking-wide ${textColor} uppercase`} style={{ letterSpacing: '0.05em' }}>
          OvaCare
        </span>
        <span className={`text-[10px] uppercase tracking-wider ${taglineColor} font-medium mt-1`}>
          Smart Health for Women
        </span>
      </div>
    </div>
  );
};

export default Logo;