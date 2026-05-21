import React from "react";
import Link from "next/link"; // Fixed the import syntax here

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BRAND DESCRIPTION */}
          <div className="space-y-3">
            <span className="text-md font-bold tracking-wider text-foreground">
              IdeaVault
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An open framework focused entirely on crowdsourced validation,
              iterative community refinement, and strategic concept tracking.
            </p>
          </div>

          {/* LINK GROUP 1: CATEGORIES */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/ideas?category=tech"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tech Innovations
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas?category=health"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Health & Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas?category=ai"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas?category=education"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Modern Education
                </Link>
              </li>
            </ul>
          </div>

          {/* LINK GROUP 2: PLATFORM DIRECTORY */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
              Platform Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/ideas"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Shared Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Trending Matrix
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Validation Metrology
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO & THE UPDATED X LOGO */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-3">
                Direct Support
              </h4>
              <p className="text-sm text-muted-foreground">
                connect@ideavault.net
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-2.5">
                Community Link
              </h4>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Connect via X"
              >
                {/* Scalable vector graphic matching the modern X logo asset exactly */}
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC BAR */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IdeaVault Inc. Operational
            validation vectors active.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Protocol
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Interaction
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
