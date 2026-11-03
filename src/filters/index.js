(() => {
  const namespace = (globalThis.StoicYouTube = globalThis.StoicYouTube || {});
  const filters = [];

  namespace.registerFilter = (filter) => {
    if (!filter || typeof filter.run !== "function") {
      return;
    }

    filters.push(filter);
  };

  namespace.runFilters = (context) => {
    for (const filter of filters) {
      try {
        filter.run(context);
      } catch (error) {
        console.warn(`[Stoic YouTube] ${filter.name || "filter"} failed`, error);
      }
    }
  };

  namespace.hideElement = (element) => {
    if (element instanceof Element) {
      element.classList.add("stoic-youtube-hidden");
      element.setAttribute("data-stoic-youtube-hidden", "true");
    }
  };
})();
