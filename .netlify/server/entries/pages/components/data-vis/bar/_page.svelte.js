import { a1 as store_get, X as copy_payload, Y as assign_payload, a2 as unsubscribe_stores, T as pop, Z as attr, _ as stringify, Q as push } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import "clsx";
import { D as DividerLine } from "../../../../../chunks/DividerLine.js";
import { a as addIndexAndInitalValue, t as trackVisibleParameters, c as createParametersObject, C as ComponentDetails, P as ParametersSection, S as ScreenSizeRadio, d as defaultScreenWidthBreakpoints } from "../../../../../chunks/trackVisibleParameters.js";
import { t as textStringConversion } from "../../../../../chunks/textStringConversion.js";
function Bar($$payload, $$props) {
  $$payload.out += `<text y="200" x="200">Bar component goes here</text>`;
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = void 0, folders } = $$props;
  let details = {
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: "to_be_developed",
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: void 0,
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: void 0,
    /**
     * &&     childComponents - Optional detail, can be used by developers to link to components which this component relies upon.
     * ?     'name' and 'folder' must match the routes folder structure (see documentation above for 'name' and 'folder' above for available options)
     * ?      example array would be [{name: 'svg', folder: 'data-vis'},{name: 'line', folder: 'data-vis'}]
     */
    childComponents: void 0,
    /**
     * &&     requirements - Optional detail, can be used by developers to track which requirements for the component have been coded up.
     * ?      The 'description' parameter is optional (default is not to provide a description).
     * ?      For each paragraph there is an optional 'markdown' (default = false) parameter. When set to true, it uses the @html tag to render the content.
     * ?      For each paragraph there is an optional 'fulfilled' (default = false) parameter. When set to true, the text will be highlighted green and struck-through, demonstrating that this requirmeent has been coded up.
     */
    requirements: void 0
  };
  let pageInfo = store_get($$store_subs ??= {}, "$page", page)?.route.id.split("/");
  details.name = textStringConversion(folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1], "title-first-word");
  details.folder = folders ? folders[folders.length - 2] : pageInfo[pageInfo.length - 2];
  let demoScreenWidth = defaultScreenWidthBreakpoints.md;
  let parametersSourceArray = homepage ?? addIndexAndInitalValue([]);
  let parametersValuesArray = homepage ?? parametersSourceArray.map((el) => el.value);
  let derivedParametersObject = homepage ?? {};
  let parametersVisibleArray = homepage ?? trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  homepage ?? createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    ComponentDetails($$payload2, { homepage, details });
    $$payload2.out += `<!----> `;
    if (!homepage) {
      $$payload2.out += "<!--[-->";
      ParametersSection($$payload2, {
        details,
        parametersSourceArray,
        parametersVisibleArray,
        get parametersValuesArray() {
          return parametersValuesArray;
        },
        set parametersValuesArray($$value) {
          parametersValuesArray = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-12gp6g5"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
      ScreenSizeRadio($$payload2, {
        get demoScreenWidth() {
          return demoScreenWidth;
        },
        set demoScreenWidth($$value) {
          demoScreenWidth = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-12gp6g5"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-12gp6g5"><svg width="800px" height="800px">`;
      Bar($$payload2);
      $$payload2.out += `<!----></svg></div></div> <div class="mt-20 svelte-12gp6g5" data-role="examples-section">`;
      DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
      $$payload2.out += `<!----> <h5 class="underline underline-offset-4">Examples</h5></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
