<script lang="ts">
  import { onMount } from "svelte";

  /**
   * Breadcrumbs component
   *
   * Use this component to display a navigation path to the current page.
   *
   * Features:
   * - Set `collapseOnMobile` to true to show only the first and last items on mobile devices
   * - Set `inverse` to true to show white links on dark backgrounds (ensure contrast ratio of 4.5:1)
   * - Customizable items array with text and href properties
   */

  // Define the BreadcrumbItem type
  export type BreadcrumbItem = {
    text: string;
    href: string;
  };

  // Component props
  let {
    items = [],
    collapseOnMobile = false,
    inverse = false,
    ariaLabel = "Breadcrumb",
  } = $props<{
    items: BreadcrumbItem[];
    collapseOnMobile?: boolean;
    inverse?: boolean;
    ariaLabel?: string;
  }>();

  // Add support detection
  let isSupported = $state(false);
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  // Generate the CSS classes
  let cssClasses = $derived(() => {
    let classes = "govuk-breadcrumbs";
    if (collapseOnMobile) classes += " govuk-breadcrumbs--collapse-on-mobile";
    if (inverse) classes += " govuk-breadcrumbs--inverse";
    return classes;
  });
</script>

<nav class={cssClasses} aria-label={ariaLabel}>
  <ol class="govuk-breadcrumbs__list">
    {#each items as item, i}
      <li class="govuk-breadcrumbs__list-item">
        <a class="govuk-breadcrumbs__link" href={item.href}>{item.text}</a>
      </li>
    {/each}
  </ol>
</nav>
