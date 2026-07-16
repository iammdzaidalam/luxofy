"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="border border-line px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone transition-colors hover:border-bronze hover:text-bronze"
    >
      Sign out
    </button>
  );
}
