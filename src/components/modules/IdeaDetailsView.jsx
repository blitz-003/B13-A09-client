"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Inline functional icon implementations to replace missing dependencies safely
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export default function IdeaDetailsView({
  fetchedIdea,
  currentUserId,
  currentUserName,
}) {
  // Interactive state anchors for the Feedback Engine
  const [comments, setComments] = React.useState(fetchedIdea?.comments || []);
  const [newCommentText, setNewCommentText] = React.useState("");
  const [editingCommentId, setEditingCommentId] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [commentToDelete, setCommentToDelete] = React.useState(null);

  if (!fetchedIdea) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center text-sm font-medium text-zinc-400">
        Parsing structural concept dimensions...
      </div>
    );
  }

  const {
    title,
    shortDescription,
    detailedDescription,
    category,
    tags = [],
    image,
    estimatedBudget = "N/A",
    targetAudience,
    problem,
    solution,
    createdAt,
    creatorId,
  } = fetchedIdea;

  const isImageMissing = !image || image.trim() === "";

  // COMMENT MUTATION HANDLERS
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setIsSubmitting(true);
    try {
      // Optimistic layout push or API stream call here
      const newComment = {
        id: Date.now().toString(),
        userId: currentUserId,
        userName: currentUserName || "Anonymous Guest",
        text: newCommentText,
        timestamp: new Date().toLocaleDateString(),
      };
      setComments([newComment, ...comments]);
      setNewCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) return;
    setIsSubmitting(true);
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, text: editingText } : c,
      ),
    );
    setEditingCommentId(null);
    setIsSubmitting(false);
  };

  const openDeleteModal = (comment) => {
    setCommentToDelete(comment);
    setIsDeleteModalOpen(true);
  };

  const handleExecuteDelete = () => {
    setIsSubmitting(true);
    setComments(comments.filter((c) => c.id !== commentToDelete.id));
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 flex flex-col gap-8">
      {/* NAVIGATION BAR */}
      <div className="flex items-center justify-between">
        <Link href="/ideas">
          <Button
            variant="ghost"
            className="text-xs font-semibold text-orange-600 hover:text-zinc-900 gap-1.5 p-0"
          >
            ← Back to Feed
          </Button>
        </Link>
        {currentUserId === creatorId && (
          <Badge className="bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 text-[10px] font-bold px-2.5 py-0.5">
            Your Concept
          </Badge>
        )}
      </div>

      {/* CORE HEADER PROFILE */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
            {category}
          </Badge>
          <span className="text-xs text-zinc-400" suppressHydrationWarning>
            Indexed on{" "}
            {createdAt ? new Date(createdAt).toLocaleDateString() : "Recent"}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-3xl">
          {shortDescription}
        </p>
      </div>

      {/* COVER IMAGE WITH EXPLICIT CLEAN NATIVE FALLBACK */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 flex items-center justify-center">
        {isImageMissing ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center p-6">
            <span className="text-3xl"></span>
            <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
              No concept cover layout image has been uploaded
            </p>
          </div>
        ) : (
          <img
            src={image}
            alt={`${title} Cover Layout`}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* DYNAMIC TAGS MATRIX */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-semibold text-zinc-400 mr-1">
            Tags:
          </span>
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[11px] bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-800 px-2 py-0"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* TWO-COLUMN CONTENT LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-2">
        {/* LEFT COLUMN: CRITICAL SPECS AND FEEDBACK CORRIDOR */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* BREAKDOWN MODULE */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Detailed Project Breakdown
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {detailedDescription}
            </p>
          </div>

          <hr className="border-t border-zinc-100 dark:border-zinc-800/60" />

          {/* PROBLEM VECTOR */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-red-100 bg-red-50/10 dark:border-red-950/30 dark:bg-red-950/5">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5 tracking-wide uppercase">
              The Problem Statement
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {problem}
            </p>
          </div>

          {/* MECHANICAL SOLUTION */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-emerald-100 bg-emerald-50/10 dark:border-emerald-950/30 dark:bg-emerald-950/5">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 tracking-wide uppercase">
              Proposed Core Solution
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {solution}
            </p>
          </div>

          <hr className="border-t border-zinc-100 dark:border-zinc-800/60" />

          {/* CLEANLY ISOLATED VALIDATION FEEDBACK STREAM */}
          <div className="flex flex-col gap-4 mt-2">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Validation Feedback Stream ({comments.length})
            </h2>

            <form onSubmit={handleAddComment} className="flex flex-col gap-3">
              <Textarea
                placeholder="Add clear analytical criticism or engineering advice regarding this concept thesis..."
                className="min-h-[80px] border-zinc-200 bg-background text-xs focus-visible:ring-zinc-400"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 self-end text-[11px] h-8 px-4 font-semibold hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Feedback"}
              </Button>
            </form>

            {/* FEED CORRIDOR LIST MAP */}
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
                    {comment.userId === currentUserId && !editingCommentId && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStartEdit(comment)}
                          className="text-zinc-400 hover:text-orange-600 flex items-center gap-1 font-medium text-[10px]"
                        >
                          <EditIcon /> <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openDeleteModal(comment)}
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
                        disabled={isSubmitting}
                      />
                      <div className="flex gap-2 self-end">
                        <Button
                          onClick={() => setEditingCommentId(null)}
                          variant="ghost"
                          className="h-7 px-2.5 text-[10px]"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleSaveEdit(comment.id)}
                          className="h-7 px-2.5 text-[10px] bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save"}
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

        {/* RIGHT COLUMN: RE-ISOLATED PERMANENT PARAMETERS SIDEBAR CARD */}
        <div className="flex flex-col gap-5 p-6 rounded-xl border border-zinc-200/80 bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-900/20 lg:sticky lg:top-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Market Parameters
          </h3>

          {/* TARGET AUDIENCE Profile */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
              Target Audience Profile
            </span>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {targetAudience}
            </p>
          </div>

          <hr className="border-t border-zinc-200/60 dark:border-zinc-800" />

          {/* ESTIMATED CAPITAL REQUIREMENT */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
              Estimated Launch Capital
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
              <span className="text-orange-500 font-medium"></span>{" "}
              {estimatedBudget}
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING SYSTEM CONFIRMATION OVERLAY FOR FEEDBACK DELETION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm p-6 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Delete Comment
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Are you sure you want to drop this piece of feedback? This
              database drop sequence is permanent.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCommentToDelete(null);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-red-600 hover:bg-red-500 text-white text-xs h-8 px-4"
                onClick={handleExecuteDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Dropping..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
