import { useEffect } from "react";
import { MediaItem } from "../../types/media";
import { formatNumber } from "../../utils/format";

interface PreviewModalProps {
  item: MediaItem;
  onClose: () => void;
}

export function PreviewModal({ item, onClose }: PreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 max-h-[90vh] max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-transform hover:scale-110"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="grid md:grid-cols-2">
          {/* Image/Video Preview */}
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
            {item.type === "video" ? (
              <video
                src={item.fullUrl}
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={item.fullUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <div className="flex items-center space-x-3">
                <img
                  src={item.creator.avatar}
                  alt={item.creator.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {item.creator.name}
                </span>
              </div>
            </div>

            {/* Stats and Info */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(item.views)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Downloads
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(item.downloads)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Resolution
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.resolution}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  License
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.license}
                </p>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-auto">
              <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700">
                Download {item.type === "video" ? "Video" : "Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
