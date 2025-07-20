import"./CWj6FrbW.js";import"./69_IOA4Y.js";import{p as w,a as C,b2 as T,s as e,c as o,y as c,r as a}from"./DAeYpASc.js";import{f as p,h as j,a as n,t as G}from"./BAP9DKun.js";import{i as I}from"./DFpCoyn2.js";import{W as L}from"./CD19JL95.js";import{I as b}from"./0M93jHsl.js";import{C as u}from"./ip80KjXp.js";import{R as K}from"./Dj9RhRK_.js";const H=`
npm install @communitiesuk/svelte-component-library

`,M=`
import { 
  InternalHeader, 
  NotificationBanner, 
  WarningText, 
  SearchAutocomplete, 
  Accordion 
} from "@communitiesuk/svelte-component-library";

`,$=`
<script>
  document.body.className +=
    " js-enabled" +
    ("noModule" in HTMLScriptElement.prototype
      ? " govuk-frontend-supported"
      : "");
<\/script>

`;var A=p('<meta name="description" content="Learn how to install and use the MHCLG Svelte Component Library in your projects."/>'),O=p(`This guide assumes you already have a SvelteKit project set up. If you
        need to create a new SvelteKit project, follow the official SvelteKit
        documentation at <a href="https://svelte.dev/docs/kit/creating-a-project" class="govuk-link" rel="external">svelte.dev/docs/kit/creating-a-project</a>`,1),W=p(`<div class="govuk-grid-row"><div class="govuk-grid-column-full"><h1 class="govuk-heading-xl">Get started</h1> <p class="govuk-body-l">Learn how to install and use the MHCLG Svelte Component Library in your
      SvelteKit projects.</p> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Installation</h2> <p class="govuk-body">The component library is publicly available on npm, making installation
      straightforward:</p> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Usage</h2> <p class="govuk-body">The component library includes all necessary CSS and JavaScript files.
      When you install the package, GOV.UK Frontend styles & assets as well as
      custom styles and assets are automatically included out of the box.</p> <h3 class="govuk-heading-m govuk-!-margin-top-6">Enable GOV.UK Frontend styles</h3> <p class="govuk-body">Add this script tag to your <code class="svelte-17tkqxu">app.html</code> file in the body section.
      This is required because the GOV.UK Frontend CSS that ships with our component
      library checks the document body for JavaScript availability to progressively
      enhance components.</p> <!> <!> <h3 class="govuk-heading-m govuk-!-margin-top-6">Importing components</h3> <p class="govuk-body">Import components in your Svelte files:</p> <!> <h2 class="govuk-heading-l govuk-!-margin-top-8">Next steps</h2> <ul class="govuk-list govuk-list--bullet"><li><a href="/components" class="govuk-link">Browse our components</a> to see
        what's available</li> <li><a href="/patterns" class="govuk-link">Explore patterns</a> for common design
        solutions</li> <li><a href="/community" class="govuk-link">Join the community</a> to contribute
        and get support</li></ul> <h2 class="govuk-heading-l govuk-!-margin-top-8">Support</h2> <p class="govuk-body">If you need help or have questions:</p> <ul class="govuk-list govuk-list--bullet"><li>Check the <a href="https://github.com/communitiesuk/oflog_svelte_component_library" class="govuk-link" rel="external">GitHub repository</a> for issues and documentation</li></ul> <div class="govuk-!-margin-top-6"><!></div> <div class="govuk-!-margin-top-8"><!></div></div></div>`);function q(f,_){w(_,!1),I();var s=W();j(l=>{var t=A();T.title="Get started - MHCLG Svelte Component Library",n(l,t)});var d=o(s),v=e(o(d),4);b(v,{content:t=>{c();var r=O();c(),n(t,r)},$$slots:{content:!0}});var m=e(v,6);u(m,{get code(){return H},language:"bash",filename:"Terminal",extension:"",theme:"github-dark"});var g=e(m,10);b(g,{content:t=>{c();var r=G(`We are working on scoping this JavaScript check within individual
        components, so this script requirement will be removed in a future
        version of the library.`);n(t,r)},$$slots:{content:!0}});var h=e(g,2);u(h,{get code(){return $},language:"html",filename:"app",extension:".html"});var k=e(h,6);u(k,{get code(){return M},language:"javascript",filename:"App",extension:".svelte"});var i=e(k,12),S=o(i);L(S,{text:`This is an alpha release. The API may change as we continue to develop
        and improve the library based on user feedback.`}),a(i);var y=e(i,2),x=o(y);K(x,{sections:[{type:"main",id:"related-content",title:"Related content",links:[{title:"Svelte documentation",url:"https://svelte.dev/docs"}]}]}),a(y),a(d),a(s),n(f,s),C()}const z=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));export{z as _,q as a};
