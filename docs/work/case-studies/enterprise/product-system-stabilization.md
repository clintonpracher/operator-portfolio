---
layout: case-study
title: "The Product System Stabilization Framework"
subtitle: "How a $120M connected-hardware line stopped renegotiating its own commitments, in 30 days"
proof_points:
  - "Operating Model"
  - "Decision Systems"
  - "Platform Architecture"
decision_shift: "From six roadmaps nobody owned to one score with a conductor."
at_a_glance:
  - "Requirements clarification: two weeks to two days"
  - "Engineering rework: 40% to zero"
  - "Sprint release redesigned from an internal engineering ritual into a business-facing signal, in 30 days"
  - "2027 roadmap sequenced to protect the season and defend board-level investment in engineering"
---

## Every team had a roadmap. That was the problem.

Not a missing roadmap. Six of them. Product had one, engineering had one, each platform group kept a working version, and every one of them was accurate to the team that maintained it. What nobody had was the roadmap. So when two commitments collided, and they collided constantly, there was no authority to resolve it against. The conflict went to a meeting. The meeting produced a new local version. And the cycle ran again next week.

The company was a connected hardware and software ecosystem in outdoor recreation: two consumer mobile applications sitting on cellular-connected camera hardware, AI services underneath, and a heavy backend. Sixty engineers. A $120M line of business.

The revenue arrived in a season. Not a quarter, a season, with an opening date set by something other than the company. Miss it and you do not miss a quarter. You miss the year.

## What was actually broken

The visible symptoms were delivery symptoms. Requirements took two weeks to clarify. Forty percent of engineering work was rework. Ideas arrived mid-sprint through side channels and displaced whatever was already committed. The sprint release had become an internal engineering ritual that told the business nothing about whether the season was safe.

None of that was a delivery problem.

The organization had grown organically, and when it was small, proximity did the work that a decision system does in a larger company. You walked over. You asked. You got an answer and it held, because the person who gave it was the only person who could give it. That is a real operating model and it works well right up until it stops.

The platform expanded. Dependencies thickened. Hardware got involved, which slows every feedback loop, because you cannot ship a firmware fix on a Tuesday afternoon. And nothing replaced proximity. Decisions started happening in the cracks, which means they were still getting made, just nowhere anybody could see them and by nobody in particular.

That is the pattern underneath most execution complaints. The teams are competent, the work is real, and the system that governs which work happens has quietly stopped functioning. What you feel is slowness. What you have is an unowned decision.

There was a second layer. Product intent and program execution had collapsed into the same function. One group was deciding what mattered and coordinating delivery of it at the same time, in the same forums, which meant direction conversations kept getting hijacked by status. Leadership was debating dates in the room where they were supposed to be choosing priorities.

## The intervention

I ran the first 30 days as a diagnostic rather than an onboarding, because the mandate handed to me by senior leadership was already a system-design mandate: fix the decision architecture, and reorganize the roadmap and the product organization around the season.

Four layers, in order, because they only hold in order.

**Visibility.** One score for the whole organization to read from. Not lists, not local roadmaps. A single view of what is committed, what is done, what is next, and what is blocked. Because the business ran on a season, the cadence was built to match it: planning in winter, stabilization in spring, pre-season release in summer. That cadence does something a generic quarterly rhythm cannot. It surfaces critical-path work months before the season can punish you for missing it.

**Intake.** Idea generation moved upstream into a structured discovery pipeline. Ideas enter the same way, get shaped the same way, and stop arriving mid-sprint through whoever happened to know whoever. This is the layer people resist, because side channels feel like responsiveness. They are not. They are a tax paid by whoever is already committed to something else.

**Capability architecture.** Features got reframed as reusable platform capabilities. Offline application behavior, device location management, contextual product guidance. Each of those had been getting solved separately by different teams for different products, which is how a platform accumulates brittle one-off implementations that harden into permanent debt. Naming them as capabilities meant the platform could evolve coherently instead of fragmenting under its own roadmap.

**Operating model.** Product took initiative definition, prioritization, and portfolio governance. Program took delivery orchestration, dependency coordination, and execution tracking.

That last one is the change that makes the other three hold, and it is the one most organizations skip. Visibility without an owner degrades back into six roadmaps within a quarter. Separating intent from execution gave the score a conductor, and it gave leadership a room where direction could actually be decided without a status update eating the hour.

## What the numbers did

Requirements clarification went from two weeks to two days. The test was direct: I handed the team multiple requirements and they worked them immediately, no clarification loop, and the outputs went through approval and into production.

Engineering rework went from 40% to zero across that same window. Rework was never a discipline problem. It was what happens when work starts against a commitment that has not actually been settled, so the settling happens later, in code, at ten times the cost.

The sprint release stopped being an engineering artifact. Redesigned in 30 days into a business-facing signal, it started answering the only question the business had, which was whether the season was on track.

And commitments stopped getting renegotiated in flight. That is the outcome without a number attached and it is the one that mattered most, because everything else follows from it. When a date holds, planning becomes possible. When it does not, every downstream process is theater.

The work also produced a full roadmap audit, a restructured operating model for roadmap planning, a risk model the leadership team had not had before, and the 2027 roadmap itself, sequenced to protect the most vulnerable window in a $120M line and to justify continued board-level investment in the engineering function.

## The part that has nothing to do with working harder

Most of what a scaling product organization produces is noise. Status, coordination, the same tradeoff restated in four rooms because no room had the authority to close it. Judgment is the scarce thing, and judgment is the first thing that gets buried under all that motion.

None of the four layers made anybody work harder. They took the noise off the people who were supposed to be exercising judgment, and put the decisions somewhere they could be seen and owned.

I spent 40 years in orchestras, bands, and choirs before I spent any of it in product. At fifteen people you do not need a conductor, because proximity sets the tempo. Past that, every section starts playing its own internal time. The notes stay correct. The sound becomes chaos. You do not fix that by asking the sections to try harder or care more. You write the parts so that coherence is the easiest thing in the room to do.

That is what a decision system is. Not governance for its own sake, not process added on top of process, but an architecture that makes the right call the path of least resistance.

The organization did not get faster because anyone pushed. It got coherent because the decision system stopped fighting itself.
