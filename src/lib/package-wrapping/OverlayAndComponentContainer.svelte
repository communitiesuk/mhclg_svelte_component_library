<script>
  import { Tooltip } from "flowbite-svelte";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import DoubleChevronButton from "$lib/icons/DoubleChevronButton.svelte";
  import InputForParameterUpdated from "$lib/package-wrapping/InputForParameterUpdated.svelte";

  let {
    Component,
    demoScreenWidth,
    parametersSourceArray,
    statedParametersValuesArray = $bindable(),
    derivedParametersValuesArray,
    parametersVisibleArray,
    parametersParsingErrorsObject,
    parameterCategories,
    categoriesOverlayOpenArray = $bindable(),
    selectedCategory,
    overlayOpen = $bindable(),
    componentOpacity,
  } = $props();

  let componentWidth = $state();
  let componentHeight = $state();
</script>

{#snippet FixedPropsExplanation()}
  <DividerLine></DividerLine>
  <p class="my-10">
    There are three more advanced prop types which are not demoed here but are
    described below:
  </p>
  <div class="grid grid-cols-[auto_1fr] gap-8">
    <div>Snippet props</div>
    <div>
      <p class="mt-0 mb-8">
        Svelte snippets can also be passed as props. Snippets have <code
          >typeof === 'function'</code
        >, so they are treated the same way as function props (e.g. the example
        code is based on <code>functionElements.functionAsString</code>).
      </p>
      <p class="mb-0 mt-8">
        A simple example using a snippet prop can be viewed <a
          href="./snippet-prop-example">here.</a
        >
      </p>
    </div>

    <div class="col-span-full">
      <DividerLine></DividerLine>
    </div>

    <div>bounded props</div>
    <div>
      <p class="mt-0 mb-8">
        We can use Svelte's <code>bind:</code> directive to allow an update to a
        prop within the component to flow upwards to its parent (in this case the
        Wrapper component).
      </p>
      <p class="mt-8 mb-8">
        For this to work with a wrapper page the variable must be declared
        separately to the <code>parametersSourceArray</code> (e.g.
        <code>let boundedProp = $state([])</code>) and passed to the component
        as an individual bounded prop (e.g.
        <code
          >&lt;Template&gt; &lbrace;...parametersSourceArray&rbrace;
          bind:boundedProp &lt;/Template&gt;</code
        >).
      </p>
      <p class="mt-8 mb-8">
        If you wish to see updates reflected in the UI, the prop can also be
        assigned as the value of an entry in <code>parametersSourceArray</code>
        (e.g.
        <code
          >&lbrace; name: "boundedProp", isEditable: false, value:
          boundedProp&rbrace;</code
        >).
      </p>
      <p class="mt-8 mb-0">
        A simple example using a bounded prop can be viewed <a
          href="./bounded-prop-example">here.</a
        >
      </p>
    </div>

    <div class="col-span-full">
      <DividerLine></DividerLine>
    </div>

    <div>derived props</div>
    <div>
      <p class="mt-0 mb-8">
        In some cases, you will want a prop to be derived from another prop
        (e.g. a chart component might have a <code>primaryAreaName</code> prop,
        and a <code>title</code> prop derived from that
        <code>primaryAreaName</code>).
      </p>
      <p class="mt-8 mb-8">
        Therefore, prop values can be assigned after <code
          >parametersSourceArray</code
        >
        is defined. The <code>getValue()</code> function can be used to grab the
        reactive value of any prop within <code>parametersSourceArray</code>.
      </p>
      <p class="mt-8 mb-8">
        (e.g.
        <code
          >let chartTitle = $derived(`Recycling rates have increased in
          $&lbrace;getValue('primaryAreaName')&rbrace; since 2015`)</code
        >
        ).
      </p>
      <p class="mt-8 mb-0">
        The <a href="./components-update/data-vis/line">Line component</a> is an
        example of a wrapper utilising derived props.
        <code>xFunction</code>,<code>yFunction</code>
        and <code>lineFunction</code> are all defined based on other props.
      </p>
    </div>
  </div>
{/snippet}

<div data-role="component-and-overlay-container">
  <!-- === OVERLAY LAYER === -->
  <!-- Absolutely positioned overlay that appears over the component when parameters are being edited -->
  <!-- OVERLAY POSITIONING STRATEGY:
       - position: absolute within relative container (component-and-overlay-container)
       - Dynamically sized to match component dimensions (componentWidth/Height)
       - z-index: 2 ensures it appears above component (z-index: 1)
       - overflow-scroll handles content that exceeds overlay bounds
       - Opacity coordination: overlay opaque, component dimmed when overlay active -->
  {#if overlayOpen && selectedCategory > -1}
    <div
      data-role="overlay-container"
      class="absolute z-[2] p-0 my-0 ml-0 overflow-scroll overflow-x-auto"
      style="left: 0; right: 0; top: 0; height: {componentHeight}px; width: 100%; max-width: {componentWidth +
        2}px; opacity: {1.1 - 2 * componentOpacity}"
    >
      <!-- Sticky header: stays visible while scrolling through parameters -->
      <!-- FLEX LAYOUT: space-between pushes title left and close button right -->
      <div class="p-5 flex flex-row justify-between bg-white sticky top-0">
        <h6 class="underline underline-offset-4">
          {parameterCategories.find((el, i) => i === selectedCategory)?.name}
        </h6>
        <DoubleChevronButton
          bind:open={overlayOpen}
          onClickFunction={() => {
            overlayOpen = !overlayOpen;
            if (!overlayOpen) {
              categoriesOverlayOpenArray = categoriesOverlayOpenArray.map(
                (el) => false,
              );
            }
          }}
        ></DoubleChevronButton>
      </div>
      <DividerLine></DividerLine>

      <!-- Parameter grid: responsive 3-column layout for parameter editing -->
      <!-- GRID LAYOUT STRATEGY:
           - Column 1 (auto): Parameter names - sizes to content, constrained by responsive max-widths
           - Column 2 (auto): Input values - sizes to content, constrained by responsive max-widths  
           - Column 3 (1fr): Descriptions - takes remaining space, can shrink due to min-width: 0
           - Works with ComponentDemo's flex-1 min-w-0 constraint to prevent horizontal overflow -->
      <div data-role="grid-container" class="m-2 p-5 text-base">
        <!-- Grid headers: establish column structure -->
        <div data-role="item" class="font-bold">Parameter</div>
        <div data-role="item" class="font-bold">Value</div>
        <div data-role="item" class="font-bold">Description</div>
        {#each parametersSourceArray as parameter}
          {#if parameter.category === parameterCategories[selectedCategory]?.name && parametersVisibleArray[parameter.index]}
            <div class="col-span-full">
              <DividerLine></DividerLine>
            </div>
            <!-- RESPONSIVE COLUMN CONSTRAINTS: 
                 - data-width attribute triggers CSS max-width based on demoScreenWidth
                 - Prevents parameter names from becoming too wide on any screen size
                 - hyphens-auto + break-words handle text overflow within constraints -->
            <div
              data-role="item"
              data-width={demoScreenWidth < 1024
                ? "col1Sm"
                : demoScreenWidth < 1280
                  ? "col1Md"
                  : "col1Lg"}
              class="m-1 hyphens-auto break-words"
            >
              {parameter.name}
              <!-- FLEX LAYOUT: parameter type indicators (prop/required/binded pills) -->
              <!-- flex-row gap-0.5 creates horizontal row with minimal spacing -->
              <div class="flex flex-row gap-0.5">
                {#each [{ check: parameter.isProp, color: "#ba029b", yAdj: 0, label: "p" }, { check: parameter.isRequired, color: "#00695c", yAdj: 0.75, label: "r" }, { check: parameter.isBinded, color: "#1B4079", yAdj: 1.25, label: "b" }] as pill}
                  {#if pill.check}
                    <svg width="20px" height="20px">
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke={pill.color}
                        fill={pill.color}
                        fill-opacity="0.05"
                        stroke-width="2px"
                      >
                      </circle>
                      <text
                        text-anchor="middle"
                        x="10"
                        y={12.5 + pill.yAdj}
                        font-size="12px"
                        stroke={pill.color}
                        fill={pill.color}
                        stroke-width="0.5px">{pill.label}</text
                      >
                    </svg>
                    <Tooltip type="light" placement="right" class="max-w-60">
                      {#if pill.label === "p"}
                        <div
                          class="flex flex-col gap-2"
                          style="color: {pill.color}"
                        >
                          <p class="m-0 p-0">
                            This parameter is a <span class="font-bold"
                              >prop.</span
                            >
                          </p>

                          <p class="m-0 p-0">
                            This means that the value is passed directly to the
                            component.
                          </p>
                        </div>
                      {:else if pill.label === "r"}
                        <div
                          class="flex flex-col gap-2"
                          style="color: {pill.color}"
                        >
                          <p class="m-0 p-0">
                            This prop is <span class="font-bold">required.</span
                            >
                          </p>

                          <p class="m-0 p-0">
                            This means that the component will not render
                            properly if this prop is <code>undefined</code>.
                          </p>
                        </div>
                      {:else if pill.label === "b"}
                        <div
                          class="flex flex-col gap-2"
                          style="color: {pill.color}"
                        >
                          <p class="m-0 p-0">
                            This parameter is <span class="font-bold"
                              >binded.</span
                            >
                          </p>

                          <p class="m-0 p-0">
                            This means updates to the prop made within the
                            component are tracked by the parent.
                          </p>
                        </div>
                      {/if}
                    </Tooltip>
                  {/if}
                {/each}
              </div>
            </div>
            <!-- VALUE INPUT COLUMN: responsive width constraints for input components -->
            <!-- GRID BEHAVIOR: auto-sizing column with max-width constraints prevents inputs from becoming too wide -->
            <div
              data-role="item"
              data-width={demoScreenWidth < 1024
                ? "col2Sm"
                : demoScreenWidth < 1280
                  ? "col2Md"
                  : "col2Lg"}
            >
              <InputForParameterUpdated
                {demoScreenWidth}
                bind:statedValue={statedParametersValuesArray[parameter.index]}
                derivedValue={derivedParametersValuesArray[parameter.index]}
                {parameter}
              ></InputForParameterUpdated>
            </div>
            <!-- DESCRIPTION COLUMN: flexible width (1fr) that shrinks when needed -->
            <!-- OVERFLOW HANDLING: inherits min-width: 0 from grid-container, allows text wrapping -->
            <div data-role="item" class="m-1">
              {#if typeof parameter.description === "string"}
                {parameter.description}
              {:else if typeof parameter.description === "object"}
                {#each parameter.description.arr as line}
                  <p>
                    {#if parameter.description.markdown}
                      {@html line}
                    {:else}
                      {line}
                    {/if}
                  </p>
                {/each}
              {:else if typeof parameter.description === "function"}
                {@render parameter.description()}
              {:else}
                -
              {/if}
            </div>
          {/if}
        {/each}
        {#if FixedPropsExplanation && parameterCategories[selectedCategory].name === "Fixed props"}
          <div class="col-span-full text-[#6b7280]">
            {@render FixedPropsExplanation()}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- === COMPONENT CONTAINER === -->
  <!-- Main container for the component being demonstrated, with responsive width constraints -->
  <div
    data-role="component-container-centered"
    class="px-0 py-5 rounded-md {overlayOpen
      ? ''
      : 'border border-solid border-[#d1d5db]'}"
    style="width: 100%; max-width: {demoScreenWidth}px;"
  >
    <!-- Component wrapper: provides minimum height and opacity control for overlay interaction -->
    <div
      class="z-[1]"
      style="z-index: 1; min-height: 600px; opacity: {overlayOpen
        ? componentOpacity
        : 1};"
      bind:clientWidth={componentWidth}
      bind:clientHeight={componentHeight}
    >
      <!-- Actual component rendering with error boundary -->
      {#if !Object.values(parametersParsingErrorsObject).includes(true)}
        {@render Component()}
      {:else}
        <h6 class="px-5">Component not rendered due to invalid prop value.</h6>
      {/if}
    </div>
  </div>
</div>

<style>
  /* === POSITIONING CONTEXT === */
  [data-role="component-and-overlay-container"] {
    position: relative; /* Creates positioning context for absolutely positioned overlay */
    display: block;
    width: 100%; /* Takes full width of parent container */
  }

  /* === OVERLAY STYLING === */
  [data-role="overlay-container"] {
    border: solid #d1d5db 1px; /* Visual boundary for overlay */
    border-radius: 5px; /* Rounded corners to match component container */
  }

  /* === RESPONSIVE PARAMETER GRID === */
  [data-role="grid-container"] {
    display: grid;
    grid-template-columns: auto auto 1fr; /* Parameter name | Value input | Description */
    gap: 20px; /* Spacing between grid items */
    min-width: 0; /* Critical: allows grid to shrink and prevents overflow */
    /* CONSTRAINT HIERARCHY:
       1. ComponentDemo provides flex-1 min-w-0 (parent constraint)
       2. This grid inherits that constraint and can shrink below content width
       3. Individual columns use max-width + auto/1fr to distribute space efficiently
       4. Text wrapping (break-words, hyphens-auto) handles content overflow within columns */
  }

  /* === GRID ITEM STYLING === */
  [data-role="item"] {
    color: #6b7280; /* Consistent text color for all grid items */
  }

  /* Remove default margins from first/last paragraphs in grid items */
  [data-role="item"] p:first-of-type {
    margin-top: 0px;
    padding-top: 0px;
  }

  [data-role="item"] p:last-of-type {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }

  /* === RESPONSIVE COLUMN WIDTHS === */
  /* RESPONSIVE STRATEGY: 
     - Applied via data-width attributes based on demoScreenWidth breakpoints
     - Works with CSS Grid auto-sizing: columns size to content up to max-width limit
     - Prevents columns from becoming too wide/narrow at different screen sizes
     - Coordinates with ComponentDemo's width constraints for optimal space usage */

  /* Small screens: Compact parameter names and values */
  [data-width="col1Sm"] {
    max-width: 150px; /* Parameter name column - small screens */
  }

  [data-width="col2Sm"] {
    max-width: 350px; /* Value input column - small screens */
  }

  /* Medium screens: More space for readability */
  [data-width="col1Md"] {
    max-width: 225px; /* Parameter name column - medium screens */
  }

  [data-width="col2Md"] {
    max-width: 450px; /* Value input column - medium screens */
  }

  /* Large screens: Maximum space for comfortable editing */
  [data-width="col1Lg"] {
    max-width: 300px; /* Parameter name column - large screens */
  }

  [data-width="col2Lg"] {
    max-width: 550px; /* Value input column - large screens */
  }

  /* === SVG ICON STYLING === */
  svg {
    overflow: visible; /* Ensures SVG icons don't get clipped at container edges */
  }
</style>
