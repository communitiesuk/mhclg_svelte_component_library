<script>
  let {
    linkCard = true,
    linkText = undefined,
    href = undefined,
    chevronSrc = "/assets/images/ons-icon-chevron-small.svg",
    bodyText = undefined,
    callToActionBackgroundColor = "white",
    bodyBackgroundColor = "#FBFCFD",
    bottomBorderColor = "#c3d9e9",
  } = $props();
</script>

<div class="card" style="border-bottom: 1px solid {bottomBorderColor};">
  <div
    class="call-to-action"
    style="background-color: {callToActionBackgroundColor};"
  >
    {#if linkCard}
      <div
        class="link"
        style="display: flex; align-items: center; justify-content: space-between;"
      >
        <span class="govuk-heading-m">
          <a {href} class="govuk-link">{linkText}</a>
        </span>
        <img src={chevronSrc} alt="Chevron icon" class="chevron" />
      </div>
    {:else}
      <div>A different call to action</div>
    {/if}
  </div>

  <div class="body" style="background-color: {bodyBackgroundColor};">
    {bodyText}
  </div>
</div>

<style>
  .call-to-action {
    padding: 15px 20px;
  }

  .chevron {
    width: 20px;
    height: 20px;
  }

  .body {
    padding: 20px 15px;
  }

  .govuk-heading-m {
    /* overwriting margin and line-height to make link centered vertically */
    margin: 0;
    line-height: 1;
  }
</style>
