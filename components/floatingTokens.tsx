import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Token image paths
const tokens = [
  "/assets/tokens/aave.png",
  "/assets/tokens/avalanche.png",
  "/assets/tokens/binance.png",
  "/assets/tokens/btc.png",
  "/assets/tokens/cardano.png",
  "/assets/tokens/chainlink.png",
  "/assets/tokens/doge.png",
  "/assets/tokens/ethereum.png",
  "/assets/tokens/litecoin.png",
  "/assets/tokens/polygon.png",
  "/assets/tokens/tether.png",
  "/assets/tokens/tezos.png",
  "/assets/tokens/uniswap.png",
  "/assets/tokens/xrp.png",
];

// Generate unique non-overlapping positions
const generateUniquePositions = (count: number, size: number = 120) => {
  const positions: { top: number; left: number }[] = [];
  const minDistance = size * 1.5; // Minimum space between tokens

  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newPos: any;
    let attempts = 0;
    do {
      newPos = {
        top: Math.random() * (90 - (size / window.innerHeight) * 100) + 5, // Keeping tokens inside the viewport
        left: Math.random() * (90 - (size / window.innerWidth) * 100) + 5,
      };
      attempts++;
    } while (
      positions.some(
        (pos) =>
          Math.hypot(pos.top - newPos.top, pos.left - newPos.left) < minDistance
      ) &&
      attempts < 50
    ); // Avoid infinite loops
    positions.push(newPos);
  }

  return positions;
};

const FloatingTokens = () => {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );

  useEffect(() => {
    setPositions(generateUniquePositions(tokens.length));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {tokens.map((token, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            y: [0, -20, 0], // Tokens will move up and down in a wave motion
          }}
          transition={{
            duration: 5 + Math.random() * 3, // Random duration for variation
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${positions[index]?.top}vh`,
            left: `${positions[index]?.left}vw`,
          }}
        >
          <Image
            src={token}
            alt={`Token ${index}`}
            width={120}
            height={120}
            className="blur-[1.5px] opacity-80"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTokens;
