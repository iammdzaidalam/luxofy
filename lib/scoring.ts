export type ScoreBand = "HOT" | "WARM" | "COLD";

const BUDGET_SCORES: Record<string, number> = {
  "5Cr+": 100,
  "2-5Cr": 80,
  "1-2Cr": 60,
  "50L-1Cr": 40,
  "Under 50L": 20,
};

const TIMELINE_SCORES: Record<string, number> = {
  Immediate: 100,
  "3 Months": 80,
  "6 Months": 60,
  "12 Months": 40,
  "Just Exploring": 20,
};

const OCCUPATION_SCORES: Record<string, number> = {
  Founder: 100,
  CXO: 90,
  Doctor: 90,
  NRI: 90,
  "Business Owner": 90,
  Professional: 70,
  Employee: 60,
  Other: 50,
};

const PURPOSE_SCORES: Record<string, number> = {
  Investment: 100,
  "Holiday Home": 80,
  Rental: 75,
  Retirement: 60,
  "Self Use": 55,
};

const WEIGHTS = {
  budget: 0.35,
  timeline: 0.3,
  purpose: 0.2,
  occupation: 0.15,
};

export interface ScoringInput {
  budget: string;
  timeline: string;
  occupation: string;
  purpose: string;
}

export function computeScore(input: ScoringInput): { score: number; band: ScoreBand } {
  const budget = BUDGET_SCORES[input.budget] ?? 20;
  const timeline = TIMELINE_SCORES[input.timeline] ?? 20;
  const occupation = OCCUPATION_SCORES[input.occupation] ?? 50;
  const purpose = PURPOSE_SCORES[input.purpose] ?? 50;

  const score = Math.round(
    budget * WEIGHTS.budget +
      timeline * WEIGHTS.timeline +
      purpose * WEIGHTS.purpose +
      occupation * WEIGHTS.occupation
  );

  const band: ScoreBand = score >= 80 ? "HOT" : score >= 60 ? "WARM" : "COLD";
  return { score, band };
}
