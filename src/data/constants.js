import SCENARIOS from "./scenarios";

export const CONFIDENCE_OPTIONS = [
  { label: "Not very confident", index: 0 },
  { label: "Somewhat confident", index: 1 },
  { label: "Confident", index: 2 },
  { label: "Very confident", index: 3 },
];

export const TOTAL_STEPS = SCENARIOS.length * 2; // 12

// Out of 12. Crossing this many misconceptions surfaces the Newcomer
// indicator alongside (not instead of) the person's real archetype.
export const NEWCOMER_FLAG_THRESHOLD = 5;

// TODO: confirm the final URL once the assessment has a permanent home,
// then update this single constant — it's used on the share links and
// the shareable result image.
export const SITE_URL = "artificiallyintelligent.uk";
