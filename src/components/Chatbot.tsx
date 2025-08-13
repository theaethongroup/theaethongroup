'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Loader2, X } from 'lucide-react';

type ChatbotMode = 'manual' | 'getInTouch';
type UserInfo = {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  services: string[];
};

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  suggestions?: string[];
}

interface ChatbotProps {
  mode: ChatbotMode;
  triggerOpen?: boolean;
  onClose?: () => void;
}

export default function Chatbot({ mode, triggerOpen, onClose }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(mode === 'getInTouch' && triggerOpen);
  const [step, setStep] = useState<'name' | 'phone' | 'email' | 'businessType' | 'services' | 'chat'>('name');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userInfo = useRef<UserInfo>({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    services: []
  });

  // Business types options
  const businessTypes = [
    'Technology', 'Retail', 'Healthcare', 'Finance', 'Education', 
    'Manufacturing', 'Hospitality', 'Real Estate', 'Consulting', 'Other'
  ];

  // Services options
  const servicesOptions = [
    'Brand Building', 'Graphic Design', 'Business Strategy', 'Management', 
    'Finance', 'End to End Operations', 'Web & App Development', 'Legalities', 
    'SEO', 'Digital Marketing', 'Network Management', 'Media', 
    'Events', 'Social Media Management'
  ];

  // Init chat
  const initializeChat = useCallback(() => {
    const stored = localStorage.getItem('aethon_user_info');
    
    // Check if user data exists
    const hasUserData = stored && 
      JSON.parse(stored)?.name && 
      JSON.parse(stored)?.phone && 
      JSON.parse(stored)?.email && 
      JSON.parse(stored)?.businessType && 
      JSON.parse(stored)?.services;
    
    // Special handling for getInTouch mode with existing user data
    if (mode === 'getInTouch' && hasUserData) {
      setShowThankYou(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
      return;
    }
    
    if (mode === 'manual' && hasUserData) {
      try {
        const parsed = JSON.parse(stored);
        userInfo.current = parsed;
        setStep('chat');
        setMessages([{ sender: 'bot', text: `Welcome back ${parsed.name}! How can I help you today?` }]);
        return;
      } catch {
        localStorage.removeItem('aethon_user_info');
      }
    }
    
    // Start data collection flow
    setMessages([{ sender: 'bot', text: `Welcome to Aethon Group! May I know your name?` }]);
    setStep('name');
  }, [mode]);

  useEffect(() => {
    if (triggerOpen) {
      setIsOpen(true);
      initializeChat();
    }
  }, [triggerOpen, initializeChat]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showThankYou]);

  // Focus input
  useEffect(() => {
    if (isOpen && !showThankYou) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [step, isOpen, showThankYou]);

  const saveUserInfo = async () => {
    localStorage.setItem('aethon_user_info', JSON.stringify(userInfo.current));
    try {
      await fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userInfo.current,
          leadSource: mode === 'getInTouch' ? 'Get In Touch Form' : 'Chatbot'
        })
      });
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const handleUserMessage = async (text?: string) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage) return;
    
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    switch (step) {
      case 'name':
        userInfo.current.name = userMessage;
        setMessages(prev => [...prev, { sender: 'bot', text: `Thanks ${userMessage}! What's your phone number?` }]);
        setStep('phone');
        break;
        
      case 'phone':
        userInfo.current.phone = userMessage;
        setMessages(prev => [...prev, { sender: 'bot', text: `Your email address?` }]);
        setStep('email');
        break;
        
      case 'email':
        userInfo.current.email = userMessage;
        setMessages(prev => [...prev, { sender: 'bot', text: `What type of business do you have?` }]);
        setStep('businessType');
        break;
        
      case 'businessType':
        userInfo.current.businessType = userMessage;
        setMessages(prev => [...prev, { sender: 'bot', text: `Which of our services are you interested in? (Select multiple)` }]);
        setStep('services');
        break;
        
      case 'chat':
        // Manual mode chat with AI
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userMessage, 
              userData: userInfo.current 
            })
          });
          
          const data = await res.json();
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: data.text,
            suggestions: data.suggestions || []
          }]);
        } catch {
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: `Sorry, something went wrong. Please try again later.` 
          }]);
        }
        break;
    }
    
    setLoading(false);
  };

  const handleServiceSelect = (service: string) => {
    if (!userInfo.current.services.includes(service)) {
      userInfo.current.services.push(service);
      setMessages(prev => [...prev, { sender: 'user', text: service }]);
    }
  };

  const handleServicesDone = async () => {
    if (userInfo.current.services.length > 0) {
      await saveUserInfo();
      
      if (mode === 'getInTouch') {
        setShowThankYou(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: `Great! How can I assist you today?` }]);
        setStep('chat');
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleUserMessage(suggestion);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); initializeChat(); }}
        className="fixed bottom-6 left-6 z-[9999] bg-gradient-to-r from-[#f1c75b] to-yellow-600 hover:scale-105 text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <Bot className="w-5 h-5" /> Mr. Aethon
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-6 z-[9999]">
      <div className="w-80 h-[600px] bg-black border border-[#f1c75b] rounded-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f1c75b] to-yellow-600 text-black p-4 flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Mr. Aethon</span>
          <button onClick={handleClose} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
          {showThankYou ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center p-6 bg-gray-800 rounded-xl">
                <div className="text-2xl mb-4 text-[#f1c75b]">Thank You!</div>
                <p className="text-white">We will connect with you shortly.</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 ${m.sender === 'user' ? 'bg-[#f1c75b] text-black' : 'bg-gray-800 text-white'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* Render suggestions if available */}
              {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && 
               messages[messages.length - 1].suggestions && 
               messages[messages.length - 1].suggestions!.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {messages[messages.length - 1].suggestions!.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {step === 'services' && (
                <div className="bg-gray-800 p-3 rounded-xl">
                  <p className="text-white mb-2">Select services:</p>
                  <div className="flex flex-wrap gap-2">
                    {servicesOptions.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceSelect(service)}
                        className={`px-3 py-1 rounded-full ${userInfo.current.services.includes(service) ? 'bg-[#f1c75b] text-black' : 'bg-gray-700 text-white'}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {userInfo.current.services.length > 0 && (
                    <button
                      onClick={handleServicesDone}
                      className="mt-3 w-full bg-[#f1c75b] text-black rounded-lg py-2"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}
              
              {loading && <div className="text-[#f1c75b] flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Typing...</div>}
            </>
          )}
        </div>
        
        {/* Input */}
        {step !== 'services' && !showThankYou && (
          <form onSubmit={(e) => { e.preventDefault(); handleUserMessage(); }} className="p-4 border-t border-gray-800 flex">
            <input
              ref={inputRef}
              type={step === 'phone' ? 'tel' : step === 'email' ? 'email' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3"
              placeholder={
                step === 'name' ? 'Your name' : 
                step === 'phone' ? 'Phone' : 
                step === 'email' ? 'Email' : 
                step === 'businessType' ? 'Business type' :
                'Type a message...'
              }
            />
            <button type="submit" className="ml-2 bg-[#f1c75b] text-black p-2 rounded-lg">
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}