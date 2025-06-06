<script lang="ts">
  //@ts-nocheck
  import {
    FullscreenControl,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
  } from "svelte-maplibre";

  let {
    navigationControl,
    navigationControlPosition = "top-left",
    geolocateControl,
    geolocateControlPosition = "top-left",
    fullscreenControl,
    fullscreenControlPosition = "top-left",
    scaleControl,
    scaleControlPosition = "bottom-left",
    scaleControlUnit = "metric",
  } = $props();
</script>

{#if navigationControl}
  {#key navigationControlPosition}
    <NavigationControl position={navigationControlPosition} />
  {/key}
{/if}
{#if geolocateControl}
  {#key geolocateControlPosition}
    <GeolocateControl position={geolocateControlPosition} />
  {/key}
{/if}
{#if fullscreenControl}
  {#key fullscreenControlPosition}
    <FullscreenControl position={fullscreenControlPosition} />
  {/key}
{/if}
{#if scaleControl}
  {#key { scaleControlPosition, scaleControlUnit }}
    <ScaleControl position={scaleControlPosition} unit={scaleControlUnit} />
  {/key}
{/if}
