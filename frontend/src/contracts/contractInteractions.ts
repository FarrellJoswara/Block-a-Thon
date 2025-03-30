import { ethers } from "ethers";
import ContractABI from "../app/abis/contractABI.json"; // Make sure this path is correct
//onst provider = new ethers.JsonRpcProvider('https://polygon-amoy.drpc.org');
// Replace with your contract's address
const CONTRACT_ADDRESS = "0x7ee945a469838d3d7419f6aefe589c9e3406b793"; 

// Function to create a contract instance
export const getContractInstance = (provider: ethers.BrowserProvider | ethers.JsonRpcProvider) => {
  // Create a contract instance using the provider
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
  return contract;
};

// Function to call a read-only contract function (e.g., getting data from the contract)
export const getContractData = async (provider: ethers.BrowserProvider | ethers.JsonRpcProvider) => {
  const contract = getContractInstance(provider);

  try {
    const data = await contract.yourReadOnlyFunctionName(); // Replace with your contract function
    console.log("Contract Data:", data);
    return data;
  } catch (error) {
    console.error("Error getting contract data:", error);
    throw error;
  }
};

// Function to send a transaction to the contract (e.g., changing state)
export const sendTransaction = async (provider: ethers.BrowserProvider, value: number) => {
  const contract = getContractInstance(provider);

  try {
    const tx = await contract.yourWriteFunctionName(value, {
      gasLimit: 300000, // Adjust the gas limit as needed
    });
    await tx.wait();
    console.log("Transaction successful:", tx);
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};
