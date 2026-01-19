import React from "react";

const PlanTrip: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#EDEDED] p-8 rounded-sm w-full max-w-md">
      {/* Heading */}
      <h2 className="text-3xl text-center font-bold mb-2 text-[#181E4B]">
        Plan Your Trip
      </h2>

      {/* Text */}
      <p className="text-sm text-gray-700 mb-6 text-center">
        Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto
        aut magni nesciunt? Quo quidem neque iste expedita est dolo.
      </p>

      {/* Form */}
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="px-4 h-12 bg-white rounded-none border border-gray-300 placeholder-[#00000042] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 h-12 bg-white rounded-none border border-gray-300 placeholder-[#00000042] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="px-4 h-12 bg-white rounded-none border border-gray-300 placeholder-[#00000042] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="px-4 h-12 bg-white rounded-none border border-gray-300 placeholder-[#00000042] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="px-4 h-12 bg-white rounded-none border border-gray-300 placeholder-[#00000042] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 px-6 py-3 bg-[#DF6951] text-white font-semibold rounded-md hover:bg-orange-600 transition cursor-pointer"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default PlanTrip;
