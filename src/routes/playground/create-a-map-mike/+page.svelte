<script>
  import Map5 from "./local-lib/Map5.svelte";
  import Map10 from "./local-lib/Map10.svelte";
  import Map11 from "./local-lib/Map11.svelte";
  import Map12 from "./local-lib/Map12.svelte";
  import Map2 from "./local-lib/Map2.svelte";
  import Map3 from "./local-lib/Map3.svelte";
  import Map4 from "./local-lib/Map4.svelte";
  import Map from "$lib/components/data-vis/map/Map.svelte";
  import Map6 from "./local-lib/Map6.svelte";
  import Map7 from "./local-lib/Map7.svelte";
  import Map8 from "./local-lib/Map8.svelte";
  import Map9 from "./local-lib/Map9.svelte";
  let { data } = $props();
  $inspect(data);
</script>

<h1>Map implementation examples</h1>
<h2>1. Svelte-maplibre package</h2>
<p>With cooperativeGestures</p>
<Map5></Map5>

<h2>2. Svelte-maplibre package with GeoJSON</h2>
<p>With click an area to zoom, and hover an area to see it's name</p>
<p>Using stylesheet, and basemap from ONS</p>
<Map2 />

<h2>3. With more colours</h2>
<p>With hover an area to see it's name and it's properties</p>
<p>And no base map</p>
<Map3 />

<h2>4. Maptiler</h2>
<p>
  With reordering of layers - have a look at the source code when adding the
  GeoJSON layer
</p>
<p>Also including click and hover interactions</p>
<p>To load the map uncomment the code in Map4.svelte</p>
<Map4 apiKey={data.PRIVATE_MAPTILER_API_KEY} />

<h2>5. TopoJson with svelte-maplibre</h2>
<p>Including click and hover events</p>
<Map5 />

<h2>6. Sveaflet library using Leaflet</h2>
<p>
  Note: doesn't work with server-side rendering - had to switch that off to
  render this example, which may make this an unusable option
</p>
<p>To load the map uncomment the code in Map6.svelte</p>
<Map6 />

<h2>7. Flowbite area search, with svelte-maplibre</h2>
<p>Would need a more refined search experience, but proof of data flows.</p>
<Map7 />

<h2>8. Ordnance Survey base map</h2>
<Map8 apiKey={data.PRIVATE_OS_API_KEY} />

<h2>9. Adding custom child elements to svelte-maplibre</h2>
<Map9 />

<h2>10. With legend</h2>
<p>Some basic responsiveness to screen size</p>
<p>May need to engage with work on ticks/axes and scale functions</p>
<p>
  Also need to integrate with work on breaks - currently equal sized bars -
  might be good to scale based on size of bins
</p>
<Map10 />

<h2>11. Breaks</h2>
<p>
  Implemented with bespoke code, but could also be done using <a
    href="https://maplibre.org/maplibre-style-spec/expressions/#step"
    target="_blank">maplibre's step function.</a
  >
</p>
<Map11 />

<h2>12. Mapbox (old)</h2>
<Map12 />
