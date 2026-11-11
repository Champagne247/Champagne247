# NOVA • My Life M.A.P. — Live Project Handoff

> Operational continuity document. This repository may be public. **Do not put private travel dates, lodging, addresses, personal contacts, health, financial information, credentials, or family logistics here.**
>
> Last reviewed: 2026-11-11. Read the latest commit history and actual files before assuming this document is current.

## Primary mission
Build **My Life • My Mission • My M.A.P.** as a living vision board that evolves as life happens, not as a backlog for later.

## Default interpretation
Within the NOVA • My Life project, “my website,” “my life,” and “my maps” ordinarily refer to this M.A.P. project unless a different website is explicitly named. CC'S Technical Services is a distinct business site.

## Canonical systems
- Website and public M.A.P. data: this GitHub repository, default branch.
- M.A.P. life entries: `assets/map/data/entries.js` (verify live schema before edits).
- Private context and operating preferences: ChatGPT Project files and user-authorized connected systems; **not this public repository**.
- Calendar: authorized calendar source for scheduling; do not infer a calendar event was created from a chat message.

## Operating loop — execute in the same turn
1. Understand what changed and whether the user intends an update or is just exploring.
2. Read current repository files and any relevant authorized source. Check for duplicates and newer changes.
3. Separate public story from private logistics; seek confirmation before publishing sensitive material.
4. For authorized, non-sensitive changes, update the canonical file or site immediately. Preserve schema and existing entries.
5. Verify commit SHA, changed paths and resulting data. Distinguish committed from deployed/live.
6. Update this handoff when project state materially changes; keep it short and factual.
7. Report what was done, what was not done, and the next action. Never claim a background sync or automatic trigger that isn't configured.

## Current state — November 11, 2026
- Baseline main `17500ec`: Looking4Lift flight journal and preserved branding files. Pages deployment run 43034705619 succeeded.
- Shared master now contains 96 entries: retained 94, added November 9 CC’s service post and November 11 published Looking4Lift Instagram story, with source URLs and media references.
- Launch entry distribution now records the already-live first YouTube Short instead of an empty publication record.
- Twelve main routes link to the shared profiles/project directory, CC’s and current Looking4Lift YouTube. Professional page identifies CC’s as primary business and Falcon Security as subcontract work.
- Looking4Lift links the current user-supplied Cloudbase Game Labs community invitation.
- Preserve cinematic intro → welcome → map/pins → five newest-first journey cards → expansion. November 7 newest-first fix supersedes earlier active-first wording.
- See `docs/social-coverage-2026-11-11.json` for exact coverage. Do not overwrite the November 7 historic source inventory.
- Existing CI failure: browser dependency installation could not resolve Ubuntu package mirrors; tests did not run. Workflow now uses the version-matched Playwright container with browsers/system dependencies preinstalled. New run still needs checking after publication.
- Local content/privacy tests passed (5). Local browser launch failed on restricted socket creation; this does not establish a site failure.
- Outstanding: actual Pops/Mexican Train photos, complete social/video archive, current YouTube upload access, personal Facebook/X, LinkedIn/Indeed profile access and preview, legacy robotics draft PR conflicts and printable CAD validation. No automatic cross-platform sync is running.
- Private job scope, supplier prices, calendar appointments, payment and family logistics belong in private project records.

## NOVA Forever Build — PC, workbench, agents, robot (2026-10-27)
- Vision: a persistent, model-agnostic NOVA companion, not a website-only project. Communication should capture events and, within approved rules, update My Life M.A.P. in near-real time.
- Home compute: existing PC (i7-10700K / RTX 3070) is the intended always-on initial host for a local NOVA runtime, agent coordinator, queues, logs, and authorized integrations. Hardware/software deployment is **planned, not yet verified or installed**.
- Workbench: build and test electronics, sensors, robotics, 3D-printed parts, firmware, and a universal NOVA Dock Interface. HOME is the first charging/service/data dock.
- Physical companion: small expressive independent robot with camera eyes, voice, mobility and arms; later boards interchangeable tracked, flying, or other carriers. Provisional companions BUDDY and PIP share the universe and docking standard.
- Architecture: user speech/text → authenticated capture → structured event → privacy classification and policy → authorized agent action → validation → versioned GitHub M.A.P. update → deployment check → user-visible confirmation. Private records remain outside the public repository.
- Local agent behavior: event-driven workers and optional scheduled checks, with explicit permissions, audit trail, deduplication, rollback and human approval for sensitive publication or consequential device actions. No claim of continuous ChatGPT awareness or always-on listening until the separate local runtime and consent-based input are configured.
- Priority next build: inventory the PC environment, choose local runtime and remote access strategy, create a private event store and publication rules, implement one end-to-end text-to-M.A.P. pipeline, then add voice, monitoring, workbench and robot control.


## GitHub-first delivery and PC handoff (2026-10-27)
- Default workflow: build and update project artifacts directly in GitHub through the available authorized connector during the conversation. GitHub is the canonical online delivery and version-history location for website, agent source code, setup guides, and robot/workbench project files.
- No need to wait for PC access to write code, documentation, configuration templates, or website changes. Commit and link completed work immediately when feasible.
- For anything requiring local execution (installing dependencies, flashing devices, configuring hardware, secrets, testing PC services), provide an actionable handoff: exact GitHub path/commit, commands or steps, expected result, and what the user needs to report back.
- Later local automation may pull from GitHub, run tests and deploy approved changes. That synchronization is a planned capability, **not currently verified as running**.
- GitHub being online does not itself run a persistent PC agent, grant machine access, or guarantee deployment. Never store passwords, API keys, private personal records or exact family travel plans in a public repo. Use a private repo or secret manager for sensitive operational material.
- Keep conversation-driven changes flowing: implement → commit → verify → notify user of only necessary local steps. Never claim unperformed actions.

## Update log
| Date | Change | Evidence | Open item |
|---|---|---|---|
| 2026-10-27 | Added two upcoming public-safe life entries | `0a6220f` | Reconcile counts; verify deployment |
| 2026-10-27 | Established GitHub-first delivery and explicit PC handoff | This file | Implement local sync when PC is ready |
| 2026-10-27 | Recorded always-on PC / agent / workbench / robot architecture | This file | Implement and test local runtime |
| 2026-10-27 | Established canonical handoff protocol | This file's creation commit | Keep current with future changes |
