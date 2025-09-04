import { MediaItem } from "../../../types/media";

interface PreviewHeaderProps {
  media: MediaItem;
}

export function PreviewHeader({ media }: PreviewHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
              {media.title}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {media.description}
            </p>
          </div>
          <nav className="flex space-x-2">
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
