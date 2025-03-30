// HouseScroller.tsx
"use client";

import { useRef } from "react";
import Card from "./ui/Card"; // Ensure this path is correct

interface House {
  id: number;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
}

const generateHouses = (count: number): House[] => {
  const generatedHouses: House[] = [];
  const basePrice = 350000;
  const priceIncrement = 15000;
  const baseSqft = 1400;
  const sqftIncrement = 110;

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const beds = 3 + (i % 3);
    const baths = 2 + (i % 3);
    const price = basePrice + (i * priceIncrement * (1 + (i % 5) * 0.05));
    const sqft = baseSqft + (i * sqftIncrement) + (i % 4) * 50;
    
    const formattedPrice = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    generatedHouses.push({
      id: id,
      price: formattedPrice,
      beds: beds,
      baths: baths,
      sqft: sqft,
      img: "/house.jpg", 
    });
  }
  return generatedHouses;
};

// --- Component Starts Here ---

const HouseScroller: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const numberOfHousesToDisplay = 10; // Edit this number as needed
  const houses = generateHouses(numberOfHousesToDisplay);

return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white w-full lg:w-400 mx-auto"> 
      {/* Adjusted here */}
      <div className="w-full lg:w-3/5 h-64 lg:h-auto bg-gray-800 flex items-center justify-center rounded-lg border border-gray-700 mb-4 lg:mb-0 lg:mr-4">
        <p className="text-gray-400 text-xl">[Map Goes Here]</p>
      </div>

      <div className="w-full lg:w-2/5 flex flex-col bg-gray-800 rounded-lg border border-gray-700">
        {/* Header Section */}
        <div className="px-4 py-3 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Available Properties</h2>
          <p className="text-gray-400">{houses.length} homes found</p>
        </div>

        {/* Scrollable Grid Section */}
        <div
          ref={scrollRef}
          className="overflow-y-auto flex-grow p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {houses.map((house) => (
              <Card
                key={house.id}
                image={house.img}
                price={house.price}
                beds={house.beds}
                baths={house.baths}
                sqft={house.sqft}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseScroller;