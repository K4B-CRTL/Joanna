import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imagePaths = [
  "/images/aaaaa4.jpg",
  "/images/bbbbbbbb.jpg",
  "/images/bummmm.jpg",
  "/images/cccc.jpg",
  "/images/ccccccc.jpg",
  "/images/ddddddd.jpg",
  "/images/dfsdfsfsd.png",
  "/images/faw u good.jpg",
  "/images/gggggggg.jpg",
  "/images/hahahaaaaaa.jpg",
  "/images/hhhhhhh.jpg",
  "/images/iiiiii.jpg",
  "/images/IMG_9800.jpg",
  "/images/iyyyy.jpg",
  "/images/jjjjjj.jpg",
  "/images/joo.jpg",
  "/images/jowwww.jpg",
  "/images/kkkkkk.jpg",
  "/images/kkkkkkkkkkkkk.jpg",
  "/images/laughhhhh.jpg",
  "/images/lllllll.jpg",
  "/images/lp_image.jpg",
  "/images/mmmmmmm.jpg",
  "/images/nnnnn.jpg",
  "/images/ooooooo.jpg",
  "/images/pooooo.jpg",
  "/images/pppppp.jpg",
  "/images/qqqqq.jpg",
  "/images/sexyyyy.jpg",
  "/images/sleep.jpg",
  "/images/usssss.jpg",
  "/images/uuuuu.jpg",
  "/images/vvvvvvvv.jpg",
  "/images/waa2.jpg",
  "/images/xxxxxx.png",
  "/images/zzzzzz.jpg",
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideNext = () =>
    setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
  const slidePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + imagePaths.length) % imagePaths.length,
    );

  return (
    <div className="w-full max-w-md mx-auto aspect-square relative border-2 border-primary rounded-2xl shadow-[0_4px_15px_rgba(255,0,0,0.3)] bg-gradient-to-br from-red-500/20 to-pink-500/20 overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-zinc-900"
        >
          {/* Main Image */}
          <img
            src={imagePaths[currentIndex]}
            alt={`Anniversary memory ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={slidePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-pink-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={slideNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-pink-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 flex-wrap px-4 pb-2 max-h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
        {imagePaths.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-primary scale-125" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
