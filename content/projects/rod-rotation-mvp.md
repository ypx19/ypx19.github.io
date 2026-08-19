# Rod Rotation MVP

**Role:** Research lead  
**Stack:** MuJoCo, Stable-Baselines3 PPO, DexScrew-inspired rewards  
**Links:** [Interactive demo](https://ypx19.github.io/allegro_rod_mvp/demo.html) · [GitHub](https://github.com/ypx19/allegro_rod_mvp)

## Summary
RL study of three-finger in-hand rod rotation under tip constraints. Continuous mass curriculum (s=400→1) teaches a stable twisting gait that transfers to real target physics; fixed s=1 training does not.

## Highlights
- Curriculum eval success @ s=1: **100%** vs **20%** without curriculum (matched 1M-step budget)
- Side-by-side ablation videos + interactive demo gallery on GitHub Pages
- Documents assist cliffs, contact-reward bugs, and revolute vs tip-connect transfer

## Media
- `assets/projects/rod-rotation-curriculum.mp4` — curriculum policy loop (homepage card)
- `assets/projects/rod-rotation-comparison.mp4` — seed-1 side-by-side ablation
- Full gallery: `allegro_rod_mvp/docs/demo.html`
