// components/AboutUsSection.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Chatbot from './Chatbot'; // Import Chatbot component

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aiElementRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Add state for chatbot
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotMode, setChatbotMode] = useState<'getInTouch'>('getInTouch');

  // Placeholder client logos - replace with your actual logos
  const clientLogos = [
    { id: 1, name: 'Client 1', logo: '/logos/1.png' },
    { id: 2, name: 'Client 2', logo: '/logos/2.png' },
    { id: 3, name: 'Client 3', logo: '/logos/3.png' },
    { id: 4, name: 'Client 4', logo: '/logos/4.png' },
    { id: 5, name: 'Client 5', logo: '/logos/5.png' }
  ];

  // Create a duplicated array for seamless marquee loop
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  useEffect(() => {
    if (!inView) return;

    // 3D floating animation for AI element
    gsap.to(aiElementRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Title animation with 3D effect
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        rotationX: 45,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
        rotationY: 15,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Mission section animation
    gsap.fromTo(
      missionRef.current,
      {
        opacity: 0,
        x: -50,
        rotationZ: 2,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        x: 0,
        rotationZ: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Team section animation
    gsap.fromTo(
      teamRef.current,
      {
        opacity: 0,
        x: 50,
        rotationZ: -2,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        x: 0,
        rotationZ: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Why Choose Us animation
    gsap.fromTo(
      whyChooseUsRef.current,
      {
        opacity: 0,
        scale: 0.9,
        rotationX: 15,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        delay: 0.9,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: whyChooseUsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Clients section animation
    gsap.fromTo(
      clientsRef.current,
      {
        opacity: 0,
        y: 30,
        rotationX: 10,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: clientsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Marquee animation
    if (marqueeInnerRef.current) {
      const marquee = marqueeInnerRef.current;
      // Get all logo items using querySelectorAll
      const logoItems = marquee.querySelectorAll('.logo-item');

      if (logoItems.length > 0) {
        const firstLogo = logoItems[0] as HTMLElement;
        const logoWidth = firstLogo.offsetWidth;
        const totalWidth = logoWidth * clientLogos.length;

        gsap.to(marquee, {
          x: -totalWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
          }
        });
      }
    }

    // Contact section animation
    gsap.fromTo(
      contactRef.current,
      {
        opacity: 0,
        y: 50,
        rotationY: -15,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: 1.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );

    // AI particles animation
    const particles = document.querySelectorAll('.ai-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        x: gsap.utils.random(-20, 20),
        y: gsap.utils.random(-20, 20),
        opacity: gsap.utils.random(0.3, 0.8),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.1
      });
    });
  }, [inView, clientLogos.length]);

  return (
    <section
      id='AboutUs'
      ref={sectionRef}
      className='relative bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
    >
      {/* AI floating element */}
      <div
        ref={aiElementRef}
        className='absolute top-10 right-10 z-10 hidden md:block'
      >
        <div className='relative'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-[#f1c75b] to-yellow-600 opacity-20 blur-xl'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#f1c75b] to-yellow-600 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-black'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* AI particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className='ai-particle absolute w-1 h-1 bg-[#f1c75b] rounded-full opacity-40'
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        ></div>
      ))}

      <div className='max-w-7xl mx-auto relative z-20' ref={ref}>
        {/* Title */}
        <div ref={titleRef} className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
            <span className='text-white'>About </span>
            <span className='text-[#f1c75b]'>Us</span>
          </h1>
          <div className='w-24 h-1 bg-[#f1c75b] mx-auto'></div>
        </div>

        {/* Introduction */}
        <div ref={contentRef} className='mb-16'>
          <p className='text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto text-center'>
            At The Aethon Group, we're a dynamic team of experts dedicated to
            helping businesses thrive in today's fast-paced world. With a wide
            range of services under one roof, we offer comprehensive solutions
            to drive growth, innovation, and success.
          </p>
        </div>

        {/* Mission */}
        <div
          ref={missionRef}
          className='mb-16 bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800'
        >
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-[#f1c75b]'>
            Our Mission
          </h2>
          <p className='text-gray-300'>
            Our mission is to empower businesses with cutting-edge strategies,
            creative solutions, and expert guidance. We believe in building
            long-term relationships with our clients, understanding their unique
            needs, and delivering tailored services that exceed their
            expectations.
          </p>
        </div>

        {/* Team */}
        <div
          ref={teamRef}
          className='mb-16 bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800'
        >
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-[#f1c75b]'>
            Our Team
          </h2>
          <p className='text-gray-300'>
            Our team is comprised of seasoned professionals with a passion for
            innovation and excellence. We're committed to staying up-to-date
            with the latest trends and technologies to deliver cutting-edge
            solutions that drive results.
          </p>
        </div>

        {/* Why Choose Us */}
        <div ref={whyChooseUsRef} className='mb-16'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center text-[#f1c75b]'>
            Why Choose Us?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transform transition-transform hover:scale-105'>
              <div className='flex items-start mb-4'>
                <div className='flex-shrink-0 mt-1'>
                  <div className='w-8 h-8 rounded-full bg-[#f1c75b] flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Holistic Approach
                  </h3>
                  <p className='text-gray-400 mt-1'>
                    A comprehensive approach to business solutions
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transform transition-transform hover:scale-105'>
              <div className='flex items-start mb-4'>
                <div className='flex-shrink-0 mt-1'>
                  <div className='w-8 h-8 rounded-full bg-[#f1c75b] flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 极 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Multi-Domain Expertise
                  </h3>
                  <p className='text-gray-400 mt-1'>
                    Expertise across multiple business domains
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transform transition-transform hover:scale-105'>
              <div className='flex items-start mb-4'>
                <div className='flex-shrink-0 mt-1'>
                  <div className='w-8 h-8 rounded-full bg-[#f1c75b] flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Personalized Attention
                  </h3>
                  <p className='text-gray-400 mt-1'>
                    Tailored services for your unique needs
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transform transition-transform hover:scale-105'>
              <div className='flex items-start mb-4'>
                <div className='flex-shrink-0 mt-1'>
                  <div className='w-8 h-8 rounded-full bg-[#f1c75b] flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-black'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-semib极 text-white'>
                    Exceptional Results
                  </h3>
                  <p className='text-gray-400 mt-1'>
                    Commitment to delivering outstanding outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Clients Section */}
        <div ref={clientsRef} className='mb-16'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center text-[#f1c75b]'>
            Our Clients
          </h2>
          <div className='overflow-hidden py-8'>
            <div ref={marqueeRef} className='relative'>
              <div ref={marqueeInnerRef} className='flex space-x-12'>
                {duplicatedLogos.map(client => (
                  <div
                    key={`${client.id}-${client.name}`}
                    className='logo-item flex-shrink-0 w-40 h-20 bg-transparent rounded-lg flex items-center justify-center '
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={60}
                      className='max-h-12 max-w-full object-contain'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div ref={contactRef} className='text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-[#f1c75b]'>
            Get in Touch
          </h2>
          <p className='text-gray-300 mb-8 max-w-2xl mx-auto'>
            Ready to take your business to the next level? Contact us today to
            learn more about our services and how we can help you achieve your
            goals.
          </p>
          {/* Updated Contact Us button */}
          <button 
            onClick={() => {
              setChatbotMode('getInTouch');
              setChatbotOpen(true);
            }}
            className='px-8 py-3 bg-[#f1c75b] text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1c75b]'
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot 
        mode={chatbotMode} 
        triggerOpen={chatbotOpen} 
        onClose={() => setChatbotOpen(false)}
      />
    </section>
  );
};

export default AboutUsSection;