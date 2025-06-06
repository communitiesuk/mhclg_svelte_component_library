import { a1 as store_get, a2 as unsubscribe_stores, T as pop, Q as push } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as PlaygroundDetails } from "../../../../chunks/PlaygroundDetails.js";
import { t as textStringConversion } from "../../../../chunks/textStringConversion.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = false, folders } = $$props;
  let details = {};
  let pageInfo = store_get($$store_subs ??= {}, "$page", page)?.route.id.split("/");
  details.name = textStringConversion(folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1], "title-first-word");
  data?.metrics[0];
  PlaygroundDetails($$payload, { homepage, details });
  $$payload.out += `<!----> `;
  if (!homepage) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="chart-container svelte-ip8jd6"><div class="mt-20"><div class="top-level-container border-solid rounded-lg border-2 border-current p-2"></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
