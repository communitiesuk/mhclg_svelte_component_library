import { X as copy_payload, Y as assign_payload, T as pop, Q as push, Z as attr, a1 as store_get, a2 as unsubscribe_stores, a0 as ensure_array_like, W as escape_html, ac as invalid_default_snippet, a7 as spread_attributes } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as PlaygroundDetails } from "../../../../chunks/PlaygroundDetails.js";
import { t as textStringConversion } from "../../../../chunks/textStringConversion.js";
import "clsx";
import { R as Radio, I as Input } from "../../../../chunks/Input.js";
import { scaleLinear } from "d3-scale";
let details = {
  /**
   * &&     description - An array of paragraphs of text explaining what the page does, used within PlaygroundDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  description: [
    {
      content: "This page was created as a sandbox environment for developing our first component. Each developer has built their own version of this bar chart component."
    },
    {
      content: "This bar chart is constructed using a row-by-row approach."
    }
  ],
  steps: [
    { label: "Set up core row-by-row structure.", complete: true },
    {
      label: "Add placeholder components for titles, legends, axes and sources.",
      complete: true
    },
    {
      label: "Define a function that separates rows evenly along the height of the chart."
    },
    {
      label: "Define an xScale based on data, use it to plot a bar for each row."
    },
    {
      label: "Create functionality that allows a developer to re-order rows from highest to smallest."
    },
    {
      label: "Create functionality that allows a developer to change the color of specific bars."
    },
    {
      label: "Add name-labels and value-labels for each row."
    }
  ]
};
function Legend($$payload) {
  $$payload.out += `<svg width="400" height="100"><defs><pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4"><path d="M-1,1 l2,-2
               M0,4 l4,-4
               M3,5 l2,-2" style="stroke:black; stroke-width:1"></path></pattern></defs><g transform="scale(2.5)" opacity="0.25"><rect width="160" height="40" fill="url(#diagonalHatch)"></rect></g><text text-anchor="middle" x="200" y="60" stroke="white" stroke-width="5px" font-size="24px">Legend placeholder</text><text text-anchor="middle" x="200" y="60" font-size="24px" stroke-width="3px">Legend placeholder</text></svg>`;
}
function Source($$payload) {
  $$payload.out += `<p class="my-2">Data source: Department for Environment, Food and Rural Affairs</p>`;
}
function TitleAndSubtitle($$payload) {
  $$payload.out += `<h4>Chart title</h4> <p class="my-2">Chart subtitle</p>`;
}
function RowChart($$payload, $$props) {
  push();
  let { dataArray } = $$props;
  let svgWidth = void 0, svgHeight = 500;
  let requiredSpaceForLabelsArray = new Array(dataArray.length);
  let filteredRequiredSpaceForLabelsArray = requiredSpaceForLabelsArray.filter((el) => el !== void 0);
  let requiredSpaceForLabels = filteredRequiredSpaceForLabelsArray.length > 0 ? Math.max(...filteredRequiredSpaceForLabelsArray) : 100;
  let totalMargin = {
    top: 40,
    right: 50,
    bottom: 20,
    left: requiredSpaceForLabels + 15
  };
  let chartWidth = svgWidth - totalMargin.left - totalMargin.right;
  let chartHeight = svgHeight - totalMargin.top - totalMargin.bottom;
  let allXValues = dataArray.map((el) => el.y);
  scaleLinear().domain([
    Math.min(...allXValues),
    Math.max(...allXValues)
  ]).range([0, chartWidth]);
  (chartHeight - 20) / dataArray.length;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="mt-10">`;
    TitleAndSubtitle($$payload2);
    $$payload2.out += `<!----> `;
    Legend($$payload2);
    $$payload2.out += `<!----> <div><svg${attr("width", 400)}${attr("height", svgHeight)} style="background-color: #f5f5f5">`;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></svg> `;
    Source($$payload2);
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = false, folders } = $$props;
  let pageInfo = store_get($$store_subs ??= {}, "$page", page)?.route.id.split("/");
  details.name = textStringConversion(folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1], "title-first-word");
  let selectedYear = data?.years[0];
  let numberOfBars = 10;
  let dataArray = data?.dataInFormatForBarChart.find((el) => el.x === selectedYear)?.bars.map((el, index) => ({
    ...el,
    label: data.areaCodeLookup[el.areaCode],
    color: data.areaCodeLookup[el.areaCode] === "North West Leicestershire" ? "blue" : null,
    y: (index % 2 === 0 ? 1 : -1) * el.y
  })).sort((a, b) => b.label.length - a.label.length).slice(0, numberOfBars);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    PlaygroundDetails($$payload2, { homepage, details });
    $$payload2.out += `<!----> `;
    if (!homepage) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(data.years);
      $$payload2.out += `<div class="chart-container svelte-ip8jd6"><div class="mt-20"><div class="top-level-container border-solid rounded-lg border-2 border-current p-2"><div class="radio-container"><p class="my-2 mx-0 p-0 text-sm">Selected year:</p> <div class="flex flex-row flex-wrap gap-2"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let option = each_array[i];
        Radio($$payload2, {
          value: option,
          get group() {
            return selectedYear;
          },
          set group($$value) {
            selectedYear = $$value;
            $$settled = false;
          },
          children: ($$payload3) => {
            $$payload3.out += `<span class="text-base font-normal">${escape_html(option)}</span>`;
          },
          $$slots: { default: true }
        });
      }
      $$payload2.out += `<!--]--></div></div> <div class="mt-5"><p class="my-2 mx-0 p-0 text-sm">Number of bars:</p> `;
      Input($$payload2, {
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, { props }) => {
            $$payload3.out += `<input${spread_attributes(
              {
                type: "number",
                ...props,
                step: 1,
                min: 2,
                max: 100,
                value: numberOfBars
              },
              { "svelte-ip8jd6": true }
            )}>`;
          }
        }
      });
      $$payload2.out += `<!----></div> <div class="row-chart-container">`;
      RowChart($$payload2, { dataArray });
      $$payload2.out += `<!----></div></div></div></div>`;
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
