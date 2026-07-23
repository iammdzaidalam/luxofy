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
    city: "Delhi NCR",
    venueNote: "Venue shared with confirmed guests",
  },
  contact: {
    phone: "+91 76679 21536",
    email: "sales@luxofy.in",
    website: "https://www.luxofy.in",
  },
  social: {
    instagram: "https://instagram.com/luxofy",
    linkedin: "https://linkedin.com/company/luxofy",
    youtube: "https://youtube.com/@luxofy",
    facebook: "https://facebook.com/luxofy",
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
    details: `Your seat is reserved for the ${site.name} in ${site.event.city}. The exact venue and timings are shared with confirmed guests. Bring a government photo ID for entry.`,
    location: site.event.city,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** ICS file body: an all-day hold, venue announced to confirmed guests. */
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
    `SUMMARY:${site.name}`,
    `DESCRIPTION:Seat reserved for ${attendeeName}. The exact venue and timings in ${site.event.city} are shared with confirmed guests. Bring a government photo ID.`,
    `LOCATION:${site.event.city}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
