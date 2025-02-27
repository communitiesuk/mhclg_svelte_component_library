<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { feature } from "topojson-client";

  let svg;

  onMount(async () => {
    const width = 960;
    const height = 600;

    const projection = geoMercator()
      .center([0, 54])
      .scale(3000)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    const svgElement = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height);

    const data = await d3.json(
      "https://gist.githubusercontent.com/mbostock/4090846/raw/world-50m.json",
    );

    const uk = feature(data, data.objects.countries).features.filter(
      (d) => d.id === "826",
    )[0];

    svgElement
      .append("path")
      .datum(uk)
      .attr("d", path)
      .attr("fill", "#ccc")
      .attr("stroke", "#000");
  });
</script>

<svg bind:this={svg}></svg>

<style>
  svg {
    width: 100%;
    height: auto;
  }
</style>
