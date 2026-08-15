/**
 * context-engine.js — the level of context shared IDENTICALLY by both
 * Scene II conditions ("The Engine Room").
 *
 * SYMMETRY RULE (§7.2.2, Tversky 2019): everything in this file is imported
 * verbatim by theengine-static.html AND theengine-experiential.html, so
 * neither group's footing differs by anything except perceptual form.
 * Symmetry is a property of the code, not of memory.
 *
 * THE HARD LINE — what this file may and may not say:
 *   MAY:   what the display shows (plain language), where the data comes
 *          from, how to read the map — each dot is one month; close means
 *          alike, far means different; the two directions are the two main
 *          patterns of variation; position has no unit.
 *   NEVER: that the path returns to previous states, that it cycles
 *          annually, that months of the same season group together, or that
 *          particular years are unusual. That structural knowledge is the
 *          quantity under measurement — we may teach both groups to read the
 *          instrument; we may never give either group the reading.
 *
 * DATA-DRIVEN STRINGS: every number a participant sees ({n} months, {v1}%,
 * {v2}%, {t0}, {t1}) is a PLACEHOLDER filled at runtime from the bundle
 * (trajectory_monthly / pca.var_explained) by both conditions through the
 * same substitution helper — nothing quantitative is typed here.
 */

export const CONTEXT = {
  en: {
    // Data provenance — same pattern (and same record) as Scene I.
    source: 'RAPID-MOCHA ARRAY, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026) &middot; DOI 10.5285/7086abc062f1',
    // One descriptive line, plain language, NO interpretation.
    describes: 'The state of the Atlantic at 26.5&deg;N in each of {n} months between ' +
               '{y0} and {y1}, drawn as one point on a shared map.',
    // The teaching floor: how to read the instrument, never the reading.
    // Sentence casing — normal typography, no all-caps shouting.
    readingLines: [
      'Every point represents a month of the Atlantic&rsquo;s evolution &middot; position has no unit &middot; near means alike.',
      'Two points close together are two months when the ocean looked alike &middot; far apart, very different.',
      'Left&ndash;right is the largest pattern of variation ({v1}%) &middot; up&ndash;down the second ({v2}%).',
      'What matters is near and far, not the number.',
    ],
    // The "?" panel: the SAME teaching as readingLines, in plain words for a
    // reader with no science background. Both conditions show the same scatter,
    // so this wording is true of each. Teaches the instrument, never the
    // reading — no recurrence, no cycles, no seasons, no unusual months.
    helpTitle: 'How to read this scene',
    helpLines: [
      'Each dot is one month of the ocean &mdash; one month of the Atlantic, drawn as a single point.',
      'Dots close together are months when the ocean looked alike; dots far apart are months when it looked very different.',
      'The two directions of the map are the two main patterns the ocean varies in. The position itself has no unit.',
      'What matters is which dots are near each other and which are far.',
    ],
    // The "i" panel: general project + data context, non-leading. No machine
    // learning, no interaction specifics, no answer — identical in every
    // condition (static, experiential, TOT).
    infoTitle: 'About this visualization',
    infoLines: [
      'A research visualization from an MSc thesis at Tomorrow University &mdash; the &ldquo;Living Atlantic&rdquo; project.',
      'It shows the same Atlantic circulation at 26.5&deg;N (RAPID-MOCHA array, 2004&ndash;2024) drawn as a map of monthly states: each point is one month.',
      'Two points close together are two months when the ocean looked alike; the two axes are the two main patterns it varies in. Position has no unit.',
      'Nothing here tells you what to conclude &mdash; explore the map and form your own reading.',
    ],
  },
  it: {
    source: 'RETE RAPID-MOCHA, 26.5&deg;N &middot; 2004&ndash;2024 &middot; MOAT ET AL. (2026) &middot; DOI 10.5285/7086abc062f1',
    describes: 'Lo stato dell&rsquo;Atlantico a 26.5&deg;N in ciascuno dei {n} mesi tra il ' +
               '{y0} e il {y1}, disegnato come un punto su una mappa condivisa.',
    readingLines: [
      'Ogni punto rappresenta un mese dell&rsquo;evoluzione dell&rsquo;Atlantico &middot; la posizione non ha unit&agrave; &middot; vicino significa simile.',
      'Due punti vicini sono due mesi in cui l&rsquo;oceano si somigliava &middot; lontani, molto diversi.',
      'Sinistra&ndash;destra &egrave; il pattern di variazione pi&ugrave; grande ({v1}%) &middot; su&ndash;gi&ugrave; il secondo ({v2}%).',
      'Conta quanto sono vicini o lontani, non il numero.',
    ],
    helpTitle: 'Come si legge questa scena',
    helpLines: [
      'Ogni punto &egrave; un mese dell&rsquo;oceano &mdash; un mese dell&rsquo;Atlantico, disegnato come un solo punto.',
      'Punti vicini tra loro sono mesi in cui l&rsquo;oceano si somigliava; punti lontani sono mesi in cui era molto diverso.',
      'Le due direzioni della mappa sono i due pattern principali in cui l&rsquo;oceano varia. La posizione in s&eacute; non ha unit&agrave;.',
      'Conta quali punti sono vicini tra loro e quali lontani.',
    ],
    infoTitle: 'Informazioni sulla visualizzazione',
    infoLines: [
      'Una visualizzazione di ricerca da una tesi magistrale alla Tomorrow University &mdash; il progetto &ldquo;Living Atlantic&rdquo;.',
      'Mostra la stessa circolazione atlantica a 26.5&deg;N (rete RAPID-MOCHA, 2004&ndash;2024) disegnata come una mappa di stati mensili: ogni punto &egrave; un mese.',
      'Due punti vicini sono due mesi in cui l&rsquo;oceano si somigliava; i due assi sono i due pattern principali in cui varia. La posizione non ha unit&agrave;.',
      'Niente qui ti dice cosa concludere &mdash; esplora la mappa e formati la tua lettura.',
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
 * vars: { n, y0, y1 } from trajectory_monthly (never typed).
 */
export function describesHTML(lang = 'en', vars) {
  return subst(ctx(lang).describes, vars);
}

/**
 * The teaching floor, as an array of caption lines (rendered by both
 * conditions). vars: { v1, v2 } from pca.var_explained (never typed).
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

/**
 * The "i" info panel's content — { title, lines } — for shared/scene-frame.js.
 * General project + data context only; byte-identical across every condition.
 */
export function infoContent(lang = 'en') {
  const c = ctx(lang);
  return { title: c.infoTitle, lines: c.infoLines };
}
