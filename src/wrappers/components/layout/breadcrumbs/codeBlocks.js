export const codeBlock1 = `
<script>
  import Breadcrumbs from '$lib/components/layout/Breadcrumbs.svelte';
<\/script>

<Breadcrumbs />
`;

export const codeBlock2 = `
<Breadcrumbs
  items={[
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
    { text: "Category", href: "/products/category" }
  ]}
/>
`;

export const codeBlock3 = `
<div class="bg-[#1d70b8] p-4">
  <Breadcrumbs
    items={[
      { text: "Home", href: "/" },
      { text: "Services", href: "/services" },
      { text: "Support", href: "/services/support" }
    ]}
    collapseOnMobile={true}
    inverse={true}
  />
</div>
`;

export const codeBlock4 = `
<script>
  import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
<\/script>

<Breadcrumbs />
`;
