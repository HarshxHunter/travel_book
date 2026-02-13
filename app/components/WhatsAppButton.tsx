// components/WhatsAppButton.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "1234567890"; // Replace with your WhatsApp number (with country code, e.g., "923001234567")
  const message = "Hello! I'm interested in booking a tour.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
      aria-label="Contact on WhatsApp"
    >
      {/* Official WhatsApp Logo */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp"
        className="w-10 h-10 object-contain"
      />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Chat on WhatsApp
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
      </span>
      
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.button>
  );
};

export default WhatsAppButton;