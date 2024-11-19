<script>
  let { data, detailsOnly } = $props();

  $inspect(data);
</script>

{#if detailsOnly}
  <div>Playground</div>
{:else}
  <div class="chart-container">
    <h5>We are going to build a reactive line chart</h5>

    <figure>
      <figcaption>Steps:</figcaption>
      <ul>
        <li>1. Manipulate data</li>
        <li>2. Create radio button component</li>
        <li>
          3. Add on-click functionalilty to radio buttons, that reactively
          filters for the data we want to visualise
        </li>
        <li>4. Create the template for an svg line chart</li>
        <li>
          5. Pass the filtered data to our line chart, so that it updates
          whenever a radio button is clicked
        </li>
      </ul>
    </figure>
  </div>
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
</style>
