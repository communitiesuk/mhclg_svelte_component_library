import"./CWj6FrbW.js";import"./69_IOA4Y.js";import{p as O,a as U,aZ as E,s as e,c as o,x as a,r as n}from"./BQOcVDnD.js";import{t as y,A as J,a as i,b as m}from"./Dp3jeoTR.js";import{s as h}from"./CM6Y-JJe.js";import{i as N}from"./B_4Nsh1l.js";import{b as k}from"./Bw7G-u2X.js";import{W as j}from"./BHBmuhAy.js";import{I as c}from"./C4JJwA0X.js";import{C as l}from"./B8qjdm4g.js";import{R as B}from"./RhLzO9Zn.js";const F=`
@communitiesuk:registry=https://npm.pkg.github.com

`,V=`
npm login --scope=@communitiesuk --auth-type=legacy --registry=https://npm.pkg.github.com

`,D=`
npm install @communitiesuk/svelte-component-library@0.1.16

`,z=`
import { 
  InternalHeader, 
  NotificationBanner, 
  WarningText, 
  SearchAutocomplete, 
  Accordion 
} from "@communitiesuk/svelte-component-library";

`,Y=`
<script>
  document.body.className +=
    " js-enabled" +
    ("noModule" in HTMLScriptElement.prototype
      ? " govuk-frontend-supported"
      : "");
<\/script>

`;var Z=y('<meta name="description" content="Learn how to install and use the MHCLG Svelte Component Library in your projects.">'),Q=y(`This guide assumes you already have a SvelteKit project set up. If you
        need to create a new SvelteKit project, follow the official SvelteKit
        documentation at <a href="https://svelte.dev/docs/kit/creating-a-project" class="govuk-link" rel="external">svelte.dev/docs/kit/creating-a-project</a>`,1),X=y(`<div class="govuk-grid-row"><div class="govuk-grid-column-full"><h1 class="govuk-heading-xl">Get started</h1> <p class="govuk-body-l">Learn how to install and use the MHCLG Svelte Component Library in your
      SvelteKit projects.</p> <!> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Installation</h2> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 1: Create a GitHub Personal Access Token</h3> <ol class="govuk-list govuk-list--number"><li>Log in to your GitHub account</li> <li>Navigate to <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>Personal access tokens</strong></li> <li>Click <strong>Generate new token</strong> (classic)</li> <li>Provide a descriptive name and set expiration if needed</li> <li>Select the following scopes: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2"><li><code class="svelte-17tkqxu">write:packages</code> - Upload packages to GitHub Package Registry</li> <li><code class="svelte-17tkqxu">read:packages</code> - Download packages from GitHub Package Registry</li> <li><code class="svelte-17tkqxu">repo</code> - Repository access</li></ul></li> <li>Click <strong>Generate token</strong> and save it securely</li></ol> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 2: Configure npm registry</h3> <p class="govuk-body">Add the GitHub registry path to your <code class="svelte-17tkqxu">.npmrc</code> file:</p> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 3: Authenticate with npm</h3> <p class="govuk-body">Run the following command in your terminal:</p> <!> <p class="govuk-body">Enter your GitHub username and use your Personal Access Token as the
      password.</p> <h3 class="govuk-heading-m govuk-!-margin-top-6">Step 4: Install the package</h3> <p class="govuk-body">Install the latest version of the component library:</p> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Usage</h2> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Importing components</h3> <p class="govuk-body">Import components in your Svelte files:</p> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Enable GOV.UK Frontend styles</h3> <p class="govuk-body">Add this script tag to your <code class="svelte-17tkqxu">app.html</code> file in the body section.
      This is required because the GOV.UK Frontend CSS that ships with our component
      library checks the document body for JavaScript availability to progressively
      enhance components.</p> <!> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Next steps</h2> <ul class="govuk-list govuk-list--bullet"><li><a class="govuk-link">Browse our components</a> to see what's available</li> <li><a class="govuk-link">Explore patterns</a> for
        common design solutions</li> <li><a class="govuk-link">Join the community</a> to
        contribute and get support</li></ul> <h2 class="govuk-heading-l govuk-!-margin-top-8">Support</h2> <p class="govuk-body">If you need help or have questions:</p> <ul class="govuk-list govuk-list--bullet"><li>Check the <a href="https://github.com/communitiesuk/oflog_svelte_component_library" class="govuk-link" rel="external">GitHub repository</a> for issues and documentation</li></ul> <div class="govuk-!-margin-top-6"><!></div> <div class="govuk-!-margin-top-8"><!></div></div></div>`);function ee($,q){O(q,!1),N();var u=X();J(r=>{var t=Z();E.title="Get started - MHCLG Svelte Component Library",i(r,t)});var b=o(u),f=e(o(b),4);j(f,{assistiveText:"Warning",text:"This service is in development and intended to be production-ready by Autumn 2025. In the meantime, we welcome developers to install the package and try it out."});var _=e(f,2);c(_,{content:t=>{a();var s=Q();a(),i(t,s)},$$slots:{content:!0}});var x=e(_,4);j(x,{assistiveText:"Warning",text:"This package is currently privately published to the GitHub npm package registry. You'll need to authenticate before installation."});var S=e(x,10);l(S,{get code(){return F},language:"bash",filename:"",extension:".npmrc"});var w=e(S,6);l(w,{get code(){return V},language:"bash",filename:"Terminal",extension:"",theme:"github-dark"});var G=e(w,8);l(G,{get code(){return D},language:"bash",filename:"Terminal",extension:"",theme:"github-dark"});var C=e(G,4);c(C,{content:t=>{a();var s=m(`The component library includes all necessary CSS and JavaScript files.
        When you install the package, GOV.UK Frontend styles & assets as well as
        custom styles and assets are automatically included out of the box.`);i(t,s)},$$slots:{content:!0}});var T=e(C,6);l(T,{get code(){return z},language:"javascript",filename:"App",extension:".svelte"});var H=e(T,6);c(H,{content:t=>{a();var s=m(`We are working on scoping this JavaScript check within individual
        components, so this script requirement will be removed in a future
        version of the library.`);i(t,s)},$$slots:{content:!0}});var I=e(H,2);l(I,{get code(){return Y},language:"html",filename:"app",extension:".html"});var p=e(I,4),g=o(p),P=o(g);h(P,"href",k+"/components"),a(),n(g);var d=e(g,2),K=o(d);h(K,"href",k+"/patterns"),a(),n(d);var A=e(d,2),R=o(A);h(R,"href",k+"/community"),a(),n(A),n(p);var v=e(p,8),W=o(v);c(W,{content:t=>{a();var s=m(`This is an alpha release. The API may change as we continue to develop
          and improve the library based on user feedback.`);i(t,s)},$$slots:{content:!0}}),n(v);var L=e(v,2),M=o(L);B(M,{sections:[{type:"main",id:"related-content",title:"Related content",links:[{title:"Svelte documentation",url:"https://svelte.dev/docs"}]}]}),n(L),n(b),n(u),i($,u),U()}const ge=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));export{ge as _,ee as a};
