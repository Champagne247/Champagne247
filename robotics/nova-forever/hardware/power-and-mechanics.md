# Power and mechanical sizing worksheet

No dimensions or electrical ratings below are approved. Fill with measured/vendor values before procurement.

## Mass budget (grams)
Head/display/cameras: TBD; torso/computer: TBD; battery: TBD; arms/servos: TBD; wheels/drive: TBD; printed frame: TBD; total: TBD; center of gravity: TBD.

## Drive calculations
Required wheel torque = wheel radius × traction force. Traction force includes slope, acceleration, rolling resistance and design margin. Gearbox stall torque is not a continuous operating torque. Compare manufacturer efficiency/current curves at expected load. Validate tip stability with full head and arm extension.

## Power tree
Battery + protection + fuse + hard power switch -> protected motor supply and regulated compute/servo supplies. Logic-level enable is not a substitute for physically interrupting hazardous actuator energy. Pi 5 requires a suitable regulated supply and careful transient testing. Battery charger must match chemistry and pack protection; charging through dock remains phase 2.

## Tests
No-load/loaded motor current, sustained temperature, emergency stop, watchdog, voltage droop during servo motion, run-time, battery low-voltage cutoff, connector touch safety, repeated dock mating, drop/tip and cable strain relief.
