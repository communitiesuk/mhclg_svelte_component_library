import"./CWj6FrbW.js";import{p as X,f as $,s as v,c as n,t as L,a as Y,r as o,J as T,I as W,y as e,G as y,D as F,ab as q,u as ie,ac as oe}from"./I52qY7cu.js";import{f as u,a as p,c as re}from"./BBh-6AA0.js";import{p as R,s as ne}from"./BHp14Q1u.js";import{B as se,d as le}from"./DImQRQIn.js";import{W as de,P as ce,C as ve,B as pe,a as ue,t as me,c as ge}from"./pjHBbLSa.js";import{p as fe}from"./D7CmsDtu.js";import{k as be}from"./lMwbQCpd.js";import{o as he}from"./CUqUSu4U.js";import{d as _e,s as J}from"./5F35P8og.js";import{i as Z}from"./HAye_oo1.js";import{e as K,i as Q}from"./n63ZiD1W.js";import{s as U,a as H,f as xe}from"./vwgBT8YE.js";import{s as Se}from"./BvNl7SXi.js";import{A as Ie,a as we}from"./DFHrQqYn.js";import"./69_IOA4Y.js";import{C as V}from"./BN7FUiX4.js";function ye(s,t,i,c,r){s.preventDefault(),T(t,!e(t)),T(i,e(c)&&!e(t)&&!r().disabled,!0)}var Ae=u('<button class="dwp-side-navigation__button svelte-112oika" data-module="dwp-side-navigation" data-target="dwp-side-navigation-panel"><span class="dwp-side-navigation__section-toggle-focus"><span></span> <span class="dwp-side-navigation__section-toggle-text svelte-112oika"> </span></span></button>'),ke=u('<li class="dwp-side-navigation__sub-item svelte-112oika"><a> </a></li>'),Ce=u('<ul class="dwp-side-navigation__list dwp-side-navigation__list--sub-item svelte-112oika"></ul>'),Pe=u("<li><a> </a> <!></li>"),Ne=u('<!> <nav><ul class="dwp-side-navigation__list svelte-112oika"></ul></nav>',1);function D(s,t){X(t,!0);let i=R(t,"items",19,()=>[]),c=R(t,"ariaLabel",3,"Side"),r=R(t,"selectedItem",11,""),O=R(t,"selectedSubItem",11,""),g=R(t,"mobile",19,()=>({disabled:!1,showButtonText:"Show navigation",hideButtonText:"Hide navigation"})),h=W(!1),_=W(!1),x=W(!1);he(()=>{T(_,!0),T(x,e(_)&&!e(h)&&!g().disabled,!0)});var A=Ne(),N=$(A);{var B=l=>{var a=Ae();a.__click=[ye,h,x,_,g];var C=n(a),P=n(C),S=v(P,2),f=n(S,!0);o(S),o(C),o(a),L(()=>{H(a,"aria-expanded",e(h)),U(P,1,`dwp-side-navigation__chevron ${e(h)?"dwp-side-navigation__chevron--down":""}`,"svelte-112oika"),J(f,e(h)?g().hideButtonText:g().showButtonText)}),p(l,a)};Z(N,l=>{g().disabled||l(B)})}var m=v(N,2),k=n(m);K(k,21,i,Q,(l,a)=>{var C=Pe();const P=y(()=>e(a).href&&e(a).href===r()),S=y(()=>O()||r());var f=n(C),j=n(f,!0);o(f);var z=v(f,2);{var G=M=>{var d=Ce();K(d,21,()=>e(a).subItems,Q,(I,w)=>{var E=ke(),b=n(E),ae=n(b,!0);o(b),o(E),L(()=>{H(b,"id",e(w).id),H(b,"href",e(w).href),U(b,1,`dwp-side-navigation__link${e(S)===e(w).href?" dwp-side-navigation__link--selected":""}`,"svelte-112oika"),H(b,"aria-current",e(S)===e(w).href?"true":void 0),J(ae,e(w).text)}),p(I,E)}),o(d),p(M,d)};Z(z,M=>{e(P)&&e(a).subItems&&e(a).subItems.length>0&&M(G)})}o(C),L(()=>{U(C,1,`dwp-side-navigation__item${e(P)?" dwp-side-navigation__item--selected":""}`,"svelte-112oika"),H(f,"id",e(a).id),H(f,"href",e(a).href),U(f,1,`dwp-side-navigation__link${e(S)===e(a).href?" dwp-side-navigation__link--selected":""}`,"svelte-112oika"),H(f,"aria-current",e(S)===e(a).href?"true":void 0),J(j,e(a).text)}),p(l,C)}),o(k),o(m),L(()=>{U(m,1,`dwp-side-navigation ${e(x)?"dwp-side-navigation--mobile":""}`,"svelte-112oika"),H(m,"aria-label",c())}),p(s,A),Y()}_e(["click"]);const Be=`
<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Services", href: "/services" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
<\/script>

<SideNavigation
  items={navItems}
  selectedItem="/home"
  ariaLabel="Main navigation"
/>`,Ee=`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Dashboard", href: "/dashboard" },
    { 
      id: "nav-2", 
      text: "Account", 
      href: "/account",
      subItems: [
        { id: "subnav-1", text: "Profile", href: "/account/profile" },
        { id: "subnav-2", text: "Settings", href: "/account/settings" },
        { id: "subnav-3", text: "Security", href: "/account/security" }
      ]
    },
    { id: "nav-3", text: "Help", href: "/help" }
  ];
<\/script>

<SideNavigation
  items={navItems}
  selectedItem="/account"
  ariaLabel="Account navigation"
/>`,$e=`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Policies", href: "/policies" },
    { 
      id: "nav-2", 
      text: "Applications", 
      href: "/applications",
      subItems: [
        { id: "subnav-1", text: "New Applications", href: "/applications/new" },
        { id: "subnav-2", text: "In Progress", href: "/applications/in-progress" },
        { id: "subnav-3", text: "Completed", href: "/applications/completed" }
      ]
    },
    { id: "nav-3", text: "Reports", href: "/reports" }
  ];
<\/script>

<SideNavigation
  items={navItems}
  selectedItem="/applications"
  selectedSubItem="/applications/in-progress"
  ariaLabel="Applications navigation"
/>`,Oe=`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "About", href: "/about" },
    { id: "nav-3", text: "Services", href: "/services" }
  ];

  const mobileConfig = {
    disabled: false,
    showButtonText: "Open menu",
    hideButtonText: "Close menu"
  };
<\/script>

<SideNavigation
  items={navItems}
  selectedItem="/about"
  mobile={mobileConfig}
  ariaLabel="Site navigation"
/>`,je=`<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";

  const navItems = [
    { id: "nav-1", text: "Documentation", href: "/docs" },
    { id: "nav-2", text: "API Reference", href: "/api" },
    { id: "nav-3", text: "Examples", href: "/examples" }
  ];

  // Disable mobile toggle button
  const mobileConfig = {
    disabled: true
  };
<\/script>

<SideNavigation
  items={navItems}
  selectedItem="/api"
  mobile={mobileConfig}
  ariaLabel="Documentation navigation"
/>`,He=`
<script>
  import SideNavigation from "$lib/components/ui/SideNavigation.svelte";
  
  let selectedItem = $state("/support");
  
  const navItems = [
    { id: "nav-1", text: "Home", href: "/home" },
    { id: "nav-2", text: "Products", href: "/products" },
    { id: "nav-3", text: "Support", href: "/support" },
    { id: "nav-4", text: "Contact", href: "/contact" }
  ];
<\/script>

<div class="govuk-form-group">
  <label class="govuk-label" for="nav-select">
    Select a navigation item:
  </label>
  <select 
    class="govuk-select" 
    id="nav-select"
    bind:value={selectedItem}
  >
    <option value="/home">Home</option>
    <option value="/products">Products</option>
    <option value="/support">Support</option>
    <option value="/contact">Contact</option>
  </select>
</div>

<SideNavigation
  items={navItems}
  bind:selectedItem={selectedItem}
  ariaLabel="Main navigation"
/>

<p class="govuk-body">Currently selected: {selectedItem}</p>`,Te=s=>{var t=Me(),i=$(t),c=n(i);D(c,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Services",href:"/services"},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}],selectedItem:"/home",ariaLabel:"Main navigation"}),o(i);var r=v(i,2);V(r,{get code(){return Be},language:"svelte"}),p(s,t)},De=s=>{var t=Re(),i=$(t),c=n(i);D(c,{items:[{id:"nav-1",text:"Dashboard",href:"/dashboard"},{id:"nav-2",text:"Account",href:"/account",subItems:[{id:"subnav-1",text:"Profile",href:"/account/profile"},{id:"subnav-2",text:"Settings",href:"/account/settings"},{id:"subnav-3",text:"Security",href:"/account/security"}]},{id:"nav-3",text:"Help",href:"/help"}],selectedItem:"/account",ariaLabel:"Account navigation"}),o(i);var r=v(i,2);V(r,{get code(){return Ee},language:"svelte"}),p(s,t)},Le=s=>{var t=Ue(),i=$(t),c=n(i);D(c,{items:[{id:"nav-1",text:"Policies",href:"/policies"},{id:"nav-2",text:"Applications",href:"/applications",subItems:[{id:"subnav-1",text:"New Applications",href:"/applications/new"},{id:"subnav-2",text:"In Progress",href:"/applications/in-progress"},{id:"subnav-3",text:"Completed",href:"/applications/completed"}]},{id:"nav-3",text:"Reports",href:"/reports"}],selectedItem:"/applications",selectedSubItem:"/applications/in-progress",ariaLabel:"Applications navigation"}),o(i);var r=v(i,2);V(r,{get code(){return $e},language:"svelte"}),p(s,t)},We=s=>{var t=Fe(),i=$(t),c=n(i);D(c,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"About",href:"/about"},{id:"nav-3",text:"Services",href:"/services"}],selectedItem:"/about",mobile:{disabled:!1,showButtonText:"Open menu",hideButtonText:"Close menu"},ariaLabel:"Site navigation"}),o(i);var r=v(i,2);V(r,{get code(){return Oe},language:"svelte"}),p(s,t)},Ve=s=>{var t=Je(),i=$(t),c=n(i);D(c,{items:[{id:"nav-1",text:"Documentation",href:"/docs"},{id:"nav-2",text:"API Reference",href:"/api"},{id:"nav-3",text:"Examples",href:"/examples"}],selectedItem:"/api",mobile:{disabled:!0},ariaLabel:"Documentation navigation"}),o(i);var r=v(i,2);V(r,{get code(){return je},language:"svelte"}),p(s,t)};var Me=u('<div class="p-5 bg-white"><!></div> <!>',1),Re=u('<div class="p-5 bg-white"><!></div> <!>',1),Ue=u('<div class="p-5 bg-white"><!></div> <!>',1),Fe=u('<div class="p-5 bg-white"><!></div> <!>',1),Je=u('<div class="p-5 bg-white"><!></div> <!>',1),ze=u('<div class="p-5 bg-white"><div class="govuk-form-group"><label class="govuk-label" for="nav-select">Select a navigation item:</label> <select class="govuk-select" id="nav-select"><option>Home</option><option>Products</option><option>Support</option><option>Contact</option></select></div> <div class="mt-4"><!></div> <p class="govuk-body mt-4"> </p></div> <!>',1),Ge=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),qe=u('<span slot="header" class="text-lg"> </span>'),Ke=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Qe(s,t){X(t,!0);let c=[{id:"1",heading:"1. Basic Usage",content:Te},{id:"2",heading:"2. With Subitems",content:De},{id:"3",heading:"3. With Selected Subitem",content:Le},{id:"4",heading:"4. Mobile Navigation Configuration",content:We},{id:"5",heading:"5. Disabled Mobile Toggle",content:Ve},{id:"6",heading:"6. Bindable Value",content:h=>{var _=ze(),x=$(_),A=n(x),N=v(n(A),2),B=n(N);B.value=B.__value="/home";var m=v(B);m.value=m.__value="/products";var k=v(m);k.value=k.__value="/support";var l=v(k);l.value=l.__value="/contact",o(N),o(A);var a=v(A,2),C=n(a);D(C,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Products",href:"/products"},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}],ariaLabel:"Main navigation",get selectedItem(){return e(r)},set selectedItem(j){T(r,j,!0)}}),o(a);var P=v(a,2),S=n(P);o(P),o(x);var f=v(x,2);V(f,{get code(){return He},language:"svelte"}),L(()=>J(S,`Currently selected: ${e(r)??""}`)),xe(N,()=>e(r),j=>T(r,j)),p(h,_)}}],r=W("/support");var O=Ke(),g=v(n(O),2);Ie(g,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(h,_)=>{var x=re(),A=$(x);K(A,17,()=>c,Q,(N,B)=>{we(N,{children:(m,k)=>{var l=Ge(),a=n(l);Se(a,()=>e(B).content),o(l),p(m,l)},$$slots:{default:!0,header:(m,k)=>{var l=qe(),a=n(l,!0);o(l),L(()=>J(a,e(B).heading)),p(m,l)}}})}),p(h,x)},$$slots:{default:!0}}),o(O),p(s,O),Y()}const ee=(s,t=F,i=F,c=F,r=F)=>{se(s,{get name(){return t()},get folder(){return i()},get subFolder(){return c()},get homepage(){return r()},get statusObject(){return Xe},parentFolder:"components-update"})},te=(s,t=F)=>{pe(s,{get homepage(){return t()},get detailsArray(){return et},get connectedComponentsArray(){return tt}})};let Xe={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ye=["A side navigation component that provides an accessible way to navigate between different sections of a website.",'Based on the <a href="https://design-system.dwp.gov.uk/components/side-navigation/" target="_blank" rel="noopener noreferrer">DWP Design System side navigation component</a> pattern.'],Ze=["Use the side navigation component to help users navigate through a section of content that has multiple related pages.","Side navigation works well for websites with a hierarchical structure or multiple levels of navigation."],et=[{label:"Description",arr:Ye,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ze,visibleOnHomepage:!1,markdown:!0}],tt=[];var at=u('<div class="mx-10 w-64"><!></div>'),it=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function ot(s,t){X(t,!0);const i=d=>{var I=at(),w=n(I);D(w,ne(()=>e(k))),o(I),p(d,I)};let c=fe.url.pathname.split("/"),r=be(c[c.length-1]),O=W(q(le.md)),g=y(()=>ue([{name:"items",category:"Content",value:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Services",href:"/services",subItems:[{id:"subnav-1",text:"Service A",href:"/services/a"},{id:"subnav-2",text:"Service B",href:"/services/b"},{id:"subnav-3",text:"Service C",href:"/services/c"}]},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}]},{name:"ariaLabel",category:"Accessibility",value:"Side"},{name:"selectedItem",category:"Content",value:"/services"},{name:"selectedSubItem",category:"Content",value:"/services/c"},{name:"mobile",category:"UI Options",value:{disabled:!1,showButtonText:"Show navigation",hideButtonText:"Hide navigation"}}])),h=function(d,I,w){return d.map(E=>{let b=w[E.name]??E.value;return E.isEditable===I&&b!=null?typeof b=="object"?JSON.stringify(b,null,2):b:null})},_=W(q(h(e(g),!0,{}))),x=y(()=>({})),A=y(()=>h(e(g),!1,e(x))),N=y(()=>me(e(g),e(_))),B=y(()=>ge(e(g),e(_),e(A))),m=y(()=>oe(e(B),2)),k=y(()=>e(m)[0]),l=y(()=>e(m)[1]),a=q({});ie(()=>{e(l).forEach(d=>{a[d]=!0}),Object.keys(a).forEach(d=>{e(l).includes(d)||(a[d]=!1)})});let C=y(()=>Object.fromEntries(Object.entries(e(k)).map(([d,I])=>{var w,E;return[d,typeof I=="function"?(E=(w=e(g).find(b=>b.name===d))==null?void 0:w.functionElements)==null?void 0:E.functionAsString:I]})));var P=it(),S=$(P);const f=y(()=>({component:{WrapperInformation:te,WrapperNameAndStatus:ee},name:r}));de(S,{get wrapper(){return e(f)},homepage:!1});var j=v(S,2);ce(j,{get parametersParsingErrorsArray(){return e(l)},get parametersParsingErrorsObject(){return a},onCloseFunction:d=>e(l).filter(I=>I!=d)});var z=v(j,2);ve(z,{get Component(){return i},get parametersSourceArray(){return e(g)},get derivedParametersValuesArray(){return e(A)},get parametersVisibleArray(){return e(N)},get parametersParsingErrorsObject(){return a},get copyParametersToClipboardObject(){return e(C)},get demoScreenWidth(){return e(O)},set demoScreenWidth(d){T(O,d,!0)},get statedParametersValuesArray(){return e(_)},set statedParametersValuesArray(d){T(_,d,!0)}});var G=v(z,2),M=n(G);Qe(M,{}),o(G),p(s,P),Y()}const It=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:te,WrapperNameAndStatus:ee,default:ot},Symbol.toStringTag,{value:"Module"}));export{It as _};
