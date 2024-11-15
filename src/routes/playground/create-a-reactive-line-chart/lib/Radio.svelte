<script>
  let { manipulatedData, selectedMetric = $bindable() } = $props();
</script>

<div class="radio-container">
  <label>Choose a metric:</label>

  {#each manipulatedData as option, i}
    <div>
      <input
        type="radio"
        id={option.metric.toLowerCase().replaceAll(' ', '-')}
        name="metric-selection"
        value={option.metric}
        checked={i == 0 ? true : false}
        bind:group={selectedMetric}
      />
      <label for={option.metric.toLowerCase().replaceAll(' ', '-')}
        >{option.metric}</label
      >
    </div>
  {/each}
</div>
