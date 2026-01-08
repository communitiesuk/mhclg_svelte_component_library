<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Button from "$lib/components/ui/Button.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - button for a form",
      content: Example1,
    },
  ];

  let name = "";
  let confirmed = $state(false);

  function handleSubmit(event) {
    event.preventDefault();
    confirmed = true;
  }

  $inspect(confirmed);
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

{#snippet Example1()}
  <div class="p-5 bg-white">
    <form onsubmit={handleSubmit}>
      <label
        >Enter your name:
        <input type="text" name="username" required /></label
      >
      <Button typeAttribute="submit" textContent="Submit a form"></Button>
    </form>
    {#if confirmed}
      <p style="color: green;">Form submitted successfully!</p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
