export const codeBlock1 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
</script>

<NotificationBanner
  type="neutral"
  content="There may be a delay in processing your application because of the coronavirus outbreak."
/>
`;

export const codeBlock2 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
</script>

<NotificationBanner
  type="neutral"
  content="You have 7 days left to send your application."
  linkText="View application"
  linkHref="#"
/>
`;

export const codeBlock3 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
</script>

<NotificationBanner
  type="outcome"
  content="Your details have been updated."
/>
`;

export const codeBlock4 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
</script>

<NotificationBanner
  type="outcome"
  additionalContentHeading="Training outcome recorded and trainee withdrawn"
  content="Contact example@department.gov.uk if you think there's a problem."
/>
`;

export const codeBlock5 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";

  {#snippet ContentSnippet()}
    <p class="govuk-notification-banner__heading">Service update</p>
    <p class="govuk-body">
      We are experiencing high demand. Please check back later if you cannot access
      the service.
    </p>
  {/snippet}
</script>

<NotificationBanner type="neutral" content={ContentSnippet} />
`;

export const codeBlock6 = `
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
</script>

<NotificationBanner
  type="neutral"
  title="Service Information"
  titleHeadingLevel="h3"
  content="This service will be unavailable on Sunday 14th July between 8am and 1pm."
/>
`;
