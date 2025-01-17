<script>
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  let { dataArray, selectedYear } = $props();
</script>

<TitleAndSubtitle></TitleAndSubtitle>
<table>
  <caption>Data for {selectedYear}</caption>
  <thead>
    <tr>
      {#each Object.keys(dataArray[0]).slice(0, 2) as heading}
        <th scope="col">{heading}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each dataArray as row}
      <tr>
        <td>{row.areaCode}</td>
        <td>{row.y}</td>
      </tr>
    {/each}
  </tbody>
</table>
<Source />

<style>
  table,
  th,
  tr,
  td {
    border: 1px solid black;
  }

  td {
    padding: 10px;
  }
</style>
