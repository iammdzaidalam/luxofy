"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-fetches dashboard data every 30 seconds so registrations appear live. */
export function LiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), 30_000);
    return () => clearInterval(id);
  }, [router]);

  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
      </span>
      Live
    </span>
  );
}
