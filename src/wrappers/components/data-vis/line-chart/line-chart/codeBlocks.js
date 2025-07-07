export const codeBlock1 = `<LineChart {lineChartData} x="x" y="y" series="areaCode"></LineChart>`;
export const codeBlock2 = `<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{ interactiveLines: true }}
      tieredLineParams={{
        all: {},
        hover: { pathStrokeWidth: 4 },
        clicked: {
          pathStrokeWidth: 5,
        },
      }}
      bind:clickedSeries
      bind:hoveredSeries
    ></LineChart>`;
export const codeBlock3 = `<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      assignLinesToTiers={(tier, el) => {
        if (tier === "primary") {
          return ["E07000224"].includes(el.areaCode);
        } else return true;
      }}
      tieredLineParams={{
        secondary: {
          pathStrokeColor: "grey",
          showLabel: false,
          placeLabel: false,
          lineEnding: "arrow",
        },
        primary: {
          pathStrokeWidth: 5,
          pathStrokeColor: "red",
          lineEnding: "arrow",
        },
      }}
    ></LineChart>`;
export const codeBlock4 = `{#snippet tooltipSnippet(activeMarkerId)}
  <div
    style="border: 1px solid black; padding: 0.5rem; background-color: white; pointer-events: none"
  >
    {#if activeMarkerId.areaCode === "E07000032"}
      This tooltip has different text
    {:else}
      <i>Value:</i>
      {activeMarkerId.y}<br /><i>Year:</i>
      {activeMarkerId.x}
    {/if}
  </div>
{/snippet}

<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{
        markers: true,
        interactiveMarkers: true,
      }}
      {tooltipSnippet}
    ></LineChart>`;
export const codeBlock5 = `<LineChart
      lineChartData={dataForOneLine}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{
        includeArea: true,
        areaFillColor: "lightgrey",
        pathStrokeColor: "darkgrey",
      }}
    ></LineChart>`;
export const codeBlock6 = `<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      labelText={(dataArray) => {
        const areaNames = {
          E07000224: "A",
          E07000223: "B",
          E07000026: "C",
          E07000170: "D",
          E07000032: "E",
        };
        return areaNames[dataArray["areaCode"]] ?? dataArray["areaCode"];
      }}
      basicLineParams={{ interactiveLines: true }}
      bind:clickedSeries
      bind:hoveredSeries
      bind:clickedTier
      bind:hoveredTier
      {nothingSelected}
      assignLinesToTiers={(tier, el) => {
        if (tier === "primary") {
          return ["E07000224"].includes(el.areaCode);
        }
        if (tier === "secondary") {
          return true;
        }
        if (tier === "hover") {
          return [hoveredSeries].includes(el.areaCode);
        }
        if (tier === "clicked") {
          return [clickedSeries].includes(el.areaCode);
        }
      }}
      tieredLineParams={{
        secondary: { pathStrokeColor: "grey" },
        primary: {
          pathStrokeWidth: 4,
        },
        clicked: {
          pathStrokeWidth: 6,
          pathStrokeColor: clickedTier === "secondary" ? "grey" : null,
          interactiveLines: false,
        },
        hover: {
          pathStrokeWidth: 5,
          pathStrokeColor: hoveredTier === "secondary" ? "grey" : null,
          interactiveLines: false,
        },
      }}
      overrideLineParams={(tier, el) => {
        return {
          placeLabel:
            [hoveredSeries, clickedSeries].includes(el.areaCode) ||
            (tier === "primary" &&
              (nothingSelected ||
                [hoveredTier, clickedTier].includes("primary"))),
          showLabel:
            [hoveredSeries, clickedSeries].includes(el.areaCode) ||
            (tier === "primary" && nothingSelected) ||
            (!clickedSeries && hoveredTier === "primary" && tier === "primary"),
        };
      }}
    ></LineChart>`;
export const codeBlock7 = `<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      colors={["royalblue", "steelblue", "darkblue", "blue", "navy"]}
    ></LineChart>`;
export const codeBlock9 = `<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      overrideLineParams={(tier, el) => {
        let areaColorMapping = {
          E07000224: "green",
          E07000223: "seagreen",
          E07000026: "yellowgreen",
          E07000170: "darkgreen",
          E07000032: "lightgreen",
        };
        return { pathStrokeColor: areaColorMapping[el.areaCode] };
      }}
    ></LineChart>`;
