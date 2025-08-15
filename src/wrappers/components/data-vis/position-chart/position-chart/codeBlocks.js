export const codeBlock1 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';
    </script>

    <PositionChart value="7" min="1" max="10" label="Education" showAxis={true}
    ></PositionChart>`;

export const codeBlock2 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';
    </script>

    <PositionChart value="7" min="1" max="10" showAxis={true}></PositionChart>`;

export const codeBlock3 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';
      import { PositionChartAxis } from '@communitiesuk/svelte-component-library';
    </script>

        <div
      class="grid"
      style="display: grid;
    grid-template-columns: minmax(100px, 30%) 1fr;
    grid-auto-rows: 1fr;
    align-items: center;
    column-gap: 2%;
    row-gap: 0;"
    >
      {#each dummyData as item, i}
        <PositionChart
          value={item[1]}
          min="0"
          max="10"
          label={item[0]}
          stacked={true}
          numberOfPositionCharts={dummyData.length}
          showAxis={false}
        ></PositionChart>
      {/each}
      <div class="empty-div"></div>
      <PositionChartAxis></PositionChartAxis>
    </div>`;
