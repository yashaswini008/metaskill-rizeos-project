import React, { useEffect, useState } from "react";

const MetaMaskConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("MetaMask connection error:", err);
      alert("Connection to MetaMask failed.");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      {walletAddress ? (
        <div className="text-green-600 font-semibold text-sm break-words">
          ✅ Connected to wallet:
          <br />
          <span className="text-gray-800">{walletAddress}</span>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default MetaMaskConnect;
