"use client";

import { useState, useRef } from "react";
import Card from "./ui/Card";
import { MapComponent } from "./map";
import { MapProvider } from "../providers/map-provider";

interface House {
  id: number;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  description: string;
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
    const price = basePrice + i * priceIncrement * (1 + (i % 5) * 0.05);
    const sqft = baseSqft + i * sqftIncrement + (i % 4) * 50;

    const formattedPrice = price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
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
      description: `House ${id} test description`,
    });
  }
  return generatedHouses;
};

const HouseScroller: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const numberOfHousesToDisplay = 10;
  const houses = generateHouses(numberOfHousesToDisplay);

  const toggleCardExpansion = (id: number) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-secondary-400 text-white w-full lg:w-6/6 mx-auto">
      <div className="w-full lg:w-3/5 h-64 lg:h-auto bg-secondary flex items-center justify-center rounded-lg border border-gray-700 mb-4 lg:mb-0 lg:mr-4">
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </div>

      <div className="w-full lg:w-2/5 flex flex-col bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-4 py-3 border-secondary border-gray-700">
          <h2 className="text-xl font-semibold">Available Properties</h2>
          <p className="text-gray-400">{houses.length} homes found</p>
        </div>

        <div ref={scrollRef} className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {houses.map((house) => (
              <div
                key={house.id}
                className={`bg-gray-700 rounded-lg p-4 shadow-md transition-all duration-300 ${expandedCardId === house.id ? "scale-105" : "scale-100"}`}
              >
                <div className="cursor-pointer" onClick={() => toggleCardExpansion(house.id)}>
                  <img
                    src={house.img}
                    alt="House"
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold">{house.price}</h3>
                  <p className="text-sm text-gray-400">
                    {house.beds} Beds • {house.baths} Baths • {house.sqft} sqft
                  </p>
                </div>

                {expandedCardId === house.id && (
                  <div className="mt-4 text-sm text-gray-300">
                    <p>{house.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseScroller;
