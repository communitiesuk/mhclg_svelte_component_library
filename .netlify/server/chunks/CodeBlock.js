import { Z as attr, W as escape_html } from "./index.js";
function CodeBlock($$payload, $$props) {
  let {
    code = "",
    filename = "App",
    extension = ".svelte",
    language = "svelte",
    theme = "vitesse-light"
  } = $$props;
  $$payload.out += `<div class="code-block"><div class="controls"><span class="filename"${attr("data-ext", extension)}>${escape_html(filename)}</span> <button class="copy-to-clipboard raised" title="Copy to clipboard" aria-label="Copy to clipboard"></button></div> <div>${escape_html(code)}</div></div>`;
}
export {
  CodeBlock as C
};
