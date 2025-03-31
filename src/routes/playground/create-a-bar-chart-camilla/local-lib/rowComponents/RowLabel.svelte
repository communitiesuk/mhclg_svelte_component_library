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
<<<<<<<< HEAD:src/routes/playground/create-a-bar-chart-using-url/local-lib/rowComponents/RowLabel.svelte

  // $inspect(requiredSpaceForLabel);
========
>>>>>>>> ticks_camila_andrew_pc:src/routes/playground/create-a-bar-chart-camilla/local-lib/rowComponents/RowLabel.svelte
</script>

<g transform="translate(-{labelXOffset},7)">
  <text
    bind:contentRect={textDimObject}
    text-anchor="end"
    fill={row.color ?? "black"}
    >{row.label}
  </text>
</g>
