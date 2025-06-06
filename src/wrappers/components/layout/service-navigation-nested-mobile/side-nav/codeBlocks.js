export const codeBlock1 = `
<script>
  // Import the SideNav component
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import { onMount } from "svelte";

  // Sample data for Example 1: A single group of items
  const example1Groups = [
    {
      title: "Football Clubs",
      items: [
        { text: "Borussia Dortmund", href: "#borussia-dortmund" },
        { text: "Liverpool FC", href: "#liverpool-fc" },
        { text: "SSC Napoli", href: "#ssc-napoli" },
        { text: "S.L. Benfica", href: "#sl-benfica" },
      ],
    },
  ];

  // Sync currentItem to the URL hash for demo simplicity
  let currentItem = $state(window.location.hash);
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }
  onMount(syncCurrentItemToHash);
</script>

<svelte:window on:hashchange={syncCurrentItemToHash} />

<SideNav
  title="Football Clubs Navigation"
  groups={example1Groups}
  {currentItem}
  activeItemBackgroundColor="#fff9c4"
/>
`;

export const codeBlock2 = `
<script>
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import { onMount } from "svelte";

  // Sample data for Example 2: Alternating flat items and groups
  const example2Items = [ // First flat item
    { text: "Dashboard Home", href: "#dashboard-home" }
  ];

  const example2Groups = [
    { // First group
      title: "User Settings",
      items: [
        { text: "Profile", href: "#profile" },
        {
          text: "Preferences",
          href: "#preferences",
          subItems: [
            { text: "Theme", href: "#preferences-theme" },
            { text: "Notifications", href: "#preferences-notifications" }
          ]
        }
      ]
    },
    { // Second flat item (represented as a group with no title)
      title: "", // Empty title
      items: [
        { text: "Analytics Overview", href: "#analytics-overview" }
      ]
    },
    { // Second group
      title: "Content Management",
      items: [
        { text: "Articles", href: "#articles" },
        { text: "Categories", href: "#categories" },
        {
          text: "Media Library",
          href: "#media-library",
          subItems: [
            { text: "Images", href: "#media-images" },
            { text: "Videos", href: "#media-videos" }
          ]
        }
      ]
    }
  ];

  // Sync currentItem to the URL hash for demo simplicity
  let currentItem = $state(window.location.hash);
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }
  onMount(syncCurrentItemToHash);
</script>

<svelte:window on:hashchange={syncCurrentItemToHash} />

<SideNav
  title="Alternating Flat Items and Groups"
  items={example2Items}
  groups={example2Groups}
  {currentItem}
  activeItemBackgroundColor="#e0f2fe"
/>
`;
