import { useState, useEffect } from "react";
import { UploadFile, LICENSE_INFO, MOCK_COLLECTIONS } from "../../types/upload";
import { TagInput } from "../ui/TagInput";
import { Input } from "../ui/Input";
import { Category, defaultCategories } from "../../types/categories";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface FileUploadCardProps {
  file: UploadFile;
  onUpdate: (id: string, metadata: Partial<UploadFile["metadata"]>) => void;
  onRemove: (id: string) => void;
}

export function FileUploadCard({
  file,
  onUpdate,
  onRemove,
}: FileUploadCardProps) {
  const [showLicenseTooltip, setShowLicenseTooltip] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Preview */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {file.file.type.startsWith("video/") ? (
          <video
            src={file.preview}
            className="h-full w-full object-cover rounded-t-xl"
            controls
            muted
          />
        ) : (
          <img
            src={file.preview}
            alt={file.metadata.title || file.file.name}
            className="h-full w-full object-cover rounded-t-xl"
          />
        )}

        {/* Progress Overlay */}
        {file.status === "uploading" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-t-xl"
          >
            <div className="w-2/3 space-y-2">
              <div className="h-3 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                <motion.div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${file.progress}%` }}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <p className="text-center text-sm font-medium text-white">
                Uploading... {file.progress}%
              </p>
            </div>
          </motion.div>
        )}

        {/* Success/Error Overlay */}
        {(file.status === "success" || file.status === "error") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute inset-0 flex items-center justify-center ${
              file.status === "success"
                ? "bg-green-500/80"
                : "bg-red-500/80"
            } backdrop-blur-sm rounded-t-xl`}
          >
            {file.status === "success" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <svg
                  className="h-16 w-16 text-white mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-white font-medium">Upload Complete!</p>
              </motion.div>
            ) : (
              <div className="text-center text-white">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2 font-medium">{file.error}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Remove Button */}
        <button
          onClick={() => onRemove(file.id)}
          className="absolute right-3 top-3 rounded-full bg-red-500/80 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-red-600"
        >
          <svg
            className="h-5 w-5"
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
      </div>

      {/* Metadata Form */}
      <div className="space-y-6 p-6">
        <Input
          label="Title"
          value={file.metadata.title}
          onChange={(e) => onUpdate(file.id, { title: e.target.value })}
          placeholder="Give your media a compelling title..."
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={file.metadata.description}
            onChange={(e) =>
              onUpdate(file.id, { description: e.target.value })
            }
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Describe your media, its story, or technical details..."
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <div className="grid grid-cols-1 gap-4">
            <select
              value={file.metadata.category}
              onChange={(e) => {
                const newCategory = e.target.value;
                onUpdate(file.id, { 
                  category: newCategory,
                  subcategory: "" // Reset subcategory when category changes
                });
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Category</option>
              {defaultCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {file.metadata.category === 'other' ? (
              <div>
                <Input
                  label="Custom Category"
                  value={file.metadata.customCategory || ''}
                  onChange={(e) => {
                    const customCategory = e.target.value;
                    // Check if category already exists
                    const exists = defaultCategories.some(
                      cat => cat.name.toLowerCase() === customCategory.toLowerCase()
                    );
                    
                    if (exists) {
                      toast.error(`Category "${customCategory}" already exists!`);
                      return;
                    }
                    
                    onUpdate(file.id, { 
                      customCategory,
                      subcategory: "" 
                    });
                  }}
                  placeholder="Enter a new category name..."
                />
              </div>
            ) : file.metadata.category ? (
              <select
                value={file.metadata.subcategory || ""}
                onChange={(e) => onUpdate(file.id, { subcategory: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Subcategory</option>
                {defaultCategories
                  .find(cat => cat.id === file.metadata.category)
                  ?.subcategories.map(sub => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))
                }
              </select>
            ) : null}
          </div>
        </div>

        {/* Collection Assignment */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Add to Collection (Optional)
          </label>
          <select
            value={file.metadata.collectionId || ""}
            onChange={(e) => onUpdate(file.id, { collectionId: e.target.value || undefined })}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:border-blue-400"
          >
            <option value="">No Collection</option>
            {MOCK_COLLECTIONS.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name} ({collection.itemCount} items)
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            📁 Organize your media by adding it to a collection
          </p>
        </div>

        {/* License Selection */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            License *
            <button
              type="button"
              onMouseEnter={() => setShowLicenseTooltip(true)}
              onMouseLeave={() => setShowLicenseTooltip(false)}
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </button>
          </label>
          
          {showLicenseTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 z-10 mt-2 w-80 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg"
            >
              <p className="font-medium mb-1">License Information</p>
              <p>Choose how others can use your content. Each license has different permissions and requirements.</p>
              <div className="mt-1 h-2 w-2 bg-gray-900 transform rotate-45 absolute -top-1 left-4"></div>
            </motion.div>
          )}
          
          <select
            value={file.metadata.license}
            onChange={(e) =>
              onUpdate(file.id, { license: e.target.value as any })
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:border-blue-400"
          >
            {Object.entries(LICENSE_INFO).map(([license, info]) => (
              <option key={license} value={license} title={info.description}>
                {license}
              </option>
            ))}
          </select>
          <motion.p 
            key={file.metadata.license}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {LICENSE_INFO[file.metadata.license].description}
          </motion.p>
        </div>

        <TagInput
          label="Tags (Recommended)"
          tags={file.metadata.tags}
          onChange={(tags) => onUpdate(file.id, { tags })}
          suggestions={[
            "nature",
            "urban",
            "technology",
            "people",
            "abstract",
            "landscape",
            "portrait",
            "wildlife",
            "architecture",
            "street",
            "macro",
            "minimalist",
          ]}
        />
      </div>
    </motion.div>
  );
}
