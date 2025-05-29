# Pull request template

## For adding a new component with status `Baseline completed`

A component's status should be updated to `Baseline completed` when the core functionality for the component has been completed and it is ready for use in prototyping.

`Baseline completed` components have not necessarily passed review for responsive design, accessibility, progressive enhancement and real-use testing.

Therefore, developers should be prepared that these components may be modified in the future. Where modifications occur, a new version of the component library will be published and a description of the updates will be included in the change log.

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
