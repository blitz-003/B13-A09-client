"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IdeaCard } from "@/components/modules/idea-card";
import { toast } from "sonner";

const HERO_SLIDES = [
  {
    badge: "Architectural Validation Engine",
    title: "Where Great Startup Concepts Get Cross-Validated",
    description:
      "IdeaVault focuses completely on open peer optimization, granular community-led critiques, and metric-based concept refinement.",
    cta: "Explore Shared Ideas",
    link: "/ideas",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "Secure Metric Analytics",
    title: "Audit Next-Gen Micro-SaaS Blueprints Safely",
    description:
      "Submit functional technical outlines to the decentralized feedback channel and secure structured evaluations instantly.",
    cta: "Launch Formulation",
    link: "/ideas",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "Engineered Peer Synergy",
    title: "Quantify Infrastructure Risk and Vector Loops",
    description:
      "Isolate hidden system operational constraints before spinning up expensive, production-tier cloud database pipelines.",
    cta: "Review Feed Index",
    link: "/ideas",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Formulate Core Thesis",
    desc: "Define your product architecture scope, target baseline user demographics, and projected operational infrastructure overhead allocations safely.",
    color: "bg-orange-500",
    textColor: "text-white",
  },
  {
    step: "02",
    title: "Disseminate Across Hub",
    desc: "Publish your structural blueprints directly to the secure network stream for cross-validation by verified platform software engineers.",
    color: "bg-zinc-900 dark:bg-zinc-100",
    textColor: "text-white dark:text-zinc-950", // Dynamic inverse color fixes invisibility bug
  },
  {
    step: "03",
    title: "Collect Metric Streams",
    desc: "Monitor your centralized interaction dashboard closely while responding to community evaluations, tracking automated live upvote metrics.",
    color: "bg-orange-600",
    textColor: "text-white",
  },
];

const METRIC_CARDS = [
  {
    value: "24k+",
    label: "Validations Logged",
    desc: "Peers verifying architecture streams daily.",
    styles:
      "bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800",
  },
  {
    value: "99.4%",
    label: "Precision Matrix",
    desc: "Algorithmic feedback structure loops optimized.",
    styles:
      "bg-zinc-950 text-zinc-50 border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-50 dark:border-zinc-800/80",
  },
  {
    value: "$4.8M",
    label: "Capital Unlocked",
    desc: "Early validation matching vetted builder networks.",
    styles:
      "bg-white text-orange-600 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800",
    isOrangeText: true,
  },
];

export default function HomePage() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [trendingIdeas, setTrendingIdeas] = React.useState([]);
  const [isDataLoading, setIsDataLoading] = React.useState(true);

  React.useEffect(() => {
    async function getTrendingStream() {
      try {
        const res = await fetch(`${BACKEND_URL}/ideas/featured`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(
            data.error || "Failed to query database trending models.",
          );
        setTrendingIdeas(data);
      } catch (err) {
        toast.error(
          err.message || "Could not synchronize trending feed components.",
        );
      } finally {
        setIsDataLoading(false);
      }
    }
    getTrendingStream();
  }, [BACKEND_URL]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide(
      (prev) => (prev + newDirection + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.25, ease: "easeInOut" },
    }),
  };

  return (
    <div className="w-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* --- SECTION 1: HERO SECTION WITH LARGER LEFT-EXPANDING IMAGE PANEL --- */}
      <section className="w-full border-b border-zinc-200 dark:border-zinc-900 relative min-h-[500px] md:min-h-[550px] lg:h-[70vh] flex items-center py-10 md:py-16 lg:py-0">
        {/* Navigation Arrows Controls Block */}
        <div className="absolute inset-0 z-30 flex items-center justify-between px-3 sm:px-6 md:px-8 max-w-7xl mx-auto pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            className="p-2 md:p-2.5 rounded-full border border-zinc-200 bg-white/90 backdrop-blur-sm shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 pointer-events-auto hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-2 md:p-2.5 rounded-full border border-zinc-200 bg-white/90 backdrop-blur-sm shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 pointer-events-auto hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Content Box Matrix Wrapper */}
        <div className="mx-auto max-w-7xl w-full px-12 sm:px-16 md:px-20 lg:px-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="col-span-1 lg:col-span-5 flex flex-col items-start space-y-3 md:space-y-4 text-left z-20"
              >
                <Badge
                  variant="outline"
                  className="px-2.5 py-0.5 text-[10px] border-orange-500/30 text-orange-600 font-medium bg-orange-500/5"
                >
                  {HERO_SLIDES[currentSlide].badge}
                </Badge>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.2]">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                  {HERO_SLIDES[currentSlide].description}
                </p>
                <div className="pt-1">
                  <Button
                    size="sm"
                    className="font-semibold px-4 text-[11px] h-8 md:h-9 md:text-xs bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    asChild
                  >
                    <Link href={HERO_SLIDES[currentSlide].link}>
                      {HERO_SLIDES[currentSlide].cta}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Expanded Right Column Asset Window (Enlarges proportionally to the left) */}
            <div className="hidden lg:flex lg:col-span-7 justify-end items-center relative w-full h-[45vh] xl:h-[50vh]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl relative max-w-xl xl:max-w-2xl"
                >
                  <img
                    src={HERO_SLIDES[currentSlide].img}
                    alt="Concept Illustration Portfolio Area"
                    className="w-full h-full object-cover transform scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-50/10 to-transparent dark:from-zinc-950/5 mix-blend-multiply" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: TRENDING SYSTEM DATA CHANNEL --- */}
      <section className="mx-auto max-w-7xl w-full px-4 py-12 md:py-16 lg:py-20 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Trending Innovations
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              High-engagement validation matrices computed globally from active
              system logs.
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 self-start sm:self-auto"
            asChild
          >
            <Link href="/ideas">View All Feed &rarr;</Link>
          </Button>
        </div>

        {isDataLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[220px] rounded-xl border border-zinc-200 bg-zinc-50/50 animate-pulse dark:border-zinc-800 dark:bg-zinc-900/50"
              />
            ))}
          </div>
        ) : trendingIdeas.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
            No live innovations listed in database indexes currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {trendingIdeas.map((idea) => (
              <div key={idea._id} className="h-full">
                <IdeaCard
                  id={idea._id}
                  title={idea.title}
                  shortDescription={idea.shortDescription}
                  category={idea.category}
                  targetAudience={idea.targetAudience}
                  estimatedBudget={idea.estimatedBudget}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- SECTION 3: CSS OPAQUE SCROLL-STACKING PIPELINE --- */}
      <section className="mx-auto max-w-7xl w-full px-4 py-16 md:py-24 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start relative w-full">
          {/* Constant Left Column Component */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-24 flex flex-col gap-2 md:gap-3 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
              System Pipeline Architecture
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              How IdeaVault Cross-Validates Framework Documents
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mt-1">
              Scroll down systematically to inspect the pipeline from
              engineering blueprint formulation to real-time verification
              processing.
            </p>
          </div>

          {/* Stacking Cards Right Column (Fully Opaque) */}
          <div className="w-full lg:w-7/12 flex flex-col gap-16 md:gap-20">
            {WORKFLOW_STEPS.map((stepData, index) => (
              <div
                key={index}
                style={{ top: `calc(6rem + ${index * 2}rem)` }}
                className="sticky rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-xl flex flex-col gap-4 min-h-[200px] md:min-h-[220px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`h-7 w-7 rounded-lg ${stepData.color} ${stepData.textColor} flex items-center justify-center text-xs font-mono font-bold`}
                  >
                    {stepData.step}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                    Phase Sequence Node
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {stepData.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {stepData.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ANIMATED STATISTICS/METRICS MATRIX BLOCK --- */}
      <section className="mx-auto max-w-7xl w-full px-4 py-16 md:py-24 border-b border-zinc-100 dark:border-zinc-900">
        <div className="text-center space-y-3 mb-12 max-w-xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
            Performance Vectors
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Vetting Efficiency At Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {METRIC_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className={`rounded-2xl border p-6 md:p-8 flex flex-col justify-between shadow-md min-h-[160px] sm:min-h-[180px] ${card.styles}`}
            >
              <div>
                <span
                  className={`text-3xl md:text-4xl font-black tracking-tight ${card.isOrangeText ? "text-orange-600" : ""}`}
                >
                  {card.value}
                </span>
                <h4
                  className={`text-xs font-bold tracking-tight mt-2 ${card.isOrangeText ? "text-orange-500/90" : "text-zinc-500 dark:text-zinc-400"}`}
                >
                  {card.label}
                </h4>
              </div>
              <p
                className={`text-[11px] leading-relaxed mt-4 ${card.isOrangeText ? "text-orange-600/80" : "text-zinc-400 dark:text-zinc-500"}`}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 5: CENTERED CALL TO ACTION CALLOUT --- */}
      <section className="w-full py-16 md:py-24 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-4xl w-full px-6 text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ready to Accelerate Your Concept Validation?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Join a distributed network of software engineers, builders, and
            domain architects providing real-world analytical evaluations for
            next-generation platforms.
          </p>
          <div className="pt-2">
            <Button
              size="md"
              className="font-bold px-6 h-10 text-xs sm:text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/10 transition-all"
              asChild
            >
              <Link href="/ideas">Explore Shared Ideas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
