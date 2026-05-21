"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun, User, LogOut, Menu, Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  // Navigation drawer control hooks
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Profile customization workspace visibility control hooks
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Form input entry parameters state hooks
  const [updateName, setUpdateName] = React.useState("");
  const [updatePassword, setUpdatePassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Read active stateless JWT session profile fields reactively
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const currentUser = session?.user;

  // Track operational session switches to sync entry default targets inside modal
  React.useEffect(() => {
    if (currentUser && isProfileModalOpen) {
      setUpdateName(currentUser.name || "");
      setUpdatePassword("");
      setShowPassword(false);
    }
  }, [currentUser, isProfileModalOpen]);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    toast.success(`Theme switched to ${nextTheme} mode!`, { duration: 1500 });
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.info("Logged out successfully.");
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("Failed to cleanly disconnect credential tokens.");
    }
  };

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    if (!updateName.trim()) {
      toast.error(
        "Display identification entry name tracking cannot be blank.",
      );
      return;
    }

    setIsUpdating(true);
    try {
      const { error: nameError } = await authClient.updateUser({
        name: updateName,
      });

      if (nameError) throw new Error(nameError.message);

      if (updatePassword.length > 0) {
        if (updatePassword.length < 6) {
          toast.error(
            "Rotated credentials must carry a minimum of 6 characters.",
          );
          setIsUpdating(false);
          return;
        }
        const { error: passError } = await authClient.changePassword({
          newPassword: updatePassword,
        });

        if (passError) throw new Error(passError.message);
      }

      toast.success(
        "Profile records tracking attributes synchronized successfully! 🎉",
      );
      setIsProfileModalOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Profile update sequence execution failure.",
      );
    } finally {
      setIsUpdating(false);
    }
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
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-zinc-800">
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

            {/* DYNAMIC AUTHENTICATION CONTEXT TRACKER / SKELETON LOADING FRAME */}
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2">
                  <Skeleton className="h-8 w-14 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ) : (
              <>
                {isLoggedIn && currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full focus-visible:ring-1 focus-visible:ring-orange-500"
                      >
                        <Avatar className="h-8 w-8 ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-orange-500 dark:hover:ring-orange-400 transition-all">
                          <AvatarImage
                            src={currentUser.image || ""}
                            alt={currentUser.name}
                          />
                          <AvatarFallback className="bg-orange-50 text-orange-700 font-bold text-xs dark:bg-orange-950/40 dark:text-orange-300">
                            {currentUser.name
                              ? currentUser.name.substring(0, 2).toUpperCase()
                              : "US"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 border-zinc-200 dark:border-zinc-800"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                            {currentUser.name}
                          </p>
                          <p className="text-xs leading-none text-zinc-400 dark:text-zinc-500 truncate max-w-[190px]">
                            {currentUser.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                      <DropdownMenuItem
                        onClick={() => setIsProfileModalOpen(true)}
                        className="cursor-pointer flex items-center focus:bg-zinc-50 dark:focus:bg-zinc-900"
                      >
                        <User className="mr-2 h-4 w-4 text-zinc-400" />
                        <span>Profile Management</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-red-50/50 dark:focus:bg-red-950/10 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-semibold"
                      asChild
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      asChild
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}

                {/* MOBILE HAMBURGER NAVIGATION DRAWER */}
                <div className="flex md:hidden">
                  <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open menu"
                      >
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-[280px] sm:w-[320px] px-6 py-6 flex flex-col gap-6 border-l border-zinc-200 dark:border-zinc-800"
                    >
                      <SheetHeader className="text-left border-b border-zinc-100 dark:border-zinc-800 pb-4">
                        <SheetTitle className="font-bold text-xl tracking-wider">
                          IdeaVault
                        </SheetTitle>
                      </SheetHeader>

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

                      {!isLoggedIn && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                          <Button
                            variant="outline"
                            size="default"
                            className="w-full text-xs font-semibold"
                            asChild
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button
                            size="default"
                            className="w-full text-xs font-semibold"
                            asChild
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <Link href="/register">Register</Link>
                          </Button>
                        </div>
                      )}

                      {isLoggedIn && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                          <Button
                            variant="outline"
                            size="default"
                            className="w-full text-xs font-semibold justify-start"
                            onClick={() => {
                              setIsMobileOpen(false);
                              setIsProfileModalOpen(true);
                            }}
                          >
                            <User className="mr-2 h-4 w-4 text-zinc-400" />
                            Profile Management
                          </Button>
                          <Button
                            variant="destructive"
                            size="default"
                            className="w-full text-xs font-semibold justify-start"
                            onClick={() => {
                              setIsMobileOpen(false);
                              handleLogout();
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                          </Button>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* DETACHED PROFILE UPDATE EDITING VIEWPORT LAYOUT */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[400px] border-zinc-200 dark:border-zinc-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Profile Management
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Display Name
              </label>
              <Input
                type="text"
                className="h-10 text-xs border-zinc-200 bg-background dark:border-zinc-800"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                placeholder="Modify tracking handle..."
                disabled={isUpdating}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Rotate Password (Optional)
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="h-10 text-xs pr-10 border-zinc-200 bg-background dark:border-zinc-800"
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                  placeholder="Enter new credential key structure..."
                  disabled={isUpdating}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isUpdating}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <DialogFooter className="pt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                className="h-10 text-xs font-semibold"
                onClick={() => setIsProfileModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                disabled={isUpdating}
              >
                {isUpdating ? "Synchronizing..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
