import"./CWj6FrbW.js";import{p as X,G as V,f as E,s as v,c as n,t as W,a as Y,r as o,I as T,z as e,y as B,D as F,a9 as q,u as ie}from"./BQOcVDnD.js";import{t as u,a as p,f as oe,s as z,c as re}from"./Dp3jeoTR.js";import{p as R,s as ne}from"./Bx8udYmP.js";import{B as se,d as le}from"./D6uVBQnT.js";import{e as de,W as ce,P as ve,C as pe,B as ue,a as me,t as ge,c as fe}from"./Byzigwih.js";import{p as be}from"./D9-BLNeQ.js";import{k as he}from"./lMwbQCpd.js";import{i as Z}from"./w59L6Jp2.js";import{e as K,i as Q}from"./hy64cfae.js";import{a as U,s as H}from"./CM6Y-JJe.js";import{o as _e}from"./wh8Qo9IY.js";import{s as xe}from"./ByC2DMpr.js";import{A as Se,a as Ie}from"./DlNGJXaH.js";import"./69_IOA4Y.js";import{C as M}from"./B8qjdm4g.js";function we(l,t,a,d,r){l.preventDefault(),T(t,!e(t)),T(a,e(d)&&!e(t)&&!r().disabled,!0)}var ye=u('<button class="dwp-side-navigation__button svelte-112oika" data-module="dwp-side-navigation" data-target="dwp-side-navigation-panel"><span class="dwp-side-navigation__section-toggle-focus"><span></span> <span class="dwp-side-navigation__section-toggle-text svelte-112oika"> </span></span></button>'),Ae=u('<li class="dwp-side-navigation__sub-item svelte-112oika"><a> </a></li>'),ke=u('<ul class="dwp-side-navigation__list dwp-side-navigation__list--sub-item svelte-112oika"></ul>'),Ce=u("<li><a> </a> <!></li>"),Pe=u('<!> <nav><ul class="dwp-side-navigation__list svelte-112oika"></ul></nav>',1);function D(l,t){X(t,!0);let a=R(t,"items",19,()=>[]),d=R(t,"ariaLabel",3,"Side"),r=R(t,"selectedItem",11,""),O=R(t,"selectedSubItem",11,""),g=R(t,"mobile",19,()=>({disabled:!1,showButtonText:"Show navigation",hideButtonText:"Hide navigation"})),_=V(!1),x=V(!1),S=V(!1);_e(()=>{T(x,!0),T(S,e(x)&&!e(_)&&!g().disabled,!0)});var A=Pe(),P=E(A);{var k=s=>{var i=ye();i.__click=[we,_,S,x,g];var I=n(i),C=n(I),w=v(C,2),f=n(w,!0);o(w),o(I),o(i),W(()=>{H(i,"aria-expanded",e(_)),U(C,1,`dwp-side-navigation__chevron ${(e(_)?"dwp-side-navigation__chevron--down":"")??""}`,"svelte-112oika"),z(f,e(_)?g().hideButtonText:g().showButtonText)}),p(s,i)};Z(P,s=>{g().disabled||s(k)})}var m=v(P,2),h=n(m);K(h,21,a,Q,(s,i)=>{var I=Ce();const C=B(()=>e(i).href&&e(i).href===r()),w=B(()=>O()||r());var f=n(I),$=n(f,!0);o(f);var J=v(f,2);{var c=b=>{var N=ke();K(N,21,()=>e(i).subItems,Q,(j,y)=>{var G=Ae(),L=n(G),ae=n(L,!0);o(L),o(G),W(()=>{H(L,"id",e(y).id),H(L,"href",e(y).href),U(L,1,`dwp-side-navigation__link${(e(w)===e(y).href?" dwp-side-navigation__link--selected":"")??""}`,"svelte-112oika"),H(L,"aria-current",e(w)===e(y).href?"true":void 0),z(ae,e(y).text)}),p(j,G)}),o(N),p(b,N)};Z(J,b=>{e(C)&&e(i).subItems&&e(i).subItems.length>0&&b(c)})}o(I),W(()=>{U(I,1,`dwp-side-navigation__item${(e(C)?" dwp-side-navigation__item--selected":"")??""}`,"svelte-112oika"),H(f,"id",e(i).id),H(f,"href",e(i).href),U(f,1,`dwp-side-navigation__link${(e(w)===e(i).href?" dwp-side-navigation__link--selected":"")??""}`,"svelte-112oika"),H(f,"aria-current",e(w)===e(i).href?"true":void 0),z($,e(i).text)}),p(s,I)}),o(h),o(m),W(()=>{U(m,1,`dwp-side-navigation ${(e(S)?"dwp-side-navigation--mobile":"")??""}`,"svelte-112oika"),H(m,"aria-label",d())}),p(l,A),Y()}oe(["click"]);const Ne=`
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
/>`,Be=`<script>
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
/>`,Ee=`<script>
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
/>`,$e=`<script>
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
/>`,je=`
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

<p class="govuk-body">Currently selected: {selectedItem}</p>`,He=l=>{var t=Ve(),a=E(t),d=n(a);D(d,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Services",href:"/services"},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}],selectedItem:"/home",ariaLabel:"Main navigation"}),o(a);var r=v(a,2);M(r,{get code(){return Ne},language:"svelte"}),p(l,t)},Te=l=>{var t=Me(),a=E(t),d=n(a);D(d,{items:[{id:"nav-1",text:"Dashboard",href:"/dashboard"},{id:"nav-2",text:"Account",href:"/account",subItems:[{id:"subnav-1",text:"Profile",href:"/account/profile"},{id:"subnav-2",text:"Settings",href:"/account/settings"},{id:"subnav-3",text:"Security",href:"/account/security"}]},{id:"nav-3",text:"Help",href:"/help"}],selectedItem:"/account",ariaLabel:"Account navigation"}),o(a);var r=v(a,2);M(r,{get code(){return Be},language:"svelte"}),p(l,t)},De=l=>{var t=Re(),a=E(t),d=n(a);D(d,{items:[{id:"nav-1",text:"Policies",href:"/policies"},{id:"nav-2",text:"Applications",href:"/applications",subItems:[{id:"subnav-1",text:"New Applications",href:"/applications/new"},{id:"subnav-2",text:"In Progress",href:"/applications/in-progress"},{id:"subnav-3",text:"Completed",href:"/applications/completed"}]},{id:"nav-3",text:"Reports",href:"/reports"}],selectedItem:"/applications",selectedSubItem:"/applications/in-progress",ariaLabel:"Applications navigation"}),o(a);var r=v(a,2);M(r,{get code(){return Ee},language:"svelte"}),p(l,t)},Le=l=>{var t=Ue(),a=E(t),d=n(a);D(d,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"About",href:"/about"},{id:"nav-3",text:"Services",href:"/services"}],selectedItem:"/about",mobile:{disabled:!1,showButtonText:"Open menu",hideButtonText:"Close menu"},ariaLabel:"Site navigation"}),o(a);var r=v(a,2);M(r,{get code(){return Oe},language:"svelte"}),p(l,t)},We=l=>{var t=Fe(),a=E(t),d=n(a);D(d,{items:[{id:"nav-1",text:"Documentation",href:"/docs"},{id:"nav-2",text:"API Reference",href:"/api"},{id:"nav-3",text:"Examples",href:"/examples"}],selectedItem:"/api",mobile:{disabled:!0},ariaLabel:"Documentation navigation"}),o(a);var r=v(a,2);M(r,{get code(){return $e},language:"svelte"}),p(l,t)};var Ve=u('<div class="p-5 bg-white"><!></div> <!>',1),Me=u('<div class="p-5 bg-white"><!></div> <!>',1),Re=u('<div class="p-5 bg-white"><!></div> <!>',1),Ue=u('<div class="p-5 bg-white"><!></div> <!>',1),Fe=u('<div class="p-5 bg-white"><!></div> <!>',1),ze=u('<div class="p-5 bg-white"><div class="govuk-form-group"><label class="govuk-label" for="nav-select">Select a navigation item:</label> <select class="govuk-select" id="nav-select"><option>Home</option><option>Products</option><option>Support</option><option>Contact</option></select></div> <div class="mt-4"><!></div> <p class="govuk-body mt-4"> </p></div> <!>',1),Je=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ge=u('<span slot="header" class="text-lg"> </span>'),qe=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ke(l,t){X(t,!0);let d=[{id:"1",heading:"1. Basic Usage",content:He},{id:"2",heading:"2. With Subitems",content:Te},{id:"3",heading:"3. With Selected Subitem",content:De},{id:"4",heading:"4. Mobile Navigation Configuration",content:Le},{id:"5",heading:"5. Disabled Mobile Toggle",content:We},{id:"6",heading:"6. Bindable Value",content:_=>{var x=ze(),S=E(x),A=n(S),P=v(n(A),2),k=n(P);k.value=(k.__value="/home")==null?"":"/home";var m=v(k);m.value=(m.__value="/products")==null?"":"/products";var h=v(m);h.value=(h.__value="/support")==null?"":"/support";var s=v(h);s.value=(s.__value="/contact")==null?"":"/contact",o(P),o(A);var i=v(A,2),I=n(i);D(I,{items:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Products",href:"/products"},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}],ariaLabel:"Main navigation",get selectedItem(){return e(r)},set selectedItem($){T(r,$,!0)}}),o(i);var C=v(i,2),w=n(C);o(C),o(S);var f=v(S,2);M(f,{get code(){return je},language:"svelte"}),W(()=>z(w,`Currently selected: ${e(r)??""}`)),de(P,()=>e(r),$=>T(r,$)),p(_,x)}}],r=V("/support");var O=qe(),g=v(n(O),2);Se(g,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(_,x)=>{var S=re(),A=E(S);K(A,17,()=>d,Q,(P,k)=>{Ie(P,{children:(m,h)=>{var s=Je(),i=n(s);xe(i,()=>e(k).content),o(s),p(m,s)},$$slots:{default:!0,header:(m,h)=>{var s=Ge(),i=n(s,!0);o(s),W(()=>z(i,e(k).heading)),p(m,s)}}})}),p(_,S)},$$slots:{default:!0}}),o(O),p(l,O),Y()}const ee=(l,t=F,a=F,d=F,r=F)=>{se(l,{get name(){return t()},get folder(){return a()},get subFolder(){return d()},get homepage(){return r()},statusObject:Qe,parentFolder:"components-update"})},te=(l,t=F)=>{ue(l,{get homepage(){return t()},detailsArray:Ze,connectedComponentsArray:et})};let Qe={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Xe=["A side navigation component that provides an accessible way to navigate between different sections of a website.",'Based on the <a href="https://design-system.dwp.gov.uk/components/side-navigation/" target="_blank" rel="noopener noreferrer">DWP Design System side navigation component</a> pattern.'],Ye=["Use the side navigation component to help users navigate through a section of content that has multiple related pages.","Side navigation works well for websites with a hierarchical structure or multiple levels of navigation."],Ze=[{label:"Description",arr:Xe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ye,visibleOnHomepage:!1,markdown:!0}],et=[];var tt=u('<div class="mx-10 w-64"><!></div>'),at=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function it(l,t){X(t,!0);const a=c=>{var b=tt(),N=n(b);D(N,ne(()=>e(m))),o(b),p(c,b)};let d=be.url.pathname.split("/"),r=he(d[d.length-1]),O=V(q(le.md)),g=B(()=>me([{name:"items",category:"Content",value:[{id:"nav-1",text:"Home",href:"/home"},{id:"nav-2",text:"Services",href:"/services",subItems:[{id:"subnav-1",text:"Service A",href:"/services/a"},{id:"subnav-2",text:"Service B",href:"/services/b"},{id:"subnav-3",text:"Service C",href:"/services/c"}]},{id:"nav-3",text:"Support",href:"/support"},{id:"nav-4",text:"Contact",href:"/contact"}]},{name:"ariaLabel",category:"Accessibility",value:"Side"},{name:"selectedItem",category:"Content",value:"/services"},{name:"selectedSubItem",category:"Content",value:"/services/c"},{name:"mobile",category:"UI Options",value:{disabled:!1,showButtonText:"Show navigation",hideButtonText:"Hide navigation"}}])),_=function(c,b,N){return c.map(j=>{let y=N[j.name]??j.value;return j.isEditable===b&&y!=null?typeof y=="object"?JSON.stringify(y,null,2):y:null})},x=V(q(_(e(g),!0,{}))),S=B(()=>({})),A=B(()=>_(e(g),!1,e(S))),P=B(()=>ge(e(g),e(x))),k=B(()=>fe(e(g),e(x),e(A))),m=B(()=>e(k)[0]),h=B(()=>e(k)[1]),s=q({});ie(()=>{e(h).forEach(c=>{s[c]=!0}),Object.keys(s).forEach(c=>{e(h).includes(c)||(s[c]=!1)})});let i=B(()=>Object.fromEntries(Object.entries(e(m)).map(([c,b])=>{var N,j;return[c,typeof b=="function"?(j=(N=e(g).find(y=>y.name===c))==null?void 0:N.functionElements)==null?void 0:j.functionAsString:b]})));var I=at(),C=E(I);ce(C,{wrapper:{component:{WrapperInformation:te,WrapperNameAndStatus:ee},name:r},homepage:!1});var w=v(C,2);ve(w,{get parametersParsingErrorsArray(){return e(h)},get parametersParsingErrorsObject(){return s},onCloseFunction:c=>e(h).filter(b=>b!=c)});var f=v(w,2);pe(f,{Component:a,get parametersSourceArray(){return e(g)},get derivedParametersValuesArray(){return e(A)},get parametersVisibleArray(){return e(P)},get parametersParsingErrorsObject(){return s},get copyParametersToClipboardObject(){return e(i)},get demoScreenWidth(){return e(O)},set demoScreenWidth(c){T(O,c,!0)},get statedParametersValuesArray(){return e(x)},set statedParametersValuesArray(c){T(x,c,!0)}});var $=v(f,2),J=n($);Ke(J,{}),o($),p(l,I),Y()}const xt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:te,WrapperNameAndStatus:ee,default:it},Symbol.toStringTag,{value:"Module"}));export{xt as _};
