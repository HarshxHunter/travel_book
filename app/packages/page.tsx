// app/packages/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronDown, 
  Search, 
  MapPin, 
  Star, 
  Users,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';

// --- Types ---
interface TourPackage {
  id: number;
  slug: string;
  image: string;
  date: string;
  people: string;
  title: string;
  description: string;
  price: string;
  rating: number;
}

// --- Mock Data ---
const allPackages: TourPackage[] = [
  {
    id: 1,
    slug: "switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Switzerland",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "1,100",
    rating: 5.0
  },
  {
    id: 2,
    slug: "berlin",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Berlin",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "1,230",
    rating: 4.9
  },
  {
    id: 3,
    slug: "maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Maldives",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "3,000",
    rating: 5.0
  },
  {
    id: 4,
    slug: "toronto",
    image: "https://images.unsplash.com/photo-1517090504588-fd19cd1a5b7a?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Toronto",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "2,000",
    rating: 4.6
  },
  {
    id: 5,
    slug: "baku",
    image: "https://images.unsplash.com/photo-1599576838639-d8707d4c4c88?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Baku",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "1,440",
    rating: 5.0
  },
  {
    id: 6,
    slug: "chinese",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600&auto=format&fit=crop",
    date: "12, September, 2022",
    people: "120+ People",
    title: "Chinese",
    description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
    price: "1,210",
    rating: 4.0
  }
];

// --- Components ---

const TourCard = ({ tour, index }: { tour: TourPackage; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/tour/${tour.slug}`}>
        <div className="group cursor-pointer">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden rounded-sm mb-3">
            <img 
              src={tour.image} 
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay with date and people */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <div className="flex items-center gap-3 text-white text-[10px]">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {tour.date}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={10} />
                  {tour.people}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="font-bold text-[#181E4B] text-lg mb-1 group-hover:text-[#DF6951] transition-colors">
            {tour.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">
            {tour.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[#DF6951] font-bold text-sm">{tour.price} $</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#F1C40F] text-[#F1C40F]" />
              <span className="text-xs text-gray-500">{tour.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FilterButton = ({ label, icon: Icon }: { label: string; icon: any }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white text-xs font-medium text-gray-600 hover:text-[#DF6951] transition-colors border-b-2 border-transparent hover:border-[#DF6951]">
    <Icon size={14} />
    {label}
    <ChevronDown size={12} />
  </button>
);

export default function PackagesPage() {
  const [priceRange, setPriceRange] = useState([12, 3600]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop")' 
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between mx-auto max-w-7xl px-8 py-6">
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
          <div className="hidden md:flex items-center gap-10 text-white text-sm font-bold ">
            <Link href="/" className="hover:text-[#DF6951] transition">Home</Link>
            <Link href="/about" className="hover:text-[#DF6951] transition">About</Link>
            {/* <Link href="/services" className="hover:text-[#DF6951] transition flex items-center gap-1">
              Services
            </Link> */}
            <Link href="/packages" className=" border-b-2 border-[#DF6951] pb-0.5">Packages</Link>
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white shadow-lg">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-4 border-b">
            <FilterButton label="Date" icon={Calendar} />
            <FilterButton label="Price Low To High" icon={ArrowRight} />
            <FilterButton label="Price High To Low" icon={ArrowRight} />
            <FilterButton label="Name (A-Z)" icon={ArrowRight} />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            
            {/* Left - Tour Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allPackages.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-10">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#DF6951] transition"
                >
                  <ArrowLeft size={16} />
                </button>
                
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-medium transition ${
                      currentPage === page 
                        ? 'text-[#DF6951]' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(4, p + 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#DF6951] transition"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#F5F5F5] p-6 rounded-sm sticky top-4">
                
                {/* Plan Your Trip Form */}
                <h3 className="text-xl font-serif font-bold text-[#181E4B] mb-2 text-center">Plan Your Trip</h3>
                <p className="text-[10px] text-gray-500 mb-6 text-center leading-relaxed">
                  Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
                </p>

                <form className="space-y-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search Tour" 
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border-transparent focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Where To?" 
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border-transparent focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Date" 
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border-transparent focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Filter By Price */}
                  <div className="pt-4">
                    <h4 className="text-xs font-bold text-[#181E4B] mb-3">Filter By Price</h4>
                    <div className="relative h-2 bg-gray-300 rounded-full mb-2">
                      <div 
                        className="absolute h-full bg-[#DF6951] rounded-full"
                        style={{ left: '0%', right: '30%' }}
                      />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#DF6951] rounded-full cursor-pointer" />
                      <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#DF6951] rounded-full cursor-pointer" />
                    </div>
                    <p className="text-[10px] text-gray-500">Price: $12 - $3600</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-[#DF6951] text-white text-xs font-medium rounded-sm hover:bg-[#c95842] transition mt-4"
                  >
                    Book Now
                  </motion.button>
                </form>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      
      {/* Spacing for footer */}
      <div className="h-20" />
    </div>
  );
}