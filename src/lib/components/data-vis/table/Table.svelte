<script>
  let { captionText, zebraStriping, numberOfRows, numberOfColumns } = $props();
</script>

<table class="govuk-table" class:zebra={zebraStriping}>
  <caption class="govuk-table__caption govuk-table__caption--m"
    >{captionText}</caption
  >
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      {#each Array(numberOfColumns) as _, j}
        <th scope="col" class="govuk-table__header">Column header {j + 1}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    {#each Array(numberOfRows) as _, i}
      <tr class="govuk-table__row">
        {#each Array(numberOfColumns) as _, j}
          <td class="govuk-table__cell">data cell {i + 1} - {j + 1}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .zebra tbody tr:nth-child(odd) {
    background: #eee;
  }
</style>
