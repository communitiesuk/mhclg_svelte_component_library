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

  console.log(areas);

  let manipulatedData = metrics.map((metric) => ({
    metric: metric,
    lines: areas.map((area) => ({
      area: area,
      data: data.jsonData.chartData.filter(
        (el) => el.AreaCode === area && el.Measure === metric
      ),
    })),
  }));

  console.log(manipulatedData);
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

{#each [{ name: 'apples', colour: 'green' }, { name: 'banana', colour: 'yellow' }] as item}
  <p>An {item.name} is {item.colour}</p>
{/each}

<div class="radio-container">
  <label>Choose a metric:</label>

  {#each [{ name: 'apples', colour: 'green' }, { name: 'banana', colour: 'yellow' }] as item}
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
  {/each}
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
