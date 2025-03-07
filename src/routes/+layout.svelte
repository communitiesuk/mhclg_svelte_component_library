<script lang="ts">
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import "../app.css";
  let { children, data } = $props();

  //$inspect(data);
</script>

<div class="mb-20">
  <a class="text-inherit no-underline" href="/">
    <div class="g-top-level-container mb-16">
      <div class="flex flex-row gap-10 items-center">
        <img src="/assets/images/oflog_crest_black.png" alt="MHCLG crest" />
        <div class="flex flex-col leading-tight">
          <h3>Svelte Component Library</h3>

          <p class="font-normal italic m-0 text-3xl">MHCLG Data Tools Team</p>
        </div>
      </div>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
  </a>

  <div class="g-top-level-container mb-6">
    <Breadcrumbs collapseOnMobile={true} />
  </div>

  {@render children()}
</div>
