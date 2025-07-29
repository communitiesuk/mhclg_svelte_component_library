export const npmInstall = `
npm install @communitiesuk/svelte-component-library

`;

export const importComponents = `
import { 
  InternalHeader, 
  NotificationBanner, 
  WarningText, 
  SearchAutocomplete, 
  Accordion 
} from "@communitiesuk/svelte-component-library";

`;

export const enableGovukStyles = `
<script>
  document.body.className +=
    " js-enabled" +
    ("noModule" in HTMLScriptElement.prototype
      ? " govuk-frontend-supported"
      : "");
</script>

`;

export const enableRebrandStyles = `
<body class="govuk-template--rebranded">
  <!-- Your app content -->
  %sveltekit.body%
</body>

`;

export const rebrandComponentExample = `
import { Footer, Header } from "@communitiesuk/svelte-component-library";

// Use rebrand=true to show additional rebranded markup
<Header rebrand={true} />
<Footer rebrand={true} />

`;
