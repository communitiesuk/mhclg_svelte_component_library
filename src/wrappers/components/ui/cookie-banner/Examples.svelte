<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import CookieBanner from "$lib/components/ui/CookieBanner.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Cookie Banner - Default configuration",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Custom Text - Customized messaging",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Non-rebranded - White background styling",
      content: Example3,
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
    <CookieBanner
      heading="Cookies on Example Service"
      essentialCookiesText="We use essential cookies to make this service work."
      additionalCookiesText="We'd also like to use analytics cookies to understand how you use our service and make improvements."
      rebranded={true}
      demoMode={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <CookieBanner
      heading="Cookie Preferences"
      essentialCookiesText="Essential cookies keep our website running smoothly."
      additionalCookiesText="Optional cookies help us improve your experience by collecting anonymous usage data."
      acceptButtonText="Accept all cookies"
      rejectButtonText="Only essential cookies"
      viewCookiesText="Manage cookie preferences"
      acceptedMessage="Great! You've accepted our cookies. You can"
      rejectedMessage="No problem! You've rejected optional cookies. You can"
      changeSettingsText="update your preferences"
      hideMessageText="Dismiss this message"
      rebranded={true}
      demoMode={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <CookieBanner
      heading="Data Collection Notice"
      essentialCookiesText="This website requires certain cookies to function properly."
      additionalCookiesText="We would like your permission to collect analytics data to help us understand user behavior and improve our services."
      cookiesPageUrl="/privacy-policy"
      ariaLabel="Data collection and cookie preferences"
      rebranded={false}
      demoMode={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
