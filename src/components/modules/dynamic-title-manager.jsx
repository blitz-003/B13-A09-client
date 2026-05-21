"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function DynamicTitleManager() {
  const pathname = usePathname();

  React.useEffect(() => {
    // Structural router path-to-meta dictionary map
    const segmentMap = {
      "/": "Discovery Feed | Idea Engine",
      "/login": "Access Portal Control",
      "/signup": "Establish Identity Record",
      "/my-ideas": "My Submissions | Core Hub",
      "/my-interactions": "My Activity Audit Stream",
    };

    // Fallback matcher loop for dynamic parameter routes e.g., `/ideas/id`
    if (pathname?.startsWith("/ideas/")) {
      document.title = "Concept Exploration Thesis | Idea Engine";
    } else {
      document.title = segmentMap[pathname] || "Workspace Portal | Idea Engine";
    }
  }, [pathname]);

  return null; // Headless layer execution pattern
}
