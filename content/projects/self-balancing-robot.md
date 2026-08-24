# Self-Balancing Robot

**Role:** Hardware + control + sim  
**Stack:** Arduino Nano, MPU6050, cascaded PID, imitation learning, RL  
**Links:** [Project page](https://ypx19.github.io/self-balancing-robot/) · [GitHub](https://github.com/ypx19/self-balancing-robot)

## Summary
Two-wheeled balancer built from scratch (IMU + encoder dual-loop PID), then the same plant in simulation so PID, behavior cloning, and RL can be compared on identical terrains.

## Highlights
- Cascaded angle/velocity PID on Arduino Nano firmware
- IL clones the expert; RL learns to lean into a grade
- Homepage front demo is a 3.6s RL-on-grade loop from the showcase film

## Media
- `assets/projects/self-balancing-sim-teaser.mp4` — 3.6s homepage loop (showcase 28.20–31.80s)
- `assets/projects/self-balancing-pipeline.png` — cascaded PID diagram
- Full film + hardware clip: project page
