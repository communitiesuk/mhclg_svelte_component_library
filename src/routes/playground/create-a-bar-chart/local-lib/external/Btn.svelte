<script>
  let { buttonContent, onClick, arr } = $props();
</script>

<button on:click={() => onClick(arr)}>{buttonContent}</button>

<style>
  button {
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    border: 2px solid black;
  }
</style>
