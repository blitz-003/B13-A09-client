"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, User, LogOut, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Simulated Authentication State
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user] = React.useState({
    name: "Elman Pathan",
    email: "elman@example.com",
    image: "",
  });

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    toast.success(`Theme switched to ${nextTheme} mode!`, { duration: 1500 });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("Logged out successfully.");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Ideas", href: "/ideas" },
    ...(isLoggedIn
      ? [
          { label: "Add Idea", href: "/add-idea" },
          { label: "My Ideas", href: "/my-ideas" },
          { label: "My Interactions", href: "/my-interactions" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* LEFT COMPONENT: BRAND LOGO */}
        <div className="flex items-center z-10">
          <Link
            href="/"
            className="font-bold tracking-wider text-xl transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            IdeaVault
          </Link>
        </div>

        {/* MIDDLE COMPONENT: ABSOLUTE CENTERED DESKTOP NAV LINKS */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT COMPONENT: ACTIONS AND UTILITIES */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
          {/* THEME TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              handleThemeChange(theme === "light" ? "dark" : "light")
            }
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* DYNAMIC USER AVATAR / PROFILE CONTEXT */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-zinc-100 text-zinc-800 font-semibold text-xs dark:bg-zinc-800 dark:text-zinc-200">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Management</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* MOBILE HAMBURGER NAVIGATION DRAWER */}
          <div className="flex md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] px-6 py-6 flex flex-col gap-6"
              >
                <SheetHeader className="text-left border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <SheetTitle className="font-bold text-xl tracking-wider">
                    IdeaVault
                  </SheetTitle>
                </SheetHeader>

                {/* Links Container with explicit padding, layout gaps, and clear hover targets */}
                <nav className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "text-base font-medium px-3 py-2.5 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900",
                        pathname === link.href
                          ? "text-foreground font-semibold bg-zinc-50 dark:bg-zinc-900/50"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Dynamic Mobile Bottom CTA Actions Block with clear spacing margins */}
                {!isLoggedIn && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                    <Button
                      variant="outline"
                      size="default"
                      className="w-full"
                      asChild
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      size="default"
                      className="w-full"
                      asChild
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
