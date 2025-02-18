<script module>
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  let statusObject = {};

  let descriptionArray = [
    {
      content:
        "This component takes an array of data, two scale functions and a line function and renders an svg path element (and optional markers at each data point).",
      markdown: true,
    },
  ];

  let contextArray = [
    {
      content:
        "Used within svg elements as part of the creation of data visualisations - most notably by the <a href='/components/data-vis/line/'>Lines</a> component.",
      markdown: true,
    },
    {
      content:
        "The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers). Even individual lines should normally be created using the Lines component.",
    },
  ];

  let detailsArray = [
    { label: "Description", arr: descriptionArray, visibleOnHomepage: true },
    { label: "Context", arr: contextArray, visibleOnHomepage: false },
  ];

  let childComponents = {
    arr: [
      { name: "Line", folder: "data-vis" },
      { name: "Line", folder: "data-vis" },
      { name: "Something something else", folder: "data-vis" },
      { name: "Something something else", folder: "data-vis" },
      { name: "Something something else", folder: "data-vis" },
    ],
    visibleOnHomepage: false,
  };
</script>

{#snippet WrapperNameAndStatus(name, folder, homepage)}
  <BaseNameAndStatus
    {name}
    {folder}
    {homepage}
    parentFolder="playgrounds-update"
    statusObject={undefined}
  ></BaseNameAndStatus>
{/snippet}

{#snippet WrapperInformation(homepage)}
  <BaseInformation {homepage} {detailsArray} {childComponents}
  ></BaseInformation>
{/snippet}

Hello
