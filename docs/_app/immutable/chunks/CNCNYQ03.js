import"./CWj6FrbW.js";import{o as Y}from"./CUqUSu4U.js";import{p as Z,f as q,s as o,a as ee,aE as te,c as l,r,J as u,I as E,y as e,t as G,D as V,ab as J,u as ce,G as s,ac as me}from"./I52qY7cu.js";import{e as ae,s as K}from"./5F35P8og.js";import{f as b,c as de,a as v}from"./BBh-6AA0.js";import{i as re}from"./HAye_oo1.js";import{s as pe}from"./BHp14Q1u.js";import{B as ve,d as ue}from"./CksXbiQj.js";import{W as fe,P as he,C as ge,B as be,a as ye,t as xe,c as Ne}from"./RBHAvJlU.js";import{p as Ae}from"./DdYFA_Ud.js";import{k as He}from"./lMwbQCpd.js";import{H as oe}from"./DcAILb4Q.js";import{e as Q,i as X}from"./n63ZiD1W.js";import{s as _e}from"./BvNl7SXi.js";import{a as Ie}from"./vwgBT8YE.js";import{A as we,a as Oe}from"./BS_vHGGP.js";import"./69_IOA4Y.js";import{C as Me}from"./BN7FUiX4.js";const ke=`
<script lang="ts">
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import { onMount } from "svelte";

  let ex1ServiceName = "My Application";
  let ex1HomeHref = "#/";
  let ex1NavigationItems = [
    { text: "Home", href: "#/home" },
    { text: "Features", href: "#/features" },
    { text: "Pricing", href: "#/pricing" },
    { text: "Contact", href: "#/contact" },
  ];
  let ex1ActiveItemHref = $state("#/home");
  let ex1IsMobileNavOpen = $state(false);

  function ex1ToggleMobileNav() {
    ex1IsMobileNavOpen = !ex1IsMobileNavOpen;
  }

  function updateActiveItemFromHash() {
    const hash = window.location.hash;
    const matched = ex1NavigationItems.find(item => hash.startsWith(item.href));
    ex1ActiveItemHref = matched ? matched.href : "#/home";
    ex1IsMobileNavOpen = false;
  }

  onMount(updateActiveItemFromHash);
<\/script>

<svelte:window on:hashchange={updateActiveItemFromHash}/>

<HeaderNav 
  serviceName={ex1ServiceName}
  homeHref={ex1HomeHref}
  navigationItems={ex1NavigationItems}
  activeItemHref={ex1ActiveItemHref}
  bind:isMobileNavOpen={ex1IsMobileNavOpen}
  onToggle={ex1ToggleMobileNav}
/>

<div class="py-2">
  <p>Current activeItemHref (from URL hash): {ex1ActiveItemHref}</p>
  <p>isMobileNavOpen: {ex1IsMobileNavOpen}</p>

</div>

{#if ex1IsMobileNavOpen}
  <div style="padding: 1rem; background-color: #f0f0f0; border-top: 1px solid #ccc;" class="mt-2">
    <p>Mobile navigation menu would appear here.</p>
    <ul>
      {#each ex1NavigationItems as item}
        <li><a href={item.href}>{item.text}</a></li>
      {/each}
    </ul>
  </div>
{/if}
`;var Ce=b('<li><a class="text-blue-600 hover:underline"> </a></li>'),Se=b('<div class="p-4 bg-gray-100 mt-2"><p class="font-semibold mb-2">Mobile Menu (Simulated)</p> <ul></ul></div>'),Te=b(`<div class="p-5 bg-white border border-neutral-300"><p class="govuk-body">To test the mobile menu, please reduce your screen width to below a
      typical mobile breakpoint.</p> <p class="mb-2 text-sm text-gray-600">Current active link (driven by ex1ActiveItemHref/URL Hash): <strong class="text-orange-600"> </strong></p> <!> <!></div> <!>`,1),Pe=b('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ee=b('<span slot="header" class="text-lg"> </span>'),je=b('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function $e(N,A){Z(A,!0);let k=[{id:"1",heading:"1. Basic HeaderNav Example with Hash-Driven Active State",content:H=>{var f=Te(),d=q(f),_=o(l(d),2),I=o(l(_)),w=l(I,!0);r(I),r(_);var i=o(_,2);oe(i,{serviceName:j,homeHref:D,get navigationItems(){return c},get activeItemHref(){return e($)},onToggle:L,get isMobileNavOpen(){return e(n)},set isMobileNavOpen(y){u(n,y,!0)}});var B=o(i,2);{var a=y=>{var T=Se(),U=o(l(T),2);Q(U,21,()=>c,X,(z,F)=>{var P=Ce(),W=l(P),t=l(W,!0);r(W),r(P),G(()=>{Ie(W,"href",e(F).href),K(t,e(F).text)}),v(z,P)}),r(U),r(T),v(y,T)};re(B,y=>{e(n)&&y(a)})}r(d);var O=o(d,2);Me(O,{get code(){return ke},language:"svelte"}),G(()=>K(w,e($))),v(H,f)}}],j="My Application",D="#/",c=[{text:"Home",href:"#/home"},{text:"Features",href:"#/features"},{text:"Pricing",href:"#/pricing"},{text:"Contact",href:"#/contact"}],$=E("#/home"),n=E(!1);function L(){u(n,!e(n))}function m(){const H=window.location.hash,f=c.find(d=>H.startsWith(d.href));u($,f?f.href:"#/home",!0),u(n,!1)}Y(m);var C=je();ae("hashchange",te,m);var S=o(l(C),2);we(S,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(H,f)=>{var d=de(),_=q(d);Q(_,17,()=>k,X,(I,w)=>{Oe(I,{children:(i,B)=>{var a=Pe(),O=l(a);_e(O,()=>e(w).content),r(a),v(i,a)},$$slots:{default:!0,header:(i,B)=>{var a=Ee(),O=l(a,!0);r(a),G(()=>K(O,e(w).heading)),v(i,a)}}})}),v(H,d)},$$slots:{default:!0}}),r(C),v(N,C),ee()}const ne=(N,A=V,R=V,k=V,j=V)=>{ve(N,{get name(){return A()},get folder(){return R()},get subFolder(){return k()},get homepage(){return j()},get statusObject(){return Be},parentFolder:"components-update"})},ie=(N,A=V)=>{be(N,{get homepage(){return A()},get detailsArray(){return Ve},get connectedComponentsArray(){return Re}})};let Be={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Fe=["The <code>HeaderNav</code> component displays the main service navigation header.","It includes the service name, a set of primary navigation links, and a toggle button for mobile navigation.","This component is essentially the same as the <code>Service Navigation</code> component, but allows you too plugin your own mobile nav link flyout panel and monitor the current section. Both of these features are useful when used in conjunction with the MobileNav and SideNav components to synchronise the expanded state and use more advanced navigation patterns / layouts."],We=["This component is typically used at the top of every page within a service to provide consistent branding and primary navigation.","It adapts responsively for different screen sizes, with the navigation links collapsing into a mobile menu on smaller screens."],Ve=[{label:"Description",arr:Fe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:We,visibleOnHomepage:!1,markdown:!0}],Re=[];var De=b('<div class="p-4 bg-gray-100">Mobile Menu Area (Simulated)</div>'),Le=b(`<p class="govuk-body">To test the mobile menu, please reduce your screen width to below a typical
    mobile breakpoint.</p> <div><!> <!></div>`,1),Ue=b('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function ze(N,A){Z(A,!0);const R=t=>{var p=Le(),h=o(q(p),2),g=l(h);oe(g,pe(()=>e(B),{homeHref:$,get activeItemHref(){return e(n)},set activeItemHref(M){u(n,M,!0)},get isMobileNavOpen(){return e(c)},set isMobileNavOpen(M){u(c,M,!0)}}));var x=o(g,2);{var se=M=>{var le=De();v(M,le)};re(x,M=>{e(c)&&M(se)})}r(h),v(t,p)};let k=Ae.url.pathname.split("/"),j=He(k[k.length-1]),D=E(J(ue.md)),c=E(!1),$="/",n=E(J(window.location.hash));function L(){u(n,window.location.hash||e(m).find(t=>t.name==="navigationItems").value[0].href,!0)}Y(L);let m=s(()=>ye([{name:"serviceName",category:"Content & Appearance",value:"Svelte Component Library",description:{markdown:!0,arr:["The name of the service or application, displayed in the header."]}},{name:"navigationItems",category:"Content & Appearance",value:[{text:"Home",href:"#home"},{text:"Components",href:"#components"},{text:"Patterns",href:"#patterns"},{text:"Community",href:"#community"}],description:{markdown:!0,arr:["An array of navigation item objects to display.","Each object should have <code>text</code> (string) and <code>href</code> (string) properties.","The active item is controlled by the <code>activeItemHref</code> prop."]}},{name:"homeHref",category:"Navigation",value:"/",description:{markdown:!0,arr:["The URL that the service name/logo links to."]}},{name:"activeItemHref",category:"Navigation",isBinded:!0,value:e(n),description:{markdown:!0,arr:["The href of the currently active top-level navigation item."]}},{name:"isMobileNavOpen",category:"Menu State",isBinded:!0,value:!1,description:{markdown:!0,arr:["A boolean state that controls the visibility of the mobile navigation menu.","Set to <code>true</code> to show the mobile menu, <code>false</code> to hide it.","This prop is typically bound using <code>bind:isMobileNavOpen</code>."]}},{name:"onToggle",category:"Event Handlers",propType:"fixed",isRequired:!0,value(){u(c,!e(c)),window.alert(`The onToggle function has been triggered. Mobile nav is now ${e(c)?"open":"closed"}. Open the Stateful & Bindable and Event Handlers panels to see the updated isMobileNavOpen and onToggle function values.`),this.functionElements.counter+=1},functionElements:{counter:0,functionAsString:`function () {
  // This function is called when the mobile menu toggle button is clicked.
  // It should handle the logic to open or close the mobile navigation.
  // For example, by updating a reactive state variable:
  // isMobileNavOpen = !isMobileNavOpen;
  alert("Mobile navigation toggled!");
}`},description:{markdown:!0,arr:["An event handler function that is called when the mobile navigation toggle button is clicked.","It should contain the logic to show or hide the mobile navigation menu."]}}])),C=function(t,p,h){return t.map(g=>{let x=h[g.name]??g.value;return g.isEditable===p&&x!=null?typeof x=="object"?JSON.stringify(x,null,2):x:null})},S=E(J(C(e(m),!0,{}))),H=s(()=>({})),f=s(()=>C(e(m),!1,e(H))),d=s(()=>xe(e(m),e(S))),_=s(()=>Ne(e(m),e(S),e(f))),I=s(()=>me(e(_),2)),w=s(()=>e(I)[0]),i=s(()=>e(I)[1]),B=s(()=>(()=>{const{mobileNavIsOpen:t,currentSection:p,...h}=e(w);return h})()),a=J({});ce(()=>{e(i).forEach(t=>{a[t]=!0}),Object.keys(a).forEach(t=>{e(i).includes(t)||(a[t]=!1)})});let O=s(()=>Object.fromEntries(Object.entries(e(w)).map(([t,p])=>{var h,g;return[t,typeof p=="function"?(g=(h=e(m).find(x=>x.name===t))==null?void 0:h.functionElements)==null?void 0:g.functionAsString:p]})));var y=Ue();ae("hashchange",te,L);var T=q(y);const U=s(()=>({component:{WrapperInformation:ie,WrapperNameAndStatus:ne},name:j}));fe(T,{get wrapper(){return e(U)},homepage:!1});var z=o(T,2);he(z,{get parametersParsingErrorsArray(){return e(i)},get parametersParsingErrorsObject(){return a},onCloseFunction:t=>e(i).filter(p=>p!=t)});var F=o(z,2);ge(F,{get Component(){return R},get parametersSourceArray(){return e(m)},get derivedParametersValuesArray(){return e(f)},get parametersVisibleArray(){return e(d)},get parametersParsingErrorsObject(){return a},get copyParametersToClipboardObject(){return e(O)},get demoScreenWidth(){return e(D)},set demoScreenWidth(t){u(D,t,!0)},get statedParametersValuesArray(){return e(S)},set statedParametersValuesArray(t){u(S,t,!0)}});var P=o(F,2),W=l(P);$e(W,{}),r(P),v(N,y),ee()}const mt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:ie,WrapperNameAndStatus:ne,default:ze},Symbol.toStringTag,{value:"Module"}));export{mt as _};
