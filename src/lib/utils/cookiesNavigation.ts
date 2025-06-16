import { browser } from "$app/environment";

/**
 * Navigate to cookies page while preserving current URL
 *
 * This function handles navigation to the cookies page while preserving the current URL
 * in sessionStorage for potential return navigation. In demo mode, it prevents navigation
 * to avoid disrupting the demo experience.
 *
 * @param event - The navigation event (typically a click event from a link)
 * @param demoMode - Whether the component is in demo mode (defaults to false)
 *                   When true, prevents navigation and calls preventDefault()
 * @returns void
 *
 * @example
 * ```typescript
 * // Basic usage
 * handleCookiesNavigation(clickEvent);
 *
 * // With demo mode enabled
 * handleCookiesNavigation(clickEvent, true);
 * ```
 */
export function handleCookiesNavigation(
  event: Event,
  demoMode: boolean = false,
): void {
  if (!browser) return;

  if (demoMode) {
    // In demo mode, prevent navigation
    event.preventDefault();
    return;
  }

  // Store the current URL in sessionStorage
  sessionStorage.setItem("previousUrl", window.location.href);

  // Let the normal link navigation proceed
  // SvelteKit will handle the navigation
}

/**
 * Create the cookies page URL with current query parameters
 *
 * This function generates a URL for the cookies page that preserves any query parameters
 * from the current page. This ensures that user context (like filters, search terms, etc.)
 * is maintained when navigating to the cookies page.
 *
 * @param cookiesPageUrl - The base URL for the cookies page (defaults to "/cookies-page")
 * @returns The cookies page URL with current query parameters appended
 *
 * @example
 * ```typescript
 * // Using default cookies page URL
 * const url = createCookiesUrl();
 * // Returns: "/cookies-page?param1=value1&param2=value2" (if current page has those params)
 *
 * // Using custom cookies page URL
 * const customUrl = createCookiesUrl("/custom-cookies");
 * // Returns: "/custom-cookies?param1=value1&param2=value2"
 * ```
 */
export function createCookiesUrl(
  cookiesPageUrl: string = "/cookies-page",
): string {
  if (!browser) return cookiesPageUrl;

  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.search;
  return cookiesPageUrl + searchParams;
}
