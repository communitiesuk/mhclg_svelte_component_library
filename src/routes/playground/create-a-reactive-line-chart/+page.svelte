<script>
  import LineChart from './lib/LineChart.svelte';
  import Radio from './lib/Radio.svelte';

  let { data } = $props();

  $inspect(data.jsonData.chartData);

  data.jsonData.chartData = data.jsonData.chartData.map((el) => ({
    ...el,
    yearInt: parseFloat(el.Year.slice(0, 4)),
  }));

  let metrics = [
    ...new Set(
      data.jsonData.chartData.map((d) => {
        return d.Measure;
      })
    ),
  ];

  let areas = [...new Set(data.jsonData.chartData.map((el) => el.AreaCode))];

  let manipulatedData = metrics.map((metric) => ({
    metric: metric,
    lines: areas.map((area) => ({
      area: area,
      data: data.jsonData.chartData.filter(
        (el) => el.AreaCode === area && el.Measure === metric
      ),
    })),
  }));

  let selectedMetric = $state(metrics[0]);

  $inspect(selectedMetric);
</script>

<div class="top-level-container">
  <h5>We are going to build a reactive line chart</h5>

  <figure>
    <figcaption>Steps:</figcaption>
    <ul>
      <li>1. Manipulate data</li>
      <li>2. Create radio button component</li>
      <li>
        3. Add on-click functionalilty to radio buttons, that reactively filters
        for the data we want to visualise
      </li>
      <li>4. Create the template for an svg line chart</li>
      <li>
        5. Pass the filtered data to our line chart, so that it updates whenever
        a radio button is clicked
      </li>
    </ul>
  </figure>
</div>

<div class="mt-20">
  <div
    class="top-level-container border-solid rounded-lg border-2 border-current p-2"
  >
    <div class="radio-container">
      <Radio {metrics} bind:selectedMetric></Radio>
    </div>
    <div class="svg-container">
      {#if selectedMetric}
        <LineChart
          data={manipulatedData.find((el) => el.metric === selectedMetric)}
        ></LineChart>
      {/if}
    </div>
  </div>
</div>

<style>
  .top-level-container {
    margin: 0px auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  figure {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  figcaption {
    font-weight: bold;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    margin-right: 5px;
  }

  .radio-container {
    padding: 10px;
    border-color: #cc7400;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>
