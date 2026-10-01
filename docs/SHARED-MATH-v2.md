# Shared math v2 — synchronized hosts

Canonical source: this repository's src/shared-math and its imported original facts/expansion utilities. Both hosts use the exact same settings renderer, search, preview, K–7 catalog (240 skills), answer checkers and quarter-hour generator. Mega Man consumes the generated IIFE SharedMath bundle; its existing gameplay adapter retains stage/death/door hooks and private distribution.

Build from the canonical Olivia checkout after npm ci: node scripts/build-shared.mjs /path/to/MEGA-MAN-2-MATH-MODE/src/app/shared-math.js. The script writes a companion SHA256. Do not independently edit the generated bundle. For future math games, reuse the source or this bundle and provide only a host persistence/gameplay adapter. Update both hosts and run parity checks for shared changes.

Current bundle SHA256: ade5306e974fc88eb8f2dac6744b6a2b60a3a3e2d12d1ee7cda538376926c9ad. Application checkpoints before final checks: Olivia local 466aeb6; Mega Man local bbe079f. GitHub release commits wrap these sources and documentation without new runtime features.

Preview uses only selected skill IDs and transient generated items. It cannot mutate Practice state. Search covers all grades and includes time aliases for elapsed-minute skills. Checking a result outside the draft range expands that range visibly. Checked but hidden skills still appear once in the preview sequence. Preview has no 10-question cap; game gates retain their separate 1–10 setting.

Game themes and game-specific controls stay local; the math component structure, labels, content and behavior are shared. Accepted default exception: Olivia starts with S01 Grade 2 Targeted Review; Mega Man retains Grade 3 General Review. Both use five questions per gate by default.

The earlier SHARED-MATH.md is the historical v1 extraction record. This document and the v0.7 change specification govern v2. There is no shared student account or cloud data synchronization: each game retains its existing local learner save.
