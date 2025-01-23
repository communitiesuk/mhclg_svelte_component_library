<script>
  import { text } from "@sveltejs/kit";

  let { row, requiredSpaceForLabel = $bindable() } = $props();

  let textDimObject = $state();

  $effect(() => {
    requiredSpaceForLabel = textDimObject?.width;
  });
</script>

<g transform="translate(-10,7)">
  <text
    bind:contentRect={textDimObject}
    text-anchor="end"
    fill={row.color ?? "black"}
    >{row.label}
  </text>
</g>
