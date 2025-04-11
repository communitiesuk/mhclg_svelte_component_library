export const codeBlock1 = `
<script>
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";
</script>

<!-- Default Alpha Banner -->
<PhaseBanner />
`;

export const codeBlock2 = `
<script>
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";
</script>

<!-- Beta Banner with custom link -->
<PhaseBanner
  tagText="Beta"
  bannerText="This service is in beta. Help us improve it and "
  linkText="provide feedback"
  linkHref="/feedback"
/>
`;

export const codeBlock3 = `
<script>
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";
</script>

<!-- Custom Tag and Text -->
<PhaseBanner
  tagText="Feedback"
  bannerText="Your feedback helps us improve this service. "
  linkText="Take our short survey"
  linkHref="/survey"
/>
`;
