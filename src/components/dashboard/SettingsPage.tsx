import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "account", name: "Account", icon: "⚙️" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-1 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={user?.imageUrl}
                      alt={user?.fullName || "User"}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1.5 text-white hover:bg-blue-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    defaultValue={user?.firstName || ""}
                  />
                  <Input
                    label="Last Name"
                    defaultValue={user?.lastName || ""}
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Tell us about yourself..."
                    defaultValue="OpenLens community member passionate about visual storytelling."
                  />
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Account Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Download Your Data
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Export all your data from OpenLens
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Privacy Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Profile Visibility
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Show Download Count
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Display download statistics on your media
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive email updates about your account
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Download Notifications
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified when someone downloads your media
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}