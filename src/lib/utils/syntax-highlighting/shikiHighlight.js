let highlighter;

export const highlight = async (node, options = { lang: 'svelte', theme: 'vitesse-light' }) => {
  if (!highlighter) {
    const { getHighlighter } = await import('shiki');
    const { default: svelte } = await import('shiki/langs/svelte.mjs');
    highlighter = await getHighlighter({
      langs: [svelte],
      themes: [options.theme],
      theme: options.theme
    });
  }

  const html = highlighter.codeToHtml(node.textContent, {
    lang: options.lang,
    theme: options.theme
  });
  node.innerHTML = html;

  return {
    destroy() {
      node.innerHTML = node.textContent;
    },
    update(newOptions) {
      options = { ...options, ...newOptions };
      node.innerHTML = highlighter.codeToHtml(node.textContent, {
        lang: options.lang,
        theme: options.theme
      });
    }
  };
};
