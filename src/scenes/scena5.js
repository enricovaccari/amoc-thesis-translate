/**
 * Scena V — The threshold (before the instruments).
 *
 * Storyboard contract (docs/STORYBOARD.md):
 *   copernicus_ensemble.members  → three reconstruction paths  [multiplicity]
 *   copernicus_ensemble.lower/upper → translucent envelope     [material spread]
 *   RAPID era (2004-04 →)        → warm lit region             ["the lamp"]
 *   ensemble std (pre-2004)      → timbral roughness (audio)   [DP2.2]
 *
 * Architecture note: this scene is a THREE.Group — a "room" placed to the
 * LEFT of the PC plane in the same world. Going back in time = the camera
 * glides left, and the threshold is crossed physically. One world, two
 * rooms, one continuous descent.
 */

import * as THREE from 'three';
import { scaleLinear } from 'd3-scale';

// Room geometry: half-width/height in world units, and where the room sits.
const ROOM_W = 150;
const ROOM_H = 65;
export const ROOM_CENTER_X = -430; // to the left of the PC plane (the past)

export function createScena5(data) {
  const group = new THREE.Group();
  group.position.x = ROOM_CENTER_X;

  const ens = data.ensemble;
  const n = ens.time.length; // 372 months, 1993-01 … 2023-12

  // ---- Coordinate frame of the room ---------------------------------------
  // x: month index → [-ROOM_W, +ROOM_W]   (left = deeper past)
  // y: transport in Sv → [-ROOM_H, +ROOM_H]
  const x = scaleLinear().domain([0, n - 1]).range([-ROOM_W, ROOM_W]);
  const svMin = Math.min(...ens.lower.filter(Number.isFinite));
  const svMax = Math.max(...ens.upper.filter(Number.isFinite));
  const y = scaleLinear().domain([svMin, svMax]).range([-ROOM_H, ROOM_H]);

  const iThreshold = ens.time.indexOf('2004-04'); // the array enters the water

  // Materials we will fade in/out from main.js.
  const fadables = [];

  // ---- The lamp: lit region where RAPID exists -----------------------------
  {
    const w = x(n - 1) - x(iThreshold);
    const geo = new THREE.PlaneGeometry(w, ROOM_H * 2.3);
    const mat = new THREE.MeshBasicMaterial({
      color: '#ffb35c', transparent: true, opacity: 0.06, depthWrite: false,
    });
    const lit = new THREE.Mesh(geo, mat);
    lit.position.set(x(iThreshold) + w / 2, 0, -3);
    group.add(lit);
    fadables.push({ mat, base: 0.06 });
  }

  // ---- The threshold line: April 2004 --------------------------------------
  {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x(iThreshold), -ROOM_H * 1.15, -1),
      new THREE.Vector3(x(iThreshold), ROOM_H * 1.15, -1),
    ]);
    const mat = new THREE.LineBasicMaterial({
      color: '#ffb35c', transparent: true, opacity: 0.55,
    });
    group.add(new THREE.Line(geo, mat));
    fadables.push({ mat, base: 0.55 });
  }

  // ---- The envelope: min/max across the three members ----------------------
  // A triangle strip between (x, lower) and (x, upper): the honest
  // "spread of reconstructions", rendered as translucent matter, not a bracket.
  {
    const pos = new Float32Array(n * 2 * 3);
    for (let i = 0; i < n; i++) {
      const lo = Number.isFinite(ens.lower[i]) ? ens.lower[i] : ens.mean[i];
      const hi = Number.isFinite(ens.upper[i]) ? ens.upper[i] : ens.mean[i];
      pos[i * 6 + 0] = x(i); pos[i * 6 + 1] = y(lo); pos[i * 6 + 2] = -2;
      pos[i * 6 + 3] = x(i); pos[i * 6 + 4] = y(hi); pos[i * 6 + 5] = -2;
    }
    const idx = [];
    for (let i = 0; i < n - 1; i++) {
      const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
      idx.push(a, b, c, b, d, c);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setIndex(idx);
    const mat = new THREE.MeshBasicMaterial({
      color: '#33506e', transparent: true, opacity: 0.22,
      depthWrite: false, side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(geo, mat));
    fadables.push({ mat, base: 0.22 });
  }

  // ---- The three members: three attempts, three answers ---------------------
  const memberKeys = ['cglo', 'glor', 'oras'];
  const memberColors = ['#6f9fc8', '#8fb8a8', '#9a8fc0']; // cool, kin, distinct
  const cursors = [];

  memberKeys.forEach((key, m) => {
    const series = ens.members[key];
    const pts = [];
    for (let i = 0; i < n; i++) {
      if (Number.isFinite(series[i])) {
        pts.push(new THREE.Vector3(x(i), y(series[i]), 0));
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: memberColors[m], transparent: true, opacity: 0.75,
    });
    group.add(new THREE.Line(geo, mat));
    fadables.push({ mat, base: 0.75 });

    // One small cursor per member: pre-2004 there is no single truth,
    // so the "now" marker itself is plural.
    const cur = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 16, 16),
      new THREE.MeshBasicMaterial({
        color: memberColors[m], transparent: true, opacity: 1,
      })
    );
    group.add(cur);
    cursors.push({ mesh: cur, series });
    fadables.push({ mat: cur.material, base: 1 });
  });

  // ---- API ------------------------------------------------------------------

  /** Move the plural cursor to ensemble month index i ∈ [0, n-1]. */
  function setMonth(i) {
    for (const c of cursors) {
      const v = Number.isFinite(c.series[i]) ? c.series[i] : null;
      c.mesh.visible = v !== null;
      if (v !== null) c.mesh.position.set(x(i), y(v), 1);
    }
  }

  /** f ∈ [0,1]: 0 = room invisible, 1 = fully present. */
  function setFade(f) {
    for (const { mat, base } of fadables) mat.opacity = base * f;
    group.visible = f > 0.01;
  }

  return { group, setMonth, setFade, iThreshold, nMonths: n };
}
