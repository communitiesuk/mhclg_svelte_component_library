<script>
  import Btn from './Btn.svelte';
  import Circle from './Circle.svelte';

  function printInConsole(a) {
    console.log(a);
  }

  let arr = [
    { name: 'John', age: 25 },
    { name: 'Pete', age: 30 },
    { name: 'Mary', age: 28 },
  ];

  console.log(arr[0].age);

  $inspect(arr);

  // modify the existing array
  // don't return anything
  function orderArray(anArray) {
    // sorts the object by the y values
    anArray.sort((a, b) => b.age - a.age);
  }
</script>

<Btn></Btn>
<br />
<button onclick={() => orderArray(arr)}>button</button>

<br />

<button onclick={() => console.log(arr)}>button</button>

<svg height="500">
  {#each { length: 5 } as _, i}
    {console.log(arr[i])}
    <g transform="translate(0,{i * 50})">
      <Circle barLength={i * 20}></Circle>
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
