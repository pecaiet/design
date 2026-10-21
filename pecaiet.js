/* Pecaiet shared script: the motion pecaiet.css can't play by itself, and the two Settings choices that change the whole page (theme,
   motion). Load it once in every app, next to pecaiet.css: <script src="pecaiet.js" defer></script> (or import it once).
   Everything in the apps works without it; the things below just happen at once. Timings come from pecaiet.css (--pc-motion-*),
   so motion is still set in one place.

   Calls (on window.Pecaiet):
     leave(el)          fade el out the way it came, close the gap it leaves, then remove it. Resolves when it's gone.
                        { remove: false } plays it and leaves the removing to you.
     enter(el)          fade el in the way it comes. Works as a React ref (null is ignored).
     close(el)          play the closing, then close: a <dialog> (close()) or anything shown by removing hidden (sets hidden).
     setTheme(mode)     "dark" | "light" | "system": the .dark class on <html>, remembered in the theme cookie, crossfading.
     setMotion(mode)    "on" | "off" (or null to follow the device again): data-motion on <html>, remembered in the motion cookie.
     motion()           "on" or "off", as it is right now.

   By itself, with no calls:
     - menus, popovers and sheets play their closing when the app hides them (hidden);
     - the phone sidebar (and the settings nav on phones) slides out when the app takes .pc-sidebar-sheet off its frame;
     - Escape on a dialog, the settings window or the drawer plays the closing;
     - accordion answers and tree branches grow open and shrink closed, the rows below gliding;
     - an alert's x (.pc-alert-close) and any [data-pc-dismiss] button make their alert or toast leave;
     - the chosen tab's line slides to the next tab;
     - Turbo: a removed row, alert or toast leaves first; rows and chips added after the page has loaded fade in (pecaiet.css);
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
  const on = () => time("--pc-motion-base") > 0;
  const play = (el, frames, options = {}) =>
    el.animate(frames, { duration: time("--pc-motion-base"), easing: getComputedStyle(root).getPropertyValue("--pc-motion-ease").trim() || "ease-out", fill: "forwards", ...options });
  // Where el comes from, as pecaiet.css says (--pc-enter, --pc-enter-opacity); 4px up when it doesn't say.
  const from = el => {
    const s = getComputedStyle(el);
    return { opacity: s.getPropertyValue("--pc-enter-opacity").trim() || "0", translate: s.getPropertyValue("--pc-enter").trim() || `0 calc(-1 * ${s.getPropertyValue("--pc-motion-distance").trim() || "4px"})` };
  };
  const shownFrame = { opacity: "1", translate: "0 0" };

  // Grow open or shrink closed: height, padding and gap together with a fade, so what's below glides instead of jumping.
  function grow(el, opening) {
    const s = getComputedStyle(el), gap = parseFloat(getComputedStyle(el.parentElement || el).rowGap) || 0;
    const full = { height: `${el.offsetHeight}px`, paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, borderTopWidth: s.borderTopWidth, borderBottomWidth: s.borderBottomWidth, marginBottom: s.marginBottom, opacity: "1" };
    const none = { height: "0px", paddingTop: "0px", paddingBottom: "0px", borderTopWidth: "0px", borderBottomWidth: "0px", marginBottom: `${-gap}px`, opacity: "0" };
    el.style.overflow = "hidden";
    const a = play(el, opening ? [none, full] : [full, none]);
    return a.finished.then(() => a, () => a).finally(() => el.style.removeProperty("overflow"));
  }

  async function leave(el, { remove = true } = {}) {
    if (!el?.isConnected) return;
    if (on() && el.matches(".pc-tree-item")) await grow(el, false);
    else if (on()) {
      const fade = play(el, [shownFrame, from(el)]);
      await fade.finished.catch(() => {});
      if (el.tagName !== "TR" && el.parentElement) {
        const s = getComputedStyle(el), gap = parseFloat(getComputedStyle(el.parentElement).rowGap) || 0;
        el.style.overflow = "hidden";
        await play(el, [
          { height: `${el.offsetHeight}px`, paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, borderTopWidth: s.borderTopWidth, borderBottomWidth: s.borderBottomWidth, marginBottom: s.marginBottom },
          { height: "0px", paddingTop: "0px", paddingBottom: "0px", borderTopWidth: "0px", borderBottomWidth: "0px", marginBottom: `${-gap}px` },
        ]).finished.catch(() => {});
      }
    }
    if (remove) el.remove();
  }

  function enter(el) {
    if (!el?.isConnected || !on()) return Promise.resolve();
    const a = play(el, [from(el), shownFrame]);
    return a.finished.then(() => a.cancel(), () => {});
  }

  // Closing what's shown by removing hidden (menus, popovers, sheets): when the app sets hidden, keep it drawn while it plays out.
  const SHOWN = ".pc-menu, .pc-popover, .pc-sidebar-sheet";
  const displays = new WeakMap(), stops = new WeakMap();
  const backdropOf = el => el.previousElementSibling?.matches(".pc-menu-backdrop, .pc-popover-backdrop") ? el.previousElementSibling : null;
  function playOut(el) {
    const kept = [[el, displays.get(el)], [backdropOf(el), "block"]].filter(([k]) => k);
    kept.forEach(([k, d]) => k.style.setProperty("display", d, "important"));
    const runs = [];
    if (el.matches(".pc-sidebar-sheet")) {
      const bar = el.querySelector(":scope > .pc-sidebar"), shade = el.querySelector(":scope > .pc-sheet-backdrop");
      if (bar) runs.push(play(bar, [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }]));
      if (shade) runs.push(play(shade, [{ opacity: "1" }, { opacity: "0" }]));
    } else {
      runs.push(play(el, [shownFrame, from(el)]));
      const shade = backdropOf(el);
      if (shade) runs.push(play(shade, [{ opacity: "1" }, { opacity: "0" }]));
    }
    const stop = () => { kept.forEach(([k]) => k.style.removeProperty("display")); runs.forEach(a => a.cancel()); stops.delete(el); };
    stops.set(el, stop);
    Promise.all(runs.map(a => a.finished)).then(stop, () => {});
  }
  // The phone sidebar: the app opens it by putting .pc-sidebar-sheet on its frame and closes it by taking the class off. Put it back
  // while the sidebar slides out, then take it off again.
  const ours = new WeakSet();
  function sheetOut(frame) {
    ours.add(frame);
    frame.classList.add("pc-sidebar-sheet");
    frame.style.setProperty("display", "flex", "important");
    const bar = frame.querySelector(":scope > .pc-sidebar"), shade = frame.querySelector(":scope > .pc-sheet-backdrop");
    const runs = [bar && play(bar, [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }]), shade && play(shade, [{ opacity: "1" }, { opacity: "0" }])].filter(Boolean);
    const stop = () => { ours.add(frame); frame.classList.remove("pc-sidebar-sheet"); frame.style.removeProperty("display"); runs.forEach(a => a.cancel()); stops.delete(frame); };
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
      if (on() && !CSS.supports("overlay", "auto")) {
        const runs = [play(el, [shownFrame, from(el)]), play(el, [{ opacity: "1" }, { opacity: "0" }], { pseudoElement: "::backdrop" })];
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
      if (!answer || !on() || item.dataset.pcClosing !== undefined) return;
      e.preventDefault();
      if (item.open) {
        item.dataset.pcClosing = "";
        grow(answer, false).then(a => { item.open = false; delete item.dataset.pcClosing; a.cancel(); });
      } else {
        item.open = true;
        grow(answer, true).then(a => a.cancel());
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
  new MutationObserver(changes => {
    for (const c of changes) {
      if (c.type === "attributes") { const tabs = c.target.closest?.(".pc-tabs"); if (tabs) drawLine(tabs); }
      else c.addedNodes.forEach(n => {
        if (!(n instanceof Element)) return;
        if (n.matches(".pc-tabs")) watchTabs(n.parentElement); else watchTabs(n);
        if (n.matches(SHOWN)) remembered(n);
        if (n.matches(".pc-tree-item") && root.dataset.pcReady !== undefined && on()) grow(n, true).then(a => a.cancel());
      });
    }
  }).observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-selected", "aria-current"] });

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
    if (e.target.action !== "remove" || !on()) return;
    const render = e.detail.render;
    e.detail.render = async stream => { await Promise.all(stream.targetElements.map(t => leave(t, { remove: false }))); render(stream); };
  });
  addEventListener("turbo:before-render", notReady);
  addEventListener("turbo:load", () => { watchTabs(document); document.querySelectorAll(SHOWN).forEach(remembered); syncRadios(); ready(); });
  // Inertia: the same around a visit.
  document.addEventListener("inertia:start", notReady);
  document.addEventListener("inertia:finish", ready);

  const start = () => { watchTabs(document); document.querySelectorAll(SHOWN).forEach(remembered); syncRadios(); ready(); document.fonts?.ready.then(() => watchTabs(document)); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  window.Pecaiet = { enter, leave, close, setTheme, setMotion, motion };
})();
