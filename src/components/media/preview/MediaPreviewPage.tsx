import { useState } from "react";
import { MediaItem } from "../../../types/media";
import { PreviewHeader } from "./PreviewHeader";
import { MediaViewer } from "./MediaViewer";
import { MediaSidebar } from "./MediaSidebar";
import { RelatedMedia } from "./RelatedMedia";
import { ShareModal } from "./ShareModal";
import { CollectionModal } from "./CollectionModal";

interface MediaPreviewPageProps {
  media: MediaItem;
  relatedMedia: MediaItem[];
  onDownload: (size: string) => void;
  onFollow: () => void;
  onShare: (platform: string) => void;
  onAddToCollection: (collectionId: string) => void;
  onFavorite: () => void;
}

export function MediaPreviewPage({
  media,
  relatedMedia,
  onDownload,
  onFollow,
  onShare,
  onAddToCollection,
  onFavorite,
}: MediaPreviewPageProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <PreviewHeader media={media} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <MediaViewer media={media} />
            </div>

            {/* Future Comments Section */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Comments will be available soon.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MediaSidebar
              media={media}
              onDownload={onDownload}
              onShare={() => setIsShareModalOpen(true)}
              onAddToCollection={() => setIsCollectionModalOpen(true)}
              onFavorite={onFavorite}
              onFollow={onFollow}
            />
          </div>
        </div>

        {/* Related Media */}
        <div className="mt-12">
          <RelatedMedia items={relatedMedia} />
        </div>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        media={media}
        onShare={onShare}
      />
      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        media={media}
        onAdd={onAddToCollection}
      />
    </div>
  );
}
