"use client";

import * as React from "react";
import Link from "next/link";

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

const MOCK_INTERACTIONS = [
  {
    id: "int-1",
    targetIdeaId: "1",
    targetIdeaTitle: "AI micro-SaaS Validation Framework",
    text: "Initial schema engine runs inside Vercel Edge loops perfectly.",
    timestamp: "2026-05-19 09:11",
  },
  {
    id: "int-2",
    targetIdeaId: "3",
    targetIdeaTitle: "Telehealth Diagnostics Toolkit",
    text: "Ensure HL7 integrations align securely with clinic databases.",
    timestamp: "2026-05-12 16:40",
  },
];

export default function MyInteractionsView() {
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
        {MOCK_INTERACTIONS.map((log) => (
          <div
            key={log.id}
            className="p-5 rounded-xl border border-zinc-200 bg-card dark:border-zinc-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block">
                Comment Log • Indexed on {log.timestamp}
              </span>
              <div className="text-xs text-zinc-500 mt-0.5">
                On Idea:{" "}
                <strong className="text-zinc-800 dark:text-zinc-200">
                  {log.targetIdeaTitle}
                </strong>
              </div>
              <blockquote className="mt-2 pl-3 border-l-2 border-orange-500 text-xs text-zinc-600 dark:text-zinc-400 italic">
                {log.text}
              </blockquote>
            </div>

            <Link
              href={`/ideas/${log.targetIdeaId}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 shrink-0 self-end sm:self-center transition-colors"
            >
              <span>View Thread</span>
              <ArrowIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
