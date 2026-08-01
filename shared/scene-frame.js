/**
 * scene-frame.js — the PERSISTENT DRIVING QUESTION and the "?" HELP panel,
 * shared IDENTICALLY by both conditions of every scene.
 *
 * SYMMETRY RULE (§7.2.2, Tversky 2019): the question is the measurement
 * instrument and the help teaches the instrument. Both must therefore be
 * byte-identical across conditions — only the REPRESENTATION may differ,
 * never the task or the teaching. This file is the single definition of the
 * markup, the styling and the behaviour of both; the static and experiential
 * file of each scene call the same mountSceneFrame() and feed it the same two
 * strings, so identity is a property of the code, not a promise.
 *
 * WHERE THE TEXT COMES FROM (never typed here):
 *   question → shared/intro-*.js  anchorQuestionHTML(lang) — byte-identical to
 *              the anchor question the shared intro screen already shows.
 *   help     → shared/context-*.js helpContent(lang) — the same teaching floor
 *              as the on-figure caption lines, restated in plain words.
 *
 * THE HARD LINE — neither element may ever answer the question. The bar states
 * the task; the panel teaches how to read the instrument. Nothing here says
 * what the reading IS: no "opposite", no "returns", no "equilibrium", no
 * "recurs", no "less certain", no "converge".
 *
 * LAYOUT: the bar occupies the strip above y ≈ 30 px, which is empty in all six
 * scene files (their chrome starts at 34–50 px and every plotting region starts
 * lower still), so it never covers a visualisation. The "?" button sits in the
 * top-left corner; its panel opens beneath it, clear of the language toggle and
 * of every scene's own controls, and is dismissible (button, ×, Esc).
 *
 * NON-INFORMATIONAL scaffolding (Table 7.2): no value here encodes a number
 * from the bundle. Colours and fonts fall back to shared/palette.js through the
 * CSS custom properties each scene file already sets.
 */

/** UI chrome for the frame itself — labels only, never content. */
export const FRAME = {
  en: { helpBtn: 'How to read this scene', close: 'Close' },
  it: { helpBtn: 'Come si legge questa scena', close: 'Chiudi' },
};

const CSS = `
#scene-question{position:fixed;top:0;left:0;right:0;z-index:58;display:none;pointer-events:none;
  padding:7px 100px 9px;text-align:center;
  font-family:var(--font-mono,ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace);
  font-size:clamp(8.8px,0.75vw,10.5px);line-height:1.55;letter-spacing:.3px;
  color:var(--ink-soft,rgba(231,240,247,.55));
  background:linear-gradient(180deg,rgba(1,8,17,.82) 0%,rgba(1,8,17,.54) 62%,rgba(1,8,17,0) 100%)}
#scene-question .sq-text{display:inline-block;max-width:1040px}

#scene-help-btn{position:fixed;top:3px;left:40px;z-index:59;display:none;
  width:21px;height:21px;padding:0;line-height:19px;text-align:center;border-radius:50%;
  background:transparent;border:1px solid rgba(255,179,92,.5);color:var(--beacon,#ffb35c);
  font-family:var(--font-mono,ui-monospace,monospace);font-size:11px;letter-spacing:0;
  cursor:none;pointer-events:auto;opacity:.7;transition:.25s}
#scene-help-btn:hover,#scene-help-btn.open{opacity:1;background:rgba(255,179,92,.22);
  border-color:var(--beacon,#ffb35c)}

#scene-help{position:fixed;top:32px;left:40px;z-index:120;display:none;
  width:min(360px,44vw);max-height:72vh;overflow-y:auto;
  background:rgba(4,16,30,.95);border:1px solid rgba(255,255,255,.12);
  border-left:2px solid var(--beacon,#ffb35c);box-shadow:0 8px 30px rgba(0,0,0,.5);
  padding:12px 15px 14px;pointer-events:auto;
  font-family:var(--font-mono,ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace)}
#scene-help .help-h{display:flex;align-items:center;justify-content:space-between;gap:12px;
  font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--beacon,#ffb35c);
  padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.10)}
#scene-help .help-x{background:none;border:none;padding:0 2px;margin:0;color:var(--beacon,#ffb35c);
  font-family:inherit;font-size:15px;line-height:1;cursor:none;opacity:.6;transition:.2s}
#scene-help .help-x:hover{opacity:1}
#scene-help .help-line{margin:9px 0 0;font-size:10.5px;line-height:1.7;letter-spacing:.2px;
  color:var(--ink,#e7f0f7);opacity:.82}
`;

/**
 * Inject the frame once and return its handle. Idempotent: calling it twice on
 * one page reuses the same nodes.
 *
 * Returns { render(lang, question, help), show(on), close() } where
 *   question — the driving question string (from intro-*.js);
 *   help     — { title, lines[] } (from context-*.js).
 */
export function mountSceneFrame() {
  if (!document.getElementById('scene-frame-css')) {
    const st = document.createElement('style');
    st.id = 'scene-frame-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const make = (tag, id) => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag);
      el.id = id;
      document.body.appendChild(el);
    }
    return el;
  };

  const bar = make('div', 'scene-question');
  const btn = make('button', 'scene-help-btn');
  const panel = make('div', 'scene-help');
  btn.type = 'button';
  btn.textContent = '?';
  btn.setAttribute('aria-expanded', 'false');
  panel.setAttribute('role', 'dialog');

  const setOpen = (on) => {
    panel.style.display = on ? 'block' : 'none';
    btn.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
  };
  setOpen(false);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(panel.style.display !== 'block');
  });
  panel.addEventListener('click', (e) => {
    if (e.target.classList.contains('help-x')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  const api = {
    /** Re-render both texts in `lang`. Called from every scene's applyLang(). */
    render(lang, question, help) {
      const t = FRAME[lang] || FRAME.en;
      bar.innerHTML = `<span class="sq-text">${question}</span>`;
      btn.title = t.helpBtn;
      btn.setAttribute('aria-label', t.helpBtn);
      panel.innerHTML =
        `<div class="help-h"><span>${help.title}</span>` +
        `<button type="button" class="help-x" title="${t.close}" aria-label="${t.close}">&times;</button></div>` +
        help.lines.map((l) => `<p class="help-line">${l}</p>`).join('');
    },
    /** Reveal the frame with screen 3 — hidden on the landing and intro screens
     *  (where the same question is already on view inside the intro panel). */
    show(on) {
      bar.style.display = on ? 'block' : 'none';
      btn.style.display = on ? 'block' : 'none';
      if (!on) setOpen(false);
    },
    close() { setOpen(false); },
  };
  api.show(false);
  return api;
}
