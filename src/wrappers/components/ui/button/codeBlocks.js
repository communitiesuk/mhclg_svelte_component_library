export const codeBlock1 = `
<script>

    let name = "";
    let confirmed = $state(false);

    function handleSubmit(event) {
      event.preventDefault();
      confirmed = true;
    }

</script>

    <form onsubmit={handleSubmit}>
      <label
        >Enter your name:
        <input type="text" name="username" required /></label
      >
      <Button typeAttribute="submit" textContent="Submit a form"></Button>
    </form>
    {#if confirmed}
      <p style="color: green;">Form submitted successfully!</p>
    {/if}`;
