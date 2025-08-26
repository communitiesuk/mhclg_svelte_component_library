<script>
  let { markerRadius = undefined, barWidth = undefined } = $props();
</script>

<div class="axis" style="--axis-padding:{markerRadius}px; width: {barWidth}">
  <div class="more-deprived">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="16"
      viewBox="0 0 11 16"
      fill="none"
    >
      <path
        d="M0.292893 7.29289C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928933L0.292893 7.29289ZM11 8L11 7L1 7L1 8L1 9L11 9L11 8Z"
        fill="#B1B4B6"
      ></path>
    </svg>
    <span>More deprived</span>
  </div>
  <div class="less-deprived">
    <span>Less deprived</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
    >
      <path
        d="M11.2071 8.70711C11.5976 8.31658 11.5976 7.68342 11.2071 7.2929L4.84315 0.928933C4.45262 0.538409 3.81946 0.538408 3.42893 0.928933C3.03841 1.31946 3.03841 1.95262 3.42893 2.34315L9.08579 8L3.42893 13.6569C3.03841 14.0474 3.03841 14.6805 3.42893 15.0711C3.81946 15.4616 4.45262 15.4616 4.84314 15.0711L11.2071 8.70711ZM0.5 8L0.5 9L10.5 9L10.5 8L10.5 7L0.5 7L0.5 8Z"
        fill="#B1B4B6"
      ></path>
    </svg>
  </div>
</div>

<style>
  .axis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--axis-padding);
  }

  .less-deprived,
  .more-deprived {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Tell the parent to act as a container */
  .axis {
    container-type: inline-size;
  }

  /* Container query: hide the child if parent's width is less than 400px */
  @container (max-width: 18rem) {
    .less-deprived {
      display: none;
    }
  }

  @container (max-width: 25rem) {
    .average {
      display: none;
    }
  }
</style>
