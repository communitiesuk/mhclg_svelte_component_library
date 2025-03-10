<script>
  import Map from "$lib/components/data-vis/map/Map.svelte";
  import Map2 from "$lib/components/data-vis/map/Map2.svelte";
  import Map3 from "$lib/components/data-vis/map/Map3.svelte";
  import Map4 from "$lib/components/data-vis/map/Map4.svelte";
  import Map5 from "$lib/components/data-vis/map/Map5.svelte";
  import Map6 from "$lib/components/data-vis/map/Map6.svelte";
</script>

<h1>Map implementation examples</h1>
<h2>1. Svelte-maplibre package</h2>
<p>With cooperativeGestures</p>
<Map></Map>

<h2>2. Svelte-maplibre package with GeoJSON</h2>
<p>With click an area to zoom</p>
<Map2 />

<h2>3. With more colours</h2>
<p>And no base map</p>
<Map3 />

<h2>4. Maptiler</h2>
<p>
  With reordering of layers - have a look at the source code when adding the
  GeoJSON layer
</p>
<Map4 />

<h2>5. TopoJson with svelte-maplibre</h2>
<Map5 />

<h2>6. Sveaflet library using Leaflet</h2>
<p>
  Note: doesn't work with server-side rendering - had to switch that off to
  render this example, which may make this an unusable option
</p>
<Map6 />
