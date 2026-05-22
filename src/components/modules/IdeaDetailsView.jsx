"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function IdeaDetailsView({
  fetchedIdea,
  currentUserId,
  currentUserName,
}) {
  // Destructure all expected live parameters from your matching database model schema
  const {
    title,
    shortDescription,
    detailedDescription,
    category,
    tags = [],
    image, // Strict mandatory data asset string URL
    estimatedBudget = "N/A",
    targetAudience,
    problem,
    solution,
    createdAt,
    creatorId,
  } = fetchedIdea || {};

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 flex flex-col gap-8">
      {/* NAVIGATION CORRIDOR */}
      <div className="flex items-center justify-between">
        <Link href="/ideas">
          <Button
            variant="ghost"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 gap-1.5 p-0"
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
          <span className="text-xs text-zinc-400">
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

      {/* COMPULSORY COVER IMAGE VECTOR FRAMEWORK */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
        <img
          src={image}
          alt={`${title} Cover Layout`}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Graceful internal fallback vector graphics configuration block if remote CDN breaks
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";
          }}
        />
      </div>

      {/* DYNAMIC OPTIONAL TAGS MATRIX */}
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

      {/* TWO-COLUMN INTENT BLUEPRINT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-2">
        {/* LEFT COLUMN: CRITICAL THESIS MATRIX */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* DEEP-DIVE MODULE */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Detailed Project Breakdown
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {detailedDescription}
            </p>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-800/60" />

          {/* PROBLEM VECTOR BLOCK */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-red-100 bg-red-50/10 dark:border-red-950/30 dark:bg-red-950/5">
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5 tracking-wide uppercase text-[11px]">
              The Problem Statement
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {problem}
            </p>
          </div>

          {/* MECHANICAL SOLUTION BLOCK */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-emerald-100 bg-emerald-50/10 dark:border-emerald-950/30 dark:bg-emerald-950/5">
            <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 tracking-wide uppercase text-[11px]">
              Proposed Core Solution
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {solution}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: POSITIONING & METADATA CARD */}
        <div className="flex flex-col gap-5 p-6 rounded-xl border border-zinc-200/80 bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-900/20 lg:sticky lg:top-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Market Parameters
          </h3>

          {/* TARGET AUDIENCE SUB-CARD */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
              Target Audience Profile
            </span>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {targetAudience}
            </p>
          </div>

          <Separator className="bg-zinc-200/60 dark:bg-zinc-800" />

          {/* ESTIMATED CAPITAL CARD */}
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
    </div>
  );
}
