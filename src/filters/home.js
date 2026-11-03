(() => {
  const namespace = (globalThis.StoicYouTube = globalThis.StoicYouTube || {});
  const PLACEHOLDER_ID = "stoic-youtube-home-placeholder";

  const HOME_FEED_SELECTOR = [
    'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer',
    'ytd-browse[page-subtype="home"] ytd-rich-section-renderer',
    'ytd-browse[page-subtype="home"] ytd-reel-shelf-renderer',
    "ytd-browse ytd-rich-grid-renderer",
    "ytm-browse ytm-rich-grid-renderer",
    "ytm-browse ytm-item-section-renderer",
    "ytm-browse ytm-reel-shelf-renderer"
  ].join(",");

  const isHomePage = () => {
    const { hostname, pathname } = window.location;
    const isYouTubeHost = hostname === "www.youtube.com" || hostname === "m.youtube.com";

    return isYouTubeHost && (pathname === "/" || pathname === "");
  };

  const removePlaceholder = (document) => {
    document.getElementById(PLACEHOLDER_ID)?.remove();
  };

  const renderPlaceholder = (document) => {
    if (!document.body || document.getElementById(PLACEHOLDER_ID)) {
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.id = PLACEHOLDER_ID;
    placeholder.innerHTML = [
      "<strong>No feed. No excuses.</strong>",
      "<span>Search for what you came to master.</span>"
    ].join("");

    const pageManager = document.querySelector("ytd-page-manager, ytm-app") || document.body;
    pageManager.prepend(placeholder);
  };

  namespace.registerFilter({
    name: "blank-home",
    run({ document, hideElement }) {
      const onHomePage = isHomePage();
      document.documentElement.classList.toggle("stoic-youtube-blank-home", onHomePage);

      if (!onHomePage) {
        removePlaceholder(document);
        return;
      }

      renderPlaceholder(document);
      document.querySelectorAll(HOME_FEED_SELECTOR).forEach(hideElement);
    }
  });
})();
