export function generateAllCharacters(): string[] {
    return Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32));
  }

  //   import { generateAllCharacters } from "$lib/utils/generateAllCharacters.ts";

  // let allCharacters = generateAllCharacters();

  // let characterWidths = $state({});

//   <svg height={1900} width={500}>
//   {#each fontSizes as fontSize, j}
//     {#each allCharacters as char, i}
//       <!-- <text
//         use:measureWidth={{ char, fontSize }}
//         x={(0, j * 20)}
//         y={i * 20}
//         font-size={fontSize}>{char}</text
//       > -->
//     {/each}
//   {/each}
// </svg>