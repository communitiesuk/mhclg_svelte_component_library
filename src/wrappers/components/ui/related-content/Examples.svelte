<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  // Data for examples (adapted from GOV.UK docs)
  const orderedRelatedItemsData = [
    { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
    {
      title: "Training and study at work",
      base_path: "/training-study-work-your-rights",
    },
    {
      title: "Careers helpline for teenagers",
      base_path: "/careers-helpline-for-teenagers",
    },
  ];
  const mainstreamData = [
    {
      title: "Driving licences",
      base_path: "/browse/driving/driving-licences",
    },
    {
      title: "Driving tests and learning to drive or ride",
      base_path: "/browse/driving/learning-to-drive",
    },
  ];
  const taxonsData = [
    {
      title: "Driving instruction and driving lessons",
      base_path: "/transport/driving-instruction-and-driving-lessons",
    },
  ];
  const collectionsData = [
    {
      title: "Recruit an apprentice (formerly apprenticeship vacancies)",
      base_path: "/government/collections/apprenticeship-vacancies",
    },
    {
      title: "The future of jobs and skills",
      base_path: "/government/collections/the-future-of-jobs-and-skills",
    },
  ];
  const topicalEventsData = [
    {
      title: "UK-China High-Level People to People Dialogue 2017",
      base_path:
        "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017",
    },
  ];
  const worldLocationsData = [
    { title: "South Sudan", base_path: "/world/south-sudan/news" },
    { title: "USA", base_path: "/world/usa/news" },
  ];
  const externalLinksData = [
    {
      url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",
      title: "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)",
    },
    {
      url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",
      title: "The Student Room: repaying your student loan",
    },
  ];
  const statsData = [
    {
      title: "International road fuel prices",
      base_path:
        "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures",
    },
    {
      title: "Weekly road fuel prices",
      base_path:
        "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics",
    },
  ];
  const contactsData = [{ title: "Pest Control", base_path: "/pest-control" }];

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Default (Ordered Related Items)",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Explore the Topic (Mainstream Browse Pages)",
      content: Example2,
    },
    { id: "3", heading: "3. Explore the Topic (Taxons)", content: Example3 },
    {
      id: "4",
      heading: "4. Explore the Topic (Mainstream Precedence)",
      content: Example4,
    },
    { id: "5", heading: "5. Collections", content: Example5 },
    { id: "6", heading: "6. Topical Events", content: Example6 },
    { id: "7", heading: "7. World Locations", content: Example7 },
    { id: "8", heading: "8. External Links", content: Example8 },
    { id: "9", heading: "9. Statistical Data Sets", content: Example9 },
    { id: "10", heading: "10. Other Contacts", content: Example10 },
    { id: "11", heading: "11. All Types Combined", content: Example11 },
    { id: "12", heading: "12. Disable GA4 Tracking", content: Example12 },
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

{#snippet Example1()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent orderedRelatedItems={orderedRelatedItemsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent mainstreamBrowsePages={mainstreamData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent taxons={taxonsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent
      mainstreamBrowsePages={mainstreamData}
      taxons={taxonsData}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent documentCollections={collectionsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent topicalEvents={topicalEventsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example7()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent worldLocations={worldLocationsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example8()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent externalRelatedLinks={externalLinksData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example9()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent relatedStatisticalDataSets={statsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock9} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example10()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent otherContacts={contactsData} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock10} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example11()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent
      orderedRelatedItems={orderedRelatedItemsData}
      documentCollections={collectionsData}
      mainstreamBrowsePages={mainstreamData}
      taxons={taxonsData}
      topicalEvents={topicalEventsData}
      worldLocations={worldLocationsData}
      relatedStatisticalDataSets={statsData}
      externalRelatedLinks={externalLinksData}
      otherContacts={contactsData}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock11} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example12()}
  <div class="p-5 bg-white max-w-xs">
    <RelatedContent
      orderedRelatedItems={orderedRelatedItemsData}
      disableGa4={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock12} language="svelte"></CodeBlock>
{/snippet}
