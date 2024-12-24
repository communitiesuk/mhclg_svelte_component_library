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
          <span
            class="govuk-accordion__section-button"
            id="accordion-default-heading-{index + 1}"
            on:click={() => toggleSection(section.id)}
            role="button"
            tabindex="0"
          >
            {section.heading}
          </span>
        </h2>
      </div>
      {#if activeSection === section.id}
        <div
          id="accordion-default-content-{index + 1}"
          class="govuk-accordion__section-content"
        >
          <p class="govuk-body">{section.content}</p>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .govuk-accordion {
    margin-bottom: 20px;
  }

  .govuk-accordion__section {
    padding-top: 0;
  }

  .govuk-accordion__section-header {
    padding: 15px;
    border-top: 1px solid #b1b4b6;
  }

  .govuk-accordion__section-heading {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 19px;
    font-weight: 400;
  }

  .govuk-accordion__section-button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0;
    border: 0;
    color: #1d70b8;
    background: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  .govuk-accordion__section-button:hover {
    color: #003078;
    text-decoration: underline;
  }

  .govuk-accordion__section-content {
    padding: 15px;
    padding-left: 15px;
    border-bottom: 1px solid #b1b4b6;
  }

  .govuk-body {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.5;
  }
</style>
