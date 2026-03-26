<script>
  import CardHeader from "./CardHeader.svelte";

  let {
    headerIsLink = true,
    headerText = "Card header",
    headerTextSize = "1.5rem",
    headerTextColor = "#1D70B8",
    headerBackgroundColor = "white",
    href = undefined,
    onlyTextInBody = true,
    bodyText = "Text in the body of the card",
    headerSnippet = undefined,
    bodySnippet = undefined,
    children = undefined,
    bodyTextColor = "#0B0C0C",
    bodyBackgroundColor = "#FBFCFD",
    bodyTopBorderColor = "#F4F8FB",
    bodyBottomBorderColor = "#c3d9e9",
    selectedValue = $bindable(),
    display = "flex",
    gridPosition = undefined,
    subtitle = undefined,
  } = $props();
</script>

<div class="card" style="display: {display}">
  <div
    class="header-div"
    style="background-color: {headerBackgroundColor}; grid-row: {gridPosition?.[0]
      ?.row ?? null}; grid-column: {gridPosition?.[0]?.col ?? null};"
  >
    {#if headerIsLink}
      <CardHeader
        text={headerText}
        textSize={headerTextSize}
        textColor={headerTextColor}
        backgroundColor={headerBackgroundColor}
        {href}
        {subtitle}
      ></CardHeader>
    {:else}
      {@render headerSnippet?.()}
    {/if}
  </div>

  <div
    class="body-div"
    style="--body-bg-color: {bodyBackgroundColor}; --body-bottom-border-color: {bodyBottomBorderColor}; --body-top-border-color: {bodyTopBorderColor}; grid-row: {gridPosition?.[1]
      ?.row ?? null}; grid-column: {gridPosition?.[1]?.col ?? null};"
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
      {@render bodySnippet?.()}
    {/if}
  </div>
</div>

<style>
  .card {
    flex-direction: column;
    min-width: 0;
  }

  .header-div {
    padding: 20px;
  }

  .body-div {
    background-color: var(--body-bg-color);
    border-bottom: 1px solid var(--body-bottom-border-color);
    border-top: 1px solid var(--body-top-border-color);
    padding: 15px 20px;
    flex: 1;
  }

  .body-text {
    color: var(--body-text-color);
  }
</style>
