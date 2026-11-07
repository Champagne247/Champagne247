# NOVA-1 procurement gates — 2026-10-26

## Rule
Do not order parts until compatibility is checked. Do not finalize chassis or shell CAD until actual hardware is selected and measured. Conceptual envelopes and unpowered docking coupons may be drafted earlier.

## Gate A — inventory and reuse
- [ ] Check existing S20 Ultra: boots, battery swelling/damage, display/touch, USB, camera, Wi-Fi, audio; never use damaged lithium battery.
- [ ] Record existing soldering tools, meter, bench supply, motors, servos, camera modules, controllers, printers and batteries.
- [ ] Decide whether S20 acts as optional UI/compute device; retain independent motor MCU and hardwired E-stop.

## Gate B — select core parts
- [ ] Confirm compute: Raspberry Pi 5 or repurposed phone + dedicated controller; benchmark local voice/vision requirements.
- [ ] Confirm drive layout: two powered wheels plus caster for fastest MVP; optional tracks after mechanical validation.
- [ ] Calculate robot mass, wheel radius, slope, torque and continuous motor current before motor ratio selection.
- [ ] Select driver from actual motor stall current and supply voltage, with thermal/current margin.
- [ ] Choose camera, display, mic/speaker, head servos and power supply as a compatible set.
- [ ] Choose battery chemistry, protection, charger, fusing and DC/DC converters with an electrical schematic.

## Gate C — buy in stages
1. **Bench safety/control kit:** MCU, protected supply, E-stop, fuses, wiring and test equipment (only missing items).
2. **Expression kit:** compute, camera, display, microphone, speaker, head actuation after interfaces verified.
3. **Mobility kit:** measured drive motors, driver, wheels, chassis material and sensors after torque/current calculations.
4. **Dock kit:** unpowered connectors/coupons and latch test parts; powered contacts later.

## Gate D — mechanical design freeze
Photograph and measure each actual part: length/width/height, mounting-hole coordinates, connector clearance, cable bend radius, mass and heat dissipation. Then release CAD, printable STL/3MF, assembly diagrams and revisioned tests.

## Explicit exclusions
No purchase authorization, vendor quote, tested CAD, working robot or validated docking power circuit is implied by this plan.
