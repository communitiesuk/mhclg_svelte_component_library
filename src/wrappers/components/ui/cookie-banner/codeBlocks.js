export const codeBlock1 = `
<script>
  import CookieBanner from "$lib/components/ui/CookieBanner.svelte";
</script>

<CookieBanner
  heading="Cookies on Example Service"
  essentialCookiesText="We use essential cookies to make this service work."
  additionalCookiesText="We'd also like to use analytics cookies to understand how you use our service and make improvements."
  rebranded={true}
  demoMode={true}
/>`;

export const codeBlock2 = `
<script>
  import CookieBanner from "$lib/components/ui/CookieBanner.svelte";
</script>

<CookieBanner
  heading="Cookie Preferences"
  essentialCookiesText="Essential cookies keep our website running smoothly."
  additionalCookiesText="Optional cookies help us improve your experience by collecting anonymous usage data."
  acceptButtonText="Accept all cookies"
  rejectButtonText="Only essential cookies"
  viewCookiesText="Manage cookie preferences"
  acceptedMessage="Great! You've accepted our cookies. You can"
  rejectedMessage="No problem! You've rejected optional cookies. You can"
  changeSettingsText="update your preferences"
  hideMessageText="Dismiss this message"
  rebranded={true}
  demoMode={true}
/>`;

export const codeBlock3 = `
<script>
  import CookieBanner from "$lib/components/ui/CookieBanner.svelte";
</script>

<CookieBanner
  heading="Data Collection Notice"
  essentialCookiesText="This website requires certain cookies to function properly."
  additionalCookiesText="We would like your permission to collect analytics data to help us understand user behavior and improve our services."
  cookiesPageUrl="/privacy-policy"
  ariaLabel="Data collection and cookie preferences"
  rebranded={false}
  demoMode={true}
/>`;
