<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Search from "$lib/components/ui/Search.svelte";

  let demoSearchValue = $state("initial value"); // State for binding example

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Set search value",
      content: ExampleSetSearchValue,
      code: codeBlocks.defaultValue,
    },
    {
      id: "2",
      heading: "2. Stop the label appearing inline",
      content: ExampleInlineLabelFalse,
      code: codeBlocks.inlineLabelFalse,
    },
    {
      id: "3",
      heading: "3. For use on govuk blue background",
      content: ExampleOnGovukBlue,
      code: codeBlocks.onGovukBlue,
    },
    {
      id: "4",
      heading: "4. Homepage",
      content: ExampleHomepage,
      code: codeBlocks.homepage,
    },
    {
      id: "5",
      heading: "5. Change label text",
      content: ExampleCustomLabelText,
      code: codeBlocks.customLabelText,
    },
    {
      id: "6",
      heading: "6. Set id for search input",
      content: ExampleCustomLabelId,
      code: codeBlocks.customLabelId,
    },
    {
      id: "7",
      heading: "7. Large version",
      content: ExampleLargeSize,
      code: codeBlocks.largeSize,
    },
    {
      id: "8",
      heading: "8. Change field name",
      content: ExampleCustomName,
      code: codeBlocks.customName,
    },
    {
      id: "9",
      heading: "9. With aria controls attribute",
      content: ExampleWithAriaControls,
      code: codeBlocks.withAriaControls,
    },
    {
      id: "10",
      heading: "10. With custom button text",
      content: ExampleCustomButtonText,
      code: codeBlocks.customButtonText,
    },
    {
      id: "11",
      heading: "11. With set label size",
      content: ExampleWithLabelSize,
      code: codeBlocks.withLabelSize,
    },
    {
      id: "12",
      heading: "12. Wrap label inside a heading",
      content: ExampleWrapLabelInHeading,
      code: codeBlocks.wrapLabelInHeading,
    },
    {
      id: "13",
      heading: "13. With margin bottom",
      content: ExampleWithMarginBottom,
      code: codeBlocks.withMarginBottom,
    },
    {
      id: "14",
      heading: "14. With margin bottom for the label",
      content: ExampleWithLabelMarginBottom,
      code: codeBlocks.withLabelMarginBottom,
    },
    {
      id: "15",
      heading: "15. With custom label class",
      content: ExampleWithCustomLabelClass,
      code: codeBlocks.withCustomLabelClass,
    },
    {
      id: "16",
      heading: "16. With corrections disabled",
      content: ExampleDisableCorrections,
      code: codeBlocks.disableCorrections,
    },
    {
      id: "17",
      heading: "17. With custom button background color (MHCLG)",
      content: ExampleCustomButtonColor,
      code: codeBlocks.customButtonColor,
    },
    {
      id: "18",
      heading: "18. With Hint Text and Custom Width",
      content: ExampleHintAndWidth,
      code: codeBlocks.hintAndWidth,
    },
    {
      id: "19",
      heading: "19. Bindable Value",
      content: ExampleBinding,
      code: codeBlocks.codeBlockBinding,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
  >
    {#each accordionSnippetSections as section (section.id)}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
          <CodeBlock code={section.code} language="svelte"></CodeBlock>
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet ExampleSetSearchValue()}
  <div class="p-5 bg-white">
    <Search value="driving licence" />
  </div>
{/snippet}

{#snippet ExampleInlineLabelFalse()}
  <div class="p-5 bg-white">
    <Search inline_label={false} />
  </div>
{/snippet}

{#snippet ExampleOnGovukBlue()}
  <div class="p-5 bg-[#1d70b8]">
    <!-- Blue background for context -->
    <Search on_govuk_blue={true} />
  </div>
{/snippet}

{#snippet ExampleHomepage()}
  <div class="p-5 bg-[#1d70b8]">
    <!-- Blue background for context -->
    <Search
      label_text="Search"
      inline_label={false}
      on_govuk_blue={true}
      label_size="s"
      label_margin_bottom={3}
      homepage={true}
      size="large"
    />
  </div>
{/snippet}

{#snippet ExampleCustomLabelText()}
  <div class="p-5 bg-white">
    <Search label_text="Search" />
  </div>
{/snippet}

{#snippet ExampleCustomLabelId()}
  <div class="p-5 bg-white">
    <Search label_id="my_unique_id" />
  </div>
{/snippet}

{#snippet ExampleLargeSize()}
  <div class="p-5 bg-white">
    <Search size="large" />
  </div>
{/snippet}

{#snippet ExampleCustomName()}
  <div class="p-5 bg-white">
    <Search name="my_own_fieldname" />
  </div>
{/snippet}

{#snippet ExampleWithAriaControls()}
  <div class="p-5 bg-white">
    <Search aria_controls="wrapper" />
  </div>
{/snippet}

{#snippet ExampleCustomButtonText()}
  <div class="p-5 bg-white">
    <Search button_text="Search absolutely everywhere" />
  </div>
{/snippet}

{#snippet ExampleWithLabelSize()}
  <div class="p-5 bg-white">
    <Search label_size="xl" />
  </div>
{/snippet}

{#snippet ExampleWrapLabelInHeading()}
  <div class="p-5 bg-white">
    <Search wrap_label_in_a_heading={true} heading_level={1} />
  </div>
{/snippet}

{#snippet ExampleWithMarginBottom()}
  <div class="p-5 bg-white">
    <Search margin_bottom={9} />
  </div>
{/snippet}

{#snippet ExampleWithLabelMarginBottom()}
  <div class="p-5 bg-white">
    <Search label_margin_bottom={9} inline_label={false} />
  </div>
{/snippet}

{#snippet ExampleWithCustomLabelClass()}
  <p class="govuk-body text-sm">
    Demonstrates adding a custom CSS class to the label. Note that when a
    <code>label_custom_class</code> is provided, the component's default label
    styling (e.g., from <code>.gem-c-search__label</code> or
    <code>.govuk-label</code>) is intentionally not applied to prevent CSS
    conflicts.
  </p>
  <p class="govuk-body text-sm">
    <i>
      The custom class (like <code>govuk-heading-xl</code> used here) takes full
      control. This might affect default spacing (margins/padding) that the
      component's label class would normally handle. You may need to set
      <code>inline_label={false}</code> and potentially add further custom styling
      or utility classes to achieve the desired layout.
    </i>
  </p>
  <div class="p-5 bg-white">
    <Search label_custom_class="govuk-heading-xl" inline_label={false} />
  </div>
{/snippet}

{#snippet ExampleDisableCorrections()}
  <div class="p-5 bg-white">
    <Search disable_corrections={true} />
  </div>
{/snippet}

{#snippet ExampleCustomButtonColor()}
  <p class="govuk-body text-sm">
    Demonstrates applying a custom background color to the button. This color
    will be overridden if <code>on_govuk_blue</code> or <code>homepage</code> props
    are true.
  </p>
  <div class="p-5 bg-white">
    <Search button_background_color="#00625e" />
  </div>
{/snippet}

{#snippet ExampleHintAndWidth()}
  <p class="govuk-body text-sm">
    Demonstrates using the <code>hint</code> prop to add descriptive text and
    the <code>input_width</code> prop to control the component's width simultaneously.
  </p>
  <div class="p-5 bg-white">
    <Search
      hint="Enter your full name"
      input_width="two-thirds"
      inline_label={false}
    />
  </div>
{/snippet}

{#snippet ExampleBinding()}
  <div class="p-5 bg-white">
    <Search
      label_text="Search with bound value"
      bind:value={demoSearchValue}
      inline_label={false}
      hint="For exmaple: 'new value'"
    />
    <p class="govuk-body mt-4">
      Current bound value: <strong>{demoSearchValue}</strong>
    </p>
  </div>
{/snippet}
