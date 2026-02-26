import { useState, useRef } from 'react';

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/welcome_video.mp4"
        className="w-full aspect-video"
        poster="/logo.jpg"
        onEnded={() => setIsPlaying(false)}
      />
      
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      )}
      
      {isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
      )}
      
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
        🎬 Как это работает
      </div>
    </div>
  );
}
