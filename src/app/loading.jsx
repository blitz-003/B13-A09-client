export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-6 rounded-xl">
        {/* Simple, sleek Tailwind CSS Animated Spinner */}
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-orange-600 dark:border-zinc-800 dark:border-t-orange-500" />

        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide animate-pulse">
          Syncing application dimensions...
        </p>
      </div>
    </div>
  );
}
