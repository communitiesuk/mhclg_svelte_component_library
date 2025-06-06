import InternalHeader from "$lib/components/layout/InternalHeader.svelte";

export const codeBlock1 = `
<script>
  import InternalHeader from '$lib/components/layout/InternalHeader.svelte';
</script>

<InternalHeader
  organisationName="Ministry of Housing, Communities and Local Government"
  serviceName="Funding Service"
  serviceUrl="/funding-service"
  homepageUrl="/"
/>`;

export const codeBlock2 = `
<script>
  import InternalHeader from '$lib/components/layout/InternalHeader.svelte';
</script>

<InternalHeader
  organisationName="Ministry of Housing, Communities and Local Government"
  homepageUrl="/"
  accountName="John Doe"
  showSignOut={true}
  signOutUrl="/auth/sign-out"
/>`;

export const codeBlock3 = `
<script>
  import InternalHeader from '$lib/components/layout/InternalHeader.svelte';
</script>

<InternalHeader
  organisationName="Ministry of Housing, Communities and Local Government"
  serviceName=""
  serviceUrl=""
  accountName=""
  showSignOut={false}
/>`;

export const codeBlock4 = `
<script>
  import InternalHeader from '$lib/components/layout/InternalHeader.svelte';
</script>

<InternalHeader
    organisationName="Ministry of Justice"
    serviceName="Design System"
    serviceUrl="https://design-patterns.service.justice.gov.uk/components/header/"
    homepageUrl="https://design-patterns.service.justice.gov.uk/components/header/"
    headerBorder="10px solid #d53880"
    verticalLineSvgColor="#220051"
    backgroundColor="#220051"
/>`;
