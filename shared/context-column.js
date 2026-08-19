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
 *          how to read the axes, what a unit means, and — added deliberately —
 *          what the plotted quantity FUNDAMENTALLY IS: that Ψ is an accumulated
 *          (integrated) transport, a volume flow, and is therefore NOT itself a
 *          local velocity. A non-specialist cannot be expected to infer Ψ's
 *          mathematical nature from the picture, so we state it as neutral
 *          background (identically to both groups).
 *   NEVER: what the SHAPE of the curve means, that there are opposing cells,
 *          where the flow boundaries are (~1050 m / ~5065 m), what the peak
 *          implies, or which way the flow runs at any depth. That structural
 *          knowledge is the quantity under measurement — we may say a
 *          speedometer reads accumulated distance, not speed; we may never tell
 *          either group how fast, or in which direction, the car is going.
 *
 * All three blocks are NON-QUANTITATIVE FRAMING (provenance ledger,
 * Table 7.2): they describe the object and the mechanics, never the data.
 */

export const CONTEXT = {
  en: {
    // Data provenance — anchors C1 as the canonical scientific idiom.
    source: 'RAPID-MOCHA ARRAY, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026)<br>DOI 10.5285/7086abc062f1',
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
      'Across the picture is the overturning stream function (&Psi;): an accumulated &mdash; integrated &mdash; measure of how much water is transported (a volume flow in Sverdrups), not the local speed of the water itself.',
      'How the water moves at a given depth is a related but distinct quantity: it corresponds to how this accumulated measure changes with depth, rather than to its value.',
      'Look at what the water is doing at each depth, from the top of the column to the bottom.',
    ],
    // The "i" panel: general project + data context, non-leading. No machine
    // learning, no interaction specifics, no answer — safe and identical in
    // every condition (static, experiential, TOT).
    infoTitle: 'About this visualization',
    infoLines: [
      'A research visualization from an MSc thesis at Tomorrow University &mdash; the &ldquo;Living Atlantic&rdquo; project.',
      'It shows the Atlantic overturning circulation at 26.5&deg;N &mdash; how much water moves at each depth &mdash; from the RAPID-MOCHA mooring array, 2004&ndash;2024 (Moat et al., 2026).',
      'The horizontal axis is transport in Sverdrup (1 Sv = 10&#8310; m&#179;/s &asymp; the combined flow of all the world&rsquo;s rivers); the vertical axis is depth, with the surface at the top.',
      'Nothing here tells you what to conclude &mdash; look at the profile and form your own reading.',
    ],
  },
  it: {
    source: 'RETE RAPID-MOCHA, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026)<br>DOI 10.5285/7086abc062f1',
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
      'Attraverso l&rsquo;immagine c&rsquo;&egrave; la funzione di corrente del ribaltamento (&Psi;): una misura accumulata &mdash; integrata &mdash; di quanta acqua viene trasportata (una portata volumetrica in Sverdrup), non la velocit&agrave; locale dell&rsquo;acqua stessa.',
      'Come si muove l&rsquo;acqua a una data profondit&agrave; &egrave; una quantit&agrave; correlata ma distinta: corrisponde a come questa misura accumulata cambia con la profondit&agrave;, piuttosto che al suo valore.',
      'Guarda che cosa fa l&rsquo;acqua a ogni profondit&agrave;, dalla cima della colonna fino al fondo.',
    ],
    infoTitle: 'Informazioni sulla visualizzazione',
    infoLines: [
      'Una visualizzazione di ricerca da una tesi magistrale alla Tomorrow University &mdash; il progetto &ldquo;Living Atlantic&rdquo;.',
      'Mostra la circolazione di ribaltamento dell&rsquo;Atlantico a 26.5&deg;N &mdash; quanta acqua si muove a ogni profondit&agrave; &mdash; dalla rete di ormeggi RAPID-MOCHA, 2004&ndash;2024 (Moat et al., 2026).',
      'L&rsquo;asse orizzontale &egrave; il trasporto in Sverdrup (1 Sv = 10&#8310; m&#179;/s &asymp; la portata di tutti i fiumi del mondo messi insieme); l&rsquo;asse verticale &egrave; la profondit&agrave;, con la superficie in alto.',
      'Niente qui ti dice cosa concludere &mdash; osserva il profilo e formati la tua lettura.',
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

/**
 * The "i" info panel's content — { title, lines } — for shared/scene-frame.js.
 * General project + data context only; imported verbatim by every condition, so
 * it is byte-identical across static, experiential and TOT.
 */
export function infoContent(lang = 'en') {
  const c = ctx(lang);
  return { title: c.infoTitle, lines: c.infoLines };
}
