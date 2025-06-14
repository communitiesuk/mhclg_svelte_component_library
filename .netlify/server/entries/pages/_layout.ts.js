import { b as base } from "../../chunks/paths.js";
const load = async (event) => {
  const testData = await (await event.fetch(`${base}/data/testData.json`)).json();
  const svgFontDimensions = await (await event.fetch(`${base}/data/svgFontDimensions.json`)).json();
  let metrics = [
    ...new Set(
      testData.flatMetricData.map((d) => {
        return d.metric;
      })
    )
  ];
  let areas = [...new Set(testData.flatMetricData.map((el) => el.areaCode))];
  let years = [...new Set(testData.flatMetricData.map((el) => el.x))];
  let dataInFormatForLineChart = metrics.map((metric) => ({
    metric,
    lines: areas.map((area) => ({
      areaCode: area,
      data: testData.flatMetricData.filter(
        (el) => el.areaCode === area && el.metric === metric
      )
    }))
  }));
  let dataInFormatForBarChart = years.map((year) => ({
    x: year,
    bars: areas.map((area) => ({
      areaCode: area,
      y: testData.flatMetricData.filter((el) => el.metric === "Household waste recycling rate").find((el) => el.areaCode === area && el.x === year)?.y
    }))
  }));
  return {
    metrics,
    areas,
    years,
    dataInFormatForLineChart,
    dataInFormatForBarChart,
    areaCodeLookup: testData.areaCodeLookup,
    svgFontDimensions
  };
};
export {
  load
};
