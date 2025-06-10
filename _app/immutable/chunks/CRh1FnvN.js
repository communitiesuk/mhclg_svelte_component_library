import"./CWj6FrbW.js";import"./69_IOA4Y.js";import{p as j,a as A,aZ as $,s as e,c as r,x as s,r as l}from"./Cp2qfsB-.js";import{o as q}from"./Df23Nigv.js";import{t as d,a as n,b as g}from"./R2PrfaHS.js";import{i as P}from"./CFu0OaE2.js";import{W as C}from"./CPxN_vK_.js";import{I as c}from"./DE37Q7_V.js";import{C as i}from"./BywTUfDC.js";import{R as K}from"./zQ6TzLGj.js";const R=`
@communitiesuk:registry=https://npm.pkg.github.com

`,W=`
npm login --scope=@communitiesuk --auth-type=legacy --registry=https://npm.pkg.github.com

`,M=`
npm install @communitiesuk/svelte-component-library@0.1.16

`,O=`
import { 
  InternalHeader, 
  NotificationBanner, 
  WarningText, 
  SearchAutocomplete, 
  Accordion 
} from "@communitiesuk/svelte-component-library";

`,U=`
<script>
  document.body.className +=
    " js-enabled" +
    ("noModule" in HTMLScriptElement.prototype
      ? " govuk-frontend-supported"
      : "");
<\/script>

`;var E=d('<meta name="description" content="Learn how to install and use the MHCLG Svelte Component Library in your projects.">'),J=d(`This guide assumes you already have a SvelteKit project set up. If you
        need to create a new SvelteKit project, follow the official SvelteKit
        documentation at <a href="https://svelte.dev/docs/kit/creating-a-project" class="govuk-link" rel="external">svelte.dev/docs/kit/creating-a-project</a>`,1),N=d(`<div class="govuk-grid-row"><div class="govuk-grid-column-full"><h1 class="govuk-heading-xl">Get started</h1> <p class="govuk-body-l">Learn how to install and use the MHCLG Svelte Component Library in your
      SvelteKit projects.</p> <!> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Installation</h2> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 1: Create a GitHub Personal Access Token</h3> <ol class="govuk-list govuk-list--number"><li>Log in to your GitHub account</li> <li>Navigate to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>Personal access tokens</strong></li> <li>Click <strong>Generate new token</strong> (classic)</li> <li>Provide a descriptive name and set expiration if needed</li> <li>Select the following scopes: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2"><li><code class="svelte-17tkqxu">write:packages</code> - Upload packages to GitHub Package Registry</li> <li><code class="svelte-17tkqxu">read:packages</code> - Download packages from GitHub Package Registry</li> <li><code class="svelte-17tkqxu">repo</code> - Repository access</li></ul></li> <li>Click <strong>Generate token</strong> and save it securely</li></ol> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 2: Configure npm registry</h3> <p class="govuk-body">Add the GitHub registry path to your <code class="svelte-17tkqxu">.npmrc</code> file:</p> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 3: Authenticate with npm</h3> <p class="govuk-body">Run the following command in your terminal:</p> <!> <p class="govuk-body">Enter your GitHub username and use your Personal Access Token as the
      password.</p> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 4: Install the package</h3> <p class="govuk-body">Install the latest version of the component library:</p> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Usage</h2> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Importing components</h3> <p class="govuk-body">Import components in your Svelte files:</p> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Enable GOV.UK Frontend styles</h3> <p class="govuk-body">Add this script tag to your <code class="svelte-17tkqxu">app.html</code> file in the body section.
      This is required because the GOV.UK Frontend CSS that ships with our component
      library checks the document body for JavaScript availability to progressively
      enhance components.</p> <!> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Next steps</h2> <ul class="govuk-list govuk-list--bullet"><li><a href="/components" class="govuk-link">Browse our components</a> to see
        what's available</li> <li><a href="/patterns" class="govuk-link">Explore patterns</a> for common design
        solutions</li> <li><a href="/community" class="govuk-link">Join the community</a> to contribute
        and get support</li></ul> <h2 class="govuk-heading-l govuk-!-margin-top-8">Support</h2> <p class="govuk-body">If you need help or have questions:</p> <ul class="govuk-list govuk-list--bullet"><li>Check the <a href="https://github.com/communitiesuk/oflog_svelte_component_library" class="govuk-link" rel="external">GitHub repository</a> for issues and documentation</li></ul> <div class="govuk-!-margin-top-6"><!></div> <div class="govuk-!-margin-top-8"><!></div></div></div>`);function B(T,H){j(H,!1),P();var u=N();q(a=>{var t=E();$.title="Get started - MHCLG Svelte Component Library",n(a,t)});var m=r(u),v=e(r(m),4);C(v,{assistiveText:"Warning",text:"This service is in development and intended to be production-ready by Autumn 2025. In the meantime, we welcome developers to install the package and try it out."});var h=e(v,2);c(h,{content:t=>{s();var o=J();s(),n(t,o)},$$slots:{content:!0}});var k=e(h,4);C(k,{assistiveText:"Warning",text:"This package is currently privately published to the GitHub npm package registry. You'll need to authenticate before installation."});var y=e(k,10);i(y,{get code(){return R},language:"bash",filename:"",extension:".npmrc"});var b=e(y,6);i(b,{get code(){return W},language:"bash",filename:"Terminal",extension:"",theme:"github-dark"});var f=e(b,8);i(f,{get code(){return M},language:"bash",filename:"Terminal",extension:"",theme:"github-dark"});var _=e(f,4);c(_,{content:t=>{s();var o=g(`The component library includes all necessary CSS and JavaScript files.
        When you install the package, GOV.UK Frontend styles & assets as well as
        custom styles and assets are automatically included out of the box.`);n(t,o)},$$slots:{content:!0}});var x=e(_,6);i(x,{get code(){return O},language:"javascript",filename:"App",extension:".svelte"});var S=e(x,6);c(S,{content:t=>{s();var o=g(`We are working on scoping this JavaScript check within individual
        components, so this script requirement will be removed in a future
        version of the library.`);n(t,o)},$$slots:{content:!0}});var w=e(S,2);i(w,{get code(){return U},language:"html",filename:"app",extension:".html"});var p=e(w,12),I=r(p);c(I,{content:t=>{s();var o=g(`This is an alpha release. The API may change as we continue to develop
          and improve the library based on user feedback.`);n(t,o)},$$slots:{content:!0}}),l(p);var G=e(p,2),L=r(G);K(L,{sections:[{type:"main",id:"related-content",title:"Related content",links:[{title:"Svelte documentation",url:"https://svelte.dev/docs"}]}]}),l(G),l(m),l(u),n(T,u),A()}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));export{oe as _,B as a};
