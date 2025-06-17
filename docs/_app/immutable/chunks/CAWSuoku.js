import"./CWj6FrbW.js";import{p as M,f as W,s as g,a as D,c as d,r as u,t as G,x as e,D as A,G as $,a9 as O,z as m,u as J,I as B}from"./DRw07N7P.js";import{t as h,c as q,a as c,s as K}from"./Bdkmpx2T.js";import{s as Q}from"./IJyiWNRp.js";import{B as X,d as Y}from"./BVZoJ1_j.js";import{W as Z,P as ee,C as te,B as ae,a as re,t as ne,c as se}from"./Bedb0N-d.js";import{p as oe}from"./uAKDnRCH.js";import{k as ie}from"./lMwbQCpd.js";import{W as P}from"./Ra1PjCMB.js";import"./69_IOA4Y.js";import{e as le,i as ce}from"./Dsl0KG63.js";import{s as pe}from"./dbxAgBfZ.js";import{i as me}from"./BDiFQUq5.js";import{A as de,a as ue}from"./ipR6TnRX.js";import{C as S}from"./D76pUMJJ.js";const he=`
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
<\/script>

<!-- Basic usage with default content -->
<WhatsNew />
`,fe=`
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
<\/script>

<!-- Custom title and simple news items -->
<WhatsNew
  title="Latest Updates"
  titleId="updates"
  newsItems={[
    {
      date: "March 2025",
      content: "We've improved the performance of our data visualization components by 40%."
    },
    {
      date: "February 2025", 
      content: "New accessibility features have been added to all form components."
    }
  ]}
/>
`,ge=`
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
<\/script>

<!-- Complex news items with release notes and component links -->
<WhatsNew
  title="Component Library Updates"
  titleId="component-updates"
  componentLinksIntroText="This release includes updates to the following components:"
  newsItems={[
    {
      date: "April 2025",
      content: "Released version 2.1.0 with enhanced chart components and improved TypeScript support.",
      releaseNotesUrl: "https://github.com/example/releases/tag/v2.1.0",
      releaseVersion: "v2.1.0",
      componentLinks: [
        { text: "Line Chart component", href: "/components/charts/line-chart" },
        { text: "Bar Chart component", href: "/components/charts/bar-chart" },
        { text: "Data Table component", href: "/components/ui/data-table" }
      ]
    },
    {
      date: "March 2025",
      content: "Minor bug fixes and accessibility improvements across all components.",
      releaseNotesUrl: "https://github.com/example/releases/tag/v2.0.1", 
      releaseVersion: "v2.0.1"
    }
  ]}
/>
`,ve=s=>{var r=we(),t=W(r),n=d(t);P(n,{}),u(t);var o=g(t,2);S(o,{get code(){return he},language:"svelte"}),c(s,r)},be=s=>{var r=xe(),t=W(r),n=d(t);P(n,{title:"Latest Updates",titleId:"updates",newsItems:[{date:"March 2025",content:"We've improved the performance of our data visualization components by 40%."},{date:"February 2025",content:"New accessibility features have been added to all form components."}]}),u(t);var o=g(t,2);S(o,{get code(){return fe},language:"svelte"}),c(s,r)},ye=s=>{var r=_e(),t=W(r),n=d(t);P(n,{title:"Component Library Updates",titleId:"component-updates",componentLinksIntroText:"This release includes updates to the following components:",newsItems:[{date:"April 2025",content:"Released version 2.1.0 with enhanced chart components and improved TypeScript support.",releaseNotesUrl:"https://github.com/example/releases/tag/v2.1.0",releaseVersion:"v2.1.0",componentLinks:[{text:"Line Chart component",href:"/components/charts/line-chart"},{text:"Bar Chart component",href:"/components/charts/bar-chart"},{text:"Data Table component",href:"/components/ui/data-table"}]},{date:"March 2025",content:"Minor bug fixes and accessibility improvements across all components.",releaseNotesUrl:"https://github.com/example/releases/tag/v2.0.1",releaseVersion:"v2.0.1"}]}),u(t);var o=g(t,2);S(o,{get code(){return ge},language:"svelte"}),c(s,r)};var we=h('<div class="p-5 bg-white"><!></div> <!>',1),xe=h('<div class="p-5 bg-white"><!></div> <!>',1),_e=h('<div class="p-5 bg-white"><!></div> <!>',1),Ce=h('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),ke=h('<span slot="header" class="text-lg"> </span>'),Ae=h('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function We(s,r){M(r,!1);let t=[{id:"1",heading:"1. Basic usage with default content",content:ve},{id:"2",heading:"2. Custom title and simple news items",content:be},{id:"3",heading:"3. Complex news items with release notes and component links",content:ye}];me();var n=Ae(),o=g(d(n),2);de(o,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(N,f)=>{var x=q(),v=W(x);le(v,1,()=>t,ce,(T,_)=>{ue(T,{children:(C,I)=>{var i=Ce(),p=d(i);pe(p,()=>e(_).content),u(i),c(C,i)},$$slots:{default:!0,header:(C,I)=>{var i=ke(),p=d(i,!0);u(i),G(()=>K(p,e(_).heading)),c(C,i)}}})}),c(N,x)},$$slots:{default:!0}}),u(n),c(s,n),D()}const H=(s,r=A,t=A,n=A,o=A)=>{X(s,{get name(){return r()},get folder(){return t()},get subFolder(){return n()},get homepage(){return o()},statusObject:Ne,parentFolder:"components-update"})},F=(s,r=A)=>{ae(s,{get homepage(){return r()},detailsArray:Te,connectedComponentsArray:Oe})};let Ne={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ie=["The WhatsNew component displays news, updates, and release information in a structured format. It's designed to communicate recent changes, new features, or important announcements to users.","The component supports flexible content including dates, descriptions, release notes links, and related component links displayed as bulleted lists."],Pe=["Use the WhatsNew component on homepages or documentation sites to highlight recent updates and changes.","Include it in service dashboards to communicate new features or important announcements to users.","Use it in component libraries to showcase new components or updates to existing ones.","Consider using it in admin interfaces to keep users informed about system updates and improvements."],Te=[{label:"Description",arr:Ie,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Pe,visibleOnHomepage:!1,markdown:!0}],Oe=[{label:"Related UI Components",arr:[{name:"Masthead",folder:"ui"}]},{label:"Layout Components",arr:[{name:"Header",folder:"layout"}]}];var Se=h('<div class="p-8"><!></div>'),Ee=h('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Le(s,r){M(r,!0);const t=a=>{var l=Se(),b=d(l);P(b,Q(()=>e(i))),u(l),c(a,l)};let n=oe.url.pathname.split("/"),o=ie(n[n.length-1]),N=$(O(Y.md)),f=m(()=>re([{name:"title",category:"Content",value:"What's new",description:{markdown:!0,arr:["The main heading text for the news section.","This appears as an h2 element at the top of the component."]}},{name:"titleId",category:"Content",value:"whats-new",description:{markdown:!0,arr:["The HTML id attribute for the heading element.","Useful for anchor links and accessibility purposes."]}},{name:"componentLinksIntroText",category:"Content",value:"This initial alpha release includes foundational components for building government services:",description:{markdown:!0,arr:["Introductory text that appears before component links lists.","Set to empty string to hide this text entirely.","Only displays when news items have componentLinks arrays."]},rows:3},{name:"newsItems",category:"Content",value:[{date:"June 2025",content:"We launched the MHCLG Svelte Component Library alpha version. This library provides Svelte 5 implementations of GOV.UK Design System components, specifically tailored for data-rich digital products and services.",releaseNotesUrl:"https://github.com/communitiesuk/oflog_svelte_component_library/releases/tag/v0.1.16",releaseVersion:"v0.1.16"},{date:"January 2025",content:"Development began on the component library infrastructure, establishing the foundation for reusable Svelte components that maintain GOV.UK Design System compliance.",componentLinks:[{text:"Masthead component",href:"/components/ui/masthead"},{text:"Button component",href:"/components/ui/button"}]}],description:{markdown:!0,arr:["Array of news items to display. Each item can include:","• <strong>date</strong>: When the news occurred (required)","• <strong>content</strong>: Main description (required)","• <strong>releaseNotesUrl & releaseVersion</strong>: For linking to release notes (optional)","• <strong>componentLinks</strong>: Array of related component links (optional)"]},rows:10}])),x=function(a,l,b){return a.map(y=>{let w=b[y.name]??y.value;return y.isEditable===l&&w!=null?typeof w=="object"?JSON.stringify(w,null,2):w:null})},v=$(O(x(e(f),!0,{}))),T=m(()=>({})),_=m(()=>x(e(f),!1,e(T))),C=m(()=>ne(e(f),e(v))),I=m(()=>se(e(f),e(v),e(_))),i=m(()=>e(I)[0]),p=m(()=>e(I)[1]),k=O({});J(()=>{e(p).forEach(a=>{k[a]=!0}),Object.keys(k).forEach(a=>{e(p).includes(a)||(k[a]=!1)})});let R=m(()=>Object.fromEntries(Object.entries(e(i)).map(([a,l])=>{var b,y;return[a,typeof l=="function"?(y=(b=e(f).find(w=>w.name===a))==null?void 0:b.functionElements)==null?void 0:y.functionAsString:l]})));var E=Ee(),L=W(E);Z(L,{wrapper:{component:{WrapperInformation:F,WrapperNameAndStatus:H},name:o},homepage:!1});var V=g(L,2);ee(V,{get parametersParsingErrorsArray(){return e(p)},get parametersParsingErrorsObject(){return k},onCloseFunction:a=>e(p).filter(l=>l!=a)});var j=g(V,2);te(j,{Component:t,get parametersSourceArray(){return e(f)},get derivedParametersValuesArray(){return e(_)},get parametersVisibleArray(){return e(C)},get parametersParsingErrorsObject(){return k},get copyParametersToClipboardObject(){return e(R)},get demoScreenWidth(){return e(N)},set demoScreenWidth(a){B(N,a,!0)},get statedParametersValuesArray(){return e(v)},set statedParametersValuesArray(a){B(v,a,!0)}});var U=g(j,2),z=d(U);We(z,{}),u(U),c(s,E),D()}const Qe=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:F,WrapperNameAndStatus:H,default:Le},Symbol.toStringTag,{value:"Module"}));export{Qe as _};
