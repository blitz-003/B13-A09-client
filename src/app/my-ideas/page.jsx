import * as React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import IdeaDashboardClient from "@/components/modules/IdeaDashboardClient";

export default async function MySubmissionsServerPage() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-zinc-500 text-xs">
        Please log in to view your submissions portfolio.
      </div>
    );
  }

  let initialProjects = [];
  try {
    const sessionTokenData = await auth.api.getToken({
      headers: await headers(),
    });
    const token = sessionTokenData?.token;

    const res = await fetch(`${BACKEND_URL}/my-ideas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    if (res.ok) {
      initialProjects = await res.json();
    }
  } catch (err) {
    console.error("Server-side token fetch failed:", err);
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          My Submissions
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Review the product validation theses you have published.
        </p>
      </div>

      <IdeaDashboardClient initialProjects={initialProjects} />
    </div>
  );
}
