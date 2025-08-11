import { error, json, fail } from "@sveltejs/kit";
// import { read } from "$app/server"; // No longer using $app/server for reading file
import fs from "fs";
import path from "path";

// Define types for filtered results (mirroring the client-side definition)
interface FilteredResult {
  metric: string;
  areaCode: string;
  areaName: string;
  data: { x: string | number; y: string | number }[];
}

interface FlatMetricData {
  metric: string;
  areaCode: string;
  x: string | number;
  y: string | number;
}

interface TestData {
  flatMetricData: FlatMetricData[];
  areaCodeLookup: Record<string, string>;
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    // Check if it's a search form or a filter form
    if (formData.has("search")) {
      // Handle search autocomplete submission
      const search = formData.get("search")?.toString() || "";
      return { search };
    } else {
      // Handle filter panel submission
      const metricFilter = formData.get("metric")?.toString() || null;
      const areasFilter = Array.from(formData.getAll("areas[]")).map((value) =>
        value.toString(),
      );
      const yearFilter = formData.get("year")?.toString() || "all";

      // --- Server-side Data Loading ---
      let testData: TestData;
      try {
        // Construct the absolute path to the file
        // process.cwd() gives the root of your SvelteKit project
        const filePath = path.join(
          process.cwd(),
          "static",
          "data",
          "testData.json",
        );
        const fileContent = fs.readFileSync(filePath, "utf-8");
        testData = JSON.parse(fileContent) as TestData;
      } catch (e: any) {
        console.error("Error reading or parsing testData.json:", e.message);
        return fail(500, {
          step: "data_loading",
          message: "Failed to load critical data for filtering.",
          error: e.message,
        });
      }

      // --- Server-side Data Transformation ---
      let dataInFormatForLineChart;
      try {
        const metrics: string[] = Array.from(
          new Set(testData.flatMetricData.map((d: FlatMetricData) => d.metric)),
        );
        const areaCodes: string[] = Array.from(
          new Set(
            testData.flatMetricData.map((el: FlatMetricData) => el.areaCode),
          ),
        );

        dataInFormatForLineChart = metrics.map((m) => ({
          metric: m,
          lines: areaCodes.map((a) => ({
            areaCode: a,
            data: testData.flatMetricData.filter(
              (el: FlatMetricData) => el.areaCode === a && el.metric === m,
            ),
          })),
        }));
      } catch (e: any) {
        console.error("Error transforming data:", e.message);
        return fail(500, {
          step: "data_transformation",
          message: "Failed to process loaded data.",
          error: e.message,
        });
      }

      // --- Server-side Filtering Logic ---
      let results: FilteredResult[] = [];
      try {
        if (dataInFormatForLineChart) {
          let filteredData = [...dataInFormatForLineChart];

          if (metricFilter && metricFilter !== "all" && metricFilter !== "") {
            filteredData = filteredData.filter(
              (item) => item.metric === metricFilter,
            );
          }

          filteredData.forEach((metricGroup) => {
            const areaLines =
              areasFilter.length > 0
                ? metricGroup.lines.filter((line) =>
                    areasFilter.includes(line.areaCode),
                  )
                : metricGroup.lines;

            areaLines.forEach((line) => {
              const yearData =
                yearFilter === "all" || !yearFilter
                  ? line.data
                  : line.data.filter(
                      (point: { x: string | number }) =>
                        point.x.toString() === yearFilter,
                    );

              if (yearData.length > 0) {
                results.push({
                  metric: metricGroup.metric,
                  areaCode: line.areaCode,
                  areaName:
                    testData.areaCodeLookup?.[line.areaCode as string] ||
                    line.areaCode,
                  data: yearData,
                });
              }
            });
          });
        }
      } catch (e: any) {
        console.error("Error during filtering logic:", e.message);
        return fail(500, {
          step: "filtering_logic",
          message: "An error occurred while filtering data.",
          error: e.message,
        });
      }

      // Return the filter data in the expected format
      return {
        filterData: {
          metric: metricFilter,
          "areas[]": areasFilter,
          year: yearFilter,
          results: results,
          count: results.length,
        },
      };
    }
  },
};
