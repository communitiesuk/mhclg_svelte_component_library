# Review checklist #1

## For reviewing a newly-added component applying for status `Baseline completed`

A component's status should be updated to `Baseline completed` when the core functionality for the component has been completed and it is ready for use in prototyping.

`Baseline completed` components have not necessarily passed review for responsive design, accessibility, progressive enhancement and real-use testing.

Therefore, developers should be prepared that these components may be modified in the future. Where modifications occur, a new version of the component library will be published and a description of the updates will be included in the change log.

### 1. Merging and pull requests

- [ ] Are there merge conflicts with the `Main` branch? <br>
      (developers should check for conflicts before submitting a pull request by merging `Main` into their branch.)

- [ ] Does the pull request clearly detail new dependencies and features, and list any specific checks which they want the review to focus on?

### 2. Is the component self-contained?

- [ ] Does the component have a simple and specific function? <br>
      (if the component's function is broad, the developer should consider splitting it into smaller child components.)

- [ ] Does the component fulfil its function with only reference to 'internal' code?

### 3. Is the component fully-functional and resuable?

- [ ] List the different use cases for the component. Can all of these use cases be achieved by adjusting the components props? <br>
      (if a use cases requires adjusting props in an opaque way, that use case should be demonstrated as an example.)

### 4. Are the component props well constructed?

- [ ] Are component props sorted into intuitive categories in the demo UI?
- [ ] Have component props been given names which accurately and succintly describe what they do? <br>
- [ ] Have component props been given reasonable default values where appropriate? <br>
      (generally, props should have default values unless they are derived from the data pipeline)

### 5. Is the component well-documented?

- [ ] Have component props been given descriptions where appropriate? <br>
- [ ] Does the component use clear and intuitive variable names? <br>
- [ ] Does the component include comments explaining the purpose of any complex code?

### 6. Is the component 'Svelte-y and healthy'?

- [ ] Are any props which are updated by the component but may need to be accessed by its parent component bindable? <br>
- [ ] Where the `$effect` rune is used, consider whether a `$state` and `$derived` runes could be used instead.<br>
- [ ]

### 7. Does the component access data in a flexible way?
