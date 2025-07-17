<script>
  let {
    componentNameProp = undefined,
    textProp = undefined,
    numberProp = undefined,
    checkboxProp = false,
    dropdownProp = undefined,
    radioProp = undefined,
    jsObjectProp = [],
    functionProp = undefined,
    deprivationData,
    lsoa,
  } = $props();

  $inspect(deprivationData);

  const range = Array.from({ length: 10 }, (_, i) => i + 1);

  let imdDecile = deprivationData.find((el) => el.LSOA === lsoa).IMDdecile;

  $inspect(imdDecile);
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  <div class="chart-container">
    {#each range as number}
      {#if number === imdDecile}
        <svg width="50" height="50"
          ><rect width="50" height="50" fill="blue"></rect></svg
        >
      {:else}
        <svg width="50" height="50"
          ><rect width="50" height="50" fill="red"></rect></svg
        >{/if}
    {/each}
  </div>
</div>

<style>
  .chart-container {
    display: flex;
  }
</style>
