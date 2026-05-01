export type ProjectStat = { label: string; value: string };
export type ProjectApi = { method: string; path: string; description?: string };
export type ProjectJourneyStep = { title: string; body: string };
export type ProjectDbDomain = { domain: string; models: string[] };
export type ProjectTechCategory = { category: string; items: string[] };

export type Project = {
  slug: string;
  name: string;
  /** short tagline shown on the card / featured header */
  tagline: string;
  year: string;
  role: string;
  stack: string[];

  /** small badge on the card (e.g. "OPEN SOURCE", "LIVE", "CASE STUDY") */
  badge?: string;
  /** external links — shown as icons in the card top-right */
  github?: string;
  demo?: string;
  /** main hero screenshot for the card / featured layout */
  screenshot?: string;

  /** mark true to render a full case-study block instead of just a card */
  featured?: boolean;

  /**
   * mark true to make the card clickable and open the deep-dive modal.
   * If a project has rich data (description, stats, apis, etc.) this should
   * be true so the user can click into it.
   */
  rich?: boolean;

  /** Long-form fields (used by the modal / featured layout) */
  overview: string;
  /** longer multi-paragraph description (modal) */
  description?: string[];
  /** narrative paragraph: how the system works end-to-end */
  howItWorks?: string;
  /** stat tiles — short label + impressive value */
  stats?: ProjectStat[];
  /** technology stack grouped by category (frontend/backend/db/etc.) */
  techStack?: ProjectTechCategory[];
  /** database models grouped by domain */
  dbModels?: ProjectDbDomain[];
  /** API endpoints / route groups */
  apis?: ProjectApi[];
  /** customer journey end-to-end */
  journey?: ProjectJourneyStep[];
  /** features / dashboard / admin walk-through */
  features?: { title: string; body: string }[];
  /** ASCII architecture diagram */
  architecture: string;
  /** key engineering decisions and why */
  decisions: { title: string; body: string }[];
  /** security measures baked in */
  security: string[];
  /** known security debt — surfaced honestly as "next steps" */
  securityDebt?: string[];
  /** what was traded for what */
  tradeoffs: { gave_up: string; got: string }[];
  /** key highlights — what makes this not a CRUD demo */
  highlights?: string[];
  /** optional gallery of additional screenshots */
  screenshots?: { src: string; caption?: string }[];
};
