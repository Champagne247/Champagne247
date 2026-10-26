# Universal NOVA Dock Interface — preliminary design brief

**Not a manufacturing specification.** Do not energize a prototype based on this document alone.

## Functions
1. Mechanical keyed alignment and positive redundant retention.
2. Separate power and data paths, with module identity and compatibility negotiation.
3. Detection of insertion, locking and removal.
4. Power only after connector mating, correct orientation, compatible voltage and lock confirmation.
5. Safe shutdown and current limiting on faults, misalignment or disengagement.
6. HOME charging/service station plus future tracks, wheels, tool carriers and aircraft-specific adapters.

## Required deliverables before fabrication
- Dimensioned interface control drawing and tolerance stack-up.
- Connector selection with pinout, voltage/current ratings, creepage/clearance and wear rating.
- Lock mechanism, release path and manual recovery method.
- Power sequencing state machine, battery protection and fault tree.
- Bench test jig and mating-cycle test procedure.
- Flight platform requires independent engineering and safety approval; a common dock does not by itself establish flightworthiness.

## Prototype order
Unpowered alignment coupon -> mechanical latch fixture -> low-voltage current-limited test rig -> supervised carrier docking -> charging validation.
