# CROSSFIRE version history

Permanent community entry: https://champagne247.github.io/Champagne247/play/

## V2 — November 16, 2026

- 3D scene geometry with a WebGL renderer and canvas compatibility fallback.
- Compound arena with a walkable elevated bridge and ramps; Switchyard ground arena.
- Eight-player FFA, and 1v1 / 2v2 / 3v3 / 4v4 team rooms. Teams alternate cyan/coral; friendly fire off.
- Public room browser, code joins, session scoreboard, three-second respawns.
- Vanguard rifle, Raptor SMG, Breacher shotgun; weapon changes require reload.
- Cross, dot, ring and T crosshairs, four colors, ADS and mobile weapon switching.
- Shared server collision, cover and damage rules.

Validation: TypeScript and production build; V1 regression; V2 mode capacities, teams, damage, respawn, loadout, room discovery, movement, ramps and ray cover checks. Separate browser sessions verified shared room state. Browser rendering verified in compatibility mode because the test browser disables WebGL. Eight physical phones and GPU rendering remain unverified.

## V1 — November 16, 2026

Original four-player raycast arena with one rifle, code rooms, touch controls and automatic respawns. Preserved at https://crossfire-pocket-arena.cladmonk1.chatgpt.site/v1/

## Release workflow

For each published game version, update the play page and release notes, add a dated journey entry, attach an actual gameplay capture with renderer context, and preserve older playable versions where available. Publish the game before announcing the new version on GitHub Pages.
