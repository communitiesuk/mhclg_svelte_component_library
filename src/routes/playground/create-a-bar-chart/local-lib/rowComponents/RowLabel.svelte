<script>
  let { label } = $props();
  let labelWidth = label?.length;
</script>

<text transform="translate (-10)" font-size={labelWidth > 24 ? '14px' : '24px'}
  >{label}</text
>

<style>
  text {
    text-anchor: end;
    dominant-baseline: middle;
  }
</style>
