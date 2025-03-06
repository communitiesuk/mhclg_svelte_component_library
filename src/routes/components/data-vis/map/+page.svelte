<script>
  import Map from "$lib/components/data-vis/map/Map.svelte";
  import Map2 from "$lib/components/data-vis/map/Map2.svelte";
  import Map3 from "$lib/components/data-vis/map/Map3.svelte";
  import Map4 from "$lib/components/data-vis/map/Map4.svelte";
  import Map5 from "$lib/components/data-vis/map/Map5.svelte";
</script>

<h1>Map implementation examples</h1>
<h2>Svelte-maplibre package</h2>
<Map></Map>

<h2>Svelte-maplibre package with GeoJSON</h2>
<Map2 />

<h2>With more colours</h2>
<Map3 />

<h2>Maptiler</h2>
<Map4 />

<h2>TopoJson with svelte-maplibre</h2>
<Map5 />
