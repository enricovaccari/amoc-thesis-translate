/**
 * context.js — the level of context shared IDENTICALLY by both conditions.
 *
 * SYMMETRY RULE (§7.2.2, Tversky 2019): everything in this file is imported
 * verbatim by thecolumn-static.html AND thecolumn-experiential.html, so neither
 * group's footing differs by anything except perceptual form. Symmetry is a
 * property of the code, not of memory.
 *
 * THE HARD LINE — what this file may and may not say:
 *   MAY:   what the figure shows (plain language), where the data comes from,
 *          how to read the axes, what a unit means.
 *   NEVER: what the SHAPE of the curve means, that there are opposing cells,
 *          where the flow boundaries are (~1050 m / ~5065 m), what the peak
 *          implies. That structural knowledge is the quantity under
 *          measurement — we may teach both groups to read the speedometer;
 *          we may never tell either group how fast the car is going.
 *
 * All three blocks are NON-QUANTITATIVE FRAMING (provenance ledger,
 * Table 7.2): they describe the object and the mechanics, never the data.
 */

export const CONTEXT = {
  en: {
    // Data provenance — anchors C1 as the canonical scientific idiom.
    source: 'RAPID-MOCHA ARRAY, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026) &middot; DOI 10.5285/7086abc062f1',
    // One descriptive line, plain language, NO interpretation.
    describes: 'The average amount of water moving across the Atlantic at 26.5&deg;N, ' +
               'measured at every depth between 2004 and 2024.',
    // Makes the unit graspable without revealing structure. Without this,
    // "16.808 Sv" is equally meaningless to BOTH groups — fixing it is
    // symmetric and safe.
    sverdrupLines: [
      '1 Sv (SVERDRUP) = 10&#8310; m&#179;/s &asymp; THE COMBINED FLOW OF ALL THE WORLD&rsquo;S RIVERS',
      'THE TRANSPORTS ON THIS AXIS REACH ROUGHLY TWENTY TIMES THAT',
    ],
    // The "?" panel: the SAME teaching as the blocks above, in plain words for
    // a reader with no science background. Wording is deliberately true of the
    // static AND the experiential rendering — it describes the shared object
    // and the shared axes, never a channel only one condition has (no dots, no
    // motion, no colour regions). Teaches the instrument, never the reading.
    helpTitle: 'How to read this scene',
    helpLines: [
      'This picture is water: the Atlantic seen from the side, as one tall column.',
      'Up is the surface of the ocean. Down is the deep ocean, almost six kilometres below.',
      'Across the picture is how much water is moving at that depth.',
      'Look at what the water is doing at each depth, from the top of the column to the bottom.',
    ],
  },
  it: {
    source: 'RETE RAPID-MOCHA, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026) &middot; DOI 10.5285/7086abc062f1',
    describes: 'La quantità media di acqua che si muove attraverso l&rsquo;Atlantico a 26.5&deg;N, ' +
               'misurata a ogni profondità tra il 2004 e il 2024.',
    sverdrupLines: [
      '1 Sv (SVERDRUP) = 10&#8310; m&#179;/s &asymp; LA PORTATA COMBINATA DI TUTTI I FIUMI DEL MONDO',
      'I TRASPORTI SU QUEST&rsquo;ASSE ARRIVANO A CIRCA VENTI VOLTE TANTO',
    ],
    helpTitle: 'Come si legge questa scena',
    helpLines: [
      'Questa immagine &egrave; acqua: l&rsquo;Atlantico visto di taglio, come un&rsquo;unica alta colonna.',
      'In alto c&rsquo;&egrave; la superficie dell&rsquo;oceano. In basso l&rsquo;oceano profondo, quasi sei chilometri pi&ugrave; gi&ugrave;.',
      'Attraverso l&rsquo;immagine c&rsquo;&egrave; quanta acqua si sta muovendo a quella profondit&agrave;.',
      'Guarda che cosa fa l&rsquo;acqua a ogni profondit&agrave;, dalla cima della colonna fino al fondo.',
    ],
  },
};

const ctx = (lang) => CONTEXT[lang] || CONTEXT.en;

/** Data provenance block (rendered under the header in both conditions). */
export function sourceHTML(lang = 'en') {
  return ctx(lang).source;
}

/** Plain-language subtitle: what the figure shows — no interpretation. */
export function describesHTML(lang = 'en') {
  return ctx(lang).describes;
}

/** The unit, made graspable (rendered near the Ψ axis in both conditions). */
export function sverdrupHTML(lang = 'en') {
  return ctx(lang).sverdrupLines.join('<br>');
}

/**
 * The "?" help panel's content — { title, lines } — for shared/scene-frame.js.
 * Imported verbatim by BOTH conditions, so the teaching is byte-identical.
 */
export function helpContent(lang = 'en') {
  const c = ctx(lang);
  return { title: c.helpTitle, lines: c.helpLines };
}
