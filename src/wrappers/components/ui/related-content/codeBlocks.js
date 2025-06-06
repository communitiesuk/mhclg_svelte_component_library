// Adapted from https://components.publishing.service.gov.uk/component-guide/related_navigation

// Ordered items
export const codeBlock1 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte"; // Assuming type export

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "ordered-items-example",
      title: "Related content", // Main title for the whole component
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
        { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
      ],
      linkStyle: "other", // Main section uses 'other' style by default
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Browse pages take precedence for "Explore the topic"
export const codeBlock2 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main", // Need a main section for the title
      id: "main-browse-title",
      title: "Related content",
      links: [], // Main section might not have links itself
    },
    {
      type: "subheading",
      id: "browse-pages-example",
      subheading: "Explore the topic",
      links: [
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
      ],
      // linkStyle defaults to 'normal' for subheading
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Taxons
export const codeBlock3 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
        { title: "Driving instruction and driving lessons", base_path: "/transport/driving-instruction-and-driving-lessons" },
      ],
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Mainstream browse pages take precedence for "Explore the topic"
export const codeBlock4 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  // Mainstream browse pages take precedence for "Explore the topic"
  const sections: RelatedContentSection[] = [
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
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
      ],
      // Taxon links are omitted as mainstream links are present for this subheading ID
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Collection
export const codeBlock5 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
        { title: "Recruit an apprentice (formerly apprenticeship vacancies)", base_path: "/government/collections/apprenticeship-vacancies" },
        { title: "The future of jobs and skills", base_path: "/government/collections/the-future-of-jobs-and-skills" },
      ],
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Topical Event
export const codeBlock6 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
        { title: "UK-China High-Level People to People Dialogue 2017", base_path: "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017" },
      ],
    },
  ];
</script>

<RelatedContent {sections} />
`;

// World Locations
export const codeBlock7 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
</script>

<RelatedContent {sections} />
`;

// Elsewhere on the web
export const codeBlock8 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-external-title",
      title: "Related content",
      links: [],
    },
    {
      type: "other", // External links use 'other' type
      id: "external-links-example",
      subheading: "Elsewhere on the web",
      links: [
        { url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf", title: "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)" },
        { url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan", title: "The Student Room: repaying your student loan" },
      ],
      // linkStyle defaults to 'other' for other type
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Extensive World Locations (Truncation Example)
export const codeBlock9 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
          { title: "Bolivia", base_path: "/world/bolivia/news" }, // Default threshold is 5
          { title: "Brazil", base_path: "/world/brazil/news" },
          { title: "Canada", base_path: "/world/canada/news" },
          { title: "Chile", base_path: "/world/chile/news" },
          { title: "China", base_path: "/world/china/news" },
      ],
      // Uses default listTruncateThreshold (5)
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Statistical Data Sets
export const codeBlock10 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
        { title: "International road fuel prices", base_path: "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures" },
        { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
      ],
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Other Contacts
export const codeBlock11 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
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
      links: [
        { title: "Pest Control", base_path: "/pest-control" },
      ],
    },
  ];
</script>

<RelatedContent {sections} />
`;

// Different Languages (Locale in links)
export const codeBlock12 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-lang-title",
      title: "Cynnwys cysylltiedig", // Welsh title
      links: [
         { title: "Dod o hyd i brentisiaeth", base_path: "/apply-apprenticeship.cy", locale: "cy" },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "browse-lang-example",
      subheading: "Archwiliwch y pwnc", // Welsh subheading
      links: [
         { title: "Apprenticeships, 14 to 19 education... (Korean)", base_path: "/browse/education/find-course.ko", locale: "ko" },
         // Add other links with locale property here
      ],
    },
    // ... Define other language-specific sections
  ];
</script>

<RelatedContent {sections} />
`;

// All Types Combined
export const codeBlock13 = `
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-combined-title",
      title: "Related content",
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "collections-combined",
      subheading: "Collection",
      links: [
         { title: "Recruit an apprentice", base_path: "/government/collections/apprenticeship-vacancies" },
      ],
    },
    {
      type: "subheading",
      id: "explore-combined",
      subheading: "Explore the topic",
      links: [
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        // Taxons ignored if mainstream links are present under the same subheading/id conceptually
      ],
    },
    {
      type: "subheading",
      id: "topical-combined",
      subheading: "Topical event",
      links: [
         { title: "UK-China Dialogue 2017", base_path: "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017" },
      ]
    },
    {
      type: "subheading",
      id: "world-combined",
      subheading: "World locations",
      links: [
        { title: "South Sudan", base_path: "/world/south-sudan/news" },
      ]
    },
    {
      type: "subheading",
      id: "stats-combined",
      subheading: "Statistical data set",
      links: [
        { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
      ]
    },
     {
      type: "other",
      id: "external-combined",
      subheading: "Elsewhere on the web",
      links: [
        { url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan", title: "The Student Room: repaying your student loan" },
      ],
    },
    {
      type: "other",
      id: "contacts-combined",
      subheading: "Other contacts",
      links: [
         { title: "Pest Control", base_path: "/pest-control" },
      ]
    }
  ];
</script>

<RelatedContent {sections} />
`;

export const codeBlock14 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
    { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
    { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
  ];
</script>

<RelatedContent orderedRelatedItems={items} disableGa4={true} />
`;
