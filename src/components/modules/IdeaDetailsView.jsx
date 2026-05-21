"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Static SVG assets extracted cleanly from markup flow
const ArrowLeftIcon = () => (
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
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const TrashIcon = () => (
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

const EditIcon = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);

export default function IdeaDetailsView({
  fetchedIdea,
  currentUserId,
  currentUserName,
}) {
  const router = useRouter();

  // Initialize your localized comment state array directly using the data delivered down from the server
  const [comments, setComments] = React.useState(fetchedIdea?.comments || []);
  const [newCommentText, setNewCommentText] = React.useState("");

  const [editingCommentId, setEditingCommentId] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const freshComment = {
      id: `c-${Date.now()}`,
      userId: currentUserId,
      userName: currentUserName,
      text: newCommentText.trim(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setComments([...comments, freshComment]);
    setNewCommentText("");
    toast.success("Comment indexed successfully.");
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, text: editingText.trim() } : c,
      ),
    );
    setEditingCommentId(null);
    toast.success("Comment modifications saved.");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    toast.success("Comment dropped from registry.");
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 self-start hover:underline"
      >
        <ArrowLeftIcon /> Back to Feed
      </button>

      {/* CORE INFO SHEET DROPPED DYNAMICALLY FROM SERVER INGESTION */}
      <div className="p-6 rounded-xl border border-zinc-200 bg-card dark:border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 font-medium text-[10px] uppercase tracking-wider">
            {fetchedIdea.category || "General Tech"}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono font-medium">
            DB_ID: {fetchedIdea._id}
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {fetchedIdea.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium italic">
          {fetchedIdea.shortDescription ||
            "No basic summary indexing string provided."}
        </p>

        <div className="grid grid-cols-2 gap-4 border-y border-zinc-100 dark:border-zinc-800 py-3 mt-2 text-xs">
          <div>
            <span className="text-zinc-400 block">Target Segment</span>
            <strong className="text-zinc-700 dark:text-zinc-300">
              {fetchedIdea.targetAudience || "General Public"}
            </strong>
          </div>
          <div>
            <span className="text-zinc-400 block">
              Estimated Infrastructure Cost
            </span>
            <strong className="text-zinc-700 dark:text-zinc-300">
              {fetchedIdea.estimatedBudget || "N/A"}
            </strong>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 text-xs leading-relaxed">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 mb-1">
              Problem Statement
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {fetchedIdea.problem}
            </p>
          </div>
          <div className="mt-2">
            <h3 className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 mb-1">
              Proposed Resolution Loop
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {fetchedIdea.solution}
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE WORKFLOW SUB-SYSTEM (CLIENT-SIDE STATE ENGINE) */}
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Validation Feedback Stream ({comments.length})
        </h2>

        <form onSubmit={handleAddComment} className="flex flex-col gap-3">
          <Textarea
            placeholder="Add clear analytical criticism or engineering advice regarding this concept thesis..."
            className="min-h-[80px] border-zinc-200 bg-background text-xs"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 self-end text-[11px] h-8 px-4 font-semibold"
          >
            Post Feedback
          </Button>
        </form>

        <div className="flex flex-col gap-3 mt-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/40 dark:border-zinc-800/60 dark:bg-zinc-900/10 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between w-full text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {comment.userName}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {comment.timestamp}
                  </span>
                </div>

                {comment.userId === currentUserId && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleStartEdit(comment)}
                      className="text-zinc-400 hover:text-orange-600 flex items-center gap-1 font-medium text-[10px]"
                    >
                      <EditIcon /> <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-zinc-400 hover:text-red-500 flex items-center gap-1 font-medium text-[10px]"
                    >
                      <TrashIcon /> <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <div className="flex flex-col gap-2 mt-1">
                  <Input
                    className="h-8 border-zinc-200 bg-background text-xs"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="flex gap-2 self-end">
                    <Button
                      onClick={() => setEditingCommentId(null)}
                      variant="ghost"
                      className="h-7 px-2.5 text-[10px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSaveEdit(comment.id)}
                      className="h-7 px-2.5 text-[10px] bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {comment.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
