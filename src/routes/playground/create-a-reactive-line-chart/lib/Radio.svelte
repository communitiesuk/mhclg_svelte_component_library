<script>
    let { metrics, selectedMetric = $bindable() } = $props()
</script>

{#each metrics as metric}
<div>
  <input
    type="radio"
    id={metric.toLowerCase().replaceAll(' ', '_')}
    name="metric-selection"
    bind:group={selectedMetric}
    value={metric}
  />
  <label for="recycle-rate">{metric}</label>
</div>
{/each}