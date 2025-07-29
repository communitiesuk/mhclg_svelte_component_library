# MHCLG Svelte Component Library

A comprehensive component library for government digital services, built with Svelte 5 and following GOV.UK Design System principles.

## Prerequisites

This component library is designed for use with:

- **SvelteKit projects** - The components are built for SvelteKit applications

- **Svelte 5** - Components use the latest Svelte 5 syntax and runes

## Documentation and Examples

Visit our [component library documentation](https://communitiesuk.github.io/mhclg_svelte_component_library/) for:

- Interactive component examples
- API documentation
- Usage patterns and best practices
- Installation guides

## Quick Start Installation

The package is publicly available on npm:

```bash
npm install @communitiesuk/svelte-component-library@latest
```

## Usage

### GOV.UK Frontend Styles

To ensure GOV.UK styles are applied correctly, add this script tag to your `app.html` file in the body section:

```html
<script>
  document.body.className +=
    " js-enabled" +
    ("noModule" in HTMLScriptElement.prototype
      ? " govuk-frontend-supported"
      : "");
</script>
```

This is required because the GOV.UK Frontend CSS checks the document body for JavaScript availability to progressively enhance components.

### GOV.UK Rebranded Styles (Optional)

To use the refreshed GOV.UK brand (launched June 2025), add the `govuk-template--rebranded` class to your `app.html` body element:

```html
<body class="govuk-template--rebranded">
  <!-- Your app content -->
</body>
```

**When to use rebrand:**

- **Global CSS styles**: The `govuk-template--rebranded` class on `<body>` automatically applies rebranded styles to all components
- **Component markup**: Some components (like Footer and Header) have a `rebrand` prop that controls whether they show additional rebranded markup elements (like the crown logo). The rebrand prop is set to true by default on all relavent componets - you can specify false should you want to keep the old markup and assets.
- **Assets**: Rebranded components will use updated assets (logos, icons) from the `/assets/rebrand/` folder

**Example with rebranded Footer:**

```javascript
import { Footer } from "@communitiesuk/svelte-component-library";

// Use rebrand=true to show the crown logo at top of footer
<Footer rebrand={true} />;
```

### Importing Components

Import components directly from the package:

```javascript
import {
  InternalHeader,
  NotificationBanner,
  WarningText,
  SearchAutocomplete,
  Accordion,
} from "@communitiesuk/svelte-component-library";
```

# Releasing a new version of the Svelte Component Library

This guide outlines the steps to bump the version of your package, tag the release in Git, and publish to npm.

## 1. Commit Your Changes

Before versioning, ensure all your code changes are committed to Git:

```bash
git add .
git commit -m "Your descriptive commit message"
```

Make sure you are on your main development branch you want to release (e.g., `main`).

## 2. Bump the Package Version

Use the `npm version` command to update `package.json` and `package-lock.json`, create a commit, and create an annotated Git tag. Choose **one** of the following based on [Semantic Versioning (SemVer)](https://semver.org/):

- **Patch Release (Bug fixes, tiny changes - e.g., 1.0.0 → 1.0.1):**

  ```bash
  npm version patch
  ```

- **Minor Release (New features, backwards compatible - e.g., 1.0.0 → 1.1.0):**

  ```bash
  npm version minor
  ```

- **Major Release (Breaking changes - e.g., 1.0.0 → 2.0.0):**
  ```bash
  npm version major
  ```

This command will:

- Update the version number in `package.json` and `package-lock.json`
- Create a new commit with the version bump
- Create a Git tag with the new version number

## 3. Push Changes and Tags

Push the commit and the new tag created by `npm version` to the remote Git repository (e.g., GitHub):

```bash
git push && git push --tags
```

- `git push`: Pushes the version commit.
- `git push --tags`: Pushes the newly created version tag.

## 4. Create a GitHub Release

1. Go to the GitHub repository
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. Select the tag you just created (e.g., `v1.0.1`)
5. Add a release title and description
6. Click "Publish release"

## 5. Automatic Publishing

Once you create the GitHub release, If you now go to the "Actions" tab in the repo's horizontal nav bar, you'll see the publish workflow being triggered. The GitHub Actions workflow (`.github/workflows/npm-publish.yml`) will automatically:

- Build the package
- Publish it to npm public registry
- Make it available for installation via `npm install @communitiesuk/svelte-component-library`

## 6. Verify the Release

After the GitHub Action completes, verify that your package was published successfully:

1. Check the [npm package page](https://www.npmjs.com/package/@communitiesuk/svelte-component-library)
2. Try installing the new version in a test project:
   ```bash
   npm install @communitiesuk/svelte-component-library@latest
   ```

## Notes

- Only create releases from the "main" branch to ensure stability
- Always test changes thoroughly before creating a release
- Consider creating pre-release versions for testing: `npm version prerelease --preid=alpha`

# Developing and Building Commands

This project is built with [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte). Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Developing

Start a development server:

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
