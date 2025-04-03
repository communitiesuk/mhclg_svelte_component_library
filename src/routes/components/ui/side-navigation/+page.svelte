<script lang="ts">
  // @ts-nocheck
  import { page } from "$app/stores";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import SideNavigation from "$lib/components/layout/SideNavigation.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";

  let { data, homepage = undefined, folders } = $props();

  let details = {
    status: "in_progress",
    description: [
      {
        content:
          "A side navigation component that provides an accessible way to navigate between different sections of a website.",
      },
      {
        content:
          'Based on the <a href="https://design-system.dwp.gov.uk/components/side-navigation/" target="_blank" rel="noopener noreferrer">DWP Design System side navigation component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the side navigation component to help users navigate through a section of content that has multiple related pages.",
      },
      {
        content:
          "Side navigation works well for websites with a hierarchical structure or multiple levels of navigation.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "items",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          [
            {
              id: "nav-1",
              text: "Home",
              href: "/home",
            },
            {
              id: "nav-2",
              text: "Services",
              href: "/services",
              subItems: [
                {
                  id: "subnav-1",
                  text: "Service A",
                  href: "/services/a",
                },
                {
                  id: "subnav-2",
                  text: "Service B",
                  href: "/services/b",
                },
                {
                  id: "subnav-3",
                  text: "Service C",
                  href: "/services/c",
                },
              ],
            },
            {
              id: "nav-3",
              text: "Support",
              href: "/support",
            },
            {
              id: "nav-4",
              text: "Contact",
              href: "/contact",
            },
          ],
          null,
          2,
        ),
      },
      {
        name: "ariaLabel",
        category: "Accessibility",
        isProp: true,
        inputType: "input",
        value: "Side",
      },
      {
        name: "selectedItem",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "/services",
      },
      {
        name: "selectedSubItem",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "/services/c",
      },
      {
        name: "mobile",
        category: "UI Options",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          {
            disabled: false,
            showButtonText: "Show navigation",
            hideButtonText: "Hide navigation",
          },
          null,
          2,
        ),
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let items = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "items",
        ),
      ),
  );

  let mobile = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "mobile",
        ),
      ),
  );

  let derivedParametersObject = $derived(homepage ?? { items, mobile });

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );

  // Demo state for bindable example
  let demoSelectedItem = $state("/support");
</script>

<ComponentDetails {homepage} {details} />

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    bind:parametersValuesArray
    {parametersVisibleArray}
  />

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth />
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex flex-col gap-4">
        <div class="app-example-wrapper">
          <div
            class="app-example__frame app-example__frame--resizable app-example__frame--l p-6"
          >
            <SideNavigation {...parametersObject} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px" />
    <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <!-- Example 1: Basic Usage -->
    <h3 class="govuk-heading-m">Basic Usage</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Services", href: "/services" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/home"
  ariaLabel="Main navigation"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <SideNavigation
          items={[
            { id: "nav-1", text: "Home", href: "/home" },
            { id: "nav-2", text: "Services", href: "/services" },
            { id: "nav-3", text: "Support", href: "/support" },
            { id: "nav-4", text: "Contact", href: "/contact" },
          ]}
          selectedItem="/home"
          ariaLabel="Main navigation"
        />
      </div>
    </div>

    <!-- Example 2: With Subitems -->
    <h3 class="govuk-heading-m">With Subitems</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Dashboard", href: "/dashboard" },
    { 
      id: "nav-2", 
      text: "Account", 
      href: "/account",
      subItems: [
        { id: "subnav-1", text: "Profile", href: "/account/profile" },
        { id: "subnav-2", text: "Settings", href: "/account/settings" },
        { id: "subnav-3", text: "Security", href: "/account/security" }
      ]
    },
    { id: "nav-3", text: "Help", href: "/help" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/account"
  ariaLabel="Account navigation"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <SideNavigation
          items={[
            { id: "nav-1", text: "Dashboard", href: "/dashboard" },
            {
              id: "nav-2",
              text: "Account",
              href: "/account",
              subItems: [
                { id: "subnav-1", text: "Profile", href: "/account/profile" },
                { id: "subnav-2", text: "Settings", href: "/account/settings" },
                { id: "subnav-3", text: "Security", href: "/account/security" },
              ],
            },
            { id: "nav-3", text: "Help", href: "/help" },
          ]}
          selectedItem="/account"
          ariaLabel="Account navigation"
        />
      </div>
    </div>

    <!-- Example 3: With Selected Subitem -->
    <h3 class="govuk-heading-m">With Selected Subitem</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Policies", href: "/policies" },
    { 
      id: "nav-2", 
      text: "Applications", 
      href: "/applications",
      subItems: [
        { id: "subnav-1", text: "New Applications", href: "/applications/new" },
        { id: "subnav-2", text: "In Progress", href: "/applications/in-progress" },
        { id: "subnav-3", text: "Completed", href: "/applications/completed" }
      ]
    },
    { id: "nav-3", text: "Reports", href: "/reports" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/applications"
  selectedSubItem="/applications/in-progress"
  ariaLabel="Applications navigation"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <SideNavigation
          items={[
            { id: "nav-1", text: "Policies", href: "/policies" },
            {
              id: "nav-2",
              text: "Applications",
              href: "/applications",
              subItems: [
                {
                  id: "subnav-1",
                  text: "New Applications",
                  href: "/applications/new",
                },
                {
                  id: "subnav-2",
                  text: "In Progress",
                  href: "/applications/in-progress",
                },
                {
                  id: "subnav-3",
                  text: "Completed",
                  href: "/applications/completed",
                },
              ],
            },
            { id: "nav-3", text: "Reports", href: "/reports" },
          ]}
          selectedItem="/applications"
          selectedSubItem="/applications/in-progress"
          ariaLabel="Applications navigation"
        />
      </div>
    </div>

    <!-- Example 4: Mobile Navigation Configuration -->
    <h3 class="govuk-heading-m">Mobile Navigation Configuration</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "About", href: "/about" },
    { id: "nav-3", text: "Services", href: "/services" }
  ];

  const mobileConfig = {
    disabled: false,
    showButtonText: "Open menu",
    hideButtonText: "Close menu"
  };
</script>

<SideNavigation
  items={navItems}
  selectedItem="/about"
  mobile={mobileConfig}
  ariaLabel="Site navigation"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <SideNavigation
          items={[
            { id: "nav-1", text: "Home", href: "/home" },
            { id: "nav-2", text: "About", href: "/about" },
            { id: "nav-3", text: "Services", href: "/services" },
          ]}
          selectedItem="/about"
          mobile={{
            disabled: false,
            showButtonText: "Open menu",
            hideButtonText: "Close menu",
          }}
          ariaLabel="Site navigation"
        />
      </div>
    </div>

    <!-- Example 5: Disabled Mobile Toggle -->
    <h3 class="govuk-heading-m">Disabled Mobile Toggle</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Documentation", href: "/docs" },
    { id: "nav-2", text: "API Reference", href: "/api" },
    { id: "nav-3", text: "Examples", href: "/examples" }
  ];

  // Disable mobile toggle button
  const mobileConfig = {
    disabled: true
  };
</script>

<SideNavigation
  items={navItems}
  selectedItem="/api"
  mobile={mobileConfig}
  ariaLabel="Documentation navigation"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <SideNavigation
          items={[
            { id: "nav-1", text: "Documentation", href: "/docs" },
            { id: "nav-2", text: "API Reference", href: "/api" },
            { id: "nav-3", text: "Examples", href: "/examples" },
          ]}
          selectedItem="/api"
          mobile={{
            disabled: true,
          }}
          ariaLabel="Documentation navigation"
        />
      </div>
    </div>

    <!-- Example 6: Bindable Value -->
    <h3 class="govuk-heading-m">Bindable Value</h3>
    <CodeBlock
      code={`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";
  
  let selectedItem = $state("/support");
  
  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Products", href: "/products" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
</script>

<div class="govuk-form-group">
  <label class="govuk-label" for="nav-select">
    Select a navigation item:
  </label>
  <select 
    class="govuk-select" 
    id="nav-select"
    bind:value={selectedItem}
  >
    <option value="/home">Home</option>
    <option value="/products">Products</option>
    <option value="/support">Support</option>
    <option value="/contact">Contact</option>
  </select>
</div>

<SideNavigation
  items={navItems}
  bind:selectedItem={selectedItem}
  ariaLabel="Main navigation"
/>

<p class="govuk-body">Currently selected: {selectedItem}</p>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <div class="govuk-form-group">
          <label class="govuk-label" for="nav-select">
            Select a navigation item:
          </label>
          <select
            class="govuk-select"
            id="nav-select"
            bind:value={demoSelectedItem}
          >
            <option value="/home">Home</option>
            <option value="/products">Products</option>
            <option value="/support">Support</option>
            <option value="/contact">Contact</option>
          </select>
        </div>

        <div class="mt-4">
          <SideNavigation
            items={[
              { id: "nav-1", text: "Home", href: "/home" },
              { id: "nav-2", text: "Products", href: "/products" },
              { id: "nav-3", text: "Support", href: "/support" },
              { id: "nav-4", text: "Contact", href: "/contact" },
            ]}
            bind:selectedItem={demoSelectedItem}
            ariaLabel="Main navigation"
          />
        </div>

        <p class="govuk-body mt-4">Currently selected: {demoSelectedItem}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0 auto;
  }
  [data-role="demo-section"] {
    max-width: 1024px;
    margin: 0 auto;
  }
  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }
  [data-role="component-container-centered"] {
    padding: 20px 0;
  }
</style>
