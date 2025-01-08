<script>
  import Intermediate from './Intermediate.svelte';
  let squareWidth = 150;
  // this is the parent component
  // there is not data to be passed down and therefore no props is needed
</script>

<!-- we need to say what value of squaredWidth we're using -->
<Intermediate {squareWidth}></Intermediate>
