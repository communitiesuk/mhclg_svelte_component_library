<script>
  import { Checkbox, Select, Radio, Input, Textarea } from "flowbite-svelte";

  let { parameter, value = $bindable(), boundedValue } = $props();
</script>

{#if parameter.inputType === "binded"}
  {boundedValue}
{:else if parameter.inputType === "checkbox"}
  <div class="flex flex-row justify-center items-center h-full">
    <Checkbox bind:checked={value} color="orange"></Checkbox>
  </div>
{:else if parameter.inputType === "dropdown"}
  <Select
    size="sm"
    class="text-base m-0 px-2 py-1"
    items={parameter.options.map((el) => ({ name: el, value: el }))}
    bind:value
  />
{:else if parameter.inputType === "radio"}
  <div class="flex flex-col gap-2">
    {#each parameter.options as option, i}
      <Radio value={option} bind:group={value}>
        <span class="text-sm">
          {option}
        </span>
      </Radio>
    {/each}
  </div>
{:else if parameter.inputType === "input"}
  <Textarea
    unWrappedClass="m-0 px-2 py-1"
    id="textarea-id"
    bind:value
    rows={parameter.rows ?? 1}
  />
{/if}
