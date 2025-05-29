<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
</script>

<svelte:head>
  <title>Component statuses - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn about the different component statuses in the MHCLG Svelte Component Library and what they mean for developers."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Component statuses</h1>

    <p class="govuk-body-l">
      Each component in our library has a status that indicates its development
      stage and readiness for use in production services.
    </p>

    <InsetText>
      {#snippet content()}
        Component statuses help you understand which components are ready for
        production use and which are still in development. This ensures you can
        make informed decisions about which components to use in your projects.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Progress statuses</h2>

    <p class="govuk-body">
      The progress status is shown as a coloured pill next to the component name
      and indicates the overall development stage:
    </p>

    <div class="govuk-!-margin-top-6">
      <div class="status-example">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "To be developed",
            statusRows: [],
          }}
          folder=""
          subFolder=""
          name="ExampleComponent"
          parentFolder="components"
        />
        <p class="govuk-body govuk-!-margin-top-4">
          <strong>To be developed</strong> - This is the initial status when component
          files have been generated but work to build the component has not started.
          The component is not ready for use.
        </p>
      </div>

      <div class="status-example">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "In progress",
            statusRows: [],
          }}
          folder=""
          subFolder=""
          name="ExampleComponent"
          parentFolder="components"
        />
        <p class="govuk-body govuk-!-margin-top-4">
          <strong>In progress</strong> - The component is being built. The full functionality
          has not been completed and it may change in the future. Use with caution
          in production.
        </p>
      </div>

      <div class="status-example">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "Baseline completed",
            statusRows: [],
          }}
          folder=""
          subFolder=""
          name="ExampleComponent"
          parentFolder="components"
        />
        <p class="govuk-body govuk-!-margin-top-4">
          <strong>Baseline completed</strong> - The core functionality has been completed
          and the component is ready for use. Small changes may still occur in the
          future.
        </p>
      </div>

      <div class="status-example">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "In use",
            statusRows: [],
          }}
          folder=""
          subFolder=""
          name="ExampleComponent"
          parentFolder="components"
        />
        <p class="govuk-body govuk-!-margin-top-4">
          <strong>In use</strong> - The component is completed and being used in
          production services. Developers should be mindful of existing uses when
          making changes.
        </p>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Quality indicators</h2>

    <p class="govuk-body">
      Below each component name, you'll see quality indicators showing whether
      the component meets specific criteria. These are displayed as green ticks
      (✓) for completed criteria and red crosses (✗) for incomplete ones.
    </p>

    <div class="govuk-!-margin-top-6">
      <h3 class="govuk-heading-m">Example with quality indicators</h3>

      <div class="status-example">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "Baseline completed",
            statusRows: [
              {
                obj: {
                  Accessible: true,
                  Responsive: true,
                  "Prog. enhanced": false,
                  Reviewed: true,
                  Tested: true,
                },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name="ExampleComponent"
          parentFolder="components"
        />
      </div>

      <h3 class="govuk-heading-m govuk-!-margin-top-6">
        Quality criteria explained
      </h3>

      <div class="quality-criterion">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "",
            statusRows: [
              {
                obj: { Accessible: true },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name=""
          parentFolder="components"
        />
        <div class="criterion-description">
          <strong>Accessible</strong> - The component has been developed with reference
          to WCAG guidelines, checked against our accessibility checklist, and tested
          with screen readers.
        </div>
      </div>

      <div class="quality-criterion">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "",
            statusRows: [
              {
                obj: { Responsive: true },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name=""
          parentFolder="components"
        />
        <div class="criterion-description">
          <strong>Responsive</strong> - The component has been checked against our
          mobile design checklist and tested on multiple mobile devices.
        </div>
      </div>

      <div class="quality-criterion">
        <BaseNameAndStatus
          homepage={true}
          statusObject={{
            progress: "",
            statusRows: [
              {
                obj: { "Prog. enhanced": true },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name=""
          parentFolder="components"
        />
        <div class="criterion-description">
          <strong>Prog. enhanced</strong> - Progressive enhancements have been considered
          and, if appropriate, implemented for this component.
        </div>
      </div>

      <div class="quality-criterion">
        <BaseNameAndStatus
          homepage={true}
          statusObject={{
            progress: "",
            statusRows: [
              {
                obj: { Reviewed: true },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name=""
          parentFolder="components"
        />
        <div class="criterion-description">
          <strong>Reviewed</strong> - The component requirements, functionality,
          and code have been reviewed and approved by the team.
        </div>
      </div>

      <div class="quality-criterion">
        <BaseNameAndStatus
          homepage={false}
          statusObject={{
            progress: "",
            statusRows: [
              {
                obj: { Tested: true },
                visibleOnHomepage: true,
              },
            ],
          }}
          folder=""
          subFolder=""
          name=""
          parentFolder="components"
        />
        <div class="criterion-description">
          <strong>Tested</strong> - The component's use within products or prototyping
          has been tested with real props and approved for production use.
        </div>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      How to interpret statuses
    </h2>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Safe for production</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>
            <strong>Baseline completed</strong> or <strong>In use</strong> status
          </li>
          <li>Green tick for <strong>Accessible</strong></li>
          <li>Green tick for <strong>Responsive</strong></li>
          <li>Green tick for <strong>Reviewed</strong></li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Use with caution</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li><strong>In progress</strong> status</li>
          <li>Missing accessibility or responsive indicators</li>
          <li>Components not yet reviewed or tested</li>
        </ul>
      </div>
    </div>

    <InsetText>
      {#snippet content()}
        When in doubt, contact the design system team for guidance on whether a
        component is suitable for your use case. We're here to help you make the
        right choice for your service.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Next steps</h2>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a href="/components" class="govuk-link">Browse components</a> to see current
        statuses
      </li>
      <li>
        <a href="/get-started" class="govuk-link">Get started</a> with installation
        and setup
      </li>
      <li>
        <a href="/community/contributing" class="govuk-link">Contribute</a> to help
        improve component statuses
      </li>
    </ul>
  </div>
</div>

<style>
  .status-example {
    margin-bottom: 2rem;
    padding: 1rem;
    border-left: 4px solid #b1b4b6;
    background-color: #f3f2f1;
  }

  .quality-criterion {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 2px solid #b1b4b6;
    border-radius: 4px;
  }

  .criterion-description {
    flex: 1;
    min-width: 0;
  }
</style>
