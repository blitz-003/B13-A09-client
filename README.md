# Idea Validation Engine - Frontend

An interactive, responsive client portal built with Next.js 14+ to crowdsource, review, and visually map product and technical concepts. This interface empowers engineering and product teams to submit concept theses, target specific consumer segments, map budget estimates, and collect rigorous architectural criticism through an analytical feedback corridor.

## 🚀 Key Features

- **Concept Portfolio View:** A structured index mapping active ideas, implementation categories, target segments, and cost estimations.
- **Validation Feedback Stream:** Real-time thread corridor for inline critique with fully integrated, secure CRUD operations for comment entries.
- **Persistent Authentication:** State management and secure session orchestration handled via `authClient` integration.
- **Instant UI Suspense Boundaries:** Native global loading framework integration that catches asynchronous server-side data fetching and route transitions with smooth, zero-latency micro-animations.
- **Adaptive Dark Mode & Responsive Layout:** Crafted using Tailwind CSS, featuring optimized custom SVG asset micro-interactions.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Client Component architecture)
- **Styling:** Tailwind CSS / Shadcn UI primitives (`Input`, `Button`, `Textarea`)
- **State & Network Layer:** Native Fetch API with asynchronous state tracking hooks
- **Toasts & Notifications:** `sonner`

---

## ⚙️ Environment Variables Configuration

Before launching the local client, create a `.env.local` file in the root directory of your frontend workspace to establish communication with the cloud or local service backend.

```env
# URL pointer to the active backend orchestration server
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```
