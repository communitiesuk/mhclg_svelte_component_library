export function getColor(value, breaks, colors) {
  let color;
  let found = false;
  let i = 1;
  while (found == false) {
    if (value <= breaks[i]) {
      color = colors[i - 1];
      found = true;
    } else {
      i++;
    }
  }
  return color ? color : "lightgrey";
}

export function filterGeo(geo, year) {
  let filtered = JSON.parse(JSON.stringify(geo));
  filtered.features = filtered.features
    .filter((f) => {
      return (
        !(f.properties.end && f.properties.end < year) &&
        !(f.properties.start && f.properties.start > year)
      );
    })
    .map((f) => {
      f.properties = f.properties = {
        areacd: f.properties.areacd,
        areanm: f.properties.areanm,
      };
      return f;
    });
  return filtered;
}
