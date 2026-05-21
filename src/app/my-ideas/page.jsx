"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ModifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-3.5 w-3.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
    />
  </svg>
);

const TrashAltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#ef4444"
    className="h-3.5 w-3.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const MOCK_OWNED_PROJECTS = [
  {
    id: "1",
    title: "AI micro-SaaS Validation Framework",
    category: "AI & Tech",
    shortDescription:
      "An automated workflow builder that scans product concept demand metrics globally in seconds.",
  },
  {
    id: "4",
    title: "Micro-Influencer Matchmaker AI",
    category: "Marketing",
    shortDescription:
      "Hyper-targeted attribution matching engine for bootstrap direct-to-consumer lifestyle brands.",
  },
];

export default function MyIdeasManagementView() {
  const [projects, setProjects] = React.useState(MOCK_OWNED_PROJECTS);

  // Modal tracking states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);

  // Form hooks inside Update Modal
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");

  const triggerUpdateModalOpen = (project) => {
    setSelectedProject(project);
    setEditTitle(project.title);
    setEditDescription(project.shortDescription);
    setIsUpdateModalOpen(true);
  };

  const handleExecuteUpdate = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editDescription.trim()) return;

    setProjects(
      projects.map((p) =>
        p.id === selectedProject.id
          ? { ...p, title: editTitle, shortDescription: editDescription }
          : p,
      ),
    );
    setIsUpdateModalOpen(false);
    toast.success("Concept metadata successfully refactored.");
  };

  const triggerDeleteModalOpen = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleExecuteDelete = () => {
    setProjects(projects.filter((p) => p.id !== selectedProject.id));
    setIsDeleteModalOpen(false);
    toast.success("Idea permanently unindexed from core registry.");
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Submissions
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage, update, or remove the product validation theses you have
          published.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        {projects.map((project) => (
          <div
            key={project.id}
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

            <div className="flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 text-[11px] font-bold">
              <button
                onClick={() => triggerUpdateModalOpen(project)}
                className="text-zinc-500 hover:text-orange-600 inline-flex items-center gap-1"
              >
                <ModifyIcon /> <span>Modify</span>
              </button>
              <span className="text-zinc-200 dark:text-zinc-800">|</span>
              <button
                onClick={() => triggerDeleteModalOpen(project)}
                className="text-zinc-500 hover:text-red-500 inline-flex items-center gap-1+"
              >
                <TrashAltIcon /> <span>Unindex</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL DIALOG CONTAINER 1: UPDATE MODULE --- */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Modify Validation Scope
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Refactor metadata configurations for verification optimization.
              </p>
            </div>
            <form
              onSubmit={handleExecuteUpdate}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Concept Title
                </label>
                <Input
                  text="text"
                  className="h-9 text-xs"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Short Summary Pitch
                </label>
                <Textarea
                  className="min-h-[70px] text-xs"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 text-xs px-4"
                >
                  Commit Refactor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG CONTAINER 2: DELETE CONFIRMATION --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm p-6 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Confirm Concept Unindexing
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Are you sure you want to drop{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {selectedProject?.title}
              </strong>
              ? This structural deletion is permanent.
            </p>
            <div className="flex items-center justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-500 text-xs px-4"
                onClick={handleExecuteDelete}
              >
                Confirm Deletion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
