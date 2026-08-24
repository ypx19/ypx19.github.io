# Wheel-Legged Robot (CJ-003)

**Role:** Reproduction + demos  
**Stack:** Genesis, MuJoCo, PyTorch PPO (rsl-rl), GitHub Pages  
**Links:** [Live demo](https://ypx19.github.io/wheel-leg-robotic/) · [Motions](https://ypx19.github.io/wheel-leg-robotic/#motions) · [GitHub](https://github.com/ypx19/wheel-leg-robotic)

## Summary
Surveyed public wheel-legged stacks, cloned [Albusgive/wheel_legged_genesis](https://github.com/Albusgive/wheel_legged_genesis), and shipped Genesis GPU eval of the v0.3.2 checkpoint plus a full motion repertoire site. Documents which commands the policy can track (and that jump/strafe are out of scope).

## Highlights
- Genesis CUDA eval: stayed up on eval gym (3.37 m), train gym (3.67 m), circular (3.93 m)
- 12 motion clips: idle, forward/back, turn, crouch, moonwalk, lean, …
- MuJoCo replay kept for accessibility; fall explained as sim2sim gap, not missing ckpt

## Media
- `assets/projects/wheel-leg-eval.gif` — Genesis terrain
- `assets/projects/wheel-leg-moonwalk.gif` — moonwalk command
