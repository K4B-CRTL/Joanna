import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function FloatingDecorations() {
  const [hearts, setHearts] = useState<
    { id: number; left: string; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Generate some random floating hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Snoopy placeholders */}
      <motion.img
        src="/images/snoopy1.png.png"
        alt="Snoopy"
        className="absolute w-28 top-[8%] left-[5%] opacity-90 hover:opacity-100 hover:scale-110 drop-shadow-xl transition-all duration-300 z-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        onError={(e) => {
          e.currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png";
          e.currentTarget.onerror = null;
        }}
      />

      <motion.img
        src="/images/snoopy3.png.png"
        alt="Snoopy 3"
        className="absolute w-28 bottom-[15%] left-[3%] opacity-90 hover:opacity-100 hover:scale-110 drop-shadow-xl transition-all duration-300 z-30"
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        onError={(e) => {
          e.currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png";
          e.currentTarget.onerror = null;
        }}
      />

      {/* Floating background hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300/40"
          style={{ left: heart.left, fontSize: heart.size }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.8, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}
