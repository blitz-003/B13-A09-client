"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// Clean, single-line vector graphics utilizing custom orange brand mapping
const SparklesIcon = () => (
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
      d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM18 7.5l-.563 2.25L15 10.313l2.438.562.562 2.25.563-2.25 2.437-.563-2.438-.562L18 7.5z"
    />
  </svg>
);

const TargetIcon = () => (
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
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>
);

const DollarIcon = () => (
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
      d="M12 6v12m-3-2.818l.818.114M15 10a2 2 0 11-4 0 2 2 0 014 0zm-5 4a2 2 0 104 0 2 2 0 00-4 0z"
    />
  </svg>
);

const CATEGORIES = ["AI & Tech", "Finance", "Healthcare", "Marketing"];

export default function AddIdeaForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form states tracking
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("");
  const [estimatedBudget, setEstimatedBudget] = React.useState("");
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [image, setImage] = React.useState(""); // <-- Track Image URL asset string

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // 1. Field safety validations
    if (
      !title ||
      !category ||
      !shortDescription ||
      !targetAudience ||
      !problem ||
      !solution
    ) {
      toast.error("Please fill out all required validation modules.");
      return;
    }

    setIsSubmitting(true);

    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      // 2. Fetch the secure JWT token from your auth client
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Authentication session missing. Please log back in.");
        setIsSubmitting(false);
        return;
      }

      // 3. Construct payload matching your backend expectations
      const ideaData = {
        title,
        category,
        shortDescription,
        targetAudience,
        estimatedBudget: estimatedBudget || "N/A",
        problem,
        solution,
        image: image.trim(), // <-- Append image variable clean of structural spaces
      };

      // 4. Dispatch the actual network request
      const res = await fetch(`${BACKEND_URL}/add-idea`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(ideaData),
      });

      const responseData = await res.json();

      // 5. Explicitly verify the server's HTTP status response before celebrating
      if (!res.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "Failed to secure database clearance.",
        );
      }

      // 6. Execution successful
      toast.success("Concept successfully queued for tracking!");
      router.push("/ideas");
      router.refresh();
    } catch (err) {
      console.error("Submission Pipeline Interruption:", err);
      toast.error(
        err.message || "An infrastructure error occurred during indexing.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 flex flex-col gap-8">
      {/* PAGE TITLES PROFILE */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Submit Product Concept
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Outline your startup core thesis transparently to gather market intent
          signals from the community.
        </p>
      </div>

      <form onSubmit={handleFormSubmission} className="flex flex-col gap-8">
        {/* SECTION 1: IDENTITY METADATA */}
        <div className="p-6 rounded-xl border border-zinc-200/80 bg-zinc-50/30 dark:border-zinc-800 dark:bg-zinc-900/10 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <SparklesIcon />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Core Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Concept Title *
              </label>
              <Input
                placeholder="e.g., AI micro-SaaS Validation Framework"
                className="h-10 border-zinc-200 bg-background dark:border-zinc-800 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Category Scope *
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 border-zinc-200 bg-background text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 justify-between text-xs font-medium w-full"
                  >
                    <span>{category || "Select Category"}</span>
                    <span className="text-zinc-400 text-[10px]">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuRadioGroup
                    value={category}
                    onValueChange={setCategory}
                  >
                    {CATEGORIES.map((cat) => (
                      <DropdownMenuRadioItem
                        key={cat}
                        value={cat}
                        className="cursor-pointer text-xs"
                      >
                        {cat}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Short Pitch Summary *
              </label>
              <span className="text-[10px] text-zinc-400 font-medium">
                {shortDescription.length} / 120
              </span>
            </div>
            <Input
              placeholder="A one-sentence delivery statement describing the automation value..."
              className="h-10 border-zinc-200 bg-background dark:border-zinc-800 text-sm"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={120}
            />
          </div>

          {/* --- NEW OPTIONAL IMAGE URL FIELD --- */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Concept Cover Image URL
              </label>
              <span className="text-[10px] text-zinc-400 font-medium">
                (Optional)
              </span>
            </div>
            <Input
              type="url"
              placeholder="e.g., https://images.unsplash.com/photo-... or custom storage CDN link"
              className="h-10 border-zinc-200 bg-background dark:border-zinc-800 text-sm"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        {/* SECTION 2: POSITIONING PARAMETERS */}
        <div className="p-6 rounded-xl border border-zinc-200/80 bg-zinc-50/30 dark:border-zinc-800 dark:bg-zinc-900/10 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <TargetIcon />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Market Fit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Target Audience Profile *
              </label>
              <Input
                placeholder="e.g., Solo Builders & Indie Operators"
                className="h-10 border-zinc-200 bg-background dark:border-zinc-800 text-sm"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Estimated Launch Capital
                </label>
                <span className="text-[10px] text-zinc-400 font-medium">
                  (Optional)
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none scale-90">
                  <DollarIcon />
                </div>
                <Input
                  placeholder="e.g., $200 - $500"
                  className="h-10 pl-9 border-zinc-200 bg-background dark:border-zinc-800 text-sm"
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THESIS PROPOSITION */}
        <div className="p-6 rounded-xl border border-zinc-200/80 bg-zinc-50/30 dark:border-zinc-800 dark:bg-zinc-900/10 flex flex-col gap-5">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Operational Deep-Dive
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              The Problem Vector *
            </label>
            <Textarea
              placeholder="Describe the exact bottleneck or loss vector your audience deals with daily..."
              className="min-h-[110px] border-zinc-200 bg-background dark:border-zinc-800 text-sm focus-visible:ring-zinc-400"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              The Mechanical Solution *
            </label>
            <Textarea
              placeholder="Explain how your software architecture or product loops address this issue explicitly..."
              className="min-h-[110px] border-zinc-200 bg-background dark:border-zinc-800 text-sm focus-visible:ring-zinc-400"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>
        </div>

        {/* SUBMISSION INTERACTION BAR */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/ideas")}
            className="text-xs font-semibold h-10 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 px-6 h-10 text-xs font-semibold tracking-wide"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Indexing Profile..." : "Publish Concept"}
          </Button>
        </div>
      </form>
    </div>
  );
}
