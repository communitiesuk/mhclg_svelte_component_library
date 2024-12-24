<script lang="ts">
  import { browser } from '$app/environment';
  import 'govuk-frontend/dist/govuk/govuk-frontend.min.css';
  import { onMount } from 'svelte';

  // Accept an array of sections as props
  export let sections: {
    heading: string;
    content: string;
    id: string;
  }[] = [];

  let accordionId = 'accordion-' + Math.random().toString(36).substr(2, 9);

  onMount(async () => {
    if (browser) {
      const { initAll } = await import('govuk-frontend');
      initAll();
    }
  });
</script>

<div class="govuk-accordion" data-module="govuk-accordion" id={accordionId}>
  {#each sections as section}
    <div class="govuk-accordion__section">
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <span
            class="govuk-accordion__section-button"
            id="{section.id}-heading"
          >
            {section.heading}
          </span>
        </h2>
      </div>
      <div
        id="{section.id}-content"
        class="govuk-accordion__section-content"
        aria-labelledby="{section.id}-heading"
      >
        <div class="govuk-body">{section.content}</div>
      </div>
    </div>
  {/each}
</div>
