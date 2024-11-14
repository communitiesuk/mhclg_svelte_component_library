<script>
  let { metrics, selectedMetric = $bindable() } = $props();
</script>

<label>Choose a metric:</label>

<div class="flex flex-col gap-2">
  {#each metrics as metric, i}
    <div>
      <input
        bind:group={selectedMetric}
        type="radio"
        id={metric.toLowerCase().replaceAll(' ', '_')}
        name="metric-selection"
        value={metric}
      />
      <label for={metric.toLowerCase().replaceAll(' ', '_')}>{metric}</label>
    </div>
  {/each}
</div>
