<script>
  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";

  // Sample navigation items for the top bar
  const navigationItems = [
    { text: "Home", href: "/", current: false },
    { text: "Components", href: "/components", current: true },
    { text: "Patterns", href: "/patterns", current: false },
    { text: "Community", href: "/community", current: false },
  ];

  // Sample mobile sections with nested items
  const mobileNavSections = [
    {
      title: "Home",
      href: "/",
      current: false,
      items: [{ text: "Overview", href: "/" }],
    },
    {
      title: "Components",
      href: "/components",
      current: true,
      items: [
        {
          title: "Forms",
          items: [
            { text: "Button", href: "/components/ui/button" },
            { text: "Checkbox", href: "/components/ui/checkbox" },
            { text: "Select", href: "/components/ui/select" },
          ],
        },
        {
          title: "Layout",
          items: [
            {
              text: "Internal Header",
              href: "/components/layout/internal-header",
            },
            { text: "Phase Banner", href: "/components/layout/phase-banner" },
          ],
        },
      ],
    },
    {
      title: "Patterns",
      href: "/patterns",
      current: false,
      items: [
        {
          title: "Common patterns",
          items: [
            { text: "Forms", href: "/patterns/forms" },
            { text: "Tables", href: "/patterns/tables" },
          ],
        },
      ],
    },
    {
      title: "Community",
      href: "/community",
      current: false,
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ];
</script>

<!-- Set HTML and body to have no margin to mimic a real mobile view -->
<svelte:head>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow-x: hidden;
    }
  </style>
</svelte:head>

<div>
  <!-- Render the navigation component -->
  <ServiceNavigationNestedMobile
    serviceName="Mobile Demo"
    homeHref="/"
    {navigationItems}
    {mobileNavSections}
  />
</div>
 
<style>

</style>
