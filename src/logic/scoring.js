import ARCHETYPES from "../data/archetypes";
import { NEWCOMER_FLAG_THRESHOLD } from "../data/constants";

function classifyPct(t, e, c) {
  const vals = [
    { axis: "t", v: t },
    { axis: "e", v: e },
    { axis: "c", v: c },
  ].sort((a, b) => b.v - a.v);
  const [top, mid, low] = vals;
  const CENTER = 15;

  if (top.v - low.v <= CENTER) return "integrator";

  if (top.v - mid.v <= CENTER) {
    const pair = [top.axis, mid.axis].sort().join("");
    if (pair === "et") return "steward";
    if (pair === "ct") return "operator";
    if (pair === "ce") return "diplomat";
  }

  if (top.axis === "t") return "technologist";
  if (top.axis === "e") return "guardian";
  return "deliverer";
}

function computeResult(records, confidenceIndex) {
  const leanCounts = { technical: 0, ethical: 0, commercial: 0 };
  const misconceptionCategories = [];

  records.forEach((r) => {
    if (r.type === "technical") leanCounts.technical += 1;
    else if (r.type === "ethical") leanCounts.ethical += 1;
    else if (r.type === "commercial") leanCounts.commercial += 1;
    else if (r.type === "misconception") misconceptionCategories.push(r.category);
  });

  const leanTotal = leanCounts.technical + leanCounts.ethical + leanCounts.commercial;
  let techPct, ethicalPct, commercialPct;
  if (leanTotal === 0) {
    techPct = 33;
    ethicalPct = 33;
    commercialPct = 34;
  } else {
    techPct = Math.round((leanCounts.technical / leanTotal) * 100);
    ethicalPct = Math.round((leanCounts.ethical / leanTotal) * 100);
    commercialPct = 100 - techPct - ethicalPct;
  }

  const archetypeKey = classifyPct(techPct, ethicalPct, commercialPct);
  const archetype = ARCHETYPES[archetypeKey];
  const misconceptionCount = misconceptionCategories.length;
  const isNewcomerFlag = misconceptionCount > NEWCOMER_FLAG_THRESHOLD;

  return {
    techPct,
    ethicalPct,
    commercialPct,
    misconceptionCount,
    misconceptionCategories,
    isNewcomerFlag,
    archetype,
  };
}

function getCalibrationInsight(confidenceIndex, misconceptionCount) {
  const expected = [4, 2.5, 1, 0][confidenceIndex];
  const diff = misconceptionCount - expected;

  if (diff <= -1.5)
    return "You rated yourself less confident than this suggests you should be. Hardly any real misunderstandings showed up in how you answered.";
  if (diff <= 0.5)
    return "Your self-rated confidence and what actually showed up line up closely — a good sign that your sense of your own gaps is accurate.";
  if (diff <= 2)
    return "A few answers reflected real misunderstandings your stated confidence didn't anticipate. A small, common gap, worth noticing.";
  return "Your confidence and what actually showed up are notably out of step. That gap is worth taking seriously — it's harder to close a gap you don't think is there.";
}

function getMisconceptionInsight(count, categories) {
  if (count === 0) {
    return "None of your answers reflected a misunderstanding — a solid grasp of the fundamentals underneath whatever you leaned toward.";
  }
  const uniqueCategories = [...new Set(categories)];
  if (count <= NEWCOMER_FLAG_THRESHOLD) {
    return `A few of your answers touched on something you may not fully understand yet. Worth a closer look: ${uniqueCategories.join(", ")}.`;
  }
  return `More than ${NEWCOMER_FLAG_THRESHOLD} of your twelve answers reflected a genuine misunderstanding rather than a preference — showing up across ${uniqueCategories.join(", ")}. See the note below.`;
}

export { classifyPct, computeResult, getCalibrationInsight, getMisconceptionInsight };
