import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LiveRefresh } from "@/components/admin/live-refresh";
import { LogoutButton } from "@/components/admin/logout-button";
import { PoweredBy } from "@/components/powered-by";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

const bandStyles: Record<string, string> = {
  HOT: "bg-red-50 text-red-800 border-red-200",
  WARM: "bg-amber-50 text-amber-800 border-amber-200",
  COLD: "bg-slate-50 text-slate-600 border-slate-200",
};

/** Expected turnout weighted by lead quality. */
const ATTENDANCE_WEIGHTS: Record<string, number> = { HOT: 0.8, WARM: 0.5, COLD: 0.25 };

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="border border-line bg-cream p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">{label}</p>
      <p className="font-display mt-2 text-4xl text-ink">{value}</p>
      {hint ? <p className="mt-1 text-[12px] text-stone">{hint}</p> : null}
    </div>
  );
}

export default async function AdminDashboard() {
  if (!(await verifyAdminSession())) redirect("/admin/login");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [leads, todayCount] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfDay } } }),
  ]);

  const total = leads.length;
  const hot = leads.filter((l) => l.band === "HOT").length;
  const warm = leads.filter((l) => l.band === "WARM").length;
  const cold = leads.filter((l) => l.band === "COLD").length;
  const qualified = hot + warm;
  const conversionRate = total ? Math.round((qualified / total) * 100) : 0;
  const attendancePrediction = Math.round(
    leads.reduce((sum, l) => sum + (ATTENDANCE_WEIGHTS[l.band] ?? 0.25), 0)
  );

  const bySource = new Map<string, number>();
  for (const lead of leads) {
    const source = lead.utmSource || lead.hearAbout;
    bySource.set(source, (bySource.get(source) ?? 0) + 1);
  }
  const sources = [...bySource.entries()].sort((a, b) => b[1] - a[1]);

  const byCampaign = new Map<string, number>();
  for (const lead of leads) {
    if (lead.utmCampaign) byCampaign.set(lead.utmCampaign, (byCampaign.get(lead.utmCampaign) ?? 0) + 1);
  }
  const topCampaign = [...byCampaign.entries()].sort((a, b) => b[1] - a[1])[0];

  const byTeam = new Map<string, { total: number; hot: number }>();
  for (const lead of leads) {
    const member = lead.assignedTo ?? "Unassigned";
    const entry = byTeam.get(member) ?? { total: 0, hot: 0 };
    entry.total += 1;
    if (lead.band === "HOT") entry.hot += 1;
    byTeam.set(member, entry);
  }

  return (
    <div className="min-h-dvh bg-ivory">
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div className="flex items-center gap-5">
            <p className="font-display text-2xl text-ink">
              Luxofy <span className="text-stone">/ Event admin</span>
            </p>
            <LiveRefresh />
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              className="bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-bronze"
            >
              Export CSV
            </a>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Today's registrations" value={todayCount} />
          <StatCard label="Total registrations" value={total} />
          <StatCard label="Qualified leads" value={qualified} hint={`${conversionRate}% of total`} />
          <StatCard label="Predicted attendance" value={attendancePrediction} hint="Weighted by lead quality" />
          <StatCard label="Hot leads" value={hot} hint="Score 80+" />
          <StatCard label="Warm leads" value={warm} hint="Score 60 to 79" />
          <StatCard label="Cold leads" value={cold} hint="Score below 60" />
          <StatCard
            label="Top campaign"
            value={topCampaign ? topCampaign[1] : 0}
            hint={topCampaign ? topCampaign[0] : "No campaign data yet"}
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* Sources */}
          <div className="border border-line bg-cream p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
              Registrations by source
            </h2>
            {sources.length === 0 ? (
              <p className="mt-4 text-[14px] text-stone">No registrations yet.</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {sources.map(([source, count]) => (
                  <li key={source} className="flex items-center gap-4">
                    <span className="w-28 shrink-0 truncate text-[13px] font-medium text-ink">{source}</span>
                    <span className="h-2 flex-1 overflow-hidden bg-parchment">
                      <span
                        className="block h-full bg-bronze"
                        style={{ width: `${Math.round((count / total) * 100)}%` }}
                      />
                    </span>
                    <span className="w-8 text-right text-[13px] text-stone">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Team performance */}
          <div className="border border-line bg-cream p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
              Team performance
            </h2>
            {byTeam.size === 0 ? (
              <p className="mt-4 text-[14px] text-stone">No leads assigned yet.</p>
            ) : (
              <table className="mt-5 w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line text-[10px] uppercase tracking-[0.14em] text-stone">
                    <th className="pb-2 font-semibold">Salesperson</th>
                    <th className="pb-2 text-right font-semibold">Leads</th>
                    <th className="pb-2 text-right font-semibold">Hot</th>
                  </tr>
                </thead>
                <tbody>
                  {[...byTeam.entries()].map(([member, stats]) => (
                    <tr key={member} className="border-b border-line/60 last:border-b-0">
                      <td className="py-2.5 font-medium text-ink">{member}</td>
                      <td className="py-2.5 text-right text-stone">{stats.total}</td>
                      <td className="py-2.5 text-right text-stone">{stats.hot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Lead table */}
        <div className="mt-8 border border-line bg-cream">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
              Latest registrations
            </h2>
            <span className="text-[12px] text-stone">{total} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-line text-[10px] uppercase tracking-[0.14em] text-stone">
                  <th className="px-6 py-3 font-semibold">Lead</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Profile</th>
                  <th className="px-4 py-3 font-semibold">Budget / Timeline</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Assigned</th>
                  <th className="px-6 py-3 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-stone">
                      No registrations yet. Leads appear here the moment someone completes the form.
                    </td>
                  </tr>
                ) : (
                  leads.slice(0, 50).map((lead) => (
                    <tr key={lead.id} className="border-b border-line/60 align-top last:border-b-0">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-ink">{lead.fullName}</p>
                        <p className="mt-0.5 text-stone">{lead.city}, {lead.state}</p>
                      </td>
                      <td className="px-4 py-4 text-stone">
                        <p>{lead.phone}</p>
                        <p className="mt-0.5">{lead.email}</p>
                      </td>
                      <td className="px-4 py-4 text-stone">
                        <p>{lead.occupation}</p>
                        <p className="mt-0.5">{lead.purpose} · {lead.propertyType}</p>
                      </td>
                      <td className="px-4 py-4 text-stone">
                        <p>{lead.budget}</p>
                        <p className="mt-0.5">{lead.timeline}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block border px-2.5 py-1 text-[11px] font-semibold ${bandStyles[lead.band] ?? bandStyles.COLD}`}
                        >
                          {lead.band} {lead.score}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-stone">{lead.assignedTo}</td>
                      <td className="px-6 py-4 text-stone">
                        {lead.createdAt.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex justify-center border-t border-line pt-6">
          <PoweredBy />
        </div>
      </main>
    </div>
  );
}
