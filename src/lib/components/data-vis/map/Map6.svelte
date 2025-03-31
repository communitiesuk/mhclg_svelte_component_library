<script>
  import { Map, TileLayer, Marker, Popup } from "sveaflet";
</script>

<div class="map" style="width:100%;height:500px">
  <Map
    options={{
      center: [51.505, -0.09],
      zoom: 13,
    }}
  >
    <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
    <Marker latLng={[51.505, -0.09]} />
  </Map>
</div>
