import React from "react";
import Header from "./Header";
import PeopleSmall from "@/components/PeopleSmall";
import Image from "next/image";
import PlanTrip from "./PlanTrip";

const Hero: React.FC = () => {
  return (
    <section className="hero-bg min-h-screen flex flex-col text-white">
      {/* Header inside Hero */}
      <Header />

      {/* Hero Content */}
      <div className="flex-1 w-full flex mb-10">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-end">
          <div className="max-w-xl text-left">
            <Image
              src="/assest1.png"
              alt="assest1"
              width={32}
              height={32}
              className="w-16"
            />
            <h1 className="text-6xl font-bold leading-tight mb-6">
              No matter where you're going to, we'll take you there
            </h1>

            <div className="flex gap-2 items-center justify-start">
              <PeopleSmall />

              <h4 className="text-sm">
                2,500 people booked Tommorowland Event in last 24 hours
              </h4>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <PlanTrip />
        </div>
      </div>
    </section>
  );
};

export default Hero;
