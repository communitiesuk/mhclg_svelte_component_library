<script>
  import Base from './Base.svelte';
  // we're using the variable squared width here too
  let { squareWidth } = $props();
</script>

<!--
    squaredWidth = {squareWidth}
-->
<Base {squareWidth}></Base>
