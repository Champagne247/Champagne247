# NOVA Forever Build architecture — working draft

## Design principles
1. Persistent, model-agnostic AI identity separate from hardware chassis.
2. Three provisional characters (NOVA, BUDDY, PIP), each independently expressive/mobile.
3. Shared universal docking and carrier interface with HOME as first station.
4. Interchangeable tracked, wheeled, legged, aerial and tool modules as future possibilities, not completed capabilities.
5. Hardware abstraction layer separates speech/vision/planning from motor control.
6. Emergency stop, power isolation, module identification, positive locking and fail-safe behavior required before powered carriers.

## Proposed modules
- Companion core: compute, microphone, speakers, cameras, expressive display/eyes.
- Mobility: independent basic movement; tracked carrier first optional vehicle.
- Dock: alignment, dual confirmation of lock state, power and data connectors, module ID, interlocks.
- Software: perception, speech, dialogue, command authorization, motion control, telemetry, logs.

## Open engineering decisions
Compute board, motor types, wheel/track dimensions, battery pack, charger, voltage rails, connector pinout, dock tolerances, weight targets, budget and first delivery inventory. All require measurement or verification.
