import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { MediaItem, generateMockMediaItems } from "../../../types/media";
import { PreviewHeader } from "./PreviewHeader";
import { MediaViewer } from "./MediaViewer";
import { MediaSidebar } from "./MediaSidebar";
import { RelatedMedia } from "./RelatedMedia";
import { ShareModal } from "./ShareModal";
import { CollectionModal } from "./CollectionModal";

export function MediaPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [relatedMedia, setRelatedMedia] = useState<MediaItem[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock media item based on ID
      const mockItems = generateMockMediaItems(1);
      const mediaItem = {
        ...mockItems[0],
        id,
        title: `Sample Media ${id}`,
        description: `This is a detailed description for media item ${id}. It showcases beautiful content with professional quality and attention to detail.`,
      };
      
      // Generate related media
      const related = generateMockMediaItems(8);
      
      setMedia(mediaItem);
      setRelatedMedia(related);
      setLoading(false);
    };

    loadMedia();
  }, [id, navigate]);

  const handleDownload = (size: string) => {
    toast.success(`Downloading ${size} version...`);
    // Implement actual download logic
  };

  const handleFollow = () => {
    toast.success(`Following ${media?.creator.name}!`);
    // Implement follow logic
  };

  const handleShare = (platform: string) => {
    toast.success(`Shared to ${platform}!`);
    // Implement sharing logic
  };

  const handleAddToCollection = (collectionId: string) => {
    toast.success("Added to collection!");
    // Implement add to collection logic
  };

  const handleFavorite = () => {
    toast.success("Added to favorites!");
    // Implement favorite logic
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8 h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2">
                <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-800" />
              </div>
              
              {/* Sidebar Skeleton */}
              <div className="space-y-6">
                <div className="h-64 rounded-xl bg-gray-200 dark:bg-gray-800" />
                <div className="h-48 rounded-xl bg-gray-200 dark:bg-gray-800" />
                <div className="h-32 rounded-xl bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Media not found
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The media you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <PreviewHeader media={media} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <MediaViewer media={media} />
            </div>

            {/* Media Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {media.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {media.views.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {media.downloads.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {media.dimensions.width}×{media.dimensions.height}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Resolution</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {(media.fileSize / 1024 / 1024).toFixed(1)}MB
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">File Size</p>
                </div>
              </div>

              {/* EXIF Data */}
              {media.exif && (
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    Camera Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {media.exif.camera && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Camera</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.camera}
                        </p>
                      </div>
                    )}
                    {media.exif.lens && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lens</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.lens}
                        </p>
                      </div>
                    )}
                    {media.exif.focalLength && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Focal Length</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.focalLength}
                        </p>
                      </div>
                    )}
                    {media.exif.shutterSpeed && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Shutter Speed</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.shutterSpeed}
                        </p>
                      </div>
                    )}
                    {media.exif.aperture && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Aperture</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.aperture}
                        </p>
                      </div>
                    )}
                    {media.exif.iso && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ISO</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {media.exif.iso}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Comments Section Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>
              <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-12 dark:border-gray-700">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h4 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    Comments Coming Soon
                  </h4>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    We're working on adding a comment system for community interaction.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <MediaSidebar
              media={media}
              onDownload={handleDownload}
              onShare={() => setIsShareModalOpen(true)}
              onAddToCollection={() => setIsCollectionModalOpen(true)}
              onFavorite={handleFavorite}
              onFollow={handleFollow}
            />
          </motion.div>
        </div>

        {/* Related Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <RelatedMedia items={relatedMedia} />
        </motion.div>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        media={media}
        onShare={handleShare}
      />
      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        media={media}
        onAdd={handleAddToCollection}
      />
    </motion.div>
  );
}