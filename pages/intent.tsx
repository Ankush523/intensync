import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import FloatingTokens from "../components/floatingTokens";
import CryptoJS from "crypto-js";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SECRET_KEY = "YOUR_SECRET_KEY"; // Change this to a secure key

const Intent: NextPage = () => {
  const [account, setAccount] = useState("");
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState("");
  const [txnHash, setTxnHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  });

  // Encrypt function using AES
  const encryptText = (text: string) => {
    console.log(CryptoJS.AES.encrypt(text, SECRET_KEY).toString());
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  const getIntent = async () => {
    if (!command.trim()) return;
    setLoading(true);

    // Encrypt the command text
    const encryptedCommand = encryptText(command);

    // Show toast notification for successful encryption
    setToastMessage({
      title: "Intent Encrypted",
      description: "Your intent has been encrypted successfully.",
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ body: `${encryptedCommand}` }),
    };
    const response = await fetch("http://localhost:8000/completion", options);

    setToastMessage({
      title: "Transaction Submitted",
      description: `Borrowing 0.0001 USDT from AAVE Pool. \n
                    0.0001 USDT will be transferred from Pool address 0x0b913A76beFF3887d35073b8e5530755D60F78C7 
                    to your account ${account}`,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10000);

    const data = await response.json();
    console.log("Transaction hash is :", data);
    setLoading(false);
    setTxHash(data);
  };

  const connectToMetamask = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAccount(account);
      const hexchainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      const chainId = parseInt(hexchainId, 16).toString();
      setChainId(chainId);
      console.log(account, chainId);
    }
  };

  // Toast animation variants
  const toastVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative bg-black min-h-screen text-white overflow-hidden">
      <FloatingTokens />
      {/* <div
        className="fixed top-[-350px] left-[-450px] w-250 h-200 rounded-full transition-opacity duration-400 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,193,7,0.4) -70%, rgba(255,193,7,0.1) 60%, rgba(255,193,7,0) 90%)",
          filter: "blur(40px)",
          zIndex: "0",
        }}
      /> */}

      <div
        className="fixed bottom-[-350px] right-[-450px] w-250 h-200 rounded-full transition-opacity duration-400 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,193,7,0.4) -70%, rgba(255,193,7,0.1) 60%, rgba(255,193,7,0) 90%)",
          filter: "blur(40px)",
          zIndex: "0",
        }}
      />
      <Head>
        <title>IntenSync App | From Words to Web3</title>
        <meta
          name="description"
          content="Powering Seamless Blockchain Interactions"
        />
      </Head>

      {/* Navigation */}
      <nav className="relative z-10 mx-[8%] py-[3%] md:px-12 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="4" fill="#FFC107" />
            <path
              d="M8 10H24M8 16H24M8 22H16"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="ml-2 text-2xl font-semibold text-yellow-500">
            IntenSync
          </span>
        </Link>

        <div className="flex items-center">
          {!account ? (
            <button
              onClick={connectToMetamask}
              className="bg-black/70 text-white hover:bg-linear-to-r from-yellow-300 to-yellow-600 hover:text-black border border-yellow-500 px-6 py-2 rounded-xl transition duration-300"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-yellow-300 text-lg">
                EOA Address:
                <span className="text-yellow-500">
                  {" "}
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </p>
              <p className="text-yellow-300 text-lg">
                ChainID:
                <span className="text-yellow-500">{chainId}</span>
              </p>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 mx-[8%] md:px-12 py-8 flex flex-col items-center ">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-[550] mb-4">
            <span className="text-yellow-500">From Words,</span>{" "}
          </h1>
          <h1 className="text-5xl md:text-6xl font-[550] mb-4">
            <span className="text-white">to Web3.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-xl mx-auto">
            Powering seamless blockchain interactions with AI-driven intent
            execution. Define your goals, and let IntenSync handle the rest.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-lg"
        >
          <div className="flex flex-col items-center border border-gray-800 bg-gray-900 rounded-3xl p-3">
            <input
              className="w-full h-20 px-6 text-lg text-yellow-500 bg-black/30 border-2 border-yellow-800 rounded-2xl focus:outline-none focus:border-yellow-500 placeholder-yellow-700/90 transition duration-300"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type your intent (e.g., 'Borrow 1 ETH from AAVE')"
            />
            <button
              onClick={getIntent}
              disabled={!command.trim() || loading}
              className={`w-full mt-6 px-6 py-3 rounded-2xl font-semibold transition duration-300 ${
                !command.trim()
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-linear-to-r from-yellow-300 to-yellow-600 text-black"
              }`}
            >
              {loading ? "Processing..." : "Send Intent"}
            </button>
          </div>

          <p className="text-gray-400 font-[550] text-md max-w-md mx-auto text-center mt-4">
            The largest onchain marketplace. Lend, borrow, swap and send tokens
            on Ethereum and many other chains.
          </p>
        </motion.div>

        {/* Transaction Verification */}
        {!txnHash ? (
          !txHash ? null : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-yellow-400 text-md cursor-pointer hover:text-yellow-300 transition duration-300"
              onClick={() =>
                window.open(
                  `https://mumbai.polygonscan.com/tx/${txHash}`,
                  "_blank"
                )
              }
            >
              Verify your transaction here
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-yellow-200 text-md cursor-pointer hover:text-yellow-300 transition duration-300"
            onClick={() =>
              window.open(
                `https://www.jiffyscan.xyz/userOpHash/${txnHash}?network=mumbai`,
                "_blank"
              )
            }
          >
            Verify your transaction here
          </motion.div>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-4 right-4 bg-gray-900 shadow-lg rounded-md max-w-md p-4 border-l-4 border-yellow-500"
          >
            <div className="flex flex-col">
              <p className="font-bold text-yellow-500">{toastMessage.title}</p>
              <p className="mt-1 text-sm text-gray-300 whitespace-pre-line">
                {toastMessage.description}
              </p>
              <button
                onClick={() => setShowToast(false)}
                className="mt-2 self-end text-sm text-gray-400 hover:text-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intent;
