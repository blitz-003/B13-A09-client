"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"; // Clean, fixed client instance import

// Clean, single-line vector graphics utilizing custom orange brand mapping
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 11-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H3.75v-2.25A2.25 2.25 0 016 18h2.25v-2.25h2.25l2.818-2.818a1.5 1.5 0 00.43-1.563 6 6 0 016.052-6.119z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="mr-2 h-4 w-4 shrink-0"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="google"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    />
  </svg>
);

export default function LoginPortal() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleStandardLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please supply valid inputs for both credential fields.");
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      // Execute standard credential authorization pipeline
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Identity confirmed! Redirecting to workspace... 🎉");
        router.push("/");
        router.refresh(); // Syncs active route permissions state immediately
      }

      if (error) {
        toast.error(
          error.message || "Authentication rejected. Invalid credentials.",
        );
      }
    } catch (err) {
      toast.error("An infrastructure tracking index exception occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsProcessing(true);
    try {
      // Direct user authorization routing to Google authentication microservice
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirect fallback land location post authentication completion
      });
    } catch (err) {
      toast.error("Google authentication channel communication failure.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 w-full min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/40">
            <LockIcon />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
            Access Portal
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px]">
            Log in to manage your active ideas and track community validation
            signatures.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 bg-card dark:border-zinc-800 shadow-sm flex flex-col gap-4">
          {/* TRADITIONAL FORM SECTOR */}
          <form
            onSubmit={handleStandardLoginSubmit}
            className="flex flex-col gap-3.5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Mail Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <EnvelopeIcon />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="name@enterprise.com"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Access Key
                </label>
                <button
                  type="button"
                  className="text-[10px] text-zinc-400 hover:text-orange-600 transition-colors font-medium"
                  disabled={isProcessing}
                  onClick={() =>
                    toast.info("Password restoration workflow is UI-only.")
                  }
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <KeyIcon />
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 h-10 text-xs font-semibold tracking-wide w-full mt-1.5"
              disabled={isProcessing}
            >
              {isProcessing ? "Authorizing Identity..." : "Sign In"}
            </Button>
          </form>

          {/* VISUAL SEPARATOR */}
          <div className="relative my-1">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-card px-2 text-zinc-300 dark:text-zinc-600">
                Or
              </span>
            </div>
          </div>

          {/* GOOGLE AUTH AT THE BOTTOM */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-10 text-xs font-semibold tracking-wide border-zinc-200 bg-background hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            disabled={isProcessing}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="text-center text-xs">
          <span className="text-zinc-400">New to the discovery hub? </span>
          <Link
            href="/register"
            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 font-bold underline transition-colors"
          >
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
}
