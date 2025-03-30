"use client";
import Image from "next/image";
import HouseScroller from "../../components/HouseScroller";
import LoginButton from "../../components/LoginButton";
import AddHouse from "../../components/AddHouse";

import React, { useState } from "react";
import { ethers, formatUnits } from "ethers";
import { getContractInstance } from "../contracts/contractInteractions"; // Import your contract interaction functions
import ContractABI from "./abis/contractABI.json"; // Import ABI for your contract


const Home: React.FC = () => {
  const [housePrice, setHousePrice] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch house price from the smart contract
  const fetchHousePrice = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = getContractInstance(provider); // Create contract instance

      // Call the smart contract function to get the house price
      const price = await contract.getHousePrice(); // Replace with the actual contract function
      
      setHousePrice(parseFloat(formatUnits(price, 18))); // Format price to ETH and convert to number

      console.log("House Price:", price.toString());
    } catch (error: any) {
      console.error("Error fetching house price:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-white">
      <header className="flex flex-row gap-[5px] mx-auto bg-gray-900 rounded-lg p-4 shadow-md border border-gray-700 w-full">
        <LoginButton />
        <h1 className="text-6xl font-bold text-center mx-auto">ZillowNFT</h1>
        <AddHouse />
      </header>
      
      {/* Main content */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <HouseScroller />
        
        {/* Fetch House Price Button and Display */}
        <button onClick={fetchHousePrice}>Fetch House Price</button>
        {housePrice !== null && (
          <div>
            <h2>House Price:</h2>
            <p>{housePrice} ETH</p> {/* Display price in ETH */}
          </div>
        )}

        {/* Display errors if any */}
        {errorMessage && (
          <div style={{ color: "red" }}>
            <p>Error: {errorMessage}</p>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Additional Footer Content */}
      </footer>
    </div>
  );
};

export default Home;
