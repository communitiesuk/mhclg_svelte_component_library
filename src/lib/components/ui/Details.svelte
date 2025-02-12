<script>
  let { textColor } = $props();
</script>

<details style="color: {textColor}">
  <summary><span>Summary text</span></summary>
  <div>
    This is information that only certain users need to see. It is hidden from
    view by default to make scanning the page easier for the majority of users.
  </div>
</details>
