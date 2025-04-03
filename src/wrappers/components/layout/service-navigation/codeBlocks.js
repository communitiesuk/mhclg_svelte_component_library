export const codeBlock1 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";
</script>

<Header fullWidthBorder={true} />
<ServiceNavigation serviceName="My Service" serviceUrl="/my-service" />`;

export const codeBlock2 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";

  const navigationItems = [
    { href: "/item1", label: "Item 1" },
    { href: "/item2", label: "Item 2", isActive: true },
    { href: "/item3", label: "Item 3" }
  ];
</script>

<Header fullWidthBorder={true} />
<ServiceNavigation 
  serviceName="My Service" 
  serviceUrl="/my-service"
  {navigationItems}
/>`;
