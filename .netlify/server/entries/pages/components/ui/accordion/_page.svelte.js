import { a0 as ensure_array_like, Z as attr, W as escape_html, _ as stringify, T as pop, Q as push, a1 as store_get, X as copy_payload, Y as assign_payload, a2 as unsubscribe_stores, $ as spread_props } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { L as Line } from "../../../../../chunks/Line.js";
import { D as DividerLine } from "../../../../../chunks/DividerLine.js";
import { a as addIndexAndInitalValue, g as getValueFromParametersArray, t as trackVisibleParameters, c as createParametersObject, C as ComponentDetails, P as ParametersSection, S as ScreenSizeRadio, d as defaultScreenWidthBreakpoints } from "../../../../../chunks/trackVisibleParameters.js";
import { t as textStringConversion } from "../../../../../chunks/textStringConversion.js";
import { C as CodeBlock } from "../../../../../chunks/CodeBlock.js";
const SvelteSet = globalThis.Set;
function Accordion($$payload, $$props) {
  push();
  let {
    sections = [],
    hideAllSections = "Hide all sections",
    hideSection = "Hide",
    hideSectionAriaLabel = "Hide this section",
    showAllSections = "Show all sections",
    showSection = "Show",
    showSectionAriaLabel = "Show this section",
    allSectionToggle = true,
    minSectionsAllSectionToggle = 2,
    rememberIsExpandedState = true,
    headingLevel = "h4"
  } = $$props;
  let uniqueSections = sections.map((section) => {
    return {
      ...section,
      uniqueid: section.id + section.heading.slice(1, 3) + (section?.summary?.slice(0, 2) ?? "")
    };
  });
  let expandedSections = new SvelteSet(uniqueSections.filter((section) => section.expanded).map((section) => section.uniqueid));
  let allExpanded = expandedSections.size === sections.length;
  let ariaLiveValue = "polite";
  function headerContent($$payload2, section, isExpanded) {
    $$payload2.out += `<button type="button"${attr("aria-controls", `${stringify(section.uniqueid)}-content`)}${attr("id", `${stringify(section.uniqueid)}-button`)} class="govuk-accordion__section-button"${attr("aria-expanded", isExpanded)}${attr("aria-label", `${stringify(section.heading)}, ${stringify(section.summary ? section.summary + "," : "")} ${stringify(isExpanded ? hideSectionAriaLabel : showSectionAriaLabel)}`)}><span class="govuk-accordion__section-heading-text"><span class="govuk-accordion__section-heading-text-focus">${escape_html(section.heading)}</span></span> `;
    if (section.summary) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="govuk-visually-hidden govuk-accordion__section-heading-divider">,</span> <span class="govuk-accordion__section-summary govuk-body"><span class="govuk-accordion__section-summary-focus">${escape_html(section.summary)}</span></span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <span class="govuk-accordion__section-toggle" data-nosnippet=""><span class="govuk-accordion__section-toggle-focus"><span${attr("class", `govuk-accordion-nav__chevron ${stringify([
      !isExpanded ? "govuk-accordion-nav__chevron--down" : ""
    ].filter(Boolean).join(" "))}`)}></span> <span class="govuk-accordion__section-toggle-text">${escape_html(isExpanded ? hideSection : showSection)}</span></span></span></button>`;
  }
  const each_array = ensure_array_like(uniqueSections);
  $$payload.out += `<div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default"><div class="govuk-accordion__controls"${attr("hidden", !allSectionToggle || uniqueSections.length < minSectionsAllSectionToggle, true)}><button type="button" class="govuk-accordion__show-all"${attr("aria-expanded", allExpanded)}><span class="govuk-accordion__show-all-text">${escape_html(allExpanded ? hideAllSections : showAllSections)}</span> <span${attr("class", `govuk-accordion-nav__chevron ${stringify([
    !allExpanded ? "govuk-accordion-nav__chevron--down" : ""
  ].filter(Boolean).join(" "))}`)}></span></button></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let section = each_array[$$index];
    const isExpanded = expandedSections.has(section.uniqueid);
    $$payload.out += `<div${attr("class", `govuk-accordion__section ${stringify([
      isExpanded ? "govuk-accordion__section--expanded" : ""
    ].filter(Boolean).join(" "))}`)}><div class="govuk-accordion__section-header">`;
    if (headingLevel.toLowerCase() == "h2") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<h2 class="govuk-accordion__section-heading">`;
      headerContent($$payload, section, isExpanded);
      $$payload.out += `<!----></h2>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (headingLevel.toLowerCase() == "h3") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<h3 class="govuk-accordion__section-heading">`;
        headerContent($$payload, section, isExpanded);
        $$payload.out += `<!----></h3>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (headingLevel.toLowerCase() == "h4") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<h4 class="govuk-accordion__section-heading">`;
          headerContent($$payload, section, isExpanded);
          $$payload.out += `<!----></h4>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (headingLevel.toLowerCase() == "h5") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<h5 class="govuk-accordion__section-heading">`;
            headerContent($$payload, section, isExpanded);
            $$payload.out += `<!----></h5>`;
          } else {
            $$payload.out += "<!--[!-->";
            if (headingLevel.toLowerCase() == "h6") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<h6 class="govuk-accordion__section-heading">`;
              headerContent($$payload, section, isExpanded);
              $$payload.out += `<!----></h6>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> <div${attr("id", `${stringify(section.uniqueid)}-content`)} class="govuk-accordion__section-content"${attr("aria-live", ariaLiveValue)}${attr("hidden", !isExpanded, true)}${attr("role", uniqueSections.length < 6 ? "region" : "")}${attr("aria-labelledby", uniqueSections.length < 6 ? section.uniqueid + "-button" : "")}>`;
    if (typeof section.content === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="govuk-body">${escape_html(section.content)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      section.content($$payload);
      $$payload.out += `<!---->`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function content1($$payload) {
  $$payload.out += `<p>This is a more complex content for section 1, including <strong>HTML elements</strong>.</p>`;
}
function content2($$payload) {
  $$payload.out += `<p>For section 2, you can have <em>even more markup</em> such as lists and headings:</p> <ul><li>List item 1</li> <li>List item 2</li></ul>`;
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = void 0, folders } = $$props;
  let snippetSections = [
    {
      id: "1",
      heading: "Section 1",
      content: content1
    },
    {
      id: "2",
      heading: "Section 2",
      content: content2
    },
    {
      id: "3",
      heading: "Section 3",
      content: content3
    }
  ];
  let details = {
    status: "in_progress",
    description: [
      {
        content: "An expandable and collapsible section component that allows users to show and hide content."
      },
      {
        content: 'Based on the <a href="https://design-system.service.gov.uk/components/accordion/" target="_blank" rel="noopener noreferrer">GOV.UK Design System accordion component</a> pattern.',
        markdown: true
      }
    ],
    context: [
      {
        content: "Use the accordion component to let users show and hide sections of related content on a page."
      },
      {
        content: "Only use an accordion if there is evidence it is helpful for users."
      }
    ],
    childComponents: void 0,
    requirements: void 0
  };
  let pageInfo = store_get($$store_subs ??= {}, "$page", page)?.route.id.split("/");
  details.name = textStringConversion(folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1], "title-first-word");
  details.folder = folders ? folders[folders.length - 2] : pageInfo[pageInfo.length - 2];
  let demoScreenWidth = defaultScreenWidthBreakpoints.md;
  let parametersSourceArray = homepage ?? addIndexAndInitalValue([
    {
      name: "sections",
      category: "Content",
      isProp: true,
      inputType: "textArea",
      value: JSON.stringify(
        [
          {
            id: "1",
            heading: "Writing well for the web",
            summary: "Learn about writing content for your website",
            content: "This is the content for Writing well for the web.",
            expanded: true
          },
          {
            id: "2",
            heading: "Writing well for specialists",
            summary: "Guidance for writing technical content",
            content: "This is the content for Writing well for specialists.",
            expanded: false
          },
          {
            id: "3",
            heading: "Know your audience",
            summary: "Understanding who your users are",
            content: "This is the content for Know your audience."
          }
        ],
        null,
        2
      )
    },
    {
      name: "headingLevel",
      category: "Content",
      isProp: true,
      inputType: "input",
      value: "h4"
    },
    {
      name: "hideAllSections",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Hide all sections"
    },
    {
      name: "hideSection",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Hide"
    },
    {
      name: "hideSectionAriaLabel",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Hide this section"
    },
    {
      name: "showAllSections",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Show all sections"
    },
    {
      name: "showSection",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Show"
    },
    {
      name: "showSectionAriaLabel",
      category: "UI Toggle Labels",
      isProp: true,
      inputType: "input",
      value: "Show this section"
    },
    {
      name: "allSectionToggle",
      category: "Accordion Toggle Options",
      isProp: true,
      inputType: "checkbox",
      value: "true"
    },
    {
      name: "minSectionsAllSectionToggle",
      category: "Accordion Toggle Options",
      isProp: true,
      inputType: "input",
      value: "2"
    },
    {
      name: "rememberIsExpandedState",
      category: "Accordion Toggle Options",
      isProp: true,
      inputType: "checkbox",
      value: "true"
    }
  ]);
  let parametersValuesArray = homepage ?? parametersSourceArray.map((el) => el.value);
  let sections = homepage ?? JSON.parse(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "sections"));
  let derivedParametersObject = homepage ?? { sections };
  let parametersVisibleArray = homepage ?? trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  let parametersObject = homepage ?? createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
  const sampleLineData = [
    { x: 0, y: 0 },
    { x: 10, y: 30 },
    { x: 20, y: 10 },
    { x: 30, y: 50 }
  ];
  function simpleLineFunction(dArray) {
    let path = "M " + dArray[0].x * 10 + " " + (200 - dArray[0].y * 4);
    for (let i = 1; i < dArray.length; i++) {
      path += " L " + dArray[i].x * 10 + " " + (200 - dArray[i].y * 4);
    }
    return path;
  }
  function content3($$payload2) {
    $$payload2.out += `<p>Section 3 snippet: advanced <strong>HTML</strong> or media elements could go
    here.</p> <svg viewBox="0 0 300 200" width="300" height="200">`;
    Line($$payload2, {
      dataArray: sampleLineData,
      xFunction: (val) => val * 10,
      yFunction: (val) => 200 - val * 4,
      lineFunction: simpleLineFunction,
      pathStrokeColor: "blue",
      pathStrokeWidth: 2,
      includeMarkers: true,
      markerRadius: 4
    });
    $$payload2.out += `<!----></svg>`;
  }
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
      $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-3ptdb9"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
      ScreenSizeRadio($$payload2, {
        get demoScreenWidth() {
          return demoScreenWidth;
        },
        set demoScreenWidth($$value) {
          demoScreenWidth = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-3ptdb9"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-3ptdb9"><div class="flex flex-col gap-4"><div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--xl p-6">`;
      Accordion($$payload2, spread_props([parametersObject]));
      $$payload2.out += `<!----></div></div></div></div></div> <div class="mt-20 svelte-3ptdb9" data-role="examples-section">`;
      DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
      $$payload2.out += `<!----> <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5> <h6>Accordion with snippet-based content</h6> `;
      CodeBlock($$payload2, {
        code: `
<script>
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import Line from '$lib/components/data-vis/line-chart/Line.svelte';

  const sampleLineData = [
    { x: 0, y: 0 },
    { x: 10, y: 30 },
    { x: 20, y: 10 },
    { x: 30, y: 50 },
  ];

  function simpleLineFunction(dArray) {
    let path = 'M ' + (dArray[0].x * 10) + ' ' + (200 - dArray[0].y * 4);
    for (let i = 1; i < dArray.length; i++) {
      path += ' L ' + (dArray[i].x * 10) + ' ' + (200 - dArray[i].y * 4);
    }
    return path;
  }

  let snippetSections = [
    {
      id: '1',
      heading: 'Section 1',
      content: content1,
    },
    {
      id: '2',
      heading: 'Section 2',
      content: content2,
    },
    {
      id: '3',
      heading: 'Section 3',
      content: content3,
    },
  ];
<\/script>

  {#snippet content1()}
  <p>This is a more complex content for section 1, including <strong>HTML elements</strong>.</p>
  {/snippet}

  {#snippet content2()}
  <p>
    For section 2, you can have <em>even more markup</em> such as lists and headings:
  </p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
  {/snippet}

  {#snippet content3()}
  <p>
    Section 3 snippet: advanced <strong>HTML</strong> or media elements could go here.
  </p>
  <svg viewBox="0 0 300 200" width="300" height="200">
    <Line
      dataArray={sampleLineData}
      xFunction={(val) => val * 10}
      yFunction={(val) => 200 - val * 4}
      lineFunction={simpleLineFunction}
      pathStrokeColor="blue"
      pathStrokeWidth={2}
      includeMarkers={true}
      markerRadius={4}
    />
  </svg>
  {/snippet}

<Accordion sections={snippetSections} />
`
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--xl p-6">`;
      Accordion($$payload2, { sections: snippetSections });
      $$payload2.out += `<!----></div></div> <h6>Accordion with minimum sections for toggle</h6> `;
      CodeBlock($$payload2, {
        code: `
<Accordion
  sections={[{
    id: 'example1',
    heading: 'Title One',
    content: 'Some content for the first section.',
  }]}
  allSectionToggle={true}
  minSectionsAllSectionToggle={2}
/>
`
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Accordion($$payload2, {
        sections: [
          {
            id: "example1",
            heading: "Title One",
            content: "Some content for the first section."
          }
        ],
        allSectionToggle: true,
        minSectionsAllSectionToggle: 2
      });
      $$payload2.out += `<!----></div></div> <h6>Accordion respecting expanded session state</h6> `;
      CodeBlock($$payload2, {
        code: `
<Accordion
  sections={[{
    id: 'example2',
    heading: 'Remember state 1',
    content: 'This section's expansion will be saved in sessionStorage.',
    expanded: true,
  }, {
    id: 'example3',
    heading: 'Remember state 2',
    content: 'Session state is also saved here.',
  }]}
  rememberIsExpandedState={true}
/>
`
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--l p-6">`;
      Accordion($$payload2, {
        sections: [
          {
            id: "example2",
            heading: "Remember state 1",
            content: "This section's expansion will be saved in sessionStorage.",
            expanded: true
          },
          {
            id: "example3",
            heading: "Remember state 2",
            content: "Session state is also saved here."
          }
        ],
        rememberIsExpandedState: true
      });
      $$payload2.out += `<!----></div></div> <h6>Accordion with custom toggle labels</h6> `;
      CodeBlock($$payload2, {
        code: `
<Accordion
  sections={[{
    id: 'example4',
    heading: 'Custom Toggle Section',
    summary: 'Showing override for labels',
    content: 'This accordion uses custom hide/show labels.',
  }]}
  minSectionsAllSectionToggle={0}
  hideAllSections="Collapse All"
  hideSection="Collapse"
  showAllSections="Expand All"
  showSection="Expand"
/>`
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Accordion($$payload2, {
        sections: [
          {
            id: "example4",
            heading: "Custom Toggle Section",
            summary: "Showing override for labels",
            content: "This accordion uses custom hide/show labels."
          }
        ],
        minSectionsAllSectionToggle: 0,
        hideAllSections: "Collapse All",
        hideSection: "Collapse",
        showAllSections: "Expand All",
        showSection: "Expand"
      });
      $$payload2.out += `<!----></div></div></div>`;
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
