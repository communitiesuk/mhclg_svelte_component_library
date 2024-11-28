<script>
  import { scaleLinear }  from 'd3-scale';
  import { line } from 'd3-shape';
let { data , selectedMetric } = $props();

$inspect(data);
$inspect(selectedMetric);

let svgWidth =$state(),
svgHeight =600;

let staticMargin = {top: 10, right: 20, bottom: 20, left: 10};
let dynamicMargin = $derived({ top: 0, right: 0, bottom: 0, left: 0});
let totalMargin = $derived({ 
  top: staticMargin.top + dynamicMargin.top,
  right: staticMargin.right + dynamicMargin.right,
  bottom: staticMargin.bottom + dynamicMargin.bottom,
  left: staticMargin.left + dynamicMargin.left}
);

let chartWidth =$derived(svgWidth - totalMargin.left - totalMargin.right);
let chartHeight =$derived(svgHeight - totalMargin.top - totalMargin.bottom);

$inspect(totalMargin);

let flatData= $derived(data.lines.map((el) => el.data).flat());

let allYears = $derived(
  flatData
  .map((el) => parseFloat(el.yearInt))
  .filter((el) => el && isFinite(el))
  );

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let x = $derived(
  scaleLinear()
  .domain([yearsMinMax[0],yearsMinMax[1]])
  .range([0,chartWidth])
);

let allValues = $derived(
  flatData
  .map((el) => parseFloat(el.Value))
  .filter((el) => el && isFinite(el))
  );

  $inspect(allValues);

  let valuesMinMax = $derived([Math.min(...allValues), Math.max(...allValues)]);

  let y = $derived(
  scaleLinear()
  .domain([valuesMinMax[0],valuesMinMax[1]])
  .range([0,chartHeight])
);

$inspect(yearsMinMax);
</script>

<!--
// let flatData= $derived(data.lines.map((el) => el.data))
// $inspect (flatData);

// let flattenDataFurther =$derived(flatData.flat{})
// $inspect(flattenDataFurther);


// $inspect(x(2018),x(2019),x(2020));
// $iinspect(y(50));





// let minyear = Math.min(...allYears)
// let maxyear = Math.max(...allYears)




// let flatData= $derived(data.lines.map((el) => el.data).flat());

// let allValues = $derived(flatData.map((el) => parseFloat(el.Value)).filter((el) => el && isFinite(el)));

// let allYears = $derived(flatData.map((el) => parseFloat(el.yearInt)).filter((el) => el && isFinite(el)));

// let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

// $inspect(flatData);
// $inspect(allValues);

// let chartWidth = 200;
// let chartHeight = 200;

// let x = $derived (scaleLinear().domain(yearsMinMax).range([0, chartWidth]));
// let y = $derived (scaleLinear().domain(yearsMinMax).range([0, chartHeight]));

</script>
-->
<div>
{#if data}
    <svg width="600" height="600">
      <line
        x1=x 
        x2={100}
        y1=y
        y2={100}
        stroke={'black'}
        stroke-width="2px"
      ></line>
    </svg>
{/if} 
</div>
