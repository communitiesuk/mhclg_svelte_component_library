<script>
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import { Radio } from "flowbite-svelte";
  let { demoScreenWidth = $bindable() } = $props();
</script>

<ul
  class="m-0 p-0 items-center w-full rounded-lg flex flex-col divide-x rtl:divide-x-reverse divide-gray-200"
>
  {#each Object.keys(defaultScreenWidthBreakpoints) as screenSizeOption}
    <li class="w-full">
      <Radio
        bind:group={demoScreenWidth}
        name="hor-list"
        class="px-4 py-3 text-base text-[#6b7280]"
        value={defaultScreenWidthBreakpoints[screenSizeOption]}
        >{screenSizeOption} ({defaultScreenWidthBreakpoints[
          screenSizeOption
        ]}px)</Radio
      >
    </li>
  {/each}
</ul>
