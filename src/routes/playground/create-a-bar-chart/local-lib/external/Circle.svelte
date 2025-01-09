<script>
  let { barLength } = $props();
</script>

<!-- <svg>
  <circle r="45" cx="50" cy="50" fill="red" stroke="green" stroke-width="3" />
</svg> -->

<svg>
  <rect
    width={barLength}
    height="30"
    style="fill:#ADD8E6;stroke-width:1;stroke:#00008B"
  />
</svg>
