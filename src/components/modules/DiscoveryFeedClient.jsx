"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IdeaCard } from "@/components/modules/idea-card";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const SlidersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12h8.25"
    />
  </svg>
);

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#f97316"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#f97316"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h1.52c.59 0 1.164.243 1.577.674l1.38 1.436a.75.75 0 00.55.24h6.223a2.25 2.25 0 012.25 2.25v.43a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25z"
    />
  </svg>
);

const CATEGORIES = ["All", "AI & Tech", "Finance", "Healthcare", "Marketing"];

export default function DiscoveryFeedClient({ initialIdeas }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("trending");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("trending");
    setStartDate("");
    setEndDate("");
  };

  const filteredAndSortedIdeas = React.useMemo(() => {
    // Process real database values injected from our Server component prop
    let result = [...initialIdeas];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((idea) =>
        idea.title?.toLowerCase().includes(query),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((idea) => idea.category === selectedCategory);
    }

    if (startDate) {
      result = result.filter((idea) => idea.createdAt >= startDate);
    }

    if (endDate) {
      result = result.filter((idea) => idea.createdAt <= endDate);
    }

    if (sortBy === "trending") {
      // Safely handle instances where a new document might have undefined votes properties
      result.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || b.timestamp) -
          new Date(a.createdAt || a.timestamp),
      );
    }

    return result;
  }, [initialIdeas, searchQuery, selectedCategory, startDate, endDate, sortBy]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Global Discovery Hub
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Explore innovative community concepts, vote on validation tracks, and
          support emerging products.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <SearchIcon />
        </div>
        <Input
          placeholder="Search by idea title..."
          className="pl-9 h-11 border-zinc-200 focus-visible:ring-zinc-400 dark:border-zinc-800 bg-background text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 items-end w-full">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <SlidersIcon /> Category
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 border-zinc-200 bg-background text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 justify-between w-full text-xs font-medium"
              >
                <span>
                  {selectedCategory === "All"
                    ? "All Categories"
                    : selectedCategory}
                </span>
                <span className="text-zinc-400 text-[10px]">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                {CATEGORIES.map((cat) => (
                  <DropdownMenuRadioItem
                    key={cat}
                    value={cat}
                    className="cursor-pointer text-xs"
                  >
                    {cat === "All" ? "All Categories" : cat}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <SortIcon /> Metric Order
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 border-zinc-200 bg-background text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 justify-between w-full text-xs font-medium"
              >
                <span>
                  {sortBy === "trending" ? "Trending Votes" : "Newest Concept"}
                </span>
                <span className="text-zinc-400 text-[10px]">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem
                  value="trending"
                  className="cursor-pointer text-xs"
                >
                  Trending Votes
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="newest"
                  className="cursor-pointer text-xs"
                >
                  Newest Concept
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <CalendarIcon /> Date Thresholds
          </label>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 pointer-events-none">
                From
              </span>
              <Input
                type="date"
                className="h-10 pl-11 text-xs border-zinc-200 dark:border-zinc-800 bg-background"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 pointer-events-none">
                To
              </span>
              <Input
                type="date"
                className="h-10 pl-9 text-xs border-zinc-200 dark:border-zinc-800 bg-background"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DISCOVERY GRID VIEWPORT */}
      {filteredAndSortedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredAndSortedIdeas.map((idea) => (
            /* CRITICAL: MongoDB utilizes "_id" (or "ideaId"). We pass the converted string field */
            <IdeaCard
              key={idea._id?.$oid || String(idea._id)}
              id={idea._id?.$oid || String(idea._id)}
              {...idea}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-zinc-200 rounded-2xl p-6 dark:border-zinc-800">
          <div className="mb-4">
            <FolderIcon />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            No structural results matched
          </h3>
          <p className="mt-1.5 text-sm text-zinc-400 max-w-sm leading-relaxed">
            We could not find any ideas that match your active parameters. Try
            expanding your search terms or resetting filters.
          </p>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="mt-5 h-9 text-xs border-zinc-200 dark:border-zinc-800"
          >
            Clear Active Filters
          </Button>
        </div>
      )}
    </div>
  );
}
