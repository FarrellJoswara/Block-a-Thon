"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapComponent } from "./map";
import { MapProvider } from "../providers/map-provider";
import BuyHouse from "./BuyHouse";

interface House {
  id: number;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  description: string;
}

const HouseScroller: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch JSON Data
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch("/houses.json"); // Ensure the file is in the public directory
        const data: House[] = await response.json();
        setHouses(data);
      } catch (error) {
        console.error("Error loading houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

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
          {loading ? (
            <p className="text-gray-400">Loading homes...</p>
          ) : (
            <p className="text-gray-400">{houses.length} homes found</p>
          )}
        </div>

        <div ref={scrollRef} className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {!loading &&
              houses.map((house) => (
                <motion.div
                  key={house.id}
                  className="bg-gray-700 rounded-lg p-4 shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openModal(house)}
                >
                  <img
                    src={house.img}
                    alt={`House ${house.id}`}
                    loading="lazy"
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
                ×
              </button>

              {/* House Image */}
              <img
                src={selectedHouse.img}
                alt={`House ${selectedHouse.id}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg mb-4"
              />

              {/* House Details */}
              <div className="flex flex-col items-center mb-4 pd-4">
                <h3 className="text-3xl font-bold">{selectedHouse.price}</h3>
                <p className="text-lg text-gray-400">
                  {selectedHouse.beds} Beds • {selectedHouse.baths} Baths •{" "}
                  {selectedHouse.sqft} sqft
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {selectedHouse.description}
                </p>
                <BuyHouse />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HouseScroller;
