# Foothill Digital — Project Rules

## Mandatory: Verify Before Acting

**This rule exists because of a real failure.** Demos were built and outreach
emails were sent to businesses without checking whether they actually needed
a website. One prospect (Ry's Poke Shack) already had a polished multi-location
chain website. An email bounced because the address was never verified.

### Before building ANY demo or sending ANY outreach:

1. **Visit the prospect's website** (if they have one). Assess:
   - Does it load? Is it mobile-friendly?
   - Does it have online ordering / booking / contact forms?
   - When was it last updated (copyright year, content freshness)?
   - Is it a generic template (e.g. "Powered by Blizzfull") or custom?
2. **Score the website** as one of:
   - `NONE` — no website found
   - `BROKEN` — site doesn't load or is clearly broken
   - `BASIC` — generic template, dated, no online functionality
   - `FUNCTIONAL` — has real functionality (ordering, booking, e-commerce)
   - `POLISHED` — custom, modern, mobile-first, actively maintained
3. **Only build demos for prospects scored `NONE`, `BROKEN`, or `BASIC`.**
   Prospects with `FUNCTIONAL` sites need a different pitch (SEO/reviews, not
   a new website). Prospects with `POLISHED` sites should be dropped entirely.
4. **Verify email addresses before sending.** Check the website's contact
   page, Google Business listing, and any other source. Note which addresses
   have been verified vs. guessed.

### Before sending outreach emails:

1. **Confirm the prospect still needs help** — re-check their website status
   in `prospects.md`. If it changed since the last audit, re-audit.
2. **Confirm the email address is valid** — if an email bounced previously,
   do NOT resend to the same address. Find a new one or use the contact form
   / phone instead.
3. **Reference something specific to their business** in the email that proves
   you actually looked at their current website (or noted its absence).

## prospects.md Format

Every prospect entry MUST include:

```
N. **Business Name** — Type, Address
   - Phone: (verified source)
   - Email: address (status: VERIFIED | UNVERIFIED | BOUNCED)
   - Website: URL or "none"
   - Website status: NONE | BROKEN | BASIC | FUNCTIONAL | POLISHED
   - Website notes: what's on it, when it was last updated
   - Pitch angle: NEW SITE | SEO/REVIEWS | DROP
   - Last contacted: date or "never"
   - Reply status: NONE | AUTO-REPLY | HUMAN-REPLY | BOUNCED
```

## Outreach Email Rules

- Send from `forgea524@agentmail.to` via the agentmail MCP server
- The inbox ID is `forgea524@agentmail.to` (the API key is inbox-scoped
  and cannot list inboxes — this ID was found in prior session transcripts)
- Never send to a prospect whose website is POLISHED
- Never resend to a bounced address
- Track every send in `prospects.md` with date and status

## Demo Build Rules

- Only build demos for prospects scored NONE, BROKEN, or BASIC
- Follow the existing design system (see demos/sahara/index.html and
  demos/la3d/index.html as references)
- Self-contained HTML, inline CSS/JS, code-native visuals (no external images)
- Fraunces + Inter fonts, CSS variable color palette per business
- Include the demo banner linking to Foothill Digital
- ~18-27KB per demo
- After building, add to the portfolio grid in index.html

## Git

- Commit messages: subject + body only. No "Generated with Devin" line,
  no "Co-Authored-By: Devin" trailer.
- Don't push unless asked.
