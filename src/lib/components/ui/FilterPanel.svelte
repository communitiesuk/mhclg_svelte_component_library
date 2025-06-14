<script lang="ts">
  // Based on GOV.UK Finder Frontend
  // Original: https://github.com/alphagov/finder-frontend

  import Radios from "./Radios.svelte";
  import CheckBox from "./CheckBox.svelte";
  import Select from "./Select.svelte";
  import DateInput from "./DateInput.svelte";

  interface FilterOption {
    value: string;
    label: string;
    id?: string; // Optional, can be generated
    checked?: boolean;
  }

  interface BaseSection {
    id: string; // for unique key in #each, and details element id
    title: string;
    ga4Section: string; // For data-ga4-section
    ga4IndexSection: number;
    ga4IndexSectionCount: number;
    openByDefault?: boolean; // To control if the details section is open by default
  }

  interface RadioSection extends BaseSection {
    type: string;
    name: string;
    legend: string;
    options: FilterOption[];
    selectedValue?: string;
  }

  interface DateSection extends BaseSection {
    type: string;
    fromLegend: string;
    fromNamePrefix: string; // e.g., "public_timestamp[from]"
    fromHint?: string;
    fromInitialValue?: { day?: string; month?: string; year?: string };
    toLegend: string;
    toNamePrefix: string; // e.g., "public_timestamp[to]"
    toHint?: string;
    toInitialValue?: { day?: string; month?: string; year?: string };
  }

  interface SelectOption extends FilterOption {
    disabled?: boolean;
  }

  interface SelectField {
    id: string;
    name: string;
    label: string;
    options: SelectOption[];
    value?: string;
    fullWidth?: boolean;
    disabled?: boolean;
  }
  interface SelectSection extends BaseSection {
    type: string;
    selects: SelectField[];
  }

  interface CheckboxSection extends BaseSection {
    type: string;
    name: string; // e.g., "content_purpose_supergroup[]"
    legend: string;
    options: FilterOption[];
    selectedValues?: string[];
  }

  type Section = RadioSection | DateSection | SelectSection | CheckboxSection;

  let {
    resultsCount = "0 results",
    sectionsData = [] as Section[],
    filterButtonText = "Filter and sort",
    applyButtonText = "Apply",
    // GA4 related props
    ga4BaseEvent = { event_name: "select_content", type: "finder" },
  } = $props<{
    resultsCount?: string;
    sectionsData?: Section[];
    filterButtonText?: string;
    applyButtonText?: string;
    ga4BaseEvent?: Record<string, any>;
  }>();

  let sections = $derived(sectionsData);

  // Call $props.id() once at the top level
  const componentId = $props.id();

  let panelOpen = $state(true);
  // Use the stored componentId to create other IDs
  const panelId = `filter-panel-${componentId}`;
  const filterButtonId = `filter-button-${componentId}`;

  function togglePanel() {
    panelOpen = !panelOpen;
  }

  function getGa4Event(customData: Record<string, any>) {
    return JSON.stringify({ ...ga4BaseEvent, ...customData });
  }

  // Helper to create items for DateInput, now including spellcheck attribute
  function createDateInputItems(
    initialValues: { day?: string; month?: string; year?: string } | undefined,
  ) {
    return [
      {
        name: "day",
        label: "Day",
        value: initialValues?.day,
        attributes: { spellcheck: "false" },
      },
      {
        name: "month",
        label: "Month",
        value: initialValues?.month,
        attributes: { spellcheck: "false" },
      },
      {
        name: "year",
        label: "Year",
        value: initialValues?.year,
        attributes: { spellcheck: "false" },
      },
    ];
  }
</script>

<div data-module="filter-panel ga4-event-tracker" class="app-c-filter-panel">
  <div class="app-c-filter-panel__header">
    <button
      id={filterButtonId}
      class="app-c-filter-panel__button govuk-link"
      aria-expanded={panelOpen}
      aria-controls={panelId}
      onclick={togglePanel}
      data-ga4-expandable=""
      data-ga4-event={getGa4Event({
        section: filterButtonText,
        text: filterButtonText,
        index_section: 0,
        index_section_count: sections.length,
      })}
    >
      <span class="app-c-filter-panel__button-inner">{filterButtonText}</span>
    </button>
    <h2 id="js-result-count" class="app-c-filter-panel__count">
      {resultsCount}
    </h2>
  </div>

  {#if panelOpen}
    <div
      class="app-c-filter-panel__content"
      id={panelId}
      role="region"
      aria-labelledby={filterButtonId}
    >
      {#each sections as section (section.id)}
        <details
          data-ga4-index={JSON.stringify({
            index_section: section.ga4IndexSection,
            index_section_count: section.ga4IndexSectionCount,
          })}
          data-module="filter-section"
          data-ga4-section={section.ga4Section}
          data-ga4-filter-parent={section.ga4Section}
          data-ga4-change-category={`update-filter ${section.type === "radios" || section.type === "checkboxes" ? section.type.slice(0, -2) : section.type}`}
          class="app-c-filter-section {section.type === 'select' &&
          section.title === 'Topic'
            ? 'js-all-content-finder-taxonomy-select'
            : ''}"
          open={section.openByDefault === undefined
            ? true
            : section.openByDefault}
        >
          <summary
            class="app-c-filter-section__summary"
            data-ga4-expandable=""
            data-ga4-event={getGa4Event({
              section: section.ga4Section,
              text: section.ga4Section,
              index_section: section.ga4IndexSection,
              index_section_count: section.ga4IndexSectionCount,
            })}
          >
            <h2 class="app-c-filter-section__summary-heading">
              {#if section.type !== "radios"}
                <span class="govuk-visually-hidden">Filter by</span>{/if}
              {section.title}
            </h2>
          </summary>
          <div class="app-c-filter-section__content">
            {#if section.type === "radios"}
              {@const radioData = section}
              <div class="govuk-form-group govuk-!-margin-bottom-2">
                <Radios
                  name={radioData.name}
                  legend={radioData.legend}
                  legendSize="m"
                  isPageHeading={false}
                  options={radioData.options.map((opt) => ({ ...opt }))}
                  selectedValue={radioData.selectedValue}
                  small={true}
                />
              </div>
            {:else if section.type === "date"}
              {@const dateData = section}
              <div data-ga4-section="Updated after">
                <DateInput
                  id={`${dateData.id}-from`}
                  namePrefix={dateData.fromNamePrefix}
                  items={createDateInputItems(dateData.fromInitialValue)}
                  fieldset={{
                    legend: { text: dateData.fromLegend, isPageHeading: false },
                  }}
                  hint={{ text: dateData.fromHint }}
                  legendSize={undefined}
                />
              </div>
              <div data-ga4-section="Updated before">
                <DateInput
                  id={`${dateData.id}-to`}
                  namePrefix={dateData.toNamePrefix}
                  items={createDateInputItems(dateData.toInitialValue)}
                  fieldset={{
                    legend: { text: dateData.toLegend, isPageHeading: false },
                  }}
                  hint={{ text: dateData.toHint }}
                  legendSize={undefined}
                />
              </div>
            {:else if section.type === "select"}
              {@const selectData = section}
              {#each selectData.selects as sel, selIdx (sel.id)}
                <div
                  class={`govuk-form-group gem-c-select ${selIdx === 1 ? "js-required" : ""}`}
                  style={selIdx === 1 ? "display: block;" : undefined}
                  data-ga4-section={selIdx === 1 ? sel.label : undefined}
                >
                  <Select
                    id={sel.id}
                    name={sel.name}
                    label={sel.label}
                    items={sel.options.map((opt) => ({
                      value: opt.value,
                      text: opt.label,
                      disabled: opt.disabled,
                    }))}
                    value={sel.value}
                    fullWidth={sel.fullWidth}
                    labelIsPageHeading={false}
                  />
                </div>
              {/each}
            {:else if section.type === "checkboxes"}
              {@const checkboxData = section}
              <div
                id={`checkboxes-${checkboxData.id}`}
                data-module="gem-checkboxes govuk-checkboxes"
                class="gem-c-checkboxes govuk-form-group govuk-checkboxes--small"
              >
                <CheckBox
                  name={checkboxData.name}
                  legend={checkboxData.legend}
                  legendSize="m"
                  isPageHeading={false}
                  options={checkboxData.options.map((opt) => ({ ...opt }))}
                  selectedValues={checkboxData.selectedValues}
                  small={true}
                />
              </div>
            {/if}
          </div>
        </details>
      {/each}

      <div class="app-c-filter-panel__actions">
        <input
          type="submit"
          value={applyButtonText}
          class="govuk-button app-c-filter-panel__action app-c-filter-panel__action--submit"
          data-ga4-event={getGa4Event({
            text: applyButtonText,
            section: filterButtonText,
            action: "apply",
            index_section: 0,
            index_section_count: sections.length,
          })}
          data-disable-with={applyButtonText}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  /* Test comment to see if line 1 error changes */
  .app-c-filter-panel {
    padding-top: 15px;
    margin-bottom: 10px;
  }

  .app-c-filter-panel__content {
    background-color: #f3f2f1;
    padding: 0 15px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .app-c-filter-panel__content .govuk-checkboxes__label::before,
  .app-c-filter-panel__content .govuk-radios__label::before {
    background-color: #fff;
  }

  .app-c-filter-panel__header {
    display: flex;
    flex-wrap: wrap;
    place-content: space-between;
    align-items: baseline;
    gap: 10px;
  }

  .app-c-filter-panel__count {
    margin: 0;
    color: #505a5f;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
  }

  @media print {
    .app-c-filter-panel__count {
      font-family: sans-serif;
    }
  }

  @media print {
    .app-c-filter-panel__count {
      font-size: 14pt;
      line-height: 1.2;
    }
  }

  .app-c-filter-panel__button {
    background-color: rgba(0, 0, 0, 0);
    color: #1d70b8;
    text-decoration: none;
    border-style: none;
    padding-left: 0;
    cursor: pointer;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  /* General style for the button's pseudo-element, including margin */
  .app-c-filter-panel__button::before {
    margin: 0 10px 5px 0;
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 10px;
    left: 5px;
    position: relative;
    vertical-align: middle;
    width: 10px;
    border-color: initial;
    clip-path: unset;
  }

  @media print {
    .app-c-filter-panel__button {
      font-family: sans-serif;
    }
  }

  @media print {
    .app-c-filter-panel__button {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  .app-c-filter-panel__button[aria-expanded="true"]::before {
    /* Down arrow when expanded */
    -webkit-transform: translateY(30%) rotate(-45deg) scale(1);
    -ms-transform: translateY(30%) rotate(-45deg) scale(1);
    transform: translateY(30%) rotate(-45deg) scale(1);
  }
  .app-c-filter-panel__button[aria-expanded="false"]::before {
    /* Up/Right arrow when collapsed - to match image */
    -webkit-transform: translateY(-25%) rotate(135deg) scale(1);
    -ms-transform: translateY(-25%) rotate(135deg) scale(1);
    transform: translateY(-25%) rotate(135deg) scale(1);
  }

  .app-c-filter-panel__button:hover .app-c-filter-panel__button-inner {
    text-decoration: underline;
    text-decoration-thickness: max(1px, 0.0625rem);
    text-underline-offset: 0.1578em;
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none;
  }

  .app-c-filter-panel__button:focus,
  .app-c-filter-panel__button:focus-visible {
    text-decoration: none;
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none;
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .app-c-filter-panel__button:focus .app-c-filter-panel__button-inner,
  .app-c-filter-panel__button:focus-visible .app-c-filter-panel__button-inner {
    text-decoration: none;
  }

  .app-c-filter-panel__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
  }

  .app-c-filter-panel__action--submit {
    flex: 2 0 60%;
    margin-bottom: 0;
  }

  .app-c-filter-panel__action--reset {
    flex: 1 0 30%;
    white-space: nowrap;
    padding: 5px 0;
    text-align: center;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  @media print {
    .app-c-filter-panel__action--reset {
      font-family: sans-serif;
    }
  }

  @media print {
    .app-c-filter-panel__action--reset {
      font-size: 14pt;
      line-height: 1.15;
    }
  }
  .app-c-filter-section {
    border-bottom: 1px solid #b1b4b6;
  }

  .app-c-filter-section:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .app-c-filter-section:first-child {
    margin-top: 0;
  }

  .app-c-filter-section[open] .app-c-filter-section__summary::before {
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 10px;
    left: 5px;
    position: relative;
    vertical-align: middle;
    width: 10px;
    border-color: initial;
    clip-path: unset;
    -webkit-transform: translateY(-25%) rotate(135deg) scale(1);
    -ms-transform: translateY(-25%) rotate(135deg) scale(1);
    transform: translateY(-25%) rotate(135deg) scale(1);
    -webkit-transform: translateY(30%) rotate(-45deg) scale(1);
    -ms-transform: translateY(30%) rotate(-45deg) scale(1);
    transform: translateY(30%) rotate(-45deg) scale(1);
  }

  .app-c-filter-section__summary {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    color: #0b0c0c;
    list-style: none;
    padding: 5px 0;
    min-height: 66.5px;
  }

  .app-c-filter-section__summary::before {
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    display: inline-block;
    height: 10px;
    left: 5px;
    position: relative;
    vertical-align: middle;
    width: 10px;
    border-color: initial;
    clip-path: unset;
    -webkit-transform: translateY(-25%) rotate(135deg) scale(1);
    -ms-transform: translateY(-25%) rotate(135deg) scale(1);
    transform: translateY(-25%) rotate(135deg) scale(1);
  }

  .app-c-filter-section__summary::marker,
  .app-c-filter-section__summary::-webkit-details-marker {
    display: none;
  }

  .app-c-filter-section__summary:hover .app-c-filter-section__summary-heading {
    text-decoration: underline;
    text-decoration-thickness: max(1px, 0.0625rem);
    text-underline-offset: 0.1578em;
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none;
  }

  .app-c-filter-section__summary:focus .app-c-filter-section__summary-heading {
    background-color: #fd0;
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .app-c-filter-section__summary:focus-visible {
    outline: none;
  }

  .app-c-filter-section__summary-heading {
    margin-left: 15px;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  @media print {
    .app-c-filter-section__summary-heading {
      font-family: sans-serif;
    }
  }

  @media print {
    .app-c-filter-section__summary-heading {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  .app-c-filter-section__summary-status {
    padding-right: 5px;
    flex-grow: 1;
    text-align: right;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
  }

  @media print {
    .app-c-filter-section__summary-status {
      font-family: sans-serif;
    }
  }

  @media print {
    .app-c-filter-section__summary-status {
      font-size: 14pt;
      line-height: 1.2;
    }
  }
</style>
