<script>
  import PostcodeOrAreaSearch from "./PostcodeOrAreaSearch.svelte";

  let {
    cardWidth = "100%",
    linkCard = true,
    linkText = undefined,
    linkTextColor = "#1D70B8",
    href = undefined,
    callToActionBackgroundColor = "white",
    bodyText = undefined,
    bodyTextColor = undefined,
    bodyBackgroundColor = "#FBFCFD",
    bodyTopBorderColor = "#F4F8FB",
    bodyBottomBorderColor = "#c3d9e9",
    selectedValue = $bindable(),
  } = $props();
</script>

<div class="card" style="width: {cardWidth};">
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
          <a {href} class="govuk-link" style="color: {linkTextColor};"
            >{linkText}</a
          >
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
        >
          <path
            d="M6.21622 8.5L0 2.36667L1.89189 0.5L10 8.5L1.89189 16.5L0 14.6333L6.21622 8.5Z"
            fill={linkTextColor}
          ></path>
        </svg>
      </div>
    {:else}
      <PostcodeOrAreaSearch
        bind:selectedValue
        label_text="Search for a postcode"
        hint=""
        placeholder="e.g. SW1A 1AA"
      ></PostcodeOrAreaSearch>
    {/if}
  </div>

  <div
    class="body"
    style="background-color: {bodyBackgroundColor}; color: {bodyTextColor}; border-bottom: 1px solid {bodyBottomBorderColor}; border-top: 1px solid {bodyTopBorderColor};"
  >
    {bodyText}
  </div>
</div>

<style>
  .call-to-action {
    padding: 15px 20px;
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
