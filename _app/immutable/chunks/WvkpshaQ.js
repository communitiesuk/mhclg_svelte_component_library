import"./CWj6FrbW.js";import{p as V,f as E,s as N,a as W,c as C,r as S,t as q,z as e,D as O,G as F,a9 as H,y as c,u as G,I as T}from"./BQOcVDnD.js";import{t as f,c as J,a as p,s as K}from"./Dp3jeoTR.js";import{s as Q}from"./Bx8udYmP.js";import{B as X,d as Y}from"./CnQQXyhZ.js";import{W as Z,P as ee,C as te,B as re,a as ae,t as oe,c as ne}from"./B8q4-PYk.js";import{p as se}from"./ydctMTGk.js";import{k as ie}from"./lMwbQCpd.js";import{S as D}from"./DClCHrMr.js";import"./69_IOA4Y.js";import{e as me,i as le}from"./hy64cfae.js";import{s as ce}from"./ByC2DMpr.js";import{i as pe}from"./B_4Nsh1l.js";import{A as de,a as ue}from"./CYXGBK4a.js";import{C as U}from"./B8qjdm4g.js";const fe=`
<script lang="ts">
  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";
  
  // Sample data matching the example
  let sampleNavItems = [
    { text: "Home", href: "/" },
    { text: "Components", href: "/components" },
    { text: "Patterns", href: "/patterns" },
    { text: "Community", href: "/community" },
  ];

  let sampleMobileSections = [
    {
      title: "Home", href: "/", items: [{ text: "Overview", href: "/" }],
    },
    {
      title: "Components", href: "/components", items: [
        { title: "Forms", items: [ { text: "Button", href: "/components/ui/button" }, { text: "Checkbox", href: "/components/ui/checkbox" }, { text: "Select", href: "/components/ui/select" } ]},
        { title: "Layout", items: [ { text: "Internal Header", href: "/components/layout/internal-header" }, { text: "Phase Banner", href: "/components/layout/phase-banner" } ]}
      ],
    },
    {
      title: "Patterns", href: "/patterns", items: [
        { title: "Common patterns", items: [ { text: "Forms", href: "/patterns/forms" }, { text: "Tables", href: "/patterns/tables" } ]}
      ],
    },
    { 
      title: "Community", href: "/community", items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ]
    }
  ];
<\/script>

<ServiceNavigationNestedMobile
  serviceName="Example Service"
  homeHref="/"
  navigationItems={sampleNavItems}
  mobileNavSections={sampleMobileSections}
/>`,ve=`
<!-- Mobile demo approach using an iframe -->
<div class="border border-dashed border-gray-400 mx-auto mobile-example mobile-frame w-full max-w-[420px]" style="height: 480px;">
  <iframe 
    src="/components/layout/service-navigation-nested-mobile/mobile-demo" 
    title="Mobile Navigation Demo" 
    style="width: 100%; height: 100%; border: none;"
  ></iframe>
</div>

<!-- Code for /src/routes/components/layout/service-navigation-nested-mobile/mobile-demo/+page.svelte -->
<script>
  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";
  
  // Sample data for the demo
  const navigationItems = [
    { text: "Home", href: "/" },
    { text: "Components", href: "/components" },
    { text: "Patterns", href: "/patterns" },
    { text: "Community", href: "/community" }
  ];
  
  const mobileNavSections = [
    {
      title: "Home",
      href: "/",
      current: true,
      items: [{ text: "Overview", href: "/" }]
    },
    {
      title: "Components",
      href: "/components",
      current: false,
      items: [
        { title: "Forms", items: [{ text: "Button", href: "/components/ui/button" }] }
      ]
    },
    // Include other sections as needed
  ];
<\/script>

<div>
  <ServiceNavigationNestedMobile
    serviceName="Mobile Example"
    homeHref="/"
    {navigationItems}
    mobileNavSections={mobileNavSections}
  />
</div>
`,he=n=>{var r=ge(),d=N(E(r),2);U(d,{get code(){return ve},language:"svelte"}),p(n,r)};var be=f('<div class="p-5 bg-white border border-dashed border-gray-400 relative h-48 overflow-hidden"><!></div> <!>',1),ge=f(`<div class="p-5 bg-white"><p class="mb-4">This example demonstrates the mobile navigation by embedding an iframe
      with a mobile viewport width to properly trigger the CSS media queries.</p> <div class="border border-dashed border-gray-400 mx-auto mobile-example mobile-frame svelte-har8m9" style="width: 420px; height: 480px;"><iframe src="/components/layout/service-navigation-nested-mobile/mobile-demo" title="Mobile Navigation Demo" style="width: 100%; height: 100%; border: none;" frameborder="0"></iframe></div></div> <!>`,1),xe=f('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),ye=f('<span slot="header" class="text-lg"> </span>'),Ce=f('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Se(n,r){V(r,!1);const d=m=>{var P=be(),s=E(P),A=C(s);D(A,{serviceName:"Example Service",homeHref:"/",navigationItems:v,mobileNavSections:_}),S(s);var h=N(s,2);U(h,{get code(){return fe},language:"svelte"}),p(m,P)};let v=[{text:"Home",href:"/",current:!0},{text:"Components",href:"/components",current:!1},{text:"Patterns",href:"/patterns",current:!1},{text:"Community",href:"/community",current:!1}],_=[{title:"Home",href:"/",current:!0,items:[{text:"Overview",href:"/"}]},{title:"Components",href:"/components",current:!1,items:[{title:"Forms",items:[{text:"Button",href:"/components/ui/button"},{text:"Checkbox",href:"/components/ui/checkbox"},{text:"Select",href:"/components/ui/select"}]},{title:"Layout",items:[{text:"Internal Header",href:"/components/layout/internal-header"},{text:"Phase Banner",href:"/components/layout/phase-banner"}]}]},{title:"Patterns",href:"/patterns",current:!1,items:[{title:"Common patterns",items:[{text:"Forms",href:"/patterns/forms"},{text:"Tables",href:"/patterns/tables"}]}]},{title:"Community",href:"/community",current:!1,items:[{text:"Updates",href:"/community/updates"},{text:"Contributing",href:"/community/contributing"}]}],I=[{id:"1",heading:"1. Basic Usage",content:d},{id:"2",heading:"2. Mobile View (Forced)",content:he}];pe();var a=Ce(),k=N(C(a),2);de(k,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(m,P)=>{var s=J(),A=E(s);me(A,1,()=>I,le,(h,w)=>{ue(h,{children:(l,u)=>{var i=xe(),b=C(i);ce(b,()=>e(w).content),S(i),p(l,i)},$$slots:{default:!0,header:(l,u)=>{var i=ye(),b=C(i,!0);S(i),q(()=>K(b,e(w).heading)),p(l,i)}}})}),p(m,s)},$$slots:{default:!0}}),S(a),p(n,a),W()}const z=(n,r=O,d=O,v=O,_=O)=>{X(n,{get name(){return r()},get folder(){return d()},get subFolder(){return v()},get homepage(){return _()},statusObject:Ne,parentFolder:"components-update"})},L=(n,r=O)=>{re(n,{get homepage(){return r()},detailsArray:Ae,connectedComponentsArray:we})};let Ne={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},_e=["Combines the HeaderNav and MobileNav components to create a responsive service navigation.","Manages the open/closed state of the mobile menu and synchronizes the current section based on the active route."],Pe=["Use this component as the primary navigation structure within the main layout (`+layout.svelte`) of an application requiring both desktop top navigation and a nested mobile flyout menu.","It replaces the individual logic previously needed in the layout to manage these two navigation components."],Ae=[{label:"Description",arr:_e,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Pe,visibleOnHomepage:!1,markdown:!0}],we=[];var Oe=f('<div class="p-8"><!></div>'),Ie=f('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function ke(n,r){V(r,!0);const d=t=>{var o=Oe(),g=C(o);D(g,Q(()=>e(w))),S(o),p(t,o)};let v=se.url.pathname.split("/"),_=ie(v[v.length-1]),I=F(H(Y.md)),a=c(()=>ae([{name:"serviceName",category:"Content",value:"My Application",description:"The name of the service displayed in the header.",rows:1},{name:"homeHref",category:"Content",value:"/",description:"The link for the service name (usually the homepage).",rows:1},{name:"navigationItems",category:"Content",value:[{text:"Home",href:"/",current:!0},{text:"Components",href:"/components",current:!1},{text:"Patterns",href:"/patterns",current:!1}],description:"Array of objects for the main desktop navigation links.",rows:5},{name:"mobileNavSections",category:"Content",value:[{title:"Home",href:"/",current:!0,items:[{text:"Overview",href:"/"}]},{title:"Components",href:"/components",current:!1,items:[{title:"Forms",items:[{text:"Button",href:"/components/ui/button"},{text:"Checkbox",href:"/components/ui/checkbox"}]},{title:"Layout",items:[{text:"Internal Header",href:"/components/layout/internal-header"}]}]},{title:"Patterns",href:"/patterns",current:!1,items:[{title:"Common patterns",items:[{text:"Forms",href:"/patterns/forms"}]}]}],description:"Array of section objects for the nested mobile navigation menu.",rows:15}])),k=function(t,o,g){return t.map(x=>{let y=g[x.name]??x.value;return x.isEditable===o&&y!=null?typeof y=="object"?JSON.stringify(y,null,2):y:null})},m=F(H(k(e(a),!0,{}))),P=c(()=>({})),s=c(()=>k(e(a),!1,e(P))),A=c(()=>oe(e(a),e(m))),h=c(()=>ne(e(a),e(m),e(s))),w=c(()=>e(h)[0]),l=c(()=>e(h)[1]),u=H({});G(()=>{e(l).forEach(t=>{u[t]=!0}),Object.keys(u).forEach(t=>{e(l).includes(t)||(u[t]=!1)})});let i=c(()=>Object.fromEntries(Object.entries(e(w)).map(([t,o])=>{var g,x;return[t,typeof o=="function"?(x=(g=e(a).find(y=>y.name===t))==null?void 0:g.functionElements)==null?void 0:x.functionAsString:o]})));var b=Ie(),M=E(b);Z(M,{wrapper:{component:{WrapperInformation:L,WrapperNameAndStatus:z},name:_},homepage:!1});var j=N(M,2);ee(j,{get parametersParsingErrorsArray(){return e(l)},get parametersParsingErrorsObject(){return u},onCloseFunction:t=>e(l).filter(o=>o!=t)});var B=N(j,2);te(B,{Component:d,get parametersSourceArray(){return e(a)},get derivedParametersValuesArray(){return e(s)},get parametersVisibleArray(){return e(A)},get parametersParsingErrorsObject(){return u},get copyParametersToClipboardObject(){return e(i)},get demoScreenWidth(){return e(I)},set demoScreenWidth(t){T(I,t,!0)},get statedParametersValuesArray(){return e(m)},set statedParametersValuesArray(t){T(m,t,!0)}});var $=N(B,2),R=C($);Se(R,{}),S($),p(n,b),W()}const qe=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:L,WrapperNameAndStatus:z,default:ke},Symbol.toStringTag,{value:"Module"}));export{qe as _};
