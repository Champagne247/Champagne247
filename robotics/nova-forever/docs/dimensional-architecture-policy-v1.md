# NOVA Forever Build — dimensional and architecture control policy v1.0

Decision date: 2026-10-26. Approved direction: component-driven physical size, end-goal-first design, visual identities retained.

## End-state invariant
Three distinct, independently functional companion robots: NOVA orange/black explorer with binocular-inspired eyes; MILO white/electric-blue helper with smooth digital face; ZIGGY lime-green/gunmetal inventor with angular antenna ears. They share a universal modular dock and can physically board/operate compatible vehicles and return to independent mobility. Portable/model-agnostic AI architecture; serviceable/3D-printable construction. Walking, tool handling, and flight are future engineering goals, not claims about the first prototype.

## Dimensional policy
- The previously discussed 10–12 inch height is a *preliminary aesthetic target*, not a fixed engineering requirement.
- Final head/body/robot size must be derived from measured purchased and selected future components, mounting hardware, wiring bend radius, heat dissipation, battery volume, actuator torque, mass, center of gravity, safe clearances, and dock constraints.
- Record actual dimensions and mass of delivered components. For unpurchased components use documented manufacturer drawings and reserve uncertainty margin; do not finalize CAD until measured/verified.
- Design removable modules and replaceable mounts so B01 electronics testing doesn't lock the family into an undersized chassis.
- Keep a traceable requirements-to-parts matrix. Flag any new component that cannot be reused or explicitly justified as test equipment.
- Preserve character silhouettes/colors and distinct personalities, but permit modest proportional changes to achieve feasible mechanics.

## Packaging work products
1. Verified ordered-components inventory with model, footprint, weight, supply, interface, mounting and cable clearance.
2. Candidate future component envelopes for onboard compute, battery, cooling, motors, arm actuation, sensors, and dock.
3. Mass/center-of-gravity and power budget; locomotion stability and torque calculations.
4. Parametric overall height/width/depth envelopes and scaled head-to-body ratios; no arbitrary fixed dimension.
5. Dock interface control drawing with electrical safety, alignment and retention.
6. Dimensioned CAD only after hardware selection and fit checks, then print/test/revise.

## Decision gates
- B01: binocular-head electronics and audio validated; physical measurements captured.
- Body feasibility: final compute, power, locomotion and dock architecture have physical packaging envelopes.
- CAD freeze: all critical interfaces and mounting points verified; deviations from visual identity reviewed.
- Mobile prototype: supervised controlled motion and independent hardware safety stop.
- Family modules: each character and vehicle demonstrates mechanical interface compliance.
- Flight carrier requires independent aircraft engineering and safety validation.

## Purchasing discipline
Before each purchase: identify milestone, compatibility, end-state reuse, datasheet, dimensions, weight, supply/current, price and substitute. No duplicate purchases based on superseded Pi 5/Pico 2 generic BOM. Jetson Orin Nano Super remains a future candidate, not a confirmed purchase. No need to purchase everything at once.
