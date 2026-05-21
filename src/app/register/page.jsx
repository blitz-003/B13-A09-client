"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Clean, single-line vector graphics utilizing custom orange brand mapping
const UserPlusIcon = () => (
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
      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235A10.136 10.136 0 019.75 18a10.136 10.136 0 015.75 1.235M4 19.235v-.19c0-1.637 1.05-3.082 2.625-3.568A13.738 13.738 0 019.75 15c1.884 0 3.687.378 5.334 1.06 1.574.486 2.624 1.932 2.624 3.569v.19M4 19.235A10.132 10.132 0 009.75 21c2.148 0 4.148-.667 5.795-1.765"
    />
  </svg>
);

const UserIcon = () => (
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
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const ImageIcon = () => (
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
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375’ .375 0 11-.75 0 .375 .375 0 01.75 0z"
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

export default function SignupPortal() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Registration data matrix hooks
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Validation feedback tracking states
  const validationCheckpoints = React.useMemo(() => {
    return {
      hasMinLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
    };
  }, [password]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !photoUrl || !password) {
      toast.error("Please provide missing registration parameters.");
      return;
    }

    // Explicit checkpoint validation validation guard loops
    if (
      !validationCheckpoints.hasMinLength ||
      !validationCheckpoints.hasUppercase ||
      !validationCheckpoints.hasLowercase
    ) {
      toast.error("Password complexity requirements not fully met.");
      return;
    }

    setIsProcessing(true);

    try {
      // Direct pipeline latency index simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Account container established successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("An infrastructure tracking index exception occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 w-full min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/40">
            <UserPlusIcon />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
            Establish Account
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px]">
            Generate a unique system identity record to launch and manage
            validation signals.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 bg-card dark:border-zinc-800 shadow-sm">
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3.5">
            {/* FULL NAME INPUT FIELD */}
            <div className="flex flex-col gap-1.2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Full Display Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <UserIcon />
                </div>
                <Input
                  type="text"
                  placeholder="e.g., Alex Rivers"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL INPUT FIELD */}
            <div className="flex flex-col gap-1.2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Electronic Mail Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <EnvelopeIcon />
                </div>
                <Input
                  type="email"
                  placeholder="name@enterprise.com"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* AVATAR PHOTO URL INPUT FIELD */}
            <div className="flex flex-col gap-1.2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Profile Image URL
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ImageIcon />
                </div>
                <Input
                  type="url"
                  placeholder="https://images.unsplash.com/.../avatar.jpg"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
            </div>

            {/* COMPLEXITY VALIDATED PASSWORD INPUT FIELD */}
            <div className="flex flex-col gap-1.2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Access Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <KeyIcon />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-10 pl-9 border-zinc-200 bg-background text-xs dark:border-zinc-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* REAL-TIME VALIDATION COMPLIANCE MAP PANEL */}
              {password.length > 0 && (
                <div className="mt-2 p-2.5 rounded-lg border border-zinc-100 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/40 flex flex-col gap-1 text-[10px] font-medium text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={
                        validationCheckpoints.hasMinLength
                          ? "text-orange-600 font-bold"
                          : "text-zinc-300"
                      }
                    >
                      {validationCheckpoints.hasMinLength ? "✓" : "○"}
                    </span>
                    <span
                      className={
                        validationCheckpoints.hasMinLength
                          ? "text-zinc-700 dark:text-zinc-300"
                          : ""
                      }
                    >
                      Minimum 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={
                        validationCheckpoints.hasUppercase
                          ? "text-orange-600 font-bold"
                          : "text-zinc-300"
                      }
                    >
                      {validationCheckpoints.hasUppercase ? "✓" : "○"}
                    </span>
                    <span
                      className={
                        validationCheckpoints.hasUppercase
                          ? "text-zinc-700 dark:text-zinc-300"
                          : ""
                      }
                    >
                      At least one uppercase character (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={
                        validationCheckpoints.hasLowercase
                          ? "text-orange-600 font-bold"
                          : "text-zinc-300"
                      }
                    >
                      {validationCheckpoints.hasLowercase ? "✓" : "○"}
                    </span>
                    <span
                      className={
                        validationCheckpoints.hasLowercase
                          ? "text-zinc-700 dark:text-zinc-300"
                          : ""
                      }
                    >
                      At least one lowercase character (a-z)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 h-10 text-xs font-semibold tracking-wide w-full mt-2"
              disabled={isProcessing}
            >
              {isProcessing ? "Creating Profile..." : "Register Account"}
            </Button>
          </form>
        </div>

        <div className="text-center text-xs">
          <span className="text-zinc-400">
            Already running validation tracks?{" "}
          </span>
          <Link
            href="/login"
            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 font-bold underline transition-colors"
          >
            Pass Credential Logs
          </Link>
        </div>
      </div>
    </div>
  );
}
