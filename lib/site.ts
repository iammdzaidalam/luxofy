const venue = {
  name: "DoubleTree by Hilton",
  locality: "Sector 56, Gurugram",
} as const;

export const site = {
  name: "Goa Luxury Investor Showcase",
  organizer: "Think Reality",
  partner: "Luxofy Properties",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  event: {
    dateLabel: "9 August 2026",
    // Full-day placeholder until exact timings are announced to confirmed guests
    startIso: "2026-08-09",
    endIso: "2026-08-09",
    city: "Gurugram",
    venue,
    venueNote: `${venue.name}, ${venue.locality}`,
  },
  contact: {
    phone: "+91 92205 04031",
    phoneAlt: "+91 92205 04032",
    email: "sales@thinkreality.co.in",
    website: "https://thinkreality.co.in",
  },
  social: {
    instagram: "https://www.instagram.com/thinkrealityin/",
    linkedin: "https://www.linkedin.com/company/think-realityin/",
    youtube: "https://www.youtube.com/@ThinkRealityIn",
    facebook: "https://www.facebook.com/profile.php?id=61571962892324",
    x: "https://x.com/thinkrealityin",
  },
  poweredBy: {
    label: "Powered by STAIL Realty OS",
    url: "https://realty.stail.co.in",
  },
} as const;

/** Free WhatsApp click-to-chat link (no Business API account needed). */
export function whatsappUrl(message?: string): string {
  const digits = site.contact.phone.replace(/\D/g, "");
  const text = encodeURIComponent(
    message ?? `Hi, I just registered for the ${site.name} on ${site.event.dateLabel}.`
  );
  return `https://wa.me/${digits}?text=${text}`;
}

/** Google Calendar "add event" link, as an all-day hold on 9 August 2026. */
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${site.name} | ${site.organizer} x ${site.partner}`,
    dates: "20260809/20260810",
    details: `Your seat is reserved for the ${site.name} at ${site.event.venueNote}. Exact timings are shared with confirmed guests. Bring a government photo ID for entry.`,
    location: site.event.venueNote,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** RFC 5545 TEXT escaping — backslashes, semicolons, commas and newlines. */
function icsText(value: string): string {
  return value.replace(/[\\;,]/g, (char) => `\\${char}`).replace(/\r?\n/g, "\\n");
}

/** ICS file body: an all-day hold at the venue, exact timings to follow. */
export function buildIcs(attendeeName: string): string {
  const uid = `${Date.now()}@luxofy.in`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Think Reality x Luxofy//Investor Showcase//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    "DTSTAMP:20260716T000000Z",
    "DTSTART;VALUE=DATE:20260809",
    "DTEND;VALUE=DATE:20260810",
    `SUMMARY:${icsText(site.name)}`,
    `DESCRIPTION:${icsText(`Seat reserved for ${attendeeName}. Venue: ${site.event.venueNote}. Exact timings are shared with confirmed guests. Bring a government photo ID.`)}`,
    `LOCATION:${icsText(site.event.venueNote)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
