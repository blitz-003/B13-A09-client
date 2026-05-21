"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  const router = useRouter();

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center flex flex-col items-center gap-2">
        <div className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest">
          Error Index 404
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
          Route Uncharted
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px] leading-relaxed">
          The requested pointer sequence cannot be resolved against our active
          system router configuration layout maps.
        </p>

        <div className="flex items-center gap-3 mt-4 w-full">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1 h-9 text-xs font-semibold"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="flex-1 h-9 text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
