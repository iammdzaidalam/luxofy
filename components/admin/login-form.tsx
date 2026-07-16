"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-line-dark bg-ink-soft px-4 py-3.5 text-[15px] text-cream placeholder:text-cream/35 focus:border-bronze focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/50">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/50">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>
      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-bronze py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-bronze-deep disabled:opacity-60"
      >
        {loading ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
