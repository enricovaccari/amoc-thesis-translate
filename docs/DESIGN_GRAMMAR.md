# Design grammar — Living Atlantic (C3)

Every row = one perceptual mapping. This table *is* §7.x of the thesis in
embryonic form (O2.2: documented, transferable design grammar).

| ML feature | Bundle field | Perceptual channel | Justification | Scene |
|---|---|---|---|---|
| Latent position (PC1, PC2) | `trajectory_monthly.pc1/pc2` | Spatial position in the plane; motion of the beacon | Position is the highest-accuracy visual channel (Munzner 2014); motion is the strongest pre-attentive cue (Ware 2021) | III |
| Space of possible states | `manifold_cloud.pc` | Density fog (low opacity) | Density encodes distribution without symbolic reading (Ware 2021, ch. on texture/density) | III |
| Circulation intensity (PC1) | `trajectory_monthly.pc1` | Pulse rate + fullness of heartbeat | Rhythm→intensity of cyclic processes: robust auditory mapping (Hermann, Hunt & Neuhoff 2011); "ocean heartbeat" is canonical AMOC imagery | III–V |
| Vertical structure | `pca.eof1/eof2 × depth_m` | Morphing particle column, local speed ∝ Sv | Velocity→magnitude read without legend; embodied schema of current (Lakoff & Johnson 1999) | II |
| Anomaly membership | `anomalies.clusters[0]` | Desaturation + beat suppression | Absence as signal: felt discontinuity vs. read dip (Sterman 2008) | IV |
| Ensemble spread | `copernicus_ensemble.std` / `lower/upper` | Particle dispersion + timbral roughness | Uncertainty→roughness among most intuitive mappings for non-specialists (Hermann et al. 2011); DP2.2: uncertainty as felt quality, not annotation | V |

## Decisions taken (defend in Ch. 7)

- **Contemplative interaction, one degree of freedom (time).** The user is
  a witness, not a pilot. Direct latent-plane manipulation would suggest
  controllability of a system no human controls (cf. Sterman 2008 on
  illusions of control); it is documented as future work with
  Shneiderman (1983) as the road not taken.
- **Scene I carries no data.** Declared narrative function: the cognitive
  bridge from the visible (Greenland ice, O'Neill & Smith 2014) to the
  invisible (§1.4 of the thesis).
- **Palette is semantic.** Abyssal ground, fog of states, warm beacon
  (a submersible's lamp), desaturated scar. No alarmist red.

## Open questions (to resolve before the user study)

- Does Scena II need absolute Sv? → requires `mean_profile` in NB06 export.
- Scrub vs. autoplay-with-scrub-override for first-time participants.
- Minimal text annotations: how few words can Scena IV carry?
