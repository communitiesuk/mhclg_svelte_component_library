<script>
  let { open = $bindable(), onClickFunction } = $props();
</script>

<button onclick={onClickFunction}>
  <svg width="30" height="30">
    {#each [8, 16] as xPos}
      <g
        transform="translate({xPos + (open ? 6 : 0)},15)rotate({open
          ? 45
          : -135})"
      >
        {#each [-5, 5] as cxcy}
          <circle cx={cxcy} cy={cxcy}></circle>
        {/each}
        <path d="M -5 -5 l0 9.75 m0.25 0.25 l9.75 0"></path>
        <rect transform="translate(-6, 4)" width="2" height="2" rx="4px"></rect>
      </g>
    {/each}
  </svg>
</button>

<style>
  svg {
    cursor: pointer;
  }

  svg {
    transition: background-color 0.3s ease;
  }

  svg:hover {
    border-radius: 3px;
    background-color: #f3f3f3;
  }

  path {
    stroke: #6b7280;
    fill: none;
    stroke-width: 2px;
  }

  svg:hover path {
    stroke: #4b5563;
  }

  circle {
    fill: #6b7280;
    stroke: none;
    r: 1;
  }

  svg:hover circle {
    fill: #4b5563;
  }

  rect {
    stroke: none;
    fill: #6b7280;
  }

  svg:hover rect {
    fill: #4b5563;
  }
</style>
