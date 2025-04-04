<script>
  import { page } from "$app/state";
  import Header from "$lib/components/layout/Header.svelte";
  import ServiceNavigation from "$lib/components/layout/ServiceNavigation.svelte";
  import Breadcrumbs from "$lib/components/layout/Breadcrumbs.svelte";
  import Radios from "$lib/components/ui/Radios.svelte";
  import LineChart from "./local-lib/LineChart.svelte";
  import Checkbox from "$lib/components/ui/CheckBox.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Map from "$lib/components/data-vis/map/Map.svelte";

  let { data } = $props();

  $inspect(data);

  let urlParams = $state({});
  let urlParamsString = $derived(
    Object.entries(urlParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&"),
  );

  let stateTracker = $state(page.url.searchParams);
  for (const p of stateTracker) {
    // console.log(p);
    urlParams[p[0]] = p[1];
  }

  let primaryAreas = $derived(
    page.url.searchParams.get("primaryLines").split(","),
  );
  let numberOfTicks = $derived(page.url.searchParams.get("numberOfTicks"));

  let pageHash = $derived(page.url.hash);

  let metricsArray = data.metrics.map((el) => ({ value: el, label: el }));
  let selectedMetric = $state(metricsArray[0].value);

  let includeOptionsArray = [
    { value: "primary", label: "Include primary lines" },
    { value: "background", label: "Include background lines" },
  ];
  let selectedIncludes = $state([]);

  let navigationItems = [
    { href: "", label: "Get started", isActive: true },
    { href: "#line-chart", label: "Line Chart" },
    { href: "#map", label: "Map" },
  ];
</script>

<div class="chart-container">
  <div class="mt-20">
    <Header fullWidthBorder={true} />
    <ServiceNavigation serviceName="" serviceUrl="" {navigationItems} />
    <div class="top-level-container p-2 mx-auto mt-4" style="width: 960px;">
      <Breadcrumbs
        items={[
          {
            text: "Home",
            href: "/",
          },
          {
            text: "Playgrounds",
            href: "/components",
          },
          {
            text: "Sprint 24 - Show and Tell",
            href: "/components/ui",
          },
        ]}
      ></Breadcrumbs>

      <h1 class="my-6">Sprint 24 - Show and Tell</h1>

      {#if selectedMetric != null && pageHash === "#line-chart"}
        <div class="flex flex-row">
          <div class="radio-container w-1/2">
            <Radios
              legend="Select a metric:"
              bind:selectedValue={selectedMetric}
              options={metricsArray}
              isPageHeading={false}
              small={true}
              legendSize="s"
              inline={false}
            ></Radios>
          </div>
          <div class="checkbox-container w-1/2">
            <Checkbox
              legend="Include:"
              bind:selectedValues={selectedIncludes}
              options={includeOptionsArray}
              isPageHeading={false}
              small={true}
              legendSize="s"
              inline={false}
            ></Checkbox>
          </div>
        </div>
        <div class="svg-container mt-6">
          <LineChart
            {data}
            {selectedMetric}
            {numberOfTicks}
            {primaryAreas}
            {selectedIncludes}
          ></LineChart>
        </div>
      {:else if pageHash === "#map"}
        <div class="my-10">
          <Map
            cooperativeGestures={true}
            showBorder={true}
            tooltip={true}
            clickToZoom={true}
            geoType="utla"
            year={2024}
          ></Map>
        </div>
      {:else}
        <div style="width: 722px;" class="mb-20">
          <h4 class="mt-12 mb-8">Heading 1</h4>
          <p class="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="mb-8">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      {/if}
    </div>
    <Footer></Footer>
  </div>
</div>
