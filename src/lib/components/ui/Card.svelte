<script>
  import CardHeader from "./CardHeader.svelte";

  let {
    headerIsLink = true,
    text = "Card header",
    fontSize = "1.5rem",
    textColor = "#1D70B8",
    backgroundColor = "white",
    href = undefined,
    onlyTextInBody = true,
    bodyText = "Text in the body of the card",
    headerSnippet = undefined,
    bodySnippet = undefined,
    children = undefined,
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
      <CardHeader {text} {fontSize} {textColor} {backgroundColor} {href}
      ></CardHeader>
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
