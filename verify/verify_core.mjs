/**
 * verify_core.mjs — assert the shared data core against the real bundle.
 *
 * Run:  node verify/verify_core.mjs
 *
 * Loads data/amoc_translate_bundle.json (fs, not fetch — Node context),
 * runs deriveAnchors() and reconstructProfile(), and asserts every anchor
 * the scenes will rely on. Exits non-zero on any FAIL.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { deriveAnchors, velocity } from '../shared/bundle.js';
import { reconstructProfile } from '../shared/reconstruct.js';

const bundlePath = fileURLToPath(new URL('../data/amoc_translate_bundle.json', import.meta.url));
const bundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
const pca = bundle.pca;
const traj = bundle.trajectory_monthly;
const depth = pca.depth_m;
const n = depth.length;

const A = deriveAnchors(pca);

// ---------------------------------------------------------------- helpers
const l2 = (a) => Math.sqrt(a.reduce((s, x) => s + x * x, 0));
const results = [];
function check(name, got, expected, tol, unit = '') {
  const pass = Number.isFinite(got) && Math.abs(got - expected) <= tol;
  results.push({ name, got, expected: `${expected} ±${tol}`, unit, pass });
}
function checkRange(name, got, lo, hi, unit = '') {
  const pass = Number.isFinite(got) && got >= lo && got <= hi;
  results.push({ name, got, expected: `[${lo} .. ${hi}]`, unit, pass });
}

// ---------------------------------------------------------------- grid
const spacing = depth.slice(1).map((d, i) => d - depth[i]);
const spacingMean = spacing.reduce((a, b) => a + b, 0) / spacing.length;
const spacingRatio = Math.max(...spacing) / Math.min(...spacing);
check('grid: n_levels', n, 307, 0);
check('grid: depth[0]', depth[0], 0, 0.1, 'm');
check('grid: depth[last]', depth[n - 1], 5995.1, 0.1, 'm');
check('grid: mean spacing', spacingMean, 19.59, 0.1, 'm');
check('grid: max/min spacing (near-uniform)', spacingRatio, 1.03, 0.01, 'x');

// ---------------------------------------------------------------- peak (P1)
check('peak: peakSv', A.peakSv, 16.808, 0.01, 'Sv');
check('peak: peakDepth', A.peakDepth, 1030.70, 0.1, 'm');
check('peak: peakIdx', A.peakIdx, 52, 0);

// ---------------------------------------------------------------- Psi zero
check('psiZeroDepth (grid)', A.psiZeroDepth, 4346.1, 0.1, 'm');
check('psiZeroDepth (interp)', A.psiZeroDepthInterp, 4340.85, 0.1, 'm');

// ---------------------------------------------------------------- velocity sign changes (P2)
check('velocity sign change 1 (N→S)', A.vSign1, 1050.4, 0.1, 'm');
check('velocity sign change 2 (S→N)', A.vSign2, 5065.4, 0.1, 'm');

// -------------------------------------------------- velocity() direct coverage
// The SHARED central-difference ∂Ψ/∂z (shared/bundle.js) — the same function
// thecolumn_tot.html and thecolumn-experiential.html delegate to for particle motion.
const vMean = velocity(pca.mean_profile, depth);
check('velocity: sign in upper limb (~516 m)', Math.sign(vMean[26]), 1, 0);
check('velocity: sign in return flow (~2017 m)', Math.sign(vMean[102]), -1, 0);
check('velocity: sign in abyssal cell (~5511 m)', Math.sign(vMean[281]), 1, 0);
check('velocity: ≈0 at the Ψ peak (idx 52)', Math.abs(vMean[52]), 0, 5e-4, 'Sv/m');
check('velocity: edge-safe (v[0] finite)', Number.isFinite(vMean[0]) ? 1 : 0, 1, 0);
check('velocity: edge-safe (v[last] finite)', Number.isFinite(vMean[n - 1]) ? 1 : 0, 1, 0);

// ---------------------------------------------------------------- PCA captions
check('pca: cumulative_2pc', A.cumulative2pc, 0.97855, 0.0001);
check('pca: var_explained[0]', A.varExplained[0], 0.89824, 0.0001);

// ---------------------------------------------------------------- basis norms
check('recon_basis: |pc1| (unit)', l2(pca.recon_basis.pc1), 1.0, 1e-3);
check('recon_basis: |pc2| (unit)', l2(pca.recon_basis.pc2), 1.0, 1e-3);
check('eof: |eof1| (NOT unit — display only)', l2(pca.eof1), 56.65, 0.05);
check('eof: |eof2| (NOT unit — display only)', l2(pca.eof2), 16.94, 0.05);

// ---------------------------------------------------------------- round-trip (Eq. 7.1)
let iMax = 0, iMin = 0;
for (let i = 1; i < traj.pc1.length; i++) {
  if (traj.pc1[i] > traj.pc1[iMax]) iMax = i;
  if (traj.pc1[i] < traj.pc1[iMin]) iMin = i;
}
const strongest = reconstructProfile(pca.mean_profile, pca.recon_basis.pc1, pca.recon_basis.pc2, traj.pc1[iMax], traj.pc2[iMax]);
const weakest   = reconstructProfile(pca.mean_profile, pca.recon_basis.pc1, pca.recon_basis.pc2, traj.pc1[iMin], traj.pc2[iMin]);
const maxStrong = Math.max(...strongest);
const maxWeak   = Math.max(...weakest);
checkRange(`round-trip: max Sv, strongest month (${traj.time[iMax]})`, maxStrong, 10, 25, 'Sv');
// iMax / iMin are the record's PC1 extremes (PC1 = dominant intensity mode, 89.8%
// of variance). Because PC1 dominates, these coincide with the strongest/weakest
// reconstructed transport. The weakest (2013-03) reconstructs to ~5.7 Sv — a real
// extreme low, independently flagged by the IsolationForest (cluster "2013", rank 4).
// The lower bound guards against a collapsed/exploded reconstruction (e.g. using
// eof instead of recon_basis), not against genuine weak states.
checkRange(`round-trip: max Sv, weakest month (${traj.time[iMin]})`, maxWeak, 4, 25, 'Sv');

// eof1 vs recon_basis.pc1 scale factor — documents WHY eof must never reconstruct
check('scale: |eof1| / |recon_basis.pc1|', l2(pca.eof1) / l2(pca.recon_basis.pc1), 56.65, 0.05, 'x');

// ---------------------------------------------------------------- report
const w = Math.max(...results.map(r => r.name.length));
let failed = 0;
console.log('\nVERIFY CORE — data/amoc_translate_bundle.json\n' + '─'.repeat(w + 46));
for (const r of results) {
  if (!r.pass) failed++;
  const got = typeof r.got === 'number' ? r.got.toFixed(4).replace(/\.?0+$/, '') : r.got;
  console.log(
    `${r.pass ? 'PASS' : 'FAIL'}  ${r.name.padEnd(w)}  got ${got}${r.unit ? ' ' + r.unit : ''}  (expected ${r.expected})`
  );
}
console.log('─'.repeat(w + 46));
console.log(failed === 0 ? `ALL ${results.length} CHECKS PASSED` : `${failed}/${results.length} CHECKS FAILED`);
process.exit(failed === 0 ? 0 : 1);
