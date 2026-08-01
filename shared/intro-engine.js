/**
 * intro-engine.js — Screen 2 of Scene II ("The Engine Room"), shared verbatim
 * by BOTH study conditions.
 *
 * The static (C1, control) and experiential (C2+C3, experimental) files import
 * this SAME template, so the intro screen is byte-identical by construction —
 * informational equivalence (§7.2.2) as a property of the code, not a promise.
 * Only what appears AFTER the button click differs between conditions.
 *
 * Bilingual: both languages live here, so EN/IT equivalence between the two
 * conditions is also a property of the code. The anchor question is a
 * measurement instrument for the think-aloud protocol, not decoration: it
 * fixes the participant's prior belief about state recurrence BEFORE either
 * condition reveals anything. NEITHER condition may answer it on screen:
 * nothing may state that the system recurs, returns, cycles, repeats, or is
 * seasonal — that is the reading under measurement. The question itself only
 * offers the two possibilities symmetrically and asserts neither.
 *
 * anchorQuestion is ALSO the string the persistent question bar shows for the
 * whole scene (shared/scene-frame.js, via anchorQuestionHTML below), so the
 * task a participant is kept on is byte-identical to the task they were set —
 * in both conditions, by construction.
 */

export const INTRO = {
  en: {
    title: 'The Engine Room — the Atlantic as a moving state',
    paragraphs: [
      'Scene I showed the Atlantic as a tall column of water. This scene shows ' +
      'the same twenty years in a different way: each month, the entire state ' +
      'of the ocean is condensed into a single point on an abstract map.',
      'The map has no land and no familiar coordinates. It has one rule: two ' +
      'points close together are two months when the ocean was in a similar ' +
      'state; two points far apart are two months when it was in a very ' +
      'different one.',
    ],
    anchorQuestion:
      'Watching the ocean move from state to state over time, does it always ' +
      'go to new places, or does it sometimes pass back through where it has ' +
      'already been?',
    anchorHold: 'Hold your answer in mind.',
    button: 'Show me the map',
  },
  it: {
    title: 'Il Motore — l’Atlantico come stato in movimento',
    paragraphs: [
      'La Scena I mostrava l’Atlantico come un’alta colonna d’acqua. Questa ' +
      'scena mostra gli stessi vent’anni in un modo diverso: ogni mese, ' +
      'l’intero stato dell’oceano è condensato in un singolo punto su una ' +
      'mappa astratta.',
      'La mappa non ha terre né coordinate familiari. Ha una sola regola: due ' +
      'punti vicini tra loro sono due mesi in cui l’oceano era in uno stato ' +
      'simile; due punti lontani sono due mesi in cui era in uno stato molto ' +
      'diverso.',
    ],
    anchorQuestion:
      'Guardando l’oceano spostarsi da uno stato all’altro nel tempo, va ' +
      'sempre verso posti nuovi, o a volte ripassa da dove è già stato?',
    anchorHold: 'Tieni a mente la tua risposta.',
    button: 'Mostrami la mappa',
  },
};

/** Render the intro as HTML. Both conditions call this with the same lang. */
export function introHTML(lang = 'en') {
  const t = INTRO[lang] || INTRO.en;
  return (
    `<h2>${t.title}</h2>` +
    t.paragraphs.map((p) => `<p>${p}</p>`).join('') +
    `<p class="anchor-question">${t.anchorQuestion}` +
      `<span style="display:block;margin-top:14px;font-size:11px;opacity:.55">${t.anchorHold}</span></p>` +
    `<button id="intro-continue" type="button">${t.button}</button>`
  );
}

/**
 * The driving question alone — the string the persistent question bar shows
 * for the whole scene (shared/scene-frame.js). Same constant as the intro
 * screen renders, so the two can never drift apart, in either condition.
 */
export function anchorQuestionHTML(lang = 'en') {
  return (INTRO[lang] || INTRO.en).anchorQuestion;
}
