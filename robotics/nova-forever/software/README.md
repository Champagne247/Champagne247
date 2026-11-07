# Software architecture — draft

```text
Character persona (NOVA / MILO / ZIGGY)
  -> dialogue and task planner (model-agnostic adapter)
  -> permission and safety supervisor
  -> skills: voice, vision, navigation, dock, tools
  -> hardware abstraction layer
  -> motor/sensor controllers
```

## First implementation targets
- Offline safe-idle and manual control; optional cloud AI with explicit consent.
- Configurable persona files for speech style, role, behaviors and expressions.
- Capability discovery by attached module ID; reject unknown/unsafe modules.
- Event log, diagnostics, watchdog, actuator limits and hardware E-stop.
- Explicit user approval for high-impact physical actions.
- Privacy: local processing where practical, microphone/camera controls, no default recording/upload.

No executable firmware or autonomy software has been implemented yet.
