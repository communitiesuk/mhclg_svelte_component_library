<script>
  import { text } from "@sveltejs/kit";

  let {
    row,
    requiredSpaceForLabel = $bindable(),
    labelXOffset = 10,
  } = $props();

  let textDimObject = $state();

  $effect(() => {
    requiredSpaceForLabel = textDimObject?.width;
  });
</script>

<g transform="translate(-{labelXOffset},7)">
  <text
    bind:contentRect={textDimObject}
    text-anchor="end"
    fill={row.color ?? "black"}
    >{row.label}
  </text>
</g>
