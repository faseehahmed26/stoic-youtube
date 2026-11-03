(() => {
  const namespace = (globalThis.StoicYouTube = globalThis.StoicYouTube || {});
  let scheduled = false;

  const runFilters = () => {
    scheduled = false;

    namespace.runFilters?.({
      document,
      hideElement: namespace.hideElement || (() => {})
    });
  };

  const scheduleRun = () => {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(runFilters);
  };

  const patchHistoryMethod = (methodName) => {
    const original = history[methodName];

    if (typeof original !== "function") {
      return;
    }

    history[methodName] = function patchedHistoryMethod(...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event("stoic-youtube:navigation"));
      return result;
    };
  };

  const observePageChanges = () => {
    const observer = new MutationObserver(scheduleRun);

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };

  const start = () => {
    patchHistoryMethod("pushState");
    patchHistoryMethod("replaceState");

    window.addEventListener("popstate", scheduleRun);
    window.addEventListener("stoic-youtube:navigation", scheduleRun);
    window.addEventListener("yt-navigate-finish", scheduleRun);
    window.addEventListener("yt-page-data-updated", scheduleRun);

    observePageChanges();
    scheduleRun();
  };

  if (document.documentElement) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();
