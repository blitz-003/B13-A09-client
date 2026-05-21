import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IdeaCard } from "@/components/modules/idea-card";

// Pure JavaScript Data Array
const trendingIdeasMock = [
  {
    id: "1",
    title: "AI-Powered Contract Synthesizer",
    shortDescription:
      "Automating validation and risk vectors for tech legal paperwork structures seamlessly.",
    category: "Artificial Intelligence",
    targetAudience: "Legal Tech Startups",
    estimatedBudget: "$5,000",
  },
  {
    id: "2",
    title: "Decentralized Medical Telemetry",
    shortDescription:
      "Secure peer-to-peer data synchronization pipelines keeping user biological logs fully encrypted.",
    category: "Health & Wellness",
    targetAudience: "Clinical Researchers",
    estimatedBudget: "$12,000",
  },
  {
    id: "3",
    title: "Micro-Donation Curriculum Grid",
    shortDescription:
      "Crowdfunded localized study content distribution pipelines for open-source academic ecosystems.",
    category: "Modern Education",
    targetAudience: "Independent Scholars",
    estimatedBudget: "$2,500",
  },
  {
    id: "4",
    title: "Automated Supply Chain Verification",
    shortDescription:
      "Real-time auditing of tracking logs for manufacturing validation workflows.",
    category: "Tech Innovations",
    targetAudience: "Logistics Managers",
  },
  {
    id: "5",
    title: "Predictive Crop Irrigation Analytics",
    shortDescription:
      "Machine learning models evaluating microclimatic inputs to manage agricultural metrics.",
    category: "Artificial Intelligence",
    targetAudience: "AgTech Farmers",
    estimatedBudget: "$7,000",
  },
  {
    id: "6",
    title: "Gamified Code Mentorship Framework",
    shortDescription:
      "Connecting junior developers directly to interactive sandbox exercises with validation logic.",
    category: "Modern Education",
    targetAudience: "Bootcamp Students",
    estimatedBudget: "$1,500",
  },
];

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* INTRODUCTORY HERO BANNER BLOCK */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-900/20 border-b border-border py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="outline" className="px-3 py-1 text-xs">
            Innovation Hub Active
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.15]">
            Where Great Startup Concepts Get Cross-Validated
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            IdeaVault focuses completely on open peer optimization, granular
            community-led critiques, and metric-based concept refinement.
          </p>
          <div className="pt-4">
            <Button size="lg" className="font-medium px-8" asChild>
              <Link href="/ideas">Explore Shared Ideas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRENDING TRACKING GRID - MAX 6 ITEMS */}
      <section className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Trending Innovations
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              High-engagement validation matrices computed globally.
            </p>
          </div>
          <Button variant="ghost" className="text-sm font-medium" asChild>
            <Link href="/ideas">View All Feed &rarr;</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trendingIdeasMock.map((idea) => (
            <div key={idea.id} className="h-full">
              <IdeaCard
                id={idea.id}
                title={idea.title}
                shortDescription={idea.shortDescription}
                category={idea.category}
                targetAudience={idea.targetAudience}
                estimatedBudget={idea.estimatedBudget}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
