'use client';
import { useEffect, useState } from 'react';
import SplashLogo from '@/components/SplashLogo';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 5300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
      <SplashLogo />

      {/* Tagline Text */}
<motion.div
  className="mt-2 overflow-hidden"
  initial={{ width: 0 }}
  animate={{ width: "auto" }}
  transition={{ duration: 0 }} // just avoids weird glitch
>
  <motion.p
    className="text-sm md:text-lg tracking-wider text-[#f1c75b]"
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 1.2, duration: 3.2, ease: 'easeInOut' }}
  >
    Branding | Media | Events | Strategy
  </motion.p>
</motion.div>
    </div>
  );
}
