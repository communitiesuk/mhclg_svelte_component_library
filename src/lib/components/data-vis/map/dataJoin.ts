import type { FeatureCollection } from "geojson";

export function joinData(
  filteredGeoJsonData: FeatureCollection,
  dataWithColor: any[],
): FeatureCollection {
  const obj2Map = dataWithColor.reduce((map, item) => {
    map[item.areaCode] = item; // Use 'areaCode' as the key for the second map
    return map;
  }, {});

  return {
    type: "FeatureCollection",
    features: filteredGeoJsonData.features.map((item1) => {
      // Get the matching item from obj2Map based on the areaCode
      const match = obj2Map[item1.properties.areacd];

      // If a match exists, merge the 'metric' and 'color' into the 'properties' of item1
      if (match) {
        return {
          ...item1, // Keep all properties of the feature
          properties: {
            ...item1.properties, // Keep the existing properties (like areaCode, etc.)
            metric: +match?.metric, // Add metric from the match
            color: match?.color, // Add color from the match
          },
        };
      }

      // If no match, just return the feature as is
      return item1;
    }),
    crs: { properties: { name: "EPSG:4326" }, type: "name" },
  };
}
