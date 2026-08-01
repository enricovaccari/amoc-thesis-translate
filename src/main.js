/**
 * Living Atlantic — entry point.
 *
 * Master timeline: 1993-01 … 2024-03 (375 months). Two "rooms" in one
 * world: the engine room (Scena III, PC plane, observed era) and the
 * threshold room (Scena V, ensemble, to its LEFT — the past). Scrubbing
 * before April 2004 makes the camera glide left across the threshold.
 *
 * Index arithmetic:
 *   master i ∈ [0, 374]  →  month = 1993-01 + i
 *   trajectory index = i - 135  (2004-04 is master month 135)
 *   ensemble index   = i        (ensemble ends 2023-12)
 */

import * as THREE from 'three';
import { scaleLinear } from 'd3-scale';
import { loadBundle } from './core/loadBundle.js';
import { createScena3 } from './scenes/scena3.js';
import { createScena5, ROOM_CENTER_X } from './scenes/scena5.js';
import { createHeartbeat } from './audio/heartbeat.js';

const canvas = document.getElementById('scene-canvas');
const entry = document.getElementById('entry');
const enterBtn = document.getElementById('enter-btn');
const stage = document.getElementById('stage');
const scrub = document.getElementById('time-scrub');
const dateReadout = document.getElementById('date-readout');
const pc1Readout = document.getElementById('pc1-readout');
const audioToggle = document.getElementById('audio-toggle');
const sceneLabel = document.getElementById('scene-label');
const caption = document.getElementById('caption');
const axisScaffold = document.getElementById('axis-scaffold'); // NEW
const yearBig = document.getElementById('year-big');           // NEW

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const THRESHOLD = 135;      // master index of 2004-04
const N_MASTER = 375;       // 1993-01 … 2024-03

function masterToLabel(i) {
  const yy = 1993 + Math.floor(i / 12);
  const mm = String((i % 12) + 1).padStart(2, '0');
  return `${yy}-${mm}`;
}

async function init() {
  const data = await loadBundle();

  const scena3 = createScena3(data);
  const scena5 = createScena5(data);
  scena3.scene.add(scena5.group); // one world, two rooms
  const heartbeat = createHeartbeat();

  // Start the camera already inside the engine room so Scena V never
  // flashes on load: the sipario rises only once everything is in place.
  scena3.camera.position.x = 0;
  scena5.setFade(0);

  // ---- Audio mappings -------------------------------------------------------
  const pc1ToIntensity = scaleLinear()
    .domain(data.extents.pc1).range([0, 1]).clamp(true);
  const meanVals = data.ensemble.mean.filter(Number.isFinite);
  const meanToIntensity = scaleLinear()
    .domain([Math.min(...meanVals), Math.max(...meanVals)])
    .range([0, 1]).clamp(true);
  const stdVals = data.ensemble.std.filter(Number.isFinite);
  const stdToRoughness = scaleLinear()
    .domain([Math.min(...stdVals), Math.max(...stdVals)])
    .range([0, 1]).clamp(true);

  // ---- Camera glide state ---------------------------------------------------
  let targetX = 0;
  let fade = 1;

  // ---- The master timeline ---------------------------------------------------
  scrub.max = String(N_MASTER - 1);
  scrub.value = String(N_MASTER - 1); // begin in the present

  function setMaster(i) {
    const label = masterToLabel(i);
    dateReadout.textContent = label;
    const year = label.slice(0, 4);
    const observed = i >= THRESHOLD;

    if (observed) {
      const ti = Math.min(i - THRESHOLD, data.trajectory.n - 1);
      scena3.setMonth(ti);
      const pc1 = data.trajectory.pc1[ti];
      pc1Readout.textContent =
        `PC1 ${pc1 >= 0 ? '+' : ''}${pc1.toFixed(1)} (Sv-projection)`;
      heartbeat.setIntensity(pc1ToIntensity(pc1));
      heartbeat.setRoughness(0);
      targetX = 0;
      sceneLabel.textContent = 'Scena III — The engine room';
      caption.hidden = true;
      axisScaffold.hidden = false;   // NEW: frame of reference visible
      yearBig.textContent = year;    // NEW: the "when" beside the "where"
    } else {
      const std = data.ensemble.std[i];
      const mean = data.ensemble.mean[i];
      pc1Readout.textContent = Number.isFinite(std)
        ? `±${std.toFixed(1)} Sv across 3 reconstructions`
        : '';
      if (Number.isFinite(mean)) heartbeat.setIntensity(meanToIntensity(mean));
      if (Number.isFinite(std)) heartbeat.setRoughness(stdToRoughness(std));
      targetX = ROOM_CENTER_X;
      sceneLabel.textContent = 'Scena V — The threshold';
      caption.textContent =
        'Before 2004, no one was measuring. Three reconstructions, three answers.';
      caption.hidden = false;
      axisScaffold.hidden = true;    // NEW: PC-plane labels off in the past
    }

    if (i <= scena5.nMonths - 1) scena5.setMonth(i);
  }
  scrub.addEventListener('input', () => setMaster(Number(scrub.value)));

  // ---- Resize ---------------------------------------------------------------
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    scena3.resize(w, h);
  }
  window.addEventListener('resize', onResize);
  onResize();

  // ---- Entry ----------------------------------------------------------------
  enterBtn.addEventListener('click', async () => {
    entry.classList.add('leaving');
    stage.hidden = false;
    await heartbeat.start();
    setMaster(N_MASTER - 1);
  });

  // ---- Audio toggle ---------------------------------------------------------
  let muted = false;
  audioToggle.addEventListener('click', () => {
    muted = !muted;
    heartbeat.setMuted(muted);
    audioToggle.setAttribute('aria-pressed', String(!muted));
    audioToggle.textContent = muted ? 'sound off' : 'sound on';
  });

  // ---- Render loop ----------------------------------------------------------
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = clock.getDelta();
    scena3.tick(dt);

    const cam = scena3.camera;
    cam.position.x += (targetX - cam.position.x) * Math.min(1, dt * 2.5);

    fade = 1 - Math.min(1, Math.abs(cam.position.x) / Math.abs(ROOM_CENTER_X));
    scena3.setFade(Math.max(fade, 0.06));
    scena5.setFade(1 - fade + 0.04);

    renderer.render(scena3.scene, cam);
  });
}

init().catch((err) => {
  console.error(err);
  document.body.innerHTML =
    `<p style="padding:2rem;font-family:monospace">Failed to load the data bundle: ${err.message}</p>`;
});