import { a1 as store_get, a2 as unsubscribe_stores, T as pop, Q as push } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let slugArray = store_get($$store_subs ??= {}, "$page", page)?.url.pathname.split("/").filter(Boolean);
  slugArray[slugArray.length - 2];
  slugArray[slugArray.length - 1][0].toUpperCase() + slugArray[slugArray.length - 1].substring(1);
  {
    $$payload.out += "<!--[!-->";
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
