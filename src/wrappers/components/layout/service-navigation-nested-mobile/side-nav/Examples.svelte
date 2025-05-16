<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { onMount } from "svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";

  // Data for Example 1
  const example1Data = {
    groups: [
      {
        title: "Football Clubs",
        items: [
          { text: "Borussia Dortmund", href: "#borussia-dortmund" },
          { text: "Liverpool FC", href: "#liverpool-fc" },
          { text: "SSC Napoli", href: "#ssc-napoli" },
          { text: "S.L. Benfica", href: "#sl-benfica" },
        ],
      },
    ],
    currentItem: "#liverpool-fc",
    activeBgColor: "#fff9c4", // Light yellow
    title: "Football Clubs Navigation",
  };

  // Data for Example 2
  const example2Data = {
    items: [{ text: "Dashboard Home", href: "#dashboard-home" }],
    groups: [
      {
        title: "User Settings",
        items: [
          { text: "Profile", href: "#profile" },
          {
            text: "Preferences",
            href: "#preferences",
            subItems: [
              { text: "Theme", href: "#preferences-theme" },
              { text: "Notifications", href: "#preferences-notifications" },
            ],
          },
        ],
      },
      {
        title: "",
        items: [{ text: "Analytics Overview", href: "#analytics-overview" }],
      },
      {
        title: "Content Management",
        items: [
          { text: "Articles", href: "#articles" },
          { text: "Categories", href: "#categories" },
          {
            text: "Media Library",
            href: "#media-library",
            subItems: [
              { text: "Images", href: "#media-images" },
              { text: "Videos", href: "#media-videos" },
            ],
          },
        ],
      },
    ],
    currentItem: "#articles",
    activeBgColor: "#e0f2fe", // Light blue
    title: "Alternating Flat Items and Groups",
  };

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - SideNav with a Single Group",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - SideNav with Mixed Flat Item and Group",
      content: Example2,
    },
  ];

  let currentItem = $state(window.location.hash);
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }
  onMount(syncCurrentItemToHash);
</script>

<svelte:window on:hashchange={syncCurrentItemToHash} />

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
    <!-- currentItem is synced to the URL hash for demo simplicity -->
    <SideNav
      title={example1Data.title}
      groups={example1Data.groups}
      {currentItem}
      activeItemBackgroundColor={example1Data.activeBgColor}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <!-- currentItem is synced to the URL hash for demo simplicity -->
    <SideNav
      title={example2Data.title}
      items={example2Data.items}
      groups={example2Data.groups}
      {currentItem}
      activeItemBackgroundColor={example2Data.activeBgColor}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}
