<script>
  import LineChart from './lib/LineChart.svelte';
  import Radio from './lib/Radio.svelte';

  let { data } = $props();

  $inspect(data);

  let dataArray = data.jsonData.chartData;

  dataArray = dataArray.map((el) => ({
    ...el,
    yearInt: parseFloat(el.Year.slice(0, 4)),
  }));

  $inspect(dataArray);

  let metrics = [...new Set(dataArray.map((el) => el.Measure))];
  let areas = [...new Set(dataArray.map((el) => el.AreaCode))];

  $inspect({ areas, metrics });

  let manipulatedData = metrics.map((metric) => ({
    metric: metric,
    lines: areas.map((area) => ({
      area: area,
      data: dataArray.filter(
        (el) => el.AreaCode === area && el.Measure === metric
      ),
    })),
  }));

  $inspect({ manipulatedData });

  let selectedMetric = $state(manipulatedData[0].metric);
  $inspect({ selectedMetric });

  // function onChange(event) {
  //   selectedMetric = event.target.value;
  // }
</script>

<div class="chart-container">
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

<Radio {manipulatedData} bind:selectedMetric />

{#if selectedMetric}
  <LineChart
    {metrics}
    data={manipulatedData.find((d) => d.metric === selectedMetric)}
    {selectedMetric}
  />
{/if}

<style>
  .chart-container {
    margin: 0px auto;
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
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
