"use client";

import * as React from "react";

export function LoadingSpinner({
  message = "Retrieving matrix data records...",
}) {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
      <div className="relative w-8 h-8">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-100 dark:border-zinc-800" />
        <div className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
        {message}
      </p>
    </div>
  );
}
