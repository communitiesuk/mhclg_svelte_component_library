<script>
  let { x, y, content } = $props();
</script>

<div class="tooltip" style="left: {x}px; top: {y}px;">
  {@html content}
</div>

<style>
  .tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 5px;
    pointer-events: none;
    font-size: 12px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>
