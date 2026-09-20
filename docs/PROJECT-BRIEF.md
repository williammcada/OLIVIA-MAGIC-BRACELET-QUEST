# Project Brief — Olivia's Magic Bracelet Quest

**Brief version:** 0.4 — v0.5.0 math-expansion candidate  
**Current candidate:** GitHub checkpoint `02118eda538775dc197859adae02cabf5b002b36`, full tree `270f72cff28e268b3811e8229481429c7db040c0`; see [verification record](VERIFICATION-v0.5.0.md). Historical v0.4 baseline details below are preserved for recovery.
**Owner:** William McAda · **Credit:** A WILLIAM MCADA PRODUCT  
**Status:** v0.5.0 implementation candidate; automated verification and unrun browser/device/deployment checks are tracked in `VERIFICATION-v0.5.0.md`.  
**Repository:** `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`, branch `main`.  
**Current running version:** Unverified. The structured v0.4.0-labeled source is preserved; this normalization did not rerun tests or verify the hosted site.  
**Source/baseline:** Canonical preserved source: structured repository at checkpoint `76148ebc47ad50b0f8116ff5de3b10b827b3d4dd`, with `src/` tree `ab4ef6c6dca531aa880b1e821b8d36b9b75f883a`, root `index.html` blob `78eaba29cd396bac176fd430d7e82e8c02341c3a`, and `public/` assets tree `cc9654c7328d2f6ba8537bfc935b3742811ffe02`. Repository release records label v0.4.0; live deployment remains unverified.  
**Next work:** Verify the v0.5.0 candidate in a real browser, on intended iPhone/touch devices, and at the actual hosted URL before calling it a verified release. Preserve the existing hosting route (user reports Render).  

## 1. Purpose, audience and detailed scope

- Young-child arithmetic adventure with 16-bit/Genesis-inspired art, animal rescues, bead collection and bracelet-making payoff. Preserve character/mascot visual references and friendly tone.
- Math progression covers single-digit addition, two-digit plus one-digit, two-digit plus two-digit, adding within 20 and subtraction as selected. Adult settings control modes/scaffolds; audit actual ranges against source.
- Avoid degenerate repetitive generation (reported 19+0/16+2 repetition). Retain optional removable counters and quick settings; do not reinstate hold-button lock or removed multiplication fact lock.
- Preserve initial levels plus desert and ice/snow additions where delivered, approximately 25% length extension request, moving/falling platforms, Arctic seal and desert fox rescues.
- Cloud flight replaced unicorn riding; preserve Lumi's Cloud Flight animation, obstacles and bright music rather than reverting to superseded ride mechanics.
- Touch-first controls and local progress, supported PWA/offline behavior; iPhone layout must be checked separately from desktop success.
- Use accepted GitHub Branch Deploy packaging where applicable. Prior hidden .github workflow uploads failed; do not force a manual workflow repair back into the standard upload route.

## 2. This task and boundaries

Implement the approved [v0.5 math expansion](change-specs/v0.5-MATH-EXPANSION.md) from exact baseline `7b34b5be6e51983dd1e8f2c83bfeab3dcbb42776`. Add 17 text-first skills, stacked fractions on every math surface, S01/manual focus and counters-off fresh defaults. Preserve existing saved choices; no manufactured mastery. Existing bracelet rewards, all environments/assets, and introductory skills remain. The detailed specification records answer formats, bank bounds, corrected examples and text-only support. The historical v0.4 source identities below remain recovery references, not the current candidate.

## 3. Standards and adoption

[Canonical handbook](https://github.com/williammcada/mcada-project-handbook). File blob revisions consulted: AI-START-HERE.md 6557a45aaa6d29d7d1abde808e6d0ac248b08820; UNIVERSAL-RULES.md aed6fe311aa2e88983f862a30a2d8f05d2ffc04d; CONDITIONAL-STANDARDS.md dad2d3a05ca0f18260196ea51ac6351bffffdc1c; PROJECT-TEMPLATE.md 574f4c6fcf19ecc2f9e27582fd856fb08123e8da. These are file blobs, not repository commit SHAs.

The current implementation also consulted RELEASE-CHECKLIST.md blob `4f18c51998e7188ac5b4b4243bd2695056fb6ace`; all consulted file revisions are listed in the v0.5 change spec.

Relevant rules: U-01 identity, U-02 help, U-03 input validation, U-04 unambiguous math/text where applicable, U-05 reader/device, U-06 preservation, U-07 verification, U-08 local scope. Conditional selection: S-02, S-03, S-04.
Baseline adoption: selected for this documentation task within existing user instructions. Handbook still labels shared scope/modules seeded/draft; no new global rule ratification is inferred. Project-specific approved decisions control their own scope.

## 4. Must-retain behavior

The detailed scope above is the feature-preservation inventory. Preserve existing settings, data, accepted content, assets, exports and compatibility confirmed in source. Distinguish implemented behavior, accepted pending changes and historical requests during intake. A missing entry in this brief is not authorization to remove working behavior. Preserve valid user work during migrations and failures.

## 5. Source, release and deployment discipline

Canonical preserved source: structured repository at checkpoint `76148ebc47ad50b0f8116ff5de3b10b827b3d4dd`, with `src/` tree `ab4ef6c6dca531aa880b1e821b8d36b9b75f883a`, root `index.html` blob `78eaba29cd396bac176fd430d7e82e8c02341c3a`, and `public/` assets tree `cc9654c7328d2f6ba8537bfc935b3742811ffe02`. Repository release records label v0.4.0; live deployment remains unverified.

See [`MIGRATION-BASELINE.md`](MIGRATION-BASELINE.md) for the authoritative source manifest and the checks actually performed.

DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY.

Use “implementation checkpoint” or “release candidate” before verification. Preserve candidate bytes and logs before packaging; recover that checkpoint after a ZIP/upload failure. Do not rebuild a verified implementation to fix delivery. Repository upload and website deployment are different operations.

## 6. Known issues, conflicts and open evidence

Historical iPhone display and hidden workflow upload problems; current fixes require testing. Child-facing settings and arithmetic variety must survive packaging updates.

| Conflict or risk | Required handling |
| --- | --- |
| Historical claim versus current source | Inspect exact source; keep historical claim labeled until verified. |
| Proposed next scope versus working baseline | Use the approved version-specific specification; do not silently promote proposals. |
| Other project rules | Do not import AAC quotas, other-game retry counts, or a shared backend without explicit scope. |
| Handbook proposals | No additional exception or proposal is adopted by this brief. |

## 7. Verification contract

Current v0.5 evidence: [VERIFICATION-v0.5.0.md](VERIFICATION-v0.5.0.md). The following table records the earlier source-normalization task only; it must not be read as the v0.5 test result.

Sample each configured math range, toggle counters/settings, complete each environment and bracelet ending, verify cloud flight and touch, save/reload and Pages subpath assets.

| Evidence required | Result in this task |
| --- | --- |
| Exact source candidate/commit identified and preserved | Passed — canonical path and source checkpoint recorded in `docs/MIGRATION-BASELINE.md`; no functional verification inferred |
| Project-specific checks above, with inputs and expected/actual results | Not run |
| Save/import/export and malformed-input regression | Not run |
| Intended devices and real deployment path, where applicable | Not run |
| Version, release notes and delivered bytes agree | Not run |

The next build report must name the candidate, environment and test results; historical reports of passing tests do not transfer to a changed candidate.

## 8. Handoff and provenance

Current source identity is recorded in [`MIGRATION-BASELINE.md`](MIGRATION-BASELINE.md). That manifest supersedes earlier unknown-source or pre-upload statements while preserving the original migration note as history.

Required project records: Olivia_Magic_Bracelet_Quest_v0.4.0_GitHub_Branch_Deploy.zip; current source/assets; original visual references and release notes.

Provenance: previous migration brief and project-history audit in this conversation; directly read dossier/proposal where explicitly stated above. Records not explicitly marked read here are retrieval targets, not claims of fresh inspection. The earlier normalization did not test app code. Current candidate testing is recorded separately in `VERIFICATION-v0.5.0.md`.

Before substantive implementation retrieve these records, the current source, approved change spec and applicable handbook. If an indispensable spec is inaccessible, report the gap instead of filling it with invented details. Do not delete unique historical chats/assets until their contents are independently preserved.

## 9. Ecosystem boundary

Shared principles do not establish shared code, accounts or interfaces. MathQuest is engagement, TestForge assessment design, GradePal learner-level evidence, and DataDiver institutional analytics. Integration remains separately specified unless confirmed in source. Other projects remain independent unless their brief explicitly says otherwise.
