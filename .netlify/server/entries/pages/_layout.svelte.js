import "clsx";
import { T as pop, Q as push } from "../../chunks/index.js";
import { D as DividerLine } from "../../chunks/DividerLine.js";
function _layout($$payload, $$props) {
  push();
  let { children, data } = $$props;
  $$payload.out += `<div class="mb-20"><a class="text-inherit no-underline" href="/"><div class="g-top-level-container mb-16"><div class="flex flex-row gap-10 items-center"><img src="/assets/images/oflog_crest_black.png" alt="MHCLG crest"> <div class="flex flex-col leading-tight"><h3>Svelte Component Library</h3> <p class="font-normal italic m-0 text-3xl">MHCLG Data Tools Team</p></div></div> `;
  DividerLine($$payload, { margin: "1rem 0rem" });
  $$payload.out += `<!----></div></a> `;
  children($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _layout as default
};
