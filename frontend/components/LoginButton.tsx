"use client";
import { useMetaMask } from "../src/app/components/TestMetaMask";
import MetaMaskButton from "./MetaMaskButton";

const LoginButton: React.FC = () => {
  const { account, errorMessage, connectMetaMask } = useMetaMask();

  return (
    <div style={{ padding: "2rem" }}>
      <MetaMaskButton onClick={connectMetaMask} />
      {errorMessage && (
        <div style={{ color: "red" }}>
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoginButton;