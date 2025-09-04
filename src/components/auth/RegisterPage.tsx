import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { RegisterFormData, registerSchema } from "../lib/validation";
import { useState } from "react";

function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = () => {
    let score = 0;
    if (!password) return score;

    // Award points for length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Award points for complexity
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength();
  const width = `${(strength / 6) * 100}%`;
  
  return (
    <div className="mt-1">
      <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-1 rounded-full transition-all duration-300"
          style={{
            width,
            backgroundColor: [
              "transparent",
              "#ef4444",
              "#f97316",
              "#eab308",
              "#22c55e",
              "#22c55e",
              "#22c55e",
            ][strength],
          }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {[
          "Enter password",
          "Very weak",
          "Weak",
          "Medium",
          "Strong",
          "Very strong",
          "Very strong",
        ][strength]}
      </p>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Successfully registered!");
      console.log(data);
      // Redirect to dashboard after successful registration
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-900/80">
        <Button
          variant="ghost"
          className="absolute left-4 top-4"
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
          Back
        </Button>
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div>
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value),
                })}
              />
              <PasswordStrengthIndicator password={password} />
            </div>

            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Create account
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" fullWidth>
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.684,1.887-2.256,3.276-4.218,3.276c-2.607,0-4.729-2.122-4.729-4.729s2.122-4.729,4.729-4.729c1.152,0,2.205,0.418,3.018,1.109l2.157-2.157C17.062,5.773,14.299,4.5,12,4.5C7.313,4.5,3.5,8.313,3.5,13c0,4.687,3.813,8.5,8.5,8.5c4.687,0,8.5-3.813,8.5-8.5v-1.5h-9.364C12.545,11.5,12.545,12.151,12.545,12.151z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" fullWidth>
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
