type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/**
 * Cal.com's embed loader. Once initialised, any element with `data-cal-link`
 * opens that booking page as a popup on top of the current page.
 */
export const loadCalEmbed = () => {
  if (window.Cal) return;
  const queue = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
  const cal = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src =
        "https://app.cal.com/embed/embed.js";
      cal.loaded = true;
    }
    queue(cal as unknown as { q: unknown[] }, args);
  } as CalFn;
  window.Cal = cal;
  window.Cal("init", { origin: "https://cal.com" });
  window.Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
};
