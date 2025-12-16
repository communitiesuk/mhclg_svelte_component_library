export const codeBlock1 = `
<script>

  import Card from "$lib/components/ui/Card.svelte";

</script>

    <Card
      linkCard={true}
      linkText="Card heading"
      bodyText="Text in the body of the card"
    ></Card>`;

export const codeBlock2 = `
<script>

  import Card from "$lib/components/ui/Card.svelte";
  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";

</script>

    <Card
      linkCard={true}
      linkText="Adult social care quality"
      onlyTextInBody={false}
      cardBottomSnippet={cardBottomSnippet1}
    ></Card>
    
    {#snippet cardBottomSnippet1()}
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

export const codeBlock3 = `
<script>

  import Card from "$lib/components/ui/Card.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";

</script>

    <Card
      linkCard={false}
      onlyTextInBody={true}
      bodyText="The interaction in the card header is a search component instead of a link."
      {cardTopSnippet}
    ></Card>
    
    {#snippet cardTopSnippet()}
      <PostcodeOrAreaSearch
        hint=""
        label_text="Search for a postcode"
        label_size="m"
        placeholder="e.g. NG8 5GT"
        margin_bottom="2"
        autoFocusSubmitOnSelection={true}
        hideHint={false}
        autoselect={false}
        customPlacesData={[]}
        customSourceSelector={() => "api"}
        minLength={3}
        label_id="postcode-search"
        wrap_label_in_a_heading={true}
      ></PostcodeOrAreaSearch>
    {/snippet}`;

export const codeBlock4 = `
<script>

  import Card from "$lib/components/ui/Card.svelte";

</script>

    <Card
      linkCard={true}
      linkText="Download local outcomes data"
      onlyTextInBody={false}
      cardBottomSnippet={cardBottomSnippet2}
    ></Card>
    
    {#snippet cardBottomSnippet2()}
      <p>
        Download the complete, latest Local Government Outcomes Framework data.
        Alternatively <a href="">search for an area</a> and download what you need
      </p>
    {/snippet}`;
