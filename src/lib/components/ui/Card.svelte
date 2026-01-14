<script>
  let {
    headerIsLink = true,
    headerText = "Card heading",
    headerSize = "m",
    href = undefined,
    onlyTextInBody = true,
    bodyText = "Text in the body of the card",
    headerSnippet = undefined,
    bodySnippet = undefined,
    children = undefined,
    headerTextColor = "#1D70B8",
    bodyTextColor = "#0B0C0C",
    headerBackgroundColor = "white",
    bodyBackgroundColor = "#FBFCFD",
    bodyTopBorderColor = "#F4F8FB",
    bodyBottomBorderColor = "#c3d9e9",
    selectedValue = $bindable(),
  } = $props();
</script>

<div class="card">
  <div class="header-div" style="background-color: {headerBackgroundColor};">
    {#if headerIsLink}
      <h2 class="link-heading govuk-heading-{headerSize}">
        <a class="govuk-link link" {href} style="color: {headerTextColor}">
          {headerText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            viewBox="0 0 10 17"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.21622 8.5L0 2.36667L1.89189 0.5L10 8.5L1.89189 16.5L0 14.6333L6.21622 8.5Z"
              fill={headerTextColor}
            ></path>
          </svg>
        </a>
      </h2>
    {:else}
      {@render headerSnippet()}
    {/if}
  </div>

  <div
    class="body-div"
    style="--body-bg-color: {bodyBackgroundColor}; --body-bottom-border-color: {bodyBottomBorderColor}; --body-top-border-color: {bodyTopBorderColor};"
  >
    {#if onlyTextInBody}
      <p
        class="govuk-body body-text"
        style="--body-text-color: {bodyTextColor};"
      >
        {bodyText}
      </p>
    {:else if children}
      {@render children?.()}
    {:else}
      {@render bodySnippet()}
    {/if}
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
  }

  .header-div {
    padding: 15px 20px;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .body-div {
    background-color: var(--body-bg-color);
    border-bottom: 1px solid var(--body-bottom-border-color);
    border-top: 1px solid var(--body-top-border-color);
    padding: 10px 20px 15px 20px;
    flex: 1;
  }

  .body-text {
    color: var(--body-text-color);
  }

  .govuk-heading-m {
    margin: 0;
    line-height: 1;
  }

  a {
    color: #1d70b8;
  }
</style>
