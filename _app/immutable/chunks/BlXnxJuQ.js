import"./CWj6FrbW.js";import{p as W,G as $,a9 as F,f as H,s as k,a as q,av as z,c as p,r as f,I as O,x as e,t as Z,D as E,z as m,u as ee}from"./DRw07N7P.js";import{t as I,g as K,c as te,a as u,s as re}from"./Bdkmpx2T.js";import{s as ae}from"./CGhnogCl.js";import{o as J}from"./dDcDF3j6.js";import{B as oe,d as ie}from"./13XYjU8c.js";import{W as ne,P as se,C as ce,B as le,a as de,t as me,c as ue}from"./C5b5R5gE.js";import{p as pe}from"./VCpaEtP1.js";import{k as fe}from"./lMwbQCpd.js";import{S as L}from"./RlxSS15x.js";import{e as he,i as ge}from"./Dsl0KG63.js";import{s as ve}from"./dbxAgBfZ.js";import{A as be,a as ye}from"./DYgl-gtB.js";import"./69_IOA4Y.js";import{C as V}from"./B5yEtBhb.js";const xe=`
<script>
  // Import the SideNav component
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import { onMount } from "svelte";

  // Sample data for Example 1: A single group of items
  const example1Groups = [
    {
      title: "Football Clubs",
      items: [
        { text: "Borussia Dortmund", href: "#borussia-dortmund" },
        { text: "Liverpool FC", href: "#liverpool-fc" },
        { text: "SSC Napoli", href: "#ssc-napoli" },
        { text: "S.L. Benfica", href: "#sl-benfica" },
      ],
    },
  ];

  // Sync currentItem to the URL hash for demo simplicity
  let currentItem = $state(window.location.hash);
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }
  onMount(syncCurrentItemToHash);
<\/script>

<svelte:window on:hashchange={syncCurrentItemToHash} />

<SideNav
  title="Football Clubs Navigation"
  groups={example1Groups}
  {currentItem}
  activeItemBackgroundColor="#fff9c4"
/>
`,Ie=`
<script>
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import { onMount } from "svelte";

  // Sample data for Example 2: Alternating flat items and groups
  const example2Items = [ // First flat item
    { text: "Dashboard Home", href: "#dashboard-home" }
  ];

  const example2Groups = [
    { // First group
      title: "User Settings",
      items: [
        { text: "Profile", href: "#profile" },
        {
          text: "Preferences",
          href: "#preferences",
          subItems: [
            { text: "Theme", href: "#preferences-theme" },
            { text: "Notifications", href: "#preferences-notifications" }
          ]
        }
      ]
    },
    { // Second flat item (represented as a group with no title)
      title: "", // Empty title
      items: [
        { text: "Analytics Overview", href: "#analytics-overview" }
      ]
    },
    { // Second group
      title: "Content Management",
      items: [
        { text: "Articles", href: "#articles" },
        { text: "Categories", href: "#categories" },
        {
          text: "Media Library",
          href: "#media-library",
          subItems: [
            { text: "Images", href: "#media-images" },
            { text: "Videos", href: "#media-videos" }
          ]
        }
      ]
    }
  ];

  // Sync currentItem to the URL hash for demo simplicity
  let currentItem = $state(window.location.hash);
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }
  onMount(syncCurrentItemToHash);
<\/script>

<svelte:window on:hashchange={syncCurrentItemToHash} />

<SideNav
  title="Alternating Flat Items and Groups"
  items={example2Items}
  groups={example2Groups}
  {currentItem}
  activeItemBackgroundColor="#e0f2fe"
/>
`;var we=I('<div class="p-5 bg-white"><!></div> <!>',1),Se=I('<div class="p-5 bg-white"><!></div> <!>',1),Ce=I('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ae=I('<span slot="header" class="text-lg"> </span>'),_e=I('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function ke(h,g){W(g,!0);const N=s=>{var o=we(),a=H(o),c=p(a);L(c,{get title(){return v.title},get groups(){return v.groups},get currentItem(){return e(C)},get activeItemBackgroundColor(){return v.activeBgColor}}),f(a);var y=k(a,2);V(y,{get code(){return xe},language:"svelte"}),u(s,o)},w=s=>{var o=Se(),a=H(o),c=p(a);L(c,{get title(){return b.title},get items(){return b.items},get groups(){return b.groups},get currentItem(){return e(C)},get activeItemBackgroundColor(){return b.activeBgColor}}),f(a);var y=k(a,2);V(y,{get code(){return Ie},language:"svelte"}),u(s,o)},v={groups:[{title:"Football Clubs",items:[{text:"Borussia Dortmund",href:"#borussia-dortmund"},{text:"Liverpool FC",href:"#liverpool-fc"},{text:"SSC Napoli",href:"#ssc-napoli"},{text:"S.L. Benfica",href:"#sl-benfica"}]}],activeBgColor:"#fff9c4",title:"Football Clubs Navigation"},b={items:[{text:"Dashboard Home",href:"#dashboard-home"}],groups:[{title:"User Settings",items:[{text:"Profile",href:"#profile"},{text:"Preferences",href:"#preferences",subItems:[{text:"Theme",href:"#preferences-theme"},{text:"Notifications",href:"#preferences-notifications"}]}]},{title:"",items:[{text:"Analytics Overview",href:"#analytics-overview"}]},{title:"Content Management",items:[{text:"Articles",href:"#articles"},{text:"Categories",href:"#categories"},{text:"Media Library",href:"#media-library",subItems:[{text:"Images",href:"#media-images"},{text:"Videos",href:"#media-videos"}]}]}],activeBgColor:"#e0f2fe",title:"Alternating Flat Items and Groups"};let S=[{id:"1",heading:"1. Example 1 - SideNav with a Single Group",content:N},{id:"2",heading:"2. Example 2 - SideNav with Mixed Flat Item and Group",content:w}],C=$(F(window.location.hash));function j(){O(C,window.location.hash,!0)}J(j);var P=_e();K("hashchange",z,j);var n=k(p(P),2);be(n,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(s,o)=>{var a=te(),c=H(a);he(c,17,()=>S,ge,(y,T)=>{ye(y,{children:(A,_)=>{var r=Ce(),B=p(r);ve(B,()=>e(T).content),f(r),u(A,r)},$$slots:{default:!0,header:(A,_)=>{var r=Ae(),B=p(r,!0);f(r),Z(()=>re(B,e(T).heading)),u(A,r)}}})}),u(s,a)},$$slots:{default:!0}}),f(P),u(h,P),q()}const Q=(h,g=E,N=E,w=E,v=E)=>{oe(h,{get name(){return g()},get folder(){return N()},get subFolder(){return w()},get homepage(){return v()},statusObject:Ne,parentFolder:"components-update"})},X=(h,g=E)=>{le(h,{get homepage(){return g()},detailsArray:Be,connectedComponentsArray:Oe})};let Ne={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Pe=["The <code>SideNav</code> component displays a vertical navigation menu, typically used in a sidebar.","It's designed to show links relevant to the current main section of an application.","It can display a flat list of items or items grouped under titles.","Active items can be highlighted, and an active item can also display a nested list of sub-items, often used for in-page navigation (linking to sections with hash URLs like <code>#introduction</code>, <code>#details</code>, etc.)."],Te=["Typically used in a two-column or multi-column page layout where one column serves as a contextual navigation area next to the main content.","The content of the <code>SideNav</code> (its items and groups) often changes dynamically based on the top-level section selected in a primary navigation component (like <code>HeaderNav</code>).","It works well in conjunction with <code>HeaderNav</code> for main navigation and can share similar navigation structures with <code>MobileNav</code> for consistency across viewports.","The <code>currentItem</code> prop dictates the active link and is bindable. The <code>SideNav</code> component displays an item as active if its <code>href</code> matches <code>currentItem</code>, but it does <strong>not</strong> internally update this prop. The parent component (like this wrapper) is fully responsible for managing <code>currentItem</code>, for instance, by syncing it with URL changes (e.g., <code>window.location.hash</code> or SvelteKit's <code>$page.url</code> stores)."],Be=[{label:"Description",arr:Pe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Te,visibleOnHomepage:!1,markdown:!0}],Oe=[{label:"Often Used With / Related To",arr:[{name:"HeaderNav",folder:"layout/service-navigation-nested-mobile"},{name:"MobileNav",folder:"layout/service-navigation-nested-mobile"},{name:"ServiceNavigationNestedMobile",folder:"layout/service-navigation-nested-mobile"}]}];var Ee=I('<div class="govuk-grid-row"><div class="govuk-grid-column-one-third govuk-!-margin-left-5"><!></div></div>'),je=I('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function $e(h,g){W(g,!0);const N=t=>{var i=Ee(),x=p(i),l=p(x);L(l,ae(()=>e(A),{get currentItem(){return e(S)},set currentItem(d){O(S,d,!0)}})),f(x),f(i),u(t,i)};let w=pe.url.pathname.split("/"),v=fe(w[w.length-1]),b=$(F(ie.md)),S=$("");function C(){O(S,window.location.hash||e(n).find(t=>t.name==="items").value[0].href,!0)}J(C);const j=[{text:"Overview",href:"#overview",subItems:[{text:"Introduction",href:"#overview-intro"},{text:"Key Features",href:"#overview-features"}]},{text:"Installation",href:"#installation"},{text:"API Reference",href:"#api"}],P=[{title:"Getting Started",items:[{text:"Project Setup",href:"#project-setup",subItems:[{text:"Requirements",href:"#project-requirements"}]},{text:"First Component",href:"#first-component"}]},{title:"Advanced Topics",items:[{text:"State Management",href:"#state-management"},{text:"Routing",href:"#routing"}]}];let n=m(()=>de([{name:"title",category:"Content & Appearance",value:"Documentation",description:{markdown:!0,arr:["An accessible title for the navigation block, typically hidden visually but read by screen readers via <code>aria-labelledby</code>.",'Defaults to "Pages in this section" within the component if not provided.']}},{name:"items",category:"Content & Structure (Option 1: Flat List)",value:j,rows:12,description:{markdown:!0,arr:["An array of <code>SideNavItem</code> objects for a single, flat list of navigation links.","Each <code>SideNavItem</code> can have <code>text</code>, <code>href</code>, and optional <code>subItems</code> (array of <code>{ text: string, href: string }</code>) for in-page navigation (e.g., linking to URLs).","If <code>groups</code> are also provided, <code>items</code> will be rendered first."]}},{name:"groups",category:"Content & Structure (Option 2: Grouped List)",value:P,rows:18,description:{markdown:!0,arr:["An array of <code>SideNavGroup</code> objects for creating titled sections of navigation links.","Each <code>SideNavGroup</code> has an optional <code>title</code> and an <code>items</code> array (of <code>SideNavItem</code>).","<code>SideNavItem</code> within groups can also have <code>subItems</code> for in-page navigation.","Use this for a more structured side navigation. Rendered after the flat <code>items</code> list, if present."]}},{name:"currentItem",category:"Stateful & Bindable",isBinded:!0,value:e(S),description:{markdown:!0,arr:["A string that should match the <code>href</code> of the currently active item or sub-item.","This prop is bindable (<code>bind:currentItem</code>).","This is the <strong>sole driver</strong> for active link state in the <code>SideNav</code> component.","In this demo, <code>currentItem</code> is always set to the current URL hash (e.g. <code>#section</code>), so navigation state stays in sync with the browser's address bar.","For the demo, select a value to see the highlighting change. The options are generated from the sample <code>items</code> and <code>groups</code> data. Clicking links in the demo will update this value based on the URL hash."]}},{name:"activeItemBackgroundColor",category:"Stateful & Bindable",isBinded:!1,options:["transparent","#f3f2f1","#e0f2fe","#fef9c3"],value:"transparent",propType:"radio",description:{markdown:!0,arr:["A CSS color string used for the background of the active navigation item only.","Defaults to <code>transparent</code> within the component."]}}])),s=function(t,i,x){return t.map(l=>{let d=x[l.name]??l.value;return l.isEditable===i&&d!=null?typeof d=="object"?JSON.stringify(d,null,2):d:null})},o=$(F(s(e(n),!0,{}))),a=m(()=>({})),c=m(()=>s(e(n),!1,e(a))),y=m(()=>me(e(n),e(o))),T=m(()=>ue(e(n),e(o),e(c))),A=m(()=>e(T)[0]),_=m(()=>e(T)[1]),r=F({});ee(()=>{e(_).forEach(t=>{r[t]=!0}),Object.keys(r).forEach(t=>{e(_).includes(t)||(r[t]=!1)})});let B=m(()=>Object.fromEntries(Object.entries(e(A)).map(([t,i])=>{var x,l;return[t,typeof i=="function"?(l=(x=e(n).find(d=>d.name===t))==null?void 0:x.functionElements)==null?void 0:l.functionAsString:i]})));var M=je();K("hashchange",z,C);var R=H(M);ne(R,{wrapper:{component:{WrapperInformation:X,WrapperNameAndStatus:Q},name:v},homepage:!1});var G=k(R,2);se(G,{get parametersParsingErrorsArray(){return e(_)},get parametersParsingErrorsObject(){return r},onCloseFunction:t=>e(_).filter(i=>i!=t)});var D=k(G,2);ce(D,{Component:N,get parametersSourceArray(){return e(n)},get derivedParametersValuesArray(){return e(c)},get parametersVisibleArray(){return e(y)},get parametersParsingErrorsObject(){return r},get copyParametersToClipboardObject(){return e(B)},get demoScreenWidth(){return e(b)},set demoScreenWidth(t){O(b,t,!0)},get statedParametersValuesArray(){return e(o)},set statedParametersValuesArray(t){O(o,t,!0)}});var U=k(D,2),Y=p(U);ke(Y,{}),f(U),u(h,M),q()}const Xe=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:X,WrapperNameAndStatus:Q,default:$e},Symbol.toStringTag,{value:"Module"}));export{Xe as _};
