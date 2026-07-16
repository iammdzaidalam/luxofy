import { buildIcs } from "@/lib/site";

export function GET() {
  const ics = buildIcs("Guest");
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="goa-investor-showcase.ics"',
    },
  });
}
