<script>
  let { row } = $props();
</script>

<g transform="translate(-15,7)">
  <text text-anchor="end" fill={row.color ?? "black"} stroke="none"
    >{row.label}
  </text>
</g>
