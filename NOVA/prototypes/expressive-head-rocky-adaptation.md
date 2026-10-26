# NOVA expressive head — Rocky reference adaptation

Status: READY TO CONFIGURE; no hardware-specific firmware has been validated
Date: 2026-10-26
Companion plan: [Build readiness](../planning/build-readiness.md)

## Reference and attribution
- Upstream: https://github.com/cgro00/desk-robot
- Upstream README: https://github.com/cgro00/desk-robot/blob/main/README.md
- Upstream wiring: https://github.com/cgro00/desk-robot/blob/main/docs/wiring.md
- Upstream protocol: https://github.com/cgro00/desk-robot/blob/main/docs/protocol.md
- Upstream Windows guide: https://github.com/cgro00/desk-robot/blob/main/docs/computer-control-windows.md
- Upstream firmware: https://github.com/cgro00/desk-robot/tree/main/firmware
- Upstream Python brain: https://github.com/cgro00/desk-robot/tree/main/server
- Upstream license: MIT, copyright 2026 Casey (github.com/cgro00); retain upstream license and notices in any copies/derivatives.
- This is an independently authored integration guide, not a verbatim copy of the upstream code or commercial hardware bundle. Creator's separate 3D-print/CAD/PCB bundles require their own terms/permissions.

## What Rocky actually uses (upstream V2 README)
- Seeed XIAO ESP32S3 Sense (integrated camera/microphone)
- 2.42-inch SSD1309 I2C OLED 128x64 (1.3-inch SH1106 supported via firmware config)
- 2 x MG90S metal-gear servos for pan and tilt
- MAX98357A I2S amp and small 4–8 ohm speaker (Dayton CE32A-8 in reference)
- 5 V >= 2 A USB-C power, 470 uF / 10 V capacitor, 1N5817 Schottky diode; correct power separation is essential
- Printed neck/head, mounting hardware and wiring/perfboard or separately licensed custom PCB
- Python 3.13 computer brain and PlatformIO firmware; Wi-Fi WebSocket between head and server
- AI provider key for language model; optional voice service key; do not commit keys

## NOVA's target architecture
NOVA head MCU -> low-level face display, bounded servos, mic/camera capture, speaker.
NOVA companion compute -> speech, optional vision, AI adapter, personality, dashboard.
Later NOVA body/controller -> separate safety-controlled mobility and docking.
Never let an AI response directly bypass motor limits, watchdogs, e-stop, or power interlocks.

## Hardware match table — DO NOT ASSUME PURCHASED
| Function | Rocky V2 reference | NOVA part received | Match | Action |
| --- | --- | --- | --- | --- |
| MCU/camera/mic | XIAO ESP32S3 Sense | UNKNOWN | PENDING | Confirm exact board and peripherals |
| Face display | 2.42-inch SSD1309 128x64 I2C | UNKNOWN | PENDING | Identify controller, bus, voltage, size |
| Pan/tilt | 2x MG90S | UNKNOWN | PENDING | Check servo type, voltage, travel, torque |
| Speaker/amp | MAX98357A + 4–8 ohm speaker | UNKNOWN | PENDING | Check amplifier protocol and impedance |
| Power | 5V 2A+ with protection | UNKNOWN | PENDING | Measure current, plan protected rails |
| Companion computer | Windows/Mac/Linux with Python 3.13 | UNKNOWN | PENDING | Identify machine and OS |
| Chassis/printing | Upstream separately distributed hardware files | NOVA ORIGINAL CAD | CUSTOM | Design in Onshape after measurement |
| Mobility | Not part of Rocky head reference | UNKNOWN | FUTURE | Keep separate from head bring-up |
| Dock | Not part of Rocky head reference | NOVA UDI | FUTURE | Develop own safe interface |

## Day-zero software preparation (no hardware required)
1. On development PC install Git, Python 3.13, VS Code and PlatformIO. Check OS support, particularly audio playback on Windows/Linux.
2. Clone upstream as a separate read-only reference working copy:
   `git clone https://github.com/cgro00/desk-robot.git rocky-reference`
3. Pin a specific upstream commit SHA before adapting; record it in this document. Do not blindly track upstream main.
4. Inspect upstream README, `firmware/platformio.ini`, `firmware/include/config.h`, `docs/wiring.md`, `docs/protocol.md`, `server/.env.example`, and `server/requirements.txt`.
5. Create NOVA-specific settings (name, expressions, display size, pin map, network settings). Keep credentials in local .env ignored by Git.
6. Start with software-only tests/simulation where available; don't claim camera/audio/servo behavior validated until real hardware is tested.
7. Decide if NOVA brain will run on desktop, SBC or reused phone; Rocky's Python server is desktop-oriented and is not automatically an Android app.

## On-arrival sequence — order matters
A. Inventory and photograph labels; verify voltage and pinout against datasheets.
B. Power MCU by USB only; identify serial port; flash simple test and monitor logs.
C. Bring up face display with matching driver.
D. Validate camera and mic independently; keep network local and authenticated.
E. Connect external fused/current-limited 5V servo/amp rail, shared reference ground as specified, correct isolation; no GPIO-driven servo power.
F. Center pan/tilt with no gears/horns fitted; test soft limits before full assembly.
G. Validate speaker/amp; avoid clipping/overcurrent.
H. Establish head-to-computer WebSocket link; test disconnect behavior.
I. Enable push-to-talk and simple voice reply before wake-word always-listening mode.
J. Add camera face tracking and expression behaviors, then dashboard.
K. Log current, temperature, power stability and 30-minute reliability test.

## Rocky-to-NOVA software adaptation work items
- [ ] Select pinned upstream release/commit; verify licenses/dependencies.
- [ ] Map pins and display driver to exact purchased controller.
- [ ] Rename wake word and personality to NOVA; do not retain Rocky's fictional character persona by default.
- [ ] Add interface for configurable voice provider and local fallback.
- [ ] Keep camera/mic privacy controls and clear activity indicators.
- [ ] Abstract face renderer and servo controller to support NOVA, BUDDY and PIP.
- [ ] Add safe stop, servo bounds, heartbeat, reconnection and offline behavior.
- [ ] Add test scripts and versioned BOM/wiring diagram.
- [ ] Only after bench success, build NOVA original CAD and consider custom Flux PCB.
- [ ] Keep future UDI dock messages and carrier control separate from head firmware.

## Critical decision gates
G0: confirmed parts inventory and PC OS.
G1: power, pin map and electrical compatibility verified.
G2: face + camera + audio + bounded pan/tilt stable.
G3: NOVA persona + dashboard + privacy controls functional.
G4: custom chassis fitted and repeatable.
G5: separate UDI dock prototype and independent safety review.

## First commit strategy
This file is a build-ready reference/adaptation specification. No Rocky source files are copied yet, because NOVA's actual purchased hardware inventory is not confirmed. After inventory, selectively vendor/fork MIT-licensed source with attribution and test it against the actual board. Do not copy paid CAD/STL/PCB files without permission.
