# Migration Baseline — Olivia's Magic Bracelet Quest

**Recorded:** 18 September 2026  
**Repository:** `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`  
**Branch:** `main`  
**Source-preservation checkpoint:** `76148ebc47ad50b0f8116ff5de3b10b827b3d4dd`  
**Record status:** Historical v0.4 recovery source identity; v0.5 candidate is tracked in `VERIFICATION-v0.5.0.md`. This is not by itself a functional-test, release, or deployment claim.

## Canonical source identity

| Field | Value |
| --- | --- |
| Canonical source path | Structured repository: `src/`, root `index.html`, and `public/` assets |
| `src/` tree SHA | `ab4ef6c6dca531aa880b1e821b8d36b9b75f883a` |
| Entry-point blob | `index.html` — `78eaba29cd396bac176fd430d7e82e8c02341c3a` |
| Public-assets tree | `cc9654c7328d2f6ba8537bfc935b3742811ffe02` |
| Version represented | Repository release record labels v0.4.0; deployment verification remains open |
| Repository source checkpoint | `76148ebc47ad50b0f8116ff5de3b10b827b3d4dd` |

The checkpoint above identifies the application/planning source immediately before this normalization record was committed. Later documentation-only commits do not change the preserved application bytes.

## Verification status

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| Source exists in the default branch | Passed | Repository paths and Git object identities were read directly on 18 September 2026. |
| Byte-preservation comparison | Not applicable | Not applicable — this is a structured repository; identity is recorded by commit, trees and entry-point blob. |
| Functional workflow | Not run | Source preservation does not establish that imports, gameplay, reports, storage or exports work. |
| Hosted/running application | Not run | Not verified in this normalization; prior packaging/deployment records exist but the live route was not rechecked here. |

## Documentation authority

- [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md) records purpose, scope, must-retain behavior and verification requirements.
- [`change-specs/INDEX.md`](change-specs/INDEX.md) identifies approved or directional change records.
- [`MIGRATION-NOTE.md`](MIGRATION-NOTE.md) is retained as historical migration context but its pre-upload source-status language is superseded by this baseline.
- This file controls the historical migration source identity when an older brief or note says the source was unknown or “TO ESTABLISH.”

## Next gate

Preserve this v0.4 recovery baseline. The v0.5 candidate changes source; see the v0.5 change spec and verification record. Verify the actual configured hosting path, touch controls, iPhone layout, save/reload and full child-facing progression before claiming a verified release.

Do not label a future commit a verified release until the exact candidate has passed the project brief’s required verification and that evidence is preserved.
