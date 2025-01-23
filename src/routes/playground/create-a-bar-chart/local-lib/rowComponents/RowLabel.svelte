<script>
  let { row, barHeight } = $props();
</script>

<g transform="translate({-10},{barHeight/2})">
  <text dominant-baseline="central" text-anchor="end">{row.areaName}</text>
</g>
