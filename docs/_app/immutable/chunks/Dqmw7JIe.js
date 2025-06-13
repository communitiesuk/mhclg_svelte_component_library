import"./CWj6FrbW.js";import{p as Q,G as E,f as z,s as o,a as X,av as Y,c as l,r,I as v,z as e,t as q,D as F,a9 as U,y as b,u as se}from"./BQOcVDnD.js";import{t as y,g as Z,c as le,a as p,s as G}from"./Dp3jeoTR.js";import{i as ee}from"./w59L6Jp2.js";import{s as ce}from"./Bx8udYmP.js";import{o as te}from"./wh8Qo9IY.js";import{B as me,d as de}from"./kqoadxQb.js";import{W as pe,P as ve,C as ue,B as fe,a as he,t as ge,c as be}from"./JWqNqQUs.js";import{p as ye}from"./D5heuD2C.js";import{k as xe}from"./lMwbQCpd.js";import{H as ae}from"./CUnG0y3I.js";import{e as J,i as K}from"./hy64cfae.js";import{s as Ne}from"./ByC2DMpr.js";import{s as He}from"./CM6Y-JJe.js";import{A as Ae,a as Ie}from"./JE6QcVhM.js";import"./69_IOA4Y.js";import{C as _e}from"./B8qjdm4g.js";const we=`
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
`;var Oe=y('<li><a class="text-blue-600 hover:underline"> </a></li>'),Me=y('<div class="p-4 bg-gray-100 mt-2"><p class="font-semibold mb-2">Mobile Menu (Simulated)</p> <ul></ul></div>'),ke=y(`<div class="p-5 bg-white border border-neutral-300"><p class="govuk-body">To test the mobile menu, please reduce your screen width to below a
      typical mobile breakpoint.</p> <p class="mb-2 text-sm text-gray-600">Current active link (driven by ex1ActiveItemHref/URL Hash): <strong class="text-orange-600"> </strong></p> <!> <!></div> <!>`,1),Se=y('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Te=y('<span slot="header" class="text-lg"> </span>'),Ce=y('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pe(_,w){Q(w,!0);let S=[{id:"1",heading:"1. Basic HeaderNav Example with Hash-Driven Active State",content:O=>{var u=ke(),d=z(u),x=o(l(d),2),M=o(l(x)),f=l(M,!0);r(M),r(x);var N=o(x,2);ae(N,{serviceName:j,homeHref:V,navigationItems:c,get activeItemHref(){return e($)},onToggle:R,get isMobileNavOpen(){return e(n)},set isMobileNavOpen(A){v(n,A,!0)}});var h=o(N,2);{var i=A=>{var P=Me(),B=o(l(P),2);J(B,21,()=>c,K,(D,L)=>{var t=Oe(),a=l(t),s=l(a,!0);r(a),r(t),q(()=>{He(a,"href",e(L).href),G(s,e(L).text)}),p(D,t)}),r(B),r(P),p(A,P)};ee(h,A=>{e(n)&&A(i)})}r(d);var H=o(d,2);_e(H,{get code(){return we},language:"svelte"}),q(()=>G(f,e($))),p(O,u)}}],j="My Application",V="#/",c=[{text:"Home",href:"#/home"},{text:"Features",href:"#/features"},{text:"Pricing",href:"#/pricing"},{text:"Contact",href:"#/contact"}],$=E("#/home"),n=E(!1);function R(){v(n,!e(n))}function m(){const O=window.location.hash,u=c.find(d=>O.startsWith(d.href));v($,u?u.href:"#/home",!0),v(n,!1)}te(m);var T=Ce();Z("hashchange",Y,m);var C=o(l(T),2);Ae(C,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(O,u)=>{var d=le(),x=z(d);J(x,17,()=>S,K,(M,f)=>{Ie(M,{children:(N,h)=>{var i=Se(),H=l(i);Ne(H,()=>e(f).content),r(i),p(N,i)},$$slots:{default:!0,header:(N,h)=>{var i=Te(),H=l(i,!0);r(i),q(()=>G(H,e(f).heading)),p(N,i)}}})}),p(O,d)},$$slots:{default:!0}}),r(T),p(_,T),X()}const re=(_,w=F,W=F,S=F,j=F)=>{me(_,{get name(){return w()},get folder(){return W()},get subFolder(){return S()},get homepage(){return j()},statusObject:Ee,parentFolder:"components-update"})},oe=(_,w=F)=>{fe(_,{get homepage(){return w()},detailsArray:Be,connectedComponentsArray:Fe})};let Ee={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},je=["The <code>HeaderNav</code> component displays the main service navigation header.","It includes the service name, a set of primary navigation links, and a toggle button for mobile navigation.","This component is essentially the same as the <code>Service Navigation</code> component, but allows you too plugin your own mobile nav link flyout panel and monitor the current section. Both of these features are useful when used in conjunction with the MobileNav and SideNav components to synchronise the expanded state and use more advanced navigation patterns / layouts."],$e=["This component is typically used at the top of every page within a service to provide consistent branding and primary navigation.","It adapts responsively for different screen sizes, with the navigation links collapsing into a mobile menu on smaller screens."],Be=[{label:"Description",arr:je,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:$e,visibleOnHomepage:!1,markdown:!0}],Fe=[];var We=y('<div class="p-4 bg-gray-100">Mobile Menu Area (Simulated)</div>'),Ve=y(`<p class="govuk-body">To test the mobile menu, please reduce your screen width to below a typical
    mobile breakpoint.</p> <div><!> <!></div>`,1),Re=y('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function De(_,w){Q(w,!0);const W=t=>{var a=Ve(),s=o(z(a),2),g=l(s);ae(g,ce(()=>e(N),{get homeHref(){return $},get activeItemHref(){return e(n)},set activeItemHref(k){v(n,k,!0)},get isMobileNavOpen(){return e(c)},set isMobileNavOpen(k){v(c,k,!0)}}));var I=o(g,2);{var ne=k=>{var ie=We();p(k,ie)};ee(I,k=>{e(c)&&k(ne)})}r(s),p(t,a)};let S=ye.url.pathname.split("/"),j=xe(S[S.length-1]),V=E(U(de.md)),c=E(!1),$="/",n=E(U(window.location.hash));function R(){v(n,window.location.hash||e(m).find(t=>t.name==="navigationItems").value[0].href,!0)}te(R);let m=b(()=>he([{name:"serviceName",category:"Content & Appearance",value:"Svelte Component Library",description:{markdown:!0,arr:["The name of the service or application, displayed in the header."]}},{name:"navigationItems",category:"Content & Appearance",value:[{text:"Home",href:"#home"},{text:"Components",href:"#components"},{text:"Patterns",href:"#patterns"},{text:"Community",href:"#community"}],description:{markdown:!0,arr:["An array of navigation item objects to display.","Each object should have <code>text</code> (string) and <code>href</code> (string) properties.","The active item is controlled by the <code>activeItemHref</code> prop."]}},{name:"homeHref",category:"Navigation",value:"/",description:{markdown:!0,arr:["The URL that the service name/logo links to."]}},{name:"activeItemHref",category:"Navigation",isBinded:!0,value:e(n),description:{markdown:!0,arr:["The href of the currently active top-level navigation item."]}},{name:"isMobileNavOpen",category:"Menu State",isBinded:!0,value:!1,description:{markdown:!0,arr:["A boolean state that controls the visibility of the mobile navigation menu.","Set to <code>true</code> to show the mobile menu, <code>false</code> to hide it.","This prop is typically bound using <code>bind:isMobileNavOpen</code>."]}},{name:"onToggle",category:"Event Handlers",propType:"fixed",isRequired:!0,value(){v(c,!e(c)),window.alert(`The onToggle function has been triggered. Mobile nav is now ${e(c)?"open":"closed"}. Open the Stateful & Bindable and Event Handlers panels to see the updated isMobileNavOpen and onToggle function values.`),this.functionElements.counter+=1},functionElements:{counter:0,functionAsString:`function () {
  // This function is called when the mobile menu toggle button is clicked.
  // It should handle the logic to open or close the mobile navigation.
  // For example, by updating a reactive state variable:
  // isMobileNavOpen = !isMobileNavOpen;
  alert("Mobile navigation toggled!");
}`},description:{markdown:!0,arr:["An event handler function that is called when the mobile navigation toggle button is clicked.","It should contain the logic to show or hide the mobile navigation menu."]}}])),T=function(t,a,s){return t.map(g=>{let I=s[g.name]??g.value;return g.isEditable===a&&I!=null?typeof I=="object"?JSON.stringify(I,null,2):I:null})},C=E(U(T(e(m),!0,{}))),O=b(()=>({})),u=b(()=>T(e(m),!1,e(O))),d=b(()=>ge(e(m),e(C))),x=b(()=>be(e(m),e(C),e(u))),M=b(()=>e(x)[0]),f=b(()=>e(x)[1]),N=b(()=>(()=>{const{mobileNavIsOpen:t,currentSection:a,...s}=e(M);return s})()),h=U({});se(()=>{e(f).forEach(t=>{h[t]=!0}),Object.keys(h).forEach(t=>{e(f).includes(t)||(h[t]=!1)})});let i=b(()=>Object.fromEntries(Object.entries(e(M)).map(([t,a])=>{var s,g;return[t,typeof a=="function"?(g=(s=e(m).find(I=>I.name===t))==null?void 0:s.functionElements)==null?void 0:g.functionAsString:a]})));var H=Re();Z("hashchange",Y,R);var A=z(H);pe(A,{wrapper:{component:{WrapperInformation:oe,WrapperNameAndStatus:re},name:j},homepage:!1});var P=o(A,2);ve(P,{get parametersParsingErrorsArray(){return e(f)},get parametersParsingErrorsObject(){return h},onCloseFunction:t=>e(f).filter(a=>a!=t)});var B=o(P,2);ue(B,{Component:W,get parametersSourceArray(){return e(m)},get derivedParametersValuesArray(){return e(u)},get parametersVisibleArray(){return e(d)},get parametersParsingErrorsObject(){return h},get copyParametersToClipboardObject(){return e(i)},get demoScreenWidth(){return e(V)},set demoScreenWidth(t){v(V,t,!0)},get statedParametersValuesArray(){return e(C)},set statedParametersValuesArray(t){v(C,t,!0)}});var D=o(B,2),L=l(D);Pe(L,{}),r(D),p(_,H),X()}const it=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:oe,WrapperNameAndStatus:re,default:De},Symbol.toStringTag,{value:"Module"}));export{it as _};
