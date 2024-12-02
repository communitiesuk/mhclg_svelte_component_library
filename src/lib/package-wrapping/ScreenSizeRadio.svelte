<script>
  import { defaultScreenWidthBreakpoints } from '$lib/config.js';
  import { Radio } from 'flowbite-svelte';
  let { demoScreenWidth = $bindable() } = $props();
</script>

<ul
  class="my-4 mx-0 items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600"
  style="min-width: 800px;"
>
  {#each Object.keys(defaultScreenWidthBreakpoints) as screenSizeOption}
    <li class="w-full">
      <Radio
        bind:group={demoScreenWidth}
        name="hor-list"
        class="p-4 text-base"
        value={defaultScreenWidthBreakpoints[screenSizeOption]}
        >{screenSizeOption} ({defaultScreenWidthBreakpoints[
          screenSizeOption
        ]}px)</Radio
      >
    </li>
  {/each}
</ul>
