"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import MetaMaskButton from "./MetaMaskButton";

const LoginButton: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      // Request MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setErrorMessage("");
      console.log("Connected account:", address);
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <MetaMaskButton onClick={connectMetaMask} />
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

export default LoginButton;
