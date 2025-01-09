<script>
  let { label } = $props();
</script>

<text transform="translate (-10)">{label}</text>

<style>
  text {
    text-anchor: end;
    dominant-baseline: middle;
  }
</style>
