<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Radios from "$lib/components/ui/Radios.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
  import type { RadioOption } from "$lib/components/ui/Radios.svelte";

  // Simple state management - let the banner handle complex consent logic
  let analyticsChoice = $state<string | null>(null);
  let showSuccessBanner = $state(false);
  let returnUrl = $state<string>("/");

  // Radio options for analytics consent
  const analyticsOptions: RadioOption[] = [
    { value: "on", label: "Yes" },
    { value: "off", label: "No" },
  ];

  // Load current analytics preference
  function loadAnalyticsPreference(): string {
    if (!browser) return "off";

    try {
      const stored = localStorage.getItem("consentMode");
      if (stored) {
        const consent = JSON.parse(stored);
        return consent.analytics_storage === "granted" ? "on" : "off";
      }
      return "off";
    } catch (e) {
      console.error("Error loading analytics preference:", e);
      return "off";
    }
  }

  // Save analytics preference by updating existing consent object
  function saveAnalyticsPreference(preference: string): void {
    if (!browser) return;

    try {
      // Get existing consent or create new one
      const existing = localStorage.getItem("consentMode");
      const consent = existing
        ? JSON.parse(existing)
        : {
            ad_storage: "denied",
            analytics_storage: "denied",
            personalization_storage: "denied",
            functionality_storage: "denied",
            security_storage: "denied",
          };

      // Update analytics preference
      consent.analytics_storage = preference === "on" ? "granted" : "denied";
      consent.accepted = preference === "on";
      consent.rejected = preference !== "on";

      // Save updated consent
      localStorage.setItem("consentMode", JSON.stringify(consent));
    } catch (e) {
      console.error("Error saving analytics preference:", e);
    }
  }

  // Handle save button click
  function handleSaveSettings(): void {
    if (!browser || !analyticsChoice) return;

    // Save preference
    saveAnalyticsPreference(analyticsChoice);

    // Dispatch event for banner component to handle GA updates
    window.dispatchEvent(new CustomEvent("localStorageChange"));

    // Show success banner
    showSuccessBanner = true;

    // Scroll to top to show banner
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Load previous URL and current preference on mount
  onMount(() => {
    // Get return URL from sessionStorage
    const previousUrl = sessionStorage.getItem("previousUrl");
    if (previousUrl) {
      returnUrl = previousUrl;
    }

    // Load current analytics preference
    analyticsChoice = loadAnalyticsPreference();
  });
</script>

{#snippet successBannerContent()}
  <p class="govuk-notification-banner__heading">
    You've set your cookie preferences.
    <a id="back-link" class="govuk-notification-banner__link" href={returnUrl}>
      Go back to the page you were looking at.
    </a>
  </p>
{/snippet}

<svelte:head>
  <title>Cookies - MHCLG Svelte Component Library</title>
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    {#if showSuccessBanner}
      <div id="banner-output">
        <NotificationBanner type="outcome" content={successBannerContent} />
      </div>
    {/if}

    <h1 class="govuk-heading-xl">Cookies</h1>

    <p class="govuk-body">
      Cookies are small files saved on your phone, tablet or computer when you
      visit a website.
    </p>

    <p class="govuk-body">
      We use cookies to make MHCLG Svelte Component Library work and collect
      information about how you use our service.
    </p>

    <h2 id="essential-cookies" class="govuk-heading-l">Essential cookies</h2>

    <p class="govuk-body">
      Some cookies are necessary because they allow the website to function.
    </p>

    <div class="govuk-overflow-table">
      <table class="govuk-table">
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Name</th>
            <th scope="col" class="govuk-table__header">Purpose</th>
            <th scope="col" class="govuk-table__header">Expires</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">consentMode</th>
            <td class="govuk-table__cell"
              >Saves your cookie consent settings.</td
            >
            <td class="govuk-table__cell">Does not expire</td>
          </tr>
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">bannerHidden</th>
            <td class="govuk-table__cell"
              >Saves whether you've chosen to hide the cookie success banner.</td
            >
            <td class="govuk-table__cell">Does not expire</td>
          </tr>
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">previousUrl</th>
            <td class="govuk-table__cell"
              >Saves the MHCLG Svelte Component Library page url before onward
              navigation to the cookie page.</td
            >
            <td class="govuk-table__cell">When you close your browser</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="analytics-cookies" class="govuk-heading-l">
      Analytics cookies (optional)
    </h2>

    <p class="govuk-body">
      With your permission, we use Google Analytics to collect data about how
      you use MHCLG Svelte Component Library. This information helps us to
      improve our service.
    </p>

    <p class="govuk-body">
      Google is not allowed to use or share our analytics data with anyone.
    </p>

    <p class="govuk-body">
      Google Analytics stores anonymised information about:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>how you got to MHCLG Svelte Component Library</li>
      <li>
        the pages you visit on MHCLG Svelte Component Library and how long you
        spend on them
      </li>
      <li>what you click on while you're visiting the site</li>
    </ul>

    <div class="govuk-overflow-table">
      <table class="govuk-table">
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Name</th>
            <th scope="col" class="govuk-table__header">Purpose</th>
            <th scope="col" class="govuk-table__header">Expires</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">_ga</th>
            <td class="govuk-table__cell"
              >Checks if you've visited MHCLG Svelte Component Library before.
              This helps us count how many people visit our site.</td
            >
            <td class="govuk-table__cell">2 years</td>
          </tr>
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">_gid</th>
            <td class="govuk-table__cell"
              >Checks if you've visited MHCLG Svelte Component Library before.
              This helps us count how many people visit our site.</td
            >
            <td class="govuk-table__cell">24 hours</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="cookie-settings__form-wrapper govuk-!-margin-top-6">
      <Radios
        bind:selectedValue={analyticsChoice}
        legend="Do you want to accept analytics cookies?"
        legendSize="m"
        name="cookies-analytics"
        options={analyticsOptions}
        inline={true}
      />

      <div class="govuk-button-group govuk-!-margin-top-6">
        <Button
          textContent="Save cookie settings"
          buttonType="default"
          onClickFunction={handleSaveSettings}
          noPadding={true}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .govuk-overflow-table {
    overflow-x: auto;
    margin-bottom: 20px;
  }

  .cookie-settings__form-wrapper {
    padding-top: 20px;
  }

  :global(.govuk-table) {
    min-width: 600px;
  }
</style>
