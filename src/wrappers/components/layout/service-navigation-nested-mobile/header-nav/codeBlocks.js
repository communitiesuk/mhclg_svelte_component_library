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
    console.log("Mobile nav toggled:", mobileNavOpen);
  }

  // Example of how currentSection might be updated (e.g., by other UI elements)
  function changeSection(newSection: string) {
    currentSection = newSection;
  }
</script>

<HeaderNav 
  {serviceName} 
  {navigationItems} 
  bind:currentSection={currentSection} 
  bind:mobileNavIsOpen={mobileNavOpen} 
  onToggle={toggleMobileNav} 
/>

<div>
  <p class="mt-4">Current Section (from parent): {currentSection}</p>
  <button class="mr-2 p-2 border rounded" onclick={() => changeSection("Home")}>Set to Home</button>
  <button class="mr-2 p-2 border rounded" onclick={() => changeSection("Features")}>Set to Features</button>
  <button class="mr-2 p-2 border rounded" onclick={() => changeSection("Pricing")}>Set to Pricing</button>
  <button class="p-2 border rounded" onclick={() => changeSection("Contact")}>Set to Contact</button>
</div>

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
