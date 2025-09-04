# Introduction

These instructions will guide on how to turn geojson to .pbf tiles which can be used with the map component. These instructions are designed for Mac OS as the use tippucannoe which is a command line package which work on UNIX systems.

# Steps

1. Get valid geojson denoting an area's geography. It should have this sort of structure but will be much larger. For efficiency, prevent later errors and blank spots in the map filter out areas not needed in this tiles set

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

The best place to get geojsons with boundaries for UK geography is the ONS Open geography portal [https://geoportal.statistics.gov.uk/](https://geoportal.statistics.gov.uk/)

At this stage geographic data can be added so it can be visualised without need for further external data. However if you want to visualise data you can add a file with data e,g a CVS or JSON. In the IMD app this hinged on the LSOA code for each area. It was merged using the below Python code.

```Python
import pandas as pd
import json
import numpy as np
# Load the CSV
csv_data = pd.read_csv('LOAS_CVS.csv')
csv_data.columns = csv_data.columns.str.strip()  # Clean column names

# Load the GeoJSON
with open('filtered.json', 'r') as f:
    geojson_data = json.load(f)

csv_dict = csv_data.set_index('LSOA21CD').to_dict(orient='index')
duplicates = csv_data[csv_data.duplicated(subset='LSOA21CD', keep=False)]

csv_data_unique = csv_data.drop_duplicates(subset='LSOA21CD')
csv_dict = csv_data_unique.set_index('LSOA21CD').to_dict(orient='index')
for feature in geojson_data['features']:
    la_code = feature['properties'].get('LSOA21CD')
    if la_code in csv_dict:
        # Merge matching CSV properties into the GeoJSON feature
        feature['properties'].update(csv_dict[la_code])

with open('input.geojson', 'w') as f:
    json.dump(geojson_data, f)

```

It is important to note that once these tiles have gone through conversion of this stage of the data pipeline additional data can not be added to the tile structure.

2. Convert Geojson to .mbTiles
   Once the geojson has been generated this will need to be generated into MB tiles. To create these tiles a command line package will be used (tippecanoe)[https://github.com/felt/tippecanoe]. Tippue cannoe was originally created by mapbox however Felt now maintain it //check
   it is recommended to install tippucanoe to use homebrew. Here are the terminal commands below

```bash
brew install tippecanoe
```

Once this package is installed this command can be run to create the intermediary tiles.

The below command used used to create the tiles within the imd app. Look at the tippu cannoe readme for in-depth explanation for the parameter and other parameters used to fine tune the tiles.
This comannds takes in a input.geojson and outputs output.mbtiles

```bash

tippecanoe \
  -o output.mbtiles \
  -Z5 -z14 \
  --no-feature-limit \
  --no-tile-size-limit \
  --no-tiny-polygon-reduction \
  --simplify-only-low-zooms \
  --layer=LSOA \
  input.geojson


```

Please note that layer name need to be passed into the component in order to render and like data baked into tiles it cannot be changed after the fact.

3. Convert .mbTiles to .pbf

The final step is to covert the mbtiles into pbf tiles. This will be done using python. Firstly get a python terminal or a python env and pip install the mbutils package. This package converts the .mbtiles file into a directory of pbf tiles can be visualised from

```python
pip install mbtiles
```

Once this package is installed an command in run to generate the directory.

```bash
mb-util output.mbtiles tiles/ --image_format=pbf
```

Once this step is down the tiles then can be uploaded to blob storage or put on tiles sever
