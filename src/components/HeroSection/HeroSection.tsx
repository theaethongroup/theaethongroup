'use client'
import { FlipWords } from '@/components/ui/flip-words'
import React, { useState } from 'react'
import Chatbot from '../Chatbot';

export default function HeroSection() {
  
      const [chatbotOpen, setChatbotOpen] = useState(false);
      const [chatbotMode, setChatbotMode] = useState<'getInTouch'>('getInTouch');
  return (
    <section className='w-full min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-28 sm:pt-32 md:pt-40 py-12 gap-10 md:gap-6'>
      {/* ✅ TEXT FIRST */}
      <div className='text-white w-full md:w-1/2 text-center md:text-left order-1 md:order-none'>
  <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight'>
  <span className="md:whitespace-nowrap">
    We craft powerful{' '}
    <FlipWords
      words={[
        'Brands',
        'Stories',
        'Experiences',
        'Narratives',
        'Connections',
        'Visions',
        'Journeys'
      ]}
      className='text-[#f1c75b]'
    />
  </span>
</h1>

        <h2 className='text-3xl mt-2 font-extrabold'>that move people.</h2>

        <p className='mt-6 text-base sm:text-lg md:text-2xl text-neutral-300 leading-relaxed'>
          From branding to media and events — The Aethon Group
          <br className='hidden md:inline' />
          brings your vision to life with bold strategy and timeless
          storytelling.
        </p>

        <div className='mt-8'>
          <button
                onClick={() => {
              setChatbotMode('getInTouch');
              setChatbotOpen(true);
            }}
            className='px-6 py-3 rounded-full bg-[#f1c75b] text-black text-base sm:text-lg font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg'>
            Get Started
          </button>
        </div>
      </div>

      {/* ✅ VIDEO SECOND (below text in mobile, right on desktop) */}
      <div className='w-full md:w-[300px] lg:w-[360px] order-2 md:order-none'>
        <video
          src='/iphonevideo.mp4'
          autoPlay
          muted
          loop
          playsInline
          className='rounded-[2.5rem] shadow-xl w-full'
        />
      </div>
        {/* Chatbot Component */}
                  <Chatbot 
                    mode={chatbotMode} 
                    triggerOpen={chatbotOpen} 
                    onClose={() => setChatbotOpen(false)}
                  />
    </section>
  )
}
