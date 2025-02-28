<script>
  let { captionText } = $props();
</script>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m"
    >{captionText}</caption
  >
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Local authority</th>
      <th scope="col" class="govuk-table__header govuk-table__header--numeric"
        >Recycling rate</th
      >
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">Stockport</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">56.5%</td>
    </tr>
    <tr class="govuk-table__row">
      <td class="govuk-table__cell">Leeds</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">80%</td>
    </tr>
  </tbody>
</table>
