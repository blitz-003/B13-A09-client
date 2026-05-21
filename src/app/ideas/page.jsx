import DiscoveryFeedClient from "@/components/modules/DiscoveryFeedClient";

export default async function DiscoveryHubPage() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  // 1. Declare a mutable variable to hold your data stream safely
  let liveIdeasFromDb = null;
  let fetchError = false;

  try {
    const res = await fetch(`${BACKEND_URL}/ideas`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to pull backend concept indexes.");
    }

    // Assign data to our variable out of JSX reach
    liveIdeasFromDb = await res.json();
  } catch (error) {
    // Flag that something broke during the data fetch stage
    fetchError = true;
    console.error("Discovery Hub Fetch Error:", error);
  }

  // 2. Handle your error fallback UI outside the try block
  if (fetchError || !liveIdeasFromDb) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-sm font-medium text-red-500">
        <p>Unable to connect to discovery stream registries.</p>
        <p className="text-xs text-zinc-400 mt-1">
          Verify your Express Node server is active.
        </p>
      </div>
    );
  }

  // 3. Render your client feed smoothly—completely safe from the linter!
  return <DiscoveryFeedClient initialIdeas={liveIdeasFromDb} />;
}
