# Living Atlantic — Storyboard (frozen)

Condition **C3** of *Making the Invisible Intelligible* (MSc thesis, Tomorrow
University). This document has two lives: it is the **implementation contract**
for all development work (human or Claude Code) and the **skeleton of thesis
§7.2**. Changes to this file are design decisions and must be justified;
code follows the storyboard, never the reverse.

**Design criterion (governs everything):** every perceivable element is
traceable to a field of `amoc_translate_bundle.json` and defensible with a
citation. Understanding — not preference — is the design target: each scene
declares what a participant should be able to *articulate* afterwards
(Harold et al. 2016 critique preference-based evaluation; this thesis
evaluates comprehension, E3.1–E3.2).

---

## The spine

An experiential **descent in five scenes**, ~5–8 minutes, from the visible
surface (Greenland ice) to the invisible engine (the AMOC latent space) and
finally **backwards in time** past the birth of measurement itself. The
descent literalises the thesis's narrative structure (§1.4: Greenland as
cognitive bridge, from the seen to the inferred) and exploits the
verticality image schema — down = deeper, hidden, fundamental — documented
as a pre-conceptual resource of human cognition (Lakoff & Johnson 1999;
Hurtienne 2011 on image schemas in design).

**One degree of freedom.** The user commands time (a scrub), never the
system. Witnessing, not piloting: direct manipulation of the latent plane
would suggest a controllability no human has over the AMOC and would feed
the illusions of control documented by Sterman (2008). Shneiderman (1983)
is cited in Ch. 7 as the road deliberately not taken; latent-plane
manipulation is future work.

**One sonic spine.** A heartbeat (Tone.js) runs through all scenes.
PC1 (circulation intensity) → pulse rate and fullness. Rhythm→intensity of
a cyclic process is among the most robust auditory mappings (Hermann, Hunt
& Neuhoff 2011), and "the ocean's heartbeat" is already canonical AMOC
imagery — the design amplifies an image the audience holds rather than
imposing a new one. Sound gives the experience continuity that vision,
scene-cut by scene-cut, cannot.

**Emotional arc (counter-design against Stoknes's five Ds).** The descent
counters *distance* by making the system present and embodied; the ending
counters *doom* by closing on epistemic agency (measurement as the lamp)
rather than catastrophe. Doom-framing triggers avoidance, not engagement
(Stoknes 2015); the last feeling of the experience is "keeping the
instruments in the water matters" — the SDG 13.3 early-warning argument
made perceptual.

---

## Scene I — The surface *(the visible)*

**Duration.** ~30–45 s. **Data.** None — declared narrative function.

**See / hear / do.** Near-white screen. Cold light, ice. Sparse crystalline
droplets in the sound field; no beat yet. Melt begins; droplets thicken;
the camera starts to sink with the water. The title appears and dissolves.
The user does nothing yet — the scene establishes tone and the descent
contract.

**Why.** The public arrives holding ice, not ocean: glacial imagery is one
of the few channels through which climate reaches non-expert cognition
(O'Neill & Smith 2014). Starting from the icon and descending to the
mechanism is the pedagogical trajectory promised in thesis §1.4. Carrying
no data is honest: Ch. 7 declares Scene I as narrative scaffolding, so no
informational-equivalence claim is contaminated.

**Target understanding.** "This experience will take me from something I
know to something I've never seen."

**Misreading risk.** User assumes the piece is *about* Greenland.
Mitigation: the descent visibly leaves the ice behind; Scene II opens in
open ocean at 26°N (one-line caption).

**Evaluate probe (think-aloud).** None — Scene I is not probed for
comprehension; its function is affective priming, noted as such in Ch. 8.

---

## Scene II — The column *(the physical body)*

**Duration.** ~60 s. **Data.** `pca.depth_m`, `pca.mean_profile`,
`pca.eof1/eof2`, `trajectory_monthly.pc1/pc2`.

**See / hear / do.** The descent crosses the water column at 26°N,
rendered as a living particle field: local particle speed and direction ∝
reconstructed transport `mean_profile + pc1·eof1 + pc2·eof2` (Sv) at that
depth — northward flow in the upper ~1100 m, the deep return below. As the
user scrubs time, the column breathes: the profile morphs month by month.
The heartbeat enters here, faint, synchronised to PC1. Depth ticks
(500/1000/3000 m) anchor scale.

**Why.** Velocity→magnitude is one of the few encodings non-experts read
without a legend, because it recalls the bodily experience of current
(Ware 2021 on motion as the strongest pre-attentive channel; Lakoff &
Johnson 1999 on embodied grounding of abstract magnitude). The scene is
literally the data — no invented dynamics: every particle's speed is a
reconstruction from the two retained modes, i.e. the flat manifold the
autoencoder certified (H2) put to representational work.

**Target understanding.** "The Atlantic moves as a structure: warm water
north above, cold water back below — and that whole structure can speed up
or slow down."

**Misreading risk.** Particles read as literal water parcels travelling the
whole basin. Mitigation: caption "transport at one latitude, 26°N";
probe checks for the misreading.

**Evaluate probe.** "In your own words, what is moving here, and what
would it mean for it to weaken?"

---

## Scene III — The engine room *(the latent space)*

**Duration.** ~90 s. **Data.** `manifold_cloud.pc`, `trajectory_monthly`
(pc1, pc2, time), `pca.var_explained`.

**See / hear / do.** The camera pulls back; the column abstracts into the
PC1–PC2 plane. The manifold cloud is the landscape — a fog of every state
the system has visited (daily record, 5-day stride). The monthly trajectory
draws itself as a luminous path under the user's scrub; the beacon (warm
lamp) marks *now*. Axis scaffolding, minimal: "weaker ⟵ circulation ⟶
stronger" at the horizontal extremes; the current year large near the
beacon. Heartbeat fully present, driven by PC1.

**Why.** Position in a plane is the highest-accuracy visual channel
(Munzner 2014), but only within an explicit frame of reference (Ware
2021) — hence the axis words. The scene is the thesis's core move made
perceptual: the ML latent space used not as analysis but as *place*, the
representational (not predictive) role of learned representations argued
by Iten et al. (2020) and identified in Ch. 3 as unexplored for public
climate communication. The cloud's elongated shape makes H2 (flat
manifold) visible to the naked eye; two numbers suffice to hold twenty
years of ocean — `var_explained` (97.9% in two modes) shown as a single
quiet caption.

**Target understanding.** "The whole system's state, month by month, can
be seen as a point that wanders — mostly along one direction — and it has
been wandering for twenty years."

**Misreading risk.** Axes read as geographic space (the point "travels the
ocean"). Mitigation: the Scene II→III transition shows the column
*collapsing into* the point, making the abstraction act explicit;
probe checks residual misreading.

**Evaluate probe.** "What does it mean when the bright point moves to the
left?" (comprehension of PC1 as intensity, not location).

---

## Scene IV — The scar *(2009–2010)*

**Duration.** ~45 s (camera dwell). **Data.** `anomalies.clusters[0]`
(2009-11-08 → 2010-03-20, 85 days), `anomalies.flagged_points`,
`trajectory_monthly`.

**See / hear / do.** The trajectory reaches the far-left region. The
scrub decelerates (scripted dwell); the fog desaturates; the path segment
turns desaturated red; the heartbeat thins toward silence — beats
suppressed, not stopped. One line of text, nothing else: "Winter
2009–2010. The circulation weakened by about a third. It was measured."
Then the beat returns as the path climbs back. (The record holds a second
plunge — winter 2012–13, the absolute monthly minimum, PC1 −138.3 in
March 2013; it stays unannotated in C3, discoverable by scrubbing, and is
discussed in Ch. 6 via Srokosz & Bryden 2015.)

**Why.** Absence as signal: a static chart shows the event as a dip to be
*read*; the experience renders it as a missing beat to be *felt* — the
distinction between reading a system and inhabiting its dynamics (Sterman
2008). Desaturation rather than alarm-red avoids doom aesthetics (Stoknes
2015). Dramaturgically this is the gravitational centre: tipping risk
acquires an empirical precedent — *it happened* — which collapses
psychological distance on its temporal axis (Spence et al. 2012;
van der Linden 2015).

**Target understanding.** "A near-stop is not hypothetical: the real
system already faltered once, recently, and instruments caught it."

**Misreading risk.** Overreading: "the collapse already began."
Mitigation: the recovery is shown with equal care (the beat returns);
probe explicitly asks what happened *after* 2010.

**Evaluate probe.** "What happened in the winter of 2009 — and then what?"

---

## Scene V — The threshold *(before the instruments)*

**Duration.** ~90 s + open exploration. **Data.**
`copernicus_ensemble` (time 1993-01→2023-12, mean, std, lower/upper,
members cglo/glor/oras), `meta.time_axes.rapid_daily_span`.

**See / hear / do.** The user keeps scrubbing — backwards. The path
approaches April 2004 and a threshold becomes material: **before this
date, no RAPID array existed.** Crossing it, the single crisp trajectory
dissolves into three ensemble members that visibly disagree; particles
disperse inside the lower/upper envelope; the fog loses grain; the
heartbeat acquires timbral roughness proportional to normalized ensemble
`std` (`heartbeat.setRoughness`). One caption: "Before 2004, no one was
measuring. This is what we can reconstruct — three attempts, three
answers." Scrubbing back past 2004 restores focus and clean pulse: the
lamp comes on. The experience ends here, on the threshold, facing the
un-measured past.

**Why.** This is DP2.2 realised: uncertainty as felt quality — material
dissolution and timbral roughness (Hermann et al. 2011 on
uncertainty→roughness as among the most intuitive mappings for
non-specialists) instead of error bars that non-experts systematically
invert into "unreliability" (Spiegelhalter 2017; Kause et al. 2020). The
temporal direction is the scientific-integrity move: the bundle contains
no future — the ensemble is reanalysis, 1993–2023 — so uncertainty is
framed as **absence of measurement**, not model weakness. The thesis's
own finding (RAPID inside the ensemble ±1σ only ~40% of months: the
ensemble is overconfident) justifies communicating spread as material
honesty rather than as a numerical band. Ending on the threshold turns
the emotional close from doom to agency: the RAPID array is the lamp in
the dark, and keeping it lit is the operational meaning of SDG 13.3's
"early warning".

**Target understanding.** "Uncertainty here means *nobody was measuring*;
the instruments are how we know — and knowing has a start date."

**Misreading risk.** "Models disagree, so science is unreliable"
(the Spiegelhalter inversion). Mitigation: the caption ties spread to
absence of instruments, not to model failure; the probe tests exactly
this reading — E3.2 commits to reporting the outcome either way.

**Evaluate probe.** "Why do the three lines disagree before 2004? What
would make them agree?"

---

## Informational equivalence with C1 and C2 (O2.1)

All three conditions serve the **same bundle**; differences observed in
the study are attributable to representational form, not content.

- **C1 — conventional static.** A publication-style panel: RAPID monthly
  transport line (2004–2024) with the 2009–10 dip annotated; Copernicus
  ensemble band 1993–2023; caption text carrying the same facts as C3's
  captions. The idiom of IPCC-style figures (Harold et al. 2016).
- **C2 — interactive dynamic.** The PC1–PC2 plane with time slider,
  tooltips and a linked transport chart. Interactivity without
  dramaturgy, sound or narrative arc.
- **C3 — Living Atlantic** (this storyboard).

The ladder C1→C2→C3 adds one representational stratum per step
(staticity → interactivity → experientiality), letting the thematic
analysis (Braun & Clarke 2006) attribute differences in articulated
understanding to the added stratum.

---

## Build order (risk-first)

III (engine, done in scaffold) → V (DP2.2, thesis contribution) → IV
(direction/dwell) → II (needs `mean_profile`, now in bundle) → I (pure
narrative, cheapest, last). Flexibility per §2.6: III+V alone already
carry DP2.1 and DP2.2.

## References to add to Zotero (verify DOIs first, per citation discipline)

Shneiderman (1983) direct manipulation; Hurtienne (2011) image schemas;
Srokosz & Bryden (2015) *Science* review of RAPID decade (2009–10 and
2012–13 events); Kause et al. (2020) if not yet present.
