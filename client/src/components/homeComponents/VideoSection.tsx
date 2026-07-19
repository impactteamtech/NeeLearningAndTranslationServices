import React, { useState } from "react";

export interface VideoSectionProps {
  /** Video embed URL (e.g. YouTube embed link). If empty, plays a placeholder video */
  videoEmbedUrl?: string;
  /** Custom thumbnail cover image (defaults to Framer image) */
  thumbnailUrl?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoEmbedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thumbnailUrl = "https://framerusercontent.com/images/IZLx5S5dEqmgGNkvLXFUprpqweo.jpg",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="video"
      className="w-full bg-white pb-16 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-30 relative overflow-hidden"
    >
      <div className="section-container relative z-10">
        
        {/* Video thumbnail/player container */}
        <div
          className="group relative w-full rounded-[15px] overflow-hidden border-[1.5px] border-[#06439f]/12 shadow-[0_12px_40px_rgba(6,67,159,0.08)] hover:shadow-[0_24px_70px_rgba(6,67,159,0.18)] hover:scale-[1.005] transition-all duration-300"
        >
          {!isPlaying ? (
            <>
              {/* Cover Thumbnail Image */}
              <img
                src={thumbnailUrl}
                alt="Nee's Learning & Translation Services Video Overview"
                className="w-full h-auto object-cover block"
              />

              {/* Play Button Overlay — absolute center */}
              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/92 backdrop-blur-[10px] shadow-[0_8px_40px_rgba(26,59,80,0.25)] group-hover:shadow-[0_12px_50px_rgba(26,59,80,0.35)] group-hover:scale-110 border-none cursor-pointer flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-accent translate-x-0.5 group-hover:text-primary transition-colors duration-300"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M9 5.5v17l14-8.5L9 5.5z" fill="currentColor" />
                </svg>
              </button>
            </>
          ) : (
            /* Embedded Iframe Player (loads dynamically on click) */
            <div className="relative w-full aspect-video">
              <iframe
                src={`${videoEmbedUrl}?autoplay=1`}
                title="Video Overview Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-none"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;