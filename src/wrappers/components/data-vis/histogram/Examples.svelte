<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Histogram from "$lib/components/data-vis/histogram/Histogram.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - describe the use case here",
      content: Example1,
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
    <Histogram
      min={0}
      max={6}
      dist={[1, 2, 2, 3, 3, 3, 4, 4, 5]}
      color="#eeff5a"
      highlight="dodgerblue"
      highlightValue={3}
      showAxis={true}
      showArrows={false}
      midColor="#DDDDDD"
      startColor="#B70000"
      endColor="#2D6644"
      floor={0}
      ceiling={6}
      padding={0}
      height={50}
      polarity="standard"
      annotationText=""
    ></Histogram>
  </div>
{/snippet}
