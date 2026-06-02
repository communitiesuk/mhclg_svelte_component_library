<script>
  let { textSize = "s", axisLabels = ["Left", "Right"] } = $props();
</script>

<div class="axis govuk-body-{textSize}">
  <div class="left-label">
    <div class="arrow-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        viewBox="0 0 18 16"
      >
        <path
          d="M8 1L1 8L8 15M1 8H17"
          stroke="darkgrey"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
    <span class="axis-text">{axisLabels[0]}</span>
  </div>
  <div class="right-label">
    <span class="axis-text">{axisLabels[1]}</span>
    <div class="arrow-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        viewBox="0 0 18 16"
      >
        <path
          d="M10 1L17 8L10 15M17 8H1"
          stroke="darkgrey"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  </div>
</div>

<style>
  svg {
    overflow: visible;
  }

  .axis {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
  }

  .left-label,
  .right-label {
    display: flex;
    gap: 4px;
    max-width: 120px;
  }

  .right-label {
    text-align: end;
  }

  .axis-text {
    font-family: "GDS Transport";
    line-height: 0.9;
    color: #666666;
    font-style: italic;
  }

  .arrow-container {
    display: flex;
    align-items: center;
  }
</style>
