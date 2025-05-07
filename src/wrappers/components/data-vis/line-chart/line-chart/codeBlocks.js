export const codeBlock1 = `
<script>

  import Template from "$lib/package-wrapping/Template.svelte";

</script>

<Template
checkboxProp={true}
dropdownProp="Dragonfruit"
jsObjectProp={[
  {
    name: "Borussia Dortmund",
    country: "Germany",
    color: "#fdff7d",
  },
  { name: "Liverpool FC", country: "UK", color: "#f59fad" },
  {
    name: "SSC Napoli",
    country: "Italy",
    color: "#69bfff",
  },
  {
    name: "S.L. Benfica",
    country: "Portugal",
    color: "#ff8c96",
  },
]}
functionProp={function (event, pokemon) {
  window.alert("Example 1 functionProp has been triggered.");
}}
></Template>`;
