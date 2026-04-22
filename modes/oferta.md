# Mode: oferta — Full Evaluation A-G

When the candidate pastes an offer (text or URL), ALWAYS deliver all 7 blocks (A-F evaluation + G legitimacy).

**IMPORTANT: Write all output in English.**

## Step 0 — Archetype Detection

Classify the offer into one of the archetypes (see `_shared.md`). If hybrid, indicate the 2 closest. This determines:
- Which proof points to prioritize in Block B
- How to rewrite the summary in Block E
- Which STAR stories to prepare in Block F

## Block A — Role Summary

Table with:
- Detected archetype
- Domain (platform/agentic/LLMOps/ML/enterprise)
- Function (build/consult/manage/deploy)
- Seniority
- Remote (full/hybrid/onsite)
- Team size (if mentioned)
- TL;DR in 1 sentence

## Block B — CV Match

Read `cv.md`. Create table with each JD requirement mapped to exact lines from the CV.

**Adapted to archetype:**
- FDE → prioritize fast delivery and client-facing proof points
- SA → prioritize system design and integrations
- PM → prioritize product discovery and metrics
- LLMOps → prioritize evals, observability, pipelines
- Agentic → prioritize multi-agent, HITL, orchestration
- Transformation → prioritize change management, adoption, scaling

**Gaps section** with mitigation strategy for each. For each gap:
1. Is it a hard blocker or a nice-to-have?
2. Can the candidate demonstrate adjacent experience?
3. Is there a portfolio project that covers this gap?
4. Concrete mitigation plan (cover letter phrasing, quick project, etc.)

## Block C — Level and Strategy

1. **Detected level** in the JD vs **candidate's natural level for that archetype**
2. **"Sell senior without lying" plan**: specific phrases adapted to the archetype, concrete achievements to highlight, how to position experience as advantage
3. **"If they downlevel me" plan**: accept if comp is fair, negotiate 6-month review, clear promotion criteria

## Block D — Comp and Demand

Use WebSearch for:
- Current salaries for the role (Glassdoor, Levels.fyi, Blind, or local equivalents)
- Company's compensation reputation
- Role demand trend

Table with data and cited sources. If no data available, say so instead of making it up.

## Block E — CV Personalization Plan

| # | Section | Current state | Proposed change | Why |
|---|---------|---------------|-----------------|-----|
| 1 | Summary | ... | ... | ... |
| ... | ... | ... | ... | ... |

Top 5 CV changes + Top 5 LinkedIn changes to maximize match.

## Block F — Interview Prep Plan

6-10 STAR+R stories mapped to JD requirements (STAR + **Reflection**):

| # | JD Requirement | STAR+R Story | S | T | A | R | Reflection |
|---|----------------|--------------|---|---|---|---|------------|

The **Reflection** column captures what was learned or what would be done differently. This signals seniority — junior candidates describe what happened, senior candidates extract lessons.

**Story Bank:** If `interview-prep/story-bank.md` exists, check if any of these stories are already there. If not, append new ones. Over time this builds a reusable bank of 5-10 master stories that can be adapted to any interview question.

**Selected and framed per archetype:**
- FDE → emphasize delivery speed and client-facing
- SA → emphasize architecture decisions
- PM → emphasize discovery and trade-offs
- LLMOps → emphasize metrics, evals, production hardening
- Agentic → emphasize orchestration, error handling, HITL
- Transformation → emphasize adoption, organizational change

Also include:
- 1 recommended case study (which project to present and how to frame it)
- Red-flag questions and how to answer them

## Block G — Posting Legitimacy

Analyze the job posting for signals that indicate whether this is a real, active opening.

**Ethical framing:** Present observations, not accusations. Every signal has legitimate explanations. The user decides how to weigh them.

### Signals to analyze (in order):

**1. Posting Freshness:**
- Date posted or "X days ago" — extract from page
- Apply button state (active / closed / missing / redirects to generic page)

**2. Description Quality:**
- Does it name specific technologies, frameworks, tools?
- Does it mention team size, reporting structure, or org context?
- Are requirements realistic?
- Is salary/compensation mentioned?
- Any internal contradictions?

**3. Company Hiring Signals** (2-3 WebSearch queries):
- Search: `"{company}" layoffs {year}`
- Search: `"{company}" hiring freeze {year}`

**4. Reposting Detection:** Check if company + similar role appeared before with a different URL.

**5. Role Market Context:** Does the role make sense for this company's business?

### Output format:

**Assessment:** One of three tiers:
- **High Confidence** — Multiple signals suggest a real, active opening
- **Proceed with Caution** — Mixed signals worth noting
- **Suspicious** — Multiple ghost job indicators, investigate before investing time

**Signals table:** Each signal with its finding and weight (Positive / Neutral / Concerning).

### Edge case handling:
- **Government/academic postings:** 60-90 day timelines are normal.
- **Evergreen postings:** Note "ongoing" or "rolling" as context, not a ghost job.
- **Niche/executive roles:** Staff+, VP, Director legitimately stay open for months.
- **No date available:** Default to "Proceed with Caution." NEVER default to "Suspicious" without evidence.
- **Recruiter-sourced:** Active recruiter contact is itself a positive legitimacy signal.

---

## Post-evaluation

**ALWAYS** after generating blocks A-G:

### 1. Save report .md

Save full evaluation to `reports/{###}-{company-slug}-{YYYY-MM-DD}.md`.

- `{###}` = next sequential number (3 digits, zero-padded)
- `{company-slug}` = company name lowercase, hyphens for spaces
- `{YYYY-MM-DD}` = current date

**Report format:**

```markdown
# Evaluation: {Company} — {Role}

**Date:** {YYYY-MM-DD}
**Archetype:** {detected}
**Score:** {X/5}
**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}
**PDF:** {path or pending}

---

## A) Role Summary
## B) CV Match
## C) Level and Strategy
## D) Comp and Demand
## E) CV Personalization Plan
## F) Interview Prep Plan
## G) Posting Legitimacy
## H) Draft Application Answers (only if score >= 4.5)

---

## Extracted Keywords
(15-20 keywords from the JD for ATS optimization)
```

### 2. Register in tracker

**ALWAYS** register in `data/applications.md`:

| # | Date | Company | Role | Score | Status | PDF | Report |
