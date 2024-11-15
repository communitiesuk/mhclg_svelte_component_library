<script>
  let { data, selectedMetric } = $props();
  $inspect(data);
  $inspect(selectedMetric);
  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allValues = $derived(flatData.map((el) => el.Value));

  $inspect(flatData);
  $inspect(allValues);

  // let minValue = Math.min(...dataFlat.map((d) => d.yearInt));
  //$inspect(flatData);
  let xDomain = 'o';
</script>

<div>
  {#if data}
    <svg width="600" height="600">
      <line
        x1={100}
        x2={100}
        y1={300}
        y2={100}
        stroke={'black'}
        stroke-width="2px"
      ></line>
    </svg>
  {/if}
</div>
