// The eight result archetypes. Seven come from where a person's dot lands
// on the technical/ethical/commercial triangle (three corners, three
// edges, one center). "newcomer" is not a triangle position — it's a
// supplementary indicator shown alongside the real archetype when
// misconceptions cross the threshold defined in constants.js.

const ARCHETYPES = {
  technologist: {
    name: "The Technologist",
    summary:
      "Your instincts run technical first. You're fluent in how these tools actually behave, how they fail, what verification really requires. The parts of the picture that lag are ethical and commercial: how a decision affects the people it touches, and what the business realities around you actually demand.",
    recommendations: [
      "Before finishing a task, ask who's affected if this is wrong, not just whether it's technically sound.",
      "Notice when a deadline or a client relationship should change your approach, not just the accuracy of the output.",
      "Your rigor is an asset. Pair it deliberately with a colleague who reads the room, rather than assuming it covers the whole picture.",
    ],
  },
  guardian: {
    name: "The Guardian",
    summary:
      "Protecting people is where your instincts go first, disclosure, escalation, caution about what could go wrong. What's less developed is the technical grounding underneath that instinct, and a read on the commercial pressure that usually forces these calls in the first place.",
    recommendations: [
      "Spend time on the mechanics — understanding why these tools fail will sharpen exactly the caution you already lean on.",
      "Your instinct to protect is right more often than not. Pair it with an understanding of what's actually commercially at stake, so it's targeted rather than blanket.",
      "You're a natural fit to shape policy on disclosure and data handling. Bring in someone technically strong to pressure-test the detail.",
    ],
  },
  deliverer: {
    name: "The Deliverer",
    summary:
      "Getting things out the door, on time, for the client in front of you, is what drives your decisions. That's a real and valuable instinct. What tends to fall away under that pressure is the technical verification and the ethical disclosure that would normally slow things down.",
    recommendations: [
      "Before sending something under pressure, ask what the cost is if it's wrong, not just what the cost is if it's late.",
      "Build one small verification habit into your fastest workflows, so speed and accuracy don't have to trade off completely.",
      "Practise flagging what wasn't checked, rather than letting speed imply certainty it doesn't have.",
    ],
  },
  steward: {
    name: "The Steward",
    summary:
      "You're careful and capable at once, technically grounded and genuinely principled about how AI output gets used. What's less present is a strong read on the commercial pressure that usually forces the trade-offs you're navigating so carefully.",
    recommendations: [
      "Get closer to the deadlines and client stakes driving the people around you. It'll sharpen when your caution is essential and when it's optional.",
      "You're well placed to write the guideline other people default to. Consider making your standards explicit rather than just personal practice.",
      "Watch for the tip-over point where rigor becomes friction. Not every decision carries the same stakes.",
    ],
  },
  operator: {
    name: "The Operator",
    summary:
      "You get results, efficiently, competently, on time. Your technical instincts are strong and you understand the commercial reality you're working in. The part that hasn't caught up is disclosure: making sure the people affected by a decision actually know what was and wasn't checked.",
    recommendations: [
      "Before something ships, ask what wasn't checked, and say so, rather than letting a polished result imply full confidence.",
      "Escalating a risk is not a failure of competence. It's often the more accountable move, and it costs you very little.",
      "Look for the moments where disclosure and speed don't actually trade off. Grounding a claim in a citable source gets you both.",
    ],
  },
  diplomat: {
    name: "The Diplomat",
    summary:
      "You read a room and a deadline well, and you're genuinely protective of the people around a decision. What's less developed is the technical grounding: understanding why these tools behave the way they do, rather than managing around the uncertainty.",
    recommendations: [
      "Spend time on the mechanics. It'll make your diplomatic instincts sharper and more specific, not just more cautious.",
      "You're good at building trust around a decision. Pair that with someone who can tell you exactly what should and shouldn't be trusted.",
      "Practise asking the technical question first, even when the commercial and interpersonal read is your instinct.",
    ],
  },
  integrator: {
    name: "The Integrator",
    summary:
      "You don't lean hard in one direction. Across these scenarios you tended to weigh technical accuracy, ethical cost, and commercial reality together rather than defaulting to one. That's a genuinely rare habit, and it usually shows up as slower, more deliberate decisions rather than confident fast ones.",
    recommendations: [
      "Your instinct to weigh everything at once is valuable, but can be slow under real time pressure. Practise a fast version of your own judgement for when speed actually matters.",
      "You're well placed to mediate between technically-led and commercially-led colleagues, since you can see both cases clearly.",
      "Make your reasoning explicit when you can. Integrative judgement is hard for others to learn from if it stays implicit.",
    ],
  },
  newcomer: {
    name: "Newcomer indicator",
    summary:
      "A significant share of your answers reflected a genuine misunderstanding of how these tools actually work, not a values trade-off, an actual gap. The persona above is real, based on what you did lean toward when you weren't working from a misunderstanding, but it's worth treating as a snapshot built on a still-developing foundation rather than a settled type.",
    recommendations: [
      "Start with the mechanics — understanding how these tools generate output changes how you read everything they produce.",
      "Before using AI professionally, build the habit of asking two questions: is this actually right, and who's affected if it's not?",
      "Come back to this once the fundamentals feel solid. The trade-offs between technical, ethical, and commercial judgement will make a lot more sense once the basics aren't in question.",
    ],
  },
};
export default ARCHETYPES;
