# Olivia v0.7.1-rc.1 / Mega Man v0.6.1-rc.1 — targeted selection clarity

Removes the redundant Use Grade 3 preset from both games. Displays the complete checked skill list next to Save, with Clear selection and individual Remove buttons. Targeted Save confirms active skill names and count. Search continues preserving multi-search selections; it never silently replaces previous checks.

The reported x − 456 = 361 format is g3-submissing. A retained Grade3 selection can remain active alongside newly added Grade1 checks. That mechanism was reproduced; the user's actual phone save was unavailable, so its exact cause is not claimed. Exactly four Grade1 skills cannot generate a Grade3 item in a fresh targeted gate.

Verification: 144 automated tests passed; real Chromium regression passed the Settings → Grade3 range → subtraction search → four Grade1 checks → inspect/remove retained Grade3 check → save → close → home → adventure map → first adventure → Start this adventure → Make some magic route. Every one of five questions belonged to the four selected Grade1 skills. Existing pending gate retained its snapshot until the new adventure, as intended. Cross-host tests passed search, ten previews, state isolation, saved selections, removed preset and Clear selection in actual Olivia and private Mega Man builds.

Application source checkpoints: Olivia e0ddc57; Mega Man e6f1632. Physical iPhone/iPad remains unverified. Hosted update must be verified after publication. Earlier verification remains historical; this repair did not alter content generators or game physics.
