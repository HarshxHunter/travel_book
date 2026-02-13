// app/tour/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Info, 
  Map, 
  Calendar, 
  Image as ImageIcon, 
  Star, 
  MapPin, 
  Clock, 
  User,
  Mail,
  Phone,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';

// --- Types ---
interface TourData {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: string;
  description: string;
  heroImage: string;
  destination: string;
  departure: string;
  departureTime: string;
  returnTime: string;
  dressCode: string;
  notIncluded: string[];
  included: string[];
  gallery: string[];
  tourPlan: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
}

// --- Mock Data ---
const toursData: Record<string, TourData> = {
  switzerland: {
    id: 1,
    slug: "switzerland",
    title: "Switzerland",
    location: "Zurich, Switzerland",
    price: "1,000",
    rating: 5,
    reviews: "2.3k review",
    description: "Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolor similique ut quasi maxime ut deserunt autem. At praesentium voluptatem aut libero nisi. Et eligendi sint ab cumque veritatis aut provident aliquam. Aut aspernatur consequuntur eum quaerat distinctio ut inventore aliquid et quasi alias ut rerum suscipit et nihil deleniti.",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop",
    destination: "Zurich, Switzerland",
    departure: "Main Square, New York",
    departureTime: "Approximately 08:10 AM",
    returnTime: "Approximately 07:20 PM",
    dressCode: "Casual, comfortable and light",
    notIncluded: ["Gallery Ticket", "Lunch"],
    included: ["5 Star Accommodations", "Airport Transfer", "Breakfast", "Personal Guide"],
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
    ],
    tourPlan: [
      {
        day: 1,
        title: "Departure",
        description: "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et Voluptates Officia Sed Molestiae Sint Et Voluptas Quos. Qui Harum Repudiandae Galisum Dolorem Hic Deleniti Officiis Est Sapiente Explicabo Non Eaque Corporis Aut Voluptatum Iusto At Facere Enim Id Voluptas Reprehenderit. Ut Voluptas Laudantium",
        activities: ["5 Star Accommodation", "Breakfast", "5 Star Accommodation", "Breakfast"]
      },
      {
        day: 2,
        title: "Visiting Zurich, Geneva And Zermatt",
        description: "Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.",
        activities: ["5 Star Accommodation", "Breakfast", "5 Star Accommodation", "Breakfast"]
      },
      {
        day: 3,
        title: "Rest",
        description: "Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.",
        activities: ["5 Star Accommodation", "Breakfast", "5 Star Accommodation", "Breakfast"]
      },
      {
        day: 4,
        title: "Historical Tour",
        description: "Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.",
        activities: ["5 Star Accommodation", "Breakfast", "5 Star Accommodation", "Breakfast"]
      },
      {
        day: 5,
        title: "Return",
        description: "Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet A, Venenatis Vitae, Justo. Nullam Dictum Felis Eu Pede Mollis Pretium.",
        activities: ["5 Star Accommodation", "Breakfast", "5 Star Accommodation", "Breakfast"]
      }
    ]
  },
  amazon: {
    id: 2,
    slug: "amazon",
    title: "Amazon",
    location: "Manaus, Brazil",
    price: "1,223",
    rating: 5,
    reviews: "1.8k review",
    description: "Experience the world's largest rainforest. Discover exotic wildlife, navigate the mighty Amazon River, and immerse yourself in indigenous cultures.",
    heroImage: "https://images.unsplash.com/photo-1591382386627-349b692688ff?q=80&w=1920&auto=format&fit=crop",
    destination: "Manaus, Brazil",
    departure: "Rio de Janeiro Airport",
    departureTime: "Approximately 06:00 AM",
    returnTime: "Approximately 08:00 PM",
    dressCode: "Light cotton, long sleeves, hat",
    notIncluded: ["Alcoholic Beverages", "Personal Expenses"],
    included: ["Jungle Lodge", "Boat Tours", "Meals", "English Guide"],
    gallery: [
      "https://images.unsplash.com/photo-1591382386627-349b692688ff?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=400&auto=format&fit=crop",
    ],
    tourPlan: [
      { day: 1, title: "Arrival in Manaus", description: "Arrive at Manaus airport and transfer to jungle lodge.", activities: ["Airport Transfer", "Welcome Dinner"] },
      { day: 2, title: "Jungle Exploration", description: "Full day jungle trek with experienced guide.", activities: ["Guided Trek", "Lunch", "Wildlife Spotting"] },
      { day: 3, title: "River Cruise", description: "Navigate the Amazon river and visit indigenous communities.", activities: ["Boat Tour", "Cultural Visit", "Sunset Cruise"] },
    ]
  },
  giza: {
    id: 3,
    slug: "giza",
    title: "Giza",
    location: "Cairo, Egypt",
    price: "1,200",
    rating: 5,
    reviews: "3.1k review",
    description: "Walk in the footsteps of pharaohs at the Great Pyramids of Giza. Explore ancient tombs, the Sphinx, and the rich history of ancient Egypt.",
    heroImage: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1920&auto=format&fit=crop",
    destination: "Cairo, Egypt",
    departure: "Cairo International Airport",
    departureTime: "Approximately 09:00 AM",
    returnTime: "Approximately 06:00 PM",
    dressCode: "Modest, comfortable walking shoes",
    notIncluded: ["Camera Fees", "Tips"],
    included: ["Hotel Pickup", "Entrance Fees", "Lunch", "Expert Guide"],
    gallery: [
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539650116455-251d9a063595?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=400&auto=format&fit=crop",
    ],
    tourPlan: [
      { day: 1, title: "Pyramids of Giza", description: "Visit the Great Pyramid, Sphinx, and Valley Temple.", activities: ["Pyramid Tour", "Sphinx Visit", "Camel Ride"] },
      { day: 2, title: "Egyptian Museum", description: "Explore the world's largest collection of Egyptian antiquities.", activities: ["Museum Tour", "Tutankhamun Exhibit", "Guide Lecture"] },
      { day: 3, title: "Nile Cruise", description: "Relaxing cruise on the Nile with dinner and entertainment.", activities: ["Nile Cruise", "Dinner", "Entertainment"] },
    ]
  }
};

// --- Booking Form Component ---
const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: null as Date | null,
      tickets: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      date: Yup.date().nullable().required("Date is required"),
      tickets: Yup.number().min(1, "At least 1 ticket").required("Required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        alert(`Booking submitted successfully!\n\nForm Values:\n${JSON.stringify(values, null, 2)}`);
        resetForm();
        setSubmitting(false);
      }, 1000);
    },
  });

  const inputFields = [
    { name: "name", placeholder: "Name", type: "text", icon: User },
    { name: "email", placeholder: "Email", type: "email", icon: Mail },
    { name: "phone", placeholder: "Phone", type: "tel", icon: Phone },
  ] as const;

  return (
    <div className="bg-[#F5F5F5] p-6 rounded-sm">
      <h3 className="text-2xl font-serif font-bold text-[#181E4B] mb-2 text-center">Book This Tour</h3>
      <p className="text-[10px] text-gray-500 mb-6 text-center leading-relaxed">
        Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {/* Regular input fields */}
        {inputFields.map((field) => {
          const Icon = field.icon;
          const hasError = formik.touched[field.name] && formik.errors[field.name];
          
          return (
            <div key={field.name} className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <Icon size={14} />
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white border ${
                  hasError ? "border-red-300" : "border-transparent"
                } focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400 transition-colors`}
              />
            </div>
          );
        })}

        {/* Date Picker Field - Integrated with input field styling */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <Calendar size={14} />
          </div>
          <DatePicker
            selected={formik.values.date}
            onChange={(date) => formik.setFieldValue('date', date)}
            onBlur={formik.handleBlur}
            placeholderText="dd-mm-yy"
            dateFormat="dd-MM-yyyy"
            name="date"
            className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white border ${
              formik.touched.date && formik.errors.date ? "border-red-300" : "border-transparent"
            } focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400 transition-colors cursor-pointer`}
            wrapperClassName="w-full"
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 text-[10px] mt-1">{formik.errors.date}</div>
          )}
        </div>

        {/* Tickets Field */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <User size={14} />
          </div>
          <input
            type="number"
            name="tickets"
            placeholder="Number of ticket"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tickets}
            className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white border ${
              formik.touched.tickets && formik.errors.tickets ? "border-red-300" : "border-transparent"
            } focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400 transition-colors`}
          />
        </div>
        
        {/* Message textarea */}
        <div className="relative">
          <textarea
            name="message"
            placeholder="Message"
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.message}
            className="w-full px-3 py-2.5 text-xs bg-white border border-transparent focus:outline-none focus:border-[#DF6951] text-gray-700 placeholder-gray-400 resize-none transition-colors"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 bg-[#DF6951] text-white text-xs font-medium rounded-sm hover:bg-[#c95842] transition shadow-sm"
          >
            Check Availability
          </motion.button>
        </div>
        
        <motion.button
          type="submit"
          disabled={formik.isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-[#DF6951] text-white text-xs font-medium rounded-sm hover:bg-[#c95842] transition disabled:opacity-50 shadow-sm"
        >
          {formik.isSubmitting ? "Booking..." : "Book Now"}
        </motion.button>
      </form>
    </div>
  );
};

// --- Tour Plan Timeline ---
const TourPlanTimeline = ({ tourPlan }: { tourPlan: TourData['tourPlan'] }) => {
  return (
    <div className="space-y-0">
      <h3 className="text-xl font-bold text-[#181E4B] mb-6">Tour Plan</h3>
      <p className="text-xs text-gray-500 mb-8 leading-relaxed">
        Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et Voluptates Officia Sed Molestiae Sint Et Voluptas Quos. Qui Harum Repudiandae Galisum Dolorem Hic Deleniti Officiis Est Sapiente Explicabo Non Eaque Corporis Aut Voluptatum Iusto At Facere Enim Id Voluptas Reprehenderit. Ut Voluptas Laudantium
      </p>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
        
        <div className="space-y-8">
          {tourPlan.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Day number badge */}
              <div className="relative z-10 w-12 h-12 bg-[#DF6951] text-white rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                {String(day.day).padStart(2, '0')}
              </div>
              
              <div className="flex-1 pb-8">
                <h4 className="font-bold text-[#181E4B] text-sm mb-2">
                  Day {day.day}: {day.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {day.description}
                </p>
                <ul className="space-y-1">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Location Section ---
const LocationSection = ({ location }: { location: string }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#181E4B]">Location</h3>
      
      {/* Map placeholder - integrate Google Maps or similar */}
      <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86291.84608710866!2d8.4816!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1707830400000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[20%]"
        />
      </div>
      
      <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
        <p>
          Sit Quasi Soluta Non Temporibus Voluptas Non Necessitatibus Tempore Sit Deleniti Praesentium Aut Velit Nostrum Ut Itaque Atque Ad Expedita Veniam. Hic Deleniti Officiis Est Sapiente Explicabo Non Eaque Corporis Aut Voluptatum Iusto At Facere Enim Id Voluptas Reprehenderit. Ut Voluptas Laudantium Et Molestias Voluptatem Ex Doloremque Omnis Est Ipsum Nihil.
        </p>
        <p>
          Quo Facere Eveniet 33 Sint Rerum Est Internos Impedit Sed Dignissimos Quia. Et Rerum Deleniti Et Voluptates Saepe Qui Labore Quisquam Non Accusantium Temporibus. Quo Velit Numquam Hic Excepturi Sequi Sed Dicta Doloribus In Quos Possimus Quo Quibusdam Aliquid Est Culpa Porro Sed Molestiae Libero At Blanditiis Minima A Reiciendis Fugiat.
        </p>
      </div>
    </div>
  );
};

// --- Gallery Section ---
const GallerySection = ({ gallery }: { gallery: string[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(gallery.length / itemsPerPage);
  
  const currentImages = gallery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-serif font-bold text-[#181E4B]">From our gallery</h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolor similique ut quasi maxime ut deserunt autem At praesentium voluptatem aut libero nisi.
      </p>
      
      {/* Masonry Grid */}
      <div className="grid grid-cols-3 gap-3">
        {currentImages.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className={`overflow-hidden rounded-sm cursor-pointer ${
              idx === 1 ? 'row-span-2' : ''
            }`}
          >
            <img 
              src={img} 
              alt={`Gallery ${idx + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#DF6951] disabled:opacity-30 transition"
        >
          <ChevronLeft size={16} />
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
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#DF6951] disabled:opacity-30 transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id as string;
  const tour = toursData[tourId];

  const [activeTab, setActiveTab] = useState<'information' | 'tourplan' | 'location' | 'gallery'>('information');

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Tour not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'information', label: 'Information', icon: Info },
    { id: 'tourplan', label: 'Tour Plan', icon: Calendar },
    { id: 'location', label: 'Location', icon: Map },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            // backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop")' 
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
          <div className="hidden md:flex items-center gap-10 text-white text-sm font-bold">
            <Link href="/" className="hover:text-[#DF6951] transition">Home</Link>
            <Link href="/about" className="hover:text-[#DF6951] transition">About</Link>
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-1 opacity-90">Explore</span>
          <h1 className="text-5xl md:text-6xl font-serif italic">Landscapes</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        {/* Tabs Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium transition-all ${
                    isActive 
                      ? 'text-[#181E4B] bg-white border-t-2 border-[#DF6951]' 
                      : 'text-gray-500 bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="bg-white shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeTab === 'information' && (
                  <motion.div
                    key="information"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-[#181E4B]">{tour.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="fill-[#F1C40F] text-[#F1C40F]" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">({tour.reviews})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#DF6951]">{tour.price} $</span>
                        <span className="text-xs text-gray-400 block">/ Per Couple</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed">{tour.description}</p>

                    {/* Details Grid */}
                    <div className="space-y-3 pt-2">
                      {[
                        { label: 'Destination', value: tour.destination },
                        { label: 'Departure', value: tour.departure },
                        { label: 'Departure Time', value: tour.departureTime },
                        { label: 'Return Time', value: tour.returnTime },
                        { label: 'Dress Code', value: tour.dressCode },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-2">
                          <span className="text-[#DF6951] text-[10px] font-bold uppercase w-28 shrink-0 tracking-wide">
                            {item.label}
                          </span>
                          <span className="text-gray-500 text-xs">: {item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Included/Not Included */}
                    <div className="grid grid-cols-2 gap-6 pt-4">
                      <div>
                        <h4 className="text-[#DF6951] text-[10px] font-bold uppercase mb-3 tracking-wide">Not Included</h4>
                        <ul className="space-y-2">
                          {tour.notIncluded.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                              <X size={12} className="text-red-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[#DF6951] text-[10px] font-bold uppercase mb-3 tracking-wide">Included</h4>
                        <ul className="space-y-2">
                          {tour.included.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                              <Check size={12} className="text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tourplan' && (
                  <motion.div
                    key="tourplan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <TourPlanTimeline tourPlan={tour.tourPlan} />
                  </motion.div>
                )}

                {activeTab === 'location' && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <LocationSection location={tour.location} />
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <GallerySection gallery={tour.gallery} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Sidebar - Booking Form */}
            <div className="lg:col-span-2">
              <div className="sticky top-4">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}