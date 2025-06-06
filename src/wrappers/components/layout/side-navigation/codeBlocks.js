export const codeBlock1 = `
<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Services", href: "/services" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/home"
  ariaLabel="Main navigation"
/>`;

export const codeBlock2 = `<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Dashboard", href: "/dashboard" },
    { 
      id: "nav-2", 
      text: "Account", 
      href: "/account",
      subItems: [
        { id: "subnav-1", text: "Profile", href: "/account/profile" },
        { id: "subnav-2", text: "Settings", href: "/account/settings" },
        { id: "subnav-3", text: "Security", href: "/account/security" }
      ]
    },
    { id: "nav-3", text: "Help", href: "/help" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/account"
  ariaLabel="Account navigation"
/>`;

export const codeBlock3 = `<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Policies", href: "/policies" },
    { 
      id: "nav-2", 
      text: "Applications", 
      href: "/applications",
      subItems: [
        { id: "subnav-1", text: "New Applications", href: "/applications/new" },
        { id: "subnav-2", text: "In Progress", href: "/applications/in-progress" },
        { id: "subnav-3", text: "Completed", href: "/applications/completed" }
      ]
    },
    { id: "nav-3", text: "Reports", href: "/reports" }
  ];
</script>

<SideNavigation
  items={navItems}
  selectedItem="/applications"
  selectedSubItem="/applications/in-progress"
  ariaLabel="Applications navigation"
/>`;

export const codeBlock4 = `<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "About", href: "/about" },
    { id: "nav-3", text: "Services", href: "/services" }
  ];

  const mobileConfig = {
    disabled: false,
    showButtonText: "Open menu",
    hideButtonText: "Close menu"
  };
</script>

<SideNavigation
  items={navItems}
  selectedItem="/about"
  mobile={mobileConfig}
  ariaLabel="Site navigation"
/>`;

export const codeBlock5 = `<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Documentation", href: "/docs" },
    { id: "nav-2", text: "API Reference", href: "/api" },
    { id: "nav-3", text: "Examples", href: "/examples" }
  ];

  // Disable mobile toggle button
  const mobileConfig = {
    disabled: true
  };
</script>

<SideNavigation
  items={navItems}
  selectedItem="/api"
  mobile={mobileConfig}
  ariaLabel="Documentation navigation"
/>`;

export const codeBlock6 = `
<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";
  
  let selectedItem = $state("/support");
  
  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Products", href: "/products" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
</script>

<div class="govuk-form-group">
  <label class="govuk-label" for="nav-select">
    Select a navigation item:
  </label>
  <select 
    class="govuk-select" 
    id="nav-select"
    bind:value={selectedItem}
  >
    <option value="/home">Home</option>
    <option value="/products">Products</option>
    <option value="/support">Support</option>
    <option value="/contact">Contact</option>
  </select>
</div>

<SideNavigation
  items={navItems}
  bind:selectedItem={selectedItem}
  ariaLabel="Main navigation"
/>

<p class="govuk-body">Currently selected: {selectedItem}</p>`;
