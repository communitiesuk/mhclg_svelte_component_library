# Pull request template - for feature branches

A feature branch should make edits/additions to a single component, or limited collection of closely connected components.

Previous pull request for this component or collection of closely connected components should be detailed in the table below.

### Previous pull requests:

| Branch name | Developed by | Reviewed by | Link to PR                        |
| :---------- | :----------- | :---------- | :-------------------------------- |
| XXX         | Developer A  | Developer B | [Add link to pull request here]() |

For any updated component, the developer should consider whether to update the component's status (it's main status tag and tick/cross sub-statuses on the wrapper page). A component's status should be updated when it is ready for a particular type of review. The reviewer will then tailor their review accordingly (e.g. if a component's sub-statuses is updated to include accessible, the reviewer will then test it against our accessibility checklist).

Definitions of each component status can be found on the library's [component statuses page.](https://communitiesuk.github.io/mhclg_svelte_component_library/get-started/component-statuses)

---

### Updated components:

| Name          | Folder   | Sub-Folder | Is new component? | Main status change                | Sub-statuses additions |
| :------------ | :------- | :--------- | ----------------- | --------------------------------- | ---------------------- |
| ComponentName | data-vis | line-chart | `False`           | In progress -> baseline completed | Accessible             |

---

When a component is created, its description and context should be added to the wrapper page. They should then be added to the table below.

For each following pull request, the developer must evaluate whether either of the description or context need to be amended or added to. If a change is made, the developer should detail in the table below to help the reviewer understand what changes have been made to how the component functions or is being used.

### Updated component information:

| Name          | Description                                               | Context                                               |
| :------------ | :-------------------------------------------------------- | :---------------------------------------------------- |
| ComponentName | Describe any changes to the component's description here. | Describe any changes to the component's context here. |

---

Changes to a component often create a necessity for changes to a connected component. Developer's should check connected components and then detail any changes to the ways in which component interact with each other in the table below.

### Connected components for checking:

| Component | Connected componnet | Change to interaction |
| ComponentName | ConnectedComponentName | Describe change to how these two components interact with each other here. |

---

Any new dependencies to external packages should be detailed in the table below. Reviewers can then check that this dependency is necessary and is the best approach.

### New dependencies:

| Dependency | Description |
| :--------- | :---------- |
| None       | -           |

---

The table below should list out the core features added as part of this pull request. This helps the reviewer understand the justifications for major changes.

### Core features added:

| Feature     | Description        |
| :---------- | :----------------- |
| Description | The Line component |

---

The table below encourages the developer to direct the reviewer towards specific checks (e.g. parts of their code where they're unsure whether they did it in the best way, or if they'd appreciate extra testing that behaviour is as expected).

### Requested checks:

| Check | Description |
| :---- | :---------- |
| -     | -           |

---

Developers are encouraged to write any further notes below which they think could be helpful to the reviewer.

### Additional notes:
