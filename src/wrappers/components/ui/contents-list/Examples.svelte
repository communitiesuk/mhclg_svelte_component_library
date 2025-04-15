<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import ContentsList from "$lib/components/ui/ContentsList.svelte";

  let accordionSnippetSections = [
    {
      id: "basic",
      heading: "1. Basic Contents List",
      content: BasicExample,
    },
    {
      id: "bottomMargin",
      heading: "2. With Bottom Margin",
      content: WithBottomMargin,
    },
    {
      id: "underlineLinks",
      heading: "3. With Underlined Links",
      content: WithUnderlineLinks,
    },
    {
      id: "longText",
      heading: "4. With Long Text",
      content: WithLongText,
    },
    {
      id: "active",
      heading: "5. With Active Content Link",
      content: WithActiveLink,
    },
    {
      id: "nested",
      heading: "6. With Nested Contents",
      content: WithNestedList,
    },
    {
      id: "formattedNumbers",
      heading: "7. With Formatted Numbers",
      content: WithFormattedNumbers,
    },
    {
      id: "nestedFormatted",
      heading: "8. With Nested and Formatted Numbers",
      content: WithNestedFormatted,
    },
    {
      id: "rtl",
      heading: "9. With Right-to-Left Text",
      content: WithRtl,
    },
    {
      id: "rtlNested",
      heading: "10. With Right-to-Left and Nested Lists",
      content: WithRtlNested,
    },
    {
      id: "branding",
      heading: "11. With Branding",
      content: WithBranding,
    },
    {
      id: "alternativeStyle",
      heading: "12. With Alternative Line Style",
      content: WithAlternativeStyle,
    },
    {
      id: "customTitle",
      heading: "13. With Custom Title",
      content: WithCustomTitle,
    },
    {
      id: "noGa4",
      heading: "14. Without GA4 Tracking",
      content: WithoutGa4,
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
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet BasicExample()}
  <div class="p-5 bg-white">
    <ContentsList
      contents={[
        { href: "#first-thing", text: "First thing" },
        { href: "#second-thing", text: "Second thing" },
        { href: "#third-thing", text: "Third thing" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.basicExample} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithBottomMargin()}
  <div class="p-5 bg-white">
    <ContentsList
      marginBottom={9}
      contents={[
        { href: "#first-thing", text: "First thing" },
        { href: "#second-thing", text: "Second thing" },
        { href: "#third-thing", text: "Third thing" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withBottomMargin} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithUnderlineLinks()}
  <div class="p-5 bg-white">
    <ContentsList
      underlineLinks={true}
      contents={[
        {
          href: "#first-thing",
          text: "Lorem & ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          href: "#second-thing",
          text: "Ut enim — ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          href: "#third-thing",
          text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withUnderlinedLinks} language="svelte"
  ></CodeBlock>
{/snippet}

{#snippet WithLongText()}
  <div class="p-5 bg-white">
    <ContentsList
      contents={[
        {
          href: "#first-thing",
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          href: "#second-thing",
          text: "Another pretty long contents list entry, not as long as the first, but still a little.",
        },
        { href: "#third-thing", text: "Third thing" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withLongText} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithActiveLink()}
  <div class="p-5 bg-white">
    <ContentsList
      contents={[
        { href: "#first-thing", text: "First thing" },
        { href: "#second-thing", text: "Second thing", active: true },
        { href: "#third-thing", text: "Third thing" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withActiveLink} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithNestedList()}
  <div class="p-5 bg-white">
    <ContentsList
      contents={[
        {
          href: "#first-thing",
          text: "First thing",
        },
        {
          href: "#second-thing",
          text: "Second thing",
        },
        {
          href: "#third-thing",
          text: "Third thing",
          items: [
            {
              href: "#sub-third-thing",
              text: "Sub third thing",
            },
            {
              href: "#another-third-thing",
              text: "Another third thing",
            },
          ],
        },
        {
          href: "#fourth-thing",
          text: "Fourth thing",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withNestedList} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithFormattedNumbers()}
  <div class="p-5 bg-white">
    <!-- DEBUG: Test rendering simple text -->
    <!-- <p>Testing Example 7 Render</p> -->
    <!-- Original component call commented out -->
    <ContentsList
      formatNumbers={true}
      contents={[
        { href: "#", text: "1. Item" },
        { href: "#", text: "1.1 Sub item" },
        { href: "#", text: "1.2 Sub item" },
        { href: "#", text: "1.02 longer decimals allowed" },
        { href: "#", text: "1.021 even longer decimals ignored" },
        { href: "#", text: "1 Number without period" },
        { href: "#", text: "10. Two digit numbers" },
        { href: "#", text: "99. Two digit numbers" },
        { href: "#", text: "100. Three digit numbers" },
        { href: "#", text: "2017 four digit numbers ignored" },
        { href: "#", text: "2001: A space odyssey" },
      ]}
    />
    <!-- -->
  </div>
  <CodeBlock code={codeBlocks.withFormattedNumbers} language="svelte"
  ></CodeBlock>
{/snippet}

{#snippet WithNestedFormatted()}
  <div class="p-5 bg-white">
    <!-- DEBUG: Test rendering simple text -->
    <!-- <p>Testing Example 8 Render</p> -->
    <!-- Original component call commented out -->
    <ContentsList
      formatNumbers={true}
      contents={[
        {
          href: "#first-thing",
          text: "1. First thing",
          items: [
            { href: "#second-thing", text: "2. Numbers not parsed" },
            { href: "#third-thing", text: "3. Numbers are just text" },
          ],
        },
        {
          href: "#first-thing",
          text: "2. Next thing",
          items: [
            { href: "#second-thing", text: "No numbers here" },
            { href: "#third-thing", text: "None here either", active: true },
          ],
        },
      ]}
    />
    <!-- -->
  </div>
  <CodeBlock code={codeBlocks.withNestedFormattedNumbers} language="svelte"
  ></CodeBlock>
{/snippet}

{#snippet WithRtl()}
  <div class="p-5 bg-white">
    <ContentsList
      dir="rtl"
      contents={[
        { href: "#section", text: "هل يمكنك تقديم" },
        { href: "#section-1", text: "أعد مستند" },
        { href: "#section-2", text: "تقديم الطلب" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withRtlDirection} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithRtlNested()}
  <div class="p-5 bg-white">
    <ContentsList
      dir="rtl"
      contents={[
        { href: "#section", text: "هل يمكنك تقديم" },
        { href: "#section-1", text: "أعد مستند" },
        {
          href: "#section-2",
          text: "تقديم الطلب",
          items: [
            { href: "#section", text: "هل يمكنك تقديم" },
            { href: "#section-1", text: "أعد مستند" },
            { href: "#section-2", text: "تقديم الطلب" },
          ],
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withRtlNested} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithBranding()}
  <div class="p-5 bg-white">
    <ContentsList
      contents={[
        {
          href: "#first-thing",
          text: "1. First thing",
          items: [
            {
              href: "#second-thing",
              text: "2. Numbers not parsed",
            },
            {
              href: "#third-thing",
              text: "3. Numbers are just text",
            },
          ],
        },
      ]}
      brand="prime-ministers-office-10-downing-street"
      formatNumbers={true}
    />
  </div>
  <CodeBlock code={codeBlocks.withBrand} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithAlternativeStyle()}
  <div class="p-5 bg-white">
    <ContentsList
      alternativeLineStyle={true}
      contents={[
        { href: "#first-thing", text: "First page title link" },
        { href: "#second-thing", text: "Second page title link" },
        { href: "#third-thing", text: "Third page title link", active: true },
        { href: "#fourth-thing", text: "Fourth page title link" },
        { href: "#fifth-thing", text: "Fifth page title link" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withAlternativeLineStyle} language="svelte"
  ></CodeBlock>
{/snippet}

{#snippet WithCustomTitle()}
  <div class="p-5 bg-white">
    <ContentsList
      title="An alternate title"
      contents={[
        { href: "#first-thing", text: "First page title link" },
        { href: "#second-thing", text: "Second page title link" },
        { href: "#third-thing", text: "Third page title link", active: true },
        { href: "#fourth-thing", text: "Fourth page title link" },
        { href: "#fifth-thing", text: "Fifth page title link" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withCustomTitle} language="svelte"></CodeBlock>
{/snippet}

{#snippet WithoutGa4()}
  <div class="p-5 bg-white">
    <ContentsList
      disableGa4={true}
      contents={[
        {
          href: "https://www.gov.uk",
          text: "1. First thing",
          items: [
            { href: "#second-thing", text: "1. Nested Item" },
            { text: "2. Nested Item", active: true },
          ],
        },
        {
          href: "#first-thing",
          text: "2. Second thing",
          items: [
            { href: "#second-thing", text: "1. Nested Item" },
            { href: "https://www.gov.uk/browse", text: "2. Nested Item" },
          ],
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.withoutGa4} language="svelte"></CodeBlock>
{/snippet}
