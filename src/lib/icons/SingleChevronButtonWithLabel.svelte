<script>
  let {
    open,
    openArray = $bindable(),
    overlayOpen = $bindable(),
    index,
    text,
  } = $props();

  function onClickFunction() {
    if (openArray[index]) {
      openArray = openArray.map((el) => false);
      overlayOpen = false;
    } else {
      openArray = openArray.map((el, i) => i === index);
      overlayOpen = true;
    }
  }
</script>

<button
  onclick={onClickFunction}
  class="p-2"
  data-role={open ? "button-selected" : "button-unselected"}
>
  <div class="flex flex-row gap-0 items-center">
    <svg width="30" height="30">
      {#each [12] as xPos}
        <g
          transform="translate({xPos + (open ? 3 : 0)},{15 +
            (open ? -3 : 0)})rotate({open ? -45 : -135})"
        >
          {#each [-5, 5] as cxcy}
            <circle
              data-role={open
                ? "button-circle-selected"
                : "button-circle-unselected"}
              cx={cxcy}
              cy={cxcy}
            ></circle>
          {/each}
          <path
            data-role={open ? "button-path-selected" : "button-path-unselected"}
            d="M -5 -5 l0 9.75 m0.25 0.25 l9.75 0"
          ></path>
          <rect
            data-role={open ? "button-rect-selected" : "button-rect-unselected"}
            transform="translate(-6, 4)"
            width="2"
            height="2"
            rx="4px"
          ></rect>
        </g>
      {/each}
    </svg>
    <span
      class="text-lg text-[#6b7280]"
      data-role={open ? "button-label-selected" : "button-label-unselected"}
      >{text}</span
    >
  </div>
</button>

<style>
  button {
    display: inline-block;
    width: 100%;
    border-radius: 3px;
  }

  [data-role="button-unselected"]:hover {
    background-color: #f3f3f3;
  }

  [data-role="button-label-selected"] {
    color: #ea580c;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  svg {
    cursor: pointer;
  }

  svg {
    transition: background-color 0.3s ease;
  }

  path {
    stroke: #6b7280;
    fill: none;
    stroke-width: 2px;
  }

  [data-role="button-path-selected"] {
    stroke: #ea580c;
  }

  button:hover [data-role="button-path-unselected"] {
    stroke: #4b5563;
  }

  circle {
    fill: #6b7280;
    stroke: none;
    r: 1;
  }

  [data-role="button-circle-selected"] {
    fill: #ea580c;
  }

  button:hover [data-role="button-circle-unselected"] {
    fill: #4b5563;
  }

  rect {
    stroke: none;
    fill: #6b7280;
  }

  [data-role="button-rect-selected"] {
    fill: #ea580c;
  }

  button:hover [data-role="button-rect-unselected"] {
    fill: #4b5563;
  }

  button:hover [data-role="button-label-unselected"] {
    color: #4b5563;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
