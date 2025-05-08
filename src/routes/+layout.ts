import { base } from "$app/paths";
import type { LayoutLoad } from "./$types.js";
import type { ComponentItem } from "./+layout.server.js";

export const load: LayoutLoad = async (event) => {
  const testData = await (
    await event.fetch(`${base}/data/testData.json`)
  ).json();

  const svgFontDimensions = await (
    await event.fetch(`${base}/data/svgFontDimensions.json`)
  ).json();

  // Get server-loaded component data
  const {
    componentDirectories,
    uiComponents,
    componentSections,
    componentTree,
  } = event.data;

  let metrics = [
    ...new Set(
      testData.flatMetricData.map((d) => {
        return d.metric;
      }),
    ),
  ];

  let areas = [...new Set(testData.flatMetricData.map((el) => el.areaCode))];

  let years = [...new Set(testData.flatMetricData.map((el) => el.x))];

  let dataInFormatForLineChart = metrics.map((metric) => ({
    metric: metric,
    lines: areas.map((area) => ({
      areaCode: area,
      data: testData.flatMetricData.filter(
        (el) => el.areaCode === area && el.metric === metric,
      ),
    })),
  }));

  let dataInFormatForBarChart = years.map((year) => ({
    x: year,
    bars: areas.map((area) => ({
      areaCode: area,
      y: testData.flatMetricData
        .filter((el) => el.metric === "Household waste recycling rate")
        .find((el) => el.areaCode === area && el.x === year)?.y,
    })),
  }));

  let dataInFormatForMap = years
    .map((year) => ({
      year: year,
      data: testData.flatMetricData
        .filter((el) => el.x == year)
        .map((d) => ({
          areaCode: d.areaCode,
          areaName: testData.areaCodeLookup[d.areaCode],
          data: testData.flatMetricData
            .filter((el) => el.x == year && el.areaCode == d.areaCode)
            .reduce((acc, item) => {
              acc[item.metric] = item.y;
              return acc;
            }, {}),
        })),
    }))
    //Filtering out duplicates - probably could be done more efficiently
    .map((d) => ({
      year: d.year,
      data: Object.values(
        d.data.reduce((acc, current) => {
          // Create a unique identifier for each area using areaCode and areaName
          const key = `${current.areaCode}_${current.areaName}`;

          // Only add the item if the key doesn't already exist in the accumulator
          if (!acc[key]) {
            acc[key] = current;
          }
          return acc;
        }, {}),
      ),
    }));

    let dataInFormatForTable = testData.flatMetricData
      .map(item => ({
        ...item,
        y: Math.round(parseFloat(item.y)),
      }))  
      .map(d => ({
      ...d,
      areaName: testData.areaCodeLookup[d.areaCode]
    })) 
        .map(({areaCode, xLabel, ...rest }) => rest)
        .filter((el) => el.x === 2022)
        .map(({ x, ...rest }) => rest)
     
    let groupedTableData = {}

    for (let row of dataInFormatForTable) {
      if(!groupedTableData[row.areaName]) {
        groupedTableData[row.areaName] = {areaName: row.areaName}
      }
      groupedTableData[row.areaName][row.metric] = row.y
    }

    let tableData = Object.values(groupedTableData);

    let metaData = testData.metaData

  return {
    metrics,
    areas,
    years,
    dataInFormatForLineChart,
    dataInFormatForBarChart,
    dataInFormatForMap,
    dataInFormatForTable,
    tableData,
    areaCodeLookup: testData.areaCodeLookup,
    svgFontDimensions,
    componentSections,
    componentDirectories,
    uiComponents,
    componentTree,
    metaData,
  };
};
