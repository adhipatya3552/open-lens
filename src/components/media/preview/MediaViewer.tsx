import { useRef, useState } from "react";
import { MediaItem } from "../../../types/media";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MediaViewerProps {
  media: MediaItem;
}

export function MediaViewer({ media }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = media.type === "video";

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isVideo) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <video
          ref={videoRef}
          src={media.url}
          className="h-full w-full"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={media.url} type={media.mimeType} />
          Your browser does not support the video tag.
        </video>

        {/* Custom Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>
            {/* Add more video controls here */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <TransformWrapper>
      <TransformComponent>
        <img
          src={media.url}
          alt={media.title}
          className="h-full w-full rounded-lg object-contain"
        />
      </TransformComponent>
    </TransformWrapper>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
