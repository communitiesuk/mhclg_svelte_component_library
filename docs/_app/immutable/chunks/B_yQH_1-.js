import"./CWj6FrbW.js";import{p as z,f as g,s as i,a as I,c,r as m,t as J,y as o,D as L,I as D,ab as P,u as K,J as V,G as d,ac as q}from"./I52qY7cu.js";import{f as p,c as Q,a as l}from"./BBh-6AA0.js";import{s as X}from"./BHp14Q1u.js";import{B as Z,d as ee}from"./CksXbiQj.js";import{W as te,P as oe,C as re,B as ae,a as ne,t as se,c as ie}from"./RBHAvJlU.js";import{p as le}from"./DdYFA_Ud.js";import{k as ce}from"./lMwbQCpd.js";import{F as u}from"./Rci8PI--.js";import"./69_IOA4Y.js";import{s as me}from"./5F35P8og.js";import{s as pe}from"./BvNl7SXi.js";import{e as ge,i as ve}from"./n63ZiD1W.js";import{i as de}from"./MVh4sFtc.js";import{A as ue,a as he}from"./BS_vHGGP.js";import{C as h}from"./BN7FUiX4.js";const fe=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<Footer />`,ye=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms and conditions" }
  ];
<\/script>

<Footer {inlineLinks} />`,be=`<script>
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

<Footer {sections} />`,we=`<script>
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
/>`,_e=`<script>
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

<Footer {inlineLinks} />`,Ce=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using a custom logo image for the crown copyright section -->
<Footer copyrightLogoUrl="/path/to/your/custom-crest.svg" />`,ke=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using custom copyright text -->
<Footer copyrightText="© Your Organization 2024" />`,xe=`<script>
  import Footer from "$lib/components/layout/Footer.svelte";
<\/script>

<!-- Using both custom logo and text -->
<Footer 
  copyrightLogoUrl="/path/to/your/organization-logo.svg"
  copyrightText="© Your Organization 2024"
/>`,Ae=`<script>
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
/>`,Fe=a=>{var t=$e(),e=g(t),r=c(e);u(r,{}),m(e);var n=i(e,2);h(n,{get code(){return fe},language:"svelte"}),l(a,t)},Le=a=>{var t=Ue(),e=g(t),r=c(e);u(r,{inlineLinks:[{href:"/help",label:"Help"},{href:"/contact",label:"Contact"},{href:"/terms",label:"Terms and conditions"}]}),m(e);var n=i(e,2);h(n,{get code(){return ye},language:"svelte"}),l(a,t)},Be=a=>{var t=We(),e=g(t),r=c(e);u(r,{sections:[{title:"Services and information",columns:2,items:[{href:"/benefits",label:"Benefits"},{href:"/business",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"/how-government-works",label:"How government works"},{href:"/departments",label:"Departments"}]}]}),m(e);var n=i(e,2);h(n,{get code(){return be},language:"svelte"}),l(a,t)},Oe=a=>{var t=je(),e=g(t),r=c(e);u(r,{sections:[{title:"Services and information",columns:2,items:[{href:"/benefits",label:"Benefits"},{href:"/business",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"/how-government-works",label:"How government works"},{href:"/departments",label:"Departments"}]}],inlineLinks:[{href:"/help",label:"Help"},{href:"/cookies",label:"Cookies"},{href:"/contact",label:"Contact"}],metaCustomContent:'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>',showLicence:!0,showCopyright:!0,copyrightLogoUrl:"/assets/images/govuk-crest.svg",copyrightText:"© Crown copyright",copyrightHref:"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",licenceTextBefore:"All content is available under the ",licenceLinkText:"Open Government Licence v3.0",licenceTextAfter:", except where otherwise stated",licenceHref:"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",crownSvgPath:"M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"}),m(e);var n=i(e,2);h(n,{get code(){return we},language:"svelte"}),l(a,t)},Te=a=>{var t=De(),e=g(t),r=c(e);u(r,{inlineLinks:[{href:"/help",label:"Help"},{href:"/contact",label:"Contact"},{href:"/welsh",label:"Rhestr o Wasanaethau Cymraeg",lang:"cy",hrefLang:"cy"}]}),m(e);var n=i(e,2);h(n,{get code(){return _e},language:"svelte"}),l(a,t)},Se=a=>{var t=Ve(),e=g(t),r=i(c(e),2);u(r,{copyrightLogoUrl:"/assets/images/favicon.svg",metaCustomContent:"This example shows a custom crown copyright logo"}),m(e);var n=i(e,2);h(n,{get code(){return Ce},language:"svelte"}),l(a,t)},He=a=>{var t=ze(),e=g(t),r=i(c(e),2);u(r,{copyrightText:"© Your Organization 2024",metaCustomContent:"This example shows custom copyright text"}),m(e);var n=i(e,2);h(n,{get code(){return ke},language:"svelte"}),l(a,t)},Pe=a=>{var t=Ie(),e=g(t),r=i(c(e),2);u(r,{copyrightLogoUrl:"/assets/images/favicon.svg",copyrightText:"© Your Organisation 2024",metaCustomContent:"Combined customisation example"}),m(e);var n=i(e,2);h(n,{get code(){return xe},language:"svelte"}),l(a,t)},Ee=a=>{var t=Ye(),e=g(t),r=i(c(e),2);u(r,{copyrightLogoUrl:"/assets/images/favicon.svg",copyrightText:"© Your Organisation 2024",copyrightHref:"https://example.org/copyright",licenceTextBefore:"All content is available under the ",licenceLinkText:"Custom Licence v1.0",licenceTextAfter:", except where otherwise noted",licenceHref:"https://example.org/licence",crownSvgPath:"M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z",metaCustomContent:"Fully customised footer example"}),m(e);var n=i(e,2);h(n,{get code(){return Ae},language:"svelte"}),l(a,t)};var $e=p('<div class="py-5 bg-white"><!></div> <!>',1),Ue=p('<div class="py-5 bg-white"><!></div> <!>',1),We=p('<div class="py-5 bg-white"><!></div> <!>',1),je=p('<div class="py-5 bg-white"><!></div> <!>',1),De=p('<div class="py-5 bg-white"><!></div> <!>',1),Ve=p(`<div class="py-5 bg-white"><p class="govuk-body">You can customise the Crown Copyright logo by providing a different image
      URL:</p> <!></div> <!>`,1),ze=p('<div class="py-5 bg-white"><p class="govuk-body">You can also customise the copyright text displayed in the footer:</p> <!></div> <!>',1),Ie=p('<div class="py-5 bg-white"><p class="govuk-body">You can combine multiple customisations to fully personalise the footer:</p> <!></div> <!>',1),Ye=p(`<div class="py-5 bg-white"><p class="govuk-body">You can customise all aspects of the footer, including the licence text,
      URLs, and SVG paths:</p> <!></div> <!>`,1),Ge=p('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Me=p('<span slot="header" class="text-lg"> </span>'),Re=p('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ne(a,t){z(t,!1);let e=[{id:"1",heading:"1. Basic Usage",content:Fe},{id:"2",heading:"2. With Inline Links",content:Le},{id:"3",heading:"3. With Navigation Sections",content:Be},{id:"4",heading:"4. Full Featured Footer",content:Oe},{id:"5",heading:"5. With Language Attributes (Welsh Example)",content:Te},{id:"6",heading:"6. Custom Crown Copyright Logo",content:Se},{id:"7",heading:"7. Custom Copyright Text",content:He},{id:"8",heading:"8. Combined Customisations",content:Pe},{id:"9",heading:"9. Fully Customised Footer",content:Ee}];de();var r=Re(),n=i(c(r),2);ue(n,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(B,f)=>{var k=Q(),y=g(k);ge(y,1,()=>e,ve,(S,x)=>{he(S,{children:(A,H)=>{var v=Ge(),b=c(v);pe(b,()=>o(x).content),m(v),l(A,v)},$$slots:{default:!0,header:(A,H)=>{var v=Me(),b=c(v,!0);m(v),J(()=>me(b,o(x).heading)),l(A,v)}}})}),l(B,k)},$$slots:{default:!0}}),m(r),l(a,r),I()}const Y=(a,t=L,e=L,r=L,n=L)=>{Z(a,{get name(){return t()},get folder(){return e()},get subFolder(){return r()},get homepage(){return n()},get statusObject(){return Je},parentFolder:"components-update"})},G=(a,t=L)=>{ae(a,{get homepage(){return t()},get detailsArray(){return Qe},get connectedComponentsArray(){return Xe}})};let Je={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ke=["A footer component that provides navigation, meta information, and licensing details.",'Based on the <a href="https://design-system.service.gov.uk/components/footer/" target="_blank" rel="noopener noreferrer">GOV.UK Design System footer component</a> pattern.'],qe=["Use the footer component to help users navigate your service and find meta information.","The footer can be configured to show different levels of navigation, from a simple copyright notice to a full navigation menu."],Qe=[{label:"Description",arr:Ke,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:qe,visibleOnHomepage:!1,markdown:!1}],Xe=[];var Ze=p('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function et(a,t){z(t,!0);const e=s=>{u(s,X(()=>o(b)))};let r=le.url.pathname.split("/"),n=ce(r[r.length-1]),B=D(P(ee.md)),f=d(()=>ne([{name:"sections",category:"Content",value:[{title:"Services and information",columns:2,items:[{href:"#",label:"Benefits"},{href:"#",label:"Births, deaths, marriages and care"},{href:"#",label:"Business and self-employed"}]},{title:"Departments and policy",items:[{href:"#",label:"How government works"},{href:"#",label:"Departments"},{href:"#",label:"Worldwide"}]}]},{name:"inlineLinks",category:"Content",value:[{href:"#",label:"Help"},{href:"#",label:"Cookies"},{href:"#",label:"Contact"}]},{name:"metaCustomContent",category:"Content",value:'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>'},{name:"containerWidth",category:"UI Options",value:"govuk-width-container"},{name:"showLicence",category:"UI Options",value:!0},{name:"showCopyright",category:"UI Options",value:!0},{name:"copyrightText",category:"UI Options",value:"© Crown copyright"},{name:"copyrightLogoUrl",category:"UI Options",value:"/assets/images/govuk-crest.svg"},{name:"licenceTextBefore",category:"Advanced Customisation",value:"All content is available under the "},{name:"licenceLinkText",category:"Advanced Customisation",value:"Open Government Licence v3.0"},{name:"licenceTextAfter",category:"Advanced Customisation",value:", except where otherwise stated"},{name:"licenceHref",category:"Advanced Customisation",value:"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"},{name:"crownSvgPath",category:"Advanced Customisation",value:"M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"},{name:"copyrightHref",category:"Advanced Customisation",value:"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"}])),k=function(s,w,T){return s.map(_=>{let C=T[_.name]??_.value;return _.isEditable===w&&C!=null?typeof C=="object"?JSON.stringify(C,null,2):C:null})},y=D(P(k(o(f),!0,{}))),S=d(()=>({})),x=d(()=>k(o(f),!1,o(S))),A=d(()=>se(o(f),o(y))),H=d(()=>ie(o(f),o(y),o(x))),v=d(()=>q(o(H),2)),b=d(()=>o(v)[0]),O=d(()=>o(v)[1]),F=P({});K(()=>{o(O).forEach(s=>{F[s]=!0}),Object.keys(F).forEach(s=>{o(O).includes(s)||(F[s]=!1)})});let M=d(()=>Object.fromEntries(Object.entries(o(b)).map(([s,w])=>{var T,_;return[s,typeof w=="function"?(_=(T=o(f).find(C=>C.name===s))==null?void 0:T.functionElements)==null?void 0:_.functionAsString:w]})));var E=Ze(),$=g(E);const R=d(()=>({component:{WrapperInformation:G,WrapperNameAndStatus:Y},name:n}));te($,{get wrapper(){return o(R)},homepage:!1});var U=i($,2);oe(U,{get parametersParsingErrorsArray(){return o(O)},get parametersParsingErrorsObject(){return F},onCloseFunction:s=>o(O).filter(w=>w!=s)});var W=i(U,2);re(W,{get Component(){return e},get parametersSourceArray(){return o(f)},get derivedParametersValuesArray(){return o(x)},get parametersVisibleArray(){return o(A)},get parametersParsingErrorsObject(){return F},get copyParametersToClipboardObject(){return o(M)},get demoScreenWidth(){return o(B)},set demoScreenWidth(s){V(B,s,!0)},get statedParametersValuesArray(){return o(y)},set statedParametersValuesArray(s){V(y,s,!0)}});var j=i(W,2),N=c(j);Ne(N,{}),m(j),l(a,E),I()}const ft=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:G,WrapperNameAndStatus:Y,default:et},Symbol.toStringTag,{value:"Module"}));export{ft as _};
