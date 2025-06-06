export const codeBlock1 = `
<script lang="ts">
  import ServiceNavigationNestedMobile from \"$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte\";
  
  // Sample data matching the example
  let sampleNavItems = [
    { text: \"Home\", href: \"/\" },
    { text: \"Components\", href: \"/components\" },
    { text: \"Patterns\", href: \"/patterns\" },
    { text: \"Community\", href: \"/community\" },
  ];

  let sampleMobileSections = [
    {
      title: \"Home\", href: \"/\", items: [{ text: \"Overview\", href: \"/\" }],
    },
    {
      title: \"Components\", href: \"/components\", items: [
        { title: \"Forms\", items: [ { text: \"Button\", href: \"/components/ui/button\" }, { text: \"Checkbox\", href: \"/components/ui/checkbox\" }, { text: \"Select\", href: \"/components/ui/select\" } ]},
        { title: \"Layout\", items: [ { text: \"Internal Header\", href: \"/components/layout/internal-header\" }, { text: \"Phase Banner\", href: \"/components/layout/phase-banner\" } ]}
      ],
    },
    {
      title: \"Patterns\", href: \"/patterns\", items: [
        { title: \"Common patterns\", items: [ { text: \"Forms\", href: \"/patterns/forms\" }, { text: \"Tables\", href: \"/patterns/tables\" } ]}
      ],
    },
    { 
      title: \"Community\", href: \"/community\", items: [
        { text: \"Updates\", href: \"/community/updates\" },
        { text: \"Contributing\", href: \"/community/contributing\" },
      ]
    }
  ];
</script>

<ServiceNavigationNestedMobile
  serviceName=\"Example Service\"
  homeHref=\"/\"
  navigationItems={sampleNavItems}
  mobileNavSections={sampleMobileSections}
/>`;

export const codeBlock2 = `
<!-- Mobile demo approach using an iframe -->
<div class="border border-dashed border-gray-400 mx-auto mobile-example mobile-frame w-full max-w-[420px]" style="height: 480px;">
  <iframe 
    src="/components/layout/service-navigation-nested-mobile/mobile-demo" 
    title="Mobile Navigation Demo" 
    style="width: 100%; height: 100%; border: none;"
  ></iframe>
</div>

<!-- Code for /src/routes/components/layout/service-navigation-nested-mobile/mobile-demo/+page.svelte -->
<script>
  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";
  
  // Sample data for the demo
  const navigationItems = [
    { text: "Home", href: "/" },
    { text: "Components", href: "/components" },
    { text: "Patterns", href: "/patterns" },
    { text: "Community", href: "/community" }
  ];
  
  const mobileNavSections = [
    {
      title: "Home",
      href: "/",
      current: true,
      items: [{ text: "Overview", href: "/" }]
    },
    {
      title: "Components",
      href: "/components",
      current: false,
      items: [
        { title: "Forms", items: [{ text: "Button", href: "/components/ui/button" }] }
      ]
    },
    // Include other sections as needed
  ];
</script>

<div>
  <ServiceNavigationNestedMobile
    serviceName="Mobile Example"
    homeHref="/"
    {navigationItems}
    mobileNavSections={mobileNavSections}
  />
</div>
`;
