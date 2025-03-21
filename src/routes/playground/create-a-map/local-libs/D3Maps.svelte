<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import mapJson from "./Local_Authority_Districts_December_2022_UK_BUC_V2_-1856850221694639751.json";
  import Tooltip from "./Tooltip.svelte";
  import Legend from "./Legend.svelte";

  export let data;

  let svg;
  let width = 800;
  let height = 600;
  let tooltipContent = "";
  let tooltipX = 0;
  let tooltipY = 0;
  let showTooltip = true;

  $: if (data) {
    updateMap();
  }

  function updateMap() {
    const projection = d3.geoMercator().fitSize([width, height], mapJson);
    const path = d3.geoPath().projection(projection);

    // Define a color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)]);

    const svgElement = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height);

    svgElement.selectAll("path").remove();

    svgElement
      .selectAll("path")
      .data(mapJson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const datum = data.find(
          (item) => item.areaCode === d.properties.LAD22CD,
        );
        return datum ? colorScale(datum.value) : "#ccc";
      })
      .attr("stroke", "#333")
      .on("mouseover", (event, d) => {
        const datum = data.find(
          (item) => item.areaCode === d.properties.LAD22CD,
        );
        if (datum) {
          tooltipContent = `ID: ${datum.areaCode}<br>Value: ${datum.value}`;
          tooltipX = event.pageX + 10;
          tooltipY = event.pageY + 10;
          showTooltip = true;
        }
      })
      .on("mousemove", (event) => {
        tooltipX = event.pageX + 10;
        tooltipY = event.pageY + 10;
      })
      .on("mouseout", () => {
        showTooltip = false;
      });

    // Add zoom functionality
    const zoom = d3.zoom().on("zoom", (event) => {
      svgElement.selectAll("path").attr("transform", event.transform);
    });

    svgElement.call(zoom);

    //var legend = d3.legendColor().scale(colorScale);
    //svg.append("g").attr("transform", "translate(500,10)").call(legend);
  }

  onMount(() => {
    updateMap();
  });
</script>

<svg bind:this={svg}></svg>
{#if showTooltip}
  <Tooltip x={tooltipX} y={tooltipY} content={tooltipContent}></Tooltip>
{/if}

<style>
  svg {
    border: 1px solid #ccc;
  }
</style>
