import React from 'react';


// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', noDeckControls = false, children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  // Auto-inject a rail toggle when a <deck-stage> is on the page. The
  // toggle drives the deck's per-viewer _railVisible via window message;
  // state is mirrored from the same localStorage key the deck reads so
  // the control reflects reality across reloads. The mechanism is the
  // message — authors who want custom placement can post it directly
  // and pass noDeckControls to suppress this one.
  const hasDeckStage = React.useMemo(
    () => typeof document !== 'undefined' && !!document.querySelector('deck-stage'),
    [],
  );
  // deck-stage enables its rail in connectedCallback, but this panel can
  // mount before that element has upgraded. The initial read catches the
  // common case; the listener covers mounting first. (Older deck-stage.js
  // copies still wait for the host's __omelette_rail_enabled postMessage —
  // same listener handles those.)
  const [railEnabled, setRailEnabled] = React.useState(
    () => hasDeckStage && !!document.querySelector('deck-stage')?._railEnabled,
  );
  React.useEffect(() => {
    if (!hasDeckStage || railEnabled) return undefined;
    const onMsg = (e) => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);
  const [railVisible, setRailVisible] = React.useState(() => {
    try { return localStorage.getItem('deck-stage.railVisible') !== '0'; } catch (e) { return true; }
  });
  const toggleRail = (on) => {
    setRailVisible(on);
    window.postMessage({ type: '__deck_rail_visible', on }, '*');
  };
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-noncommentable=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
          {hasDeckStage && railEnabled && !noDeckControls && (
            <TweakSection label="Deck">
              <TweakToggle label="Thumbnail rail" value={railVisible} onChange={toggleRail} />
            </TweakSection>
          )}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


// portfolio-components.jsx — 고연심 포트폴리오 섹션 컴포넌트

function useInView(ref, threshold = 0.18) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

// ── NAVBAR ────────────────────────────────────────────────────────
function NavBar({ isDark, accent, scrolled }) {
  const textColor = isDark ? 'rgba(245,240,232,0.75)' : 'rgba(13,27,46,0.65)';
  const bgColor = scrolled ?
  isDark ? 'rgba(13,27,46,0.88)' : 'rgba(253,251,247,0.92)' :
  'transparent';
  const borderColor = scrolled ? `${accent}22` : 'transparent';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 72px',
      background: bgColor,
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: `1px solid ${borderColor}`,
      transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease'
    }}>
      <div style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '20px', fontWeight: 700, color: accent, letterSpacing: '0.02em'
      }}></div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[['소개', '#about'], ['강의분야', '#services'], ['경력', '#career'], ['출강기관', '#clients'], ['문의', '#contact']].map(([label, href]) =>
        <a key={label} href={href} style={{
          color: textColor, textDecoration: 'none',
          fontFamily: '"Noto Serif KR", serif',
          fontSize: '13px', letterSpacing: '0.06em',
          transition: 'color 0.25s, opacity 0.25s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = accent}
        onMouseLeave={(e) => e.currentTarget.style.color = textColor}>
          {label}</a>
        )}
        <a href="#contact" style={{
          border: `1px solid ${accent}`, color: accent,
          padding: '9px 22px',
          fontFamily: '"Noto Serif KR", serif', fontSize: '12px', letterSpacing: '0.1em',
          textDecoration: 'none', transition: 'all 0.25s ease'
        }}
        onMouseEnter={(e) => {e.currentTarget.style.background = accent;e.currentTarget.style.color = '#0D1B2E';}}
        onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = accent;}}>
          문의하기</a>
      </div>
    </nav>);

}

// ── HERO ─────────────────────────────────────────────────────────
function HeroSection({ theme }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {const t = setTimeout(() => setVis(true), 150);return () => clearTimeout(t);}, []);
  const { bg, text, accent } = theme.hero;

  return (
    <section id="hero" data-section="0" style={{
      minHeight: '100vh', backgroundColor: bg,
      display: 'flex', alignItems: 'center',
      padding: '112px 72px 80px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${accent}07 1px, transparent 1px), linear-gradient(90deg, ${accent}07 1px, transparent 1px)`,
        backgroundSize: '72px 72px'
      }} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1.15fr 0.85fr',
        gap: '72px', alignItems: 'center',
        maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1
      }}>
        {/* TEXT SIDE */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '40px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
            transition: 'all 0.9s ease'
          }}>
            <div style={{ width: '28px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              AI Curator · AI Expert · Edutainer
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(60px, 8.5vw, 110px)', lineHeight: 0.95,
            color: text, fontWeight: 700, margin: '0 0 10px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
            transition: 'all 0.9s ease 0.1s'
          }}>고연심</h1>

          <div style={{
            width: '52px', height: '3px', background: accent, marginBottom: '36px',
            opacity: vis ? 1 : 0, transition: 'all 0.9s ease 0.18s'
          }} />

          <p style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: 'clamp(19px, 2.6vw, 30px)', color: text, lineHeight: 1.7,
            fontWeight: 300, marginBottom: '48px',
            opacity: vis ? 0.82 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.9s ease 0.24s'
          }}>
            AI로 일하는 방식을<br />새롭게 설계합니다
          </p>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '52px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(18px)',
            transition: 'all 0.9s ease 0.34s'
          }}>
            {['DeepCompass AI 연구소 소장', '한국인공지능인재개발원 교수', '한국 AI 전문가협회 교수위원'].map((role, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '22px', height: '1px', background: accent, flexShrink: 0 }} />
                <span style={{ color: text, opacity: 0.52, fontFamily: '"Noto Serif KR", serif', fontSize: '13px', letterSpacing: '0.02em' }}>{role}</span>
              </div>
            )}
          </div>

          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'all 0.9s ease 0.44s' }}>
            <a href="#contact" style={{
              display: 'inline-block', background: accent, color: '#0D1B2E',
              padding: '18px 44px', textDecoration: 'none',
              fontFamily: '"Noto Serif KR", serif', fontSize: '15px', fontWeight: 600, letterSpacing: '0.06em',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.boxShadow = `0 14px 42px ${accent}48`;}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = 'none';}}>
              AI 강의·컨설팅 문의하기</a>
          </div>
        </div>

        {/* PHOTO SIDE */}
        <div style={{
          position: 'relative',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(32px)',
          transition: 'all 1.1s ease 0.28s'
        }}>
          {/* Decorative offset frame */}
          <div style={{
            position: 'absolute', top: '-18px', right: '-18px', bottom: '18px', left: '18px',
            border: `1px solid ${accent}22`, pointerEvents: 'none', zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}>
            <img src="portfolio-photo.png" alt="고연심 AI 전문가" style={{
              width: '100%', height: 'clamp(480px, 58vh, 680px)',
              objectFit: 'cover', objectPosition: 'top center', display: 'block'
            }} />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
              background: `linear-gradient(to top, ${bg} 0%, transparent 100%)`,
              pointerEvents: 'none'
            }} />
          </div>
          {/* Small decorative circle */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '-28px',
            width: '72px', height: '72px', borderRadius: '50%',
            border: `1px solid ${accent}28`, pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '72px',
        display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.28
      }}>
        <div style={{ width: '40px', height: '1px', background: text }} />
        <span style={{ color: text, fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>);

}

// ── ABOUT ─────────────────────────────────────────────────────────
function AboutSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent } = theme.about;

  const stats = [
  { num: '50+', label: '출강 기관' },
  { num: '6', label: '강의 분야' },
  { num: 'Ph.D', label: '문화예술학 박사' },
  { num: 'AI Lab', label: '연구소 소장' }];


  return (
    <section id="about" data-section="1" ref={ref} style={{
      backgroundColor: bg, padding: '128px 72px'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '96px', alignItems: 'center' }}>

        {/* Left: text */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>About</span>
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400, lineHeight: 1.55, marginBottom: '32px' }}>
            쉽고, 재미있고,<br />유익한 AI 교육의 선구자
          </h2>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, opacity: 0.68, lineHeight: 1.95, marginBottom: '20px', fontWeight: 300 }}>
            생성형 AI · AI 에이전트 · 업무자동화 · 디지털 전환 분야의 전문 강사로, 실무 현장에서 바로 적용할 수 있는 맞춤형 AI 교육과 컨설팅을 제공합니다.
          </p>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, opacity: 0.68, lineHeight: 1.95, marginBottom: '40px', fontWeight: 300 }}>
            멀티 교수법과 감성·공감 중심의 차별화된 강의(Edutainer) 방식으로 기관과 기업의 AI 전환을 이끌어 왔습니다.
          </p>
          {/* Education badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '16px',
            padding: '18px 24px', border: `1px solid ${accent}28`
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%', border: `1.5px solid ${accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent }} />
            </div>
            <div>
              <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '14px', fontWeight: 500 }}></div>
              <div style={{ color: text, opacity: 0.5, fontFamily: '"Noto Serif KR", serif', fontSize: '12.5px', marginTop: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* Right: stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.9s ease 0.18s'
        }}>
          {stats.map(({ num, label }, i) =>
          <div key={i} style={{
            padding: '48px 32px', textAlign: 'center',
            background: `${accent}0D`,
            borderTop: `2px solid ${accent}${i < 2 ? '70' : '35'}`
          }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 48px)', color: accent, fontWeight: 700, marginBottom: '8px', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '12.5px', color: text, opacity: 0.55, letterSpacing: '0.04em' }}>{label}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── SERVICES ─────────────────────────────────────────────────────
function ServicesSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, 0.12);
  const { bg, text, accent, cardBg } = theme.services;

  const svcs = [
  { n: '01', title: '생성형 AI 업무혁신', items: ['업무 자동화 · 반복업무 제거', '프롬프트 설계 · 챗봇 제작', '노코드 에이전트 구축'] },
  { n: '02', title: '기획 · 리서치', items: ['시장 / 경쟁 / 사례 조사', '요약 · 인사이트 도출', '실행전략 전환 (1-pager)'] },
  { n: '03', title: '데이터 분석 · 시각화', items: ['엑셀 / CSV 분석 자동화', 'KPI 설계 · 대시보드 제작', '보고서 자동 생성 (ADA)'] },
  { n: '04', title: 'AI 콘텐츠 제작', items: ['브랜딩 비주얼 · 카드뉴스', '포스터 · 썸네일 디자인', '플랫폼별 포맷 최적화'] },
  { n: '05', title: 'AI 출판 · 지식상품화', items: ['AI 전자책 기획 · 원고 작성', '편집 자동화 · 표지 제작', '출판 워크플로우 설계'] },
  { n: '06', title: '영상 · 음악 & 워크숍', items: ['숏폼 영상 기획 · AI 제작', 'AI 음악 · 스토리보드 제작', '직무별 실습형 맞춤 교육'] }];


  return (
    <section id="services" data-section="2" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '1px', background: accent }} />
              <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Lecture Areas</span>
            </div>
            <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400 }}>강의 분야</h2>
          </div>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.5, lineHeight: 1.75, maxWidth: '300px', textAlign: 'right', fontWeight: 300 }}>
            생성형 AI부터 에이전트·자동화까지,<br />실무 중심 6개 핵심 분야를 다룹니다
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {svcs.map((s, i) =>
          <div key={i} style={{
            backgroundColor: cardBg, padding: '48px 36px', position: 'relative', overflow: 'hidden',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
            transition: `all 0.7s ease ${0.06 * i}s`
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${accent}12`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = cardBg}>
            
              <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: '50px', fontWeight: 700,
              color: accent, opacity: 0.15, position: 'absolute', top: '16px', right: '20px', lineHeight: 1
            }}>{s.n}</div>
              <div style={{ width: '28px', height: '2px', background: accent, marginBottom: '20px' }} />
              <h3 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '17px', color: text, fontWeight: 500, marginBottom: '20px', lineHeight: 1.4 }}>{s.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {s.items.map((item, j) =>
              <li key={j} style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '13px', color: text, opacity: 0.58, paddingLeft: '16px', position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, top: '7px', width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: 0.55 }} />
                    {item}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── CAREER ────────────────────────────────────────────────────────
function CareerSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent } = theme.career;

  const careers = [
  { year: '2026', title: 'DeepCompass AI 연구소 소장', org: 'DeepCompass AI Lab', active: true },
  { year: '2026', title: '한국인공지능인재개발원 교수', org: '한국인공지능인재개발원', active: true },
  { year: '2026', title: 'AI 전문가협회 교수위원', org: '한국 AI 전문가협회', active: true },
  { year: '2026', title: 'AI 프롬프트 연구소 책임연구원', org: 'AI 프롬프트 연구소', active: true },
  { year: '2023', title: '문화예술학 박사 취득', org: '단국대학교 일반대학원', active: false }];

  const chars = [
  { tag: 'Easy', desc: '쉽고 명쾌한 강의' },
  { tag: 'Fun', desc: '재미있는 에듀테이너' },
  { tag: 'Useful', desc: '실무에 바로 적용' }];


  return (
    <section id="career" data-section="3" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '72px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Career</span>
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400 }}>경력 및 학력</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Timeline */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)', transition: 'all 0.9s ease 0.1s' }}>
            {careers.map((c, i) =>
            <div key={i} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${accent}`, background: c.active ? accent : 'transparent', marginTop: '4px', flexShrink: 0 }} />
                  {i < careers.length - 1 && <div style={{ width: '1px', flex: 1, background: `${accent}28`, margin: '4px 0', minHeight: '36px' }} />}
                </div>
                <div style={{ paddingBottom: '32px' }}>
                  <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.14em', marginBottom: '6px' }}>
                    {c.year} · {c.active ? '현직' : '학력'}
                  </div>
                  <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{c.title}</div>
                  <div style={{ color: text, opacity: 0.45, fontFamily: '"Noto Serif KR", serif', fontSize: '13px' }}>{c.org}</div>
                </div>
              </div>
            )}
          </div>

          {/* Characteristics */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: 'all 0.9s ease 0.2s' }}>
            <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '28px' }}>강의 특징</div>
            {chars.map(({ tag, desc }, i) =>
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              padding: '22px 24px', marginBottom: '2px',
              borderLeft: `2px solid ${accent}`, background: `${accent}09`
            }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: accent, minWidth: '56px', fontStyle: 'italic' }}>{tag}</span>
                <span style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.72 }}>{desc}</span>
              </div>
            )}
            {/* Quote */}
            <div style={{ marginTop: '36px', padding: '28px 28px 28px 28px', border: `1px solid ${accent}1E`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '20px', fontFamily: '"Playfair Display", serif', fontSize: '44px', color: accent, lineHeight: 1, opacity: 0.42 }}>"</div>
              <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.65, lineHeight: 1.85, fontWeight: 300, margin: '8px 0 0' }}>
                AI 에이전트 시대, 기업 혁신과 디지털 전환을 선도하는 최고의 HRD 파트너로 함께 하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ── CLIENTS ──────────────────────────────────────────────────────
function ClientsSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent, tagBg } = theme.clients;

  const groups = [
  { label: '관공서', items: ['기획재정부', '경북도교육청', '파주교육지원청', '순천시청', '대전중구청', '원주국토관리청'] },
  { label: '대학교', items: ['중앙대학교', '한국산업기술대학교', '동덕여자대학교', '한성대학교', '파주두원공과대학교', '선린대학교'] },
  { label: '공공·유관기관', items: ['경기인재개발원', '경기고양인재개발원', '부천평생학습센터', '증평평생학습센터', '한국능률협회'] },
  { label: '법인 및 단체', items: ['서울시관광협회', '천주교주교회의', '화성새일터', '부천복지관', '한양문고', '청년창업센터'] }];


  return (
    <section id="clients" data-section="4" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Clients & Partners</span>
            <div style={{ width: '40px', height: '1px', background: accent }} />
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400, marginBottom: '16px' }}>출강 기관</h2>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.48, fontWeight: 300 }}>정부 기관, 대학교, 공공기관, 기업 등 50개 이상의 기관에서 강의</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '52px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.9s ease 0.14s'
        }}>
          {groups.map(({ label, items }, i) =>
          <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '18px', height: '1px', background: accent }} />
                <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {items.map((item, j) =>
              <span key={j} style={{
                fontFamily: '"Noto Serif KR", serif', fontSize: '13px', color: text, opacity: 0.75,
                padding: '8px 16px', background: tagBg, border: `1px solid ${accent}14`
              }}>{item}</span>
              )}
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: accent, opacity: 0.45, padding: '8px 10px', alignSelf: 'center' }}>+ 外</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── CONTACT ──────────────────────────────────────────────────────
function ContactSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, 0.2);
  const { bg, text, accent } = theme.contact;

  return (
    <section id="contact" data-section="5" ref={ref} style={{
      backgroundColor: bg, padding: '128px 72px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${accent}09 1px, transparent 1px)`,
        backgroundSize: '36px 36px', pointerEvents: 'none'
      }} />
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px',
          opacity: inView ? 1 : 0, transition: 'all 0.8s ease'
        }}>
          <div style={{ width: '40px', height: '1px', background: accent }} />
          <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Contact</span>
          <div style={{ width: '40px', height: '1px', background: accent }} />
        </div>

        <h2 style={{
          fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 4vw, 50px)', color: text,
          fontWeight: 300, lineHeight: 1.55, marginBottom: '24px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease 0.1s'
        }}>
          AI 강의와 컨설팅,<br />지금 바로 문의하세요
        </h2>

        <p style={{
          fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, lineHeight: 1.85,
          marginBottom: '56px', fontWeight: 300,
          opacity: inView ? 0.52 : 0, transition: 'all 0.8s ease 0.2s'
        }}>
          맞춤형 AI 교육 설계부터 기관 워크숍 운영까지,<br />귀 기관에 최적화된 프로그램을 제안해 드립니다.
        </p>

        <div style={{ marginBottom: '64px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'all 0.8s ease 0.3s' }}>
          <a href="mailto:emas7788@naver.com" style={{
            display: 'inline-block', background: accent, color: '#0D1B2E',
            padding: '22px 56px', textDecoration: 'none',
            fontFamily: '"Noto Serif KR", serif', fontSize: '16px', fontWeight: 600, letterSpacing: '0.08em',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.boxShadow = `0 16px 48px ${accent}50`;}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = 'none';}}>
            AI 강의·컨설팅 문의하기</a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '56px',
          opacity: inView ? 0.62 : 0, transition: 'all 0.8s ease 0.4s'
        }}>
          {[{ label: 'Tel', value: '010-7432-6833' }, { label: 'Email', value: 'emas7788@naver.com' }].map(({ label, value }) =>
          <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
              <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '15px' }}>{value}</div>
            </div>
          )}
        </div>

        <div style={{
          marginTop: '96px', paddingTop: '32px', borderTop: `1px solid ${accent}1A`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          opacity: inView ? 0.38 : 0, transition: 'all 0.8s ease 0.5s'
        }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: text }}>고연심</span>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '11px', color: text, letterSpacing: '0.08em' }}>© 2026 Koh Yeon Sim. All rights reserved.</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { NavBar, HeroSection, AboutSection, ServicesSection, CareerSection, ClientsSection, ContactSection, useInView });

// portfolio-app.jsx — 테마 정의 + App 컴포넌트

const THEMES = {
  'golden-night': {
    hero:     { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    about:    { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C' },
    services: { bg: '#F5F0E8', text: '#0D1B2E', accent: '#B8922E', cardBg: '#FFFFFF' },
    career:   { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    clients:  { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C', tagBg: 'rgba(201,168,76,0.08)' },
    contact:  { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    sectionDark: [true, true, false, true, true, true],
  },
  'cyan-tech': {
    hero:     { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    about:    { bg: '#0A1628', text: '#DCF0F6', accent: '#00C8E8' },
    services: { bg: '#EBF6FA', text: '#071422', accent: '#008EB0', cardBg: '#FFFFFF' },
    career:   { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    clients:  { bg: '#0A1628', text: '#DCF0F6', accent: '#00C8E8', tagBg: 'rgba(0,200,232,0.07)' },
    contact:  { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    sectionDark: [true, true, false, true, true, true],
  },
  'light-elegance': {
    hero:     { bg: '#FDFBF7', text: '#0D1B2E', accent: '#C9A84C' },
    about:    { bg: '#F0EBE0', text: '#1E3A5F', accent: '#C9A84C' },
    services: { bg: '#FFFFFF',  text: '#0D1B2E', accent: '#B8922E', cardBg: '#FDFBF7' },
    career:   { bg: '#F5F0E8', text: '#0D1B2E', accent: '#1E3A5F' },
    clients:  { bg: '#EDE8DE', text: '#0D1B2E', accent: '#C9A84C', tagBg: 'rgba(30,58,95,0.07)' },
    contact:  { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C' },
    sectionDark: [false, false, false, false, false, true],
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "golden-night"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = THEMES[t.mood] || THEMES['golden-night'];

  const [scrolled, setScrolled] = React.useState(false);
  const [sectionIdx, setSectionIdx] = React.useState(0);

  // Scroll → nav style
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver → which section is active (for nav color)
  React.useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setSectionIdx(+e.target.dataset.section);
      });
    }, { threshold: 0.42 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const isDark = theme.sectionDark[sectionIdx] ?? true;
  const navAccent = t.mood === 'cyan-tech' ? '#00C8E8' : '#C9A84C';

  return (
    <div>
      <NavBar isDark={isDark} accent={navAccent} scrolled={scrolled} />
      <HeroSection theme={theme} />
      <AboutSection theme={theme} />
      <ServicesSection theme={theme} />
      <CareerSection theme={theme} />
      <ClientsSection theme={theme} />
      <ContactSection theme={theme} />

      <TweaksPanel>
        <TweakSection label="디자인 무드 선택" />
        <TweakSelect
          label="테마"
          value={t.mood}
          options={['golden-night', 'cyan-tech', 'light-elegance']}
          labels={['골든 나이트 (Navy + Gold)', '사이언 테크 (Navy + Cyan)', '라이트 엘레강스 (Cream + Navy)']}
          onChange={v => setTweak('mood', v)}
        />
      </TweaksPanel>
    </div>
  );
}

export default App;

