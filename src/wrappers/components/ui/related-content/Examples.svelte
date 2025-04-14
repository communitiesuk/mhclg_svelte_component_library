<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  // Example 1 Data: Default (Ordered Related Items)
  const sections1: RelatedContentSection[] = [
    {
      type: "main",
      id: "ordered-items-example",
      title: "Related content",
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        {
          title: "Training and study at work",
          base_path: "/training-study-work-your-rights",
        },
        {
          title: "Careers helpline for teenagers",
          base_path: "/careers-helpline-for-teenagers",
        },
      ],
      linkStyle: "other",
    },
  ];

  // Example 2 Data: Explore the Topic (Mainstream Browse Pages)
  const sections2: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-browse-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "browse-pages-example",
      subheading: "Explore the topic",
      links: [
        {
          title: "Driving licences",
          base_path: "/browse/driving/driving-licences",
        },
        {
          title: "Driving tests and learning to drive or ride",
          base_path: "/browse/driving/learning-to-drive",
        },
      ],
    },
  ];

  // Example 3 Data: Explore the Topic (Taxons)
  const sections3: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-taxons-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "taxons-example",
      subheading: "Explore the topic",
      links: [
        {
          title: "Driving instruction and driving lessons",
          base_path: "/transport/driving-instruction-and-driving-lessons",
        },
      ],
    },
  ];

  // Example 4 Data: Explore the Topic (Mainstream Precedence)
  const sections4: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-precedence-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "browse-precedence-example",
      subheading: "Explore the topic",
      links: [
        {
          title: "Driving licences",
          base_path: "/browse/driving/driving-licences",
        },
        {
          title: "Driving tests and learning to drive or ride",
          base_path: "/browse/driving/learning-to-drive",
        },
        // Taxon link { title: "Driving instruction and driving lessons", base_path: "/transport/driving-instruction-and-driving-lessons" } is omitted
      ],
    },
  ];

  // Example 5 Data: Collections
  const sections5: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-collections-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "collections-example",
      subheading: "Collection",
      links: [
        {
          title: "Recruit an apprentice (formerly apprenticeship vacancies)",
          base_path: "/government/collections/apprenticeship-vacancies",
        },
        {
          title: "The future of jobs and skills",
          base_path: "/government/collections/the-future-of-jobs-and-skills",
        },
      ],
    },
  ];

  // Example 6 Data: Topical Events
  const sections6: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-topical-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "topical-events-example",
      subheading: "Topical event",
      links: [
        {
          title: "UK-China High-Level People to People Dialogue 2017",
          base_path:
            "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017",
        },
      ],
    },
  ];

  // Example 7 Data: World Locations
  const sections7: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-world-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "world-locations-example",
      subheading: "World locations",
      links: [
        { title: "South Sudan", base_path: "/world/south-sudan/news" },
        { title: "USA", base_path: "/world/usa/news" },
      ],
    },
  ];

  // Example 8 Data: External Links
  const sections8: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-external-title",
      title: "Related content",
      links: [],
    },
    {
      type: "other",
      id: "external-links-example",
      subheading: "Elsewhere on the web",
      links: [
        {
          url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",
          title:
            "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)",
        },
        {
          url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",
          title: "The Student Room: repaying your student loan",
        },
      ],
    },
  ];

  // Example 9 Data: Extensive World Locations (Truncation)
  const sections9: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-world-trunc-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "world-locations-trunc-example",
      subheading: "World locations",
      links: [
        { title: "Algeria", base_path: "/world/algeria/news" },
        { title: "Austria", base_path: "/world/austria/news" },
        { title: "Belarus", base_path: "/world/belarus/news" },
        { title: "Belgium", base_path: "/world/belgium/news" },
        { title: "Bolivia", base_path: "/world/bolivia/news" },
        { title: "Brazil", base_path: "/world/brazil/news" },
        { title: "Canada", base_path: "/world/canada/news" },
        { title: "Chile", base_path: "/world/chile/news" },
        { title: "China", base_path: "/world/china/news" },
      ],
    },
  ];

  // Example 10 Data: Statistical Data Sets
  const sections10: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-stats-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "statistical-data-sets-example",
      subheading: "Statistical data set",
      links: [
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
      ],
    },
  ];

  // Example 11 Data: Other Contacts
  const sections11: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-contacts-title",
      title: "Related content",
      links: [],
    },
    {
      type: "other",
      id: "other-contacts-example",
      subheading: "Other contacts",
      links: [{ title: "Pest Control", base_path: "/pest-control" }],
    },
  ];

  // Example 12 Data: Different Languages (Locale)
  const sections12: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-lang-title",
      title: "Cynnwys cysylltiedig",
      links: [
        {
          title: "Dod o hyd i brentisiaeth",
          base_path: "/apply-apprenticeship.cy",
          locale: "cy",
        },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "browse-lang-example",
      subheading: "Archwiliwch y pwnc",
      links: [
        {
          title: "Apprenticeships, 14 to 19 education... (Korean)",
          base_path: "/browse/education/find-course.ko",
          locale: "ko",
        },
      ],
    },
    {
      type: "subheading",
      id: "topical-lang-example",
      subheading: "Digwyddiad cyfoes",
      links: [
        {
          title: "UK-China High-Level People to People Dialogue 2017 (Spanish)",
          base_path:
            "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017.es",
          locale: "es",
        },
      ],
    },
    {
      type: "other",
      id: "contacts-lang-example",
      subheading: "Cysylltiadau eraill",
      links: [
        {
          title: "Jam producers (Spanish)",
          base_path: "/jam-producers.es",
          locale: "es",
        },
      ],
    },
    {
      type: "subheading",
      id: "stats-lang-example",
      subheading: "Set data ystadegol",
      links: [
        {
          title: "International road fuel prices (Italian)",
          base_path:
            "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures.it",
          locale: "it",
        },
      ],
    },
    {
      type: "subheading",
      id: "collections-lang-example",
      subheading: "Casgliad",
      links: [
        {
          title: "Recruit an apprentice (formerly apprenticeship vacancies)",
          base_path: "/government/collections/apprenticeship-vacancies",
          locale: "en",
        },
      ],
    },
    {
      type: "subheading",
      id: "world-lang-example",
      subheading: "Lleoliadau'r byd",
      links: [
        {
          title: "South Sudan (Arabic)",
          base_path: "/world/south-sudan/news.ar",
          locale: "ar",
        },
      ],
    },
    {
      type: "other",
      id: "external-lang-example",
      subheading: "Mewn mannau eraill ar y we",
      links: [
        {
          url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",
          title:
            "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)",
          locale: "en",
        },
      ],
    },
  ];

  // Example 13 Data: All Types Combined
  const sections13: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-combined-title",
      title: "Related content",
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        {
          title: "Training and study at work",
          base_path: "/training-study-work-your-rights",
        },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "collections-combined",
      subheading: "Collection",
      links: [
        {
          title: "Recruit an apprentice",
          base_path: "/government/collections/apprenticeship-vacancies",
        },
      ],
    },
    {
      type: "subheading",
      id: "explore-combined",
      subheading: "Explore the topic",
      links: [
        {
          title: "Driving licences",
          base_path: "/browse/driving/driving-licences",
        },
      ],
    },
    {
      type: "subheading",
      id: "topical-combined",
      subheading: "Topical event",
      links: [
        {
          title: "UK-China Dialogue 2017",
          base_path:
            "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017",
        },
      ],
    },
    {
      type: "subheading",
      id: "world-combined",
      subheading: "World locations",
      links: [{ title: "South Sudan", base_path: "/world/south-sudan/news" }],
    },
    {
      type: "subheading",
      id: "stats-combined",
      subheading: "Statistical data set",
      links: [
        {
          title: "Weekly road fuel prices",
          base_path:
            "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics",
        },
      ],
    },
    {
      type: "other",
      id: "external-combined",
      subheading: "Elsewhere on the web",
      links: [
        {
          url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",
          title: "The Student Room: repaying your student loan",
        },
      ],
    },
    {
      type: "other",
      id: "contacts-combined",
      subheading: "Other contacts",
      links: [{ title: "Pest Control", base_path: "/pest-control" }],
    },
  ];

  // Example 14 Data: Disable GA4
  const sections14: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-no-ga4",
      title: "Related content (GA4 Disabled)",
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
      ],
      linkStyle: "other",
    },
  ];

  // --- Accordion Configuration ---
  // Define accordion sections *before* the snippets that use them
  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Default (Main Section Links)",
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
    {
      id: "9",
      heading: "9. Extensive World Locations (Truncation)",
      content: Example9,
    },
    { id: "10", heading: "10. Statistical Data Sets", content: Example10 },
    { id: "11", heading: "11. Other Contacts", content: Example11 },
    { id: "12", heading: "12. With Different Languages", content: Example12 },
    { id: "13", heading: "13. All Types Combined", content: Example13 },
    { id: "14", heading: "14. Disable GA4 Tracking", content: Example14 },
  ];
</script>

<!-- Define Example Snippets OUTSIDE the script block -->
{#snippet Example1()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections1} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte" />
{/snippet}

{#snippet Example2()}
  <p class="govuk-body text-sm">
    Shows the component when the 'Explore the topic' section in the `sections`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'mainstream browse pages'.
  </p>
  <p class="govuk-body text-sm">
    <i
      >(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the `sections` data accordingly).</i
    >
  </p>
  <div class="p-5 bg-white">
    <RelatedContent sections={sections2} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte" />
{/snippet}

{#snippet Example3()}
  <p class="govuk-body text-sm">
    Shows the component when the 'Explore the topic' section in the `sections`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'taxons' (a type of topic link distinct from 'mainstream browse pages').
  </p>
  <p class="govuk-body text-sm">
    <i
      >(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the `sections` data accordingly).</i
    >
  </p>
  <div class="p-5 bg-white">
    <RelatedContent sections={sections3} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte" />
{/snippet}

{#snippet Example4()}
  <p class="govuk-body text-sm">
    Demonstrates how a user would mimic the GOV.UK precedence rule: If both
    'mainstream browse pages' and 'taxons' *could* apply to an 'Explore the
    topic' section, the `sections` data passed to this component must be
    prepared <strong>by the user</strong> to only include the mainstream browse links
    for that specific section object.
  </p>
  <p class="govuk-body text-sm">
    <i
      >(Note: The original GOV.UK component handled this precedence internally
      based on link type. This Svelte component requires the user to prepare the
      data accordingly).</i
    >
  </p>
  <div class="p-5 bg-white">
    <RelatedContent sections={sections4} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte" />
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections5} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte" />
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections6} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte" />
{/snippet}

{#snippet Example7()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections7} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte" />
{/snippet}

{#snippet Example8()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections8} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte" />
{/snippet}

{#snippet Example9()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections9} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock9} language="svelte" />
{/snippet}

{#snippet Example10()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections10} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock10} language="svelte" />
{/snippet}

{#snippet Example11()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections11} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock11} language="svelte" />
{/snippet}

{#snippet Example12()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections12} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock12} language="svelte" />
{/snippet}

{#snippet Example13()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections13} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock13} language="svelte" />
{/snippet}

{#snippet Example14()}
  <div class="p-5 bg-white">
    <RelatedContent sections={sections14} disableGa4={true} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock14} language="svelte" />
{/snippet}

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

<style>
</style>
