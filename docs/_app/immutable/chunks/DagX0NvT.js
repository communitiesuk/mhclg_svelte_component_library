import"./CWj6FrbW.js";import{p as W,f as k,s as C,a as D,c as y,r as x,t as G,y as e,D as O,I as T,ab as E,u as K,J as V,G as s,ac as Q}from"./I52qY7cu.js";import{f as d,c as X,a as c}from"./BBh-6AA0.js";import{s as Y}from"./BHp14Q1u.js";import{B as Z,d as ee}from"./DImQRQIn.js";import{W as te,P as re,C as ae,B as oe,a as ne,t as se,c as ie}from"./pjHBbLSa.js";import{p as me}from"./D7CmsDtu.js";import{k as le}from"./lMwbQCpd.js";import{S as U}from"./DT4tbVyP.js";import"./69_IOA4Y.js";import{s as ce}from"./5F35P8og.js";import{s as pe}from"./BvNl7SXi.js";import{e as de,i as ue}from"./n63ZiD1W.js";import{i as fe}from"./MVh4sFtc.js";import{A as ve,a as he}from"./DFHrQqYn.js";import{C as L}from"./BN7FUiX4.js";const ge=`
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
/>`,be=`
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
`,ye=i=>{var a=Ce(),p=C(k(a),2);L(p,{get code(){return be},language:"svelte"}),c(i,a)};var xe=d('<div class="p-5 bg-white border border-dashed border-gray-400 relative h-48 overflow-hidden"><!></div> <!>',1),Ce=d(`<div class="p-5 bg-white"><p class="mb-4">This example demonstrates the mobile navigation by embedding an iframe
      with a mobile viewport width to properly trigger the CSS media queries.</p> <div class="border border-dashed border-gray-400 mx-auto mobile-example mobile-frame svelte-har8m9" style="width: 420px; height: 480px;"><iframe src="/components/layout/service-navigation-nested-mobile/mobile-demo" title="Mobile Navigation Demo" style="width: 100%; height: 100%; border: none;" frameborder="0"></iframe></div></div> <!>`,1),Se=d('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),_e=d('<span slot="header" class="text-lg"> </span>'),Ne=d('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pe(i,a){W(a,!1);const p=l=>{var _=xe(),m=k(_),N=y(m);U(N,{serviceName:"Example Service",homeHref:"/",get navigationItems(){return u},get mobileNavSections(){return S}}),x(m);var P=C(m,2);L(P,{get code(){return ge},language:"svelte"}),c(l,_)};let u=[{text:"Home",href:"/",current:!0},{text:"Components",href:"/components",current:!1},{text:"Patterns",href:"/patterns",current:!1},{text:"Community",href:"/community",current:!1}],S=[{title:"Home",href:"/",current:!0,items:[{text:"Overview",href:"/"}]},{title:"Components",href:"/components",current:!1,items:[{title:"Forms",items:[{text:"Button",href:"/components/ui/button"},{text:"Checkbox",href:"/components/ui/checkbox"},{text:"Select",href:"/components/ui/select"}]},{title:"Layout",items:[{text:"Internal Header",href:"/components/layout/internal-header"},{text:"Phase Banner",href:"/components/layout/phase-banner"}]}]},{title:"Patterns",href:"/patterns",current:!1,items:[{title:"Common patterns",items:[{text:"Forms",href:"/patterns/forms"},{text:"Tables",href:"/patterns/tables"}]}]},{title:"Community",href:"/community",current:!1,items:[{text:"Updates",href:"/community/updates"},{text:"Contributing",href:"/community/contributing"}]}],I=[{id:"1",heading:"1. Basic Usage",content:p},{id:"2",heading:"2. Mobile View (Forced)",content:ye}];fe();var o=Ne(),j=C(y(o),2);ve(j,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(l,_)=>{var m=X(),N=k(m);de(N,1,()=>I,ue,(P,A)=>{he(P,{children:(f,v)=>{var r=Se(),w=y(r);pe(w,()=>e(A).content),x(r),c(f,r)},$$slots:{default:!0,header:(f,v)=>{var r=_e(),w=y(r,!0);x(r),G(()=>ce(w,e(A).heading)),c(f,r)}}})}),c(l,m)},$$slots:{default:!0}}),x(o),c(i,o),D()}const R=(i,a=O,p=O,u=O,S=O)=>{Z(i,{get name(){return a()},get folder(){return p()},get subFolder(){return u()},get homepage(){return S()},get statusObject(){return Ae},parentFolder:"components-update"})},q=(i,a=O)=>{oe(i,{get homepage(){return a()},get detailsArray(){return Ie},get connectedComponentsArray(){return je}})};let Ae={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},we=["Combines the HeaderNav and MobileNav components to create a responsive service navigation.","Manages the open/closed state of the mobile menu and synchronizes the current section based on the active route."],Oe=["Use this component as the primary navigation structure within the main layout (`+layout.svelte`) of an application requiring both desktop top navigation and a nested mobile flyout menu.","It replaces the individual logic previously needed in the layout to manage these two navigation components."],Ie=[{label:"Description",arr:we,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Oe,visibleOnHomepage:!1,markdown:!0}],je=[];var ke=d('<div class="p-8"><!></div>'),Ee=d('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function He(i,a){W(a,!0);const p=t=>{var n=ke(),h=y(n);U(h,Y(()=>e(f))),x(n),c(t,n)};let u=me.url.pathname.split("/"),S=le(u[u.length-1]),I=T(E(ee.md)),o=s(()=>ne([{name:"serviceName",category:"Content",value:"My Application",description:"The name of the service displayed in the header.",rows:1},{name:"homeHref",category:"Content",value:"/",description:"The link for the service name (usually the homepage).",rows:1},{name:"navigationItems",category:"Content",value:[{text:"Home",href:"/",current:!0},{text:"Components",href:"/components",current:!1},{text:"Patterns",href:"/patterns",current:!1}],description:"Array of objects for the main desktop navigation links.",rows:5},{name:"mobileNavSections",category:"Content",value:[{title:"Home",href:"/",current:!0,items:[{text:"Overview",href:"/"}]},{title:"Components",href:"/components",current:!1,items:[{title:"Forms",items:[{text:"Button",href:"/components/ui/button"},{text:"Checkbox",href:"/components/ui/checkbox"}]},{title:"Layout",items:[{text:"Internal Header",href:"/components/layout/internal-header"}]}]},{title:"Patterns",href:"/patterns",current:!1,items:[{title:"Common patterns",items:[{text:"Forms",href:"/patterns/forms"}]}]}],description:"Array of section objects for the nested mobile navigation menu.",rows:15}])),j=function(t,n,h){return t.map(g=>{let b=h[g.name]??g.value;return g.isEditable===n&&b!=null?typeof b=="object"?JSON.stringify(b,null,2):b:null})},l=T(E(j(e(o),!0,{}))),_=s(()=>({})),m=s(()=>j(e(o),!1,e(_))),N=s(()=>se(e(o),e(l))),P=s(()=>ie(e(o),e(l),e(m))),A=s(()=>Q(e(P),2)),f=s(()=>e(A)[0]),v=s(()=>e(A)[1]),r=E({});K(()=>{e(v).forEach(t=>{r[t]=!0}),Object.keys(r).forEach(t=>{e(v).includes(t)||(r[t]=!1)})});let w=s(()=>Object.fromEntries(Object.entries(e(f)).map(([t,n])=>{var h,g;return[t,typeof n=="function"?(g=(h=e(o).find(b=>b.name===t))==null?void 0:h.functionElements)==null?void 0:g.functionAsString:n]})));var H=Ee(),M=k(H);const z=s(()=>({component:{WrapperInformation:q,WrapperNameAndStatus:R},name:S}));te(M,{get wrapper(){return e(z)},homepage:!1});var $=C(M,2);re($,{get parametersParsingErrorsArray(){return e(v)},get parametersParsingErrorsObject(){return r},onCloseFunction:t=>e(v).filter(n=>n!=t)});var B=C($,2);ae(B,{get Component(){return p},get parametersSourceArray(){return e(o)},get derivedParametersValuesArray(){return e(m)},get parametersVisibleArray(){return e(N)},get parametersParsingErrorsObject(){return r},get copyParametersToClipboardObject(){return e(w)},get demoScreenWidth(){return e(I)},set demoScreenWidth(t){V(I,t,!0)},get statedParametersValuesArray(){return e(l)},set statedParametersValuesArray(t){V(l,t,!0)}});var F=C(B,2),J=y(F);Pe(J,{}),x(F),c(i,H),D()}const Qe=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:q,WrapperNameAndStatus:R,default:He},Symbol.toStringTag,{value:"Module"}));export{Qe as _};
