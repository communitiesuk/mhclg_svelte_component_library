<script>
  import Pill from '$lib/components/content/Pill.svelte';
  import { propPillLookup } from '$lib/config.js';
  import {
    Checkbox,
    Input,
    NumberInput,
    Radio,
    Select,
    Textarea,
  } from 'flowbite-svelte';

  let { source, value = $bindable() } = $props();

  $inspect(source);

  let propPillObject = propPillLookup[source.isProp];

  $inspect(source, propPillObject);
</script>

{#snippet parameterLabel(name, propPillObject, inline = false)}
  <div class="flex flex-row flex-wrap gap-1 mb-{inline ? 0 : 1} items-center">
    <p class="m-0 p-0 text-lg text-black italic" style="font-weight: 500;">
      {source.name}
    </p>
    <Pill
      size="extraSmall"
      textContent={propPillObject.text}
      bgColor={propPillObject.bgColor}
      textColor={propPillObject.textColor}
      borderRadius="15px"
      padding={propPillObject.padding}
    ></Pill>
  </div>
{/snippet}

{#if source.inputType === 'dropdown'}
  {@render parameterLabel(source.name, propPillObject)}
  <Select
    class="text-base"
    items={source.options.map((el) => ({ name: el, value: el }))}
    bind:value
  />
{:else if source.inputType === 'radio'}
  {@render parameterLabel(source.name, propPillObject)}
  {#each source.options as option, i}
    <Radio value={option} bind:group={value}>
      <span class="text-base font-normal">
        {option}
      </span>
    </Radio>
  {/each}
{:else if source.inputType === 'textArea'}
  <div>
    {@render parameterLabel(source.name, propPillObject)}
    <Textarea id="textarea-id" bind:value rows={9} />
  </div>
{:else if source.inputType === 'checkbox'}
  <Checkbox bind:checked={value} color="orange">
    {@render parameterLabel(source.name, propPillObject, true)}
  </Checkbox>
{:else if source.inputType === 'input'}
  {@render parameterLabel(source.name, propPillObject)}
  <Input size="lg" bind:value />
{:else if source.inputType === 'numberInput'}
  {@render parameterLabel(source.name, propPillObject)}
  <NumberInput bind:value />
{/if}
