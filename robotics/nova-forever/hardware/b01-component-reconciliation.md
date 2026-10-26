# NOVA B01 — October 25 component reconciliation

Date: 2026-10-26
Status: Earlier component identifications and design choices; verify exact seller SKUs and labels on arrival.

## First milestone
Build a working binocular-head prototype before designing the full mobile body. Use the parts already ordered where compatible. Do not order a Raspberry Pi 5 or Pico 2 just because they appear in the earlier generic planning BOM.

## Previously identified parts
- Seeed Studio XIAO ESP32-S3 Sense: intended head controller.
- 2.42-inch SSD1309 OLED displays: intended eye displays; the October 26 order thumbnail shows a multipack but does not independently verify model or dimensions.
- Four MG90S metal-gear servos: head and motion experiments.
- PCA9685 PWM servo driver board.
- TCA9548A I2C multiplexer board.
- MAX98357A audio amplifier and 8-ohm speaker.
- 5V 5A and 5V 3A power adapters; output ratings and polarity need physical label checks.
- Breadboards, jumper wires, capacitors and terminal breakout board.

## Future hardware
NVIDIA Jetson Orin Nano Super is planned, not confirmed purchased. Older Samsung S20 Ultra is a possible reusable device, not required for initial B01 testing.

## Verification and safety gates
1. Match each delivered product to its exact order title, SKU, datasheet and physical dimensions.
2. Verify OLED driver, bus type, I2C addresses, and ESP32-S3 library compatibility.
3. Verify servo stall currents, PCA9685 logic voltage, and independent servo supply.
4. Verify amplifier pinout and speaker impedance; check common ground arrangements.
5. Bring up one eye display, then the second, then one servo, then audio; document each test.
6. Do not power motors or multiple servos from controller pins or solderless breadboard rails.
7. Defer final head CAD until actual component sizes, connector clearance and cable paths are measured.

## Documentation precedence
This B01 plan is the first physical prototype. Generic Pi 5 / Pico 2 / geared-drive BOM is for a later optional mobility architecture, not an immediate shopping list.
