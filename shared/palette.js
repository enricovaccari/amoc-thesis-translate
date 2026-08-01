/**
 * palette.js — colours and typography shared by every scene.
 *
 * NON-INFORMATIONAL scaffolding, declared in the provenance ledger
 * (Table 7.2): semantic but non-quantitative — the conditions of legibility,
 * never carriers of data. No value here encodes a number from the bundle.
 *
 * Canvas 2D cannot resolve CSS variables in fillStyle/strokeStyle, so these
 * hex constants are the single definition; keep any CSS :root block in sync.
 */

export const COL = {
  abyss:     '#010811',   // background / near-black ocean
  north:     '#7fb4d9',   // northward flow (upper limb)
  northHi:   '#cfe8ff',   // northward flow, highlight
  deep:      '#24507a',   // southward deep return flow
  excursion: '#49b8a5',   // anomaly / excursion accent
  beacon:    '#ffb35c',   // amber anchors, labels, alerts
};

export const INK = {
  ink:     '#e7f0f7',                    // primary text
  inkSoft: 'rgba(231,240,247,0.55)',     // secondary text
};

export const FONT = {
  mono:  "ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace",  // UI, captions, readouts
  serif: "Georgia,'Times New Roman',serif",                                // title identity only
};
