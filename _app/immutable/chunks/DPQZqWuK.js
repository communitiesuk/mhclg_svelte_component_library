import"./CWj6FrbW.js";import{p as z,f as g,s as i,a as V,c,r as m,t as R,x as a,D as L,G as D,a9 as H,z as f,u as N,I as j}from"./DRw07N7P.js";import{t as p,c as J,a as l,s as K}from"./Bdkmpx2T.js";import{s as q}from"./CGhnogCl.js";import{B as Q,d as X}from"./wLPDWOpb.js";import{W as Z,P as ee,C as te,B as oe,a as re,t as ae,c as ne}from"./BEQRhj9f.js";import{p as se}from"./BtjiXYBI.js";import{k as ie}from"./lMwbQCpd.js";import{F as d}from"./C96CEqHX.js";import"./69_IOA4Y.js";import{e as le,i as ce}from"./Dsl0KG63.js";import{s as me}from"./dbxAgBfZ.js";import{i as pe}from"./BDiFQUq5.js";import{A as ge,a as ve}from"./BJjf8aHu.js";import{C as h}from"./B5yEtBhb.js";const de=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<Footer />`,he=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms and conditions" }
  ];
<\/script>

<Footer {inlineLinks} />`,ue=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];
<\/script>

<Footer {sections} />`,fe=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/cookies", label: "Cookies" },
    { href: "/contact", label: "Contact" }
  ];

  const metaCustomContent = 'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>';
<\/script>

<Footer
  {sections}
  {inlineLinks}
  {metaCustomContent}
  showLicence={true}
  showCopyright={true}
  copyrightLogoUrl="/assets/images/govuk-crest.svg"
  copyrightText="© Crown copyright"
  copyrightHref="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Open Government Licence v3.0"
  licenceTextAfter=", except where otherwise stated"
  licenceHref="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
  crownSvgPath="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
/>`,ye=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { 
      href: "/welsh", 
      label: "Rhestr o Wasanaethau Cymraeg",
      lang: "cy",        // ISO 639-1 Welsh language code
      hrefLang: "cy"     // Indicates linked document is in Welsh
    }
  ];
<\/script>

<Footer {inlineLinks} />`,be=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using a custom logo image for the crown copyright section -->
<Footer copyrightLogoUrl="/path/to/your/custom-crest.svg" />`,we=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using custom copyright text -->
<Footer copyrightText="© Your Organization 2024" />`,_e=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using both custom logo and text -->
<Footer 
  copyrightLogoUrl="/path/to/your/organization-logo.svg"
  copyrightText="© Your Organization 2024"
/>`,ke=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Fully customised footer with all customisable props -->
<Footer 
  copyrightLogoUrl="/path/to/your/logo.svg"
  copyrightText="© Your Organization 2024" 
  copyrightHref="https://your-org.com/copyright"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Custom Licence v1.0"
  licenceTextAfter=", except where otherwise noted"
  licenceHref="https://your-org.com/licence"
  crownSvgPath="M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z" 
/>`,Ce=r=>{var t=He(),e=g(t),o=c(e);d(o,{}),m(e);var n=i(e,2);h(n,{get code(){return de},language:"svelte"}),l(r,t)},xe=r=>{var t=Pe(),e=g(t),o=c(e);d(o,{inlineLinks:[{href:"/help",label:"Help"},{href:"/contact",label:"Contact"},{href:"/terms",label:"Terms and conditions"}]}),m(e);var n=i(e,2);h(n,{get code(){return he},language:"svelte"}),l(r,t)},Ae=r=>{var t=Ee(),e=g(t),o=c(e);d(o,{sections:[{title:"Services and information",columns:2,items:[{href:"/benefits",label:"Benefits"},{href:"/business",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"/how-government-works",label:"How government works"},{href:"/departments",label:"Departments"}]}]}),m(e);var n=i(e,2);h(n,{get code(){return ue},language:"svelte"}),l(r,t)},Fe=r=>{var t=Ue(),e=g(t),o=c(e);d(o,{sections:[{title:"Services and information",columns:2,items:[{href:"/benefits",label:"Benefits"},{href:"/business",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"/how-government-works",label:"How government works"},{href:"/departments",label:"Departments"}]}],inlineLinks:[{href:"/help",label:"Help"},{href:"/cookies",label:"Cookies"},{href:"/contact",label:"Contact"}],metaCustomContent:'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>',showLicence:!0,showCopyright:!0,copyrightLogoUrl:"/assets/images/govuk-crest.svg",copyrightText:"© Crown copyright",copyrightHref:"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",licenceTextBefore:"All content is available under the ",licenceLinkText:"Open Government Licence v3.0",licenceTextAfter:", except where otherwise stated",licenceHref:"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",crownSvgPath:"M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"}),m(e);var n=i(e,2);h(n,{get code(){return fe},language:"svelte"}),l(r,t)},Le=r=>{var t=$e(),e=g(t),o=c(e);d(o,{inlineLinks:[{href:"/help",label:"Help"},{href:"/contact",label:"Contact"},{href:"/welsh",label:"Rhestr o Wasanaethau Cymraeg",lang:"cy",hrefLang:"cy"}]}),m(e);var n=i(e,2);h(n,{get code(){return ye},language:"svelte"}),l(r,t)},Be=r=>{var t=We(),e=g(t),o=i(c(e),2);d(o,{copyrightLogoUrl:"/assets/images/favicon.svg",metaCustomContent:"This example shows a custom crown copyright logo"}),m(e);var n=i(e,2);h(n,{get code(){return be},language:"svelte"}),l(r,t)},Te=r=>{var t=De(),e=g(t),o=i(c(e),2);d(o,{copyrightText:"© Your Organization 2024",metaCustomContent:"This example shows custom copyright text"}),m(e);var n=i(e,2);h(n,{get code(){return we},language:"svelte"}),l(r,t)},Oe=r=>{var t=je(),e=g(t),o=i(c(e),2);d(o,{copyrightLogoUrl:"/assets/images/favicon.svg",copyrightText:"© Your Organisation 2024",metaCustomContent:"Combined customisation example"}),m(e);var n=i(e,2);h(n,{get code(){return _e},language:"svelte"}),l(r,t)},Se=r=>{var t=ze(),e=g(t),o=i(c(e),2);d(o,{copyrightLogoUrl:"/assets/images/favicon.svg",copyrightText:"© Your Organisation 2024",copyrightHref:"https://example.org/copyright",licenceTextBefore:"All content is available under the ",licenceLinkText:"Custom Licence v1.0",licenceTextAfter:", except where otherwise noted",licenceHref:"https://example.org/licence",crownSvgPath:"M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z",metaCustomContent:"Fully customised footer example"}),m(e);var n=i(e,2);h(n,{get code(){return ke},language:"svelte"}),l(r,t)};var He=p('<div class="py-5 bg-white"><!></div> <!>',1),Pe=p('<div class="py-5 bg-white"><!></div> <!>',1),Ee=p('<div class="py-5 bg-white"><!></div> <!>',1),Ue=p('<div class="py-5 bg-white"><!></div> <!>',1),$e=p('<div class="py-5 bg-white"><!></div> <!>',1),We=p(`<div class="py-5 bg-white"><p class="govuk-body">You can customise the Crown Copyright logo by providing a different image
      URL:</p> <!></div> <!>`,1),De=p('<div class="py-5 bg-white"><p class="govuk-body">You can also customise the copyright text displayed in the footer:</p> <!></div> <!>',1),je=p('<div class="py-5 bg-white"><p class="govuk-body">You can combine multiple customisations to fully personalise the footer:</p> <!></div> <!>',1),ze=p(`<div class="py-5 bg-white"><p class="govuk-body">You can customise all aspects of the footer, including the licence text,
      URLs, and SVG paths:</p> <!></div> <!>`,1),Ve=p('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ie=p('<span slot="header" class="text-lg"> </span>'),Ye=p('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ge(r,t){z(t,!1);let e=[{id:"1",heading:"1. Basic Usage",content:Ce},{id:"2",heading:"2. With Inline Links",content:xe},{id:"3",heading:"3. With Navigation Sections",content:Ae},{id:"4",heading:"4. Full Featured Footer",content:Fe},{id:"5",heading:"5. With Language Attributes (Welsh Example)",content:Le},{id:"6",heading:"6. Custom Crown Copyright Logo",content:Be},{id:"7",heading:"7. Custom Copyright Text",content:Te},{id:"8",heading:"8. Combined Customisations",content:Oe},{id:"9",heading:"9. Fully Customised Footer",content:Se}];pe();var o=Ye(),n=i(c(o),2);ge(n,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(B,y)=>{var C=J(),b=g(C);le(b,1,()=>e,ce,(S,x)=>{ve(S,{children:(A,T)=>{var v=Ve(),u=c(v);me(u,()=>a(x).content),m(v),l(A,v)},$$slots:{default:!0,header:(A,T)=>{var v=Ie(),u=c(v,!0);m(v),R(()=>K(u,a(x).heading)),l(A,v)}}})}),l(B,C)},$$slots:{default:!0}}),m(o),l(r,o),V()}const I=(r,t=L,e=L,o=L,n=L)=>{Q(r,{get name(){return t()},get folder(){return e()},get subFolder(){return o()},get homepage(){return n()},statusObject:Me,parentFolder:"components-update"})},Y=(r,t=L)=>{oe(r,{get homepage(){return t()},detailsArray:Je,connectedComponentsArray:Ke})};let Me={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Re=["A footer component that provides navigation, meta information, and licensing details.",'Based on the <a href="https://design-system.service.gov.uk/components/footer/" target="_blank" rel="noopener noreferrer">GOV.UK Design System footer component</a> pattern.'],Ne=["Use the footer component to help users navigate your service and find meta information.","The footer can be configured to show different levels of navigation, from a simple copyright notice to a full navigation menu."],Je=[{label:"Description",arr:Re,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ne,visibleOnHomepage:!1,markdown:!1}],Ke=[];var qe=p('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Qe(r,t){z(t,!0);const e=s=>{d(s,q(()=>a(v)))};let o=se.url.pathname.split("/"),n=ie(o[o.length-1]),B=D(H(X.md)),y=f(()=>re([{name:"sections",category:"Content",value:[{title:"Services and information",columns:2,items:[{href:"#",label:"Benefits"},{href:"#",label:"Births, deaths, marriages and care"},{href:"#",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"#",label:"How government works"},{href:"#",label:"Departments"},{href:"#",label:"Worldwide"}]}]},{name:"inlineLinks",category:"Content",value:[{href:"#",label:"Help"},{href:"#",label:"Cookies"},{href:"#",label:"Contact"}]},{name:"metaCustomContent",category:"Content",value:'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>'},{name:"containerWidth",category:"UI Options",value:"govuk-width-container"},{name:"showLicence",category:"UI Options",value:!0},{name:"showCopyright",category:"UI Options",value:!0},{name:"copyrightText",category:"UI Options",value:"© Crown copyright"},{name:"copyrightLogoUrl",category:"UI Options",value:"/assets/images/govuk-crest.svg"},{name:"licenceTextBefore",category:"Advanced Customisation",value:"All content is available under the "},{name:"licenceLinkText",category:"Advanced Customisation",value:"Open Government Licence v3.0"},{name:"licenceTextAfter",category:"Advanced Customisation",value:", except where otherwise stated"},{name:"licenceHref",category:"Advanced Customisation",value:"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"},{name:"crownSvgPath",category:"Advanced Customisation",value:"M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"},{name:"copyrightHref",category:"Advanced Customisation",value:"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"}])),C=function(s,w,O){return s.map(_=>{let k=O[_.name]??_.value;return _.isEditable===w&&k!=null?typeof k=="object"?JSON.stringify(k,null,2):k:null})},b=D(H(C(a(y),!0,{}))),S=f(()=>({})),x=f(()=>C(a(y),!1,a(S))),A=f(()=>ae(a(y),a(b))),T=f(()=>ne(a(y),a(b),a(x))),v=f(()=>a(T)[0]),u=f(()=>a(T)[1]),F=H({});N(()=>{a(u).forEach(s=>{F[s]=!0}),Object.keys(F).forEach(s=>{a(u).includes(s)||(F[s]=!1)})});let G=f(()=>Object.fromEntries(Object.entries(a(v)).map(([s,w])=>{var O,_;return[s,typeof w=="function"?(_=(O=a(y).find(k=>k.name===s))==null?void 0:O.functionElements)==null?void 0:_.functionAsString:w]})));var P=qe(),E=g(P);Z(E,{wrapper:{component:{WrapperInformation:Y,WrapperNameAndStatus:I},name:n},homepage:!1});var U=i(E,2);ee(U,{get parametersParsingErrorsArray(){return a(u)},get parametersParsingErrorsObject(){return F},onCloseFunction:s=>a(u).filter(w=>w!=s)});var $=i(U,2);te($,{Component:e,get parametersSourceArray(){return a(y)},get derivedParametersValuesArray(){return a(x)},get parametersVisibleArray(){return a(A)},get parametersParsingErrorsObject(){return F},get copyParametersToClipboardObject(){return a(G)},get demoScreenWidth(){return a(B)},set demoScreenWidth(s){j(B,s,!0)},get statedParametersValuesArray(){return a(b)},set statedParametersValuesArray(s){j(b,s,!0)}});var W=i($,2),M=c(W);Ge(M,{}),m(W),l(r,P),V()}const vt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Y,WrapperNameAndStatus:I,default:Qe},Symbol.toStringTag,{value:"Module"}));export{vt as _};
