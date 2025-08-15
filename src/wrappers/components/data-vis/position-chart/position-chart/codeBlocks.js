export const codeBlock1 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';
    </script>

    <PositionChart value="7" min="0" max="10" label="Education"></PositionChart>`;

export const codeBlock2 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';
    </script>

    <PositionChart value="7" min="0" max="10"></PositionChart>`;

export const codeBlock3 = `
    <script>
      import { PositionChart } from '@communitiesuk/svelte-component-library';

    let dummyData = $state([
      ["Overall", 3],
      ["Income", 2.5],
      ["Living Environment", 5],
      ["Barriers to Housing & Services", 1],
      ["Employment", 3],
      ["Education", 7],
      ["Health", 6],
      ["Crime", 6],
    ])
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
          showAxis={dummyData.length == i + 1}
        ></PositionChart>
      {/each}
    </div>
  </div>`;
