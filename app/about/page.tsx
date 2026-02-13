// app/about/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import TestimonialsSection from "../components/TestimonialsSection";
import Header from './components/Header';
import Image from 'next/image';


// --- Components ---

const CircularProgress = ({ 
  percentage, 
  label, 
  color 
}: { 
  percentage: number; 
  label: string; 
  color: string 
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
      <span className="mt-3 text-xs font-bold tracking-wider uppercase text-gray-600">
        {label}
      </span>
    </div>
  );
};

const PackageCard = ({ 
  image, 
  title, 
  price, 
  index 
}: { 
  image: string; 
  title: string; 
  price: string; 
  index: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
  >
    <img 
      src={image} 
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
      <h4 className="text-white font-semibold text-sm">{title}</h4>
      <span className="text-white font-bold text-sm">${price}</span>
    </div>
  </motion.div>
);

// --- Main Page ---

export default function AboutPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { percentage: 78, label: 'Vacations', color: '#3B82F6' },
    { percentage: 55, label: 'Honeymoon', color: '#EC4899' },
    { percentage: 30, label: 'Musical Events', color: '#8B5CF6' },
  ];

  const packages = [
    { image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=400&auto=format&fit=crop", title: "Barcelona", price: "840" },
    { image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=400&auto=format&fit=crop", title: "Switzerland", price: "840" },
    { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop", title: "Barcelona", price: "840" },
    { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop", title: "Tommorow land", price: "840" },
    { image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?q=80&w=400&auto=format&fit=crop", title: "Los Angeles", price: "840" },
    { image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=400&auto=format&fit=crop", title: "Rio de Janeiro", price: "840" },
    { image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=400&auto=format&fit=crop", title: "India", price: "840" },
    { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop", title: "Barcelona", price: "840" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1920&auto=format&fit=crop")' 
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Navigation (simplified) */}
           {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            // backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop")' 
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between mx-auto max-w-7xl px-8 py-6 ">
        <div>
          <Link href="/home" className="inline-flex items-center">
            <Image
              src="/travel_logo.png"
              alt="MyApp Logo"
              width={120}
              height={32}
              priority
              className=""
            />
          </Link>
        </div>
          <div className="hidden md:flex items-center gap-10 text-white text-sm font-bold">
            <Link href="/" className="hover:text-[#DF6951] transition">Home</Link>
            <Link href="/about" className=" border-b-2 border-[#DF6951] pb-0.5">About</Link>
            {/* <Link href="/services" className="hover:text-[#DF6951] transition flex items-center gap-1">
              Services
            </Link> */}
            <Link href="/packages" className="hover:text-[#DF6951] transition">Packages</Link>
          </div>
          <button className="bg-[#DF6951] text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-[#c95842] transition">
            Get in Touch
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white -mt-8">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2 opacity-90">Search Tour</span>
          <h1 className="text-5xl md:text-6xl font-serif italic">Travel With Us</h1>
        </div>
      </section>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white -mt-16">
          <span className="text-xs tracking-[0.3em] uppercase mb-2">Read</span>
          <h1 className="text-5xl md:text-7xl font-serif italic">About Us</h1>
        </div>
      </section>

      {/* Europe Sightseeing Section */}
      <section className="py-20 px-4 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#DF6951] text-xs font-bold tracking-widest uppercase mb-4 block">
                Promotion
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#181E4B] leading-tight mb-6">
                We Provide You Best<br />
                Europe Sightseeing Tours
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
                Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos. Non quis eius quo eligendi corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut ducimus illum aut optio quibusdam!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#DF6951] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#c95842] transition"
              >
                View Packages
              </motion.button>
            </motion.div>

            {/* Right - Circular Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-dashed border-gray-300 rounded-full animate-spin-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-dashed border-gray-300 rounded-full animate-spin-slow" />
              
              {/* Main circular image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
                  alt="Europe Tour"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating polaroid decoration */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 transform -rotate-12 hidden md:block">
                <div className="bg-white p-2 shadow-lg rounded-sm w-32">
                  <img 
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=200&auto=format&fit=crop"
                    alt="Venice"
                    className="w-full h-24 object-cover"
                  />
                  <div className="text-center mt-1">
                    <span className="text-xs font-handwriting text-gray-600">Italy</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative shell */}
        <div className="absolute top-20 right-20 opacity-20 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=200&auto=format&fit=crop" 
            alt="shell"
            className="w-24 h-24 object-contain"
          />
        </div>
      </section>

      {/* Wanderlust Video Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop")' 
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif italic mb-8"
          >
            Wan<span className="relative inline-flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(true)}
                className="w-16 h-16 bg-[#DF6951] rounded-full flex items-center justify-center mx-2"
              >
                <Play size={28} className="ml-1 text-white" fill="white" />
              </motion.button>
            </span>rlust
          </motion.h2>
        </div>

        {/* Video Modal */}
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* Popular Tour Plans / Stats Section */}
      <section className="py-20 px-4 md:px-12 bg-white relative">
        {/* Decorative polaroids */}
        <div className="absolute left-8 top-20 transform -rotate-6 hidden lg:block">
          <div className="bg-white p-3 shadow-xl rounded-sm w-48 transform hover:rotate-0 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=300&auto=format&fit=crop"
              alt="Travel memory"
              className="w-full h-32 object-cover mb-2"
            />
            <div className="text-center">
              <span className="font-handwriting text-gray-600 text-lg">Travel</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#DF6951] text-xs font-bold tracking-widest uppercase mb-4 block">
              Trend
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#181E4B] mb-4">
              Our Popular Tour Plans
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto mb-12">
              Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium. Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {stats.map((stat, index) => (
              <CircularProgress 
                key={stat.label}
                percentage={stat.percentage}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* Decorative shell */}
        <div className="absolute right-12 top-20 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=200&auto=format&fit=crop" 
            alt="shell"
            className="w-32 h-32 object-contain opacity-80"
          />
        </div>
      </section>

      {/* International Packages Gallery */}
      <section className="py-20 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#DF6951] text-xs font-bold tracking-widest uppercase mb-4 block">
              Explore More
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#181E4B]">
              Our International Packages
            </h2>
          </motion.div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={`${pkg.title}-${index}`}
                {...pkg}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />

    </div>
  );
}