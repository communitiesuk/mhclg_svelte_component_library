<script>
  let { textColor } = $props();
</script>

<details style="color: {textColor}">
  <summary><span>Summary text</span></summary>
  <div>
    This is information that only certain users need to see. For this reason we
    have hidden from view to make scanning the page easier for the majority of
    users.
  </div>
</details>
