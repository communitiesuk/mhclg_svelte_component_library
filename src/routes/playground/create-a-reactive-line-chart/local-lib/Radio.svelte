<script>
  let { options, value = $bindable(), selectedMetric, ...rest } = $props();
</script>

<label>Choose a metric:</label>

<div class="flex flex-col gap-2 mt-2">
  {#each options as option, i}
    <div>
      <input
        bind:group={value}
        type="radio"
        id={option.toLowerCase().replaceAll(" ", "_")}
        name="metric-selection"
        value={option}
        checked={option == selectedMetric}
        {...rest}
      />
      <label for={option.toLowerCase().replaceAll(" ", "_")}>{option}</label>
    </div>
  {/each}
</div>
