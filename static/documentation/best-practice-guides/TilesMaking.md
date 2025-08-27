# Introduction

This will guide on how to turn geojson to pdf tiles which can be used with the map conpomenet. These instrutions are for Mac OS

# Steps

1. Get valid geojson. It should looks something like this

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Sample Point" },
      "geometry": {
        "type": "Point",
        "coordinates": [-0.1257, 51.5085]
      }
    }
  ]
}
```

At this stage geographic dataa can be added so it can be visulised without need futher external jsons. Hoever if you

2. Convert Geojson to .mbTiles

Install home brew

Install tippe cannoe

run tippe cannoe

3. Convert .mbTiles to .pbf

install mbtiles

```python
pip install mbtiles
```
