import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UploadFile, FileMetadata, SUPPORTED_FORMATS } from "../../types/upload";
import { FileUploadCard } from "./FileUploadCard";
import { Upload, CheckCircle, AlertCircle, X, Sparkles } from "lucide-react";

export function MediaUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach((file) => {
      if (file.errors[0]?.code === "file-too-large") {
        toast.error(`${file.file.name} is too large. Maximum size is 50MB.`);
      } else if (file.errors[0]?.code === "file-invalid-type") {
        toast.error(`${file.file.name} is not a supported file type.`);
      }
    });

    // Process accepted files
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "pending",
      metadata: {
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        description: "",
        tags: [],
        license: "CC0",
        category: "",
        subcategory: "",
        customCategory: "",
        collectionId: "",
      },
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} file(s) added successfully!`);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      ...SUPPORTED_FORMATS.image.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
      ...SUPPORTED_FORMATS.video.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  const updateFileMetadata = (id: string, metadata: Partial<FileMetadata>) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, metadata: { ...file.metadata, ...metadata } }
          : file
      )
    );
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
    toast.success("File removed successfully");
  };

  const clearAllFiles = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    toast.success("All files cleared");
  };

  const simulateUpload = async (file: UploadFile) => {
    const updateProgress = (progress: number) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, progress, status: progress === 100 ? "success" : "uploading" }
            : f
        )
      );
    };

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += Math.random() * 15) {
        await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));
        updateProgress(Math.min(progress, 100));
      }

      // Small chance of failure for demo
      if (Math.random() < 0.1) {
        throw new Error("Upload failed");
      }

      updateProgress(100);
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: "error", error: "Upload failed. Please try again." }
            : f
        )
      );
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    // Validate required fields
    const invalidFiles = files.filter(
      (file) => !file.metadata.title || !file.metadata.category
    );

    if (invalidFiles.length > 0) {
      toast.error("Please fill in title and category for all files");
      return;
    }

    setIsUploading(true);

    try {
      // Upload all files concurrently
      await Promise.all(files.map(simulateUpload));

      // Show success animation
      setShowSuccess(true);
      toast.success("All files uploaded successfully!");

      // Auto-navigate after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Some uploads failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadStats = {
    total: files.length,
    uploaded: files.filter((f) => f.status === "success").length,
    inProgress: files.filter((f) => f.status === "uploading").length,
    failed: files.filter((f) => f.status === "error").length,
  };

  const canUpload = files.length > 0 && !isUploading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Share Your Creative Vision
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Upload Your Media
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share your photos and videos with the world. Add rich metadata to help others discover your work.
          </p>
        </motion.div>

        {/* Upload Statistics */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {uploadStats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Files</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-green-600">
                {uploadStats.uploaded}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uploaded</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">
                {uploadStats.inProgress}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-red-600">
                {uploadStats.failed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
            </div>
          </motion.div>
        )}

        {/* Drag & Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
              isDragActive
                ? isDragReject
                  ? "border-red-400 bg-red-50/50 dark:bg-red-900/20 scale-105"
                  : "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 scale-105 rotate-1"
                : "border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 hover:scale-102"
            }`}
          >
            <input {...getInputProps()} />
            
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-8 left-8 w-8 h-8 bg-blue-400/20 rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-16 right-12 w-6 h-6 bg-purple-400/20 rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute bottom-12 left-16 w-4 h-4 bg-indigo-400/20 rounded-full blur-sm"
              />
            </div>

            <div className="relative p-12 text-center">
              <motion.div
                animate={isDragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Upload className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isDragActive
                  ? isDragReject
                    ? "Invalid file type"
                    : "Drop your files here"
                  : "Drag & drop your media files"}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {isDragActive
                  ? isDragReject
                    ? "Please upload images or videos only"
                    : "Release to add your files"
                  : "Or click to browse and select multiple files"}
              </p>

              {/* Supported Formats */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["JPG", "PNG", "GIF", "WebP", "MP4", "WebM"].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-white/20"
                  >
                    {format}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Maximum file size: 50MB per file
              </p>
            </div>
          </div>
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Files to Upload ({files.length})
                </h2>
                <button
                  onClick={clearAllFiles}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FileUploadCard
                      file={file}
                      onUpdate={updateFileMetadata}
                      onRemove={removeFile}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="sticky bottom-8 z-10"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ready to upload {files.length} file{files.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Make sure all required fields are filled
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: canUpload ? 1.05 : 1 }}
                    whileTap={{ scale: canUpload ? 0.95 : 1 }}
                    onClick={handleUpload}
                    disabled={!canUpload}
                    className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                      canUpload
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/25"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isUploading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear",
                        }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {isUploading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Upload All Files
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Upload Successful! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your media has been uploaded successfully. Redirecting to dashboard...
                </p>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}