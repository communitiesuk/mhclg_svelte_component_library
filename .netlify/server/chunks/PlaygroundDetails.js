import { Z as attr, _ as stringify, W as escape_html, a0 as ensure_array_like, a8 as clsx, T as pop, Q as push } from "./index.js";
import { D as DividerLine } from "./DividerLine.js";
import { t as textStringConversion, h as html } from "./textStringConversion.js";
function PlaygroundDetails($$payload, $$props) {
  push();
  let { homepage, details } = $$props;
  function pageDescription($$payload2) {
    const each_array = ensure_array_like(details.description);
    $$payload2.out += `<dd class="svelte-1zokn8"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let paragraph = each_array[$$index];
      if (paragraph.markdown) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="svelte-1zokn8">${html(paragraph.content)}</p>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<p class="svelte-1zokn8">${escape_html(paragraph.content)}</p>`;
      }
      $$payload2.out += `<!--]-->`;
    }
    $$payload2.out += `<!--]--></dd>`;
  }
  $$payload.out += `<div data-role="details-container"${attr("class", `${stringify(homepage ? "" : "g-top-level-container")} flex flex-col gap-6 ${stringify(homepage ? "bg-teal-500 bg-opacity-10 p-5 rounded-lg" : "")}`)}><div data-role="name-and-desc-container" class="flex flex-row items-start gap-4">`;
  if (homepage) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a class="underline underline-offset-4"${attr("style", homepage ? "width: 450px" : "")}${attr("href", `/playground/${stringify(textStringConversion(details.name, "kebab"))}`)}><h8>${escape_html(details.name)}</h8></a> <div>`;
    pageDescription($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h4>${escape_html(details.name)}</h4>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (!homepage) {
    $$payload.out += "<!--[-->";
    DividerLine($$payload, { margin: "0.2rem 0rem" });
    $$payload.out += `<!----> <dl data-role="details-grid-container" class="grid gap-y-4 svelte-1zokn8">`;
    if (details.description?.length > 0) {
      $$payload.out += "<!--[-->";
      if (!homepage) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<dt>Description:</dt> `;
        pageDescription($$payload);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></dl> `;
    if (!homepage && details.steps?.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(details.steps);
      DividerLine($$payload, { margin: "0.2rem 0rem" });
      $$payload.out += `<!----> <div class="flex flex-col gap-2 m-0"><h7 class="font-bold">Steps:</h7> <ul class="grid gap-y-2 svelte-1zokn8"><!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let step = each_array_1[i];
        $$payload.out += `<li${attr("class", clsx(step.complete ? "text-green-700" : "") + " svelte-1zokn8")}><span>${escape_html(i + 1)}.</span> `;
        if (step.markdown) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span${attr("class", clsx(step.complete ? "line-through" : "") + " svelte-1zokn8")}>${html(step.label)}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span${attr("class", clsx(step.complete ? "line-through" : "") + " svelte-1zokn8")}>${escape_html(step.label)}</span>`;
        }
        $$payload.out += `<!--]--></li>`;
      }
      $$payload.out += `<!--]--></ul></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  PlaygroundDetails as P
};
