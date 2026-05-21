"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function EditIdeaFormView() {
  const params = useParams();
  const router = useRouter();
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  // Core data states matching all fields from "add-idea"
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("");
  const [estimatedBudget, setEstimatedBudget] = React.useState("");
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");

  // Retrieve the existing values when the page mounts
  React.useEffect(() => {
    async function fetchRecord() {
      try {
        const { data: tokenData } = await authClient.token();

        // Passing token here protects the endpoint from random scraping
        const res = await fetch(`${BACKEND_URL}/ideas/${params.id}`, {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        });

        if (!res.ok) throw new Error("Target concept could not be found.");

        const data = await res.json();

        // Hydrate local layout configurations
        setTitle(data.title || "");
        setCategory(data.category || "");
        setShortDescription(data.shortDescription || "");
        setTargetAudience(data.targetAudience || "");
        setEstimatedBudget(data.estimatedBudget || "");
        setProblem(data.problem || "");
        setSolution(data.solution || "");
      } catch (err) {
        toast.error("Error fetching project record attributes.");
        router.push("/my-ideas");
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) fetchRecord();
  }, [params.id, BACKEND_URL, router]);

  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${BACKEND_URL}/ideas/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          title,
          category,
          shortDescription,
          targetAudience,
          estimatedBudget,
          problem,
          solution,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Could not save updates to registry.");

      toast.success("Concept parameters updated successfully.");
      router.push("/my-ideas"); // Send back to the read list dashboard
    } catch (err) {
      toast.error(
        err.message || "An error occurred while saving updating values.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center text-xs font-mono text-zinc-400 tracking-wider">
        Loading target schema configurations...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Modify Idea Parameters
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Refactor structural layout variables matching core dataset
          specifications.
        </p>
      </div>

      <form onSubmit={handleUpdateRecord} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Concept Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Category Tag
            </label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Target Audience
            </label>
            <Input
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Estimated Budget
            </label>
            <Input
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Short Summary Pitch
          </label>
          <Textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Identified Problem
          </label>
          <Textarea
            className="min-h-[80px]"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Proposed Solution
          </label>
          <Textarea
            className="min-h-[80px]"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => router.push("/my-ideas")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            className="text-xs px-5"
            disabled={isSaving}
          >
            {isSaving ? "Saving Configuration..." : "Commit Update Package"}
          </Button>
        </div>
      </form>
    </div>
  );
}
