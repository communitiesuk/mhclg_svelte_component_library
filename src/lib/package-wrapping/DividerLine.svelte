<script>
  let {
    directionIsVertical = false,
    color = '#cbd5e1',
    margin = '0px',
    thickness = '1px',
  } = $props();
</script>

{#if directionIsVertical}
  <div
    data-role="divider-line-vertical"
    class="self-stretch"
    style="margin: {margin}; border-left: {thickness} solid {color};"
  ></div>
{:else}
  <hr
    data-role="divider-line-horizontal"
    style="margin: {margin}; border-top: {thickness} solid {color}"
  />
{/if}
