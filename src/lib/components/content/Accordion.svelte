<script lang="ts">
  export let sections: {
    heading: string;
    content: string;
    id: string;
  }[] = [];

  let activeSection: string | null = null;

  function toggleSection(id: string) {
    activeSection = activeSection === id ? null : id;
  }

  function handleKeydown(event: KeyboardEvent, id: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection(id);
    }
  }
</script>

<div
  class="govuk-accordion"
  data-module="govuk-accordion"
  id="accordion-default"
>
  {#each sections as section, index}
    <div
      class="govuk-accordion__section"
      class:govuk-accordion__section--expanded={activeSection === section.id}
    >
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <button
            type="button"
            class="govuk-accordion__section-button"
            id="accordion-default-heading-{index + 1}"
            on:click={() => toggleSection(section.id)}
            on:keydown={(e) => handleKeydown(e, section.id)}
            aria-expanded={activeSection === section.id}
            aria-controls="accordion-default-content-{index + 1}"
          >
            {section.heading}
          </button>
        </h2>
      </div>
      {#if activeSection === section.id}
        <div
          id="accordion-default-content-{index + 1}"
          class="govuk-accordion__section-content"
          role="region"
          aria-labelledby="accordion-default-heading-{index + 1}"
        >
          <p class="govuk-body">{section.content}</p>
        </div>
      {/if}
    </div>
  {/each}
</div>
