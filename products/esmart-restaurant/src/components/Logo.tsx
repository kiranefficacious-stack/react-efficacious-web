import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  lightText?: boolean;
}

export default function Logo({
  className = 'h-10 sm:h-12',
  variant,
  lightText
}: LogoProps) {
  const isDark = variant === 'dark' || lightText === true;
  return (
    <img
      src={isDark ? '/esmart-restaurant/logo-dark.png' : '/esmart-restaurant/logo.png'}
      className={`${className} object-contain transition-all duration-200`}
      alt="e-Smart Restaurant Logo"
    />
  );
}
