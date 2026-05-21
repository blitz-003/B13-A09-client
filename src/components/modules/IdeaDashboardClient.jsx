"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function IdeaDashboardClient({ initialProjects }) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const [projects, setProjects] = React.useState(initialProjects);
  const [isProcessingAction, setIsProcessingAction] = React.useState(false);

  // Modal display states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);

  // Comprehensive Form states matching add-idea
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("");
  const [estimatedBudget, setEstimatedBudget] = React.useState("");
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");

  // Open update modal and populate form fields
  const triggerUpdateModalOpen = (project) => {
    setSelectedProject(project);
    setTitle(project.title || "");
    setCategory(project.category || "");
    setShortDescription(project.shortDescription || "");
    setTargetAudience(project.targetAudience || "");
    setEstimatedBudget(project.estimatedBudget || "");
    setProblem(project.problem || "");
    setSolution(project.solution || "");
    setIsUpdateModalOpen(true);
  };

  const handleExecuteUpdate = async (e) => {
    e.preventDefault();
    setIsProcessingAction(true);

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${BACKEND_URL}/ideas/${selectedProject._id}`, {
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
      if (!res.ok) throw new Error(data.error || "Modification failed.");

      // Refresh local state instantly
      setProjects((prev) =>
        prev.map((p) =>
          p._id === selectedProject._id
            ? {
                ...p,
                title,
                category,
                shortDescription,
                targetAudience,
                estimatedBudget,
                problem,
                solution,
              }
            : p,
        ),
      );

      setIsUpdateModalOpen(false);
      toast.success("Concept parameters successfully updated.");
    } catch (err) {
      toast.error(err.message || "Failed to commit parameters updates.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Open delete modal
  const triggerDeleteModalOpen = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleExecuteDelete = async () => {
    setIsProcessingAction(true);
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${BACKEND_URL}/ideas/${selectedProject._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed.");

      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id));
      setIsDeleteModalOpen(false);
      toast.success("Idea permanently unindexed.");
    } catch (err) {
      toast.error(err.message || "Unable to unindex tracking target.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-xl text-zinc-400 text-xs mt-4">
        No concepts currently cataloged inside your account scope.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-5 rounded-xl border border-zinc-200 bg-card dark:border-zinc-800 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded self-start dark:bg-orange-950/20 dark:text-orange-400">
                {project.category}
              </span>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mt-1">
                {project.title}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3 flex items-center justify-between text-[11px] font-bold">
              <button
                onClick={() => triggerUpdateModalOpen(project)}
                className="text-orange-600 hover:underline inline-flex items-center gap-1"
              >
                Modify Idea Details →
              </button>
              <button
                onClick={() => triggerDeleteModalOpen(project)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL 1: FULL MODIFICATION REGISTRY (ALL FIELDS) --- */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl p-6 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Modify Idea Parameters
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Update system elements matching core collection frameworks.
              </p>
            </div>

            <form
              onSubmit={handleExecuteUpdate}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Concept Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isProcessingAction}
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
                    disabled={isProcessingAction}
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
                    disabled={isProcessingAction}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Estimated Budget
                  </label>
                  <Input
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    disabled={isProcessingAction}
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
                  disabled={isProcessingAction}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Identified Problem
                </label>
                <Textarea
                  className="min-h-[70px]"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  required
                  disabled={isProcessingAction}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Proposed Solution
                </label>
                <Textarea
                  className="min-h-[70px]"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  required
                  disabled={isProcessingAction}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => setIsUpdateModalOpen(false)}
                  disabled={isProcessingAction}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 text-xs px-4"
                  disabled={isProcessingAction}
                >
                  {isProcessingAction ? "Saving..." : "Commit Update Package"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: DELETE CONFIRMATION --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm p-6 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Confirm Concept Unindexing
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Are you sure you want to drop{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {selectedProject?.title}
              </strong>
              ? This deletion is permanent.
            </p>
            <div className="flex items-center justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isProcessingAction}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-500 text-xs px-4"
                onClick={handleExecuteDelete}
                disabled={isProcessingAction}
              >
                {isProcessingAction ? "Dropping..." : "Confirm Deletion"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
