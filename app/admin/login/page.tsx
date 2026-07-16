import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false },
};

export default async function AdminLoginPage() {
  if (await verifyAdminSession()) redirect("/admin");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <p className="font-display text-3xl uppercase tracking-[0.28em] text-cream">Luxofy</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-luxe text-cream/50">
          Event admin
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
