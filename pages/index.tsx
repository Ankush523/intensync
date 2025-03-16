// pages/index.tsx
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import bitcoin from "@/images/bitcoin.png";
import parsing from "@/images/parsing.png";
import engine from "@/images/engine.png";
import security from "@/images/security.png";
import crosschain from "@/images/crosschain.png";

const Home: NextPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to features section
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div
        className="fixed top-[-350px] left-[-450px] w-250 h-200 rounded-full transition-opacity duration-400 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,193,7,0.4) -70%, rgba(255,193,7,0.1) 60%, rgba(255,193,7,0) 90%)",
          filter: "blur(40px)",
          zIndex: "0",
          opacity: scrollY > 100 ? 0 : 1,
        }}
      />
      <Head>
        <title>IntenSync | From Words to Web3</title>
        <meta
          name="description"
          content="Powering Seamless Blockchain Interactions"
        />
      </Head>

      {/* Navigation */}
      <nav className="mx-[8%] py-[3%] md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center">
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
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/intent"
            className="border border-yellow-500 text-white hover:bg-yellow-500 hover:text-black px-4 py-2 rounded-lg transition duration-300"
          >
            Launch App
          </Link>
          <button className="bg-linear-to-r from-yellow-300 to-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition duration-300">
            Register
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative mx-[8%] md:px-12 py-16 flex flex-col"
        style={{
          opacity: 1,
          transform: `translateY(${Math.min(0, -10 + scrollY * 0.1)}px)`,
        }}
      >
        {/* Text content row */}
        <div className="flex flex-row justify-between items-center w-full relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-yellow-500 text-7xl">Intent-Based</span>{" "}
            <span className="text-7xl">Web3</span>
            <br />
            <span className="text-white text-7xl">Execution</span>{" "}
            <span className="text-7xl">Made Easy</span>
          </h1>
          <div className="flex flex-col w-[46%]">
            <p className="text-gray-300 mb-8">
              IntenSync transforms high-level user intents into optimized,
              secure, and automated blockchain transactions. Instead of manual
              execution, users simply define their desired outcomes—such as
              asset swaps or cross-chain transfers—while AI-driven solvers
              determine the most efficient and secure execution path. With MEV
              resistance, front-running protection, and seamless automation,
              IntenSync simplifies Web3 interactions, making blockchain more
              accessible, scalable, and efficient.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/intent"
                className="bg-linear-to-r from-yellow-300 to-yellow-600 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
              >
                Get Started
              </Link>
              <button
                onClick={scrollToFeatures}
                className="border border-yellow-500 text-white px-8 py-3 rounded-md font-medium hover:bg-yellow-500 hover:text-black transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Moving Blockchain Ticker */}
        <div className="absolute top-[55%] left-0 w-full overflow-hidden">
          <div className="relative w-full">
            {/* Gradient Fade Effect on both sides */}
            <div className="absolute left-0 top-0 h-full w-1/6 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-1/6 bg-gradient-to-l from-black via-transparent to-transparent z-10"></div>

            {/* Scrolling text container */}
            <div className="flex whitespace-nowrap animate-scroll">
              {[
                "Ethereum",
                "Polygon",
                "BSC",
                "Solana",
                "Arbitrum",
                "Optimism",
                "Avalanche",
                "Cosmos",
                "Polkadot",
                "Near",
                "Fantom",
              ].map((chain, index) => (
                <span
                  key={index}
                  className="text-4xl md:text-5xl font-bold text-yellow-400 mx-10 opacity-90 tracking-widest drop-shadow-lg glow-effect"
                >
                  {chain}
                </span>
              ))}
              {/* Duplicate for smooth infinite effect */}
              {[
                "Ethereum",
                "Polygon",
                "BSC",
                "Solana",
                "Arbitrum",
                "Optimism",
                "Avalanche",
                "Cosmos",
                "Polkadot",
                "Near",
                "Fantom",
              ].map((chain, index) => (
                <span
                  key={`duplicate-${index}`}
                  className="text-4xl md:text-5xl font-bold text-yellow-400 mx-10 opacity-90 tracking-widest drop-shadow-lg glow-effect"
                >
                  {chain}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Coin with Cloud - centered below */}
        <div className="w-full flex justify-center items-center relative z-10">
          <Image src={bitcoin} width={800} height={800} alt={"tokens"} />
        </div>
      </div>

      {/* Features Section - Matching the provided image */}
      <div
        ref={featuresRef}
        className="w-full bg-black border-t border-gray-900 py-20"
      >
        <div className="mx-[8%] md:px-12">
          <div
            className="max-w-4xl mx-auto text-center mb-16"
            style={{
              opacity: scrollY > 700 ? 1 : 0,
              transform: `translateY(${scrollY > 700 ? 0 : 30}px)`,
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A Smarter Web3 Experience
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              IntenSync leverages AI-driven solvers, dynamic optimization, and
              secure execution models to enable frictionless blockchain
              transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div
              className="bg-gray-900/60 rounded-lg p-6 border border-gray-800 flex flex-col items-center h-full"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: `translateY(${scrollY > 800 ? 0 : 30}px)`,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                transitionDelay: "0.1s",
              }}
            >
              <div className="h-24 w-24 flex items-center justify-center mb-4">
                <Image src={parsing} width={100} height={100} alt={"parsing"} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Intent Parsing
              </h3>
              <div className="w-28 h-1 bg-yellow-500 mb-4"></div>
              <p className="text-gray-300 text-center">
                Understands user input and converts it into structured,
                executable blockchain transactions.
              </p>
              <div className="mt-auto pt-4">
                <a
                  href="#"
                  className="text-yellow-500 inline-flex items-center hover:text-yellow-400"
                >
                  Learn More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-gray-900/60 rounded-lg p-6 border border-gray-800 flex flex-col items-center h-full"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: `translateY(${scrollY > 800 ? 0 : 30}px)`,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                transitionDelay: "0.2s",
              }}
            >
              <div className="h-24 w-24 flex items-center justify-center mb-4">
                <Image src={engine} width={100} height={100} alt={"engine"} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Optimization Engine
              </h3>
              <div className="w-28 h-1 bg-yellow-500 mb-4"></div>
              <p className="text-gray-300 text-center">
                Selects best execution paths based on gas fees, network
                congestion, and liquidity.
              </p>
              <div className="mt-auto pt-4">
                <a
                  href="#"
                  className="text-yellow-500 inline-flex items-center hover:text-yellow-400"
                >
                  Learn More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-gray-900/60 rounded-lg p-6 border border-gray-800 flex flex-col items-center h-full"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: `translateY(${scrollY > 800 ? 0 : 30}px)`,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                transitionDelay: "0.3s",
              }}
            >
              <div className="h-24 w-24 flex items-center justify-center mb-4">
                <Image
                  src={security}
                  width={100}
                  height={100}
                  alt={"security"}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Security & Trust
              </h3>
              <div className="w-28 h-1 bg-yellow-500 mb-4"></div>
              <p className="text-gray-300 text-center">
                Protects against front-running, MEV attacks, and intent
                manipulation.
              </p>
              <div className="mt-auto pt-4">
                <a
                  href="#"
                  className="text-yellow-500 inline-flex items-center hover:text-yellow-400"
                >
                  Learn More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="bg-gray-900/60 rounded-lg p-6 border border-gray-800 flex flex-col items-center h-full"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: `translateY(${scrollY > 800 ? 0 : 30}px)`,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                transitionDelay: "0.4s",
              }}
            >
              <div className="h-24 w-24 flex items-center justify-center mb-4">
                <Image
                  src={crosschain}
                  width={100}
                  height={100}
                  alt={"crosschain"}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Cross-Chain Execution
              </h3>
              <div className="w-28 h-1 bg-yellow-500 mb-4"></div>
              <p className="text-gray-300 text-center">
                Enables seamless transactions across Ethereum, Polygon, BSC, and
                more.
              </p>
              <div className="mt-auto pt-4">
                <a
                  href="#"
                  className="text-yellow-500 inline-flex items-center hover:text-yellow-400"
                >
                  Learn More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 px-4 md:px-12 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="28" rx="4" fill="#FFC107" />
              <path
                d="M7 9H21M7 14H21M7 19H14"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="ml-2 text-lg font-bold text-yellow-500">
              IntenSync
            </span>
          </div>
          <div className="text-gray-400">
            © 2025 IntenSync. Built for the Future of Web3
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
