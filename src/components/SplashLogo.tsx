'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoImage from '/public/SplashLogo.png';

export default function SplashLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1.2 }} // <- increased scale for zoom effect
      transition={{ duration: 1.8, ease: 'easeOut' }}
      className="w-[220px] h-[220px] relative overflow-visible"
    >
      <Image src={LogoImage} alt="The Aethon Group Logo" fill priority />
    </motion.div>
  );
}
