"use client";

import React from "react";

interface MetaMaskButtonProps {
  onClick: () => void;
}

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({ onClick }) => {
  return (
    <button
      className="px-6 py-3 text-lg font-semibold bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300"
      onClick={onClick}
    >
      Login with MetaMask
    </button>
  );
};

export default MetaMaskButton;
