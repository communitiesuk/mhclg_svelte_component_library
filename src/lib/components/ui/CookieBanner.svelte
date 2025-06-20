<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import { fly } from "svelte/transition";
  import {
    handleCookiesNavigation as handleCookiesNav,
    createCookiesUrl,
  } from "$lib/utils/cookiesNavigation";

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

    // Modal/blocking props
    modalMode?: boolean;
    overlayOpacity?: number;
    transitionDuration?: number;

    // Demo/isolation props
    demoMode?: boolean;
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
    modalMode = false,
    overlayOpacity = 0.1,
    transitionDuration = 600,
    demoMode = false,
  }: CookieBannerProps = $props();

  // Banner state management
  let bannerVisible = $state(true);
  let currentMessage = $state<"initial" | "accepted" | "rejected">("initial");
  let consentMode = $state<ConsentMode | null>(null);
  let isModalPhase = $state(true); // Tracks if we're in the blocking modal phase
  let hasUserInteracted = $state(false); // Tracks if user has made a choice

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
    if (!browser || demoMode) return null;

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
    if (!browser || demoMode) return;

    try {
      localStorage.setItem("consentMode", JSON.stringify(consent));
    } catch (e) {
      console.error("Error saving consent to localStorage:", e);
    }
  }

  // Check if banner should be hidden
  function isBannerHidden(): boolean {
    if (!browser || demoMode) return false;
    return localStorage.getItem("bannerHidden") === "true";
  }

  // Hide banner permanently
  function hideBanner(): void {
    if (!browser || demoMode) {
      // In demo mode, just hide the banner without affecting storage
      bannerVisible = false;
      return;
    }
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

    if (!demoMode) {
      gtag("consent", "default", defaultConsent);
    }
    saveConsent(defaultConsent);
    return defaultConsent;
  }

  // Update consent and inform Google Analytics
  function updateConsent(consent: ConsentMode): void {
    if (!demoMode) {
      gtag("consent", "update", consent);
    }
    saveConsent(consent);
    consentMode = consent;

    // Mark that user has interacted and exit modal phase
    hasUserInteracted = true;
    if (modalMode) {
      isModalPhase = false;
    }

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

  // Create wrapper function for demo mode handling
  function handleCookiesNavigation(event: Event): void {
    return handleCookiesNav(event, demoMode);
  }

  // Create the cookies page URL with current query parameters
  let cookiesUrl = $derived(createCookiesUrl(cookiesPageUrl));

  // Determine if banner should show in modal mode
  let showAsModal = $derived(
    modalMode &&
      currentMessage === "initial" &&
      isModalPhase &&
      !hasUserInteracted,
  );

  // Create a transition key to force re-render when transitioning between modes
  let transitionKey = $derived(showAsModal ? "modal" : "standard");

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

      // Only mark as user interacted if they actually made a choice (accepted or rejected)
      // Default denied consent without explicit user choice should still show modal
      if (existingConsent.accepted || existingConsent.rejected) {
        hasUserInteracted = true;
        isModalPhase = false;

        // Set initial message state based on existing consent
        if (existingConsent.accepted) {
          currentMessage = "accepted";
        } else if (existingConsent.rejected) {
          currentMessage = "rejected";
        }
      }
      // If no explicit choice was made, keep isModalPhase = true and hasUserInteracted = false
    } else {
      consentMode = setDefaultConsent();
      // Keep isModalPhase = true and hasUserInteracted = false for new users
    }
  });

  // Handle storage changes (same tab - from cookies page)
  function handleStorageChange(): void {
    if (demoMode) return; // Don't respond to storage changes in demo mode

    const updatedConsent = loadConsent();
    const bannerHidden = isBannerHidden();

    if (bannerHidden) {
      bannerVisible = false;
      return;
    }

    if (updatedConsent) {
      consentMode = updatedConsent;
      gtag("consent", "update", updatedConsent);

      // Only mark as user interacted if they actually made a choice (accepted or rejected)
      if (updatedConsent.accepted || updatedConsent.rejected) {
        hasUserInteracted = true;
        isModalPhase = false;

        if (updatedConsent.accepted) {
          currentMessage = "accepted";
        } else if (updatedConsent.rejected) {
          currentMessage = "rejected";
        }
      }
    }
  }

  // Handle native storage events (cross-tab changes)
  function handleCrossTabStorage(event: StorageEvent): void {
    if (demoMode) return; // Don't respond to storage changes in demo mode

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

{#snippet settingsLink()}
  <a
    href={base + cookiesUrl}
    class="govuk-link"
    onclick={handleCookiesNavigation}
  >
    {changeSettingsText}
  </a>
{/snippet}

{#snippet hideBannerButton()}
  <button
    type="button"
    class="govuk-button"
    data-module="govuk-button"
    onclick={hideBanner}
  >
    {hideMessageText}
  </button>
{/snippet}

{#snippet confirmationMessage(message)}
  <div class="govuk-cookie-banner__message govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <div class="govuk-cookie-banner__content">
          <p class="govuk-body">
            {message}
            {@render settingsLink()}
            at any time.
          </p>
        </div>
      </div>
    </div>
    <div class="govuk-button-group">
      {@render hideBannerButton()}
    </div>
  </div>
{/snippet}

{#snippet initialMessage()}
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
      <a
        href={base + cookiesUrl}
        class="govuk-link"
        onclick={handleCookiesNavigation}
      >
        {viewCookiesText}
      </a>
    </div>
  </div>
{/snippet}

{#if bannerVisible}
  <!-- Modal overlay (only shown when in modal mode and initial phase) -->
  {#if showAsModal}
    <div
      class="cookie-banner-overlay"
      style="background-color: rgba(0, 0, 0, {overlayOpacity});"
      transition:fly={{ duration: transitionDuration, opacity: 0 }}
    ></div>
  {/if}

  <!-- Cookie Banner with key-based transitions -->
  {#key transitionKey}
    <div
      class="govuk-cookie-banner {rebranded ? 'govuk-template--rebranded' : ''}"
      class:cookie-banner--modal={showAsModal}
      class:cookie-banner--standard={!showAsModal}
      data-nosnippet
      role="region"
      aria-label={ariaLabel}
      aria-modal={showAsModal}
      in:fly={{
        duration: transitionDuration * 1.5,
        y: showAsModal ? 150 : -300,
        x: showAsModal ? 0 : 0,
        opacity: 0,
        easing: (t) => t * (2 - t), // easeOut
      }}
      out:fly={{
        duration: transitionDuration,
        y: showAsModal ? -150 : 300,
        x: 0,
        opacity: 0,
        easing: (t) => t * t, // easeIn
      }}
    >
      <!-- Initial consent request message -->
      {#if currentMessage === "initial"}
        {@render initialMessage()}
      {/if}

      <!-- Accepted cookies confirmation message -->
      {#if currentMessage === "accepted"}
        {@render confirmationMessage(acceptedMessage)}
      {/if}

      <!-- Rejected cookies confirmation message -->
      {#if currentMessage === "rejected"}
        {@render confirmationMessage(rejectedMessage)}
      {/if}
    </div>
  {/key}
{/if}

<style>
  .govuk-cookie-banner.govuk-template--rebranded {
    background-color: #f4f8fb;
  }

  /* Modal overlay */
  .cookie-banner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    backdrop-filter: blur(2px);
  }

  /* Modal positioning */
  .cookie-banner--modal {
    position: fixed !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    transition: box-shadow 0.3s ease;
  }

  .cookie-banner--modal:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }

  /* Standard positioning */
  .cookie-banner--standard {
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  /* Ensure modal banner content is properly contained */
  .cookie-banner--modal .govuk-width-container {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 20px;
  }

  /* Responsive adjustments for modal */
  @media (max-width: 768px) {
    .cookie-banner--modal {
      max-width: 95vw;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .cookie-banner--modal .govuk-width-container {
      padding: 15px;
    }
  }

  /* Prevent body scroll when modal is active */
  :global(body:has(.cookie-banner--modal)) {
    overflow: hidden;
  }
</style>
