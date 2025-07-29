# Branching guidelines

The component library uses the following branching structure:

### `main`

Primary branch containing the most up-to-date, stable version of the library. Packaging and deployment on this branch are coupled, meaning that the latest published version of the package should always correspond with the static build deployed on github pages.

### `gh-pages`

A special branch containing the static build deployed on github pages. When `npm run publish-and-deploy` is executed on the main branch, the `gh-pages -d docs` command moves the main branch's `docs` folder to the `gh-pages` branch, which automatically triggers a re-deployment.

### `develop`

Primary integration branch where active development takes place before changes are merged into main for release.

### `feature/***`

Branches used for developing new components or features for existing components. Branches should be named to describe the added features, followed by a `|` and then must include the code of the corresponding Jira ticket (for example, `feature/search-with-postcode-API|OIT-999`).

Note that our strong preference is to make frequent, small pull requests. Therefore, developers are encouraged to split complex features into 'stacked' branches (e.g. `feature/search-with-postcode-API|OIT-999|stack-1` and `feature/search-with-postcode-API|OIT-999|stack-2`) where the `stack-2` branch is based on `stack-1`.

Stacked branches are a good approach when the feature is self-contained and you don't want to have to wait for part 1 to be reviewed before moving onto part 2.

Alternatively, developers can use 'chunked' branches (e.g. `feature/search-with-postcode-API|OIT-999|chunk-1` and `feature/search-with-postcode-API|OIT-999|chunk-2`) where `chunk-1` is reviewed and merged into `develop` and then `chunk-2` is started based on the `develop` branch.

Chunked branches are a good approach when the feature requires edits to shared code.

### `bugfix/***`

Branches used for fixing issues in `develop`. Branches should be named to descrbe the bugfix, followed by a `|` and then must include the code of the corresponding Jira ticket (for example, `bugfix/|OIT-999`).

### `hotfix/***`

Branches used for fixing issues in `main` (e.g. fixes to the already deployed app or published packaged). Branches should be named to descrbe the hotfix, followed by a `|` and then must include the code of the corresponding Jira ticket (for example, `hoyfix/|OIT-999`).

### `experiment/***`

Branches used for exploring ideas. Note that if an idea is accepted, a new `feature/***` branch should be created (e.g. `experiment/***` branches should never be merged into `develop`).
