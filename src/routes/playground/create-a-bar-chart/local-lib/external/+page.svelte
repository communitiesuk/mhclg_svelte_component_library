<script>
  import Btn from './Btn.svelte';
  import GreenBar from './GreenBar.svelte';

  let arr = $state([40, 20, 30, 10, 60, 50]);

  $inspect(arr);

  // modify the existing array but don't return anything
  function orderArray(anArray) {
    // sorts the object by the y values
    anArray.sort((a, b) => a - b);
    //return anArray.map((element) => element * 2);
    //console.log(anArray.length);
  }
</script>

<Btn onClick={orderArray} buttonContent={'order array'} {arr}></Btn>
<br />

<button onclick={() => console.log(arr)}>console log array</button>

<!-- {#each { length: 5 } as _, i} -->
<svg height="1000">
  {#each arr as _, i}
    {@const barLength = arr[i]}
    {console.log(arr[i])}
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
