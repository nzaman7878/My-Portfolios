import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  const baseClasses = 'animate-pulse bg-[var(--color-border-custom)]';
  
  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      {...props}
    />
  );
}
