<script>
  import { Label, Radio, Select, Textarea } from 'flowbite-svelte';

  let { source, value = $bindable() } = $props();

  
</script>

{#if source.inputType === 'dropdown'}
  <Label>
    {source.name}
    <Select
      class="mt-2"
      items={source.options.map((el) => ({ name: el, value: el }))}
      bind:value
    />
  </Label>
{:else if source.inputType === 'radio'}
  {#each source.options as option, i}
    <Radio value={option} bind:group={value}>{option}</Radio>
  {/each}
{:else if source.inputType === 'textArea'}
  <div>
    <Label for="default-input" class="block mb-2">{source.propName}</Label>
    <Textarea id="textarea-id" bind:value rows={4} />
  </div>
{/if}
<!-- <div style={!parameter.visible ? 'display: none' : ''}></div>
{#if parameter.inputType === 'radio'}
  {#each parameter.options as option, i}
    <Radio value={option} bind:group={parameter.value}>{option}</Radio>
  {/each}
{:else if parameter.inputType === 'dropdown'}
  <Label>
    {parameter.propName}
    <Select
      class="mt-2"
      items={parameter.options.map((el) => ({ name: el, value: el }))}
      bind:value={parameter.value}
    />
  </Label>
{:else if parameter.inputType === 'checkbox'}
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
{/if} -->
