# Project Brief — Olivia's Magic Bracelet Quest

**Brief status:** Migration baseline / requires source verification where noted  
**Brief version:** 0.1  
**Last updated:** 18 September 2026  
**Owner:** William McAda  
**Product credit:** A WILLIAM MCADA PRODUCT  
**Handbook repository:** `williammcada/mcada-project-handbook`  
**Handbook baseline:** `6557a45aaa6d29d7d1abde808e6d0ac248b08820 (AI-START-HERE.md); UNIVERSAL-RULES.md @ aed6fe311aa2e88983f862a30a2d8f05d2ffc04d`  
**Repository:** `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`  
**Canonical source status:** Existing GitHub repository. Current repository README identifies Version 0.4.0. Current latest commit observed during migration: `742869ec79eaa6897635e45ff197ed90eeeb8ae5`.  
**Current project state:** Existing GitHub Pages/PWA project at v0.4.0; local progress only and no uploaded student/name data according to the current README.

## 1. Purpose and audience

A touch-first, single-player arithmetic adventure built around collecting beads, helping animals, bracelet-making, and age-appropriate addition/subtraction practice.

**Primary audience / operator:** Young child player, primarily on touch devices, with adult-accessible settings.

## 2. Standards selection

**Universal baseline:** U-01 through U-08 where applicable.

**Conditional modules:** S-02 Curriculum/Assessment/Evidence; S-03 Live Classroom and Educational Games; S-04 Distribution/Deployment

Apply only the selected modules and project-local requirements. Do not import restrictions from unrelated projects.

## 3. Project-specific requirements

- Touch-first controls and readable child-facing UI.
- Arithmetic progression must remain age appropriate and avoid repetitive or degenerate question patterns.
- Counters/scaffolding must be removable when the adult wants less support.
- Settings must be quick to access; do not use an inconvenient hold-button lock.
- Preserve local-only progress/data behavior unless explicitly changed.
- Animals, bracelet collection, cloud-flight/platforming identity, and the existing visual style remain project-local.

## 4. Preserve from the current accepted project

- Bracelet/bead collection loop.
- Saved animals and child-friendly story tone.
- Current arithmetic modes and configurable scaffolding.
- Existing added environments including desert and ice/snow content where present.
- PWA/local-storage behavior and offline-friendly deployment characteristics already accepted.

## 5. Relationship to other projects

- Independent family educational game; not a MathQuest cartridge.
- Shares educational-game testing principles but retains its own audience, art, settings, and arithmetic progression.

A conceptual relationship is not proof of an implemented integration. Do not invent a shared API, data schema, identity layer, or deployment dependency without an explicit integration task.

## 6. Source and version discipline

The exact current source artifact or repository commit must be identified before a substantive build. If the field above says the source is not yet established, first locate the latest known-good local file/ZIP or existing repository state and record its exact identity here.

For substantial revisions use:

**DESIGN → CHANGE SPEC → IMPLEMENT → CHECKPOINT → VERIFY → VERIFIED CHECKPOINT → RELEASE → DEPLOY (when applicable)**

A packaging/export/deployment failure must not force reconstruction of an already verified build.

## 7. Definition of done

| # | Requirement / check | Result | Evidence / limitation |
| ---: | --- | --- | --- |
| 1 | Arithmetic questions are valid, varied, and correctly scored. | Not run | |
| 2 | Touch controls work on claimed mobile devices. | Not run | |
| 3 | Counter/scaffolding option behaves correctly. | Not run | |
| 4 | Settings remain accessible to the adult without obstructing child play. | Not run | |
| 5 | Progress persists locally as intended. | Not run | |
| 6 | Build and GitHub Pages deployment serve the same version. | Not run | |

Allowed results: **Passed / Failed / Not run / Not applicable**. A "Passed" result requires an actual check against the identified candidate.

## 8. Known issues and migration notes

The existing source of truth is already on GitHub. Preserve the v0.4.0 source while adding the documentation files from this pack.

## 9. Handoff files

A substantive AI implementation task should retrieve or receive:

1. `AI-START-HERE.md`;
2. `UNIVERSAL-RULES.md`;
3. the relevant sections of `CONDITIONAL-STANDARDS.md`;
4. this project brief;
5. the exact current source artifact/commit;
6. the approved version-specific change specification;
7. applicable assets and deployment configuration.

Do not reconstruct the current implementation from a historical chat summary when the actual source should be available.

## 10. Ownership

**William McAda**  
**A WILLIAM MCADA PRODUCT**
