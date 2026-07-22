/* ------------------------------------------------------------- projects
 * Per-project landing page content. Sourced from the Luxofy asset library:
 * project brochures (Aanandam, Ellora, Gonex, Greenskky, Hindustan Builders),
 * the channel partner price sheets and availability messages. Where a number
 * is not published, the page says so instead of guessing.
 */

export interface ProjectUnit {
  name: string;
  saleable?: string;
  carpet?: string;
  price?: string;
  soldOut?: boolean;
}

export interface ProjectHighlight {
  title: string;
  body: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectDistance {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short qualifier under the name, e.g. "Splendour villas in Parra". */
  tagline: string;
  location: string;
  category: "Villas" | "Apartments";
  developer?: string;
  hero: ProjectImage;
  /** Quick facts shown in the hero strip. */
  facts: { label: string; value: string }[];
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  highlights: ProjectHighlight[];
  units: ProjectUnit[];
  unitNote?: string;
  amenities: string[];
  gallery: ProjectImage[];
  locationCopy: string;
  distances: ProjectDistance[];
  possession?: string;
  rera?: string;
  /** Headline price for metadata and hero. */
  priceLabel: string;
  metaDescription: string;
}

export const projects: Project[] = [
  /* ----------------------------------------------------------- villas */
  {
    slug: "pine-cliff",
    name: "The Pine Cliff",
    tagline: "Splendour villas on Parra's most central lane",
    location: "Parra, North Goa",
    category: "Villas",
    developer: "Aanandam · RS Developers",
    hero: { src: "/projects/pine-cliff-0.jpg", alt: "Private pool and wooden deck at The Pine Cliff, Parra" },
    facts: [
      { label: "Configuration", value: "4 BHK villas" },
      { label: "Super area", value: "6,689 – 8,603 sq ft" },
      { label: "Price", value: "₹9 Cr onwards" },
      { label: "Status", value: "Ready to move in" },
    ],
    overview: {
      eyebrow: "The project",
      title: "A masterpiece set in the hills of Parra",
      paragraphs: [
        "Nestled in the serene hills of North Goa, The Pine Cliff offers an unparalleled living experience. Three ultra-luxury 4 BHK villas blend modern and classical design on the outside with classy, contemporary interiors within — each with its own independent gated entry inside a fully gated complex.",
        "Set on a gradual hillside, every villa opens onto a relaxing private pool with wooden decking, and wide, panoramic balconies frame magnificent views of sunrise, sunset and the valley below. Spacious, airy and fully furnished with curated interiors, each home at Pine Cliff is uniquely yours.",
      ],
    },
    highlights: [
      { title: "Panoramic views", body: "Breathtaking sunrise, sunset and valley views from wide balconies and porticos on every floor." },
      { title: "Private pool and deck", body: "A splashy private pool with elegant wooden decking, gazebo seating and an outdoor bar unit." },
      { title: "Curated interiors", body: "Fully furnished homes with Italian marble, modular kitchens, designer cornices and premium finishes." },
      { title: "Gated privacy in Parra", body: "An exclusive complex of just three villas, each with a private lift, in Parra's most coveted location." },
    ],
    units: [
      { name: "Villa A", soldOut: true },
      { name: "Villa B", saleable: "6,689 sq ft super area · 4,284 sq ft plot", carpet: "3,953 sq ft built up", price: "₹9 Cr" },
      { name: "Villa C", saleable: "8,603 sq ft super area · 10,166 sq ft plot", carpet: "3,848 sq ft built up", price: "₹15 Cr" },
    ],
    unitNote: "4 luxurious bedrooms and 4 designer bathrooms per villa, fully furnished with curated interiors.",
    amenities: [
      "Private pool with wooden deck",
      "High speed elevator in every villa",
      "Outdoor bar and modern gazebo seating",
      "Attractive water fountains",
      "Modular kitchen with branded appliances",
      "Split AC provision in all bedrooms and living areas",
      "Video door phone on each floor",
      "Dedicated stilt car parking",
      "Vastu compliant homes",
      "Gated complex with landscaped commons",
    ],
    gallery: [
      { src: "/projects/pine-cliff-0.jpg", alt: "Private pool and deck at The Pine Cliff" },
      { src: "/projects/pine-cliff-1.jpg", alt: "Pool view from the entrance at The Pine Cliff" },
      { src: "/projects/pine-cliff-2.jpg", alt: "Living spaces at The Pine Cliff" },
      { src: "/projects/pine-cliff-3.jpg", alt: "Primary bedroom at The Pine Cliff" },
    ],
    locationCopy:
      "Parra sits at the quiet centre of North Goa's most wanted triangle — minutes from the Calangute–Baga strip in one direction and Anjuna in the other, yet famous for watermelon fields, old churches and the coconut-tree-lined lanes the village is known for.",
    distances: [
      { label: "Anjuna and Baga beaches", value: "10 min drive" },
      { label: "Calangute", value: "3 miles" },
      { label: "Panaji", value: "9 miles" },
      { label: "Dabolim Airport", value: "26 miles" },
    ],
    possession: "Ready to move in",
    priceLabel: "₹9 Cr onwards",
    metaDescription:
      "The Pine Cliff, Parra — three ready-to-move 4 BHK ultra-luxury villas with private pools, wooden decks and panoramic valley views. ₹9 Cr onwards.",
  },

  {
    slug: "the-floretta",
    name: "The Floretta",
    tagline: "Eight private-pool villas by Ellora in Parra",
    location: "Parra, North Goa",
    category: "Villas",
    developer: "Ellora Infratech",
    hero: { src: "/projects/floretta-1.jpg", alt: "Completed villa pool at The Floretta, Parra, photographed on site" },
    facts: [
      { label: "Configuration", value: "4 BHK villas" },
      { label: "Saleable area", value: "336 – 386 sq m" },
      { label: "Price", value: "₹6.21 Cr onwards" },
      { label: "Availability", value: "3 of 8 villas left" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Escape to your own piece of heaven",
      paragraphs: [
        "The Floretta by Ellora is a very high-end project of eight 4 BHK luxury villas in the lanes of Parra, in close proximity to Goa's most famous beaches — Anjuna and Baga. The project offers a perfect combination of contemporary architecture and thoughtful features for comfortable living.",
        "Each villa is designed to attain the perfect balance between modernity and natural living, with adequate space, light and ventilation, a private swimming pool and lawn area, an elegantly designed jacuzzi on the terrace, and designer POP false ceilings across bedrooms and common areas.",
      ],
    },
    highlights: [
      { title: "Private pool and garden", body: "A beautifully landscaped lawn with an individual pool and a jacuzzi on the terrace of every villa." },
      { title: "Fully furnished", body: "The available villas come fully furnished, ready for holidays or managed rentals from day one." },
      { title: "Owner services", body: "Rental services, concierge services and property management handled for you after possession." },
      { title: "Parra's coveted lanes", body: "An exclusive gated community, 1–2 minutes from the iconic Parra coconut tree road." },
    ],
    units: [
      { name: "Villa A", saleable: "345.20 sq m", carpet: "186.96 sq m", soldOut: true },
      { name: "Villa B", saleable: "338.30 sq m", carpet: "186.96 sq m", soldOut: true },
      { name: "Villa C · fully furnished", saleable: "339.87 sq m", carpet: "186.96 sq m", price: "₹6.21 Cr" },
      { name: "Villa D · fully furnished", saleable: "386.41 sq m", carpet: "186.96 sq m", price: "₹6.75 Cr" },
      { name: "Villa E", saleable: "350.66 sq m", carpet: "186.96 sq m", soldOut: true },
      { name: "Villa F", saleable: "335.99 sq m", carpet: "186.96 sq m", soldOut: true },
      { name: "Villa G", saleable: "335.73 sq m", carpet: "186.96 sq m", soldOut: true },
      { name: "Villa H · fully furnished", saleable: "341.99 sq m", carpet: "186.96 sq m", price: "₹6.75 Cr" },
    ],
    unitNote: "4 luxurious bedrooms and 4 bathrooms per villa. Five of the eight villas are already sold.",
    amenities: [
      "Private swimming pool and lawn",
      "Jacuzzi on the terrace",
      "Designer POP false ceilings throughout",
      "Italian marble and designer tile flooring",
      "Modular kitchen with granite counters",
      "Modular wardrobes and split ACs",
      "Premium CP fittings and glass shower cubicles",
      "Servant quarter and car parking",
      "Rental, concierge and property management services",
      "Vastu compliant gated community",
    ],
    gallery: [
      { src: "/projects/floretta-0.jpg", alt: "Private pool at The Floretta, Parra" },
      { src: "/projects/floretta-1.jpg", alt: "Completed Floretta villa pool, photographed on site" },
      { src: "/projects/floretta-2.jpg", alt: "Front view of a Floretta villa" },
      { src: "/projects/floretta-3.jpg", alt: "Back view with private pool at The Floretta" },
      { src: "/projects/floretta-4.jpg", alt: "The eight-villa Floretta streetscape" },
      { src: "/projects/floretta-5.jpg", alt: "Bedroom at The Floretta" },
      { src: "/projects/floretta-6.jpg", alt: "Garden and pool deck at The Floretta" },
    ],
    locationCopy:
      "Parra is the quiet, leafy heart of North Goa — the coconut-tree road made famous by a hundred film shoots is minutes away, and the Anjuna and Baga beach belt, Mapusa and Porvorim are all within a short drive.",
    distances: [
      { label: "Parra coconut tree road", value: "1–2 min" },
      { label: "Anjuna and Baga beaches", value: "10–15 min drive" },
      { label: "Mapusa", value: "10 min drive" },
      { label: "Calangute strip", value: "15 min drive" },
    ],
    possession: "Completed · December 2025",
    rera: "PRGO08221740",
    priceLabel: "₹6.21 Cr onwards",
    metaDescription:
      "The Floretta by Ellora, Parra — 4 BHK fully furnished luxury villas with private pools and jacuzzi terraces. Three of eight villas remain, ₹6.21 Cr onwards.",
  },

  {
    slug: "the-azalea",
    name: "The Azalea",
    tagline: "Field-facing 5 BHK mansions in Candolim",
    location: "Candolim, North Goa",
    category: "Villas",
    developer: "Ellora Group",
    hero: { src: "/projects/azalea-0.jpg", alt: "Pool view at night at The Azalea, Candolim" },
    facts: [
      { label: "Configuration", value: "5 BHK villas" },
      { label: "Saleable area", value: "500 sq m (5,380 sq ft)" },
      { label: "Price", value: "₹9 Cr onwards" },
      { label: "Possession", value: "December 2027" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Luxury amidst nature, minutes from Candolim beach",
      paragraphs: [
        "Discover luxury living in Candolim with The Azalea — an exclusive complex of four field-facing 5 BHK villas by Ellora. Enjoy serene views and tranquil surroundings, immersed in the essence of nature while relishing every modern comfort.",
        "Each villa pairs a private swimming pool with a jacuzzi on the terrace facing the fields and hills, a double-height entrance lobby, a private lift, and steamers in the bathrooms. Titles are clear, the community is gated, and Candolim beach is a couple of minutes away.",
      ],
    },
    highlights: [
      { title: "Field-view living", body: "Stunning vistas of lush fields and hills from the balconies, terrace jacuzzi and wide verandahs." },
      { title: "Private pool and lift", body: "An independent pool, terrace jacuzzi and a lift in every villa, with a grand double-height lobby." },
      { title: "Premium specification", body: "Kohler bathroom fittings, steamers in the bathrooms, UPVC openings and Italian marble floors." },
      { title: "Walk to the beach", body: "A gated pocket of Anna Vaddo, Candolim — walking distance from the sand and the Fort Aguada stretch." },
    ],
    units: [
      { name: "Field-view villa", saleable: "500 sq m saleable", carpet: "3,139 sq ft carpet", price: "₹10.5 Cr" },
      { name: "Villa", saleable: "500 sq m saleable", carpet: "3,139 sq ft carpet", price: "₹9 Cr" },
    ],
    unitNote: "A complex of four 5 BHK villas, furnished, with 24×7 security and rental and management services. Ref VP290124-165804-4478.",
    amenities: [
      "Private swimming pool",
      "Jacuzzi on the terrace facing the fields",
      "Steamers in the bathrooms",
      "Private lift and double-height lobby",
      "Kohler bathroom fittings",
      "Modular kitchen and wardrobes",
      "Servant quarter and private lawn",
      "24×7 security in a gated community",
      "Rental and management services",
      "Walking distance to Candolim beach",
    ],
    gallery: [
      { src: "/projects/azalea-0.jpg", alt: "Pool at night at The Azalea" },
      { src: "/projects/azalea-1.jpg", alt: "The Azalea villas, Candolim" },
      { src: "/projects/azalea-2.jpg", alt: "Interiors at The Azalea" },
      { src: "/projects/azalea-3.jpg", alt: "Balcony overlooking the fields at The Azalea" },
      { src: "/projects/azalea-4.jpg", alt: "Exterior render of The Azalea villa" },
      { src: "/projects/azalea-5.jpg", alt: "Private pool at dusk at The Azalea" },
      { src: "/projects/azalea-6.jpg", alt: "Double-height living and dining at The Azalea" },
      { src: "/projects/azalea-7.jpg", alt: "Bedroom at The Azalea" },
    ],
    locationCopy:
      "Candolim pairs one of North Goa's finest beaches with the heritage of Fort Aguada, five-star neighbours and a coastal-zone address that stays calm even in season. The Azalea sits in Anna Vaddo, a short stroll from the sand.",
    distances: [
      { label: "Candolim beach", value: "1–2 min drive" },
      { label: "Fort Aguada", value: "10 min drive" },
      { label: "Calangute–Baga strip", value: "15 min drive" },
      { label: "Panaji", value: "25 min drive" },
    ],
    possession: "December 2027",
    priceLabel: "₹9 Cr onwards",
    metaDescription:
      "The Azalea, Candolim — four field-facing 5 BHK villas with private pools, terrace jacuzzis and steam rooms, walking distance to the beach. ₹9 Cr onwards.",
  },

  {
    slug: "casa-de-fresco",
    name: "Casa De Fresco",
    tagline: "A story called life, told in Guirim",
    location: "Guirim, North Goa",
    category: "Villas",
    developer: "Gonex Buildwell",
    hero: { src: "/projects/casa-de-fresco-2.jpg", alt: "The row of Casa De Fresco villas, Guirim" },
    facts: [
      { label: "Configuration", value: "3 BHK villas" },
      { label: "Saleable area", value: "300 sq m" },
      { label: "Price", value: "₹4 Cr" },
      { label: "Status", value: "Ready to move in" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Affordable luxury in a prime Guirim address",
      paragraphs: [
        "Casa De Fresco is an aesthetic space built with quality — eight luxurious 3 BHK villas designed to fine perfection in quiet Guirim, North Goa. Each villa is a testimony to smart design, thoughtful architecture and aesthetic spaces, with a royal reflection of radiant charm in every bedroom.",
        "Enjoy a garden at your terrace and relax in the open-air jacuzzi while the cool breeze rolls in from the fields. Wake up to peacocks in the surrounding greens, walk or cycle the nature trail past Guirim's churches and heritage lanes — close to the city, but far from the crowd.",
      ],
    },
    highlights: [
      { title: "Breathtaking field views", body: "Villas facing open green fields, with a nature trail of lush greens and abundant peacocks around." },
      { title: "Pool, gazebo and jacuzzi", body: "A private pool with deck, a gazebo and terrace garden, and an open-to-air jacuzzi on the roof." },
      { title: "Owner services", body: "Rental services, concierge services and property management for effortless second-home ownership." },
      { title: "Gated Guirim enclave", body: "An exclusive gated community on the NH-66 corridor between Mapusa, Porvorim and the beach belt." },
    ],
    units: [
      { name: "Villas 1 – 8", saleable: "300 sq m saleable", carpet: "146.89 sq m carpet", price: "₹4 Cr" },
    ],
    unitNote: "3 luxurious bedrooms and 4 bathrooms per villa, semi furnished with curated interiors. Ref VP171022-152442-9783.",
    amenities: [
      "Private pool with deck",
      "Open-air jacuzzi on the terrace",
      "Gazebo and terrace garden",
      "Italian marble in living and dining",
      "Full modular kitchen with granite counters",
      "Daikin 4-star split ACs throughout",
      "Jaguar / Grohe CP fittings",
      "Landscaped lawns",
      "Private car parking",
      "Rental, concierge and property management services",
    ],
    gallery: [
      { src: "/projects/casa-de-fresco-0.jpg", alt: "Jacuzzi deck at Casa De Fresco" },
      { src: "/projects/casa-de-fresco-1.jpg", alt: "Back view of the Casa De Fresco villas" },
      { src: "/projects/casa-de-fresco-2.jpg", alt: "The villa row at Casa De Fresco, Guirim" },
      { src: "/projects/casa-de-fresco-3.jpg", alt: "Villa rear with pool at Casa De Fresco" },
      { src: "/projects/casa-de-fresco-4.jpg", alt: "Pergola terrace deck at Casa De Fresco" },
      { src: "/projects/casa-de-fresco-5.jpg", alt: "Living room at Casa De Fresco" },
    ],
    locationCopy:
      "Guirim is a classy neighbourhood of eye-catching Goan architecture — churches, schools and heritage homes — sitting right on the NH-66 corridor. Mapusa, Porvorim and the Calangute–Baga belt are each a short drive away.",
    distances: [
      { label: "Mapusa", value: "5–10 min drive" },
      { label: "Porvorim", value: "10 min drive" },
      { label: "Calangute–Baga beaches", value: "15–20 min drive" },
      { label: "Panaji", value: "20 min drive" },
    ],
    possession: "Ready to move in",
    rera: "PRGO10221754",
    priceLabel: "₹4 Cr",
    metaDescription:
      "Casa De Fresco, Guirim — eight ready 3 BHK villas with private pools, terrace jacuzzis and field views at ₹4 Cr. Semi furnished with curated interiors.",
  },

  {
    slug: "the-zinnia",
    name: "The Zinnia",
    tagline: "Smart 4 BHK villas in leafy Sangolda",
    location: "Sangolda, North Goa",
    category: "Villas",
    developer: "Ellora Group",
    hero: { src: "/projects/zinnia-c0.jpg", alt: "The Zinnia villa exterior, Sangolda" },
    facts: [
      { label: "Configuration", value: "4 BHK villas" },
      { label: "Area", value: "4,575 sq ft" },
      { label: "Price", value: "₹4.75 Cr onwards" },
      { label: "Status", value: "Under construction" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Panoramic views, private pools, smart homes",
      paragraphs: [
        "The Zinnia brings Ellora's villa craft to leafy Sangolda — 4 BHK villas with panoramic views, private pools and smart home automation, in one of North Goa's most sought-after residential villages.",
        "Sangolda sits on the Porvorim plateau between Panaji and the beach belt, prized for its old trees, design stores and quiet lanes. Construction has started; full commercials, floor plans and unit availability are presented at the showcase.",
      ],
    },
    highlights: [
      { title: "Panoramic views", body: "Villas planned around light, ventilation and long views over Sangolda's greens." },
      { title: "Private pools", body: "An independent pool with every villa, designed for holiday living and managed rentals." },
      { title: "Smart homes", body: "Home automation built in from day one, alongside Ellora's premium specification." },
      { title: "Launching soon", body: "Early-stage pricing from ₹4.75 Cr — the advantage of entering before launch." },
    ],
    units: [
      { name: "4 BHK villa", saleable: "4,575 sq ft", price: "₹4.75 Cr onwards" },
    ],
    unitNote: "Construction started. Detailed unit-wise availability and payment plans are shared at the showcase.",
    amenities: [
      "Private swimming pool",
      "Smart home automation",
      "Panoramic view terraces",
      "Landscaped private greens",
      "Gated community",
      "Rental, concierge and property management services",
    ],
    gallery: [
      { src: "/projects/zinnia-c0.jpg", alt: "The Zinnia villa exterior" },
      { src: "/projects/zinnia-c1.jpg", alt: "The Zinnia villas, Sangolda" },
    ],
    locationCopy:
      "Sangolda is the connoisseur's corner of North Goa — a heritage village of tree-lined lanes and design boutiques on the Porvorim plateau, 15 minutes from Panaji one way and the Calangute belt the other.",
    distances: [
      { label: "Porvorim", value: "5–10 min drive" },
      { label: "Calangute–Baga beaches", value: "15 min drive" },
      { label: "Panaji", value: "15–20 min drive" },
      { label: "Mapusa", value: "10 min drive" },
    ],
    possession: "Launching soon · construction started",
    priceLabel: "₹4.75 Cr onwards",
    metaDescription:
      "The Zinnia, Sangolda — upcoming 4 BHK smart villas with private pools and panoramic views by Ellora. ₹4.75 Cr onwards, construction started.",
  },

  /* ------------------------------------------------------- apartments */
  {
    slug: "casa-margarida",
    name: "Casa Margarida",
    tagline: "More than a home — a seaside legacy in Calangute",
    location: "Calangute, North Goa",
    category: "Apartments",
    hero: { src: "/projects/casa-magarida-c2.jpg", alt: "Front elevation of Casa Margarida, Calangute" },
    facts: [
      { label: "Configuration", value: "2 BHK apartments" },
      { label: "Saleable area", value: "101.87 sq m onwards" },
      { label: "Price", value: "₹1.52 Cr onwards" },
      { label: "Possession", value: "Within 1 month" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Coastal charm in Calangute's quiet quarter",
      paragraphs: [
        "Welcome to Casa Margarida, a coastal sanctuary in the heart of Calangute. The property is an ideal second home as well as a profitable avenue of investment — an unparalleled blend of coastal charm and vibrant heritage, in a unique and inviting living space.",
        "Casa Margarida enjoys the rare advantage of Calangute's geography: the vibrant Calangute–Baga strip within easy reach, yet nestled in a quaint, quiet part of the village, with the beach inside a 1.5 km radius. Only the last three units remain, with possession within a month.",
      ],
    },
    highlights: [
      { title: "Last 3 units", body: "The penthouses are sold out and three 2 BHK residences remain, ready within a month." },
      { title: "Pool and clubhouse", body: "A swimming pool with wooden deck, plus a clubhouse with a gym and a yoga room." },
      { title: "Premium finishes", body: "Spacious, semi furnished, airy interiors — Kohler or Jaquar fittings, UPVC windows, designer tiles." },
      { title: "Calangute's coveted pocket", body: "A gated community 1.5 km from Calangute beach, between the strip and the quiet village." },
    ],
    units: [
      { name: "2 BHK apartment", saleable: "101.87 sq m saleable", carpet: "57.91 sq m carpet", price: "₹1.52 Cr onwards" },
      { name: "Penthouse with terrace pool", soldOut: true },
    ],
    unitNote: "2 luxurious bedrooms and 2 designer bathrooms, semi furnished. Ref VP030924-125353-3224.",
    amenities: [
      "Swimming pool with wooden deck",
      "Clubhouse with gym and yoga room",
      "Gated community with security",
      "Lift and DG power backup",
      "Modular kitchen with granite counters",
      "Kohler / Jaquar bathroom fittings",
      "UPVC windows and laminated flush doors",
      "Covered stilt parking",
      "Eco-friendly, energy-efficient design",
    ],
    gallery: [
      { src: "/projects/casa-magarida-c0.jpg", alt: "Casa Margarida exterior" },
      { src: "/projects/casa-magarida-c1.jpg", alt: "Pool at Casa Margarida" },
      { src: "/projects/casa-magarida-c2.jpg", alt: "Front elevation of Casa Margarida" },
      { src: "/projects/casa-magarida-c3.jpg", alt: "Bedroom at Casa Margarida" },
      { src: "/projects/casa-magarida-c4.jpg", alt: "Kitchen and dining at Casa Margarida" },
      { src: "/projects/casa-magarida-c5.jpg", alt: "Living room at Casa Margarida" },
    ],
    locationCopy:
      "Calangute is the centre of gravity of North Goa's coast — restaurants, nightlife and the season's energy on the Baga strip, with the quieter village lanes of Agarwado behind it. Casa Margarida sits in that calm pocket, 1.5 km from the sand.",
    distances: [
      { label: "Calangute beach", value: "1.5 km" },
      { label: "Baga strip", value: "5–10 min drive" },
      { label: "Candolim", value: "10 min drive" },
      { label: "Mapusa", value: "15 min drive" },
    ],
    possession: "Possession within 1 month",
    priceLabel: "₹1.52 Cr onwards",
    metaDescription:
      "Casa Margarida, Calangute — last three 2 BHK apartments with pool and clubhouse, 1.5 km from the beach. ₹1.52 Cr onwards, possession within a month.",
  },

  {
    slug: "amora-horizon",
    name: "Amora Horizon",
    tagline: "Resort-style luxury living in Nerul",
    location: "Nerul, North Goa",
    category: "Apartments",
    hero: { src: "/projects/amora-c1.jpg", alt: "Terrace pool with valley views at Amora Horizon, Nerul" },
    facts: [
      { label: "Configuration", value: "2 & 3 BHK residences" },
      { label: "Area", value: "109.70 sq m onwards" },
      { label: "Price", value: "₹1.53 Cr onwards" },
      { label: "Possession", value: "October 2029" },
    ],
    overview: {
      eyebrow: "The project",
      title: "An enclave of 76 luxury homes in the tropics",
      paragraphs: [
        "Discover Amora Horizon, an exclusive enclave of 76 luxury homes designed for refined resort-style living. Surrounded by lush tropical landscapes, the project curates a full resort's worth of amenities — grand clubhouse, terrace pickleball court, karaoke deck, steam room, restaurant, gym, yoga pods and a common swimming pool.",
        "Each semi-furnished residence features a private pool, offering cosy holiday-home vibes and elevated comfort. With 24×7 security, gated community living, basement parking and power backup, Amora Horizon blends luxury, leisure and peace of mind — perfect for holiday living, weekend retreats or premium investment.",
      ],
    },
    highlights: [
      { title: "Private pool homes", body: "Semi-furnished residences with private pools, from 2 BHKs to penthouses and 3 BHK pool homes." },
      { title: "A resort of amenities", body: "Grand clubhouse, restaurant, terrace pickleball court, karaoke deck, steam room, gym and yoga pods." },
      { title: "Nerul's rising address", body: "Between the Sinquerim–Candolim belt and Panaji, on the quiet Nerul river side of the coast." },
      { title: "Investment horizon", body: "Early pricing from ₹1.53 Cr with possession in October 2029 — structured for capital appreciation." },
    ],
    units: [
      { name: "2 BHK residence", saleable: "109.70 sq m onwards", price: "₹1.53 Cr onwards" },
      { name: "2 BHK with pool", saleable: "153.94 sq m onwards", price: "₹2.15 Cr onwards" },
      { name: "2 BHK penthouse", saleable: "181.17 sq m onwards", price: "₹2.53 Cr onwards" },
      { name: "3 BHK with pool", saleable: "186.19 sq m onwards", price: "₹2.79 Cr onwards" },
    ],
    unitNote: "76 semi-furnished residences in a gated enclave. RERA PRGO01262579.",
    amenities: [
      "Private pool with every residence",
      "Grand clubhouse and restaurant",
      "Common swimming pool",
      "Terrace pickleball court",
      "Karaoke deck and indoor games",
      "Steam room and gym",
      "Serene yoga pods",
      "Basement parking and power backup",
      "24×7 security, gated community",
    ],
    gallery: [
      { src: "/projects/amora-c1.jpg", alt: "Terrace pool with valley views at Amora Horizon" },
    ],
    locationCopy:
      "Nerul sits on the calm inner bank of the Sinquerim river — five minutes from the Candolim–Sinquerim beach belt and Fort Aguada, fifteen from Panaji, with the Coco beach jetty and the coast's best restaurants around the corner.",
    distances: [
      { label: "Coco beach, Nerul", value: "5 min drive" },
      { label: "Candolim–Sinquerim beaches", value: "10 min drive" },
      { label: "Fort Aguada", value: "10 min drive" },
      { label: "Panaji", value: "15–20 min drive" },
    ],
    possession: "October 2029",
    rera: "PRGO01262579",
    priceLabel: "₹1.53 Cr onwards",
    metaDescription:
      "Amora Horizon, Nerul — 76 resort-style luxury homes with private pools, clubhouse, pickleball and yoga pods. 2 & 3 BHK from ₹1.53 Cr, possession October 2029.",
  },

  {
    slug: "serene-meadows",
    name: "Serene Meadows",
    tagline: "A masterpiece at Kadamba Plateau",
    location: "Kadamba Plateau, Old Goa",
    category: "Apartments",
    developer: "Hindustan Builders",
    hero: { src: "/projects/serene-meadows-c1.jpg", alt: "Dusk facade at Serene Meadows, Kadamba Plateau" },
    facts: [
      { label: "Configuration", value: "2 & 3 BHK apartments" },
      { label: "Saleable area", value: "120.11 sq m onwards" },
      { label: "Price", value: "₹1.02 Cr onwards" },
      { label: "Possession", value: "December 2028" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Awaken to the symphony of luxury",
      paragraphs: [
        "Welcome to Serene Meadows — an exclusive enclave of refined living where timeless elegance meets modern comfort. This thoughtfully curated community features 71 premium residences: 63 spacious 2 BHKs and 8 elegant 3 BHKs, each designed to reflect the classic charm of enduring, Mediterranean-inspired architecture.",
        "Residents unwind in the signature swimming pool, energise in the fully equipped gym, gather under the grand double-height atrium, or simply relax amidst lush landscaped gardens — with the terraces framing panoramic views of Old Goa's historic churches and rolling hills.",
      ],
    },
    highlights: [
      { title: "Grand atrium", body: "A large double-height atrium at the heart of the community, made for gatherings and functions." },
      { title: "Club living", body: "Clubhouse, signature swimming pool, modern gym, kids' play area and landscaped gardens." },
      { title: "Practical luxury", body: "Reserved covered parking, gas pipeline, power backup, CCTV, and provisions for solar and EV charging." },
      { title: "Old Goa views", body: "Panoramic terraces over historic churches and green hills, fifteen minutes from Panjim." },
    ],
    units: [
      { name: "2 BHK apartment", saleable: "120.11 sq m onwards", carpet: "93.80 sq m onwards", price: "₹1.02 Cr onwards" },
      { name: "3 BHK apartment", saleable: "159.60 sq m onwards", carpet: "128.38 sq m onwards", price: "₹1.35 Cr onwards" },
    ],
    unitNote: "2 and 3 luxurious bedrooms with designer bathrooms, unfurnished. RERA PRGO09252542.",
    amenities: [
      "Large atrium for gatherings",
      "Clubhouse and community hall",
      "Common swimming pool",
      "Fully equipped modern gym",
      "Kids' play area",
      "Reserved covered parking",
      "Gas pipeline to every home",
      "Power backup for lifts and common areas",
      "CCTV surveillance and 24×7 manned gate",
      "Provision for solar heater and EV charging",
    ],
    gallery: [
      { src: "/projects/serene-meadows-c0.jpg", alt: "Double height atrium at Serene Meadows" },
      { src: "/projects/serene-meadows-c1.jpg", alt: "Dusk facade at Serene Meadows" },
      { src: "/projects/serene-meadows-c2.jpg", alt: "Swimming pool at Serene Meadows" },
      { src: "/projects/serene-meadows-c3.jpg", alt: "Rooftop terrace garden at sunset, Serene Meadows" },
      { src: "/projects/serene-meadows-c4.jpg", alt: "Entrance gate at Serene Meadows" },
      { src: "/projects/serene-meadows-c5.jpg", alt: "Atrium lounge at Serene Meadows" },
      { src: "/projects/serene-meadows-c6.jpg", alt: "Living and dining at Serene Meadows" },
    ],
    locationCopy:
      "The Kadamba Plateau is Panjim's growth corridor — minutes from Old Goa's UNESCO churches, the Karmali railway station and the highway network, with hospitals, schools and supermarkets already in place.",
    distances: [
      { label: "Healthway Hospital", value: "6 min" },
      { label: "Karmali railway station", value: "10 min" },
      { label: "Panjim city", value: "15 min" },
      { label: "Dabolim Airport", value: "30 min" },
    ],
    possession: "December 2028",
    rera: "PRGO09252542",
    priceLabel: "₹1.02 Cr onwards",
    metaDescription:
      "Serene Meadows, Kadamba Plateau — 71 premium 2 & 3 BHK apartments with atrium, pool, clubhouse and gym near Old Goa. ₹1.02 Cr onwards, possession December 2028.",
  },

  {
    slug: "mmirari-house",
    name: "Mmirari House",
    tagline: "Paddy-field-side living in Reis Magos",
    location: "Reis Magos, North Goa",
    category: "Apartments",
    hero: { src: "/projects/mmirari-0.jpg", alt: "Mmirari House facade at dusk, Reis Magos" },
    facts: [
      { label: "Configuration", value: "2 BHK apartments" },
      { label: "Saleable area", value: "1,263 – 1,760 sq ft" },
      { label: "Price", value: "₹1.54 Cr onwards" },
      { label: "Status", value: "Limited units remaining" },
    ],
    overview: {
      eyebrow: "The project",
      title: "Coastal living at its finest",
      paragraphs: [
        "Welcome to Mmirari House, an exclusive apartment and penthouse project in picturesque Reis Magos, North Goa. Set in the coastal zone adjoining beautiful paddy fields, it blends opulence and tranquillity — an ideal vacation home for those looking to unwind, and a compelling avenue for return on investment.",
        "Ground-floor residences carry their own private pool, deck and lawn share; penthouses add terrace pools; and every resident shares the expansive terrace infinity pool with its views of paddy fields and rolling hills. Indo-Portuguese architecture, elegant interiors and a gated address complete the picture.",
      ],
    },
    highlights: [
      { title: "Pools at every level", body: "Private plunge pools on the ground floor, terrace pools on the penthouses, and a shared rooftop infinity pool." },
      { title: "Paddy-field serenity", body: "Balconies and terraces opening onto the paddy fields and hills of Reis Magos." },
      { title: "Five minutes from Coco Beach", body: "5–10 minutes from Coco Beach, five-star hotels, casinos, malls and markets." },
      { title: "Boutique scale", body: "Just 18 semi-furnished residences in a G+3 gated building — limited units remain." },
    ],
    units: [
      { name: "Ground floor · private pool & lawn", saleable: "132 – 148 sq m saleable", price: "₹1.90 Cr onwards" },
      { name: "First & second floor · balcony", saleable: "115 – 125 sq m saleable", price: "₹1.54 Cr onwards" },
      { name: "Penthouse · terrace pool", saleable: "156 – 164 sq m saleable", price: "₹2.30 Cr onwards" },
    ],
    unitNote: "Carpet areas 680–757 sq ft. Semi furnished. 11 of 18 residences already sold; prices exclude GST, stamp duty and registration.",
    amenities: [
      "Terrace infinity pool with paddy-field views",
      "Private pools for ground-floor homes",
      "Terrace pools on penthouses",
      "Private lawns and wide balconies",
      "Semi furnished, air-conditioned homes",
      "Modular kitchen and wardrobes",
      "24×7 security in a gated community",
      "Car parking",
      "Vastu compliant",
      "Rental, concierge and property management services",
    ],
    gallery: [
      { src: "/projects/mmirari-0.jpg", alt: "Mmirari House facade at dusk" },
      { src: "/projects/mmirari-1.jpg", alt: "Mmirari House, Reis Magos" },
      { src: "/projects/mmirari-2.jpg", alt: "Interiors at Mmirari House" },
      { src: "/projects/mmirari-3.jpg", alt: "Mmirari House exterior with pool" },
      { src: "/projects/mmirari-4.jpg", alt: "Entrance gate at Mmirari House" },
      { src: "/projects/mmirari-5.jpg", alt: "Private plunge pool at Mmirari House" },
      { src: "/projects/mmirari-6.jpg", alt: "Living room at Mmirari House" },
      { src: "/projects/mmirari-7.jpg", alt: "Arched facade at Mmirari House" },
    ],
    locationCopy:
      "Reis Magos faces Panjim across the Mandovi — a heritage village of fort walls and fishing jetties on the coast's calmest stretch. Coco Beach, the Nerul river restaurants, Candolim and the capital are all minutes away.",
    distances: [
      { label: "Coco Beach", value: "5–10 min" },
      { label: "Five-star hotels & casinos", value: "5–10 min" },
      { label: "Candolim", value: "10–15 min drive" },
      { label: "Panaji", value: "15 min drive" },
    ],
    possession: "Limited units · ready inventory",
    priceLabel: "₹1.54 Cr onwards",
    metaDescription:
      "Mmirari House, Reis Magos — boutique 2 BHK residences with private plunge pools, terrace pools and a rooftop infinity pool over the paddy fields. ₹1.54 Cr onwards.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
