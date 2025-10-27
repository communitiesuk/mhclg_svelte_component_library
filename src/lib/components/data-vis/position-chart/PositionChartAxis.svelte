<script>
  let {
    markerRadius = undefined,
    barWidth = undefined,
    textSize = "s",
  } = $props();
</script>

<div
  class="axis govuk-body-{textSize}"
  style="--axis-padding:{markerRadius}px; width: {barWidth}"
>
  <div class="more-deprived">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 11 20"
      fill="none"
    >
      <path
        transform="translate(20,21)rotate(180)"
        d="M 19.7071 12.7071 C 20.0976 12.3166 20.0976 11.6834 19.7071 11.2929 L 13.3431 4.9289 C 12.9526 4.5384 12.3195 4.5384 11.9289 4.9289 C 11.5384 5.3195 11.5384 5.9526 11.9289 6.3431 L 17.5858 12 L 11.9289 17.6568 C 11.5384 18.0474 11.5384 18.6805 11.9289 19.0711 C 12.3195 19.4616 12.9526 19.4616 13.3431 19.0711 L 19.7071 12.7071 Z M 4 12 L 4 13 L 19 13 L 19 12 L 19 11 L 9 11 L 4 11 Z"
        fill="black"
      ></path>
    </svg>
    <span class="axis-text">More deprived</span>
  </div>
  <div class="less-deprived">
    <span class="axis-text">Less deprived</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 11 20"
      fill="none"
    >
      <path
        transform="translate(-5,-3)"
        d="M 19.7071 12.7071 C 20.0976 12.3166 20.0976 11.6834 19.7071 11.2929 L 13.3431 4.9289 C 12.9526 4.5384 12.3195 4.5384 11.9289 4.9289 C 11.5384 5.3195 11.5384 5.9526 11.9289 6.3431 L 17.5858 12 L 11.9289 17.6568 C 11.5384 18.0474 11.5384 18.6805 11.9289 19.0711 C 12.3195 19.4616 12.9526 19.4616 13.3431 19.0711 L 19.7071 12.7071 Z M 4 12 L 4 13 L 19 13 L 19 12 L 19 11 L 9 11 L 4 11 Z"
        fill="black"
      ></path>
    </svg>
  </div>
</div>

<style>
  .axis {
    display: flex;
    justify-content: space-between;
    align-items: top;
    padding: 0 var(--axis-padding);
  }

  .less-deprived,
  .more-deprived {
    display: flex;
    align-items: top;

    gap: 2px;
  }

  .more-deprived {
    width: 45%;
  }

  .less-deprived {
    text-align: end;
    justify-content: end;
    width: 43%;
  }

  /* Tell the parent to act as a container */
  .axis {
    container-type: inline-size;
  }

  .axis-text {
    font-family: "GDS Transport";
    line-height: 0.9;
    color: black;
    font-style: italic;
  }
</style>
