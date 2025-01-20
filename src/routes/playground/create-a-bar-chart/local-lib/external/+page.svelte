<script>
  import TextBar from './TextBar.svelte';

  let arr = $state([40, 20, 30, 10, 60, 50]);

  // modify the existing array but don't return anything
  function ascending(anArray) {
    anArray.sort((a, b) => a - b);
  }
  function descending(anArray) {
    anArray.sort((a, b) => b - a);
  }
</script>

<g>
  <TextBar></TextBar>
</g>

<Btn onClick={ascending} buttonContent={'ascending'} {arr}></Btn>
<br />
<Btn onClick={descending} buttonContent={'descending'} {arr}></Btn>
<br />

<svg height="1000">
  {#each arr as _, i}
    {@const barLength = arr[i]}
    <g transform="translate(0,{i * 50})">
      <GreenBar {barLength}></GreenBar>
    </g>
  {/each}
</svg>

<style>
  button {
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    border: 2px solid black;
  }
</style>
