import type { FeatureCollection } from "geojson";

export function getColor(
  value: number,
  breaks: number[],
  colors: string[],
): string {
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

export function filterGeo(geo: FeatureCollection, year: number | string) {
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

export function jenksBreaks(data, numBreaks) {
  const dataSorted = data.slice().sort((a, b) => a - b);
  const n = dataSorted.length;
  const numClasses = numBreaks;

  const mat1 = Array.from({ length: n + 1 }, () =>
    Array(numClasses + 1).fill(0),
  );
  const mat2 = Array.from({ length: n + 1 }, () =>
    Array(numClasses + 1).fill(0),
  );

  for (let i = 1; i <= numClasses; i++) {
    mat1[0][i] = Infinity;
  }

  for (let l = 1; l <= n; l++) {
    let s1 = 0.0;
    let s2 = 0.0;
    let w = 0.0;

    for (let m = 1; m <= l; m++) {
      const i3 = l - m + 1;
      const val = dataSorted[i3 - 1];

      s2 += val * val;
      s1 += val;
      w += 1;

      const variance = s2 - (s1 * s1) / w;

      if (i3 !== 1) {
        for (let j = 2; j <= numClasses; j++) {
          if (
            mat1[l][j] === 0 ||
            mat1[l][j] >= variance + mat1[i3 - 2][j - 1]
          ) {
            mat1[l][j] = variance + mat1[i3 - 2][j - 1];
            mat2[l][j] = i3 - 1;
          }
        }
      }
    }

    mat1[l][1] = s2 - (s1 * s1) / w;
    mat2[l][1] = 0;
  }

  const breaks = Array(numClasses + 1);
  breaks[numClasses] = dataSorted[n - 1];
  let k = n;
  for (let j = numClasses; j >= 2; j--) {
    const id = mat2[k][j];
    breaks[j - 1] = dataSorted[id];
    k = id;
  }
  breaks[0] = dataSorted[0];

  return breaks;
}

export function quantileBreaks(data: number[], numBreaks: number): number[] {
  // Sort the data array
  data = data.sort((a, b) => a - b);

  let len = data.length;

  let breaks: number[] = [];
  for (let i = 0; i < numBreaks; i++) {
    breaks.push(data[Math.floor(len * (i * (1 / numBreaks)))]);
  }
  breaks.push(data[len - 1]);

  return breaks;
}
export function createPaintObjectFromMetric(
  metricProperty: string,
  breaks: (string | number)[],
  fillColors: string[],
  fillOpacity: number = 0.4,
): object {
  const usableLength = Math.min(breaks.length, fillColors.length);

  function parseNumberWithCommas(value: string | number): number {
    if (typeof value === "number") return value;
    const cleaned = value.toString().replace(/,/g, "").trim();
    const parsed = Number(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  const matchExpression: [string, any, ...any[]] = [
    "step",
    ["to-number", ["get", metricProperty]],
    "rgba(0,0,0,0)", // Default color
  ];

  for (let i = 0; i < usableLength; i++) {
    const breakValue = parseNumberWithCommas(breaks[i]);
    matchExpression.push(breakValue, fillColors[i]);
  }

  return {
    "fill-color": matchExpression,
    "fill-opacity": fillOpacity,
  };
}

export function extractVectorMetricValues(
  map: maplibregl.Map,
  layerId: string,
  metricProperty: string,
): number[] {
  if (!map || !map.isStyleLoaded()) return [];

  const features = map.queryRenderedFeatures({ layers: [layerId] });
  const seen = new Set();

  return features
    .filter((f) => {
      const id = f.id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .map((f) => {
      const raw = f.properties?.[metricProperty];
      if (typeof raw === "string") {
        const cleaned = raw.replace(/,/g, "");
        return parseFloat(cleaned);
      } else if (typeof raw === "number") {
        return raw;
      }
      return NaN;
    })
    .filter((v) => !isNaN(v));
}
