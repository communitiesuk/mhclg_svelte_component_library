<script>
  import { FolderArrowRightSolid } from "flowbite-svelte-icons";
  import Ticks from "./Ticks.svelte";

  let {
    chartHeight = undefined,
    chartWidth = undefined,
    numberOfTicks = undefined,
    ticksArray = $bindable(),
    axisFunction = undefined,
    values = undefined,
    orientation,
    prefix = undefined,
    suffix = undefined,
    floor = undefined,
    ceiling = undefined,
    yearsInput = undefined,
  } = $props();
</script>

<g
  data-role="{orientation.axis}-axis"
  transform="translate({orientation.position != 'right'
    ? 0
    : chartWidth},{orientation.position === 'bottom' ? chartHeight : 0})"
>
  <line
    x1="0"
    y1="0"
    x2={orientation.axis === "x" ? chartWidth : 0}
    y2={orientation.axis === "y" ? chartHeight : 0}
    stroke="black"
    stroke-width="2px"
  ></line>
  {#key numberOfTicks}
    <Ticks
      bind:ticksArray
      {chartWidth}
      {chartHeight}
      {axisFunction}
      {values}
      {numberOfTicks}
      {orientation}
      {floor}
      {ceiling}
      {yearsInput}
      {suffix}
      {prefix}
    ></Ticks>
  {/key}
</g>
