import React from "react";
import Image from "next/image";

interface Person {
  src: string;
  name: string;
}

const images: Person[] = [
    {
        src: "/p1.png",
        name: "p1"
    },
    {
        src: "/p2.png",
        name: "p2"
    },
    {
        src: "/p3.png",
        name: "p3"
    },
    {
        src: "/p4.png",
        name: "p4"
    },
    {
        src: "/p5.png",
        name: "p5"
    },
    {
        src: "/p6.png",
        name: "p6"
    }
]

const PeopleSmall: React.FC = () => {
  return (
    <div className="flex items-center">
      {images.map((person, index) => (
        <div
          key={index}
          className={`relative ${
            index !== 0 ? "-ml-4" : ""
          }`}
        >
          <Image
            src={person.src}
            alt={`Person ${index + 1}`}
            width={32}
            height={32}
            className="rounded-full border-2 border-white"
          />
        </div>
      ))}

      <div className="relative -ml-4">
        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#DF6951] flex items-center justify-center text-white text-sm font-semibold">
          +
        </div>
      </div>
    </div>
  );
};

export default PeopleSmall;
