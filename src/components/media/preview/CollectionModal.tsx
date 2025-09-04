import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MediaItem } from "../../../types/media";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem;
  onAdd: (collectionId: string) => void;
}

export function CollectionModal({
  isOpen,
  onClose,
  media,
  onAdd,
}: CollectionModalProps) {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  // Mock collections - replace with actual data
  const collections = [
    { id: "1", name: "Favorites", count: 12, cover: "/placeholder.jpg" },
    { id: "2", name: "Nature", count: 45, cover: "/placeholder.jpg" },
    { id: "3", name: "Architecture", count: 28, cover: "/placeholder.jpg" },
  ];

  const handleSubmit = () => {
    if (showCreateNew && newCollectionName) {
      // Here you would create a new collection and get its ID
      const newCollectionId = "new-collection";
      onAdd(newCollectionId);
    } else if (selectedCollection) {
      onAdd(selectedCollection);
    }
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-800">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                  Save to Collection
                </Dialog.Title>

                <div className="mt-4">
                  {!showCreateNew ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        {collections.map((collection) => (
                          <button
                            key={collection.id}
                            onClick={() => setSelectedCollection(collection.id)}
                            className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all ${
                              selectedCollection === collection.id
                                ? "border-blue-500"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                              <img
                                src={collection.cover}
                                alt={collection.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="mt-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {collection.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {collection.count} items
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowCreateNew(true)}
                        className="mt-4 flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                      >
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Create New Collection
                      </button>
                    </>
                  ) : (
                    <div>
                      <label
                        htmlFor="collection-name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Collection Name
                      </label>
                      <input
                        type="text"
                        id="collection-name"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter collection name"
                      />
                      <button
                        onClick={() => setShowCreateNew(false)}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={onClose}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedCollection && !newCollectionName}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function PlusIcon({ className }: { className?: string }) {
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}
