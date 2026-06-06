import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Play, Pause, SkipForward, Repeat } from "lucide-react";

interface Song {
  name: string;
  path: string;
}

const playlist: Song[] = [
  {
    name: "Cherry Wine - Grent Perez",
    path: "/music/grentperez - Cherry Wine (Official Lyric Video) 4.mp3",
  },
  { name: "Flowerbed", path: "/music/flowerbed.mp3" },
  {
    name: "Love Between - Kali Uchis",
    path: "/music/Kali Uchis - Love Between… (Lyrics).mp3",
  },
  {
    name: "This Woman's Work - Maxwell",
    path: "/music/This Woman's Work (Uncut) by Maxwell (Lyrics).mp3",
  },
  {
    name: "Underneath the Mistletoe",
    path: "/music/Underneath the Mistletoe.mp3",
  },
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleInitialPlay = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => {
            console.log("Play failed:", e);
          });
      }
    };

    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((e) => {
        console.log("Audio autoplay prevented or missing:", e);
        setIsPlaying(false);
      });
    }

    // Modern browsers block autoplay without user interaction.
    // Listen for the first touch or click to start playing automatically.
    window.addEventListener("click", handleInitialPlay, { once: true });
    window.addEventListener("touchstart", handleInitialPlay, { once: true });

    return () => {
      window.removeEventListener("click", handleInitialPlay);
      window.removeEventListener("touchstart", handleInitialPlay);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const loadSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (isLooping && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      skipSong();
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleError = () => {
    console.warn(
      `Could not load local file: ${playlist[currentSongIndex].path}. Please upload the file to /public/music/.`,
    );
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentSong = playlist[currentSongIndex];

  return (
    <div className="w-full max-w-lg bg-gradient-to-br from-zinc-800 to-zinc-900 p-5 rounded-2xl border-2 border-primary shadow-xl mx-auto text-white">
      <h2 className="font-quincy text-3xl font-bold text-primary text-center mb-4">
        🎵 Songs that made me think of you 🎵
      </h2>

      <audio
        ref={audioRef}
        autoPlay
        src={currentSong.path}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />

      <div className="flex justify-center items-center gap-6 mb-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>

        <button
          onClick={skipSong}
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110"
        >
          <SkipForward size={22} fill="currentColor" />
        </button>

        <button
          onClick={toggleLoop}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all transform hover:scale-110 ${isLooping ? "bg-primary border-primary text-white" : "border-primary text-primary hover:bg-primary hover:text-white"}`}
          title="Toggle Loop"
        >
          <Repeat size={20} />
        </button>
      </div>

      <div className="text-center mb-4">
        <div className="font-semibold text-primary truncate px-2 text-shadow-romantic">
          {currentSong.name}
        </div>
        <div className="text-sm text-zinc-400 mt-1">
          Loop: {isLooping ? "ON" : "OFF"}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 flex flex-col gap-1 text-sm text-zinc-400">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-primary hover:accent-pink-400 transition-colors"
        />
        <div className="flex justify-between w-full mt-1 font-mono text-xs">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="border-t border-zinc-700 pt-4">
        <h3 className="text-primary font-medium mb-3 text-sm tracking-wide uppercase">
          Playlist
        </h3>
        <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 scroll-smooth">
          {playlist.map((song, idx) => (
            <button
              key={idx}
              onClick={() => loadSong(idx)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm border-l-4 transition-all ${
                idx === currentSongIndex
                  ? "bg-primary border-primary text-white"
                  : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-primary hover:translate-x-1"
              }`}
            >
              <div className="truncate">{song.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
