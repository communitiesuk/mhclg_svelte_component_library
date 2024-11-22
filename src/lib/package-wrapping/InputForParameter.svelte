<script>
  import { Checkbox, Label, Textarea } from 'flowbite-svelte';

  let { parameter = $bindable() } = $props();
</script>

{#if parameter.inputType === 'checkbox'}
  <Checkbox bind:checked={parameter.value} color="white"
    >{parameter.propName}</Checkbox
  >
{:else if parameter.inputType === 'textArea'}
  <div>
    <Label for="default-input" class="block mb-2" color="primary"
      >{parameter.propName}</Label
    >
    <Textarea id="textarea-id" bind:value={parameter.value} rows="4" />
  </div>
{/if}
