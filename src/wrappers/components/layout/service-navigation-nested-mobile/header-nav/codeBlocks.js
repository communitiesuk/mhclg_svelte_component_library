export const codeBlock1 = `
<script lang="ts">
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import { onMount } from "svelte";

  let ex1ServiceName = "My Application";
  let ex1HomeHref = "#/";
  let ex1NavigationItems = [
    { text: "Home", href: "#/home" },
    { text: "Features", href: "#/features" },
    { text: "Pricing", href: "#/pricing" },
    { text: "Contact", href: "#/contact" },
  ];
  let ex1ActiveItemHref = $state("#/home");
  let ex1IsMobileNavOpen = $state(false);

  function ex1ToggleMobileNav() {
    ex1IsMobileNavOpen = !ex1IsMobileNavOpen;
  }

  function updateActiveItemFromHash() {
    const hash = window.location.hash;
    const matched = ex1NavigationItems.find(item => hash.startsWith(item.href));
    ex1ActiveItemHref = matched ? matched.href : "#/home";
    ex1IsMobileNavOpen = false;
  }

  onMount(updateActiveItemFromHash);
</script>

<svelte:window on:hashchange={updateActiveItemFromHash}/>

<HeaderNav 
  serviceName={ex1ServiceName}
  homeHref={ex1HomeHref}
  navigationItems={ex1NavigationItems}
  activeItemHref={ex1ActiveItemHref}
  bind:isMobileNavOpen={ex1IsMobileNavOpen}
  onToggle={ex1ToggleMobileNav}
/>

<div class="py-2">
  <p>Current activeItemHref (from URL hash): {ex1ActiveItemHref}</p>
  <p>isMobileNavOpen: {ex1IsMobileNavOpen}</p>

</div>

{#if ex1IsMobileNavOpen}
  <div style="padding: 1rem; background-color: #f0f0f0; border-top: 1px solid #ccc;" class="mt-2">
    <p>Mobile navigation menu would appear here.</p>
    <ul>
      {#each ex1NavigationItems as item}
        <li><a href={item.href}>{item.text}</a></li>
      {/each}
    </ul>
  </div>
{/if}
`;
