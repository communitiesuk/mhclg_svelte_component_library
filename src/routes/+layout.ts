import { base } from '$app/paths';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const testData = await (
    await event.fetch(`${base}/data/testData.json`)
  ).json();

  testData.chartData = testData.chartData.map((el) => ({
    ...el,
    yearInt: parseFloat(el.Year.slice(0, 4)),
  }));

  let metrics = [
    ...new Set(
      testData.chartData.map((d) => {
        return d.Measure;
      })
    ),
  ];

  let areas = [...new Set(testData.chartData.map((el) => el.AreaCode))];

  let dataInFormatForLineChart = metrics.map((metric) => ({
    metric: metric,
    lines: areas.map((area) => ({
      area: area,
      data: testData.chartData.filter(
        (el) => el.AreaCode === area && el.Measure === metric
      ),
    })),
  }));

  return {
    testData,
    metrics,
    areas,
    dataInFormatForLineChart,
  };
};
