// Card.tsx
import React from "react";

interface CardProps {
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
}

const Card: React.FC<CardProps> = ({ image, price, beds, baths, sqft }) => {
  return (
    // Added group class for potential hover effects later
    <div className="w-full shadow-md rounded-lg overflow-hidden border border-gray-700 bg-secondary group"> 
      <div className="relative">
        {/* INCREASED image height from h-40 to h-48 */}
        <img src={image} alt={price} className="w-full h-48 object-cover" /> 
        <div className="absolute top-0 right-0 bg-black bg-opacity-80 text-white px-3 py-1.5 m-2 rounded"> {/* Slightly larger padding/margin */}
          {/* INCREASED price font size from text-base to text-lg */}
          <p className="text-lg font-bold">{price}</p> 
        </div>
      </div>
      {/* INCREASED padding from p-2 to p-4 */}
      <div className="p-4"> 
        {/* INCREASED text size from text-sm to text-base */}
        {/* INCREASED spacing between items using space-x-4 on parent */}
        <div className="flex justify-between items-center text-gray-300 text-base space-x-4"> 
          {/* Beds */}
          <div className="flex items-center">
            {/* Increased icon size slightly w-4 h-4 */}
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"> 
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            {/* Added labels for clarity */}
            <span>{beds} <span className="hidden sm:inline">Beds</span></span>
          </div>
          {/* Baths */}
          <div className="flex items-center">
             {/* Increased icon size slightly w-4 h-4 */}
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.5 3a2.5 2.5 0 00-2.5 2.5v3.5h14V5.5a2.5 2.5 0 00-2.5-2.5h-9zM3 9v7.5A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V9H3z" clipRule="evenodd"></path>
            </svg>
             {/* Added labels for clarity */}
            <span>{baths} <span className="hidden sm:inline">Baths</span></span>
          </div>
          {/* Sqft */}
          <div className="flex items-center">
             {/* Increased icon size slightly w-4 h-4 */}
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"> 
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
             {/* Added labels for clarity */}
            <span>{sqft} <span className="hidden sm:inline">SqFt</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;