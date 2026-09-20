# Olivia's Magic Bracelet Quest v0.5.0 — release candidate

A WILLIAM MCADA PRODUCT

## Implemented

- 17 new text-first math skills from two-digit regrouping to simple fractions.
- Vertically stacked fractions in prompts, choices, selected responses, feedback and parent history; text-to-speech reads fractions as “numerator over denominator.”
- Counters off and S01 manual focus on fresh/reset saves. Existing saved settings and progress are preserved. Expanded skills never show math beads, even with counters enabled.
- Five-digit numeric input; comparison, ordering and fraction selection controls; readable decoded choices in evidence history.
- Textual support and existing reward/retry behavior. Collected beads, bracelet making, rescues, cloud flight, platforming and assets unchanged.
- Updated change specification, brief, source-history pointers, README and verification record. No handbook rules or hosting settings changed.

## Verification and remaining gate

122 unit/component tests pass; TypeScript and production build pass. These are not a substitute for rendered-browser inspection. Browser installation failed (timeouts/502); real-browser end-to-end tests, physical iPhone/touch checks, and actual hosted deployment remain unverified. See `docs/VERIFICATION-v0.5.0.md` for exact candidate identity and limits. Do not label this candidate a verified release.

## Deployment and recovery

Use the existing connected repository and host. Render static-site build: `npm ci && npm run build`; publish `dist`. A push may trigger the existing auto-deploy, but it is not evidence of successful deployment. Confirm `/version.json` reads 0.5.0 and inspect the in-game version and fraction screens after deployment.

For an existing saved game, select S01 and turn off automatic progression/counters in Grown-ups; no reset is needed. Keep a progress export before device/browser changes. Recover from the preserved source candidate if packaging or deployment fails; do not reconstruct from chat. Historical release notes remain untouched.
