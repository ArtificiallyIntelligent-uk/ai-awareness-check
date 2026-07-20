// Six scenarios, one per real-world theme (Technical, Ethical, Commercial,
// Environmental, Misinformation, Financial). Every question, at every step,
// has exactly four answers: one technical, one ethical, one commercial, one
// misconception. Branch pairings vary per scenario — whichever grouping
// fits the specific story best.

const SCENARIOS = [
  {
    id: "s1",
    category: "Technical",
    step1: {
      text: "An AI tool writes a piece of code that handles customer payment information. What's your first move before it goes live?",
      options: [
        { text: "Run it through your existing automated test suite, specifically for edge cases involving payment data", type: "technical", branch: "A" },
        { text: "Flag to the team that this section touches payment data and should get a second person's review before merging", type: "ethical", branch: "A" },
        { text: "Merge it now to keep pace with the sprint deadline, and review more thoroughly next cycle if needed", type: "commercial", branch: "B" },
        { text: "AI-generated code is trained on secure coding patterns by default, so it's generally safe to merge without extra scrutiny", type: "misconception", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "The initial checks come back fine, and a colleague reviews it too. You're both still unsure about one edge case the AI might not have accounted for. What's the reasonable next step?",
        options: [
          { text: "Write an additional test specifically targeting the edge case you're both unsure about", type: "technical" },
          { text: "Document the uncertainty in the pull request and let the reviewer make the final call on whether it ships", type: "ethical" },
          { text: "Ship it — the tests pass and two people have looked at it, that's a reasonable bar", type: "commercial" },
          { text: "If a human reviewed it and the tests pass, the AI's involvement doesn't add any extra risk beyond normal code", type: "misconception" },
        ],
      },
      B: {
        text: "It goes live. Two weeks later, a security check finds a weakness in exactly the situation that wasn't checked. What's the right response now?",
        options: [
          { text: "Patch it immediately, and add regression tests covering that class of vulnerability going forward", type: "technical" },
          { text: "Disclose the issue to the teams or stakeholders it could actually affect, not just quietly patch it", type: "ethical" },
          { text: "Patch it quietly and move on — raising it further just slows the team down over a fixed issue", type: "commercial" },
          { text: "Since it was an AI-generated bug rather than a human one, it's more a tooling limitation to note than a process failure", type: "misconception" },
        ],
      },
    },
  },
  {
    id: "s2",
    category: "Ethical",
    step1: {
      text: "Your company starts using an AI tool to filter job applications before a person reviews them. What's the first concern you'd raise?",
      options: [
        { text: "Whether the tool might be systematically screening out certain groups of candidates without anyone noticing", type: "ethical", branch: "A" },
        { text: "Whether the tool's accuracy has actually been validated against real hiring outcomes, not just resume-matching metrics", type: "technical", branch: "A" },
        { text: "Whether it's actually saving the team meaningful time compared to the previous process", type: "commercial", branch: "B" },
        { text: "As long as the tool doesn't use protected characteristics like race or gender as inputs, it can't produce a discriminatory result", type: "misconception", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "You ask for a proper check on fairness. It comes back showing the tool treats different groups roughly the same — but only on a few specific measures. What's the reasonable next move?",
        options: [
          { text: "Ask specifically what was and wasn't tested before treating the audit as reassurance", type: "technical" },
          { text: "Push for a broader audit before fully trusting the result, since a clean result on limited metrics doesn't rule out subtler patterns", type: "ethical" },
          { text: "Treat it as sufficient for now — a clean audit is a reasonable basis to keep using the tool", type: "commercial" },
          { text: "If the audit came back clean, the tool has effectively been proven fair going forward", type: "misconception" },
        ],
      },
      B: {
        text: "The tool's been running a few months. A hiring manager mentions offhand that the shortlisted candidates have looked unusually similar to each other lately. What's the right response?",
        options: [
          { text: "Pull the data and check whether the pattern is actually statistically meaningful, or just a small-sample coincidence", type: "technical" },
          { text: "Pause reliance on the tool and investigate whether it's systematically skewing who gets shortlisted", type: "ethical" },
          { text: "Note it, but don't slow down the hiring pipeline over an offhand comment without more evidence", type: "commercial" },
          { text: "Since the tool was validated at launch, this is more likely down to the hiring manager's own bias than the tool itself", type: "misconception" },
        ],
      },
    },
  },
  {
    id: "s3",
    category: "Commercial",
    step1: {
      text: "Your team is under pressure to launch a client marketing campaign faster than usual. Someone suggests using AI to generate most of the adverts to hit the deadline. What's your view?",
      options: [
        { text: "Worth doing — the deadline and client relationship matter more here than every line being hand-written", type: "commercial", branch: "A" },
        { text: "AI-generated marketing copy is now essentially indistinguishable from human-written copy, so there's no real downside to using it directly", type: "misconception", branch: "A" },
        { text: "Fine in principle, but only with a real review step to catch anything factually or tonally off before it goes out", type: "technical", branch: "B" },
        { text: "The client should be told AI was used in the process, even if the final copy is edited and approved by a person", type: "ethical", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "The campaign goes out on the tight timeline. A week in, the client notices a few lines read a bit generic and asks if AI was involved. What's the better way to handle that?",
        options: [
          { text: "Use it as a prompt to actually tighten the review process for the next round of copy", type: "technical" },
          { text: "Be straightforward that AI was used as part of the process, alongside human review and edits", type: "ethical" },
          { text: "Reassure them the campaign results are what matter, not how it was produced", type: "commercial" },
          { text: "Since the copy was technically approved by a person, it's accurate to describe it as human-written", type: "misconception" },
        ],
      },
      B: {
        text: "Your manager pushes back on telling the client AI was used, worried it'll make them nervous about the whole idea. What's the reasonable way to handle that?",
        options: [
          { text: "Offer to show the client the review process itself, so the conversation is grounded in what's actually being checked", type: "technical" },
          { text: "Hold the line on disclosure — being upfront now avoids a bigger trust problem if it comes out later", type: "ethical" },
          { text: "Frame the disclosure around the review process and quality controls, so it reads as reassuring rather than risky", type: "commercial" },
          { text: "Clients generally don't need to know about AI use in the copy process unless they explicitly ask", type: "misconception" },
        ],
      },
    },
  },
  {
    id: "s4",
    category: "Environmental",
    step1: {
      text: "Your company is deciding whether to use an AI tool to recreate every photo in its product catalogue as standard practice, rather than only using it selectively for new products. What's your first instinct?",
      options: [
        { text: "Ask how much compute and resource cost is actually involved at that scale before committing to it as routine", type: "technical", branch: "A" },
        { text: "Push to only use it where there's a genuine need, rather than defaulting to it just because it's available", type: "ethical", branch: "A" },
        { text: "Worth doing broadly if it noticeably cuts costs and turnaround time compared to traditional photography", type: "commercial", branch: "B" },
        { text: "Since it's software rather than physical production, this kind of AI use doesn't really have a meaningful resource cost", type: "misconception", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "It turns out there's a real cost involved — in computing power and resources — but it's fairly small at your company's current size. Does that change your view?",
        options: [
          { text: "Worth factoring into future decisions as you scale, even if it's modest now", type: "technical" },
          { text: "Still worth defaulting to selective use where there's genuine need, rather than routine use just because the cost is currently manageable", type: "ethical" },
          { text: "Yes — if the cost is modest and the benefit is real, that's a reasonable basis to use it more broadly", type: "commercial" },
          { text: "If the cost is currently modest, it will likely stay modest as usage scales up", type: "misconception" },
        ],
      },
      B: {
        text: "It becomes standard practice. Six months in, the costs of running the AI image tool have grown a lot as the catalogue expanded. What's the reasonable next step?",
        options: [
          { text: "Review the actual cost and resource usage data properly before deciding whether to continue at this scale", type: "technical" },
          { text: "Revisit whether routine use was ever the right default, versus reserving it for genuine need", type: "ethical" },
          { text: "Look for ways to reduce cost, like batching or a cheaper model tier, while keeping the same broad usage", type: "commercial" },
          { text: "Since the cost grew in proportion to the catalogue, it's simply a fixed cost of doing business at that scale", type: "misconception" },
        ],
      },
    },
  },
  {
    id: "s5",
    category: "Misinformation",
    step1: {
      text: "A colleague shares a statistic from an AI-generated summary of \"recent industry research\" to support a proposal ahead of an upcoming meeting. What's your first move?",
      options: [
        { text: "Trace the statistic back to an actual, checkable primary source before it's used", type: "technical", branch: "A" },
        { text: "Flag to your colleague that AI-summarised \"research\" should always be checked before being presented as fact, especially externally", type: "ethical", branch: "A" },
        { text: "If the meeting is soon and the stat sounds directionally right, it's probably fine to use with a light caveat", type: "commercial", branch: "B" },
        { text: "If the AI cites a source alongside the statistic, that's generally enough to treat it as verified", type: "misconception", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "You trace the statistic and can't actually find the source it claims to come from. What's the reasonable next step?",
        options: [
          { text: "Search more broadly for the actual original data, since the number might still be real even if the citation is wrong", type: "technical" },
          { text: "Tell your colleague directly that the stat couldn't be verified, before it goes anywhere near the meeting", type: "ethical" },
          { text: "Swap it for a different, easily-verifiable stat rather than spending more time chasing this one down", type: "commercial" },
          { text: "If a specific-sounding statistic can't be traced to a real source, it was probably paraphrased from a real one rather than invented outright", type: "misconception" },
        ],
      },
      B: {
        text: "The stat gets used in the meeting. Afterward, someone senior asks where it came from, and you realise it can't actually be verified. What's the right response?",
        options: [
          { text: "Go back and properly verify or correct the number as soon as possible, and communicate the correction", type: "technical" },
          { text: "Be upfront that the source couldn't be verified and it shouldn't have been used without checking", type: "ethical" },
          { text: "Downplay it — the meeting's already happened, and revisiting it just draws more attention to the mistake", type: "commercial" },
          { text: "Since the number was directionally plausible and no one has disputed it yet, it's probably fine to leave as-is", type: "misconception" },
        ],
      },
    },
  },
  {
    id: "s6",
    category: "Financial",
    step1: {
      text: "Your finance team starts using an AI tool to help write predictions about how the business will perform in the coming months. What's your first instinct about how to use it?",
      options: [
        { text: "Use it to draft a first pass, but have someone independently sanity-check the assumptions and numbers before they reach any decision", type: "technical", branch: "A" },
        { text: "Make sure whoever ultimately relies on the forecast knows which parts were AI-assisted, especially if it affects strategic decisions", type: "ethical", branch: "A" },
        { text: "Use it to speed up the process, since forecasting is time-consuming and the tool can help hit deadlines", type: "commercial", branch: "B" },
        { text: "AI forecasting tools are generally more objective than human analysts, since they're not influenced by personal bias", type: "misconception", branch: "B" },
      ],
    },
    step2: {
      A: {
        text: "Someone double-checking the numbers finds that the AI's prediction was based on a reasonable-sounding but incorrect assumption about how much the market would grow. What's the right takeaway?",
        options: [
          { text: "Good that the check caught it — this is exactly why independent review of AI-assisted forecasts matters", type: "technical" },
          { text: "Worth documenting the flaw and sharing it with anyone who might rely on the tool the same way in future", type: "ethical" },
          { text: "Fix this one instance and move on, without necessarily changing the broader process", type: "commercial" },
          { text: "Since the flaw was caught before anything was decided on, the tool's overall reliability isn't really in question", type: "misconception" },
        ],
      },
      B: {
        text: "Treated as more reliable than a person's judgement, the prediction ends up shaping a real business decision. A few months later, the numbers turn out to have been significantly off due to a flawed assumption baked into the forecast. What's the right response?",
        options: [
          { text: "Review specifically what assumption caused the flaw, and add a review step for that category of assumption going forward", type: "technical" },
          { text: "Be transparent with leadership about how the forecast was produced and what went wrong in the process, not just the number itself", type: "ethical" },
          { text: "Move on quickly and quietly recalibrate for next quarter, since dwelling on it doesn't change the outcome", type: "commercial" },
          { text: "Since the AI's output is simply based on the data it was given, the error is really a data-quality issue rather than anything about how it was used", type: "misconception" },
        ],
      },
    },
  },
];
export default SCENARIOS;
