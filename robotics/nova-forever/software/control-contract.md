# Control software contracts v0.1

## Roles
Linux SBC: voice, face, perception, optional AI adapter, mission planning, diagnostics. MCU: motor command validation, sensor reading, heartbeat and controlled stop. Independent hardware E-stop removes actuator drive energy.

## State machine
BOOT -> SAFE_IDLE -> MANUAL_ARMED -> MOVING -> SAFE_IDLE. Any fault, E-stop, timeout, undervoltage, overcurrent, tilt or invalid module identity -> FAULT_SAFE. Recovery requires physical check and explicit rearm.

## Messages (draft)
HELLO(protocol_version,device_id,capabilities); HEARTBEAT(seq); SET_VELOCITY(left,right,expiry_ms); STOP(reason); STATUS(state,faults,battery,current,encoder); DOCK_ID(id,capabilities). Transport/framing and checksum TBD.

## Persona separation
NOVA explorer, MILO helper, ZIGGY inventor each has unique colors, voice style, expression set and permissions, but shares HAL, dock protocol and safety supervisor.

## Validation
Inject serial loss, stale messages, invalid values, watchdog resets, motor-driver faults and dock disengagement. No LLM can bypass hard safety controls.
