<script lang="ts">
  // Define component props with types and default values
  let {
    tagText = "Alpha",
    bannerText = "This is a new service. Help us improve it and ",
    linkText = "give your feedback by email",
    linkHref = "#",
    bannerStyle = "",
  } = $props<{
    tagText?: string;
    bannerText?: string;
    linkText?: string;
    linkHref?: string;
    bannerStyle?: string;
  }>();
</script>

<div class="govuk-phase-banner govuk-width-container">
  <p class="govuk-phase-banner__content" style={bannerStyle}>
    <strong class="govuk-tag govuk-phase-banner__content__tag">
      {tagText}
    </strong>
    <span class="govuk-phase-banner__text">
      {bannerText}<a class="govuk-link" href={linkHref}>{linkText}</a>.
    </span>
  </p>
</div>

<style>
</style>
