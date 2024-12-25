<script lang="ts">
  import { onMount } from 'svelte';
  import { initAll } from 'govuk-frontend';

  // Accept an array of sections as props
  export let sections: {
    heading: string;
    content: string;
    id: string;
  }[] = [];

  onMount(() => {
    initAll();
  });
</script>

<div
  class="govuk-accordion"
  data-module="govuk-accordion"
  id="accordion-default"
>
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
        <p class="govuk-body">
          {section.content}
        </p>
      </div>
    </div>
  {/each}
</div>
