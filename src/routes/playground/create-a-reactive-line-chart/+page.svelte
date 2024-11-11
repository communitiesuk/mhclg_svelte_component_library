<script>
  let { data } = $props();

  $inspect(data.jsonData.chartData);

  data.jsonData.chartData = data.jsonData.chartData.map((el) => ({
    ...el,
    yearInt: parseFloat(el.Year.slice(0, 4)),
  }));

  console.log(data.jsonData.chartData);

  let metrics = [
    ...new Set(
      data.jsonData.chartData.map((d) => {
        return d.Measure;
      })
    ),
  ];
let areas = [...new Set(data.jsonData.chartData.map((el) => el.AreaCode))];

console.log (areas);
  
  let manipulateData = metrics.map((metric) => ({
  metric: metric,
  lines: areas.map((area) => ({area: area, data: data.jsonData.chartData.filter((el) => el.AreaCode
  === area && el.Measure === metric )}))
  }));

console.log (manipulateData);

  let selectedMetric = $state();
  let createChart = $derived(
    {
      'Household waste recycling rate': 'Yes -  lets make a chart for recycling',
    }[selectedMetric]
  );

  $inspect(selectedMetric);
  $inspect(createChart);
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

<!-- {#each [{ name: 'apples', colour: 'green' }, { name: 'banana', colour: 'yellow' }] as item}
  <p>An {item.name} is {item.colour}</p>
{/each} -->

<div class="radio-container mt-10">
  <label>Choose a metric:</label>

  {#each metrics as metric}
    <div>
      <input
        bind:group={selectedMetric}
        type="radio"
        id={metric.toLowerCase().replaceAll(' ', '_')}
        name="metric-selection"
        value={metric}
        checked
      />
      <label for={metric.toLowerCase().replaceAll(' ', '_')}>{metric}</label>
    </div>
  {/each}

  <div>
    <p>The chart I am going to make will visualise {selectedMetric}</p>

    {#if selectedMetric}
      <svg width="600" height="600">
        <line
          x1={100}
          x2={100}
          y1={300}
          y2={100}
          stroke={{
            'Household waste recycling rate': 'blue',
            'Recycling contamination rate': 'red',
          }[selectedMetric]}
          stroke-width="2px"
        ></line>
      </svg>
    {/if}

    <p>----</p>

    {#if selectedMetric === 'Household waste recycling rate'}
      <p>
        The chart I am going to make will visualise household recycling rate
      </p>
    {:else if selectedMetric === 'Recycling contamination rate'}
      <p>The chart I am going to make will visualise contamination rates</p>
    {:else if selectedMetric === 'Residual household waste'}
      <p>
        The chart I am going to make will visualise household recycling rate
      </p>
    {/if}
  </div>

  <!-- {#each [{ name: 'apples', colour: 'green' }, { name: 'banana', colour: 'yellow' }] as item}
    <div>
      <input
        type="radio"
        id="recycle-rate"
        name="metric-selection"
        value="Household waste recycling rate"
        checked
      />
      <label for="recycle-rate">{item.name}</label>
    </div>
  {/each} -->
</div>

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
