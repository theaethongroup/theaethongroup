// lib/gsap.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initGSAP = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Global GSAP settings
  gsap.defaults({
    ease: 'power3.out',
  });
  
  // ScrollTrigger settings
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  });
};