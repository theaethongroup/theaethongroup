import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Palette, 
  Target, 
  Users, 
  Calculator, 
  Settings, 
  Code, 
  Scale, 
  Search, 
  Megaphone, 
  Network, 
  Video, 
  Calendar, 
  Share2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import Chatbot from '../Chatbot';

const services = [
  { id: 1, name: "Brand Building", icon: Building2, description: "Create powerful brand identities that resonate with your audience", color: "from-yellow-400 to-yellow-600" },
  { id: 2, name: "Graphic Design", icon: Palette, description: "Stunning visual designs that capture your brand essence", color: "from-yellow-300 to-yellow-500" },
  { id: 3, name: "Business Strategy", icon: Target, description: "Strategic planning and development for sustainable growth", color: "from-yellow-500 to-yellow-700" },
  { id: 4, name: "Management", icon: Users, description: "Comprehensive business management solutions", color: "from-yellow-400 to-yellow-600" },
  { id: 5, name: "Finance", icon: Calculator, description: "Financial planning and management expertise", color: "from-yellow-300 to-yellow-500" },
  { id: 6, name: "End to End Operations", icon: Settings, description: "Complete operational management from start to finish", color: "from-yellow-500 to-yellow-700" },
  { id: 7, name: "Web & App Development", icon: Code, description: "Cutting-edge web and mobile solutions powered by AI", color: "from-yellow-400 to-yellow-600" },
  { id: 8, name: "Legalities", icon: Scale, description: "Legal compliance and documentation services", color: "from-yellow-300 to-yellow-500" },
  { id: 9, name: "SEO", icon: Search, description: "Search engine optimization for maximum visibility", color: "from-yellow-500 to-yellow-700" },
  { id: 10, name: "Digital Marketing", icon: Megaphone, description: "Comprehensive digital marketing strategies", color: "from-yellow-400 to-yellow-600" },
  { id: 11, name: "Network Management", icon: Network, description: "IT infrastructure and network solutions", color: "from-yellow-300 to-yellow-500" },
  { id: 12, name: "Media", icon: Video, description: "Creative media production and management", color: "from-yellow-500 to-yellow-700" },
  { id: 13, name: "Events", icon: Calendar, description: "End-to-end event planning and execution", color: "from-yellow-400 to-yellow-600" },
  { id: 14, name: "Social Media Management", icon: Share2, description: "Strategic social media presence and engagement", color: "from-yellow-300 to-yellow-500" }
];

export default function AnimatedServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
   // Add state for chatbot

  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotMode, setChatbotMode] = useState<'getInTouch'>('getInTouch');

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 3000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Visibility animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getVisibleCards = () => {
    const totalCards = services.length;
    const result = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      result.push({
        ...services[index],
        offset: i,
        isCenter: i === 0
      });
    }
    
    return result;
  };

  return (
    <div
      id='OurServicesSection'
      className="min-h-screen bg-black text-white py-16 px-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
            style={{
              background: '#f1c75b',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with enhanced animations */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 transition-all duration-1500 transform ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}>
            <span className="inline-block">Our</span>{' '}
            <span className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              Services
            </span>
          </h2>
          
          {/* Animated underline */}
          <div className="flex justify-center mb-8">
            <div className={`h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full transition-all duration-2000 delay-500 ${
              isVisible ? 'w-64' : 'w-0'
            }`}></div>
          </div>

          <p className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1500 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Comprehensive solutions tailored to accelerate your business growth and digital transformation
          </p>

          {/* Control buttons */}
          <div className={`flex justify-center items-center gap-4 mt-8 transition-all duration-1500 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={goToPrevious}
              className="p-3 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-full transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-full transition-all duration-300 group"
            >
              {isPlaying ? 
                <Pause className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" /> :
                <Play className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
              }
            </button>
            
            <button
              onClick={goToNext}
              className="p-3 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-full transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="relative h-96 md:h-80 lg:h-96 mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            {getVisibleCards().map((service, index) => {
              const IconComponent = service.icon;
              const offset = service.offset;
              const isCenter = service.isCenter;
              
              return (
                <div
                  key={`${service.id}-${currentIndex}`}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                    isCenter ? 'z-30' : offset === -1 || offset === 1 ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 280}px) 
                      scale(${isCenter ? 1 : offset === -1 || offset === 1 ? 0.8 : 0.6}) 
                      rotateY(${offset * 15}deg)
                    `,
                    opacity: Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.6
                  }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => !isCenter && setCurrentIndex(services.findIndex(s => s.id === service.id))}
                >
                  <div className={`w-72 h-80 bg-gradient-to-br from-gray-900 to-black border-2 rounded-3xl p-8 relative overflow-hidden group transition-all duration-500 ${
                    isCenter 
                      ? 'border-yellow-400 shadow-2xl shadow-yellow-400/30' 
                      : 'border-gray-700 hover:border-yellow-400/50'
                  }`}>
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className={`w-full h-full bg-gradient-to-br ${service.color} animate-pulse`}></div>
                    </div>

                    {/* Floating elements */}
                    {isCenter && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                            style={{
                              left: `${10 + Math.random() * 80}%`,
                              top: `${10 + Math.random() * 80}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </>
                    )}

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon with enhanced animation */}
                      <div className={`flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto transition-all duration-500 ${
                        isCenter ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 animate-bounce' : 'bg-gradient-to-br from-gray-700 to-gray-600'
                      }`}>
                        <IconComponent className={`w-10 h-10 transition-all duration-500 ${
                          isCenter ? 'text-black scale-110' : 'text-yellow-400'
                        }`} />
                      </div>

                      {/* Service name */}
                      <h3 className={`text-2xl font-bold mb-4 text-center transition-all duration-500 ${
                        isCenter ? 'text-yellow-400 scale-105' : 'text-white'
                      }`}>
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className={`text-gray-300 text-center leading-relaxed flex-grow transition-all duration-500 ${
                        isCenter ? 'text-gray-200' : 'text-gray-400'
                      }`}>
                        {service.description}
                      </p>

                      {/* Action indicator */}
                      {isCenter && (
                        <div className="mt-4 flex items-center justify-center text-yellow-400 font-medium animate-pulse">
                          <span>Featured Service</span>
                          <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                        </div>
                      )}
                    </div>

                    {/* Glowing border effect */}
                    {isCenter && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 animate-pulse"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className={`text-center transition-all duration-2000 delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="relative inline-block">
            <button
               onClick={() => {
              setChatbotMode('getInTouch');
              setChatbotOpen(true);
            }}
              className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-yellow-400/50 overflow-hidden z-10">
              <span className="relative z-10">Transform Your Business Today</span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-yellow-200 scale-0 group-hover:scale-150 transition-transform duration-700 opacity-30"></div>
            </button>
            
            {/* Surrounding glow elements */}
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
       {/* Chatbot Component */}
            <Chatbot 
              mode={chatbotMode} 
              triggerOpen={chatbotOpen} 
              onClose={() => setChatbotOpen(false)}
            />
    </div>
  );
}