<script>
  let {
    headingIsLink = true,
    onlyTextInBody = true,
    linkText = undefined,
    bodyText = undefined,
    cardTopSnippet = undefined,
    cardBottomSnippet = undefined,
    children = undefined,
    linkTextColor = "#1D70B8",
    bodyTextColor = "#0B0C0C",
    callToActionBackgroundColor = "white",
    bodyBackgroundColor = "#FBFCFD",
    bodyTopBorderColor = "#F4F8FB",
    bodyBottomBorderColor = "#c3d9e9",
    href = undefined,
    selectedValue = $bindable(),
  } = $props();
</script>

<div class="card">
  <div
    class="call-to-action"
    style="background-color: {callToActionBackgroundColor};"
  >
    {#if headingIsLink}
      <h2 class="link-heading govuk-heading-m">
        <a
          class="govuk-link link"
          {href}
          style="--link-text-color: {linkTextColor}"
        >
          {linkText}
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
              fill={linkTextColor}
            ></path>
          </svg>
        </a>
      </h2>
    {:else}
      {@render cardTopSnippet()}
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
      {@render cardBottomSnippet()}
    {/if}
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
  }

  .call-to-action {
    padding: 15px 20px;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .link-heading {
    color: var(--link-text-color);
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
