<script>
  let { xZeroPosition } = $props();
</script>

<svg height="200" width="300" xmlns="http://www.w3.org/2000/svg">
  <line
    x1={xZeroPosition}
    y1="0"
    x2={xZeroPosition}
    y2="600"
    style="stroke:black;stroke-width:1;stroke-dasharray:5,5"
  />
</svg>
