<script>
  let { buttonText, onClick, dataArray } = $props();
</script>

<button on:click={() => onClick(dataArray)}>{buttonText}</button>

<style>
  * {
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    border: 2px solid black;
  }
</style>
