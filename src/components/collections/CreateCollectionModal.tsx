import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCollectionModal({
  isOpen,
  onClose,
}: CreateCollectionModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
      }
    },
  });

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Collection created successfully!");
    
    // Reset form
    setName("");
    setDescription("");
    setIsPublic(false);
    setCoverImage(null);
    setCoverPreview("");
    setIsLoading(false);
    
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      setName("");
      setDescription("");
      setIsPublic(false);
      setCoverImage(null);
      setCoverPreview("");
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all dark:bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Create New Collection
                  </Dialog.Title>
                  {!isLoading && (
                    <button
                      onClick={handleClose}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Cover Image
                    </label>
                    <div
                      {...getRootProps()}
                      className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200 ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                          : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {coverPreview ? (
                        <div className="relative aspect-[3/2]">
                          <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <div className="text-center text-white">
                              <UploadIcon className="h-8 w-8 mx-auto mb-2" />
                              <p className="text-sm font-medium">Change Image</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex aspect-[3/2] flex-col items-center justify-center p-8">
                          <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                            <UploadIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                          </div>
                          <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                            {isDragActive ? "Drop your image here" : "Upload cover image"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, WebP up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collection Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Collection Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Enter collection name"
                      maxLength={50}
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Choose a descriptive name for your collection</span>
                      <span>{name.length}/50</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 resize-none"
                      placeholder="Describe your collection (optional)"
                      maxLength={200}
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Help others understand what this collection is about</span>
                      <span>{description.length}/200</span>
                    </div>
                  </div>

                  {/* Privacy Toggle */}
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                        {isPublic ? (
                          <GlobeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <LockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {isPublic ? "Public Collection" : "Private Collection"}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isPublic
                            ? "Anyone can view and discover this collection"
                            : "Only you can view this collection"}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setIsPublic(!isPublic)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isPublic ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        animate={{ x: isPublic ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!name.trim() || isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Creating...
                      </div>
                    ) : (
                      "Create Collection"
                    )}
                  </motion.button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function UploadIcon({ className }: { className?: string }) {
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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
        d="M6 18L18 6M6 6l12 12"
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