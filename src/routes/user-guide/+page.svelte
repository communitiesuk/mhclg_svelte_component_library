<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";

  let addComponentInstructions = [
    {
      label: "Create .svelte file",
      description: [
        "Add a new .svelte file within the most relevant subfolder in <code class='xxx'>lib/components</code>folder.",
      ],
    },
  ];
</script>

<div class="g-top-level-container">
  <h2>User guide</h2>

  <div class="flex flex-col gap-4">
    <div class="mt-10 flex flex-col gap-2">
      <h4>1. Installing the component library</h4>
    </div>

    <DividerLine></DividerLine>

    <div class="mt-10 flex flex-col gap-20">
      <h4>2. Importing library components</h4>
    </div>

    <div class="mt-10 flex flex-col gap-20">
      <h4>3. Creating components</h4>
    </div>

    <div class="mt-10 flex flex-col gap-20">
      <h4>4. Creating component wrapper pages</h4>
    </div>

    <div class="mt-10 flex flex-col gap-20">
      <h4>5. Reviewing edits</h4>
    </div>

    <div class="mt-10 flex flex-col gap-20">
      <h4>6. Creating playground pages</h4>
    </div>
  </div>
</div>

<style>
  [data-role="grid-container"] {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
</style>
