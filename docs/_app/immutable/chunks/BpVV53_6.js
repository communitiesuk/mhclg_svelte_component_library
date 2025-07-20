import"./CWj6FrbW.js";import{o as W}from"./mMANI47B.js";import{p as q,I as $,ab as F,f as H,s as k,a as J,aE as K,c as f,r as h,J as T,F as e,t as te,C as B,u as re,G as i,ac as ae}from"./DAeYpASc.js";import{e as z,s as oe}from"./oN6NPT6s.js";import{f as w,c as ne,a as p}from"./BAP9DKun.js";import{s as ie}from"./CDnlRnBP.js";import{B as se,d as ce}from"./FLOBqqeq.js";import{W as le,P as de,C as me,B as ue,a as pe,t as fe,c as he}from"./D9YvIc1u.js";import{p as ge}from"./CMjediXt.js";import{k as ve}from"./DLSzT-Iv.js";import{S as L}from"./BdXOmJZk.js";import{e as be,i as ye}from"./DtT6GxuX.js";import{s as xe}from"./5CLvz9iT.js";import{A as Ie,a as we}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{C as V}from"./ip80KjXp.js";const Se=`
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
`,Ce=`
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
`;var Ae=w('<div class="p-5 bg-white"><!></div> <!>',1),_e=w('<div class="p-5 bg-white"><!></div> <!>',1),ke=w('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ne=w('<span slot="header" class="text-lg"> </span>'),Pe=w('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Te(g,v){q(v,!0);const N=l=>{var o=Ae(),r=H(o),d=f(r);L(d,{get title(){return b.title},get groups(){return b.groups},get currentItem(){return e(A)},get activeItemBackgroundColor(){return b.activeBgColor}}),h(r);var x=k(r,2);V(x,{get code(){return Se},language:"svelte"}),p(l,o)},S=l=>{var o=_e(),r=H(o),d=f(r);L(d,{get title(){return y.title},get items(){return y.items},get groups(){return y.groups},get currentItem(){return e(A)},get activeItemBackgroundColor(){return y.activeBgColor}}),h(r);var x=k(r,2);V(x,{get code(){return Ce},language:"svelte"}),p(l,o)},b={groups:[{title:"Football Clubs",items:[{text:"Borussia Dortmund",href:"#borussia-dortmund"},{text:"Liverpool FC",href:"#liverpool-fc"},{text:"SSC Napoli",href:"#ssc-napoli"},{text:"S.L. Benfica",href:"#sl-benfica"}]}],activeBgColor:"#fff9c4",title:"Football Clubs Navigation"},y={items:[{text:"Dashboard Home",href:"#dashboard-home"}],groups:[{title:"User Settings",items:[{text:"Profile",href:"#profile"},{text:"Preferences",href:"#preferences",subItems:[{text:"Theme",href:"#preferences-theme"},{text:"Notifications",href:"#preferences-notifications"}]}]},{title:"",items:[{text:"Analytics Overview",href:"#analytics-overview"}]},{title:"Content Management",items:[{text:"Articles",href:"#articles"},{text:"Categories",href:"#categories"},{text:"Media Library",href:"#media-library",subItems:[{text:"Images",href:"#media-images"},{text:"Videos",href:"#media-videos"}]}]}],activeBgColor:"#e0f2fe",title:"Alternating Flat Items and Groups"};let C=[{id:"1",heading:"1. Example 1 - SideNav with a Single Group",content:N},{id:"2",heading:"2. Example 2 - SideNav with Mixed Flat Item and Group",content:S}],A=$(F(window.location.hash));function O(){T(A,window.location.hash,!0)}W(O);var P=Pe();z("hashchange",K,O);var s=k(f(P),2);Ie(s,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(l,o)=>{var r=ne(),d=H(r);be(d,17,()=>C,ye,(x,E)=>{we(x,{children:(_,j)=>{var a=ke(),c=f(a);xe(c,()=>e(E).content),h(a),p(_,a)},$$slots:{default:!0,header:(_,j)=>{var a=Ne(),c=f(a,!0);h(a),te(()=>oe(c,e(E).heading)),p(_,a)}}})}),p(l,r)},$$slots:{default:!0}}),h(P),p(g,P),J()}const Q=(g,v=B,N=B,S=B,b=B)=>{se(g,{get name(){return v()},get folder(){return N()},get subFolder(){return S()},get homepage(){return b()},get statusObject(){return Be},parentFolder:"components-update"})},X=(g,v=B)=>{ue(g,{get homepage(){return v()},get detailsArray(){return je},get connectedComponentsArray(){return $e}})};let Be={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Oe=["The <code>SideNav</code> component displays a vertical navigation menu, typically used in a sidebar.","It's designed to show links relevant to the current main section of an application.","It can display a flat list of items or items grouped under titles.","Active items can be highlighted, and an active item can also display a nested list of sub-items, often used for in-page navigation (linking to sections with hash URLs like <code>#introduction</code>, <code>#details</code>, etc.)."],Ee=["Typically used in a two-column or multi-column page layout where one column serves as a contextual navigation area next to the main content.","The content of the <code>SideNav</code> (its items and groups) often changes dynamically based on the top-level section selected in a primary navigation component (like <code>HeaderNav</code>).","It works well in conjunction with <code>HeaderNav</code> for main navigation and can share similar navigation structures with <code>MobileNav</code> for consistency across viewports.","The <code>currentItem</code> prop dictates the active link and is bindable. The <code>SideNav</code> component displays an item as active if its <code>href</code> matches <code>currentItem</code>, but it does <strong>not</strong> internally update this prop. The parent component (like this wrapper) is fully responsible for managing <code>currentItem</code>, for instance, by syncing it with URL changes (e.g., <code>window.location.hash</code> or SvelteKit's <code>$page.url</code> stores)."],je=[{label:"Description",arr:Oe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ee,visibleOnHomepage:!1,markdown:!0}],$e=[{label:"Often Used With / Related To",arr:[{name:"HeaderNav",folder:"layout/service-navigation-nested-mobile"},{name:"MobileNav",folder:"layout/service-navigation-nested-mobile"},{name:"ServiceNavigationNestedMobile",folder:"layout/service-navigation-nested-mobile"}]}];var Fe=w('<div class="govuk-grid-row"><div class="govuk-grid-column-one-third govuk-!-margin-left-5"><!></div></div>'),He=w('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Le(g,v){q(v,!0);const N=t=>{var n=Fe(),I=f(n),m=f(I);L(m,ie(()=>e(j),{get currentItem(){return e(C)},set currentItem(u){T(C,u,!0)}})),h(I),h(n),p(t,n)};let S=ge.url.pathname.split("/"),b=ve(S[S.length-1]),y=$(F(ce.md)),C=$("");function A(){T(C,window.location.hash||e(s).find(t=>t.name==="items").value[0].href,!0)}W(A);const O=[{text:"Overview",href:"#overview",subItems:[{text:"Introduction",href:"#overview-intro"},{text:"Key Features",href:"#overview-features"}]},{text:"Installation",href:"#installation"},{text:"API Reference",href:"#api"}],P=[{title:"Getting Started",items:[{text:"Project Setup",href:"#project-setup",subItems:[{text:"Requirements",href:"#project-requirements"}]},{text:"First Component",href:"#first-component"}]},{title:"Advanced Topics",items:[{text:"State Management",href:"#state-management"},{text:"Routing",href:"#routing"}]}];let s=i(()=>pe([{name:"title",category:"Content & Appearance",value:"Documentation",description:{markdown:!0,arr:["An accessible title for the navigation block, typically hidden visually but read by screen readers via <code>aria-labelledby</code>.",'Defaults to "Pages in this section" within the component if not provided.']}},{name:"items",category:"Content & Structure (Option 1: Flat List)",value:O,rows:12,description:{markdown:!0,arr:["An array of <code>SideNavItem</code> objects for a single, flat list of navigation links.","Each <code>SideNavItem</code> can have <code>text</code>, <code>href</code>, and optional <code>subItems</code> (array of <code>{ text: string, href: string }</code>) for in-page navigation (e.g., linking to URLs).","If <code>groups</code> are also provided, <code>items</code> will be rendered first."]}},{name:"groups",category:"Content & Structure (Option 2: Grouped List)",value:P,rows:18,description:{markdown:!0,arr:["An array of <code>SideNavGroup</code> objects for creating titled sections of navigation links.","Each <code>SideNavGroup</code> has an optional <code>title</code> and an <code>items</code> array (of <code>SideNavItem</code>).","<code>SideNavItem</code> within groups can also have <code>subItems</code> for in-page navigation.","Use this for a more structured side navigation. Rendered after the flat <code>items</code> list, if present."]}},{name:"currentItem",category:"Stateful & Bindable",isBinded:!0,value:e(C),description:{markdown:!0,arr:["A string that should match the <code>href</code> of the currently active item or sub-item.","This prop is bindable (<code>bind:currentItem</code>).","This is the <strong>sole driver</strong> for active link state in the <code>SideNav</code> component.","In this demo, <code>currentItem</code> is always set to the current URL hash (e.g. <code>#section</code>), so navigation state stays in sync with the browser's address bar.","For the demo, select a value to see the highlighting change. The options are generated from the sample <code>items</code> and <code>groups</code> data. Clicking links in the demo will update this value based on the URL hash."]}},{name:"activeItemBackgroundColor",category:"Stateful & Bindable",isBinded:!1,options:["transparent","#f3f2f1","#e0f2fe","#fef9c3"],value:"transparent",propType:"radio",description:{markdown:!0,arr:["A CSS color string used for the background of the active navigation item only.","Defaults to <code>transparent</code> within the component."]}}])),l=function(t,n,I){return t.map(m=>{let u=I[m.name]??m.value;return m.isEditable===n&&u!=null?typeof u=="object"?JSON.stringify(u,null,2):u:null})},o=$(F(l(e(s),!0,{}))),r=i(()=>({})),d=i(()=>l(e(s),!1,e(r))),x=i(()=>fe(e(s),e(o))),E=i(()=>he(e(s),e(o),e(d))),_=i(()=>ae(e(E),2)),j=i(()=>e(_)[0]),a=i(()=>e(_)[1]),c=F({});re(()=>{e(a).forEach(t=>{c[t]=!0}),Object.keys(c).forEach(t=>{e(a).includes(t)||(c[t]=!1)})});let Y=i(()=>Object.fromEntries(Object.entries(e(j)).map(([t,n])=>{var I,m;return[t,typeof n=="function"?(m=(I=e(s).find(u=>u.name===t))==null?void 0:I.functionElements)==null?void 0:m.functionAsString:n]})));var M=He();z("hashchange",K,A);var R=H(M);const Z=i(()=>({component:{WrapperInformation:X,WrapperNameAndStatus:Q},name:b}));le(R,{get wrapper(){return e(Z)},homepage:!1});var G=k(R,2);de(G,{get parametersParsingErrorsArray(){return e(a)},get parametersParsingErrorsObject(){return c},onCloseFunction:t=>e(a).filter(n=>n!=t)});var D=k(G,2);me(D,{get Component(){return N},get parametersSourceArray(){return e(s)},get derivedParametersValuesArray(){return e(d)},get parametersVisibleArray(){return e(x)},get parametersParsingErrorsObject(){return c},get copyParametersToClipboardObject(){return e(Y)},get demoScreenWidth(){return e(y)},set demoScreenWidth(t){T(y,t,!0)},get statedParametersValuesArray(){return e(o)},set statedParametersValuesArray(t){T(o,t,!0)}});var U=k(D,2),ee=f(U);Te(ee,{}),h(U),p(g,M),J()}const tt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:X,WrapperNameAndStatus:Q,default:Le},Symbol.toStringTag,{value:"Module"}));export{tt as _};
