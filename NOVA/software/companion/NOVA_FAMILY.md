# NOVA Family — Working Master Specification
Status: Active project knowledge. The October 26 NOVA Family artwork is the current visual reference; details remain design targets, not implemented hardware.

## Mission
One platform. Three personalities. Infinite possibilities.
Build expressive, independently mobile AI companions with a shared, model-agnostic software foundation and a universal modular docking ecosystem. A companion must function independently and may physically board a carrier, operate it, and exit.

## Character family — current artwork
- NOVA: orange-and-black rugged explorer / pathfinder; binocular camera eyes; navigation, observation, exploration, terrain awareness.
- MILO: white-and-blue helper; animated screen face; voice and visual interaction, family assistance, schedules, smart-home integration and task coordination.
- ZIGGY: green-and-white inventive maker; playful pointed-ear silhouette; prototyping, electronics, diagnostics, fabrication and experimentation.
CURRENT CHARACTER NAMES ARE NOVA, MILO, AND ZIGGY. Use these names consistently when describing the current NOVA Family. Historical drafts must not override the current artwork or character roster.

## Forever Build architecture
- A portable, model-agnostic NOVA AI core with local-first operation, optional cloud reasoning, durable memory and explicit permissioned tools.
- Companion bodies: expressive face/eyes, camera, microphones/speaker, onboard computing, battery, independent locomotion, serviceable and 3D-printable modules.
- Universal NOVA Dock Interface: mechanical alignment and positive redundant locking; power and data; module ID and auto-configuration; safety interlocks.
- First dock: HOME station for charging, maintenance and data synchronization.
- Future shared carriers: tracked tank, wheeled rover, quadcopter/flight platform, tool-arm platform, support carrier. These are planned modules, not current capabilities.
- Target illustration: approximately 10–12 inches tall, modular electronics, servo mounts, 3D-printed community-friendly parts; dimensions are not validated engineering specifications.

## Current verified software milestone
- Windows VS Code repository at C:\\nova-repo\\NOVA\\software\\companion, branch nova/hybrid-core-starter.
- Python CLI using local Ollama llama3.2:1b; optional opt-in OpenAI API mode.
- SQLite conversation history persisted across process restarts, verified by user screenshot.
- No physical actuation, sensors, voice I/O, autonomous tool permissions, or advanced semantic memory have been demonstrated.
- GitHub changes are visible locally only after git pull. Never claim to see or control the user's desktop in real time.

## Build priorities
1. Keep existing local chat and SQLite history working.
2. Load this knowledge at startup so the AI doesn't repeatedly ask about the already-established concept.
3. Add tested memory retrieval and clear distinction between established decisions and proposals.
4. Modularize model adapters, voice, vision, permissioned tools, and hardware interfaces.
5. Prototype inexpensive 3D-printable companion and HOME dock, then carriers with safety validation.

## Conversation rules
Do not repeatedly ask the user to restate known project decisions. Clearly label proposed versus implemented features. If newer user instructions or visual references conflict with older plans, prioritize the newer explicit direction and note unresolved details rather than inventing agreement.
