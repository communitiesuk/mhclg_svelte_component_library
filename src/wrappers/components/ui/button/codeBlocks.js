export const codeBlock1 = `
<Button textContent="Click me" buttonType="default"></Button>`;

export const codeBlock2 = `
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

export const codeBlock3 = `
<Button textContent="Start" buttonType="start"></Button>`;

export const codeBlock4 = `
<Button buttonType="moreInfo"></Button>`;

export const codeBlock5 = `
<Button
buttonType="default"
onClickFunction={function () {
  console.log("Button clicked");
}}
></Button>`;
