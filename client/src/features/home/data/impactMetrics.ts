/**
 * Original company impact metrics — restored to the pre-refinement values.
 *
 * These four figures are the original headline band. Workshop-specific figures
 * (students trained, workshops conducted, colleges collaborated) are owned by
 * `features/workshops/data/workshopsData.ts` and are rendered on the Workshops
 * page only, so nothing is repeated in two places.
 */
export interface ImpactMetric {
  target: number;
  suffix: string;
  label: string;
  subtext: string;
  /** `false` for fixed facts that should not count up. */
  animated: boolean;
}

export const impactMetrics: ImpactMetric[] = [
  {
    target: 1000,
    suffix: '+',
    label: 'Students Trained',
    subtext: 'Practical engineering & industry competencies',
    animated: true,
  },
  {
    target: 50,
    suffix: '+',
    label: 'Hands-on Projects Completed',
    subtext: 'Hardware prototypes & software solutions',
    animated: true,
  },
  {
    target: 10,
    suffix: '+',
    label: 'R&D Projects In Progress',
    subtext: 'Applied research, papers & patent filings',
    animated: true,
  },
  {
    target: 30,
    suffix: '+',
    label: 'Colleges Connected',
    subtext: 'Institutional skill development partnerships',
    animated: true,
  },
];