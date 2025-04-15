<script>
  import Button from "$lib/components/ui/Button.svelte";

  let buttonStatus = $state(false);

  // function trackClick() {
  //     buttonStatus = true
  // }
</script>

<Button
  textContent="Click me"
  buttonType="default"
  trackClick={() => (buttonStatus = true)}
></Button>

<div>
  {buttonStatus}
</div>
