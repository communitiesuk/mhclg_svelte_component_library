<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let svgElement;

  onMount(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      svgElement.selectAll("path").attr("transform", event.transform);
    });

    svgElement.call(zoom);
  });
</script>
