import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  image: string;
  title: string;
  subtitle: string;
}

const services = [
  {
    image: "/service1.jpg",
    title: "Guided Tours",
    subtitle: "Building responsive and modern websites",
  },
  {
    image: "/service2.jpg",
    title: "Best Flights Options",
    subtitle: "iOS and Android native & cross-platform apps",
  },
  {
    image: "/service3.jpg",
    title: "Religious Tours",
    subtitle: "Creating intuitive and beautiful designs",
  },
  {
    image: "/service4.jpg",
    title: "Medical insurance",
    subtitle: "Secure and decentralized apps for businesses",
  },
];

const partners = [
  {
    image: "/partner_1.png",
    title: "Guided Tours",
    subtitle: "Building responsive and modern websites",
  },
  {
    image: "/partner_2.png",
    title: "Best Flights Options",
    subtitle: "iOS and Android native & cross-platform apps",
  },
  {
    image: "/partner_3.png",
    title: "Religious Tours",
    subtitle: "Creating intuitive and beautiful designs",
  },
  {
    image: "/partner_4.png",
    title: "Medical insurance",
    subtitle: "Secure and decentralized apps for businesses",
  },
];

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, subtitle }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="w-full h-48 relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900 text-center">{title}</h3>
        <p className="text-sm text-gray-600 text-center">{subtitle}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-8 bg-gray-50">

        <div className="flex justify-center items-center gap-4 bg-[#F7F7F7]">
            {partners.map((partner, index) => (
                <div key={index} className="relative w-32 h-16">
                    <Image
                        src={partner.image}
                        alt={partner.title}
                        fill
                        className="object-contain"
                    />
                </div>
            ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-[#DF6951]">CATEGORY</h2>
            <p className="text-[#181E4B] font-bold mt-2 text-3xl">We Offer Best Services</p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
            {services.map((service) => (
            <ServiceCard
                key={service.title}
                image={service.image}
                title={service.title}
                subtitle={service.subtitle}
            />
            ))}
        </div>
    </div>
  );
};

export default Services;
