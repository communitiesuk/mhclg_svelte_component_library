<script>
  import { setContext } from "svelte";

  let { width = 400, height = 300, children } = $props();

  let datasets = $state([]);
  let reportedMarginBottom = $state(10); // small default — grows only if an axis mounts

  function registerData(entry) {
    datasets.push(entry);
    return () => (datasets = datasets.filter((d) => d !== entry));
  }

  function reportMarginBottom(px) {
    reportedMarginBottom = px;
  }

  let margin = $derived({
    top: 10,
    right: 10,
    bottom: reportedMarginBottom,
    left: 10,
  });
  let plotWidth = $derived(width - margin.left - margin.right);
  let plotHeight = $derived(height - margin.top - margin.bottom);

  function makeScale(values, range) {
    const lo = Math.min(...values, 0);
    const hi = Math.max(...values, 1);
    return (v) => range[0] + ((v - lo) / (hi - lo)) * (range[1] - range[0]);
  }

  let xScale = $derived.by(() =>
    makeScale(
      datasets.flatMap((d) => d.xValues),
      [0, plotWidth],
    ),
  );
  let yScale = $derived.by(() =>
    makeScale(
      datasets.flatMap((d) => d.yValues),
      [plotHeight, 0],
    ),
  );

  setContext("plot", {
    get xScale() {
      return xScale;
    },
    get yScale() {
      return yScale;
    },
    get plotWidth() {
      return plotWidth;
    },
    get plotHeight() {
      return plotHeight;
    },
    registerData,
    reportMarginBottom,
  });
</script>

<svg {width} {height} style="border: 1px solid #ccc">
  <g transform={`translate(${margin.left},${margin.top})`}>
    {@render children?.()}
  </g>
</svg>
