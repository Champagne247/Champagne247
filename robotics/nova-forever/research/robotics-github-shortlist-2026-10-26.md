# Robotics GitHub research shortlist — 2026-10-26

Source: user-shared AI Mode roundup. These are candidates, not approved dependencies. Verify maintenance, license, exact repository identity and current support before adoption.

## Relevant repositories
- https://github.com/cyberbotics/webots — early robot simulation; candidate for kinematics, sensors, physical packaging and future movement.
- https://github.com/AtsushiSakai/PythonRobotics — navigation, localization and planning reference algorithms; mainly host-side experiments.
- https://github.com/ros2/ros2 — future middleware for higher-level robot subsystems; not required for B01 microcontroller bring-up.
- https://github.com/mjyc/awesome-robotics-projects — physical robot, arms, printed hardware design references.
- https://github.com/bulletphysics/bullet3 — optional rigid-body simulation / dynamics.
- https://github.com/RobotLocomotion/drake — advanced modeling, planning and control; evaluate only when complexity justifies it.
- https://github.com/Ly0n/awesome-robotic-tooling — engineering tools and testing directory.
- https://github.com/jslee02/awesome-robotics-libraries — robotics math, kinematics and control library directory.
- https://github.com/TianxingChen/Embodied-AI-Guide — embodied AI research directory.

## Fit to Forever Build
First prototype remains NOVA B01 ESP32-S3 Sense binocular head, two display candidates, pan/tilt servo testing, audio and camera. No ROS 2, large AI runtime, or simulation requirement for first bench test. Component measurements and verified hardware specifications determine robot dimensions; original NOVA/MILO/ZIGGY visual identities remain fixed. Full-body simulation should follow selection of candidate actuators, battery, compute, wheels/legs and dock geometry.

## Research and adoption sequence
1. Validate B01 hardware, interfaces and safe motion limits.
2. Capture exact mechanical envelope, mass, power and thermal budget of selected future components.
3. Build simple kinematic/packaging model; assess whether Webots helps.
4. Evaluate ROS 2 on a suitable future companion computer, with microcontroller handling deterministic actuator control and safety independently.
5. Consider navigation and dynamics libraries only against defined functional tests.
6. Keep external projects isolated until license, security, maintenance and test requirements are met.

## Long-term target
Three independently mobile, expressive companions, a model-agnostic AI architecture, and a shared universal dock for optional ground carriers, tools and future flight platform. No assumption that simulation validates safety or that a repo supplies ready-to-print hardware.
