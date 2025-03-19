<script lang="ts">
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
  import Header from "$lib/components/ui/Header.svelte";
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";
  import "../app.css";
  let { children, data } = $props();

  // Navigation items for the ServiceNavigation component
  const navigationItems = $state([
    { href: "/", label: "Home", isActive: false },
  ]);

  // Set active navigation item based on the current path
  $effect(() => {
    if (typeof window === "undefined") return;

    // Update the active state based on current path
    const path = window.location.pathname;
    navigationItems.forEach((item) => {
      item.isActive = path.startsWith(item.href);
    });
  });
</script>

<div class="min-h-screen flex flex-col">
  <div class="flex-grow">
    <InternalHeader homepageUrl="/" organisationName="MHCLG Digital Design & Development Team" />
    <ServiceNavigation
      serviceName="Svelte Component Library"
      serviceUrl="/"
      {navigationItems}
    />

    <div class="g-top-level-container mb-6">
      <Breadcrumbs collapseOnMobile={true} />
    </div>

    {@render children()}
  </div>

  <Footer />
</div>
