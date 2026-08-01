/**
 * intro.js — Screen 1 of Scene I, shared verbatim by BOTH study conditions.
 *
 * The static (C1, control) and experiential (C3, experimental) files import
 * this SAME template, so the intro screen is byte-identical by construction —
 * informational equivalence (§7.2.2) as a property of the code, not a promise.
 * Only what appears AFTER the button click differs between conditions.
 *
 * Bilingual: both languages live here, so EN/IT equivalence between the two
 * conditions is also a property of the code. The anchor question is a
 * measurement instrument for the think-aloud protocol, not decoration: it
 * fixes the participant's prior belief about depth-dependent flow direction
 * before either condition reveals anything. NEITHER condition may answer it on
 * screen: nothing may say that water above and below some depth flows in
 * opposing directions — that is the reading under measurement, so the question
 * itself must not name it either (it asks HOW the water moves, and offers no
 * candidate answer).
 *
 * anchorQuestion is ALSO the string the persistent question bar shows for the
 * whole scene (shared/scene-frame.js, via anchorQuestionHTML below), so the
 * task a participant is kept on is byte-identical to the task they were set —
 * in both conditions, by construction.
 */

export const INTRO = {
  en: {
    title: 'The Column — the Atlantic seen edge-on',
    paragraphs: [
      'The ocean is not a still tank of water. The Atlantic is a tall column — ' +
      'almost six kilometres from the surface to the sea floor.',
      'Inside that column, water at different depths can move in different ' +
      'directions at the same time, like layers of air moving separately in a ' +
      'tall stairwell.',
    ],
    anchorQuestion:
      'Does the water move all in the same way? If not — how, and in which ' +
      'directions, does it move?',
    anchorHold: 'Hold your answer in mind.',
    button: 'Show me the profile',
  },
  it: {
    title: 'La Colonna — l’Atlantico visto di taglio',
    paragraphs: [
      'L’oceano non è una vasca d’acqua immobile. L’Atlantico è un’alta colonna — ' +
      'quasi sei chilometri dalla superficie al fondale.',
      'Dentro quella colonna, l’acqua a profondità diverse può muoversi in ' +
      'direzioni diverse nello stesso momento, come strati d’aria che si muovono ' +
      'separatamente in un’alta tromba delle scale.',
    ],
    anchorQuestion:
      'L’acqua si muove tutta allo stesso modo? Se no — come, e in quali ' +
      'direzioni, si muove?',
    anchorHold: 'Tieni a mente la tua risposta.',
    button: 'Mostrami il profilo',
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
