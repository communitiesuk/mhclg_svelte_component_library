
<script>
  let { data } = $props();
</script>

<div>
{#if data}
    <svg width="600" height="600">
      <line
        x1={100}
        x2={100}
        y1={300}
        y2={100}
        stroke={'black'}
        stroke-width="2px"
      ></line>
    </svg>
{/if} 
</div>