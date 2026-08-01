/**
 * Surface — the ice, the visible entry to Living Atlantic.
 * (Narrative scene, no bundle data.)
 *
 * Build step 3: two faceted icebergs in OUTLINE, each with an emerged
 * profile and a fainter submerged mass below a waterline. The submerged
 * hint carries a physical truth — most of the ice is underwater — while
 * keeping the scientific, drawn look.
 */

import * as THREE from 'three';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color('#04101e');

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
camera.position.z = 10;

// Waterline height in 0..100 space: everything below is "underwater".
const WATER = 34;

// ---- Two faceted iceberg profiles (emerged part), 0..100 space ---------
// Many small, irregular steps read as natural ice — not a smooth triangle.
const ICEBERG_LEFT = [
  [10, 34], [12, 44], [15, 41], [18, 53], [21, 49],
  [24, 61], [27, 57], [30, 68], [33, 60], [35, 55],
  [37, 47], [39, 40], [40, 34],
];

const ICEBERG_RIGHT = [
  [58, 34], [60, 43], [62, 39], [65, 50], [67, 45],
  [70, 58], [72, 52], [74, 63], [77, 56], [80, 48],
  [82, 52], [85, 41], [87, 34],
];

// ---- 0..100 → 3D world units -------------------------------------------
function toWorld([px, py]) {
  return new THREE.Vector3((px / 100) * 200 - 100, (py / 100) * 200 - 100, 0);
}

// Build a closed outline from a list of points, in a given colour/opacity.
function addOutline(coords, color, opacity = 1) {
  const pts = coords.map(toWorld);
  pts.push(pts[0]); // close the loop
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  scene.add(new THREE.Line(geo, mat));
}

// Mirror an emerged profile below the waterline to hint the submerged mass.
// We flip each point vertically around WATER and shrink it a little.
function submerged(coords) {
  return coords.map(([px, py]) => {
    const depth = (py - WATER) * 1.6; // underwater part is larger/deeper
    return [px, WATER - depth];
  });
}

// ---- Draw both icebergs ------------------------------------------------
addOutline(ICEBERG_LEFT, '#9fc4e3', 1);              // emerged: bright
addOutline(submerged(ICEBERG_LEFT), '#3a6b8f', 0.4); // submerged: faint
addOutline(ICEBERG_RIGHT, '#9fc4e3', 1);
addOutline(submerged(ICEBERG_RIGHT), '#3a6b8f', 0.4);

// ---- The waterline: a faint horizontal reference -----------------------
{
  const y = (WATER / 100) * 200 - 100;
  const pts = [new THREE.Vector3(-100, y, 0), new THREE.Vector3(100, y, 0)];
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: '#5b86ad', transparent: true, opacity: 0.3 });
  scene.add(new THREE.Line(geo, mat));
}

// ---- Camera and resize -------------------------------------------------
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  const aspect = w / h;
  camera.left = -100 * aspect;
  camera.right = 100 * aspect;
  camera.top = 100;
  camera.bottom = -100;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});