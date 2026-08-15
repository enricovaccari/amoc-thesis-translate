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
    title: 'The Threshold',
    subtitle: 'The same ocean, told three times',
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
      'Do you expect the three models to remain equally similar over time, or ' +
      'to become more or less similar during some periods?',
    anchorHold: 'Hold your answer in mind.',
    button: 'Show me the three estimates',
  },
  it: {
    title: 'La Soglia',
    subtitle: 'Lo stesso oceano, raccontato tre volte',
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
      'Ti aspetti che i tre modelli restino ugualmente simili nel tempo, ' +
      'oppure che diventino più o meno simili in certi periodi?',
    anchorHold: 'Tieni a mente la tua risposta.',
    button: 'Mostrami le tre stime',
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
