export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    // Check if it's a search form or a filter form
    if (formData.has("search")) {
      // Handle search autocomplete submission
      const search = formData.get("search");
      return { search };
    } else {
      // Handle filter panel submission
      const metric = formData.get("metric");
      const areas = formData.getAll("areas[]");
      const year = formData.get("year");

      // Sample filtering logic (replace with actual logic)
      const allResults = [
        { metric: "Housing", area: "London", value: 85, year: "2023" },
        { metric: "Housing", area: "Manchester", value: 72, year: "2023" },
        { metric: "Housing", area: "Birmingham", value: 68, year: "2023" },
        { metric: "Housing", area: "London", value: 80, year: "2022" },
        { metric: "Housing", area: "Manchester", value: 70, year: "2022" },
        { metric: "Education", area: "London", value: 90, year: "2023" },
        { metric: "Education", area: "Birmingham", value: 85, year: "2023" },
        { metric: "Education", area: "Manchester", value: 82, year: "2022" },
        { metric: "Health", area: "London", value: 78, year: "2023" },
        { metric: "Health", area: "Manchester", value: 75, year: "2022" },
      ];

      let results = [...allResults];

      if (metric && metric !== "all") {
        results = results.filter((item) => item.metric === metric);
      }

      if (areas && areas.length > 0) {
        results = results.filter((item) => areas.includes(item.area));
      }

      if (year && year !== "all") {
        results = results.filter((item) => item.year === year);
      }

      // Return the filter data
      return {
        filterData: {
          metric,
          "areas[]": areas,
          year,
          results,
          count: results.length,
        },
      };
    }
  },
};
