<script>
  let {
    text = "Card header",
    textSize = "1.5rem",
    textColor = "#1D70B8",
    backgroundColor = "white",
    href = undefined,
    subtitle = undefined,
  } = $props();
</script>

<a
  class="link govuk-heading-m"
  {href}
  style="font-size: {textSize}; color: {textColor}; background-color: {backgroundColor}; margin: {subtitle ??
    0}"
>
  {text}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 10 17"
    aria-hidden="true"
  >
    <path
      d="M6.21622 8.5L0 2.36667L1.89189 0.5L10 8.5L1.89189 16.5L0 14.6333L6.21622 8.5Z"
      fill="currentColor"
    ></path>
  </svg>
</a>
{#if subtitle !== undefined}
  <p>{subtitle}</p>{/if}

<style>
  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }
  p {
    color: #666;
  }
</style>
