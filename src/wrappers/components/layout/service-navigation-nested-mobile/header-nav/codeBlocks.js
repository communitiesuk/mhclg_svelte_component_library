export const codeBlock1 = `
<script lang="ts">
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import { onMount } from "svelte";

  let serviceName = "My Application";
  let homeHref = "#/";
  let navigationItems = [
    { text: "Home", href: "#/home" },
    { text: "Features", href: "#/features" },
    { text: "Pricing", href: "#/pricing" },
    { text: "Contact", href: "#/contact" },
  ];
  
  let activeItemHref = $state("#/home");
  let isMobileNavOpen = $state(false);

  function toggleMobileNav() {
    isMobileNavOpen = !isMobileNavOpen;
  }

  function updateActiveItemFromHash() {
    const hash = window.location.hash;
    const matched = navigationItems.find(item => hash.startsWith(item.href));
    activeItemHref = matched ? matched.href : "#/home";
    isMobileNavOpen = false;
  }

  onMount(updateActiveItemFromHash);
</script>

<svelte:window on:hashchange={updateActiveItemFromHash}/>

<HeaderNav 
  {serviceName} 
  {homeHref}
  {navigationItems} 
  {activeItemHref} 
  bind:isMobileNavOpen={isMobileNavOpen} 
  onToggle={toggleMobileNav} 
/>

<div class="py-2">
  <p>Current activeItemHref (from URL hash): {activeItemHref}</p>
  <p>isMobileNavOpen: {isMobileNavOpen}</p>
  <p><em>Clicking desktop links or links in the simulated mobile menu below will update the URL hash, driving the active state.</em></p>
  <a class="govuk-button govuk-button--secondary mr-2" href="#/features">Set Features Active</a>
  <a class="govuk-button govuk-button--secondary" href="#/pricing">Set Pricing Active</a>
</div>

{#if isMobileNavOpen}
  <div style="padding: 1rem; background-color: #f0f0f0; border-top: 1px solid #ccc;" class="mt-2">
    <p>Mobile navigation menu would appear here.</p>
    <ul>
      {#each navigationItems as item}
        <li><a href={item.href}>{item.text}</a></li>
      {/each}
    </ul>
  </div>
{/if}
`;
