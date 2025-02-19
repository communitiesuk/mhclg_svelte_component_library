<script lang="ts">
  import { codeToHtml } from "shiki";

  let {
    code = "",
    filename = "App",
    extension = ".svelte",
    language = "svelte",
    theme = "vitesse-light",
  }: {
    code: string;
    filename?: string;
    extension?: string;
    language?: string;
    theme?: string;
  } = $props();

  function copyHighlightedCode(event) {
    const block = event.currentTarget.closest(".code-block");
    if (!block) return;

    const codeElement = block.querySelector("code");
    if (!codeElement) return;

    const text = codeElement.innerText || codeElement.textContent;
    navigator.clipboard.writeText(text);
  }

  async function highlight(code, language, theme) {
    const html = codeToHtml(code, {
      lang: language,
      theme: theme,
    });
    const response = await html;
    return response;
  }

  let content = highlight(code, language, theme);
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
  <div>
    {#await content then content}
      {@html content}
    {/await}
  </div>
</div>
