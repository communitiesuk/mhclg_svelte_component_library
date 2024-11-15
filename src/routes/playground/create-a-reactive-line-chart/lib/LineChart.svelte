<script>
  import { scaleLinear } from 'd3-scale';

  let { data, metrics, selectedMetric } = $props();

  $inspect(data, metrics, selectedMetric);

  let chartWidth = 500;
  let chartHeight = 500;

  let yDomain = $derived([
    Math.min(
      ...data.lines
        .map((d) => d.data.map((e) => +e.Value))
        .flat()
        .filter((f) => !isNaN(f))
    ),
    Math.max(
      ...data.lines
        .map((d) => d.data.map((e) => +e.Value))
        .flat()
        .filter((f) => !isNaN(f))
    ),
  ]);

  let xDomain = $derived([
    Math.min(
      ...data.lines
        .map((d) => d.data.map((e) => +e.yearInt))
        .flat()
        .filter((f) => !isNaN(f))
    ),
    Math.max(
      ...data.lines
        .map((d) => d.data.map((e) => +e.yearInt))
        .flat()
        .filter((f) => !isNaN(f))
    ),
  ]);

  $inspect(xDomain);

  let x = $derived(scaleLinear().domain(xDomain).range([0, chartWidth]));
  let y = $derived(scaleLinear().domain(yDomain).range([chartHeight, 0]));

  $inspect(y.domain());

  let colours = ['red', 'green', 'blue'];
  let currentColour = $derived(colours[metrics.indexOf(data.metric)]);
</script>

<svg width={chartWidth} height={chartHeight}>
  <line
    x1="5"
    x2="145"
    y1="0"
    y2="200"
    stroke={currentColour}
    stroke-width="2px"
  >
  </line>
</svg>
