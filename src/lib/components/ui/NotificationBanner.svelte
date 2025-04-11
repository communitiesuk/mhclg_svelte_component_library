<script lang="ts">
  import type { Snippet } from "svelte";

  // Define component props with types and default values
  let {
    type = "neutral" as "neutral" | "outcome",
    title = undefined as string | undefined,
    content = undefined as string | Snippet | undefined,
    additionalContentHeading = undefined as string | undefined,
    titleId = "govuk-notification-banner-title",
    linkText = undefined as string | undefined,
    linkHref = undefined as string | undefined,
    titleHeadingLevel = "h2" as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  } = $props<{
    type?: "neutral" | "outcome";
    title?: string;
    content: string | Snippet;
    additionalContentHeading?: string;
    titleId?: string;
    linkText?: string;
    linkHref?: string;
    titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>();

  // Determine the title text based on type if not explicitly provided
  let displayTitle = $derived(
    title || (type === "outcome" ? "Success" : "Important"),
  );

  // Determine the role based on type
  let displayRole = $derived(type === "outcome" ? "alert" : "region");
</script>

<div
  class="govuk-notification-banner {type === 'outcome'
    ? 'govuk-notification-banner--success'
    : ''}"
  role={displayRole}
  aria-labelledby={titleId}
  data-module="govuk-notification-banner"
>
  <div class="govuk-notification-banner__header">
    <svelte:element
      this={titleHeadingLevel}
      class="govuk-notification-banner__title"
      id={titleId}
    >
      {displayTitle}
    </svelte:element>
  </div>
  <div class="govuk-notification-banner__content">
    <!-- Block 1: Runs if additionalContentHeading is present -->
    {#if additionalContentHeading}
      <h3 class="govuk-notification-banner__heading">
        {additionalContentHeading}
        <!-- Render link inside h3 if provided -->
        {#if linkText && linkHref}
          <a class="govuk-notification-banner__link" href={linkHref}>
            {linkText}</a
          >
        {/if}
      </h3>
      <!-- Render content prop (body or snippet) -->
      {#if typeof content === "string"}
        <p class="govuk-body">{content}</p>
      {:else}
        <!-- Assumes content is a snippet if not a string -->
        {@render content()}
      {/if}
      <!-- Block 2: Runs if additionalContentHeading is NOT present AND content is a string -->
    {:else if typeof content === "string"}
      <p class="govuk-notification-banner__heading">
        {content}
        <!-- Render link inside p if provided -->
        {#if linkText && linkHref}
          <a class="govuk-notification-banner__link" href={linkHref}>
            {linkText}</a
          >
        {/if}
      </p>
      <!-- Block 3: Runs if additionalContentHeading is NOT present AND content is a snippet -->
    {:else if content}
      {@render content()} <!-- No link rendered here -->
    {/if}
  </div>
</div>

<style>
</style>
