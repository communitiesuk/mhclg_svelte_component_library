import { a0 as ensure_array_like, Z as attr, _ as stringify, W as escape_html, T as pop, Q as push, a1 as store_get, X as copy_payload, Y as assign_payload, a2 as unsubscribe_stores, $ as spread_props } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { D as DividerLine } from "../../../../../chunks/DividerLine.js";
import { h as html, t as textStringConversion } from "../../../../../chunks/textStringConversion.js";
import { a as addIndexAndInitalValue, g as getValueFromParametersArray, t as trackVisibleParameters, c as createParametersObject, C as ComponentDetails, P as ParametersSection, S as ScreenSizeRadio, d as defaultScreenWidthBreakpoints } from "../../../../../chunks/trackVisibleParameters.js";
import { C as CodeBlock } from "../../../../../chunks/CodeBlock.js";
function CheckBox($$payload, $$props) {
  push();
  const {
    legend,
    hint,
    error,
    name,
    isPageHeading = false,
    legendSize = "l",
    small = false,
    options = [],
    validate = void 0
  } = $$props;
  let selectedValues = [];
  let isChecked = (value) => selectedValues.includes(value);
  let validationError = void 0;
  const each_array = ensure_array_like(options);
  $$payload.out += `<div${attr("class", `govuk-form-group${stringify(error ? " govuk-form-group--error" : "")}`)} role="group"${attr("aria-labelledby", `${stringify(name)}-legend`)}><fieldset class="govuk-fieldset"${attr("aria-describedby", [
    hint ? `${name}-hint` : null,
    error || validationError ? `${name}-error` : null
  ].filter(Boolean).join(" "))}><legend${attr("id", `${stringify(name)}-legend`)}${attr("class", `govuk-fieldset__legend govuk-fieldset__legend--${stringify(legendSize)}`)}>`;
  if (isPageHeading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1 class="govuk-fieldset__heading">${escape_html(legend)}</h1>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(legend)}`;
  }
  $$payload.out += `<!--]--></legend> `;
  if (hint) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("id", `${stringify(name)}-hint`)} class="govuk-hint" role="note">${escape_html(hint)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p${attr("id", `${stringify(name)}-error`)} class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ${escape_html(error)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${attr("class", `govuk-checkboxes${stringify(small ? " govuk-checkboxes--small" : "")}`)} data-module="govuk-checkboxes" role="group"${attr("aria-labelledby", `${stringify(name)}-legend`)}><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let option = each_array[i];
    if (option.exclusive && i > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="govuk-checkboxes__divider" role="separator" aria-orientation="horizontal">or</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="govuk-checkboxes__item" role="checkbox"${attr("aria-checked", null)}><input type="checkbox"${attr("name", name)}${attr("id", `${stringify(name)}-${stringify(i)}`)} class="govuk-checkboxes__input"${attr("value", option.value)}${attr("data-aria-controls", option.conditional?.id)}${attr("aria-expanded", null)}${attr("aria-describedby", [
      option.hint ? `${name}-${i}-hint` : null,
      option.conditional ? option.conditional.id : null
    ].filter(Boolean).join(" "))}${attr("checked", isChecked(option.value), true)}${attr("data-behaviour", option.exclusive ? "exclusive" : void 0)}> <label class="govuk-label govuk-checkboxes__label"${attr("for", `${stringify(name)}-${stringify(i)}`)}${attr("id", `${stringify(name)}-$${stringify(i)}-label`)}>${escape_html(option.label)}</label> `;
    if (option.hint) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("id", `${stringify(name)}-${stringify(i)}-hint`)} class="govuk-hint govuk-checkboxes__hint" role="note">${escape_html(option.hint)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (option.conditional) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("id", option.conditional.id)}${attr("class", `govuk-checkboxes__conditional${stringify(" govuk-checkboxes__conditional--hidden")}`)} role="region"${attr("aria-labelledby", `${stringify(name)}-$${stringify(i)}-label`)}>`;
      if (typeof option.conditional.content === "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `${html(option.conditional.content)}`;
      } else {
        $$payload.out += "<!--[!-->";
        if (option.conditional.content) {
          $$payload.out += "<!--[-->";
          option.conditional.content($$payload);
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<!---->`;
          option.conditional.content($$payload, {});
          $$payload.out += `<!---->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></fieldset></div>`;
  pop();
}
function content1($$payload) {
  $$payload.out += `<div class="govuk-form-group"><label class="govuk-label" for="email-input">Email Address</label> <div class="govuk-hint">We'll use this for important notifications</div> <input class="govuk-input" id="email-input" name="email-input" type="email"></div>`;
}
function content2($$payload) {
  $$payload.out += `<div class="govuk-form-group"><label class="govuk-label" for="phone-input">Phone Number</label> <div class="govuk-hint">Include country code if international</div> <input class="govuk-input" id="phone-input" name="phone-input" type="tel"></div>`;
}
function content3($$payload) {
  $$payload.out += `<div class="govuk-form-group">`;
  CheckBox($$payload, {
    legend: "When should we contact you?",
    name: "contact-timing",
    small: true,
    legendSize: "s",
    validate: (values) => values.length === 0 ? "Please select at least one time slot" : void 0,
    options: [
      {
        value: "morning",
        label: "Morning (9am - 12pm)"
      },
      {
        value: "afternoon",
        label: "Afternoon (12pm - 5pm)"
      },
      {
        value: "evening",
        label: "Evening (5pm - 8pm)"
      }
    ]
  });
  $$payload.out += `<!----></div>`;
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, homepage = void 0, folders } = $$props;
  let details = {
    status: "in_progress",
    description: [
      {
        content: "A checkbox component that allows users to select one or more options from a list."
      },
      {
        content: 'Based on the <a href="https://design-system.service.gov.uk/components/checkboxes/" target="_blank" rel="noopener noreferrer">GOV.UK Design System checkbox component</a> pattern.',
        markdown: true
      }
    ],
    context: [
      {
        content: "Use the checkbox component when you need to let users select one or more options from a list."
      },
      {
        content: "You can also use checkboxes to toggle a single option on or off."
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
      name: "legend",
      category: "Content",
      isProp: true,
      inputType: "input",
      value: "How would you like to be contacted?"
    },
    {
      name: "hint",
      category: "Content",
      isProp: true,
      inputType: "input",
      value: "Select all that apply"
    },
    {
      name: "name",
      category: "Form",
      isProp: true,
      inputType: "input",
      value: "contact-preferences"
    },
    {
      name: "options",
      category: "Content",
      isProp: true,
      inputType: "javascript",
      value: JSON.stringify(
        [
          {
            value: "email",
            label: "Email",
            hint: "We'll send updates to your inbox"
          },
          {
            value: "sms",
            label: "Text message",
            hint: "UK mobile numbers only"
          },
          {
            value: "phone",
            label: "Phone call",
            hint: "We'll call during business hours"
          },
          {
            value: "none",
            label: "Do not contact me",
            exclusive: true
          }
        ],
        null,
        2
      )
    },
    {
      name: "error",
      category: "Validation",
      isProp: true,
      inputType: "input",
      value: ""
    },
    {
      name: "isPageHeading",
      category: "UI Options",
      isProp: true,
      inputType: "checkbox",
      value: "false"
    },
    {
      name: "small",
      category: "UI Options",
      isProp: true,
      inputType: "checkbox",
      value: "false"
    },
    {
      name: "legendSize",
      category: "UI Options",
      isProp: true,
      inputType: "dropdown",
      options: ["l", "m", "s"],
      value: "l"
    },
    {
      name: "validate",
      category: "Validation",
      isProp: true,
      inputType: "function",
      value: `function validateContactPreferences(values) {
  if (values.length === 0) {
    return "Please select at least one contact method";
  }
  if (values.includes("none") && values.length > 1) {
    return "You cannot select other options when opting out of all communications";
  }
  if (values.includes("email") && !values.includes("sms") && !values.includes("none")) {
    return "Please select SMS as a backup digital contact method when using email";
  }
  return undefined;
}`
    }
  ]);
  let parametersValuesArray = homepage ?? parametersSourceArray.map((el) => el.value);
  let options = homepage ?? JSON.parse(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "options"));
  let derivedParametersObject = homepage ?? { options };
  let parametersVisibleArray = homepage ?? trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  let parametersObject = homepage ?? createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
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
      $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-ncz2sx"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
      ScreenSizeRadio($$payload2, {
        get demoScreenWidth() {
          return demoScreenWidth;
        },
        set demoScreenWidth($$value) {
          demoScreenWidth = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-ncz2sx"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-ncz2sx"><div class="flex flex-col gap-4"><div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--l p-6">`;
      CheckBox($$payload2, spread_props([parametersObject]));
      $$payload2.out += `<!----></div></div></div></div></div> <div class="mt-20 svelte-ncz2sx" data-role="examples-section">`;
      DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
      $$payload2.out += `<!----> <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5> <h3 class="govuk-heading-m">Basic Usage</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
<\/script>

<CheckBox
  legend="Select your options"
  name="basic-options"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Select your options",
        name: "basic-options",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">With Hint</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "news", label: "Newsletter", hint: "Receive monthly updates" },
    { value: "updates", label: "Product Updates", hint: "Stay informed about new features" }
  ];
<\/script>

<CheckBox
  legend="Choose your subscriptions"
  hint="Select all that apply"
  name="subscriptions"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Choose your subscriptions",
        hint: "Select all that apply",
        name: "subscriptions",
        options: [
          {
            value: "news",
            label: "Newsletter",
            hint: "Receive monthly updates"
          },
          {
            value: "updates",
            label: "Product Updates",
            hint: "Stay informed about new features"
          }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">With Validation</h3> `;
      CodeBlock($$payload2, {
        code: `<script lang="ts">
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validateSelection(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one option.";
    }
    return undefined;
  }

  const options = [
    { value: "agree", label: "I agree to the terms and conditions" }
  ];
<\/script>

<CheckBox
  legend="Terms and Conditions"
  name="terms"
  options={options}
  validate={validateSelection}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Terms and Conditions",
        name: "terms",
        options: [
          {
            value: "agree",
            label: "I agree to the terms and conditions"
          }
        ],
        validate: (values) => {
          if (values.length === 0) {
            return "Please select at least one option.";
          }
          return void 0;
        }
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Exclusive Option</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "email", label: "Email Notifications" },
    { value: "sms", label: "SMS Notifications" },
    { value: "none", label: "Do not receive any notifications", exclusive: true }
  ];
<\/script>

<CheckBox
  legend="Notification Preferences"
  name="notifications"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Notification Preferences",
        name: "notifications",
        options: [
          { value: "email", label: "Email Notifications" },
          { value: "sms", label: "SMS Notifications" },
          {
            value: "none",
            label: "Do not receive any notifications",
            exclusive: true
          }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">With Conditional Content</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validatePreferences(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one contact method.";
    }
    return undefined;
  }

  const options = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="email">Email Address</label>
            <input class="govuk-input" id="email" name="email" type="email">
          </div>
        \`
      }
    },
    { value: "sms", label: "SMS" }
  ];
<\/script>

<CheckBox
  legend="Contact Methods"
  name="contact-methods"
  options={options}
  validate={validatePreferences}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Contact Methods",
        name: "contact-methods",
        options: [
          {
            value: "email",
            label: "Email",
            conditional: {
              id: "email-settings",
              content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email Address</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `
            }
          },
          { value: "sms", label: "SMS" }
        ],
        validate: (values) => {
          if (values.length === 0) {
            return "Please select at least one contact method.";
          }
          return void 0;
        }
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Small Variation</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ];
<\/script>

<CheckBox
  legend="Select items"
  name="select-items"
  options={options}
  small={true}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Select items",
        name: "select-items",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" }
        ],
        small: true
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">As Page Heading</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "optionA", label: "Option A" },
    { value: "optionB", label: "Option B" }
  ];
<\/script>

<CheckBox
  legend="Main Preferences"
  name="main-preferences"
  options={options}
  isPageHeading={true}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Main Preferences",
        name: "main-preferences",
        options: [
          { value: "optionA", label: "Option A" },
          { value: "optionB", label: "Option B" }
        ],
        isPageHeading: true
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Legend Size</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];
<\/script>

<CheckBox
  legend="Priority Levels"
  name="priority-levels"
  options={options}
  legendSize="s"
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Priority Levels",
        name: "priority-levels",
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" }
        ],
        legendSize: "s"
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Multiple Conditional Contents</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validateOptions(values: string[]): string | undefined {
    if (values.length < 2) {
      return "Please select at least two options.";
    }
    return undefined;
  }

  const options = [
    {
      value: "option1",
      label: "Option 1",
      conditional: {
        id: "option1-details",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="option1-detail">Details for Option 1</label>
            <input class="govuk-input" id="option1-detail" name="option1-detail" type="text">
          </div>
        \`
      }
    },
    {
      value: "option2",
      label: "Option 2",
      conditional: {
        id: "option2-details",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="option2-detail">Details for Option 2</label>
            <input class="govuk-input" id="option2-detail" name="option2-detail" type="text">
          </div>
        \`
      }
    }
  ];
<\/script>

<CheckBox
  legend="Multiple Options"
  name="multiple-options"
  options={options}
  validate={validateOptions}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Multiple Options",
        name: "multiple-options",
        options: [
          {
            value: "option1",
            label: "Option 1",
            conditional: {
              id: "option1-details",
              content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="option1-detail">Details for Option 1</label>
                    <input class="govuk-input" id="option1-detail" name="option1-detail" type="text">
                  </div>
                `
            }
          },
          {
            value: "option2",
            label: "Option 2",
            conditional: {
              id: "option2-details",
              content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="option2-detail">Details for Option 2</label>
                    <input class="govuk-input" id="option2-detail" name="option2-detail" type="text">
                  </div>
                `
            }
          }
        ],
        validate: (values) => {
          if (values.length < 2) {
            return "Please select at least two options.";
          }
          return void 0;
        }
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Dynamic Options</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";
  import { onMount } from "svelte";

  let options = [];

  onMount(() => {
    // Fetch options from an API or other source
    options = [
      { value: "dynamic1", label: "Dynamic Option 1" },
      { value: "dynamic2", label: "Dynamic Option 2" },
      { value: "dynamic3", label: "Dynamic Option 3" }
    ];
  });
<\/script>

<CheckBox
  legend="Dynamic Options"
  name="dynamic-options"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Dynamic Options",
        name: "dynamic-options",
        options: [
          { value: "dynamic1", label: "Dynamic Option 1" },
          { value: "dynamic2", label: "Dynamic Option 2" },
          { value: "dynamic3", label: "Dynamic Option 3" }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Using Snippets and Nested Components for Conditional Content</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  let snippetSections = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-details",
        content: content1
      }
    },
    {
      value: "phone",
      label: "Phone",
      conditional: {
        id: "phone-details",
        content: content2
      }
    },
    {
      value: "preferences",
      label: "Communication Preferences",
      conditional: {
        id: "preferences-details",
        content: content3
      }
    }
  ];
<\/script>

<CheckBox
  legend="Contact Methods"
  name="contact-methods-snippets"
  options={snippetSections}
/>

{#snippet content1()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="email-input">Email Address</label>
    <div class="govuk-hint">We'll use this for important notifications</div>
    <input class="govuk-input" id="email-input" name="email-input" type="email">
  </div>
{/snippet}

{#snippet content2()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="phone-input">Phone Number</label>
    <div class="govuk-hint">Include country code if international</div>
    <input class="govuk-input" id="phone-input" name="phone-input" type="tel">
  </div>
{/snippet}

{#snippet content3()}
  <div class="govuk-form-group">
    <CheckBox
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(values) => values.length === 0 ? "Please select at least one time slot" : undefined}
      options={[
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
        { value: "evening", label: "Evening (5pm - 8pm)" },
      ]}
    />
  </div>
{/snippet}`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      CheckBox($$payload2, {
        legend: "Contact Methods",
        name: "contact-methods-snippets",
        options: [
          {
            value: "email",
            label: "Email",
            conditional: { id: "email-details", content: content1 }
          },
          {
            value: "phone",
            label: "Phone",
            conditional: { id: "phone-details", content: content2 }
          },
          {
            value: "preferences",
            label: "Communication Preferences",
            conditional: { id: "preferences-details", content: content3 }
          }
        ]
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
