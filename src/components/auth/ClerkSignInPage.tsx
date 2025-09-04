import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export function ClerkSignInPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Button
          variant="ghost"
          className="absolute -top-16 left-0"
          onClick={() => navigate("/")}
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Button>
        
        <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-900/80">
          <SignIn 
            routing="path" 
            path="/login"
            signUpUrl="/register"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                card: "bg-transparent shadow-none",
                headerTitle: "text-gray-900 dark:text-white",
                headerSubtitle: "text-gray-600 dark:text-gray-400",
                socialButtonsBlockButton: 
                  "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                formFieldLabel: "text-gray-700 dark:text-gray-300",
                formFieldInput: 
                  "border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white",
                footerActionLink: "text-blue-600 hover:text-blue-500 dark:text-blue-400",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}