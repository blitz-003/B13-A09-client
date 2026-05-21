import IdeaDetailsView from "@/components/modules/IdeaDetailsView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const IdeaDetailsPage = async ({ params }) => {
  // 1. Await dynamic URL context parameter values safely
  const { id } = await params;

  // 2. Fetch the raw session token via request cookies from Better Auth
  const sessionTokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = sessionTokenData?.token;

  // 3. Request data from your remote Express backend using the token
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
    // Optional: Ensures the server fetches fresh data on every route hit
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm font-medium text-red-500">
        Could not retrieve idea reference indexes. Ensure your backend server is
        up.
      </div>
    );
  }

  const databaseIdea = await res.json();

  // 4. Drop into the visual rendering block, piping data directly into the Client component
  return (
    <IdeaDetailsView
      fetchedIdea={databaseIdea}
      currentUserId="usr-99"
      currentUserName="Elman Pathan"
    />
  );
};

export default IdeaDetailsPage;
