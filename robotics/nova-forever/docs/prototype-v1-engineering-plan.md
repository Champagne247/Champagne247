# NOVA-1 prototype engineering plan v0.1
Date: 2026-10-26. Status: candidate design, no physical testing.

## Objective
Build an expressive orange/black NOVA robot with camera, voice, independently controlled head/arms and a low-speed detachable wheeled/tracked carrier. Preserve the universal dock and model-agnostic AI core. Target character height 254–305 mm; dimensions provisional.

## Architecture
- Raspberry Pi 5 (8GB candidate): high-level vision, audio, dialogue, logging and non-safety UI.
- Pico 2 (candidate): actuator command validation, watchdog, local sensor polling and safety-state logic; hardware E-stop must independently remove motor-drive enable/power.
- Two encoder gearmotors, correctly rated dual H-bridge, wheels/tracks and anti-tip geometry for first mobile platform.
- Camera Module 3 candidate, visible recording indicator, microphone/speaker, LCD face; camera interface and display connector compatibility to be checked.
- Dedicated servo power rail sized for measured peak currents; Pi never powers drive motors or servos directly.
- Protected battery, fuse, main switch, undervoltage handling, separately regulated 5V compute rail and motor rail.
- Mechanically keyed dock with redundant retention; initial dock coupon is unpowered.

## Integration order and exit gates
0. Inventory parts already owned; set footprint, target mass and payload.
1. Bench Pi + MCU serial link, safe boot, watchdog, camera and animated face; no motors attached.
2. Single motor with current-limited bench supply; encoder, current and thermal logging; verify driver limits.
3. Two-motor base; manual low-speed control and hardwired E-stop; test stop distance, tilt, and obstacle response.
4. Head pan/tilt, audio and arm mockups; verify torque, pinch guarding and stability.
5. Unpowered 3D-printed dock coupon; inspect tolerances and retention over repeated cycles.
6. Supervised docking at low speed; add protected power sequencing only after electrical review.
7. Modular shell and field-serviceability tests; then clone common interfaces for MILO/ZIGGY.

## Interface contracts (provisional)
- Pi to MCU: framed serial protocol, heartbeat, sequence number, command expiry, explicit safe state on link loss.
- MCU to motors: bounded velocity/acceleration, current limit and independent E-stop.
- Dock: module ID, mechanical lock sense, insertion sense, protected power negotiation, fault reporting.
- Persona: character-specific configuration separate from common hardware abstraction.

## Critical calculations before purchase
- Loaded mass and center of gravity; motor torque and duty cycle; wheel radius, gearing and target speed.
- Worst-case simultaneous servo current and startup surge; DC/DC derating, wire gauge and fuse sizing.
- Battery energy and measured runtime: runtime(h) ≈ usable battery Wh / average input W, not a guarantee.
- Pi 5 supply transient/thermal needs, connector compatibility, EMI and ground architecture.

## Safety and privacy
Hardwired E-stop, fused battery, protected charging, no energized exposed dock contacts, manual override, tip/obstacle halt, pinch guards, no autonomous tool/flight use, clear camera/mic controls, no default cloud upload.

## Definition of done for MVP
Demonstrate controlled motion, safe stop on E-stop/link loss, camera preview, voice interaction, animated face, replaceable battery/compute, repeatable unpowered dock fit, and logged test evidence.
