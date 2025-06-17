import"./CWj6FrbW.js";import{p as D,f as W,s as g,a as H,c as m,r as d,t as q,y as e,D as A,I as B,ab as S,u as K,J as M,G as c,ac as Q}from"./I52qY7cu.js";import{f as u,c as X,a as p}from"./BBh-6AA0.js";import{s as Y}from"./BHp14Q1u.js";import{B as Z,d as ee}from"./Dso6Mmak.js";import{W as te,P as ae,C as re,B as ne,a as se,t as oe,c as ie}from"./C-NMf74u.js";import{p as le}from"./D5I35bDD.js";import{k as ce}from"./lMwbQCpd.js";import{W as O}from"./BtSOdzYZ.js";import"./69_IOA4Y.js";import{s as pe}from"./5F35P8og.js";import{s as me}from"./BvNl7SXi.js";import{e as de,i as ue}from"./n63ZiD1W.js";import{i as he}from"./MVh4sFtc.js";import{A as ge,a as fe}from"./CSiiXlo3.js";import{C as E}from"./BN7FUiX4.js";const ve=`
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
<\/script>

<!-- Basic usage with default content -->
<WhatsNew />
`,be=`
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
`,ye=`
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
`,we=s=>{var r=Ce(),t=W(r),n=m(t);O(n,{}),d(t);var o=g(t,2);E(o,{get code(){return ve},language:"svelte"}),p(s,r)},_e=s=>{var r=ke(),t=W(r),n=m(t);O(n,{title:"Latest Updates",titleId:"updates",newsItems:[{date:"March 2025",content:"We've improved the performance of our data visualization components by 40%."},{date:"February 2025",content:"New accessibility features have been added to all form components."}]}),d(t);var o=g(t,2);E(o,{get code(){return be},language:"svelte"}),p(s,r)},xe=s=>{var r=Ae(),t=W(r),n=m(t);O(n,{title:"Component Library Updates",titleId:"component-updates",componentLinksIntroText:"This release includes updates to the following components:",newsItems:[{date:"April 2025",content:"Released version 2.1.0 with enhanced chart components and improved TypeScript support.",releaseNotesUrl:"https://github.com/example/releases/tag/v2.1.0",releaseVersion:"v2.1.0",componentLinks:[{text:"Line Chart component",href:"/components/charts/line-chart"},{text:"Bar Chart component",href:"/components/charts/bar-chart"},{text:"Data Table component",href:"/components/ui/data-table"}]},{date:"March 2025",content:"Minor bug fixes and accessibility improvements across all components.",releaseNotesUrl:"https://github.com/example/releases/tag/v2.0.1",releaseVersion:"v2.0.1"}]}),d(t);var o=g(t,2);E(o,{get code(){return ye},language:"svelte"}),p(s,r)};var Ce=u('<div class="p-5 bg-white"><!></div> <!>',1),ke=u('<div class="p-5 bg-white"><!></div> <!>',1),Ae=u('<div class="p-5 bg-white"><!></div> <!>',1),We=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ne=u('<span slot="header" class="text-lg"> </span>'),Ie=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Oe(s,r){D(r,!1);let t=[{id:"1",heading:"1. Basic usage with default content",content:we},{id:"2",heading:"2. Custom title and simple news items",content:_e},{id:"3",heading:"3. Complex news items with release notes and component links",content:xe}];he();var n=Ie(),o=g(m(n),2);ge(o,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(N,h)=>{var _=X(),f=W(_);de(f,1,()=>t,ue,(P,x)=>{fe(P,{children:(C,T)=>{var i=We(),v=m(i);me(v,()=>e(x).content),d(i),p(C,i)},$$slots:{default:!0,header:(C,T)=>{var i=Ne(),v=m(i,!0);d(i),q(()=>pe(v,e(x).heading)),p(C,i)}}})}),p(N,_)},$$slots:{default:!0}}),d(n),p(s,n),H()}const F=(s,r=A,t=A,n=A,o=A)=>{Z(s,{get name(){return r()},get folder(){return t()},get subFolder(){return n()},get homepage(){return o()},get statusObject(){return Pe},parentFolder:"components-update"})},R=(s,r=A)=>{ne(s,{get homepage(){return r()},get detailsArray(){return Ee},get connectedComponentsArray(){return $e}})};let Pe={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Te=["The WhatsNew component displays news, updates, and release information in a structured format. It's designed to communicate recent changes, new features, or important announcements to users.","The component supports flexible content including dates, descriptions, release notes links, and related component links displayed as bulleted lists."],Se=["Use the WhatsNew component on homepages or documentation sites to highlight recent updates and changes.","Include it in service dashboards to communicate new features or important announcements to users.","Use it in component libraries to showcase new components or updates to existing ones.","Consider using it in admin interfaces to keep users informed about system updates and improvements."],Ee=[{label:"Description",arr:Te,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Se,visibleOnHomepage:!1,markdown:!0}],$e=[{label:"Related UI Components",arr:[{name:"Masthead",folder:"ui"}]},{label:"Layout Components",arr:[{name:"Header",folder:"layout"}]}];var je=u('<div class="p-8"><!></div>'),Le=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ve(s,r){D(r,!0);const t=a=>{var l=je(),b=m(l);O(b,Y(()=>e(v))),d(l),p(a,l)};let n=le.url.pathname.split("/"),o=ce(n[n.length-1]),N=B(S(ee.md)),h=c(()=>se([{name:"title",category:"Content",value:"What's new",description:{markdown:!0,arr:["The main heading text for the news section.","This appears as an h2 element at the top of the component."]}},{name:"titleId",category:"Content",value:"whats-new",description:{markdown:!0,arr:["The HTML id attribute for the heading element.","Useful for anchor links and accessibility purposes."]}},{name:"componentLinksIntroText",category:"Content",value:"This initial alpha release includes foundational components for building government services:",description:{markdown:!0,arr:["Introductory text that appears before component links lists.","Set to empty string to hide this text entirely.","Only displays when news items have componentLinks arrays."]},rows:3},{name:"newsItems",category:"Content",value:[{date:"June 2025",content:"We launched the MHCLG Svelte Component Library alpha version. This library provides Svelte 5 implementations of GOV.UK Design System components, specifically tailored for data-rich digital products and services.",releaseNotesUrl:"https://github.com/communitiesuk/oflog_svelte_component_library/releases/tag/v0.1.16",releaseVersion:"v0.1.16"},{date:"January 2025",content:"Development began on the component library infrastructure, establishing the foundation for reusable Svelte components that maintain GOV.UK Design System compliance.",componentLinks:[{text:"Masthead component",href:"/components/ui/masthead"},{text:"Button component",href:"/components/ui/button"}]}],description:{markdown:!0,arr:["Array of news items to display. Each item can include:","• <strong>date</strong>: When the news occurred (required)","• <strong>content</strong>: Main description (required)","• <strong>releaseNotesUrl & releaseVersion</strong>: For linking to release notes (optional)","• <strong>componentLinks</strong>: Array of related component links (optional)"]},rows:10}])),_=function(a,l,b){return a.map(y=>{let w=b[y.name]??y.value;return y.isEditable===l&&w!=null?typeof w=="object"?JSON.stringify(w,null,2):w:null})},f=B(S(_(e(h),!0,{}))),P=c(()=>({})),x=c(()=>_(e(h),!1,e(P))),C=c(()=>oe(e(h),e(f))),T=c(()=>ie(e(h),e(f),e(x))),i=c(()=>Q(e(T),2)),v=c(()=>e(i)[0]),I=c(()=>e(i)[1]),k=S({});K(()=>{e(I).forEach(a=>{k[a]=!0}),Object.keys(k).forEach(a=>{e(I).includes(a)||(k[a]=!1)})});let G=c(()=>Object.fromEntries(Object.entries(e(v)).map(([a,l])=>{var b,y;return[a,typeof l=="function"?(y=(b=e(h).find(w=>w.name===a))==null?void 0:b.functionElements)==null?void 0:y.functionAsString:l]})));var $=Le(),j=W($);const J=c(()=>({component:{WrapperInformation:R,WrapperNameAndStatus:F},name:o}));te(j,{get wrapper(){return e(J)},homepage:!1});var L=g(j,2);ae(L,{get parametersParsingErrorsArray(){return e(I)},get parametersParsingErrorsObject(){return k},onCloseFunction:a=>e(I).filter(l=>l!=a)});var V=g(L,2);re(V,{get Component(){return t},get parametersSourceArray(){return e(h)},get derivedParametersValuesArray(){return e(x)},get parametersVisibleArray(){return e(C)},get parametersParsingErrorsObject(){return k},get copyParametersToClipboardObject(){return e(G)},get demoScreenWidth(){return e(N)},set demoScreenWidth(a){M(N,a,!0)},get statedParametersValuesArray(){return e(f)},set statedParametersValuesArray(a){M(f,a,!0)}});var U=g(V,2),z=m(U);Oe(z,{}),d(U),p(s,$),H()}const et=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:R,WrapperNameAndStatus:F,default:Ve},Symbol.toStringTag,{value:"Module"}));export{et as _};
