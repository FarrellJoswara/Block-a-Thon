import ContractABI from "../abis/contractABI.json";
import { ethers } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider;
  }
}

// Updated provider initialization for ethers v6
const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider instead of Web3Provider

// Rest of your code (make sure to handle async operations properly)
// ...
// MetaMask requires requesting permissioan to connect users accounts
if (!window.ethereum) {
    throw new Error("MetaMask not installed!");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = await provider.getSigner();
