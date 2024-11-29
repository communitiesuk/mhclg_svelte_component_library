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

  let propPillObject = propPillLookup[source.isProp];
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
{:else if source.inputType === 'event'}
  {@render parameterLabel(source.name, propPillObject)}
  <p class="my-2 mx-0 p-0 text-sm text-black">
    The {source.name} event handler has been called {value[0]} time{value[0] ===
    1
      ? ''
      : 's'}{value[1] ? ' (' + value[1] + ')' : ''}.
  </p>
{:else if 'label' in source}
  {@render parameterLabel(source.name, propPillObject)}
{/if}

{#if 'label' in source}
  <p class="my-2 mx-0 p-0 text-sm text-black">{source.label}</p>
  {#if source.exampleCode}
    <p
      class="mt-4 mb-0 mx-0 p-0 break-words text-sm rounded-md"
      style="color: #ba029b"
    >
      <code>{@html source.exampleCode}</code>
    </p>
  {/if}
{/if}
