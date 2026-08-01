/**
 * Scena III — The engine room (the latent space).
 *
 * The load-bearing scene: every other scene is a variation of this engine.
 *
 * Design grammar (→ Ch. 7, DP2.1):
 *   manifold_cloud (pc1,pc2)  → dim fog of possible states   [density]
 *   trajectory_monthly        → luminous path, drawn up to t [motion/position]
 *   current month             → beacon + trailing wake       [salience + direction:
 *                               Ware 2021, pre-attentive pop-out + motion]
 *   anomaly cluster 2009-10   → desaturated red segment      [Scena IV seed]
 *
 * Frame of reference (Ware 2021): position is the most accurate visual
 * channel but only communicates within an explicit reference. Axis labels
 * live in HTML (#axis-scaffold); the big year is updated from main.js.
 *
 * Interaction: contemplative, one degree of freedom (time). The user
 * commands time, never the system — witnessing, not piloting (H-A).
 */

import * as THREE from 'three';
import { scaleLinear } from 'd3-scale';

const WORLD = 100;   // half-extent of the PC plane in world units
const WAKE_LEN = 12; // months of glowing trail behind the beacon

export function createScena3(data) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#04101e');

  // One shared coordinate system for all PC-plane scenes.
  const pad = 1.08;
  const x = scaleLinear()
    .domain(data.extents.pc1.map(v => v * pad))
    .range([-WORLD, WORLD]);
  const y = scaleLinear()
    .domain(data.extents.pc2.map(v => v * pad))
    .range([-WORLD, WORLD]);

  // ---- The fog: manifold cloud ------------------------------------------
  const cloudN = data.cloud.pc1.length;
  const cloudPos = new Float32Array(cloudN * 3);
  for (let i = 0; i < cloudN; i++) {
    cloudPos[i * 3] = x(data.cloud.pc1[i]);
    cloudPos[i * 3 + 1] = y(data.cloud.pc2[i]);
    cloudPos[i * 3 + 2] = -2;
  }
  const cloudGeo = new THREE.BufferGeometry();
  cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPos, 3));
  const cloudMat = new THREE.PointsMaterial({
    color: new THREE.Color('#33506e'),
    size: 1.6,
    transparent: true,
    opacity: 0.6, // scelta di Enrico: nebbia più corposa
    depthWrite: false,
  });
  scene.add(new THREE.Points(cloudGeo, cloudMat));

  // ---- The river: monthly trajectory, drawn progressively ----------------
  const n = data.trajectory.n;
  const trajPos = new Float32Array(n * 3);
  const trajCol = new Float32Array(n * 3);

  // Identify months inside the dominant anomaly cluster (rank 0, 2009–2010)
  const scar = data.anomalies.clusters?.[0];
  const scarStart = scar ? scar.t_start.slice(0, 7) : null; // "YYYY-MM"
  const scarEnd = scar ? scar.t_end.slice(0, 7) : null;

  const cNormal = new THREE.Color('#7fb4d9');
  const cScar = new THREE.Color('#a34b4b');

  for (let i = 0; i < n; i++) {
    trajPos[i * 3] = x(data.trajectory.pc1[i]);
    trajPos[i * 3 + 1] = y(data.trajectory.pc2[i]);
    trajPos[i * 3 + 2] = 0;
    const t = data.trajectory.time[i];
    const inScar = scarStart && t >= scarStart && t <= scarEnd;
    const c = inScar ? cScar : cNormal;
    trajCol[i * 3] = c.r; trajCol[i * 3 + 1] = c.g; trajCol[i * 3 + 2] = c.b;
  }

  const trajGeo = new THREE.BufferGeometry();
  trajGeo.setAttribute('position', new THREE.BufferAttribute(trajPos, 3));
  trajGeo.setAttribute('color', new THREE.BufferAttribute(trajCol, 3));
  trajGeo.setDrawRange(0, 1);
  const trajMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });
  scene.add(new THREE.Line(trajGeo, trajMat));

  // ---- The wake: a trail of dots giving the motion a direction ------------
  // No shader: just WAKE_LEN separate small spheres behind the beacon, each
  // more transparent than the one ahead. Same "many small steps read as one
  // smooth tail" trick as the progressive line — nothing exotic.
  const wakeDots = [];
  for (let k = 0; k < WAKE_LEN; k++) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 12, 12),
      new THREE.MeshBasicMaterial({
        color: '#ffd9a0', transparent: true, opacity: 0,
      })
    );
    scene.add(dot);
    wakeDots.push(dot);
  }

  // ---- The beacon: current system state -----------------------------------
  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 32, 32),
    new THREE.MeshBasicMaterial({ color: '#ffb35c' })
  );
  scene.add(beacon);

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(2.4, 3.0, 64),
    new THREE.MeshBasicMaterial({
      color: '#ffb35c', transparent: true, opacity: 0.35, side: THREE.DoubleSide,
    })
  );
  scene.add(halo);

  // ---- Camera --------------------------------------------------------------
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  function resize(w, h) {
    const aspect = w / h;
    const half = WORLD * 1.15;
    camera.left = -half * aspect;
    camera.right = half * aspect;
    camera.top = half;
    camera.bottom = -half;
    camera.updateProjectionMatrix();
  }

  let fadeFactor = 1; // remembered so the wake respects threshold fading

  /** Update to month index i ∈ [0, n-1]. Called by the timeline. */
  function setMonth(i) {
    trajGeo.setDrawRange(0, i + 1);
    const px = trajPos[i * 3], py = trajPos[i * 3 + 1];
    beacon.position.set(px, py, 1);
    halo.position.set(px, py, 0.5);

    // Wake: place each dot on a past month, fading with age.
    for (let k = 0; k < WAKE_LEN; k++) {
      const j = i - (k + 1); // (k+1) months back, so the wake sits *behind*
      const dot = wakeDots[k];
      if (j < 0) { dot.material.opacity = 0; continue; }
      dot.position.set(trajPos[j * 3], trajPos[j * 3 + 1], 0.5);
      dot.material.opacity = (1 - k / WAKE_LEN) * 0.55 * fadeFactor;
    }
  }

  let t = 0;
  function tick(dt) {
    // A slow breath on the halo — ambient, not informational.
    t += dt;
    const s = 1 + 0.12 * Math.sin(t * 1.8);
    halo.scale.set(s, s, 1);
  }

  // ---- Fading (per l'attraversamento della soglia verso la Scena V) --------
  beacon.material.transparent = true;
  const fadables = [
    { mat: cloudMat, base: cloudMat.opacity },
    { mat: trajMat, base: trajMat.opacity },
    { mat: beacon.material, base: 1 },
    { mat: halo.material, base: halo.material.opacity },
  ];

  /** f ∈ [0,1]: 0 = la sala macchine si dissolve, 1 = pienamente presente. */
  function setFade(f) {
    fadeFactor = f;
    for (const { mat, base } of fadables) mat.opacity = base * f;
    for (const dot of wakeDots) dot.material.opacity *= f;
  }

  return { scene, camera, resize, setMonth, tick, setFade };
}