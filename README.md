# Quick Start Insallation

Because this package is currenly privately published to the github npm package registry, you'll need to login to the pacakage registry before you can install the package. To login you'll need your github username and a personal access token with the correct permissions.

To get your personal access token on GitHub, follow these steps:
1. Log in to GitHub: Go to your GitHub account.
2. Navigate to Developer Settings:
    * Click on your profile photo in the upper-right corner of the page.
    * Select Settings.
    * In the left sidebar, click Developer settings.
3. Access Personal Access Tokens:
    * Under the Personal access tokens section in the sidebar, click either Tokens (classic) or Fine-grained tokens, depending on your preference.
4. Generate a New Token:
    * Click Generate new token (for classic tokens, select Generate new token (classic)).
    * Provide a descriptive name in the "Note" field.
    * Set an expiration date if needed.
    * Choose the required scopes or permissions for the token. For installing the package, we will need "write:packages" (Upload packages to GitHub Package Registry), "read:packages" (Download packages from GitHub Package Registry) and "repo".
    image.png
5. Generate and Save the Token:
    * Click Generate token.
    * Optionally, copy the new token to your clipboard for immediate use. Make sure to save it securely, as you won’t be able to view it again.

Next you will need to add the github registry path to the npm config file .npmrc so that npm knows to look for the package we want to authenticate for within the github registry rather than the npm website.

1. Add this line to the .npmrc file: @communitiesuk:registry=https://npm.pkg.github.com

Now we can login:

1. Enter the following command into the terminal: $ npm login --scope=@communitiesuk --auth-type=legacy --registry=https://npm.pkg.github.com

2. Enter your gihub username, followed by the PAC token we obtained in the previous step as the password. When copying the token into to terminal, it may not be visible. Press the "Enter" key regardless and it should submit.

> Username: USERNAME
> Password: TOKEN

More information about the github npm registry can be found here https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

Now you are logged in you can install the package

1. Enter the npm install command for this pacakge, using the lates version. The package should start installing.

To import a component from the newly installed package you can add an import statement in the following structure to your svelte page file:

import { InternalHeader, NotificationBanner, WarningText, SearchAutocomplete, Accordion} from "@communitiesuk/svelte-component-library";

See the documentation app for examples of how to use the imported components.

# Releasing Your Svelte Component Library

This guide outlines the steps to bump the version of your package, tag the release in Git, and push it to prepare for publishing.

## 1. Commit Your Changes

Before versioning, ensure all your code changes are committed to Git:

```bash
git add .
git commit -m "Your descriptive commit message"
```

Make sure you are on your main development branch you want to release (e.g., `main`).

## 2. Bump the Package Version

Use the `npm version` command to update `package.json` and `package-lock.json`, create a commit, and create an annotated Git tag. Choose **one** of the following based on [Semantic Versioning (SemVer)](https://semver.org/):

*   **Patch Release (Bug fixes, tiny changes - e.g., 0.1.8 -> 0.1.9):**
    ```bash
    npm version patch
    ```
*   **Minor Release (New features, backward-compatible - e.g., 0.1.8 -> 0.2.0):**
    ```bash
    npm version minor
    ```
*   **Major Release (Breaking changes - e.g., 0.1.8 -> 1.0.0):**
    ```bash
    npm version major
    ```
*   **Specific Version:**
    ```bash
    npm version <new-version> # Replace <new-version> with the desired version, e.g., 1.2.3
    ```

## 3. Push Changes and Tags

Push the commit and the new tag created by `npm version` to your remote Git repository (e.g., GitHub):

```bash
git push && git push --tags
```

*   `git push`: Pushes the version commit.
*   `git push --tags`: Pushes the newly created version tag.

## 4. Publishing (Automatic via GitHub Actions)

Now the tag has be pushed we can create a release on GitHub to trigger the GitHub Actions workflow defined in `.github/workflows/npm-publish-github-packages.yml`, which will handle the actual `npm publish` step to GitHub Packages.

Click on "create new release" from the repo homepage.
image.png

Choose the target branch that you want to release (e.g. main)

Choose the tag version pushed to github in a previous step

Click generate release notes, and add any additional write up to describe the changes in this release.

Amend the release title to something appropiate, including the version number in the titel.

Click "Set as pre-release" given the package is not stable yet.

Clicks publish release button.

If you now go to the "Actions" tab in the repos horizontal nav bar, you'll see the publish workflow being triggered. Once complete the package will be uploaded and the new version can be installed.

# create-svelte

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
