# Olivia’s Magic Bracelet Quest — v0.4.0

September 13, 2026

## Quick Grown-ups access and scaffolding control

**Grown-ups** is now a regular tap from the home screen; the three-second hold is gone. Settings remain protected by a fresh multiplication question, with both factors chosen randomly from 3 through 9.

Practice settings now include **Show bead counters**. It is on by default, preserving the existing visual bead groups and ten-frames. Turn it off to remove those counters from both ordinary questions and guided steps while keeping read-aloud, prompts and the answer keypad. Existing saves migrate with counters on.

## Six adventures

The map now contains six adventures and uses a compact two-row layout for landscape iPhone screens.

- **Lumi’s Cloud Flight** now displays Lumi’s unicorn icon on the map, rather than Poppy’s dog icon.
- **Sunstone Sands** is a 3,400-pixel desert route. Rescue **Saffy**, a fennec fox, from the sun temple. Drifting carpets, crumbling sandstone, long gap sequences, higher routes and five checkpoints make it a full advanced adventure.
- **Frostglow Fjord** is a 3,600-pixel ice-and-snow route. Rescue **Marble**, a baby seal, across moving ice floes and brittle snow shelves. It includes six checkpoints, springs, enemy patterns and optional high bead routes.

Both new stages are more than 25% longer than the earlier forest route. Falling platforms give a short visual warning, drop only after landing, then return; a fall always restores Olivia at a recent checkpoint and never removes collected beads. Every level still has five opening questions, one two-question rainbow gate, free ordinary jumps and bracelets made only from collected beads.

## Compatibility and validation

Save schema 2 and the olivia-quest-v1 storage key remain unchanged. Existing bracelets, rescued friends, math evidence and unfinished quests remain compatible. New adventures unlock in order after Cloud Flight.

**85 automated tests pass**, followed by strict TypeScript compilation, production build and portable build. The checks cover complete math banks, save migration, counter defaults, six distinct stage themes, longer routes, ordinary-jump gap safety, landing-safe checkpoints, falling/moving platform definitions, flight, bracelet inventory, and UI flows.

The fennec fox and baby seal portraits were rendered in the established pixel-art style and are included in the production site, portable edition and editable source. Live iPhone/iPad gameplay remains the final playtest step.

## Deployment

- **Olivia_Quest_v0.4.0_Netlify.zip**: extract it, then upload the extracted folder to the existing Netlify project.
- **Olivia_Quest_v0.4.0_Offline.html**: self-contained offline edition.
- **Olivia_Quest_v0.4.0_Source.zip**: editable source, tests and art sources.

This delivery does not publish to Netlify. Confirm **v0.4.0** in the game after deployment. If Safari has a cached build, reopen online and use **Install downloaded update** in Grown-ups.
