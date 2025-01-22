<script>
  import { highlight } from '$lib/utils/syntax-highlighting/shikiHighlight';

  export let code = '';
  export let filename = 'App';
  export let extension = '.svelte';
  export let language = 'svelte';
  export let theme = 'vitesse-light';

  function copyHighlightedCode(event) {
    const block = event.currentTarget.closest('.code-block');
    if (!block) return;

    const codeElement = block.querySelector('code');
    if (!codeElement) return;

    const text = codeElement.innerText || codeElement.textContent;
    navigator.clipboard.writeText(text);
  }
</script>

<div class="code-block">
  <div class="controls">
    <span class="filename" data-ext={extension}>{filename}</span>
    <button
      class="copy-to-clipboard raised"
      onclick={copyHighlightedCode}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    ></button>
  </div>
  <div use:highlight={{ lang: language, theme : theme }}>
    {code}
  </div>
</div>
