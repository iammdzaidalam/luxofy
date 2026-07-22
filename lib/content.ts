const u = (id: string, w: number, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const heroContent = {
  eyebrow: "Think Reality x Luxofy Properties",
  title: "Goa Investor Showcase",
  subtitle: "From apartments to villas, we have got you covered",
  date: "9 August 2026",
  city: "Delhi NCR",
  badge: "",
  poster: u("1512343879784-a960bf40e7f2", 1920, 70),
  videoSources: [
    "https://videos.pexels.com/video-files/3576378/3576378-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
  ],
};

/* Sourced from thinkreality.co.in, luxofy.in and the Luxofy asset library */
export const trustStats = [
  { value: 300, suffix: "+", label: "Properties sold" },
  { value: 150, suffix: "+", label: "Active listings" },
  { value: 14, suffix: "", label: "Projects in the Goa portfolio" },
  { value: 3, suffix: "", label: "Destinations: Goa, Kasauli, Kumarhatti" },
];

export const trustLogos = ["Think Reality", "Luxofy Properties", "STAIL Realty OS"];

export const trustIntro =
  "Hosted by Think Reality, RERA certified channel partners, with Luxofy Properties, the developer behind fourteen luxury projects across North Goa, including the sold out Eleva Suites in Calangute.";

/** Editorial collage around the intro heading, all from the Luxofy portfolio. */
export const introCollage = [
  { src: "/projects/pine-cliff-3.jpg", alt: "Primary bedroom at The Pine Cliff, Parra" },
  { src: "/projects/casa-de-fresco-0.jpg", alt: "Jacuzzi deck at Casa De Fresco, Guirim" },
  { src: "/projects/azalea-3.jpg", alt: "Balcony overlooking the fields at The Azalea, Candolim" },
  { src: "/projects/floretta-1.jpg", alt: "Completed Floretta villa pool, photographed on site" },
];

export const whyAttend = [
  {
    title: "Investment insights",
    body: "A numbers-first view of Goa's luxury market, presented by active transactors.",
  },
  {
    title: "Goa market report",
    body: "Take home our latest research on micro markets, price movements and rental data.",
  },
  {
    title: "Premium projects",
    body: "Fourteen villa and apartment projects, including off-market opportunities.",
  },
  {
    title: "Rental yield strategy",
    body: "Learn how to structure your purchase for managed holiday rentals.",
  },
  {
    title: "Expert speakers",
    body: "Hear directly from the founders. No scripted pitches, just candid answers.",
  },
  {
    title: "Curated networking",
    body: "Share a table with CXOs and NRI investors evaluating the same markets.",
  },
];

export const whyGoa = {
  intro:
    "Goa is no longer just a holiday destination. It is one of India's fastest appreciating luxury property markets, backed by real infrastructure and real rental demand.",
  stats: [
    { value: 14, suffix: "%", label: "Average annual price appreciation in North Goa since 2020" },
    { value: 8, suffix: "M+", label: "Tourist arrivals every year, and climbing" },
    { value: 9, suffix: "%", label: "Peak rental yields on managed luxury villas" },
    { value: 2, suffix: "", label: "International airports after the opening of Mopa" },
  ],
  drivers: [
    {
      title: "Infrastructure",
      body: "New expressways and bridges cut travel times and open up quieter micro markets across the state.",
    },
    {
      title: "Mopa airport effect",
      body: "Manohar International Airport doubled air capacity. Land near Mopa has re-rated sharply.",
    },
    {
      title: "Tourism engine",
      body: "Over 8 million visitors yearly keep occupancy high through a season that now stretches ten months.",
    },
    {
      title: "Rental demand",
      body: "Premium villas on managed platforms run at high occupancy with hotel suite rates during peak season.",
    },
    {
      title: "Capital appreciation",
      body: "Parra, Candolim and Assagao compound in the low to mid teens annually ahead of metro markets.",
    },
    {
      title: "Supply discipline",
      body: "Strict coastal zoning and low rise rules cap new supply. Scarcity underwrites long term value.",
    },
  ],
  comparison: {
    caption: "Five year outlook on a 2 crore luxury purchase, indicative",
    rows: [
      { market: "North Goa villa", appreciation: "12 to 15% p.a.", yield: "6 to 9%", exit: "High" },
      { market: "Gurugram apartment", appreciation: "8 to 10% p.a.", yield: "2 to 3%", exit: "High" },
      { market: "Mumbai apartment", appreciation: "6 to 8% p.a.", yield: "2 to 3%", exit: "Moderate" },
      { market: "Dubai apartment", appreciation: "8 to 12% p.a.", yield: "5 to 7%", exit: "Moderate" },
    ],
  },
};

/* ------------------------------------------------------------- projects
 * Sourced from the Luxofy asset library (project leafs, availability and
 * price sheets) and luxofy.in/goa. Where a number is not published, the
 * card says so instead of guessing.
 */

export type ProjectCategory = "Villas" | "Apartments" | "Upcoming";

export interface CatalogItem {
  name: string;
  /** Slug of the dedicated landing page under /projects, when one exists. */
  slug?: string;
  location: string;
  categories: ProjectCategory[];
  blurb: string;
  price?: string;
  config?: string;
  status?: string;
  image: { src: string; alt: string };
}

export const catalog: CatalogItem[] = [
  // Villas
  {
    name: "The Pine Cliff",
    slug: "pine-cliff",
    location: "Parra, North Goa",
    categories: ["Villas"],
    blurb:
      "Three gated 4 BHK villas with private pools, wooden pool decks and panoramic views, on Parra's most central lane.",
    price: "₹9 Cr onwards",
    config: "4 BHK · 6,689 to 8,603 sq ft super area",
    status: "Ready to move in · Villa A sold",
    image: { src: "/projects/pine-cliff-0.jpg", alt: "Private pool and deck at The Pine Cliff, Parra" },
  },
  {
    name: "Floretta",
    slug: "the-floretta",
    location: "Parra, North Goa",
    categories: ["Villas"],
    blurb:
      "4 BHK fully furnished villas with private pools and a rent back facility, in the lanes of Parra.",
    config: "4 BHK, fully furnished",
    status: "Under construction",
    image: { src: "/projects/floretta-0.jpg", alt: "Private pool at Floretta, Parra" },
  },
  {
    name: "Casa De Fresco",
    slug: "casa-de-fresco",
    location: "Guirim, North Goa",
    categories: ["Villas"],
    blurb:
      "3 bedroom villas with stunning field views, jacuzzi decks and private amenities in quiet Guirim.",
    config: "3 bedroom villas",
    image: { src: "/projects/casa-de-fresco-1.jpg", alt: "Back view of the Casa De Fresco villas" },
  },
  {
    name: "The Azalea",
    slug: "the-azalea",
    location: "Candolim, North Goa",
    categories: ["Villas"],
    blurb:
      "Four field facing 5 BHK mansions with private pools and steamers in the bathrooms, a 2.3 km walk from Candolim beach.",
    price: "₹9 Cr onwards",
    config: "5 BHK · 5,380 sq ft super built up",
    status: "Possession March 2026",
    image: { src: "/projects/azalea-0.jpg", alt: "Pool view at night at The Azalea, Candolim" },
  },
  {
    name: "Casa Adelaide",
    location: "Aldona, North Goa",
    categories: ["Villas"],
    blurb: "An exclusive enclave of 4 BHK villas with spacious terraces in riverside Aldona.",
    price: "₹3.94 Cr onwards",
    config: "4 BHK · 4,243 sq ft",
    image: { src: "/projects/adelaide-0.jpg", alt: "The Casa Adelaide villas at Aldona" },
  },
  {
    name: "Casa Hill Crest",
    location: "Bastora, North Goa",
    categories: ["Villas", "Upcoming"],
    blurb: "3 and 4 BHK villas with panoramic views, private pools and smart homes.",
    config: "3 and 4 BHK villas",
    status: "Launching soon · Construction started",
    image: { src: "/projects/hill-crest-c0.jpg", alt: "Front view of Casa Hill Crest, Bastora" },
  },
  {
    name: "The Zinnia",
    slug: "the-zinnia",
    location: "Sangolda, North Goa",
    categories: ["Villas", "Upcoming"],
    blurb: "4 BHK villas with panoramic views, private pools and smart homes in leafy Sangolda.",
    price: "₹4.75 Cr onwards",
    config: "4 BHK · 4,575 sq ft",
    status: "Launching soon · Construction started",
    image: { src: "/projects/zinnia-c0.jpg", alt: "The Zinnia villa exterior, Sangolda" },
  },

  // Apartments
  {
    name: "Eleva Suites",
    location: "Calangute, North Goa",
    categories: ["Apartments"],
    blurb: "2 BHK apartments near Calangute beach with private plunge pools. Fully sold out.",
    config: "2 BHK with plunge pools",
    status: "Sold out",
    image: { src: "/projects/eleva-c1.jpg", alt: "Pool side at Eleva Suites, Calangute" },
  },
  {
    name: "Casa Magarida",
    slug: "casa-margarida",
    location: "Baga Arpora, North Goa",
    categories: ["Apartments"],
    blurb: "2 BHK apartments with a swimming pool and a clubhouse with gym and yoga room.",
    price: "₹1.52 Cr onwards",
    config: "2 BHK · 1,096 sq ft",
    image: { src: "/projects/casa-magarida-c1.jpg", alt: "Pool at Casa Magarida, Baga Arpora" },
  },
  {
    name: "Panoramic Vista",
    location: "Bicholim, North Goa",
    categories: ["Apartments"],
    blurb: "Apartments in fast growing Bicholim. Full details presented at the showcase.",
    image: { src: "/projects/panoramic-vista-c0.jpg", alt: "Panoramic Vista, Bicholim" },
  },
  {
    name: "Mmirari House",
    slug: "mmirari-house",
    location: "Reis Magos, North Goa",
    categories: ["Apartments"],
    blurb:
      "Boutique 2 BHK residences; ground floor homes carry private plunge pools and every resident shares the terrace pool.",
    price: "₹1.54 Cr onwards",
    config: "2 BHK · 1,243 to 1,760 sq ft salable",
    status: "Limited units remaining",
    image: { src: "/projects/mmirari-0.jpg", alt: "Mmirari House facade at dusk, Reis Magos" },
  },
  {
    name: "Serene Meadows",
    slug: "serene-meadows",
    location: "Kadamba Plateau, North Goa",
    categories: ["Apartments"],
    blurb:
      "An elegant enclave of 63 spacious 2 BHK and 8 refined 3 BHK apartments with top amenities and seamless connectivity.",
    config: "2 and 3 BHK apartments",
    image: { src: "/projects/serene-meadows-c0.jpg", alt: "Double height atrium at Serene Meadows" },
  },
  {
    name: "Amora Horizon",
    slug: "amora-horizon",
    location: "Nerul, North Goa",
    categories: ["Apartments"],
    blurb:
      "2 and 3 BHK residences with private pools, a tropical forest theme, pickle ball court, terrace pool and restaurant.",
    config: "2 and 3 BHK residences",
    image: { src: "/projects/amora-c0.jpg", alt: "Terrace pool with valley views at Amora Horizon, Nerul" },
  },

  // Upcoming only
  {
    name: "Spring Field",
    location: "North Goa",
    categories: ["Upcoming"],
    blurb: "Construction has started. Location and commercials are revealed first at the showcase.",
    status: "Launching soon",
    image: { src: "/projects/spring-field-c0.jpg", alt: "Spring Field under construction, aerial view" },
  },
];

export const projectCategories: ProjectCategory[] = ["Villas", "Apartments", "Upcoming"];

/* PRD agenda items, verbatim. Timings are shared with confirmed guests. */
export const agenda = [
  "Registration",
  "Networking",
  "Investment Session",
  "Project Showcase",
  "Q&A",
  "Lunch",
  "One-on-One Consultation",
];

/* The hosts, from thinkreality.co.in */
export const speakers = [
  {
    name: "Vishal Sharma",
    role: "Co-founder, Think Reality",
    image: "/speakers/vishal-sharma.jpg",
  },
  {
    name: "Yogita Arya",
    role: "Co-founder, Think Reality",
    image: "/speakers/yogita-arya.jpg",
  },
  {
    name: "Money Singh",
    role: "Partner, Luxofy.in",
    image: "/speakers/money-singh.jpeg",
  },
];

/* Real Google reviews, as published on luxofy.in */
export const testimonials = [
  {
    quote:
      "I've had a wonderful experience working with the agency. From the time that I finalized the property, her responsiveness to questions, efforts in easing all administrative and legal procedures, especially since I was abroad, and accuracy in information gathering on all matters stood out.",
    name: "Akanksha",
    detail: "Google review · July 2023",
    rating: 5,
  },
  {
    quote:
      "I had a very smooth experience in the selling of my property in Goa. An excellent professional team to help you with all queries, and the entire process was smooth. 10 out of 10, and special thanks to Vishal and JD.",
    name: "Desai Suraj",
    detail: "Google review · March 2023",
    rating: 5,
  },
  {
    quote:
      "I have recently purchased a property in Goa and I have to say the experience was great. Professional staff and a very flexible team. Vishal was so reliable and helpful, always responded to calls and messages and was always ready to assist.",
    name: "Leah Decruz",
    detail: "Google review · November 2022",
    rating: 5,
  },
  {
    quote:
      "Very professional and amazing team! Bought a house with a very smooth transition. No hidden loopholes, and very clear and upfront with every deal they make. Glad to know Goa has at least one good real estate team that is trustworthy and reliable.",
    name: "Sanaya Mistry",
    detail: "Google review · October 2022",
    rating: 5,
  },
  {
    quote:
      "Good team of people with a professional approach towards things. I had a pleasant experience buying property recently. They delivered as per their commitments.",
    name: "Sanjay Dutta",
    detail: "Google review · June 2022",
    rating: 5,
  },
];

/* All gallery imagery comes from the Luxofy asset library. */
export const gallery = [
  { src: "/projects/pine-cliff-1.jpg", alt: "Pool view from the entrance at The Pine Cliff, Parra", tag: "Villas", tall: true },
  { src: "/projects/eleva-c1.jpg", alt: "Pool side at Eleva Suites, Calangute", tag: "Apartments", tall: false },
  { src: "/projects/azalea-0.jpg", alt: "Pool at night at The Azalea, Candolim", tag: "Villas", tall: false },
  { src: "/projects/mmirari-3.jpg", alt: "Mmirari House exterior with pool, Reis Magos", tag: "Apartments", tall: true },
  { src: "/projects/floretta-1.jpg", alt: "Completed Floretta villa pool, photographed on site", tag: "Villas", tall: false },
  { src: "/projects/serene-meadows-c0.jpg", alt: "Double height atrium at Serene Meadows, Kadamba Plateau", tag: "Apartments", tall: false },
  { src: "/projects/hill-crest-c1.jpg", alt: "Back view of Casa Hill Crest, Bastora", tag: "Villas", tall: false },
  { src: "/projects/casa-magarida-c1.jpg", alt: "Pool at Casa Magarida, Baga Arpora", tag: "Apartments", tall: false },
  { src: "/projects/casa-de-fresco-0.jpg", alt: "Jacuzzi deck at Casa De Fresco, Guirim", tag: "Villas", tall: false },
  { src: "/projects/amora-c0.jpg", alt: "Terrace pool at Amora Horizon, Nerul", tag: "Apartments", tall: false },
  { src: "/projects/zinnia-c1.jpg", alt: "The Zinnia villas, Sangolda", tag: "Villas", tall: false },
  { src: "/projects/adelaide-0.jpg", alt: "Casa Adelaide villas, Aldona", tag: "Villas", tall: false },
];

export const faqs = [
  {
    q: "Is the event really free to attend?",
    a: "Yes. The showcase is fully hosted by Think Reality and Luxofy Properties, including all research material. Seats are limited and allotted after a short qualification call.",
  },
  {
    q: "Where and when is the event?",
    a: "9 August 2026 in Delhi NCR. The exact venue and timings are shared with confirmed guests during the RSVP call.",
  },
  {
    q: "Why is the event invite only?",
    a: "We keep the room small so every attendee gets a private consultation slot and genuine access to the team. Registrations are reviewed and confirmed by our team over a short call.",
  },
  {
    q: "What is the minimum investment to consider Goa seriously?",
    a: "In the current Luxofy portfolio, apartments start around ₹1.5 crore and villas from ₹3.94 crore. We will be honest if your budget is better deployed elsewhere.",
  },
  {
    q: "Who manages the property if I live in Delhi or abroad?",
    a: "Luxofy runs a rental and management desk: housekeeping, guest management, listings, repairs and owner statements. You can also appoint any third party manager you prefer.",
  },
  {
    q: "Can I book a property at the event itself?",
    a: "You can express interest in specific units at the event, but there is no pressure to transact. Most buyers visit Goa first, and we encourage that.",
  },
  {
    q: "What happens after I register on this page?",
    a: "You receive an instant confirmation email with a calendar invite. Our team then calls you to understand your goals and confirm your seat.",
  },
];

export const ctaBanner = {
  title: "Ready to invest?",
  subtitle:
    "Reserve your seat today. Seats are limited and every registration is personally confirmed by the team.",
  image: u("1505142468610-359e7d316be0", 1800, 70),
};
