import { a0 as ensure_array_like, Z as attr, _ as stringify, W as escape_html, T as pop, Q as push, a1 as store_get, X as copy_payload, Y as assign_payload, a2 as unsubscribe_stores, $ as spread_props } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { D as DividerLine } from "../../../../../chunks/DividerLine.js";
import { h as html, t as textStringConversion } from "../../../../../chunks/textStringConversion.js";
import { a as addIndexAndInitalValue, g as getValueFromParametersArray, t as trackVisibleParameters, c as createParametersObject, C as ComponentDetails, P as ParametersSection, S as ScreenSizeRadio, d as defaultScreenWidthBreakpoints } from "../../../../../chunks/trackVisibleParameters.js";
import { C as CodeBlock } from "../../../../../chunks/CodeBlock.js";
function Radios($$payload, $$props) {
  push();
  const {
    legend,
    hint,
    error,
    name,
    isPageHeading = false,
    legendSize = "l",
    small = false,
    inline = false,
    options = [],
    validate = void 0
  } = $$props;
  let selectedValue = null;
  let isChecked = (value) => selectedValue === value;
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
  $$payload.out += `<!--]--> <div${attr("class", `govuk-radios${stringify(small ? " govuk-radios--small" : "")}${stringify(inline ? " govuk-radios--inline" : "")}`)} data-module="govuk-radios" role="radiogroup"${attr("aria-labelledby", `${stringify(name)}-legend`)}><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let option = each_array[i];
    if (option.exclusive && i > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="govuk-radios__divider" role="separator" aria-orientation="horizontal">or</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="govuk-radios__item" role="radio"${attr("aria-checked", null)}><input type="radio"${attr("name", name)}${attr("id", `${stringify(name)}-${stringify(i)}`)} class="govuk-radios__input"${attr("value", option.value)}${attr("data-aria-controls", option.conditional?.id)}${attr("aria-describedby", [
      option.hint ? `${name}-${i}-hint` : null,
      option.conditional ? option.conditional.id : null
    ].filter(Boolean).join(" "))}${attr("checked", isChecked(option.value), true)}${attr("data-behaviour", option.exclusive ? "exclusive" : void 0)}> <label class="govuk-label govuk-radios__label"${attr("for", `${stringify(name)}-${stringify(i)}`)}${attr("id", `${stringify(name)}-$${stringify(i)}-label`)}>${escape_html(option.label)}</label> `;
    if (option.hint) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("id", `${stringify(name)}-${stringify(i)}-hint`)} class="govuk-hint govuk-radios__hint" role="note">${escape_html(option.hint)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (option.conditional) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("id", option.conditional.id)}${attr("class", `govuk-radios__conditional${stringify(" govuk-radios__conditional--hidden")}`)} role="region"${attr("aria-labelledby", `${stringify(name)}-$${stringify(i)}-label`)}>`;
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
  Radios($$payload, {
    legend: "When should we contact you?",
    name: "contact-timing",
    small: true,
    legendSize: "s",
    validate: (value) => !value ? "Please select a time slot" : void 0,
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
        content: "A radios component that allows users to select exactly one option from a list."
      },
      {
        content: 'Based on the <a href="https://design-system.service.gov.uk/components/radios/" target="_blank" rel="noopener noreferrer">GOV.UK Design System radios component</a> pattern.',
        markdown: true
      }
    ],
    context: [
      {
        content: "Use the radios component when you need to let users select a single option from a list."
      },
      {
        content: "Radio buttons should only be used when the user must choose exactly one item."
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
      value: ""
    },
    {
      name: "name",
      category: "Form",
      isProp: true,
      inputType: "input",
      value: "contact-method"
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
            label: "Phone",
            hint: "We'll call during business hours"
          },
          { value: "none", label: "Do not contact me" }
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
      value: `function validateContactPreference(value) {
  if (!value) {
    return "Please select at least one option";
  }
  if (value === "none") {
    return "You have opted out of all communications";
  }
  return undefined;
}`
    },
    {
      name: "inline",
      category: "UI Options",
      isProp: true,
      inputType: "checkbox",
      value: false
    }
  ]);
  let parametersValuesArray = homepage ?? parametersSourceArray.map((el) => el.value);
  let options = homepage ?? JSON.parse(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "options"));
  let derivedParametersObject = homepage ?? { options };
  let parametersVisibleArray = homepage ?? trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  let parametersObject = homepage ?? createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
  let snippetSections = [
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
  ];
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
      $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-13anqod"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
      ScreenSizeRadio($$payload2, {
        get demoScreenWidth() {
          return demoScreenWidth;
        },
        set demoScreenWidth($$value) {
          demoScreenWidth = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-13anqod"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-13anqod"><div class="flex flex-col gap-4"><div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--l p-6">`;
      Radios($$payload2, spread_props([parametersObject]));
      $$payload2.out += `<!----></div></div></div></div></div> <div class="mt-20 svelte-13anqod" data-role="examples-section">`;
      DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
      $$payload2.out += `<!----> <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5> <h3 class="govuk-heading-m">Basic Usage</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
<\/script>

<Radios
  legend="Select one option"
  name="basic-options"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Select one option",
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
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "news", label: "Newsletter", hint: "Receive monthly updates" },
    { value: "updates", label: "Product Updates", hint: "New feature alerts" }
  ];
<\/script>

<Radios
  legend="Choose your subscriptions"
  hint="Please select one"
  name="subscriptions"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Choose your subscriptions",
        hint: "Please select one",
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
            hint: "New feature alerts"
          }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">With Validation</h3> `;
      CodeBlock($$payload2, {
        code: `<script lang="ts">
  import Radios from "$lib/components/ui/Radios.svelte";

  function validateSelection(value: string): string | undefined {
    if (!value) {
      return "Please select one option.";
    }
    return undefined;
  }

  const options = [
    { value: "agree", label: "I agree to the terms and conditions" },
    { value: "disagree", label: "I do not agree" }
  ];
<\/script>

<Radios
  legend="Terms and Conditions"
  name="terms"
  options={options}
  validate={validateSelection}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Terms and Conditions",
        name: "terms",
        options: [
          {
            value: "agree",
            label: "I agree to the terms and conditions"
          },
          { value: "disagree", label: "I do not agree" }
        ],
        validate: (value) => {
          if (!value) {
            return "Please select one option.";
          }
          return void 0;
        }
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Exclusive Option</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "carrier-pigeon", label: "Carrier Pigeon" },
    { value: "postal-mail", label: "Postal Mail" },
    { value: "none", label: "I do not wish to receive updates", exclusive: true }
  ];
<\/script>

<Radios
  legend="Choose your method"
  name="method"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Choose your method",
        name: "method",
        options: [
          {
            value: "carrier-pigeon",
            label: "Carrier Pigeon"
          },
          { value: "postal-mail", label: "Postal Mail" },
          {
            value: "none",
            label: "I do not wish to receive updates",
            exclusive: true
          }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">With Conditional Content</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="email">Email</label>
            <input class="govuk-input" id="email" name="email" type="email">
          </div>
        \`
      }
    },
    {
      value: "sms",
      label: "SMS",
      conditional: {
        id: "sms-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="phone">Phone Number</label>
            <input class="govuk-input" id="phone" name="phone" type="tel">
          </div>
        \`
      }
    }
  ];
<\/script>

<Radios
  legend="Preferred Contact"
  name="preferred-contact"
  options={options}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Preferred Contact",
        name: "preferred-contact",
        options: [
          {
            value: "email",
            label: "Email",
            conditional: {
              id: "email-settings",
              content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `
            }
          },
          {
            value: "sms",
            label: "SMS",
            conditional: {
              id: "sms-settings",
              content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="phone">Phone Number</label>
                    <input class="govuk-input" id="phone" name="phone" type="tel">
                  </div>
                `
            }
          }
        ]
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Inline Layout</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];
<\/script>

<Radios
  legend="Have you changed your name?"
  hint="This includes changing your last name or spelling your name differently"
  name="changedName"
  options={options}
  inline={true}
  isPageHeading={true}
/>`,
        language: "svelte"
      });
      $$payload2.out += `<!----> <div class="app-example-wrapper"><div class="app-example__frame app-example__frame--resizable app-example__frame--m p-6">`;
      Radios($$payload2, {
        legend: "Have you changed your name?",
        hint: "This includes changing your last name or spelling your name differently",
        name: "changedName",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ],
        inline: true,
        isPageHeading: true
      });
      $$payload2.out += `<!----></div></div> <h3 class="govuk-heading-m">Using Snippets and Nested Components for Conditional Content</h3> `;
      CodeBlock($$payload2, {
        code: `<script>
  import Radios from "$lib/components/ui/Radios.svelte";

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

<Radios
  legend="Contact Method"
  name="contact-method-snippets"
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
    <Radios
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(value) => !value ? "Please select a time slot" : undefined}
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
      Radios($$payload2, {
        legend: "Contact Method",
        name: "contact-method-snippets",
        options: snippetSections
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
