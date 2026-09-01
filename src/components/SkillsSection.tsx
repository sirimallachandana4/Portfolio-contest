import React from 'react';
import { motion } from 'motion/react';
import { Skills3DScene } from './Skills3DScene';

interface SkillsSectionProps {
  onBackToOrbit: () => void;
  onNavigateProjects?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onBackToOrbit,
  onNavigateProjects
}) => {
  return (
    <motion.section
      id="skills_section_universe"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative flex flex-col justify-center min-h-[calc(100vh-100px)]"
    >
      <Skills3DScene
        onBackToOrbit={onBackToOrbit}
        onNavigateProjects={onNavigateProjects}
      />
    </motion.section>
  );
};
