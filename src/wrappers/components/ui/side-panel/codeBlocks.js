export const codeBlock1 = `
<script>
  import SidePanel from '$lib/components/ui/SidePanel.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ServiceNavigation from '$lib/components/layout/ServiceNavigation.svelte';
  import PhaseBanner from '$lib/components/layout/PhaseBanner.svelte';
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import PostcodeOrAreaSearch from '$lib/components/ui/PostcodeOrAreaSearch.svelte';

  let navState = $state({ open: true });
</script>

<div class="relative h-[460px] w-full max-w-[1100px] mx-auto flex bg-white min-w-0 overflow-hidden">
  <SidePanel width="30%" bind:navState>
    <Header rebrand={true} />
    <ServiceNavigation serviceName="Indices of Deprivation" serviceUrl="/" />
    <PhaseBanner tagText="PROTOTYPE" bannerText="This is not a live service. " linkText="Give feedback" linkHref="/feedback" />

    <div class="p-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Maps</h2>
      <Accordion
        sections={[{ id: 'index-geography', heading: 'Select index and geography level', content: 'Choose an index and a geography level for the map.', expanded: false }]}
        allSectionToggle={false}
        headingLevel="h3"
      />
      <PostcodeOrAreaSearch label_text="Search for a postcode or an area" placeholder="" input_width="full" margin_bottom={4} minLength={3} />
    </div>

    <Footer rebrand={true} showLicence={true} inlineLinks={[{ href: '/accessibility', label: 'Accessibility statement' }, { href: '/cookies', label: 'Cookies' }, { href: '/privacy', label: 'Privacy' }]} />
  </SidePanel>
  <div class="flex-1 bg-gray-100 min-w-0"></div>
</div>`;

export const codeBlock2 = `
<script>
  import SidePanel from '$lib/components/ui/SidePanel.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ServiceNavigation from '$lib/components/layout/ServiceNavigation.svelte';
  import PhaseBanner from '$lib/components/layout/PhaseBanner.svelte';
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import PostcodeOrAreaSearch from '$lib/components/ui/PostcodeOrAreaSearch.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let navState = $state({ open: false });
  function openPanel() { navState.open = true; }
  function closePanel() { navState.open = false; }
</script>

<div class="mb-2">
  <p class="text-sm text-gray-600 mb-2">Panel Status: <strong>{navState.open ? 'Open' : 'Closed'}</strong></p>
  <p class="text-xs text-gray-500">This example shows a right-side panel with custom styling, no toggle button, and programmatic control. Note: the panel only slides in or out on mobile view; on desktop it remains persistently visible.</p>
</div>
<div class="mb-3 flex gap-3">
  <Button textContent="Open panel" buttonType="default" onClickFunction={openPanel} noPadding={true} />
  <Button textContent="Close panel" buttonType="secondary" onClickFunction={closePanel} noPadding={true} />
</div>

<div class="relative h-[460px] w-full max-w-[1100px] mx-auto flex bg-white min-w-0 overflow-hidden">
  <SidePanel position="right" width="35%" bind:navState showToggle={false} panelClass="shadow-xl border-l border-gray-200" overlayClass="bg-black/40" toggleButtonClass="ring-2 ring-blue-600">
    <Header rebrand={true} />
    <ServiceNavigation serviceName="Indices of Deprivation" serviceUrl="/" />
    <PhaseBanner tagText="BETA" bannerText="This is a new service. " linkText="Send feedback" linkHref="/feedback" />

    <div class="p-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Filters</h2>
      <Accordion
        sections={[{ id: 'data-sources', heading: 'Data sources', content: 'Official ONS sources updated regularly.', expanded: false }, { id: 'tips', heading: 'Tips', content: 'Use the search, then refine with filters.', expanded: false }]}
        allSectionToggle={false}
        headingLevel="h3"
      />
      <PostcodeOrAreaSearch label_text="Find a location" placeholder="" input_width="full" minLength={3} />
      
    </div>

    <Footer rebrand={true} showLicence={false} />
  </SidePanel>
  <div class="flex-1 bg-gray-100 min-w-0"></div>
</div>`;
