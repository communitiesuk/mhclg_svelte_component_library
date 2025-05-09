export const codeBlock1 = `
<script lang="ts">
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";

  let serviceName = "My Application";
  let navigationItems = [
    { text: "Home", href: "/home", current: true },
    { text: "Features", href: "/features", current: false },
    { text: "Pricing", href: "/pricing", current: false },
    { text: "Contact", href: "/contact", current: false },
  ];
  
  // currentSection can be a reactive $state variable if you need to bind it
  let currentSection = $state("Home");
  let mobileNavOpen = $state(false);

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
  }

</script>

<HeaderNav 
  {serviceName} 
  {navigationItems} 
  bind:currentSection={currentSection} 
  bind:mobileNavIsOpen={mobileNavOpen} 
  onToggle={toggleMobileNav} 
/>

{#if mobileNavOpen}
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
