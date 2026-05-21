import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getCategoryStyles = (category) => {
  const norm = category?.toLowerCase() || "";
  if (
    norm.includes("ai") ||
    norm.includes("tech") ||
    norm.includes("software")
  ) {
    return "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/50";
  }
  if (
    norm.includes("finance") ||
    norm.includes("crypto") ||
    norm.includes("money")
  ) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50";
  }
  if (norm.includes("health") || norm.includes("bio") || norm.includes("med")) {
    return "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50";
  }
  return "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50";
};

export function IdeaCard({
  id,
  title,
  shortDescription,
  category,
  targetAudience,
  estimatedBudget,
}) {
  const badgeClasses = getCategoryStyles(category);

  return (
    /* 1. Replacing <Card> with a native div to completely strip hidden framework padding rules */
    <div className="flex flex-col h-full justify-between transition-all hover:shadow-sm rounded-xl border border-zinc-200 bg-card text-card-foreground overflow-hidden dark:border-zinc-800">
      {/* 2. 🌟 FLUSHED HEADER BAR: Fits perfectly into the rounded corners without gaps or overlapping text */}
      <div className="bg-zinc-50/80 px-5 py-3.5 border-b border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60 flex items-center justify-between w-full">
        <Badge
          variant="outline"
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-md tracking-wide ${badgeClasses}`}
        >
          {category}
        </Badge>
        {estimatedBudget && (
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Est: {estimatedBudget}
          </span>
        )}
      </div>

      {/* 3. CARD BODY: Standard padding gives the text plenty of breathing room below the header */}
      <div className="pt-5 pb-3 px-5 flex flex-col space-y-1.5 flex-1">
        <h3 className="text-lg font-bold tracking-tight line-clamp-1 text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>
      </div>

      {/* TARGET AUDIENCE SEGMENT */}
      <div className="pb-5 px-5">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Target:
          </span>{" "}
          {targetAudience}
        </p>
      </div>

      {/* BUTTON FOOTER */}
      <div className="pt-0 pb-5 px-5 bg-transparent">
        <Button
          className="w-full text-xs font-medium h-9 border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          variant="outline"
          asChild
        >
          <Link href={`/ideas/${id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
