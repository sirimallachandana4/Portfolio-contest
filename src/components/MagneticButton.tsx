import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  variant = 'primary',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const variantStyles = {
    primary:
      'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] border border-purple-400/40',
    secondary:
      'bg-[#141224]/85 hover:bg-[#1f1b36] text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
    glass:
      'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-md',
    ghost:
      'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border border-transparent'
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 cursor-pointer overflow-hidden group select-none ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      {/* Subtle shine sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Ripple/Glow point */}
      {isHovered && (
        <span className="absolute inset-0 rounded-full bg-purple-400/10 blur-sm pointer-events-none" />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
