# v0.6.0-rc.1 verification and recovery record

Date: 2026-10-01. Candidate source checkpoint (local Git): `f1b781e34486f424f725fbd3b431bba3c9b7f3b1`. Canonical GitHub base: `8c5bb189146e7390e28f29fcd5f50741295d14b2`, tree `451bf938d8fea6226f7b835908cb6de4bc2d73ad`.

The source was checkpointed before browser verification. Later documentation changes do not alter the tested application source. This is an automated-tested release candidate, not physical-device acceptance or a verified live release.

## Results on the exact candidate

| Check | Result | Evidence |
| --- | --- | --- |
| Unit, generator, save and component integration | Passed | `npm test`: 12 files, 138 tests. All 239 generators accept their own keys over 100 generated items each; independent K–2 arithmetic and regrouping bounds; equivalent fractions, time, expressions, inequalities; filtering, shuffle, 80%/50% boundaries, prerequisite return, next-gate snapshot/reload, import validation, preservation and deletion. |
| Type checking and production packaging | Passed | `npm run build`: TypeScript, Vite and PWA precache of 35 entries. |
| Browser suite | Passed | All 7 authored Playwright tests passed on the final candidate (six focused tests plus the complete-quest test), Chromium 153.0.8010.0, Linux, actual production build served locally. |
| Complete meadow workflow | Passed | Launch practice → walk/jump → rainbow gate → rescue → bracelet → reload → service-worker offline reload. This is one adventure, not a full six-adventure playthrough. |
| Math/settings browser behavior | Passed | Wrong answer retains the item with no reveal; settings remain next-gate scoped; reload retains the exact unfinished question; targeted fraction skill, keypad, adult access and gameplay pause/settings/return. |
| Layout and fractions | Passed | Actual browser screenshots at 852×393, 1024×768 and 393×852; visible Submit bounds. Fraction preview numerator/denominator bounds checked on landscape phone. Visual inspection found a clipped denominator; increasing its row to 40px fixed it, followed by a new checkpoint and rerun. |
| Interrupted input | Passed, automated only | Separate pointer contacts, release orders, lost/failed capture, cancellation, rapid taps, background/focus/rotation-style events, teardown; browser pause/return and cancellation. Controls reset during math, pause and fall recovery. |
| Physical iPhone/iPad, device lock/unlock, real touch slides | Not run | Chromium viewport/pointer emulation is not physical iOS Safari/Edge acceptance. U-10 remains a physical-device release gate. |
| Other five adventures and actual audio on devices | Not run | Existing unit/flight/level regressions pass; complete device playthrough and audible acceptance pending. |
| Live deployment | Not run | Repository publication does not establish that the hosted site updated. No live URL was verified. |

Build identity:
- `dist/assets/index-Bwq6WU4F.js` SHA-256 `2981ae81a2579a5ff35e28bae9db389e1f753f315fce3ca6c8fee022703ae304`.
- `dist/assets/index-BqQsOcLw.css` SHA-256 `58a3b7e521e76c6028fd06d3874c45483c06f29d2db93a1fe1a387e5be5e1e91`.
- The imported math module is the original 169-skill block plus one export; no ROM/emulator/game assets were transferred.

## Test environment limits and recovery

The normal Playwright browser download was truncated. An isolated `@sparticuz/chromium` package supplied Chromium; it is only a test tool and was not added to project dependencies. Its single-process flag was removed to allow repeated isolated browser contexts. The preview server and browser must run inside the same execution process/network environment. Initial runner failures from unavailable browser/server were environment failures; the final seven tests passed after resolving them.

The earlier mocked UI test intentionally changed because it asserted the superseded scaffold UI. Its replacement covers the new settings, first attempts, rewards and all response types. A stress loop mounting the whole dashboard for all 239 skills exceeded the DOM emulator's heap; generator checks still cover every skill, while full dashboard interaction covers each response contract. This is not claimed as exhaustive device testing.

## GitHub publication authorization

Automatic approval review initially rejected the `github_create_tree` write, stating that it would upload potentially private source to an unverified destination without explicit sharing authorization. A subsequent read verified the destination is the canonical `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`, with owner push/admin permissions, but it is **public**. The reference Mega Man source repository is private. No retry or alternative public upload was performed before asking for approval; the initial implementation turn made no remote changes.

On 2026-10-01, the user explicitly approved publishing the original math/settings code to that public repository. Publication uses the preserved, tested application source; subsequent changes only update documentation. The candidate contains no Mega Man ROM, emulator or extracted Mega Man assets. User-owned Olivia assets remain unchanged. Physical-device and hosted acceptance remain outstanding.

## Resume without rebuilding

Use the delivery archive's `changes/` exact replacement files and manifest on a checkout of the canonical base commit. Preserve every unlisted path. The archive also contains a Git patch and the already-tested `dist/` bytes. Validate file hashes before writing. Re-read the current remote head before updating it; if it moved, reconcile deliberately. Do not rebuild the tested application to recover from an upload or response failure. Physical device and hosted acceptance remain separate from publication.
