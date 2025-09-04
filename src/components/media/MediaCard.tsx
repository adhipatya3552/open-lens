import { useState } from "react";
import { MediaItem } from "../../types/media";
import { formatNumber } from "../../utils/format";

interface MediaCardProps {
  item: MediaItem;
  onPreview: (item: MediaItem) => void;
  onFavorite: (id: string, favorited: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  onSelectionChange?: (id: string) => void;
}

export function MediaCard({
  item,
  onPreview,
  onFavorite,
  selectable = false,
  selected = false,
  onSelectionChange,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(item.id, !item.favorited);
  };

  const handleCardClick = () => {
    if (selectable && onSelectionChange) {
      onSelectionChange(item.id);
    } else {
      onPreview(item);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      {selectable && (
        <div className="absolute left-3 top-3 z-10">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelectionChange?.(item.id)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Media Type Badge */}
      <div className="absolute left-3 top-3 z-10" style={{ marginLeft: selectable ? '2rem' : '0' }}>
        <span className="rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
          {item.type === "video" ? "Video" : "Photo"}
        </span>
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-transform hover:scale-110"
      >
        <svg
          className={`h-5 w-5 transition-colors ${
            item.favorited ? "text-red-500" : "text-white"
          }`}
          fill={item.favorited ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Thumbnail with Gradient Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
            isHovered
              ? "from-black/80 to-transparent opacity-100"
              : "from-black/60 to-transparent/0 opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative p-4">
        {/* License Badge */}
        <span className="mb-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          {item.license}
        </span>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>

        {/* Creator Info */}
        <div className="flex items-center space-x-2">
          <img
            src={item.creator.avatar}
            alt={item.creator.name}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {item.creator.name}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatNumber(item.views)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatNumber(item.downloads)}</span>
          </div>
        </div>

        {/* Download Button (Visible on Hover) */}
        <div
          className={`absolute inset-x-0 bottom-0 flex transform items-center justify-center bg-gradient-to-t from-black/80 p-4 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <button className="w-full rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
