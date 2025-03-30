"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import ContractABI from "../abis/contractABI.json";

// Extend the Window interface to include ethereum property
declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider;
  }
}

const TestMetaMask: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to connect to MetaMask
  const connectMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }
      
      // Request accounts access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Initialize provider using ethers v6 BrowserProvider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get the signer
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Set the connected account
      setAccount(address);
      setErrorMessage("");
      
      console.log("Connected account:", address);
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Test MetaMask Connection</h1>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      {account && (
        <div>
          <h2>Connected Account:</h2>
          <p>{account}</p>
        </div>
      )}
      {errorMessage && (
        <div style={{ color: "red" }}>
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TestMetaMask;
