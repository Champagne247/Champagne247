# My Life • My M.A.P. • NOVA — Alignment Audit
Date: 2026-10-26
Status: Development-branch handoff; NOT a published site update
Scope: Last-month project continuity, inspected GitHub source, and user-confirmed project direction.

## Canonical product direction
- **MY LIFE** is the vision and primary record; **My Mission** gives purpose; **My M.A.P.** (Mission Alignment Protocol) is the connected journey and destination.
- **One master life entry** can feed the timeline, category pages, Explore/map, relevant projects, media and authorized social destinations.
- NOVA is the orchestrator, not a separate disconnected app: capture -> classify -> private draft -> human review -> approved publish -> verify live links -> record result.
- Public website is a curated story, not a mirror of raw chats, private memories, local files or family calendars.
- The six paths remain Family, Fitness, Freeflight, Professional, Creator, and Food & Travel. Other domains can be cross-cutting tags.

## Inspected source (2026-10-26)
Repository: Champagne247/Champagne247 (PUBLIC); default branch main.
- README.md describes My Life/Mission/M.A.P. architecture.
- index.html loads assets/map/data/entries.js and assets/map/data/updates-2026-10.js.
- assets/map/data/updates-2026-10.js contains twelve dated, public-oriented entries for Oct 20–26 (family milestones, family education, robotics, work, freeflight, M.A.P. refresh). Some stories have no real media and should not be described as photo-verified.
- /map/, /explore/, /manage/, /nova/, /looking4lift/ source files exist.
- /manage/ includes a noindex meta tag, which is NOT authentication or access control. Do not place private data in a public repository or client-side composer.
- Browser availability, cross-link correctness, accessibility, images and end-to-end publishing were NOT verified in this audit; live site fetch failed.
- Branch nova/hybrid-core-starter holds a local-first Python/Ollama companion with SQLite history, optional explicit cloud mode, current NOVA_FAMILY.md, and offline tests. Tests were committed but not yet observed passing on the Windows PC.

## Current NOVA family (supersedes older labels)
- NOVA — orange/black explorer and pathfinder.
- MILO — white/electric-blue family helper.
- ZIGGY — green/white inventor and maker.
- Shared model-agnostic core, portable memory, independent companion bodies, and universal NOVA Dock Interface; HOME dock first, then tracked/rover/tool carriers. Flight carrier is research-only pending separate safety review.
- BUDDY and PIP are historical names only; do not reintroduce them in current product instructions.
- Hardware target artwork is conceptual; do not represent rendered designs as tested CAD or working robots.
- Defer detailed CAD until actual parts and measurements are available; use ordered components and avoid duplicate purchases.

## Last-month work to keep connected (public-safe editorial candidates, NOT automatically approved)
- The Living Vision Board and its six connected life paths.
- NOVA hybrid software milestone: local Ollama, persistent local SQLite chat, GitHub-to-Windows workflow; tests pending.
- NOVA Family visual direction and interchangeable dock/carrier vision.
- Research into affordable expressive desktop robots, reusable old phones, open-source references, and 3D-printable modular parts.
- Looking4Lift: hang-gliding milestones and aspiration to qualify for future instruction; do not imply instructor certification or a job offer.
- CC's Technical Services: broad categories of HVAC/electrical/security/audio projects and growth; omit clients, unpaid invoices, addresses, supplier terms, private financials.
- Family-oriented public stories only with approval and consent for identifying details/photos.
- Exploring tree nets, creative outdoor fabrication, and new business opportunities; research is not a purchased or launched business.
- The existing October timeline already covers several of these. Deduplicate by entry ID before adding more.

## Do not publish
Home/family schedules or travel dates, minors' personal details, financial account/trading balances, health information, API keys, order IDs, private addresses, customer identities, unverified accusations, screenshots of private correspondence, raw conversations, private photos or live camera/audio feeds. Treat GitHub branches as public within this public repository. Keep secrets and personal memory outside the repository.

## Known gaps / next verified gates
1. **Site QA:** independently open homepage, map, Explore, composer, NOVA and Looking4Lift in desktop/mobile browsers; check routes, imagery, feed dates, links and console errors.
2. **Content audit:** compare base entries.js with October overlay; avoid duplicate entries and misleading status (goal vs complete). Confirm all public story/media rights and family consent.
3. **Privacy gate:** private drafts and approval tokens must be server-side/local, not GitHub Pages JavaScript. No unattended posting.
4. **NOVA code:** run `python -m unittest discover -s . -p "test_*.py" -v` on Windows; preserve data/nova.sqlite3, test Ollama /local, verify errors; modularize providers and memory after tests pass.
5. **Integration:** prototype a private activity inbox and approved export to a public M.A.P. entry. Log what was published, when, where and by whom; require explicit review.
6. **Hardware:** inventory delivered components, verify pinouts/voltages, then bench-test expressive head before CAD/body/carrier commitments.
7. **Operations:** connect My Life priorities and projects through structured statuses; don't claim calendars, socials or external apps are connected unless checked.

## Change control
- Development updates go to a feature branch; keep main/public site unchanged until explicit publication approval and tests.
- GitHub commit proves a source change, not deployment or local PC sync. User runs `git pull --ff-only origin nova/hybrid-core-starter` and validates.
- A future handoff should distinguish VERIFIED, REPORTED, PLANNED and UNKNOWN. Keep decisions here in versioned project notes, and keep raw personal details private.
