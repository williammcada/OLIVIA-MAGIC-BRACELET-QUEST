# Lumi flight raster assets — v0.3.1

The user approved lumi-approved-mockup.png as the art direction. The sprites preserve Olivia’s pink bow, curly brown hair, pink heart outfit and seated pose, and Lumi’s rounded cream body, rainbow hair, star collar and feathered wings.

## Source and runtime files

- lumi-approved-mockup.png: approved reference, unchanged.
- lumi-flight-sheet-v0.3.1.png: six-pose raster sheet generated with the built-in image-generation tool, unchanged.
- ../public/art/lumi-flight-0.png through lumi-flight-5.png: registered 128 × 128 PNG game textures.
- ../scripts/flight-assets.mjs: reproducible texture export.
- ../src/flight-art.ts: texture names, shared anchor and loop timing.
- ../src/flight-world.ts: game rendering, tilt and bracelet position.

The generator returned an RGB sheet with a baked checkerboard even after a request for alpha. Export preparation separates the connected achromatic exterior, preserves enclosed white artwork, registers the collar/saddle and uses nearest-neighbor scaling. The generated artwork itself is retained unchanged for future editing. Borders, opacity, unique frames and game-size appearance were checked.

Run `node scripts/flight-assets.mjs` from the project root to reproduce the PNGs. All PNGs are copied into the production site and embedded in the portable HTML. The source sheet and approved mockup are source-only and are not downloaded by players.

## Animation

Six unique poses play in a nine-step 715 ms loop (0, 1, 2, 3, 4, 3, 2, 5, 1). The same saddle anchor is used for every pose. The texture canvas displays at 96 × 96 logical pixels with transparent margin; the visible mounted character is approximately 90 × 64 pixels. The rider leans gently with the whole mount during climbs/dives. Reduced motion uses the horizontal-wing glide pose and removes tilt and the decorative trail.

## Generation method and exact prompt

Built-in image generation, using lumi-approved-mockup.png as the sole image reference.

undefined
