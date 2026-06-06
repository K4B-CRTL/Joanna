import Slideshow from "./Slideshow";
import MusicPlayer from "./MusicPlayer";
import FloatingDecorations from "./FloatingDecorations";
import { motion } from "motion/react";

export default function DashboardScreen() {
  return (
    <div className="min-h-screen relative flex flex-col items-center py-10 px-4 sm:px-6 z-10 w-full max-w-4xl mx-auto">
      <FloatingDecorations />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full bg-zinc-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(255,0,0,0.3)] border-2 border-primary/50 relative z-20 flex flex-col items-center gap-8"
      >
        <div className="text-center">
          <h1 className="font-quincy text-5xl sm:text-6xl text-primary text-shadow-romantic mb-2 font-bold tracking-wide">
            Happy 10 Months Joanna!
          </h1>
          <p className="text-xl sm:text-2xl text-secondary font-light">
            Happy Anniversary Sweetheart 💕
          </p>
        </div>

        <Slideshow />

        <MusicPlayer />

        <div className="mt-4 text-center pb-2 relative flex flex-col items-center">
          <p className="font-quincy text-3xl text-primary drop-shadow-md z-10">
            I love you! ❤️ - K.B
          </p>
          <motion.img
            src="/images/snoopy1.png.png"
            alt="Snoopy Heart"
            className="w-16 mt-2 opacity-90 drop-shadow-md z-10"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
