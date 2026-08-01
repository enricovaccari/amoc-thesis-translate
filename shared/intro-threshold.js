/**
 * intro-threshold.js — Screen 2 of Scene III ("The Threshold"), shared verbatim
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
 * fixes the participant's prior belief about scientific certainty BEFORE
 * either condition reveals anything. NEITHER condition may answer it on
 * screen: nothing may state that uncertainty was larger in the past, that the
 * reconstructions converge, that observations reduced the spread, or that any
 * period is more or less certain — that is the reading under measurement.
 * (For the same reason, this intro never says WHEN direct measurements exist:
 * no "before the array", no "years the instruments never saw".) The question
 * itself offers "stayed the same" and "changed" symmetrically and asserts
 * neither.
 *
 * anchorQuestion is ALSO the string the persistent question bar shows for the
 * whole scene (shared/scene-frame.js, via anchorQuestionHTML below), so the
 * task a participant is kept on is byte-identical to the task they were set —
 * in both conditions, by construction.
 */

export const INTRO = {
  en: {
    title: 'The Threshold — the same ocean, told three times',
    paragraphs: [
      'Scenes I and II showed the Atlantic circulation as it was measured ' +
      'directly, with instruments moored in the water. This scene shows the ' +
      'same circulation in a different way: reconstructed by scientific ' +
      'models rather than measured directly.',
      'Three independent models each reconstruct the same quantity, month by ' +
      'month, across three decades. Three reconstructions of one ocean: this ' +
      'scene shows all three at once.',
    ],
    anchorQuestion:
      'Do you think how much the models agree with each other has stayed the ' +
      'same across all the years, or has it changed?',
    anchorHold: 'Hold your answer in mind.',
    button: 'Show me the three estimates',
  },
  it: {
    title: 'La Soglia — lo stesso oceano, raccontato tre volte',
    paragraphs: [
      'Le Scene I e II mostravano la circolazione atlantica com’è stata ' +
      'misurata direttamente, con strumenti ancorati nell’acqua. Questa ' +
      'scena mostra la stessa circolazione in un modo diverso: ricostruita ' +
      'da modelli scientifici anziché misurata direttamente.',
      'Tre modelli indipendenti ricostruiscono ciascuno la stessa quantità, ' +
      'mese per mese, lungo tre decenni. Tre ricostruzioni di un solo ' +
      'oceano: questa scena le mostra tutte e tre insieme.',
    ],
    anchorQuestion:
      'Pensi che quanto i modelli sono d’accordo tra loro sia rimasto uguale ' +
      'in tutti gli anni, oppure sia cambiato?',
    anchorHold: 'Tieni a mente la tua risposta.',
    button: 'Mostrami le tre stime',
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
