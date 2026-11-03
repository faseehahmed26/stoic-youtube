(() => {
  const namespace = (globalThis.StoicYouTube = globalThis.StoicYouTube || {});

  const SHORTS_LINK_SELECTOR = [
    'a[href^="/shorts/"]',
    'a[href*="youtube.com/shorts/"]',
    'a[href*="m.youtube.com/shorts/"]'
  ].join(",");

  const SHORTS_CONTAINER_SELECTOR = [
    "ytd-rich-item-renderer",
    "ytd-rich-section-renderer",
    "ytd-video-renderer",
    "ytd-grid-video-renderer",
    "ytd-compact-video-renderer",
    "ytd-reel-shelf-renderer",
    "ytd-reel-item-renderer",
    "ytd-shelf-renderer",
    "ytd-guide-entry-renderer",
    "ytd-mini-guide-entry-renderer",
    "yt-chip-cloud-chip-renderer",
    "yt-lockup-view-model",
    "ytm-rich-item-renderer",
    "ytm-reel-shelf-renderer",
    "ytm-pivot-bar-item-renderer",
    "ytm-video-with-context-renderer"
  ].join(",");

  const SHORTS_LABEL_CONTAINER_SELECTOR = [
    "ytd-rich-section-renderer",
    "ytd-reel-shelf-renderer",
    "ytd-shelf-renderer",
    "ytd-guide-entry-renderer",
    "ytd-mini-guide-entry-renderer",
    "ytm-reel-shelf-renderer",
    "ytm-pivot-bar-item-renderer"
  ].join(",");

  const shortsTextPattern = /\bshorts\b/i;

  const isShortsUrl = (href) => {
    try {
      return new URL(href, window.location.origin).pathname.startsWith("/shorts/");
    } catch {
      return false;
    }
  };

  const redirectAwayFromShorts = () => {
    if (!isShortsUrl(window.location.href)) {
      return;
    }

    window.location.replace("https://www.youtube.com/");
  };

  const hideClosestShortsSurface = (element, hideElement) => {
    const container = element.closest(SHORTS_CONTAINER_SELECTOR);
    hideElement(container || element);
  };

  const hideShortsLinks = (root, hideElement) => {
    root.querySelectorAll(SHORTS_LINK_SELECTOR).forEach((link) => {
      if (isShortsUrl(link.href)) {
        hideClosestShortsSurface(link, hideElement);
      }
    });
  };

  const hideLabeledShortsSurfaces = (root, hideElement) => {
    root.querySelectorAll(SHORTS_LABEL_CONTAINER_SELECTOR).forEach((element) => {
      if (shortsTextPattern.test(element.textContent || "")) {
        hideElement(element);
      }
    });
  };

  namespace.registerFilter({
    name: "shorts",
    run({ document, hideElement }) {
      redirectAwayFromShorts();

      if (!document?.documentElement) {
        return;
      }

      document.documentElement.classList.add("stoic-youtube-active");
      hideShortsLinks(document, hideElement);
      hideLabeledShortsSurfaces(document, hideElement);
    }
  });
})();
