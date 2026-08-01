/**
 * reconstruct.js — the reconstruction formula, isolated (Eq. 7.1 of the thesis).
 *
 *     profile(t) = mean_profile + pc1(t)·recon_basis.pc1 + pc2(t)·recon_basis.pc2
 *
 * Units: Sverdrup (Sv). B1/B2 MUST be the unit vectors `recon_basis.pc1` /
 * `recon_basis.pc2` (L2 norm = 1), paired with the raw pc1/pc2 scores.
 * NEVER pass `eof1`/`eof2` here: those are Sv-scaled loadings for DISPLAY of
 * the mode shape only (|eof1| ≈ 16.8 Sv — using them inflates the profile ~2.4×).
 * See the bundle's `pca.notes.eof_vs_basis`.
 *
 * Pure function: no global state, no DOM, no bundle knowledge. Every scene
 * (static and experiential alike) rebuilds profiles through this one function,
 * so informational equivalence is a property of the code, not a promise.
 */
export function reconstructProfile(mean, B1, B2, pc1, pc2) {
  const n = mean.length;
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = mean[i] + pc1 * B1[i] + pc2 * B2[i];
  }
  return out;
}
