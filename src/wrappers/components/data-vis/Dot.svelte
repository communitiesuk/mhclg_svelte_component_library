<script>
  import { getContext, onMount } from "svelte";

  let { data, x, y } = $props();
  const plot = getContext("plot");

  onMount(() => {
    const unregister = plot.registerData({
      xValues: data.map((d) => d[x]),
      yValues: data.map((d) => d[y]),
    });
    return unregister;
  });
</script>

{#each data as d}
  <circle cx={plot.xScale(d[x])} cy={plot.yScale(d[y])} r="4" fill="steelblue"
  ></circle>
{/each}
