# NOVA B01 binocular head — build sequence v1.0

## Gate 0 — receiving and verification
Verify seller SKU, electrical ratings, display controller, servo stall current, dimensions, camera interface, and physical quantities. Photograph measurements. Use regulated, protected supplies; no motor power through microcontroller GPIO or breadboard rails.

## Gate 1 — eye bench test
Flash ESP32-S3 Sense with minimal firmware; identify OLED bus and addresses. Run one OLED expression, then both displays with TCA9548A if address conflict exists. Measure refresh performance and current.

## Gate 2 — expression engine
Define eyes open/blink/look left/look right/curious/sleepy/alert, with event-driven animations. Store character expressions as reusable assets/configurations; keep display interface replaceable.

## Gate 3 — head movement
Test PCA9685 and one MG90S at a time with correctly rated independent servo supply, physical stops, current monitoring and motion limits. Add second servo for pan/tilt only after mount/torque checks.

## Gate 4 — audio and camera
Test MAX98357A with speaker and safe volume. Verify camera board/ESP32 variant and actual available pins, memory and performance; camera streaming and concurrent display/audio may require architectural changes.

## Gate 5 — packaging
Measure display PCB and active area, servo horn travel, camera field of view, speaker depth, wiring bend radii, fastener clearances, and thermal envelope. Draft head CAD after this point, preserving approved binocular silhouette.

## Gate 6 — physical alpha
Print removable head halves, lens-like bezels, service hatch, and head mounting bracket; bench-fit and iterate. Track fit, movement clearance, accessibility and cosmetic match.

## Later
Body, arms, locomotion, battery, universal dock, full AI computer, and multi-robot behavior are separate milestones. No walking or autonomous tool/flight claims for B01.
