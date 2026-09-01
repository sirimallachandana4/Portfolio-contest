import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onLoaded, 450);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#08080c] flex flex-col items-center justify-center select-none"
        >
          {/* Logo Monogram & Orbiting Energy Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer Orbiting Energy Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-purple-500/30"
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]" />
            </motion.div>

            {/* Inner Counter Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-indigo-400/25"
            />

            <span className="text-3xl font-bold font-mono text-white tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              CS.
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6 space-y-1.5"
          >
            <p className="text-xs font-mono text-purple-300 tracking-[0.3em] uppercase font-medium">
              Entering my digital space...
            </p>
            <p className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">
              Initializing 3D Universe
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
