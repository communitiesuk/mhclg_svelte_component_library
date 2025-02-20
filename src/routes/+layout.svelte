<script lang="ts">
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import "../app.css";
  let { children, data } = $props();

  //$inspect(data);
</script>

<div class="mb-20">
  <a class="text-inherit no-underline" href="/">
    <div class="g-top-level-container my-4">
      <div class="flex flex-row gap-10 items-center">
        <img src="/assets/images/oflog_crest_black.png" alt="MHCLG crest" />
        <div class="flex flex-col leading-tight">
          <h3>LGPM Svelte Component Library</h3>
          <p class="font-normal text-2xl m-0">
            Ministry for Housing, Communities and Local Government
          </p>
        </div>
      </div>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
  </a>

  {@render children()}
</div>
