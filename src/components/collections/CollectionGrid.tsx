import { Collection } from "../../types/dashboard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CollectionGridProps {
  collections: Collection[];
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleEdit = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    // Handle edit functionality
    console.log("Edit collection:", collectionId);
  };

  const handleShare = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    // Handle share functionality
    console.log("Share collection:", collectionId);
  };

  const handleDelete = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    // Handle delete functionality
    console.log("Delete collection:", collectionId);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {collections.map((collection) => (
        <motion.div
          key={collection.id}
          variants={item}
          whileHover={{ y: -8, scale: 1.02 }}
          onHoverStart={() => setHoveredId(collection.id)}
          onHoverEnd={() => setHoveredId(null)}
          onClick={() => navigate(`/collections/${collection.id}`)}
          className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-gray-800"
        >
          {/* Cover Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={collection.cover}
              alt={collection.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay with actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === collection.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            >
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleEdit(e, collection.id)}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <EditIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleShare(e, collection.id)}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <ShareIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleDelete(e, collection.id)}
                  className="rounded-full bg-red-500/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-500/30"
                >
                  <TrashIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Item count badge */}
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {collection.itemCount} items
              </span>
            </div>

            {/* Privacy badge */}
            <div className="absolute right-4 top-4">
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                  collection.isPublic
                    ? "bg-green-500/20 text-green-100 border border-green-500/30"
                    : "bg-orange-500/20 text-orange-100 border border-orange-500/30"
                }`}
              >
                {collection.isPublic ? (
                  <div className="flex items-center gap-1">
                    <GlobeIcon className="h-3 w-3" />
                    Public
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <LockIcon className="h-3 w-3" />
                    Private
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Collection Info */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {collection.name}
              </h3>
              {collection.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {collection.description}
                </p>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {new Date(collection.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <motion.div
                animate={{ x: hoveredId === collection.id ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center text-blue-500"
              >
                <span className="text-sm font-medium">View</span>
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredId === collection.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function EditIcon({ className }: { className?: string }) {
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
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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

function TrashIcon({ className }: { className?: string }) {
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
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
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
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
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
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}