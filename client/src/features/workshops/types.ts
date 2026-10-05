/**
 * Workshops feature types.
 * Kept deliberately narrow so the public workshop listing can be sourced
 * from a static dataset today and a REST endpoint later without UI changes.
 */

export type WorkshopAudience =
  | 'Engineering Colleges'
  | 'Polytechnic Colleges'
  | 'Academic Institutions'
  | 'Students'
  | 'Technical Communities';

export interface Workshop {
  /** Stable identifier used for anchors and future detail routes. */
  id: string;
  /** Short editorial reference code rendered on the card (e.g. WS-01). */
  code: string;
  /** Workshop title as presented publicly. */
  title: string;
  /** Host institution name. */
  institution: string;
  /** City / region where the workshop was conducted. */
  location: string;
  /** Primary audience classification. */
  audience: WorkshopAudience;
  /** One-sentence summary of what participants did. */
  summary: string;
  /** Two or three concise technical focus tags. */
  focus: string[];
  /**
   * Optional photography for the workshop.
   * Intentionally optional: no institutional workshop photographs exist in the
   * project yet, so cards fall back to a typographic treatment instead of
   * substituting unrelated stock imagery.
   */
  image?: string;
  imageAlt?: string;
}

export interface WorkshopStat {
  /** Display value. Textual values (e.g. "Hands-on") are allowed. */
  value: string;
  label: string;
}