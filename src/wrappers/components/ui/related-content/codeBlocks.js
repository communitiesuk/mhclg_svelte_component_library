// Adapted from https://components.publishing.service.gov.uk/component-guide/related_navigation

export const codeBlock1 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
    { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
    { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
  ];
</script>

<RelatedContent orderedRelatedItems={items} />
`;

export const codeBlock2 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
    { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
  ];
</script>

<RelatedContent mainstreamBrowsePages={items} />
`;

export const codeBlock3 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Driving instruction and driving lessons", base_path: "/transport/driving-instruction-and-driving-lessons" },
  ];
</script>

<RelatedContent taxons={items} />
`;

export const codeBlock4 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const mainstream = [
    { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
    { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
  ];
  const taxons = [
    { title: "Driving instruction and driving lessons", base_path: "/transport/driving-instruction-and-driving-lessons" },
  ];
</script>

<!-- Mainstream browse pages take precedence -->
<RelatedContent mainstreamBrowsePages={mainstream} taxons={taxons} />
`;

export const codeBlock5 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Recruit an apprentice (formerly apprenticeship vacancies)", base_path: "/government/collections/apprenticeship-vacancies" },
    { title: "The future of jobs and skills", base_path: "/government/collections/the-future-of-jobs-and-skills" },
  ];
</script>

<RelatedContent documentCollections={items} />
`;

export const codeBlock6 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "UK-China High-Level People to People Dialogue 2017", base_path: "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017" },
  ];
</script>

<RelatedContent topicalEvents={items} />
`;

export const codeBlock7 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "South Sudan", base_path: "/world/south-sudan/news" },
    { title: "USA", base_path: "/world/usa/news" },
  ];
</script>

<RelatedContent worldLocations={items} />
`;

export const codeBlock8 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf", title: "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)" },
    { url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan", title: "The Student Room: repaying your student loan" },
  ];
</script>

<RelatedContent externalRelatedLinks={items} />
`;

export const codeBlock9 = ` // Extensive World Locations
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
      { title: "Algeria", base_path: "/world/algeria/news" },
      { title: "Austria", base_path: "/world/austria/news" },
      { title: "Belarus", base_path: "/world/belarus/news" },
      { title: "Belgium", base_path: "/world/belgium/news" },
      { title: "Bolivia", base_path: "/world/bolivia/news" },
      { title: "Brazil", base_path: "/world/brazil/news" },
      { title: "Canada", base_path: "/world/canada/news" },
      { title: "Chile", base_path: "/world/chile/news" },
      { title: "China", base_path: "/world/china/news" },
  ];
</script>

<RelatedContent worldLocations={items} />
`;

export const codeBlock10 = ` // Statistical Data Sets
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "International road fuel prices", base_path: "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures" },
    { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
  ];
</script>

<RelatedContent relatedStatisticalDataSets={items} />
`;

export const codeBlock11 = ` // Other Contacts
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Pest Control", base_path: "/pest-control" },
  ];
</script>

<RelatedContent otherContacts={items} />
`;

export const codeBlock12 = ` // Different Languages
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  // Data for each section needs the 'locale' property
  const orderedRelatedItemsLangData = [
    { title: "Find an apprenticeship (Welsh)", base_path: "/apply-apprenticeship.cy", locale: "cy" },
  ];
  const mainstreamLangData = [
    { title: "Apprenticeships, 14 to 19 education... (Korean)", base_path: "/browse/education/find-course.ko", locale: "ko" },
  ];
  // ... Define other language-specific data arrays (topicalEvents, contacts, stats, collections, worldLocations, externalLinks)

</script>

<RelatedContent
  orderedRelatedItems={orderedRelatedItemsLangData}
  mainstreamBrowsePages={mainstreamLangData}
  // ... Pass other language-specific props
/>
`;

export const codeBlock13 = ` // All Types Combined
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  // Define all data arrays as in previous examples
  const orderedRelatedItemsData = [/* ... */];
  const collectionsData = [/* ... */];
  const mainstreamData = [/* ... */];
  const taxonsData = [/* ... */]; // Will be ignored due to mainstreamData
  const topicalEventsData = [/* ... */];
  const worldLocationsData = [/* ... */];
  const statsData = [/* ... */];
  const externalLinksData = [/* ... */];
  const contactsData = [/* ... */];

</script>

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
`;

export const codeBlock14 = ` // Disable GA4
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
