"use client";

import * as React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="#f97316"
    className="h-3 w-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
    />
  </svg>
);

export default function MyInteractionsView() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [interactions, setInteractions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchMyInteractions() {
      try {
        // Retrieve live user credentials token from the client-side session store
        const { data: tokenData } = await authClient.token();

        if (!tokenData?.token) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/my-interactions/comments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(
            data.error || "Failed to retrieve interaction index logs.",
          );

        setInteractions(data);
      } catch (err) {
        toast.error(err.message || "Network read execution fault.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMyInteractions();
  }, [BACKEND_URL]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 flex items-center justify-center">
        <p className="text-xs font-medium text-zinc-400 animate-pulse">
          Compiling data history channels...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Interactions
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Audit stream logs tracking your feedback contributions across the
          network.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {interactions.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
            No tracked comment instances match your authorization footprint.
          </div>
        ) : (
          interactions.map((log) => (
            <div
              key={log._id}
              className="p-5 rounded-xl border border-zinc-200 bg-card dark:border-zinc-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex flex-col gap-1.5 max-w-2xl">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Comment Log • Indexed on {log.timestamp}
                </span>
                <div className="text-xs text-zinc-500 mt-0.5">
                  On Idea:{" "}
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    {log.parentIdeaTitle || "Untitled Concept Document"}
                  </strong>
                </div>
                <blockquote className="mt-2 pl-3 border-l-2 border-orange-500 text-xs text-zinc-600 dark:text-zinc-400 italic">
                  {log.text}
                </blockquote>
              </div>

              <Link
                href={`/ideas/${log.ideaId}`} // Dynamically maps directly back to the original database _id
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 shrink-0 self-end sm:self-center transition-colors"
              >
                <span>View Thread</span>
                <ArrowIcon />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
