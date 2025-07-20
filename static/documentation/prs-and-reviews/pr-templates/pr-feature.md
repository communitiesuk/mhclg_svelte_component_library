# Pull request template #1

## For features branches

A feature branch should make edits/additions to a single component, or limited set of closely connected components.

### Updated components:

| Name                                | Folder | Sub-Folder |
| :---------------------------------- | :----- | :--------- |
| <div class="edits-here">Hello</div> | Line   | Data-Vis   |

For any updated component, the developer should update the component's status (it's tag and tick/cross categories on the wrapper page). Definitions of each component status can be found on the library's [component statuses page.](https://communitiesuk.github.io/mhclg_svelte_component_library/get-started/component-statuses)

Note that when a status is updated, that

---

### New component details:

| Key        | Value      |
| :--------- | :--------- |
| Name       | Line       |
| Folder     | data-vis   |
| Sub-folder | line-chart |

---

### New component information:

| Key         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description | The `Line` component receives an array of data and a lineFunction and combines them to render an SVG path element. <br><br>This path element can have hover and click events. It can also have markers, which can have their own optional hover and click events.                                                                                                                                                                                                                                                                                |
| Context     | Since the `Line` component renders an SVG path element it must be called within an `<svg>` element. <br><br>The Line component has been designed as a child component of `Lines`, which takes a full dataset and renders a line for each row, allowing developers to customise the styling and behaviour of lines in groups or individually.<br><br>The Lines component has, in turn, been designed as a child component of `LineChart`, which incorporates other components include `Axis` and labelling to form a complete data visualisation. |

---

### Connected components:

| Component   | Description of connectivity                        | Status            |
| :---------- | :------------------------------------------------- | :---------------- |
| `Lines`     | Calls `Line` component to render individual lines. | `In progress`     |
| `LineChart` | Calls `Lines` to render all lines.                 | Not yet developed |

---

### Dependencies:

| Dependency | Description | New dependency? |
| :--------- | :---------- | :-------------- |
| None       | -           | -               |

---

### Core features:

| Feature     | Description        |
| :---------- | :----------------- |
| Description | The Line component |

---

### Requested checks:

| Check | Description |
| :---- | :---------- |
| -     | -           |

---

### Additional notes:

<style>



.edits-here {
color: red
}

</style>
