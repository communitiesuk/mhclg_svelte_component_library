export const codeBlock1 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
</script>

<Card
  headerIsLink={true}
  headerText="Card heading"
  onlyTextInBody={true}
  bodyText="Text in the body of the card"
></Card>`;

export const codeBlock2 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
</script>

<Card
  headerTextColor="black"
  headerBackgroundColor="lightblue"
  bodyTextColor="grey"
  bodyBackgroundColor="lightgreen"
  bodyBottomBorderColor="red"
  bodyTopBorderColor="purple"
></Card>`;

export const codeBlock3 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
</script>

<Card
  headerIsLink={false}
  onlyTextInBody={true}
  bodyText="Enter your postcode to find out about deprivation in your local area."
  {headerSnippet}
></Card>
    
{#snippet headerSnippet()}
  <PostcodeOrAreaSearch
    label_text="Search for a postcode"
    placeholder="e.g. NG8 5GT"
    margin_bottom="2"
    customPlacesData={[]}
    customSourceSelector={() => "api"}
  ></PostcodeOrAreaSearch>
{/snippet}`;

export const codeBlock4 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";
</script>

<Card
  headerIsLink={true}
  headerText="Adult social care quality"
  onlyTextInBody={false}
  {bodySnippet}
></Card>
    
{#snippet bodySnippet()}
  <PositionChart
    value="4.5"
    min="0"
    max="10"
    annotation="East Sussex"
    showAxis={false}
    chartHeight={30}
  ></PositionChart>
  <p class="pt-4 pl-3">East Sussex: around average.</p>
{/snippet}`;

export const codeBlock5 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";
</script>

<Card
  headerIsLink={true}
  headerText="Adult social care quality"
  onlyTextInBody={false}
  {bodySnippet}
>
<PositionChart
  value="4.5"
  min="0"
  max="10"
  annotation="East Sussex"
  showAxis={false}
  chartHeight={30}
></PositionChart>
<p class="pt-4 pl-3">East Sussex: around average.</p>
</Card>`;

export const codeBlock6 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
</script>

<Card
  headerIsLink={false}
  headerText="Adult social care quality"
  onlyTextInBody={false}
  headerSnippet={headerSnippet2}
  ><p>Some text with a <a href="">link</a></p>
</Card>

{#snippet headerSnippet2()}
  <PostcodeOrAreaSearch
    label_text="Search for a postcode"
    placeholder="e.g. NG8 5GT"
    margin_bottom="2"
    customPlacesData={[]}
    customSourceSelector={() => "api"}
  ></PostcodeOrAreaSearch>
{/snippet}`;

export const codeBlock7 = `
<script>
  import Card from "$lib/components/ui/Card.svelte";
  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";
</script>

{#each metrics as { metric, value }}
  <Card
    headerIsLink={true}
    headerText={metric}
    onlyTextInBody={false}
    headerTextSize="1.25rem"
    ><PositionChart {value} min="0" max="10" chartHeight="20"
    ></PositionChart>
  </Card>
{/each}

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
</style>`;
