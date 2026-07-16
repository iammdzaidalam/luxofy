import { verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function csvCell(value: string | number | boolean | null | undefined): string {
  const str = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export async function GET() {
  if (!(await verifyAdminSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const headers = [
    "Created", "Name", "Email", "Phone", "Verified", "City", "State", "Country", "Age", "Gender",
    "Occupation", "Company", "Designation", "LinkedIn", "Annual income", "Net worth", "Budget",
    "Timeline", "Current investments", "Purpose", "Property type", "Goa location", "Heard about",
    "Expected value", "Payment", "Would like", "Score", "Band", "Assigned to", "Status",
    "UTM source", "UTM medium", "UTM campaign", "Referrer",
  ];

  const rows = leads.map((l) =>
    [
      l.createdAt.toISOString(), l.fullName, l.email, l.phone, l.emailVerified, l.city, l.state,
      l.country, l.age, l.gender, l.occupation, l.company, l.designation, l.linkedin,
      l.annualIncome, l.netWorth, l.budget, l.timeline, l.currentInvestments, l.purpose,
      l.propertyType, l.goaLocation, l.hearAbout, l.expectedValue, l.paymentPreference,
      l.wouldLike, l.score, l.band, l.assignedTo, l.status, l.utmSource, l.utmMedium,
      l.utmCampaign, l.referrer,
    ]
      .map(csvCell)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
