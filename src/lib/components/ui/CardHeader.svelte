<script>
  let {
    text = "Card header",
    fontSize = "1.5rem",
    textColor = "#1D70B8",
    backgroundColor = "white",
  } = $props();
</script>

<a
  class="govuk-heading-m link"
  href="/"
  style="font-size: {fontSize}; color: {textColor}; background-color: {backgroundColor}"
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

<style>
  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
