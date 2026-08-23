const PIPELINE = [
  {
    title: "01 · RGB-D observation",
    body: "MuJoCoShelfEnvironment.get_observation() renders the eye camera with the robot hidden (geom group 3). Intrinsics come from vertical FOV. filter_interaction_masks() keeps instance masks whose pixels overlap the projected AABBs of interactive (bottom-row) books, so deco spines on upper decks cannot become the target.",
  },
  {
    title: "02 · Instance segmentation",
    body: "The front demo uses Detectron2 Mask R-CNN R50-FPN from the COCO model zoo, filtered to class book, then NMS (IoU and nested-cover). Tests and the tables on this page use HeuristicSegmentationBackend (saturated color blobs) so the suite does not require a GPU.",
  },
  {
    title: "03 · T-Match",
    body: "select_initial_part() picks the mask whose mean RGB is closest to the designated red spine. Each later interaction scores mask MSE against a deque of previous target masks plus a 32×16 spine appearance crop (weight 2.5). That is how the same book is tracked after neighbors are shoved inward.",
  },
  {
    title: "04 · Grasp planner Grsp(·)",
    body: "The target mask is backprojected with depth to a camera-frame cloud. HeuristicGraspPlannerBackend samples orientations about the cloud centroid for the website experiments. AnygraspBackend is the paper hook: pass planner_fn that maps SDK grasps to GraspCandidate(pose, score).",
  },
  {
    title: "05 · Constrained evaluation",
    body: "ConstrainedGraspEvaluator compares each candidate rotation to 80 default approaches about the shelf width axis (±45°). Score is 1 − geodesic/π. Below constrained_score_threshold (0.35) the adapter treats the target as not yet wrap-graspable and falls through to push.",
  },
  {
    title: "06 · Depth-filtered push or wrap grasp",
    body: "choose_push_part() takes the nearest centroid to the target, dropping objects deeper than the last push. Direction is shelf-inward plus a lateral shove away from the target. After target_pushes_required opening pushes, execute_grasp() pinch-lifts the nearest interactive book. Consecutive pushes do not return the arm to rest, so the demo does not freeze between interactions.",
  },
];

function renderPipelineDetail(i) {
  const step = PIPELINE[i];
  const el = document.getElementById("pipeline-detail");
  el.innerHTML = `<h3>${step.title}</h3><p>${step.body}</p>`;
}

function initPipeline() {
  const items = [...document.querySelectorAll("#pipeline-list li")];
  items.forEach((li) => {
    li.addEventListener("click", () => {
      items.forEach((x) => x.classList.remove("is-active"));
      li.classList.add("is-active");
      renderPipelineDetail(Number(li.dataset.step));
    });
  });
  renderPipelineDetail(0);
}

function pct(x) {
  return `${(100 * x).toFixed(0)}%`;
}

function barChart(el, rows) {
  el.innerHTML = rows
    .map(
      ([label, rate]) => `
      <div class="bar-row">
        <span class="label">${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${(100 * rate).toFixed(1)}%"></div></div>
        <span class="pct">${pct(rate)}</span>
      </div>`
    )
    .join("");
}

function table(el, columns, rows) {
  const head = columns.map((c) => `<th>${c}</th>`).join("");
  const body = rows
    .map((r) => `<tr>${r.map((c, i) => `<td class="${i ? "num" : ""}">${c}</td>`).join("")}</tr>`)
    .join("");
  el.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function condRows(block) {
  return Object.entries(block || {}).map(([name, s]) => [
    name,
    pct(s.success_rate),
    String(s.successes),
    String(s.n),
    s.mean_pushes_on_success.toFixed(2),
    `${s.mean_seconds.toFixed(2)}s`,
  ]);
}

function renderExperiments(data) {
  const t = data.tables || {};
  const status = document.getElementById("exp-status");
  const n = (data.trials || []).length;
  status.textContent = `${n} trials · ${data.notes || ""}`;

  const scene = t.scene_generalization || {};
  barChart(
    document.getElementById("chart-scene"),
    Object.entries(scene).map(([k, v]) => [k, v.success_rate])
  );
  table(
    document.getElementById("table-scene"),
    ["Look", "Success", "Wins", "N", "Pushes (succ.)", "s / trial"],
    condRows(scene)
  );

  const crowd = t.crowd_density || {};
  barChart(
    document.getElementById("chart-crowd"),
    Object.entries(crowd).map(([k, v]) => [k, v.success_rate])
  );
  table(
    document.getElementById("table-crowd"),
    ["Books", "Success", "Wins", "N", "Pushes (succ.)", "s / trial"],
    condRows(crowd)
  );

  const ab = t.mujoco_ablation || {};
  barChart(
    document.getElementById("chart-ablate"),
    Object.entries(ab).map(([k, v]) => [k, v.success_rate])
  );
  table(
    document.getElementById("table-ablate"),
    ["Variant", "Success", "Wins", "N", "Pushes (succ.)", "s / trial"],
    condRows(ab)
  );

  table(
    document.getElementById("table-toy"),
    ["Variant", "Success", "Wins", "N", "Pushes (succ.)", "s / trial"],
    condRows(t.toy_ablation || {})
  );
}

async function loadExperiments() {
  const status = document.getElementById("exp-status");
  try {
    const res = await fetch("data/experiments.json", { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    renderExperiments(await res.json());
  } catch (err) {
    status.textContent =
      "Experiment JSON not found. From the repo root run: .venv/bin/python scripts/run_experiments.py --out website/data/experiments.json";
  }
}

initPipeline();
loadExperiments();
