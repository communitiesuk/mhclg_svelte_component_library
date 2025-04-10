// Singleton highlighter instance
let highlighter = null;
let activeNodes = new Set();
let isInitializing = false;
let initPromise = null;

async function getOrCreateHighlighter(theme) {
  if (highlighter) return highlighter;

  if (isInitializing) {
    return await initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    const { getHighlighter } = await import("shiki");
    const { default: svelte } = await import("shiki/langs/svelte.mjs");
    highlighter = await getHighlighter({
      langs: [svelte],
      themes: [theme],
    });
    isInitializing = false;
    return highlighter;
  })();

  return await initPromise;
}

export const highlight = async (
  node,
  options = { lang: "svelte", theme: "vitesse-light" },
) => {
  const instance = await getOrCreateHighlighter(options.theme);
  activeNodes.add(node);

  const renderCode = () => {
    if (!instance) return;
    const html = instance.codeToHtml(node.textContent, {
      lang: options.lang,
      theme: options.theme,
      transformers: [
        {
          pre(node) {
            node.properties["data-language"] = options.lang;
            return node;
          },
        },
      ],
    });
    node.innerHTML = html;
  };

  renderCode();

  return {
    destroy() {
      activeNodes.delete(node);
      node.innerHTML = node.textContent;

      // Only dispose if we've been idle for a while and have no active nodes
      if (activeNodes.size === 0) {
        setTimeout(() => {
          if (activeNodes.size === 0 && highlighter) {
            highlighter.dispose();
            highlighter = null;
            initPromise = null;
          }
        }, 5000); // Wait 5 seconds before disposing
      }
    },
    update(newOptions) {
      options = { ...options, ...newOptions };
      renderCode();
    },
  };
};
