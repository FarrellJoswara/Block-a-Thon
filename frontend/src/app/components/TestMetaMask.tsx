"use client";

import { useState } from "react";
import { ethers } from "ethers";

// Extend the Window interface to include ethereum property
declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider;
  }
}

export const useMetaMask = () => {
  const [account, setAccount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setErrorMessage("");
      const accounts = await window.ethereum.request({method: "eth_accounts",});
      console.log("Connected account:", address);
      if (account.length > 0) {
        console.log("Account already connected:", account);
        
      }
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage(error.message);
    }
  };

  return { account, errorMessage, connectMetaMask };
};
