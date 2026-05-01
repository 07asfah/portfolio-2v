import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "easyfolio",
    name: "EasyFolio",
    tagline:
      "Personal portfolio website built with modular SCSS — one partial per section, no framework, just clean structured Sass.",
    year: "2024",
    role: "Designer & Developer",
    stack: ["HTML", "SCSS", "CSS", "JSON", "Markdown"],
    badge: "WEBSITE",
    github: "https://github.com/07asfah/easyfolio",
    overview:
      "Portfolio website with a fully modular SCSS architecture — every section (hero, about, resume, portfolio, services, skills, testimonials, contact, FAQ, header, footer) lives in its own partial. No framework, no abstractions; just structured Sass and clean HTML.",
    architecture: "",
    decisions: [],
    security: [],
    tradeoffs: [],
  },
  {
    slug: "restaurantly",
    name: "Restaurantly",
    tagline:
      "Single-page restaurant website built with Bootstrap 5 and modular SCSS — 12 section partials, no backend, no build pipeline.",
    year: "2024",
    role: "Designer & Developer",
    stack: ["HTML", "SCSS", "CSS", "JavaScript", "Bootstrap"],
    badge: "LIVE",
    github: "https://github.com/07asfah/restaurant-website",
    demo: "https://restaurant-website-plum-five.vercel.app/",
    overview:
      "Static restaurant site organised as a single page with 12 SCSS partials — header, home, about, why, menu, specials, events, book, chefs, gallery, contact, footer. Bootstrap 5 is the only npm dependency; everything else is hand-written HTML, Sass, and vanilla JavaScript.",
    architecture: "",
    decisions: [],
    security: [],
    tradeoffs: [],
  },
  {
    slug: "library",
    name: "Library",
    tagline:
      "Books library app powered by the Google Books API — React 19 + Vite + Tailwind, with fast search and clean layouts.",
    year: "2025",
    role: "Developer",
    stack: ["React", "Vite", "Tailwind CSS", "Axios", "JavaScript"],
    badge: "LIVE",
    github: "https://github.com/07asfah/library",
    demo: "https://library-sandy-xi.vercel.app/",
    overview:
      "Single-page React app that searches and browses books through the Google Books API. React Router for navigation, Tailwind for styling, Axios for the API layer, and Lucide for icons. Vite as the build tool — no TypeScript, just clean JSX.",
    architecture: "",
    decisions: [],
    security: [],
    tradeoffs: [],
  },
  {
    slug: "logistics",
    name: "Logistics",
    tagline:
      "Full-stack SaaS platform for an international freight forwarder — covering quoting, booking, consolidation, customs, document vault, and multi-currency invoicing, with an audited shipment state machine and JWT-secured admin SPA.",
    year: "2025",
    role: "Full-Stack Developer",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "JWT",
      "Cloudinary",
    ],
    badge: "CASE STUDY",
    rich: true,

    overview:
      "Production-grade SaaS for a custodian-level freight forwarder — takes physical possession of cargo, not just a broker. Covers the entire lifecycle: lead capture → quote → booking → consolidation → multi-modal routing → customs → document vault → invoicing → delivery.",

    description: [
      "Zenith Shipment is a full-stack platform built for an international freight forwarder that operates as a custodian — physically takes possession of the cargo, doesn't just connect shippers and carriers. That distinction shows up everywhere in the data model: the system carries every B/L field a real forwarder needs (marks & numbers, HS code, hazmat class, temperature range, separate cargo and document cutoff dates), not just contact info.",
      "The architecture is split between a Next.js 14 frontend (public marketing site + token-gated admin SPA, both fully internationalised in EN/FR) and an Express + TypeScript API backed by Prisma and PostgreSQL. State changes that span multiple tables — shipment status with audit log, consolidation cascades — are wrapped in transactions so partial failures cannot corrupt history.",
      "What makes it more than a CRUD demo: a formal state machine for shipments with mandatory-note enforcement, cascading status logic across consolidation aggregates, industry-correct cargo math (CBM, mode-specific volumetric divisors, chargeable weight), container fit validation, document auto-versioning, and a pricing engine with cost/sell margin tracking on dated rate cards.",
    ],

    stats: [
      { label: "DB models",     value: "17" },
      { label: "API modules",   value: "15" },
      { label: "Admin pages",   value: "18" },
      { label: "Languages",     value: "EN/FR" },
    ],

    architecture: `
┌────────────────────────────┐         ┌──────────────────────────────┐
│  Next.js 14 Frontend       │  HTTPS  │  Express + TypeScript API    │
│  (App Router, i18n EN/FR)  │ ──────► │  /api/* (15 route groups)    │
│  - Public marketing site   │         │  - JWT auth middleware       │
│  - Admin SPA (token-gated) │         │  - Service layer (business)  │
└────────────────────────────┘         │  - Prisma ORM                │
            │                          └──────────────┬───────────────┘
            │                                         │
            ▼                                         ▼
   ┌──────────────────┐                    ┌────────────────────────┐
   │ Cloudinary CDN   │                    │ PostgreSQL             │
   │ (file uploads)   │                    │ 17 relational models   │
   └──────────────────┘                    └────────────────────────┘
            ▲                                         ▲
            │                                         │
   ┌──────────────────┐                    ┌────────────────────────┐
   │ Nodemailer/Gmail │                    │ Reference generators   │
   │ SMTP (notif.)    │                    │ ZS-SHP-YYYYMM-NNNNN    │
   └──────────────────┘                    └────────────────────────┘
`,

    techStack: [
      {
        category: "Frontend",
        items: [
          "Next.js 14 (App Router)",
          "React 18",
          "TypeScript 5.7",
          "Tailwind CSS 3.4",
          "next-intl (EN/FR)",
          "Axios + interceptors",
          "jsPDF + autotable",
        ],
      },
      {
        category: "Backend",
        items: [
          "Node.js + TypeScript",
          "Express 4.21",
          "Prisma 5.22",
          "JWT (7-day) + bcryptjs",
          "Multer (10 MB cap)",
          "Cloudinary",
          "Nodemailer / Gmail SMTP",
        ],
      },
      {
        category: "Infra & data",
        items: [
          "PostgreSQL",
          "Cloudinary CDN",
          "CORS locked to FRONTEND_URL",
          "Reference number generators",
          "Prisma transactions",
        ],
      },
    ],

    dbModels: [
      { domain: "Auth & content",      models: ["Admin", "Article", "Email", "Setting"] },
      { domain: "CRM",                 models: ["Customer"] },
      { domain: "Sales pipeline",      models: ["Quote", "QuoteLine"] },
      { domain: "Operations core",     models: ["Shipment", "CargoLine", "ShipmentStatus"] },
      { domain: "Consolidation",       models: ["Consolidation"] },
      { domain: "Routing",             models: ["RouteLeg"] },
      { domain: "Documents",           models: ["Document"] },
      { domain: "Customs",             models: ["CustomsDeclaration"] },
      { domain: "Finance",             models: ["Invoice", "InvoiceItem"] },
      { domain: "Pricing",             models: ["Rate", "Surcharge", "CarrierRateCard"] },
      { domain: "Scheduling",          models: ["Appointment"] },
    ],

    apis: [
      { method: "ANY", path: "/api/auth",           description: "JWT login, /me validation" },
      { method: "ANY", path: "/api/articles",       description: "Multilingual blog CRUD" },
      { method: "ANY", path: "/api/quotes",         description: "Find-or-create customer + quote" },
      { method: "ANY", path: "/api/customers",      description: "CRM operations" },
      { method: "ANY", path: "/api/emails",         description: "Inbox + admin replies" },
      { method: "ANY", path: "/api/upload",         description: "Cloudinary file upload" },
      { method: "ANY", path: "/api/shipments",      description: "Lifecycle state machine + audit" },
      { method: "ANY", path: "/api/consolidations", description: "Container loading engine" },
      { method: "ANY", path: "/api/documents",      description: "Document vault + versioning" },
      { method: "ANY", path: "/api/routing",        description: "Multi-modal route legs" },
      { method: "ANY", path: "/api/customs",        description: "HS code + duty/tax declarations" },
      { method: "ANY", path: "/api/invoices",       description: "Multi-currency invoicing" },
      { method: "ANY", path: "/api/rates",          description: "Carrier rate cards + surcharges" },
      { method: "ANY", path: "/api/appointments",   description: "Calendar / pickups / inspections" },
      { method: "ANY", path: "/api/settings",       description: "Admin configuration" },
      { method: "GET", path: "/api/health",         description: "Liveness probe" },
    ],

    journey: [
      {
        title: "Lead capture",
        body: "Visitor lands on the public marketing site, browses /services and /blog, submits the /quote or /contact form.",
      },
      {
        title: "Quote intake",
        body: "Public POST /api/quotes — find-or-create customer, persist quote (status: draft), send admin notification email (best-effort, swallowed errors so the public form never 500s).",
      },
      {
        title: "Sales workflow",
        body: "Admin opens /admin/quotes, builds a priced quote with QuoteLine items (cost + sell + margin %), changes status draft → sent. Customer accepts → quote can be converted to a shipment.",
      },
      {
        title: "Booking",
        body: "Shipment created with shipper, consignee, cargo lines, HS code, declared value, insurance, special handling. Reference auto-generated. Audit log starts at draft.",
      },
      {
        title: "Consolidation",
        body: "LCL shipments grouped into a container; engine validates physical fit and refuses overflow. Container is sealed (closed + container/seal numbers captured).",
      },
      {
        title: "Departure",
        body: "Consolidation status → departed, all contained shipments cascade to in_transit with actualPickup stamped, audit entries auto-created.",
      },
      {
        title: "Customs",
        body: "Customs declaration filed (HS code, duty, broker reference); shipment moves through arrived → customs_clearance → ready_for_delivery → delivered.",
      },
      {
        title: "Documents",
        body: "HBL, packing list, commercial invoice, arrival notice, delivery order uploaded to the document vault, auto-versioned per shipment.",
      },
      {
        title: "Billing",
        body: "Invoice generated from quote/shipment line items, multi-currency, with line categories (freight / duty / handling / insurance / storage / docs). Status: draft → sent → paid.",
      },
      {
        title: "Closure",
        body: "Delivery confirmed, actualDelivery stamped, audit log shows full history with timestamps and the admin email of who made each move.",
      },
    ],

    features: [
      {
        title: "Shipment state machine",
        body: "Formal transition table — draft → booked → in_transit → arrived → customs_clearance → ready_for_delivery → delivered. Side branches for customs_hold and on_hold. Mandatory notes on hold/cancel transitions. Every transition writes to ShipmentStatus inside a Prisma transaction so status and history can never drift.",
      },
      {
        title: "Container loading engine",
        body: "canFitInContainer() checks weight + volume against CONTAINER_SPECS (20ft / 40ft / 40ftHC / 45ft) before adding a shipment. Enforces FCL single-customer rule. Cascades departure / arrival / delivery status to every contained shipment with auto audit-log entries.",
      },
      {
        title: "Cargo math + reference generators",
        body: "CBM from L×W×H, mode-specific volumetric divisors (Air 6000, Sea 1000, Road/Rail 3000), chargeable weight = max(actual, volumetric). Deterministic IDs: ZS-SHP-YYYYMM-NNNNN, ZS-CON-..., ZS-INV-..., ZSHBL-...",
      },
      {
        title: "Document vault with auto-versioning",
        body: "Type-locked allowlist: HBL, MBL, commercial_invoice, packing_list, certificate_of_origin, customs_declaration, arrival_notice, delivery_order. A second upload of the same type for the same shipment auto-creates version: 2; the prior is preserved.",
      },
      {
        title: "Pricing engine with margins",
        body: "Active rate lookup applies validity windows automatically. customerRate = baseRate × (1 + markup%). calculateQuote() switches on rateUnit (per_kg / per_cbm / per_container / flat) to project final cost from the inbound weight/volume.",
      },
      {
        title: "Admin SPA — 18 token-gated pages",
        body: "Dashboard with hand-rolled SVG smooth-curve area chart (revenue vs cost, no charting dependency). Collapsible sidebar. Token validation against /api/auth/me on every layout mount with auto-redirect on 401. Active-route highlighting.",
      },
    ],

    decisions: [
      {
        title: "Service-layer architecture, not fat controllers",
        body: "Routes → controllers → services → lib. Controllers shape requests/responses; all business rules and transactions live in services. This is what makes the state-machine and consolidation cascades testable in isolation.",
      },
      {
        title: "Whitelist field updates",
        body: "updateShipment() and updateConsolidation() only accept a fixed allowlist of fields. Mass-assignment is impossible; nobody can sneak in actualDelivery via a forged JSON body.",
      },
      {
        title: "Transactional status + audit writes",
        body: "Every status change writes the new status AND the audit-log entry inside the same Prisma transaction. State and history can never drift apart on a partial failure.",
      },
      {
        title: "Hand-rolled SVG charts on the dashboard",
        body: "Revenue/cost area chart is pure SVG paths via Bezier control points. No charting dependency in the bundle, full control over the look, fast.",
      },
    ],

    security: [
      "Password hashing with bcryptjs — passwords never stored or logged in plaintext",
      "JWT verification on every protected endpoint via authMiddleware",
      "CORS locked to a single origin via FRONTEND_URL env, credentials: true",
      "Generic auth errors (`Invalid credentials`) — no user enumeration",
      "File upload type allowlist + 10 MB cap (jpg/png/pdf/docx)",
      "Cloudinary delegation — files never touch the API filesystem",
      "Server-side enforcement of state-transition rules (never trusted from the client)",
      "Atomic writes for multi-table state changes via prisma.$transaction([...])",
      "Whitelist-based field updates as defense against mass-assignment",
    ],

    securityDebt: [
      "JWT_SECRET falls back to literal 'secret' if env missing — should fail-fast in production",
      "No rate limiting on /api/auth/login (next: express-rate-limit)",
      "No refresh tokens — re-login required after 7 days",
      "Tokens live in localStorage (vulnerable to XSS); should move to httpOnly cookies",
      "Hand-rolled per-controller validation; should adopt zod for schema-first request validation",
    ],

    tradeoffs: [
      {
        gave_up: "Per-tenant database isolation",
        got: "Simpler migrations and cross-customer reporting in a single query",
      },
      {
        gave_up: "Charting library on the dashboard",
        got: "Pure SVG with full visual control and zero bundle weight",
      },
      {
        gave_up: "Soft deletes everywhere",
        got: "Cleaner queries; deletes are rare and audited explicitly",
      },
    ],

    highlights: [
      "Domain-correct modeling — every B/L field a real forwarder needs (marks & numbers, HS code, hazmat, temperature, separate cargo/document cutoffs)",
      "Formal state machine with mandatory-note enforcement and audit trail in a transactional write — failures can't desync state from history",
      "Cascading status logic across aggregate roots (consolidation → contained shipments) with auto-generated audit notes",
      "Industry math built in: CBM, mode-specific volumetric divisors, chargeable weight, container fit checks",
      "Multi-currency, multi-language end-to-end — EN/FR public site, EN/FR/AR articles, currency on every monetary entity",
      "Pricing engine with cost/sell margin tracking and dated rate validity windows",
      "Document vault with type allowlist and per-shipment auto-versioning",
      "15 backend modules · 18 admin pages · 17 DB models — meaningful scope, not a toy",
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
