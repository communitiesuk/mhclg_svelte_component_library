import { W as escape_html, Z as attr, T as pop, Q as push, a0 as ensure_array_like, a9 as bind_props, a1 as store_get, X as copy_payload, Y as assign_payload, a2 as unsubscribe_stores } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as PlaygroundDetails } from "../../../../chunks/PlaygroundDetails.js";
import { t as textStringConversion } from "../../../../chunks/textStringConversion.js";
import { scaleLinear } from "d3-scale";
import { line, curveLinear } from "d3-shape";
let details = {
  /**
   * &&     description - An array of paragraphs of text explaining what the page does, used within PlaygroundDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  description: [
    {
      content: "This page was created as a sandbox environment for developers starting to gain experience building component."
    },
    {
      content: "Since this was one of the first test projects we worked on, before we were building rigorously tested components, some of the code may not follow best practice guidelines."
    }
  ],
  steps: [
    { label: "Manipulate data", complete: true },
    { label: "Create radio button components", complete: true },
    {
      label: "Add on-click functionalilty to radio buttons, that reactively filters for the data we want to visualise",
      complete: true
    },
    {
      label: "Create scale and line functions for our line chart",
      complete: false
    },
    {
      label: "Plot lines, with labels and basic hover functionality",
      complete: false
    },
    {
      label: "Create x and y axes",
      complete: false
    }
  ]
};
function LineChart($$payload, $$props) {
  push();
  let { data } = $$props;
  let svgWidth = void 0, svgHeight = 600;
  let totalMargin = { top: 20, right: 50, bottom: 40, left: 50 };
  let chartWidth = svgWidth - totalMargin.left - totalMargin.right;
  let chartHeight = svgHeight - totalMargin.top - totalMargin.bottom;
  let flatData = data.lines.map((el) => el.data).flat();
  let allYears = flatData.map((el) => el.x);
  let yearsMinMax = [
    Math.min(...allYears),
    Math.max(...allYears)
  ];
  let xFunction = scaleLinear().domain(yearsMinMax).range([0, chartWidth]);
  let allValues = flatData.map((el) => el.y);
  let valuesMinMax = [
    Math.min(...allValues),
    Math.max(...allValues)
  ];
  let yFunction = scaleLinear().domain(valuesMinMax).range([chartHeight, 0]);
  line().x((d) => xFunction(d.x)).y((d) => yFunction(d.y)).curve(curveLinear);
  $$payload.out += `<h3>Example Usage</h3> <pre><code>${escape_html(`
<script>
  import LineChart from './LineChart.svelte';
  
  const data = {
    lines: [
      {
        areaCode: "E07000223",
        data: [
          { x: 2019, y: 45 },
          { x: 2020, y: 72 },
          { x: 2021, y: 89 }
        ]
      }
    ]
  };
<\/script>

<LineChart {data} />
`)}</code></pre> <div><svg${attr("width", 400)}${attr("height", svgHeight)} style="background-color: #f5f5f5">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></svg></div>`;
  pop();
}
function Radio($$payload, $$props) {
  push();
  let { options, value = void 0 } = $$props;
  const each_array = ensure_array_like(options);
  $$payload.out += `<label>Choose a metric:</label> <div class="flex flex-col gap-2 mt-2"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let option = each_array[i];
    $$payload.out += `<div><input${attr("checked", value === option, true)} type="radio"${attr("id", option.toLowerCase().replaceAll(" ", "_"))} name="metric-selection"${attr("value", option)}> <label${attr("for", option.toLowerCase().replaceAll(" ", "_"))}>${escape_html(option)}</label></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = false, folders } = $$props;
  let pageInfo = store_get($$store_subs ??= {}, "$page", page)?.route.id.split("/");
  details.name = textStringConversion(folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1], "title-first-word");
  let selectedMetric = data?.metrics[0];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    PlaygroundDetails($$payload2, { homepage, details });
    $$payload2.out += `<!----> `;
    if (!homepage) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="chart-container svelte-ip8jd6"><div class="mt-20"><div class="top-level-container border-solid rounded-lg border-2 border-current p-2"><div class="radio-container">`;
      Radio($$payload2, {
        options: data.metrics,
        get value() {
          return selectedMetric;
        },
        set value($$value) {
          selectedMetric = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div class="svg-container mt-6">`;
      if (selectedMetric) {
        $$payload2.out += "<!--[-->";
        LineChart($$payload2, {
          data: data.dataInFormatForLineChart.find((el) => el.metric === selectedMetric)
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div></div></div>`;
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
