<script>
  // squareWidth is being passed down from a parent component
  let { squareWidth } = $props();
</script>

<svg>
  <!--sqareWidth is in curly braces because it's a variable-->
  <rect
    width={squareWidth}
    height="100"
    style="fill:#ADD8E6;stroke-width:1;stroke:#00008B"
  />
</svg>
