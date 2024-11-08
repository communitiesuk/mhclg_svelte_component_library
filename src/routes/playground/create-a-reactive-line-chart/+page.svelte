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
      return d.Measure
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

let areasNames = [
  ...new Set(data.jsonData.chartData.map((el) => el.AreaNmae)),
  ];
  let metricNames = [
   ...new Set(data.jsonData.chartData.map((el) => el.Measure)), 
  ];
let years = [...new Set(data.jsonData.chartData.map((el) => el.yearInt))];

let selectedOption  = $state();
$inspect(selectedOption);
</script>

 <div class="button-container">
 <p>Area</p>
<select>
{#each areasNames as area}
<option value={area}>{area}</option>
{/each}
</select>

<p>Metric</p>
<form>
{#each metricNames as option}
<input type="radio" name="metrics-select" bind:group={selectedOption} />
<label>
{option}
</label>
<br />
{/each}
</form>
<p>{selectedOption}</p>

</div>





<!-- </script> -->

<div class="chart-container">
  <h5>We are going to build a reactive line chart</h5>/

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

<!--LABEL plus Rdio buttons -->
 <!--
<div class="radio-container">
  
  <label>Choose a metric:</label>
  
 
  <div>
  <input type="radio" id="recycle-rate" name="metric-selection" value="Household waste recycling rate" checked 
  />
      <label for="recycle-rate">Household recycling rate</label>
  </div>
  
  <div>
  <input type="radio" id="contamination-rate" name="metric-selection" value="Recycling contamination rate" />
      <label for="contamination-rate">Recycling contamination rate</label>
  </div>
  
    <div>
   <input type="radio" id="residual-household-waste" name="metric-selection" value="Residual household waste" />
      <label for="residual-household-waste">Residual household waste</label>
  </div>
 -->




<!-- ****************** CSS **************-->

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

option {
  font-style: italic;
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

