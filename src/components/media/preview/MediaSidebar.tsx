import { useState } from "react";
import { MediaItem } from "../../../types/media";

interface MediaSidebarProps {
  media: MediaItem;
  onDownload: (size: string) => void;
  onShare: () => void;
  onAddToCollection: () => void;
  onFavorite: () => void;
  onFollow: () => void;
}

export function MediaSidebar({
  media,
  onDownload,
  onShare,
  onAddToCollection,
  onFavorite,
  onFollow,
}: MediaSidebarProps) {
  const [showSizes, setShowSizes] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAttribution = () => {
    const attribution = `Photo by ${media.creator.name} on OpenLens (${window.location.href})`;
    navigator.clipboard.writeText(attribution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSizes = [
    { label: "Small", size: "640x360" },
    { label: "Medium", size: "1280x720" },
    { label: "Large", size: "1920x1080" },
    { label: "Original", size: "4K" },
  ];

  return (
    <div className="space-y-6">
      {/* Download Section */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Download
          </h3>
          <button
            onClick={() => setShowSizes(!showSizes)}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showSizes ? "Hide sizes" : "Show sizes"}
          </button>
        </div>

        {showSizes ? (
          <div className="mt-4 space-y-2">
            {downloadSizes.map((size) => (
              <button
                key={size.label}
                onClick={() => onDownload(size.size)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {size.label} ({size.size})
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Free
                </span>
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => onDownload("1280x720")}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            Download Free
          </button>
        )}
      </div>

      {/* License Info */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          License
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
              <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Free for Commercial Use
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No attribution required for standard license
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyAttribution}
          className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
        >
          {copied ? "Copied!" : "Copy Attribution"}
        </button>
      </div>

      {/* Creator Info */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={media.creator.avatar}
              alt={media.creator.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {media.creator.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {media.creator.bio}
              </p>
            </div>
          </div>
          <button
            onClick={onFollow}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Follow
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onShare}
          className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
        >
          <ShareIcon className="mr-2 h-5 w-5" />
          Share
        </button>
        <button
          onClick={onAddToCollection}
          className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
        >
          <CollectionIcon className="mr-2 h-5 w-5" />
          Save
        </button>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
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
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
      />
    </svg>
  );
}

function CollectionIcon({ className }: { className?: string }) {
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
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}
