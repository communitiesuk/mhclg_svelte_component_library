<script>
  let { text, color } = $props();
</script>

<strong class="govuk-tag trend-tag {color ? `govuk-tag--${color}` : ''}"
  >{text}</strong
>

<style>
  .govuk-tag.trend-tag {
    padding: 0.25rem 0.625rem;
    border-bottom: 2px solid #b1b4b6;
    font-size: 1rem;
  }

  .govuk-tag.trend-tag.govuk-tag--red {
    border-bottom-color: #ff5e5e;
  }
  .govuk-tag.trend-tag.govuk-tag--orange {
    border-bottom-color: #ffaf4a;
  }
  .govuk-tag.trend-tag.govuk-tag--green {
    border-bottom-color: #0fbd54;
  }
  .govuk-tag.trend-tag.govuk-tag--grey {
    border-bottom-color: #b1b4b6;
  }
  .govuk-tag.trend-tag.govuk-tag--white {
    background-color: #fbfbfb;
    border-bottom-color: #cdcdcd;
  }
</style>
