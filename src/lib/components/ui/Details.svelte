<script>
  let { textColor } = $props();
</script>

<details class="govuk-details" style="color: {textColor}">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">Summary text</span>
  </summary>
  <div class="govuk-details__text">
    This is information that only certain users need to see. It is hidden from
    view by default to make scanning the page easier for the majority of users
    who do not need to see it.
  </div>
</details>
