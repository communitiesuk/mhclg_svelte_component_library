<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  interface ConsentMode {
    ad_storage: "granted" | "denied";
    analytics_storage: "granted" | "denied";
    personalization_storage: "granted" | "denied";
    functionality_storage: "granted" | "denied";
    security_storage: "granted" | "denied";
    accepted?: boolean;
    rejected?: boolean;
  }

  interface CookieBannerProps {
    // Text content props
    heading?: string;
    essentialCookiesText?: string;
    additionalCookiesText?: string;
    acceptButtonText?: string;
    rejectButtonText?: string;
    viewCookiesText?: string;
    acceptedMessage?: string;
    rejectedMessage?: string;
    changeSettingsText?: string;
    hideMessageText?: string;

    // Navigation props
    cookiesPageUrl?: string;

    // Accessibility props
    ariaLabel?: string;

    // Styling props
    rebranded?: boolean;
  }

  let {
    heading = "Cookies on MHCLG Svelte Component Library",
    essentialCookiesText = "We use some essential cookies to make this service work.",
    additionalCookiesText = "We'd like to set additional cookies so we can remember your settings, understand how people use the service and make improvements.",
    acceptButtonText = "Accept additional cookies",
    rejectButtonText = "Reject additional cookies",
    viewCookiesText = "View cookies",
    acceptedMessage = "You've accepted additional cookies. You can",
    rejectedMessage = "You've rejected additional cookies. You can",
    changeSettingsText = "change your cookie settings",
    hideMessageText = "Hide cookie message",
    cookiesPageUrl = "/cookies-page",
    ariaLabel = "Cookies on MHCLG Svelte Component Library",
    rebranded = true,
  }: CookieBannerProps = $props();

  // Banner state management
  let bannerVisible = $state(true);
  let currentMessage = $state<"initial" | "accepted" | "rejected">("initial");
  let consentMode = $state<ConsentMode | null>(null);

  // Initialize Google Tag Manager dataLayer
  function initializeGTM(): void {
    if (browser && typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
    }
  }

  // Helper function to call gtag
  function gtag(...args: any[]): void {
    if (browser && (window as any).gtag) {
      (window as any).gtag(...args);
    }
  }

  // Load consent preferences from localStorage
  function loadConsent(): ConsentMode | null {
    if (!browser) return null;

    try {
      const stored = localStorage.getItem("consentMode");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Error loading consent from localStorage:", e);
      return null;
    }
  }

  // Save consent preferences to localStorage
  function saveConsent(consent: ConsentMode): void {
    if (!browser) return;

    try {
      localStorage.setItem("consentMode", JSON.stringify(consent));
    } catch (e) {
      console.error("Error saving consent to localStorage:", e);
    }
  }

  // Check if banner should be hidden
  function isBannerHidden(): boolean {
    if (!browser) return false;
    return localStorage.getItem("bannerHidden") === "true";
  }

  // Hide banner permanently
  function hideBanner(): void {
    if (!browser) return;
    localStorage.setItem("bannerHidden", "true");
    bannerVisible = false;
  }

  // Set default denied consent
  function setDefaultConsent(): ConsentMode {
    const defaultConsent: ConsentMode = {
      ad_storage: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
      functionality_storage: "denied",
      security_storage: "denied",
    };

    gtag("consent", "default", defaultConsent);
    saveConsent(defaultConsent);
    return defaultConsent;
  }

  // Update consent and inform Google Analytics
  function updateConsent(consent: ConsentMode): void {
    gtag("consent", "update", consent);
    saveConsent(consent);
    consentMode = consent;

    // Update current message based on consent
    if (consent.accepted) {
      currentMessage = "accepted";
    } else if (consent.rejected) {
      currentMessage = "rejected";
    }
  }

  // Accept additional cookies
  function acceptCookies(): void {
    const consent: ConsentMode = {
      ad_storage: "denied",
      analytics_storage: "granted",
      personalization_storage: "denied",
      functionality_storage: "denied",
      security_storage: "denied",
      accepted: true,
    };
    updateConsent(consent);
  }

  // Reject additional cookies
  function rejectCookies(): void {
    const consent: ConsentMode = {
      ad_storage: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
      functionality_storage: "denied",
      security_storage: "denied",
      rejected: true,
    };
    updateConsent(consent);
  }

  // Navigate to cookies page while preserving current URL
  function navigateToPreferencesPage(): void {
    if (!browser) return;

    // Store the current URL in sessionStorage
    sessionStorage.setItem("previousUrl", window.location.href);

    // Navigate to cookies page with current query parameters
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.search;
    window.location.href = cookiesPageUrl + searchParams;
  }

  // Initialize component on mount
  onMount(() => {
    initializeGTM();

    // Check if banner should be hidden
    if (isBannerHidden()) {
      bannerVisible = false;
      return;
    }

    // Load existing consent or set defaults
    const existingConsent = loadConsent();
    if (existingConsent) {
      consentMode = existingConsent;
      gtag("consent", "update", existingConsent);

      // Set initial message state based on existing consent
      if (existingConsent.accepted) {
        currentMessage = "accepted";
      } else if (existingConsent.rejected) {
        currentMessage = "rejected";
      }
    } else {
      consentMode = setDefaultConsent();
    }
  });

  // Handle storage changes (same tab - from cookies page)
  function handleStorageChange(): void {
    const updatedConsent = loadConsent();
    const bannerHidden = isBannerHidden();

    if (bannerHidden) {
      bannerVisible = false;
      return;
    }

    if (updatedConsent) {
      consentMode = updatedConsent;
      gtag("consent", "update", updatedConsent);

      if (updatedConsent.accepted) {
        currentMessage = "accepted";
      } else if (updatedConsent.rejected) {
        currentMessage = "rejected";
      }
    }
  }

  // Handle native storage events (cross-tab changes)
  function handleCrossTabStorage(event: StorageEvent): void {
    // Only respond to changes to our consentMode or bannerHidden keys
    if (event.key === "consentMode" || event.key === "bannerHidden") {
      handleStorageChange();
    }
  }
</script>

<!-- Listen for both native and custom storage events -->
<svelte:window
  onstorage={handleCrossTabStorage}
  onlocalStorageChange={handleStorageChange}
/>

{#if bannerVisible}
  <div
    class="govuk-cookie-banner {rebranded ? 'govuk-template--rebranded' : ''}"
    data-nosnippet
    role="region"
    aria-label={ariaLabel}
  >
    <!-- Initial consent request message -->
    {#if currentMessage === "initial"}
      <div class="govuk-cookie-banner__message govuk-width-container">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <h2 class="govuk-cookie-banner__heading govuk-heading-m">
              {heading}
            </h2>
            <div class="govuk-cookie-banner__content">
              <p class="govuk-body">{essentialCookiesText}</p>
              <p class="govuk-body">{additionalCookiesText}</p>
            </div>
          </div>
        </div>
        <div class="govuk-button-group">
          <button
            type="button"
            class="govuk-button"
            data-module="govuk-button"
            onclick={acceptCookies}
          >
            {acceptButtonText}
          </button>
          <button
            type="button"
            class="govuk-button"
            data-module="govuk-button"
            onclick={rejectCookies}
          >
            {rejectButtonText}
          </button>
          <button
            type="button"
            class="govuk-link"
            style="background: none; border: none; padding: 0; color: #1d70b8; text-decoration: underline; cursor: pointer;"
            onclick={navigateToPreferencesPage}
          >
            {viewCookiesText}
          </button>
        </div>
      </div>
    {/if}

    <!-- Accepted cookies confirmation message -->
    {#if currentMessage === "accepted"}
      <div class="govuk-cookie-banner__message govuk-width-container">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <div class="govuk-cookie-banner__content">
              <p class="govuk-body">
                {acceptedMessage}
                <button
                  type="button"
                  class="govuk-link"
                  style="background: none; border: none; padding: 0; color: #1d70b8; text-decoration: underline; cursor: pointer;"
                  onclick={navigateToPreferencesPage}
                >
                  {changeSettingsText}
                </button>
                at any time.
              </p>
            </div>
          </div>
        </div>
        <div class="govuk-button-group">
          <button
            type="button"
            class="govuk-button"
            data-module="govuk-button"
            onclick={hideBanner}
          >
            {hideMessageText}
          </button>
        </div>
      </div>
    {/if}

    <!-- Rejected cookies confirmation message -->
    {#if currentMessage === "rejected"}
      <div class="govuk-cookie-banner__message govuk-width-container">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <div class="govuk-cookie-banner__content">
              <p class="govuk-body">
                {rejectedMessage}
                <button
                  type="button"
                  class="govuk-link"
                  style="background: none; border: none; padding: 0; color: #1d70b8; text-decoration: underline; cursor: pointer;"
                  onclick={navigateToPreferencesPage}
                >
                  {changeSettingsText}
                </button>
                at any time.
              </p>
            </div>
          </div>
        </div>
        <div class="govuk-button-group">
          <button
            type="button"
            class="govuk-button"
            data-module="govuk-button"
            onclick={hideBanner}
          >
            {hideMessageText}
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .govuk-cookie-banner.govuk-template--rebranded {
    background-color: #f4f8fb;
  }
</style>
