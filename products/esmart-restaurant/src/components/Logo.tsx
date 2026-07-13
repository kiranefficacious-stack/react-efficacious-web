import React from 'react';

interface LogoProps {
  className?: string;
  lightText?: boolean;
}

export default function Logo({ className = 'h-10 sm:h-12', lightText = false }: LogoProps) {
  return (
    <img
      src="/esmart-restaurant/logo.png"
      className={`${className} object-contain transition-all duration-200 ${lightText ? 'brightness-0 invert' : ''}`}
      alt="e-Smart Restaurant Logo"
    />
  );
}
