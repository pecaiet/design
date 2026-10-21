/* Pecaiet shared script: the motion pecaiet.css can't play by itself, and the two Settings choices that change the whole page (theme,
   motion). Load it once in every app, next to pecaiet.css: <script src="pecaiet.js" defer></script> (or import it once).
   Everything in the apps works without it; the things below just happen at once. Timings come from pecaiet.css (--pc-motion-*),
   so motion is still set in one place.

   Calls (on window.Pecaiet):
     leave(el)          el shrinks out while it fades, in one motion (what's around it glides), then it's removed; a table row
                        (it can't shrink) and a chip fade out where they are. Resolves when it's gone. { remove: false } plays
                        it and leaves the removing to you.
     enter(el)          something the person just added: a row or alert grows in while it fades (what's below glides); a table
                        row, a chip and anything else fade in where they are. Works as a React ref (null is ignored). Content
                        that's only drawn again doesn't move.
     close(el)          play the closing, then close: a <dialog> (close()) or anything shown by removing hidden (sets hidden).
     setTheme(mode)     "dark" | "light" | "system": the .dark class on <html>, remembered in the theme cookie, crossfading.
     setMotion(mode)    "on" | "off" (or null to follow the device again): data-motion on <html>, remembered in the motion cookie.
     motion()           "on" or "off", as it is right now.

   By itself, with no calls:
     - menus, popovers and sheets play their closing when the app hides them (hidden);
     - the phone sidebar (and the settings nav on phones) slides out when the app takes .pc-sidebar-sheet off its frame;
     - Escape on a dialog, the settings window or the drawer plays the closing;
     - accordion answers and tree branches grow open and shrink closed, the rows below gliding;
     - toasts and field errors grow in whenever they appear after the page has loaded, even in a page drawn again (they're news);
     - an alert's x (.pc-alert-close) and any [data-pc-dismiss] button make their alert or toast leave;
     - the chosen tab's line slides to the next tab;
     - Turbo: a removed row, chip, alert or toast leaves first; rows, chips and alerts a stream adds (append, prepend, before, after) come in;
     - a tree item's children grow in right after it opens;
     - an icon swapped inside a button (a copy turning into a tick, the spinner at work) fades in;
     - content that takes a skeleton's place (the app swaps it in, or a Turbo frame loads) fades in;
     - jumps within a page (#links, the skip link) scroll smoothly;
     - radios named pc-theme or pc-motion (values dark/light/system, on/off) set the theme or motion. */
(() => {
  if (window.Pecaiet) return;
  const root = document.documentElement;

  // Cookies can be refused (a sandboxed frame throws): then nothing is remembered, and everything else still works.
  const cookie = name => { try { return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] || null; } catch { return null; } };
  const remember = (name, value) => {
    try { document.cookie = value ? `${name}=${value}; path=/; max-age=31536000; samesite=lax` : `${name}=; path=/; max-age=0; samesite=lax`; } catch {}
  };

  // Motion: the cookie from Settings, else the device (pecaiet.css reads prefers-reduced-motion). The layout should set data-motion
  // from the cookie too, as it does the theme, so the first paint is already right.
  if (!root.dataset.motion && cookie("motion")) root.dataset.motion = cookie("motion");

  const time = name => {
    const v = getComputedStyle(document.body || root).getPropertyValue(name).trim();
    return v.endsWith("ms") ? parseFloat(v) : (parseFloat(v) || 0) * 1000;
  };
  const on = () => time("--pc-motion") > 0;
  // Every motion reads what it needs first and only then changes the page: a style read after a change makes the browser work
  // the styles out again, and a few of those in a row are what makes a motion start late.
  const timing = () => ({ duration: time("--pc-motion"), easing: getComputedStyle(root).getPropertyValue("--pc-motion-ease").trim() || "ease-out" });
  const play = (el, frames, t, more = {}) => el.animate(frames, { ...t, fill: "forwards", ...more });
  // Where el comes from, as pecaiet.css says (--pc-enter, --pc-enter-opacity): an edge for what slides, else nowhere (it fades).
  const from = el => {
    const s = getComputedStyle(el);
    return { opacity: s.getPropertyValue("--pc-enter-opacity").trim() || "0", translate: s.getPropertyValue("--pc-enter").trim() || "0 0" };
  };
  const shownFrame = { opacity: "1", translate: "0 0" };

  // The space el takes, and none of it: its height (its width, in a row) with min sizes, padding, borders and the gap
  // beside it, so what's around it glides in the same motion. A one-column grid keeps its gap until the row is gone, so while it
  // moves the grid's gaps become margins (data-pc-gaps, pecaiet.css) and the row's own gap closes with it. Only reads; start() changes.
  function space(el) {
    const p = el.parentElement, ps = getComputedStyle(p || el), s = getComputedStyle(el), extra = [];
    // Heights and widths as the element counts them: with content-box sizing, without its padding and borders.
    const inner = s.boxSizing === "content-box", px = v => parseFloat(v) || 0;
    let start = () => {}, done = () => {};
    if (p && /flex/.test(ps.display) && !ps.flexDirection.startsWith("column")) {
      const gap = parseFloat(ps.columnGap) || 0;
      return { extra, start, done,
        full: { width: `${el.offsetWidth - (inner ? px(s.paddingLeft) + px(s.paddingRight) + px(s.borderLeftWidth) + px(s.borderRightWidth) : 0)}px`, minWidth: s.minWidth, paddingLeft: s.paddingLeft, paddingRight: s.paddingRight, borderLeftWidth: s.borderLeftWidth, borderRightWidth: s.borderRightWidth, marginRight: s.marginRight },
        none: { width: "0px", minWidth: "0px", paddingLeft: "0px", paddingRight: "0px", borderLeftWidth: "0px", borderRightWidth: "0px", marginRight: `${-gap}px` } };
    }
    const full = { height: `${el.offsetHeight - (inner ? px(s.paddingTop) + px(s.paddingBottom) + px(s.borderTopWidth) + px(s.borderBottomWidth) : 0)}px`, minHeight: s.minHeight, paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, borderTopWidth: s.borderTopWidth, borderBottomWidth: s.borderBottomWidth };
    const none = { height: "0px", minHeight: "0px", paddingTop: "0px", paddingBottom: "0px", borderTopWidth: "0px", borderBottomWidth: "0px" };
    const gap = p ? parseFloat(ps.rowGap) || 0 : 0;
    if (gap && ps.display.includes("grid") && ps.gridTemplateColumns.trim().split(/\s+/).length === 1) {
      start = () => { const n = +(p.dataset.pcGaps || 0); if (!n) p.style.setProperty("--pc-gaps", `${gap}px`); p.dataset.pcGaps = n + 1; };
      done = () => { const left = +(p.dataset.pcGaps || 1) - 1; if (left) p.dataset.pcGaps = left; else { delete p.dataset.pcGaps; p.style.removeProperty("--pc-gaps"); } };
      if (el.previousElementSibling) { full.marginTop = `${gap}px`; none.marginTop = "0px"; }
      else if (el.nextElementSibling) extra.push([el.nextElementSibling, { marginTop: `${gap}px` }, { marginTop: "0px" }]);
    } else if (gap) { full.marginBottom = s.marginBottom; none.marginBottom = `${-gap}px`; }
    // Its own space above (an error under a group of choices) closes with it too.
    if (px(s.marginTop) && !full.marginTop) { full.marginTop = s.marginTop; none.marginTop = "0px"; }
    return { full, none, extra, start, done };
  }
  const clip = el => { el.style.overflow = "hidden"; el.style.whiteSpace = "nowrap"; };
  const unclip = el => { el.style.removeProperty("overflow"); el.style.removeProperty("white-space"); };

  // Grow open or shrink closed: the space and a fade together. Resolves at its end with settle(), which hands el back to the page.
  function grow(el, opening, t, more = {}, fades = true, sp = space(el)) {
    const o = fades ? [{ opacity: "0" }, { opacity: "1" }] : [{}, {}];
    sp.start();
    clip(el);
    const runs = [play(el, opening ? [{ ...sp.none, ...o[0] }, { ...sp.full, ...o[1] }] : [{ ...sp.full, ...o[1] }, { ...sp.none, ...o[0] }], t, more),
                  ...sp.extra.map(([other, a, b]) => play(other, opening ? [b, a] : [a, b], t, more))];
    return Promise.all(runs.map(a => a.finished)).catch(() => {}).then(() => ({ settle: () => { unclip(el); runs.forEach(a => a.cancel()); sp.done(); } }));
  }


  async function leave(el, { remove = true } = {}) {
    if (!el?.isConnected) return;
    const t = timing(), gone = () => { if (remove) el.remove(); else el.style.setProperty("display", "none", "important"); };
    if (!t.duration) return gone();
    // Table rows can't shrink, and chips keep their shape: they fade, then go.
    if (el.tagName === "TR" || el.matches(".pc-chip")) { await play(el, [shownFrame, { opacity: "0" }], t).finished.catch(() => {}); return gone(); }
    // Anything else shrinks while it fades, in one motion.
    const shrink = await grow(el, false, t);
    gone();
    shrink.settle();
  }

  // What takes room grows in; a table row (it can't grow), a chip and anything else fade in where they are. Toasts and field errors
  // are always news, so they grow in by themselves.
  const GROWS = ".pc-file, .pc-tree-item, .pc-sidebar-item, .pc-menu-item, .pc-alert, .pc-toast, .pc-field-error", NEWS = ".pc-toast, .pc-field-error";
  function enter(el) {
    const t = timing();
    if (!el?.isConnected || !t.duration) return Promise.resolve();
    if (el.matches(GROWS)) return grow(el, true, t).then(g => g.settle());
    const a = play(el, [el.tagName === "TR" ? { opacity: "0" } : from(el), el.tagName === "TR" ? { opacity: "1" } : shownFrame], t);
    return a.finished.then(() => a.cancel(), () => {});
  }

  // Closing what's shown by removing hidden (menus, popovers, sheets): when the app sets hidden, keep it drawn while it plays out.
  const SHOWN = ".pc-menu, .pc-popover, .pc-sidebar-sheet";
  const displays = new WeakMap(), stops = new WeakMap();
  const backdropOf = el => el.previousElementSibling?.matches(".pc-menu-backdrop, .pc-popover-backdrop") ? el.previousElementSibling : null;
  function playOut(el) {
    const t = timing(), sheet = el.matches(".pc-sidebar-sheet"), away = sheet ? null : from(el);
    const bar = sheet ? el.querySelector(":scope > .pc-sidebar") : null, shade = sheet ? el.querySelector(":scope > .pc-sheet-backdrop") : backdropOf(el);
    const kept = [[el, displays.get(el)], [backdropOf(el), "block"]].filter(([k]) => k);
    // Drawn again, the sheet would start its sliding-in animation over (a flash off screen): hold it off while it slides out.
    bar?.style.setProperty("animation", "none");
    kept.forEach(([k, d]) => k.style.setProperty("display", d, "important"));
    const runs = [];
    if (bar) runs.push(play(bar, [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }], t));
    if (away) runs.push(play(el, [shownFrame, away], t));
    if (shade) runs.push(play(shade, [{ opacity: "1" }, { opacity: "0" }], t));
    const stop = () => { kept.forEach(([k]) => k.style.removeProperty("display")); bar?.style.removeProperty("animation"); runs.forEach(a => a.cancel()); stops.delete(el); };
    stops.set(el, stop);
    Promise.all(runs.map(a => a.finished)).then(stop, () => {});
  }
  // The phone sidebar: the app opens it by putting .pc-sidebar-sheet on its frame and closes it by taking the class off. Put it back
  // while the sidebar slides out, then take it off again.
  const ours = new WeakSet();
  function sheetOut(frame) {
    const t = timing(), bar = frame.querySelector(":scope > .pc-sidebar"), shade = frame.querySelector(":scope > .pc-sheet-backdrop");
    // The class back on would start the sheet's sliding-in animation over (a flash off screen): hold it off while it slides out.
    bar?.style.setProperty("animation", "none");
    ours.add(frame);
    frame.classList.add("pc-sidebar-sheet");
    frame.style.setProperty("display", "flex", "important");
    const runs = [bar && play(bar, [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }], t), shade && play(shade, [{ opacity: "1" }, { opacity: "0" }], t)].filter(Boolean);
    const stop = () => { ours.add(frame); frame.classList.remove("pc-sidebar-sheet"); frame.style.removeProperty("display"); bar?.style.removeProperty("animation"); runs.forEach(a => a.cancel()); stops.delete(frame); };
    stops.set(frame, stop);
    Promise.all(runs.map(a => a.finished)).then(stop, () => {});
  }
  const remembered = el => { if (el instanceof HTMLElement && el.matches(SHOWN) && !el.hidden) displays.set(el, getComputedStyle(el).display); };
  new MutationObserver(changes => {
    for (const c of changes) {
      const el = c.target;
      if (!(el instanceof HTMLElement)) continue;
      if (c.attributeName === "class") {
        if (ours.delete(el)) continue;
        const was = (c.oldValue || "").split(/\s+/).includes("pc-sidebar-sheet"), is = el.classList.contains("pc-sidebar-sheet");
        if (was && !is && on()) sheetOut(el);
        else if (is && !was) stops.get(el)?.();
        continue;
      }
      if (!el.matches(SHOWN)) continue;
      if (!el.hidden) { stops.get(el)?.(); remembered(el); }
      else if (c.oldValue === null && displays.has(el) && on()) playOut(el);
    }
  }).observe(root, { subtree: true, attributes: true, attributeFilter: ["hidden", "class"], attributeOldValue: true });

  async function close(el) {
    if (!el) return;
    if (el instanceof HTMLDialogElement) {
      if (!el.open) return;
      const t = timing();
      if (t.duration && !CSS.supports("overlay", "auto")) {
        const away = from(el), runs = [play(el, [shownFrame, away], t), play(el, [{ opacity: "1" }, { opacity: "0" }], t, { pseudoElement: "::backdrop" })];
        await Promise.all(runs.map(a => a.finished)).catch(() => {});
        el.close();
        runs.forEach(a => a.cancel());
      } else el.close();
      return;
    }
    el.hidden = true;
  }

  // Escape on a dialog: where CSS can't play the closing, play it here.
  document.addEventListener("cancel", e => {
    const d = e.target;
    if (d instanceof HTMLDialogElement && d.matches(".pc-dialog, .pc-modal, .pc-drawer") && on() && !CSS.supports("overlay", "auto")) { e.preventDefault(); close(d); }
  }, true);

  document.addEventListener("click", e => {
    if (e.defaultPrevented) return;
    // An accordion answer grows open and shrinks closed (the arrow turns at the start, data-pc-closing).
    const summary = e.target.closest(".pc-accordion-item > summary");
    if (summary) {
      const item = summary.parentElement, answer = item.querySelector(":scope > .pc-accordion-content");
      if (!answer || item.dataset.pcClosing !== undefined) return;
      const t = timing();
      if (!t.duration) return;
      e.preventDefault();
      if (item.open) {
        const sp = space(answer);
        item.dataset.pcClosing = "";
        grow(answer, false, t, {}, true, sp).then(g => { item.open = false; delete item.dataset.pcClosing; g.settle(); });
      } else {
        item.open = true;
        grow(answer, true, t).then(g => g.settle());
      }
      return;
    }
    // An alert's x, or any [data-pc-dismiss]: its alert or toast leaves.
    const x = e.target.closest(".pc-alert-close, [data-pc-dismiss]");
    if (x) { leave(x.closest(".pc-alert, .pc-toast, [data-pc-dismissable]")); return; }
    // A jump within the page scrolls smoothly.
    const link = e.target.closest('a[href^="#"]');
    if (link && on()) { root.style.scrollBehavior = "smooth"; setTimeout(() => root.style.removeProperty("scroll-behavior"), 1000); }
  });

  // The tab line: one line under the chosen tab that slides to the next one (pecaiet.css draws it from --pc-tab-x and --pc-tab-w).
  const lines = new ResizeObserver(entries => entries.forEach(e => drawLine(e.target)));
  function drawLine(tabs) {
    const tab = tabs.querySelector(':scope > .pc-tab:is([aria-selected="true"], [aria-current="page"])');
    if (!tab) { delete tabs.dataset.pcTabLine; return; }
    const inset = parseFloat(getComputedStyle(tab).paddingLeft) || 0;
    tabs.style.setProperty("--pc-tab-x", `${tab.offsetLeft + inset}px`);
    tabs.style.setProperty("--pc-tab-w", `${tab.offsetWidth - 2 * inset}px`);
    tabs.dataset.pcTabLine = "";
  }
  const watchTabs = scope => scope.querySelectorAll?.(".pc-tabs").forEach(t => { drawLine(t); lines.observe(t); });
  // What counts as new: children inserted under a tree item within a second of that same item opening (a tree drawn again has new
  // items, so it stays still), rows a Turbo stream adds, and every toast and field error (not in Turbo's preview of a cached page).
  // Also faded in: an icon swapped inside a button that stays, and whatever is put where a skeleton was taken out.
  const rows = [], fades = [], opened = new WeakMap();
  const parentItem = n => { const level = +n.getAttribute("aria-level") || 1; let p = n.previousElementSibling; while (p && (+p.getAttribute("aria-level") || 1) >= level) p = p.previousElementSibling; return p; };
  let adding = 0;
  new MutationObserver(changes => {
    const skeletons = new Set(changes.filter(c => [...c.removedNodes].some(n => n instanceof Element && (n.matches(".pc-skeleton") || n.querySelector(".pc-skeleton")))).map(c => c.target));
    for (const c of changes) {
      if (c.type === "attributes") {
        if (c.attributeName === "aria-expanded") { if (c.target.getAttribute("aria-expanded") === "true" && c.target.matches?.(".pc-tree-item")) opened.set(c.target, performance.now()); continue; }
        const tabs = c.target.closest?.(".pc-tabs"); if (tabs) drawLine(tabs);
      }
      else c.addedNodes.forEach(n => {
        if (!(n instanceof Element)) return;
        if (n.matches(".pc-tabs")) watchTabs(n.parentElement); else watchTabs(n);
        if (n.matches(SHOWN)) remembered(n);
        if ((c.target.matches?.(".pc-btn") && n.matches("svg, .pc-spinner")) || skeletons.has(c.target)) fades.push(n);
        else if (n.matches(".pc-tree-item") && performance.now() - (opened.get(parentItem(n)) ?? -1e9) < 1000) rows.push(n);
        else if (adding && (n.matches(GROWS + ", .pc-chip") || n.tagName === "TR")) rows.push(n);
        else if (!root.hasAttribute("data-turbo-preview")) rows.push(...(n.matches(NEWS) ? [n] : n.querySelectorAll(NEWS)));
      });
    }
    // New rows grow in together: every size is read first, then they all start. A table row and a chip fade in, and so do a swapped
    // icon and what took a skeleton's place.
    if (!rows.length && !fades.length) return;
    const t = timing(), list = rows.splice(0), faded = fades.splice(0);
    if (!t.duration) return;
    const spaces = list.map(n => (n.tagName === "TR" || n.matches(".pc-chip") ? null : space(n)));
    const fadeIn = n => { const a = play(n, [{ opacity: "0" }, { opacity: "1" }], t); a.finished.then(() => a.cancel(), () => {}); };
    list.forEach((n, i) => { if (spaces[i]) grow(n, true, t, {}, true, spaces[i]).then(g => g.settle()); else fadeIn(n); });
    faded.forEach(fadeIn);
  }).observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-selected", "aria-current", "aria-expanded"] });

  // Theme and motion, and the Settings radios that set them.
  function setTheme(mode) {
    const apply = () => {
      root.classList.toggle("dark", mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches));
      remember("theme", mode);
    };
    if (on() && document.startViewTransition) document.startViewTransition(apply); else apply();
  }
  function setMotion(mode) {
    if (mode) root.dataset.motion = mode; else delete root.dataset.motion;
    remember("motion", mode);
    syncRadios();
  }
  const motion = () => (on() ? "on" : "off");
  function syncRadios() {
    document.querySelectorAll('input[name="pc-motion"]').forEach(r => { r.checked = r.value === motion(); });
    const theme = cookie("theme") || "system";
    document.querySelectorAll('input[name="pc-theme"]').forEach(r => { r.checked = r.value === theme; });
  }
  document.addEventListener("change", e => {
    const r = e.target;
    if (r.name === "pc-theme") setTheme(r.value);
    if (r.name === "pc-motion") setMotion(r.value);
  });

  // Rows and chips that arrive after the page has loaded fade in (pecaiet.css, behind data-pc-ready); a new page doesn't.
  const ready = () => requestAnimationFrame(() => requestAnimationFrame(() => { root.dataset.pcReady = ""; }));
  const notReady = () => { delete root.dataset.pcReady; };

  // Turbo: removed things leave first; a new page isn't "added rows".
  addEventListener("turbo:before-stream-render", e => {
    const action = e.target.action, render = e.detail.render;
    if (!on()) return;
    if (action === "remove") e.detail.render = async stream => { await Promise.all(stream.targetElements.map(t => leave(t, { remove: false }))); render(stream); };
    if (["append", "prepend", "before", "after"].includes(action)) e.detail.render = async stream => { adding++; try { await render(stream); } finally { setTimeout(() => adding--, 0); } };
  });
  addEventListener("turbo:before-render", notReady);
  addEventListener("turbo:load", () => { watchTabs(document); document.querySelectorAll(SHOWN).forEach(remembered); syncRadios(); ready(); });
  // Inertia: the same around a visit.
  document.addEventListener("inertia:start", notReady);
  document.addEventListener("inertia:finish", ready);

  // The browser sets up its animation machinery the first time a page animates, which made the first motion start late. Do it once
  // when the page is idle, on an invisible square.
  const warm = () => {
    const w = document.createElement("div");
    w.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.append(w);
    getComputedStyle(w).getPropertyValue("--pc-enter");
    w.offsetHeight;
    w.animate([{ opacity: "0", translate: "0 0", height: "1px" }, { opacity: "0", translate: "0 1px", height: "0px" }], { duration: 1 }).finished.then(() => w.remove(), () => w.remove());
  };
  const start = () => {
    watchTabs(document); document.querySelectorAll(SHOWN).forEach(remembered); syncRadios(); ready(); document.fonts?.ready.then(() => watchTabs(document));
    (window.requestIdleCallback || setTimeout)(warm, { timeout: 1000 });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  window.Pecaiet = { enter, leave, close, setTheme, setMotion, motion };
})();
