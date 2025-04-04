<script>
  let {
    componentNameProp = undefined,
    textProp = undefined,
    numberProp = undefined,
    checkboxProp = false,
    dropdownProp = undefined,
    radioProp = undefined,
    jsObjectProp = [],
    functionProp = undefined,
  } = $props();
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  {#each [{ name: "textProp", prop: textProp }, { name: "numberProp", prop: numberProp }] as output}
    {#if output.prop != undefined}
      <div>
        <p class="mb-0">
          The <span class="font-bold">{output.name}</span> value being passed to
          the component is:
          {#if output.name === "numberProp"}
            {@render propNameAndValue("m-2", "py-2 pl-2 pr-3", numberProp)}
          {/if}
        </p>
        {#if output.name === "textProp"}
          {@render propNameAndValue(
            "ml-6 mt-4",
            "py-2 pl-2 pr-3",
            "'" + output.prop + "'",
          )}
        {/if}
      </div>
    {/if}
  {/each}

  <div class="grid grid-cols-3 gap-4 mt-6">
    {#each [{ name: "checkboxProp", prop: checkboxProp }, { name: "dropdownProp", prop: dropdownProp }, { name: "radioProp", prop: radioProp }] as card}
      {#if card.prop != undefined}
        <div class="p-2">
          <p class="my-2">
            <span class="font-bold">{card.name}</span> is set to:
          </p>
          <p class="p-2 inline-block italic bg-slate-100 rounded">
            {card.prop}
          </p>
        </div>
      {/if}
    {/each}
  </div>

  <div class="mt-10">
    <p class="font-bold">jsObjectProp:</p>
    <p>
      Click on a card to trigger a call of the functionProp, which will write to
      the console.
    </p>
    <div class="grid grid-cols-2 gap-4 mt-6 cursor-pointer">
      {#each jsObjectProp as pokemon}
        <button
          data-id={pokemon.name}
          data-role="pokemon-card"
          class="rounded p-2 grid grid-cols-[auto_1fr] gap-2"
          style="background-color: {pokemon.color};"
          onclick={(event) => functionProp(event, pokemon)}
        >
          {#each Object.keys(pokemon) as key}
            {#if key != "color"}
              <p class="m-0 p-0">{key}:</p>
              <p class="m-0 p-0">{pokemon[key]}</p>
            {/if}
          {/each}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  [data-role="pokemon-card"] {
    opacity: 0.6;
    border: 2px solid transparent;
  }

  [data-role="pokemon-card"]:hover {
    opacity: 0.8;
    border: 2px solid;
  }
  [data-role="pokemon-card"]:focus {
    opacity: 1;
    border: 2px solid;
  }
</style>
