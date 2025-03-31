<script>
  import { tick } from "svelte";
  import Ticks from "../rowComponents/Ticks.svelte";
  let { chartHeight, chartWidth, yFunction } = $props();
</script>

<g data-role="x-axis">
  <text
    transform="translate({chartWidth / 2}, -30)"
    text-anchor="middle"
    font-size="16"
    fill="black"
  >
    Metric(%)
  </text>

  <!-- First part of the axis -->
  <path
    transform="translate({yFunction(0)},0)"
    d="M0 0 l0 {chartHeight}"
    stroke="black"
    stroke-width="2px"
  ></path>
</g>

<g data-role="y-axis">
  <path d="M0 0 l{chartWidth + 1} 0" stroke="black" stroke-width="2px"></path>
</g>
