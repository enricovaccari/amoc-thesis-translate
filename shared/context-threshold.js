/**
 * context-threshold.js — the level of context shared IDENTICALLY by both
 * Scene III conditions ("The Threshold").
 *
 * SYMMETRY RULE (§7.2.2, Tversky 2019): everything in this file is imported
 * verbatim by thethreshold-static.html AND thethreshold-experiential.html, so
 * neither group's footing differs by anything except perceptual form.
 * Symmetry is a property of the code, not of memory.
 *
 * THE HARD LINE — what this file may and may not say:
 *   MAY:   what the display shows (plain language), where the data comes
 *          from, how to read three lines — this is the same Atlantic
 *          circulation as before, reconstructed by three independent models
 *          rather than measured directly; each line is one model's best
 *          estimate of the same quantity, month by month; close together
 *          means the models agree, spread apart means they disagree; what a
 *          Sverdrup is.
 *   NEVER: WHEN the spread is wide or narrow, that it shrinks over time,
 *          that RAPID/observations caused convergence, or that the past is
 *          less certain than the present. That is the quantity under
 *          measurement — we may teach both groups to read the instrument;
 *          we may never give either group the reading.
 *
 * DATA-DRIVEN STRINGS: every number a participant sees ({n} months, {y0},
 * {y1}) is a PLACEHOLDER filled at runtime from the bundle
 * (copernicus_ensemble.time) by both conditions through the same
 * substitution helper — nothing quantitative is typed here.
 */

export const CONTEXT = {
  en: {
    // Data provenance — same pattern as Scenes I–II.
    source: 'COPERNICUS MARINE GREP ENSEMBLE REANALYSIS &middot; 26.5&deg;N &middot; C-GLORS / GLORYS / ORAS5 &middot; DOI 10.48670/MOI-00024',
    // One descriptive line, plain language, NO interpretation.
    describes: 'The same Atlantic circulation as before, estimated by three ' +
               'independent scientific models in each of {n} months between {y0} and {y1}.',
    // The teaching floor: how to read the instrument, never the reading.
    readingLines: [
      'This is the same circulation as before, reconstructed by three independent models, not measured directly.',
      'Each line is one model&rsquo;s best estimate of the same quantity, month by month, {y0}&ndash;{y1}.',
      'Where the three lines sit close together, the models agree &middot; where they spread apart, they disagree.',
      'One Sverdrup (Sv) = 10&#8310; m&sup3;/s &asymp; the combined flow of all the world&rsquo;s rivers.',
    ],
    // The "?" panel: the SAME teaching as readingLines, in plain words for a
    // reader with no science background. Both conditions draw the same three
    // lines, so this wording is true of each. Teaches the instrument, never the
    // reading — it never says WHEN the lines are close or far apart.
    helpTitle: 'How to read this scene',
    helpLines: [
      'Each line is one scientific model&rsquo;s estimate of the same single quantity, month by month.',
      'Three different models, all trying to work out the same thing about the same ocean.',
      'Where the lines sit close together, the models agree with each other; where they spread apart, they disagree.',
      'Follow the three lines from one end of the record to the other.',
    ],
  },
  it: {
    source: 'RIANALISI D&rsquo;INSIEME COPERNICUS MARINE GREP &middot; 26.5&deg;N &middot; C-GLORS / GLORYS / ORAS5 &middot; DOI 10.48670/MOI-00024',
    describes: 'La stessa circolazione atlantica di prima, stimata da tre ' +
               'modelli scientifici indipendenti in ciascuno dei {n} mesi tra il {y0} e il {y1}.',
    readingLines: [
      '&Egrave; la stessa circolazione di prima, ricostruita da tre modelli indipendenti, non misurata direttamente.',
      'Ogni linea &egrave; la migliore stima di un modello della stessa quantit&agrave;, mese per mese, {y0}&ndash;{y1}.',
      'Dove le tre linee sono vicine, i modelli concordano &middot; dove si allontanano, non concordano.',
      'Uno Sverdrup (Sv) = 10&#8310; m&sup3;/s &asymp; la portata di tutti i fiumi del mondo messi insieme.',
    ],
    helpTitle: 'Come si legge questa scena',
    helpLines: [
      'Ogni linea &egrave; la stima di un modello scientifico della stessa identica quantit&agrave;, mese per mese.',
      'Tre modelli diversi, che cercano tutti di calcolare la stessa cosa sullo stesso oceano.',
      'Dove le linee sono vicine tra loro, i modelli concordano; dove si allontanano, non concordano.',
      'Segui le tre linee da un capo all&rsquo;altro del periodo.',
    ],
  },
};

const ctx = (lang) => CONTEXT[lang] || CONTEXT.en;

/** {placeholder} substitution — the ONE path every string passes through. */
function subst(s, vars) {
  if (!vars) return s;
  for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

/** Data provenance block (rendered in both conditions). */
export function sourceHTML(lang = 'en') {
  return ctx(lang).source;
}

/**
 * Plain-language subtitle: what the display shows — no interpretation.
 * vars: { n, y0, y1 } from copernicus_ensemble.time (never typed).
 */
export function describesHTML(lang = 'en', vars) {
  return subst(ctx(lang).describes, vars);
}

/**
 * The teaching floor, as an array of caption lines (rendered by both
 * conditions). vars: { y0, y1 } from copernicus_ensemble.time (never typed).
 */
export function readingLines(lang = 'en', vars) {
  return ctx(lang).readingLines.map((l) => subst(l, vars));
}

/**
 * The "?" help panel's content — { title, lines } — for shared/scene-frame.js.
 * Imported verbatim by BOTH conditions, so the teaching is byte-identical.
 * Carries no placeholder: nothing quantitative belongs in the help panel.
 */
export function helpContent(lang = 'en') {
  const c = ctx(lang);
  return { title: c.helpTitle, lines: c.helpLines };
}
