<script>
  import { getContext } from "svelte";

  const plot = getContext("plot");
  let ref = $state();

  $effect(() => {
    if (ref) {
      plot.reportMarginBottom(ref.getBBox().height + 10);
    }
  });
</script>

<g bind:this={ref} transform={`translate(0, ${plot.plotHeight})`}>
  <line x1="0" x2={plot.plotWidth} y1="0" y2="0" stroke="black"></line>
  {#each [0, 0.25, 0.5, 0.75, 1] as t}
    <text x={t * plot.plotWidth} y="15" text-anchor="middle" font-size="10">
      {Math.round(t * 100)}
    </text>
  {/each}
</g>
