/**
 * scene-frame.js — the on-figure HELP ("?") and INFO ("i") affordances, shared
 * IDENTICALLY by both conditions of every scene.
 *
 * (The persistent driving-question bar that used to live here was retired: the
 * question is asked once, on the intro screen, and is NOT repeated on the
 * visualisation — the same in every condition, so framing stays symmetric.)
 *
 * SYMMETRY RULE (§7.2.2, Tversky 2019): the help teaches how to READ the
 * instrument and the info gives project/data context. Both are fed from the
 * shared context-*.js modules, so the static and experiential file of a scene
 * show byte-identical panels — identity is a property of the code.
 *
 * THE HARD LINE — neither panel may ever answer the question. The "?" says how
 * to read; the "i" says what the project/data is. Nothing here states the
 * reading: no "opposite", "returns", "equilibrium", "recurs", "less certain",
 * "converge". No machine-learning internals, no "what to notice".
 *
 * PLACEMENT: mountSceneFrame({ pos, hasInfo, infoUrl }) drops a small control
 * cluster (optional "i" + always "?") at the fixed position each file passes,
 * so a scene can sit it under its language toggle (static) or beside its month
 * readout (experiential). Panels open anchored to the cluster, clamped inside
 * the viewport, and are dismissible (×, Esc, toggle, click-away). Only one panel
 * is open at a time.
 *
 * NON-INFORMATIONAL scaffolding (Table 7.2): no value here encodes bundle data.
 * Colours/fonts fall back to shared/palette.js via the CSS custom properties
 * each scene file already sets.
 */

/** UI chrome for the affordances themselves — labels only, never content. */
export const FRAME = {
  en: { helpBtn: 'How to read this scene', infoBtn: 'About this visualization', close: 'Close' },
  it: { helpBtn: 'Come si legge questa scena', infoBtn: 'Informazioni sulla visualizzazione', close: 'Chiudi' },
};

const CSS = `
#scene-controls{position:fixed;z-index:59;display:flex;gap:11px;pointer-events:auto}
.sf-btn{width:22px;height:22px;padding:0;line-height:20px;text-align:center;border-radius:50%;
  background:transparent;border:1px solid rgba(255,179,92,.62);color:var(--beacon,#ffb35c);
  font-family:var(--font-mono,ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace);
  font-size:12px;letter-spacing:0;cursor:none;pointer-events:auto;opacity:.85;
  transition:opacity .25s,background .25s,border-color .25s}
.sf-btn.info-i{font-family:Georgia,'Times New Roman',serif;font-style:italic}
.sf-btn:hover,.sf-btn.open{opacity:1;background:rgba(255,179,92,.22);border-color:var(--beacon,#ffb35c)}

.sf-panel{position:fixed;z-index:120;visibility:hidden;opacity:0;transform:translateY(-4px);
  pointer-events:none;
  width:min(360px,44vw);max-height:72vh;overflow-y:auto;
  background:rgba(4,16,30,.96);border:1px solid rgba(255,255,255,.12);
  border-left:2px solid var(--beacon,#ffb35c);box-shadow:0 8px 30px rgba(0,0,0,.5);
  padding:12px 15px 14px;
  transition:opacity .2s ease,transform .2s ease,visibility 0s linear .2s;
  font-family:var(--font-mono,ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace)}
.sf-panel.open{visibility:visible;opacity:1;transform:translateY(0);pointer-events:auto;
  transition:opacity .2s ease,transform .2s ease}
.sf-panel .sf-h{display:flex;align-items:center;justify-content:space-between;gap:12px;
  font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--beacon,#ffb35c);
  padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.10)}
.sf-panel .sf-x{background:none;border:none;padding:0 2px;margin:0;color:var(--beacon,#ffb35c);
  font-family:inherit;font-size:15px;line-height:1;cursor:none;opacity:.6;transition:.2s}
.sf-panel .sf-x:hover{opacity:1}
.sf-panel .sf-line{margin:9px 0 0;font-size:10.5px;line-height:1.7;letter-spacing:.2px;
  color:var(--ink,#e7f0f7);opacity:.85}
`;

/**
 * Inject the affordances once and return a handle. Idempotent per page.
 *
 * @param {object} opts
 *   pos      — CSS position for the control cluster, e.g. { top:'70px', right:'40px' }
 *              or { left:'40px', bottom:'150px' }. Default: top-right.
 *   hasInfo  — include the "i" button (default false → "?" only).
 *   infoUrl  — if set (and hasInfo), the "i" opens this URL in a new tab instead
 *              of an inline panel (used by Scene I experiential, which already
 *              has a dedicated documentation page).
 *
 * Returns { render(lang, content), show(on), close() } where
 *   content — { help:{title,lines[]}, info:{title,lines[]}|null }.
 */
export function mountSceneFrame(opts = {}) {
  const { pos = { top: '70px', right: '40px' }, hasInfo = false, infoUrl = null } = opts;

  if (!document.getElementById('scene-frame-css')) {
    const st = document.createElement('style');
    st.id = 'scene-frame-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const make = (tag, id, parent) => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag);
      el.id = id;
      (parent || document.body).appendChild(el);
    }
    return el;
  };

  const cluster = make('div', 'scene-controls');
  Object.assign(cluster.style, { top: '', right: '', bottom: '', left: '' }, pos);

  // Buttons: optional "i" then always "?".
  let infoBtn = null;
  if (hasInfo) {
    infoBtn = make('button', 'scene-info-btn', cluster);
    infoBtn.type = 'button';
    infoBtn.className = 'sf-btn info-i';
    infoBtn.textContent = 'i';
  }
  const helpBtn = make('button', 'scene-help-btn', cluster);
  helpBtn.type = 'button';
  helpBtn.className = 'sf-btn';
  helpBtn.textContent = '?';

  const helpPanel = make('div', 'scene-help');
  helpPanel.className = 'sf-panel';
  helpPanel.setAttribute('role', 'dialog');
  const infoPanel = (hasInfo && !infoUrl) ? make('div', 'scene-info') : null;
  if (infoPanel) { infoPanel.className = 'sf-panel'; infoPanel.setAttribute('role', 'dialog'); }

  // Anchor a panel to the control cluster, clamped inside the viewport. Opens
  // below the cluster if there is room, otherwise above.
  const anchor = (panel) => {
    const r = cluster.getBoundingClientRect();
    const pw = panel.offsetWidth || 360;
    let left = r.left;
    if (left + pw > innerWidth - 12) left = innerWidth - 12 - pw;   // keep on-screen
    left = Math.max(12, left);
    panel.style.left = left + 'px';
    const below = r.bottom + 6;
    if (below + panel.offsetHeight < innerHeight - 12 || r.top < innerHeight / 2) {
      panel.style.top = below + 'px';
      panel.style.bottom = 'auto';
    } else {
      panel.style.top = 'auto';
      panel.style.bottom = (innerHeight - r.top + 6) + 'px';
    }
  };

  const setPanel = (panel, on) => {
    [helpPanel, infoPanel].forEach((p) => { if (p && p !== panel) p.classList.remove('open'); });
    helpBtn.classList.toggle('open', on && panel === helpPanel);
    if (infoBtn) infoBtn.classList.toggle('open', on && panel === infoPanel);
    // visibility-based reveal: no requestAnimationFrame dependency (robust even
    // when the tab is backgrounded), and closed panels are pointer-events:none.
    if (on) anchor(panel);
    panel.classList.toggle('open', on);
  };
  const closeAll = () => { setPanel(helpPanel, false); if (infoPanel) setPanel(infoPanel, false); };

  helpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setPanel(helpPanel, !helpPanel.classList.contains('open'));
  });
  if (infoBtn) {
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (infoUrl) { window.open(infoUrl, '_blank', 'noopener'); return; }
      setPanel(infoPanel, !infoPanel.classList.contains('open'));
    });
  }
  // Dismiss on ×, Esc, or a click anywhere outside the cluster/panels.
  [helpPanel, infoPanel].forEach((p) => { if (p) p.addEventListener('click', (e) => { if (e.target.classList.contains('sf-x')) closeAll(); }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  document.addEventListener('click', (e) => {
    if (cluster.contains(e.target)) return;
    if ([helpPanel, infoPanel].some((p) => p && p.contains(e.target))) return;
    closeAll();
  });

  const fillPanel = (panel, t, data, closeLabel) =>
    panel.innerHTML =
      `<div class="sf-h"><span>${data.title}</span>` +
      `<button type="button" class="sf-x" title="${closeLabel}" aria-label="${closeLabel}">&times;</button></div>` +
      data.lines.map((l) => `<p class="sf-line">${l}</p>`).join('');

  const api = {
    /** Re-render both panels in `lang`. content = { help, info }. */
    render(lang, content) {
      const t = FRAME[lang] || FRAME.en;
      helpBtn.title = t.helpBtn; helpBtn.setAttribute('aria-label', t.helpBtn);
      if (infoBtn) { infoBtn.title = t.infoBtn; infoBtn.setAttribute('aria-label', t.infoBtn); }
      if (content && content.help) fillPanel(helpPanel, t, content.help, t.close);
      if (infoPanel && content && content.info) fillPanel(infoPanel, t, content.info, t.close);
    },
    /** Reveal the controls with screen 3 — hidden on landing and intro. */
    show(on) {
      cluster.style.display = on ? 'flex' : 'none';
      if (!on) closeAll();
    },
    close() { closeAll(); },
  };
  api.show(false);
  return api;
}
