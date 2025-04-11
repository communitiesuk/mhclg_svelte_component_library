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

export const codeBlock9 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "International road fuel prices", base_path: "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures" },
    { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
  ];
</script>

<RelatedContent relatedStatisticalDataSets={items} />
`;

export const codeBlock10 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Pest Control", base_path: "/pest-control" },
  ];
</script>

<RelatedContent otherContacts={items} />
`;

export const codeBlock11 = `
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  // Data defined for each section (as in previous examples)
  const orderedRelatedItemsData = [{ title: "Find an apprenticeship", base_path: "/apply-apprenticeship" }, /* ... */];
  const collectionsData = [{ title: "Recruit an apprentice...", base_path: "..." }, /* ... */];
  const mainstreamData = [{ title: "Driving licences", base_path: "..." }, /* ... */];
  const taxonsData = [{ title: "Driving instruction...", base_path: "..." }];
  const topicalEventsData = [{ title: "UK-China High-Level...", base_path: "..." }];
  const worldLocationsData = [{ title: "South Sudan", base_path: "..." }, /* ... */];
  const statsData = [{ title: "International road fuel prices", base_path: "..." }, /* ... */];
  const externalLinksData = [{ url: "...", title: "Student loans..." }, /* ... */];
  const contactsData = [{ title: "Pest Control", base_path: "..." }];

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

export const codeBlock12 = `
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
