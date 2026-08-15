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
    title: 'The Engine Room',
    subtitle: 'The Atlantic as a moving state',
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
      'From state to state, does the ocean always go somewhere new? Or do you ' +
      'think it sometimes passes back through where it has been?',
    anchorHold: 'Hold your answer in mind.',
    button: 'Show me the map',
  },
  it: {
    title: 'Il Motore',
    subtitle: 'L’Atlantico come stato in movimento',
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
      'Di stato in stato, l’oceano va sempre verso posti nuovi? O pensi che a ' +
      'volte ripassi da dove è già stato?',
    anchorHold: 'Tieni a mente la tua risposta.',
    button: 'Mostrami la mappa',
  },
};

/**
 * Render the intro as HTML. Both conditions call this with the same lang.
 * Short TITLE centred, SUBTITLE directly under it (smaller italic serif), body
 * copy + question LEFT-ALIGNED. Inline styles override each file's own
 * #intro/#intro-screen CSS so the three conditions stay consistent by
 * construction (see intro-column.js for the rationale).
 */
export function introHTML(lang = 'en') {
  const t = INTRO[lang] || INTRO.en;
  return (
    `<h2 style="margin:0 0 9px">${t.title}</h2>` +
    `<div class="intro-subtitle" style="font-family:Georgia,'Times New Roman',serif;` +
      `font-style:italic;font-size:14px;letter-spacing:2px;opacity:.62;margin:0 0 30px">${t.subtitle}</div>` +
    t.paragraphs.map((p) => `<p style="text-align:left">${p}</p>`).join('') +
    `<p class="anchor-question" style="text-align:left">${t.anchorQuestion}` +
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
