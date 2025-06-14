<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Neutral banner with string content",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Neutral banner with string content and link",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Outcome (success) banner with string content",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Outcome banner with heading and body content",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Neutral banner with snippet content",
      content: Example5,
    },
    {
      id: "6",
      heading:
        "6. Outcome banner with custom title (H3) and content heading (H4)",
      content: Example6,
    },
  ];
</script>

<div>
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass="w-full"
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

{#snippet Example1()}
  <div class="p-5 bg-white">
    <NotificationBanner
      type="neutral"
      content="There may be a delay in processing your application because of the coronavirus outbreak."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <NotificationBanner
      type="neutral"
      content="You have 7 days left to send your application."
      linkText="View application"
      linkHref="#"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <NotificationBanner
      type="outcome"
      content="Your details have been updated."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <NotificationBanner
      type="outcome"
      additionalContentHeading="Training outcome recorded and trainee withdrawn"
      content="Contact example@department.gov.uk if you think there's a problem."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet ContentSnippet()}
  <p class="govuk-notification-banner__heading">Service update</p>
  <p class="govuk-body">
    We are experiencing high demand. Please check <a
      href="#"
      class="govuk-notification-banner__link">status page</a
    > or try again later.
  </p>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <NotificationBanner type="neutral" content={ContentSnippet} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white">
    <NotificationBanner
      type="outcome"
      title="Update Complete"
      titleHeadingLevel="h3"
      additionalContentHeading="Optional Details"
      additionalContentHeadingLevel="h4"
      content="Your profile was updated successfully."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}
