# Open-source research backlog — NOVA Forever Build
Recorded: 2026-10-26

## Purpose
Capture potentially useful GitHub projects from a social-media roundup without assuming viral star counts, compatibility, security, or suitability. These are **research candidates only**; no dependency has been approved or installed.

## Shortlist
| Project | Research direction | Priority |
|---|---|---|
| paperclipai/paperclip | Multi-agent work coordination for development and NOVA ecosystem | High |
| affaan-m/ECC | Development practices, memory, verification and security | High |
| thedotmack/claude-mem | Persistent build/session history patterns | High |
| debpalash/VoiceStudio | Local voice, transcription and distinct character speech | High |
| mattpocock/skills | Developer skills and coding workflow | Medium |
| cathrynlavery/diagram-design (verify repository identity) | System and engineering diagrams | Medium |
| multica-ai/andrej-karpathy-skills (verify) | Code review and verification heuristics | Medium |
| hugohe3/ppt-master (verify) | Project presentations | Low |
| bilawalsidhu/gods-eye-view (verify) | 3D mapping / visualization inspiration | Exploratory |
| morluto/rea (verify) | Software analysis research | Exploratory |

## Adoption gates
1. Verify exact repository URL, maintainer, license, release recency, dependency tree and security posture.
2. Confirm use-case fit and hardware/runtime requirements; avoid heavy AI dependencies on XIAO ESP32-S3 Sense.
3. Prototype in isolation with no production credentials, personal data or physical actuator permissions.
4. Review privacy, licensing (including copyleft obligations), supply-chain risks, maintenance burden and offline capabilities.
5. Add only after a measured benefit and documented rollback plan.

## Architecture guardrails
- B01 remains ESP32-S3 Sense binocular-head bench prototype with ordered displays, servos, PWM controller and audio.
- AI orchestration, memory and advanced voice run on a future suitable host, not in safety-critical motor-control paths.
- Hardware E-stop, actuator limits and dock interlocks must not depend on AI agents or third-party software.
- Keep character identities locked: NOVA orange/black, MILO white/electric blue, ZIGGY lime green/gunmetal.
- Preserve modular, model-agnostic, repairable Forever Build design.
