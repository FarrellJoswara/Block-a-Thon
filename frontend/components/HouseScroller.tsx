"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      img: `/house${id}.png`,
      description: `House ${id} test description`,
    });
  }
  return generatedHouses;
};

const HouseScroller: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const numberOfHousesToDisplay = 10;
  const houses = generateHouses(numberOfHousesToDisplay);

  const openModal = (house: House) => {
    setSelectedHouse(house);
  };

  const closeModal = () => {
    setSelectedHouse(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-secondary-400 text-white w-full lg:w-6/6 mx-auto">
      {/* Map Section */}
      <div className="w-full lg:w-3/5 h-64 lg:h-auto bg-secondary flex items-center justify-center rounded-lg border border-gray-700 mb-4 lg:mb-0 lg:mr-4">
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </div>

      {/* Cards Section */}
      <div className="w-full lg:w-2/5 flex flex-col bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-4 py-3 border-secondary border-gray-700">
          <h2 className="text-xl font-semibold">Available Properties</h2>
          <p className="text-gray-400">{houses.length} homes found</p>
        </div>

        <div ref={scrollRef} className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {houses.map((house) => (
              <motion.div
                key={house.id}
                className="bg-gray-700 rounded-lg p-4 shadow-md cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(house)}
              >
                <img
                  src={house.img}
                  alt="House"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold">{house.price}</h3>
                <p className="text-sm text-gray-400">
                  {house.beds} Beds • {house.baths} Baths • {house.sqft} sqft
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Modal Pop-up */}
      <AnimatePresence>
        {selectedHouse && (
          <motion.div
            className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white rounded-lg p-6 w-11/12 max-w-4xl max-h-4xl shadow-xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                onClick={closeModal}
              >
                x
              </button>

              {/* House Image */}
              <img
                src={selectedHouse.img}
                alt="House"
                className="w-full h-full object-cover rounded-lg mb-4"
              />

              {/* House Details */}
              <h3 className="text-3xl font-bold">{selectedHouse.price}</h3>
              <p className="text-lg text-gray-400">
                {selectedHouse.beds} Beds • {selectedHouse.baths} Baths •{" "}
                {selectedHouse.sqft} sqft
              </p>
              <p className="text-sm text-gray-300 mt-2">
                {selectedHouse.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HouseScroller;
