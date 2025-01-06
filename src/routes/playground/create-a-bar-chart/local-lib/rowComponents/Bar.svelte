<script>
  let { row, xFunction} = $props();

</script>

<rect width={xFunction(row.y)} height={10} />
