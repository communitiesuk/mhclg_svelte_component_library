<script>
  import Map from "$lib/components/data-vis/map/Map.svelte";
  import Map2 from "$lib/components/data-vis/map/Map2.svelte";
  import Map3 from "$lib/components/data-vis/map/Map3.svelte";
  import Map4 from "$lib/components/data-vis/map/Map4.svelte";
  import Map5 from "$lib/components/data-vis/map/Map5.svelte";
  import Map6 from "$lib/components/data-vis/map/Map6.svelte";
  import Map7 from "$lib/components/data-vis/map/Map7.svelte";
  import Map8 from "$lib/components/data-vis/map/Map8.svelte";
  let { data } = $props();
  $inspect(data);
</script>

<h1>Map implementation examples</h1>
<h2>1. Svelte-maplibre package</h2>
<p>With cooperativeGestures</p>
<Map></Map>

<h2>2. Svelte-maplibre package with GeoJSON</h2>
<p>With click an area to zoom, and hover an area to see it's name</p>
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
<Map4 apiKey={data.PRIVATE_MAPTILER_API_KEY} />

<h2>5. TopoJson with svelte-maplibre</h2>
<p>Including click and hover events</p>
<Map5 />

<h2>6. Sveaflet library using Leaflet</h2>
<p>
  Note: doesn't work with server-side rendering - had to switch that off to
  render this example, which may make this an unusable option
</p>
<Map6 />

<h2>7. Flowbite area search, with svelte-maplibre</h2>
<p>Would need a more refined search experience, but proof of data flows.</p>
<Map7 />

<h2>8. Ordnance Survey base map</h2>
<Map8 apiKey={data.PRIVATE_OS_API_KEY} />
