<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  type Option = { id: string | number; label: string };
  type SelectedWithColor = Option & { color: string };

  // ---------- Props ----------
  let {
    options = [],
    selectedWithColors = $bindable<SelectedWithColor[]>([]),
    colorArray = ["#808080"],
    placeholder = "Select...",
  } = $props();

  let showDropdown = $state(false);
  let search = $state("");

  // ---------- Assign colours to incoming items ----------
  $effect(() => {
    if (!Array.isArray(selectedWithColors)) return;
    if (!colorArray.length) return;

    const used = new Set(
      selectedWithColors.map((s) => s.color).filter(Boolean),
    );
    let changed = false;

    const updated = selectedWithColors.map((item) => {
      if (item.color) return item;
      const color = colorArray.find((c) => !used.has(c)) ?? colorArray[0];
      used.add(color);
      changed = true;
      return { ...item, color };
    });

    if (changed) selectedWithColors = updated;
  });

  // ---------- Compute filtered options ----------
  const filteredOptions = $derived(
    options.filter(
      (o) =>
        !selectedWithColors.some((s) => s.id === o.id) &&
        o.label.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  // ---------- Helpers ----------
  function getFirstAvailableColor() {
    const used = new Set(selectedWithColors.map((s) => s.color));
    return colorArray.find((c) => !used.has(c)) ?? colorArray[0];
  }

  function select(option: Option) {
    const color = getFirstAvailableColor();
    selectedWithColors = [...selectedWithColors, { ...option, color }];
    search = "";
  }

  function remove(item: SelectedWithColor) {
    selectedWithColors = selectedWithColors.filter((s) => s.id !== item.id);
  }

  // Close dropdown on outside click — browser only
  let container: HTMLDivElement | null = null;

  onMount(() => {
    if (!browser) return;

    function handleOutside(e: MouseEvent) {
      if (container && !container.contains(e.target as Node)) {
        showDropdown = false;
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  });
</script>

<!-- ---------- TEMPLATE ---------- -->
<div class="container" bind:this={container}>
  <div class="box" on:click={() => (showDropdown = true)}>
    <input
      {placeholder}
      bind:value={search}
      on:input={() => (showDropdown = true)}
    />

    <div class="tags">
      {#each selectedWithColors as item (item.id)}
        <span class="tag">
          <span class="dot" style={`background:${item.color}`}></span>
          {item.label}
          <button on:click|stopPropagation={() => remove(item)}>×</button>
        </span>
      {/each}
    </div>
  </div>

  {#if showDropdown}
    <ul class="dropdown">
      {#each filteredOptions as o (o.id)}
        <li on:click={() => select(o)}>{o.label}</li>
      {/each}

      {#if filteredOptions.length === 0}
        <li class="no">No results</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .container {
    position: relative;
    width: 100%;
  }

  .box {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
  }

  input {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
  }

  .tags {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    background: #f3f2f1;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #999;
  }

  .dropdown {
    position: absolute;
    background: white;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 4px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    padding: 0;
    list-style: none;
  }

  .dropdown li {
    padding: 8px;
    cursor: pointer;
  }

  .dropdown li:hover {
    background: #eef4ff;
  }

  .no {
    color: #777;
    padding: 8px;
  }
</style>
