let highlighter = null;
let activeNodes = new Set();

export const highlight = async (
  node,
  options = { lang: "svelte", theme: "vitesse-light" },
) => {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    const { default: svelte } = await import("shiki/langs/svelte.mjs");
    highlighter = await getHighlighter({
      langs: [svelte],
      themes: [options.theme],
    });
  }

  activeNodes.add(node);

  const html = highlighter.codeToHtml(node.textContent, {
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

  return {
    destroy() {
      activeNodes.delete(node);
      node.innerHTML = node.textContent;

      // If there are no more active nodes, dispose of the highlighter
      if (activeNodes.size === 0 && highlighter) {
        highlighter.dispose();
        highlighter = null;
      }
    },
    update(newOptions) {
      options = { ...options, ...newOptions };
      if (highlighter) {
        node.innerHTML = highlighter.codeToHtml(node.textContent, {
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
      }
    },
  };
};
