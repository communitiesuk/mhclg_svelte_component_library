<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg
  class="gem-c-search__icon"
  width="27"
  height="27"
  viewBox="0 0 27 27"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <circle
    cx="12.0161"
    cy="11.0161"
    r="8.51613"
    stroke="currentColor"
    stroke-width="3"
  ></circle>
  <line
    x1="17.8668"
    y1="17.3587"
    x2="26.4475"
    y2="25.9393"
    stroke="currentColor"
    stroke-width="3"
  ></line>
</svg>

<style>
  .gem-c-search__icon {
    pointer-events: none;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0.5);
  }
</style>
