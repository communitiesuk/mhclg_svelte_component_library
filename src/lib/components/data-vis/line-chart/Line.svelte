<script>
  let { dataArray, lineFunction, color, strokeWidth, opacity, style } =
    $props();
</script>

<path d={lineFunction(dataArray)} fill="none" stroke="black" stroke-width="3px"
></path>
