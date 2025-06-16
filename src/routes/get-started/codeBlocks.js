export const npmrcConfig = `
@communitiesuk:registry=https://npm.pkg.github.com

`;

export const npmLogin = `
npm login --scope=@communitiesuk --auth-type=legacy --registry=https://npm.pkg.github.com

`;

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
