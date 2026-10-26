# NOVA Forever Build — Build Readiness & Implementation Plan
Status: PREPARATION / working assumptions, not a validated engineering design
Updated: 2026-10-26

> Character continuity: the current approved family is NOVA (orange explorer), MILO (white/blue helper), and ZIGGY (green inventor). Older BUDDY/PIP labels are superseded historical concepts. Do not change the family roster without an explicit new decision.

## North star
Build NOVA as a small expressive independently mobile companion (camera eyes/face, voice, arms as feasible) that can physically dock into interchangeable powered carriers. First HOME dock; later tracked base, tools, and eventually a separately safety-reviewed flight carrier. MILO and ZIGGY are distinct characters sharing a compatible interface. AI/persona must be portable and model-agnostic, not locked to a chassis or cloud vendor.

## Design rules
1. Prototype using off-the-shelf low-voltage modules before ordering custom PCBs.
2. Document interfaces and version all firmware, CAD, wiring, BOM and tests in GitHub.
3. Isolate compute/AI from safety-critical motor and power control. Hardwired kill/disable, watchdog, current limits and fusing where appropriate.
4. Never directly parallel dissimilar power supplies/batteries. Use proper battery management and verified chargers; do not make exposed dock contacts live.
5. No unattended charging, autonomous motion near people, or flying until dedicated safety reviews.
6. Check reuse licenses: open-source code license does not imply downloadable STL/CAD/build kits are free for reuse.
7. All design choices below are candidates pending confirmation of ordered parts.

## Phase 0 — Before shipments arrive
- [ ] Inventory all existing orders: vendor, item, quantity, model, link, ETA, voltage/current, purpose, return window. Mark UNKNOWN until verified.
- [ ] Gather equipment: soldering station, multimeter, wire strippers, crimpers, heat shrink, breadboard, jumper wires, USB data cables, labeled bins, eye protection, fused current-limited bench supply if available.
- [ ] Create workstation: Python 3, Git, VS Code, USB drivers, Arduino IDE or PlatformIO, Onshape account, Flux account, optional ROS 2 environment only when hardware justifies it.
- [ ] Check PC and phone capabilities; assess spare Galaxy S20 Ultra as optional robot compute/display/camera, but don't assume it can host all workloads.
- [ ] Download and pin references: Rocky AI desk robot (https://github.com/cgro00/desk-robot), ROS 2 (https://docs.ros.org/), LeRobot (https://github.com/huggingface/lerobot), Open Duck Mini (https://github.com/apirrone/Open_Duck_Mini). Record licenses and versions.
- [ ] Set up workbench with separate labeled zones: untested / tested / faulty / installed.

## Phase 1 — Bench bring-up (no mechanical load)
Gate 1: each item is positively identified and tested independently.
- [ ] Inspect parts for shipping damage, verify labels/pinouts and operating voltage against datasheets.
- [ ] Power controller through known-good protected source; confirm serial connection and basic firmware upload.
- [ ] Bring up display and animated eye demo; verify dimensions, bus and frame rate.
- [ ] Test camera streaming and privacy indicator; avoid exposing feed publicly.
- [ ] Test microphone and speaker with local loopback.
- [ ] Test each servo at correct voltage using separate appropriately rated supply and shared signal ground where required. Never power servo loads from microcontroller GPIO.
- [ ] Test any motor driver with wheels/tracks off the ground and emergency stop.
- [ ] Log actual current draw and heat under idle/active loads.
Evidence: photos, serial logs, wiring diagram, measurements and pass/fail checklist.

## Phase 2 — Expressive NOVA head (Rocky-inspired, original design)
- [ ] Prototype animated face, moods, blink, gaze and simple lip-sync.
- [ ] Pan/tilt with mechanical limits and software limits.
- [ ] Camera face tracking with explicit opt-in; local stop and privacy controls.
- [ ] Voice: push-to-talk first, then wake word; keep an offline fallback where feasible.
- [ ] Lightweight local dashboard: camera preview, motion limits, expressions, microphone mute, status and stop.
- [ ] Store character/persona configuration separately from hardware drivers and AI provider integration.
Gate 2: 30-minute stable demo; no brownouts, overheating, runaway servos, or uncontrolled audio/video capture.

## Phase 3 — Body and mobility
- [ ] In Onshape: master parametric CAD assembly, dimensions, component envelopes, service access, wiring channels and mounting points.
- [ ] 3D print fit-test coupons before full body; check screws, tolerances and servo horns.
- [ ] Fit controller, camera, display, audio, battery and protected wiring.
- [ ] Ground mobility: low-speed manual control first; speed limits, collision avoidance, emergency stop and tip protection before autonomous motion.
- [ ] Optional arms only after stable body and power budget.
Gate 3: safe controlled motion on a clear test surface; battery runtime and thermal data recorded.

## Phase 4 — Universal NOVA Dock Interface (UDI) v0.1
Separate mechanical, electrical and protocol specifications.
- Mechanical: alignment guides, load path, retention/redundant positive lock, tolerances, insertion force, escape/release and serviceability.
- Electrical: agreed safe voltage envelope, keyed polarized connector, contact sequencing, overcurrent protection, power-source arbitration, safe de-energized contacts and battery-charge architecture reviewed before implementation.
- Data: module identity, capability discovery, authenticated pairing if networked, command timeout/watchdog, fault and e-stop propagation.
- State machine: UNDOCKED -> ALIGNING -> MECHANICALLY_LOCKED -> VERIFIED -> POWER_ENABLED -> ACTIVE; fault returns to safe disabled state.
- Bench test dock detection and identification without transferring battery power. Add power only after electrical review.
Gate 4: repeated dock/undock cycles without connector damage, accidental energization or unsafe release.

## Phase 5 — Carrier integration and other characters
- [ ] Tracked carrier: independent protected motor controller; NOVA issues high-level commands; carrier safety controller enforces limits.
- [ ] HOME dock: service, safe charging, telemetry, backup, update and diagnostics.
- [ ] MILO and ZIGGY: different appearance/personality, same UDI protocol where practical.
- [ ] Flight module: research only until independent aviation, structural, electrical, radio and fail-safe safety review. No flight testing based on a ground dock prototype.

## Candidate software architecture
- Robot MCU: deterministic sensor/servo/motor interfaces.
- Optional companion compute (old phone / SBC / PC): vision, speech, AI inference/API and dashboard.
- Hardware abstraction: versioned drivers with simulator/test mode.
- Persona/state: portable data format, backup and export; no assumption of persistent cloud memory.
- Carrier protocol: typed messages (identify, capabilities, status, command, fault, stop) and timeouts.
- Version-control code, pin maps, configuration and release notes.

## BOM tracker schema
Item | Vendor | Order ID (private) | Model | Qty | Voltage | Max current | Interface | Role | Ordered | ETA | Received | Bench tested | Notes
Do not publish order IDs, addresses, credentials, Wi-Fi secrets, or API keys to public GitHub.

## First-day arrival SOP
1. Photograph label and contents; match against order tracker.
2. Read datasheet and confirm power/polarity before plugging in.
3. Test one component at a time with current limit.
4. Record firmware/version, voltage/current, results and faults.
5. Label and store; do not permanently solder or print enclosures until pinout/fit is proven.

## GitHub proposed structure
NOVA/README.md
NOVA/planning/build-readiness.md (this file)
NOVA/bom/parts-tracker.csv
NOVA/hardware/udi/spec-v0.1.md
NOVA/hardware/wiring/
NOVA/mechanical/cad/
NOVA/software/firmware/
NOVA/software/companion/
NOVA/tests/
NOVA/research/tools/
Only the plan is created now; other paths are future work.

## Immediate unknowns to resolve
- Exact parts already purchased, quantities and ETAs
- Existing 3D printer access vs outsourced printing
- Current available laptop/desktop OS and compute capability
- Battery chemistry, motor type, driver and power requirements
- Desired first prototype: stationary expressive head or rolling/tracked robot
- Budget remaining after purchases

## Initial success criteria
A safe, expressive NOVA head: animated eyes + camera + mic/speaker + bounded pan/tilt + manually controlled dashboard + repeatable startup, with schematics, BOM, code and test evidence saved. Do not advance to custom PCB or autonomy before that milestone.
