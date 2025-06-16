import"./CWj6FrbW.js";import{p as G,G as E,f as R,s as H,a as K,c as w,r as A,x as e,t as z,I as h,D as B,a9 as F,z as N,u as te}from"./DRw07N7P.js";import{t as k,c as ae,a as g,f as oe,s as Q}from"./Bdkmpx2T.js";import{i as L}from"./DIhpdVoS.js";import{s as re}from"./CGhnogCl.js";import{B as ie,d as ne}from"./9it77uvG.js";import{W as se,P as ce,C as le,B as de,a as pe,t as fe,c as ve}from"./Dn9fgiDY.js";import{p as me}from"./BtLeNZqs.js";import{k as ue}from"./lMwbQCpd.js";import{M as X}from"./CB0Aavfy.js";import{e as he,i as ge}from"./Dsl0KG63.js";import{s as be}from"./dbxAgBfZ.js";import{A as ye,a as Se}from"./DwkqSf20.js";import"./69_IOA4Y.js";import{C as xe}from"./B5yEtBhb.js";const Ne=`
<script lang="ts">
  import MobileNav from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";
  // Import NavSection and SubNavItem types if you need to define 'sections' data elsewhere
  // import type { NavSection, SubNavItem } from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";

  let isOpen = $state(false);
  const sections = [
    {
      title: "Dashboard",
      href: "#/dashboard",
      items: [
        { text: "Overview", href: "#/dashboard/overview" },
        { text: "Analytics", href: "#/dashboard/analytics" },
      ],
    },
    {
      title: "Settings",
      href: "#/settings",
      items: [
        { text: "Profile", href: "#/settings/profile" },
        { text: "Account", href: "#/settings/account" },
        {
          title: "Preferences", // Nested group
          items: [
            { text: "Notifications", href: "#/settings/preferences/notifications" },
            { text: "Theme", href: "#/settings/preferences/theme" },
          ]
        }
      ],
    },
    {
      title: "Help",
      href: "#/help",
      items: [
        { text: "FAQ", href: "#/help/faq" },
        { text: "Support", href: "#/help/support" },
      ],
    },
  ];
  let activeSectionHref = $state("#/dashboard");
  let activeDetailHref = $state("#/dashboard/overview");

  function toggleMobileNav() {
    isOpen = !isOpen;
  }

  function handleNavigate(href: string, event?: MouseEvent) { // Make event optional
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    alert("Navigating to: " + href + ". Default navigation prevented.");
    // Update active states for the example upon navigation
    activeDetailHref = href;
    const newActiveSection = sections.find(section => href.startsWith(section.href || '@@@no-href@@@'));
    if (newActiveSection && newActiveSection.href) {
        activeSectionHref = newActiveSection.href;
    }
    // Potentially close nav: isOpen = false;
    // Potentially navigate: goto(href);
  }
<\/script>

<button class="govuk-button" onclick={toggleMobileNav}>
  {isOpen ? "Close" : "Open"} Mobile Menu
</button>

{#if isOpen} 
  <div class="relative mt-2 border border-gray-300 p-2 min-h-[300px]">
    <MobileNav
      {isOpen} 
      {sections}
      {activeSectionHref}
      {activeDetailHref}
      {onNavigate}
    />
    <p class="text-xs text-gray-500 mt-2">Container for MobileNav (panel might be positioned absolutely)</p>
  </div>
{/if}
`;function we(b,p){h(p,!e(p))}var Ae=k('<p class="text-center text-gray-500 italic p-4">MobileNav is closed. Click the button above to open.</p>'),He=k(`<div class="p-5 bg-white border border-neutral-300 relative"><p class="govuk-body mb-4">This example shows how to control the <code>MobileNav</code> component's visibility
      using an external button. Click the button below to toggle the navigation panel.
      The panel is styled to appear even on desktop for this demo.</p> <button class="govuk-button mb-4"> </button> <div class="demo-mobile-nav-container relative min-h-[300px] border border-dashed border-gray-400 bg-gray-50 p-2 svelte-1ow9ruc"><!></div></div> <!>`,1),ke=k('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),_e=k('<span slot="header" class="text-lg"> </span>'),Oe=k('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pe(b,p){G(p,!0);const D=v=>{var r=He(),i=R(r),l=H(w(i),2);l.__click=[we,f];var j=w(l);A(l);var y=H(l,2),m=w(y);{var S=u=>{X(u,{get isOpen(){return e(f)},sections:T,get activeSectionHref(){return e(M)},get activeDetailHref(){return e(_)},onNavigate:C})},o=u=>{var W=Ae();g(u,W)};L(m,u=>{e(f)?u(S):u(o,!1)})}A(y),A(i);var O=H(i,2);xe(O,{get code(){return Ne},language:"svelte"}),z(()=>Q(j,`${(e(f)?"Close":"Open")??""} Mobile Menu`)),g(v,r)};let f=E(!1);const T=[{title:"Dashboard",href:"#/dashboard",items:[{text:"Overview",href:"#/dashboard/overview"},{text:"Analytics",href:"#/dashboard/analytics"}]},{title:"Settings",href:"#/settings",items:[{text:"Profile",href:"#/settings/profile"},{text:"Account",href:"#/settings/account"},{title:"Preferences",items:[{text:"Notifications",href:"#/settings/preferences/notifications"},{text:"Theme",href:"#/settings/preferences/theme"}]}]},{title:"Help",href:"#/help",items:[{text:"FAQ",href:"#/help/faq"},{text:"Support",href:"#/help/support"}]}];let M=E("#/dashboard"),_=E("#/dashboard/overview");function C(v,r){r&&typeof r.preventDefault=="function"&&r.preventDefault(),alert(`Example 1: Navigating to ${v}. Default navigation prevented.`);const i=T.find(l=>v.startsWith(l.href||"@@@no-href@@@"));i&&i.href&&h(M,i.href,!0),h(_,v,!0)}let I=[{id:"1",heading:"1. MobileNav with External Toggle Button",content:D}];var c=Oe(),V=H(w(c),2);ye(V,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(v,r)=>{var i=ae(),l=R(i);he(l,17,()=>I,ge,(j,y)=>{Se(j,{children:(m,S)=>{var o=ke(),O=w(o);be(O,()=>e(y).content),A(o),g(m,o)},$$slots:{default:!0,header:(m,S)=>{var o=_e(),O=w(o,!0);A(o),z(()=>Q(O,e(y).heading)),g(m,o)}}})}),g(v,i)},$$slots:{default:!0}}),A(c),g(b,c),K()}oe(["click"]);const Y=(b,p=B,D=B,f=B,T=B)=>{ie(b,{get name(){return p()},get folder(){return D()},get subFolder(){return f()},get homepage(){return T()},statusObject:Ee,parentFolder:"components-update"})},Z=(b,p=B)=>{de(b,{get homepage(){return p()},detailsArray:De,connectedComponentsArray:Me})};let Ee={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Te=["The <code>MobileNav</code> component provides a mobile-specific navigation panel.","It typically appears as a fly-out or full-screen menu, triggered by a toggle button in a primary header (like <code>HeaderNav</code>).","It displays a structured list of navigation sections and items, allowing users to navigate the application on smaller screens.","This component is often managed by the <code>ServiceNavigationNestedMobile</code> component, which coordinates its state and interactions with <code>HeaderNav</code>."],Ce=["This component is used in responsive web designs to offer a compact and accessible navigation solution for mobile users.","It works in conjunction with a main header component that handles its visibility (e.g., <code>HeaderNav</code>'s mobile menu toggle), often orchestrated by <code>ServiceNavigationNestedMobile</code>.","The structure of the navigation links (<code>sections</code> prop) can be tailored to match the application's information architecture and should usually match the nav items in <code>SideNav</code>."],De=[{label:"Description",arr:Te,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ce,visibleOnHomepage:!1,markdown:!0}],Me=[{label:"Orchestrating Parent",arr:[{name:"ServiceNavigationNestedMobile",folder:"layout/service-navigation-nested-mobile"}]},{label:"Sibling Component (Controls Visibility)",arr:[{name:"HeaderNav",folder:"layout/service-navigation-nested-mobile"}]},{label:"Related Component (Part of Navigation Pattern)",arr:[{name:"SideNav",folder:"layout/service-navigation-nested-mobile"}]}];var Ie=k(`<p class="p-4 text-gray-500 italic">MobileNav is currently closed (<code>isOpen</code> is false). Toggle it via
        the prop in the "State & Behavior" panel to see it.</p>`),je=k(`<p class="govuk-body p-4">This demo attempts to keep the navigation panel visible even on wider
    screens for easier inspection. In a real application, <code>MobileNav</code> would typically only appear on mobile viewports due
    to its internal styling, and its <code>isOpen</code> state would be
    controlled by a component like <code>HeaderNav</code>.</p> <div class="border border-neutral-300 min-h-[400px] bg-gray-50 demo-mobile-nav-container svelte-lf2kjm"><!></div>`,1),$e=k('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Be(b,p){G(p,!0);const D=t=>{var a=je(),n=H(R(a),2),s=w(n);{var d=x=>{X(x,re(()=>e(m),{get activeSectionHref(){return e(_)},set activeSectionHref($){h(_,$,!0)},get activeDetailHref(){return e(C)},set activeDetailHref($){h(C,$,!0)}}))},P=x=>{var $=Ie();g(x,$)};L(s,x=>{e(m).isOpen?x(d):x(P,!1)})}A(n),g(t,a)};let f=me.url.pathname.split("/"),T=ue(f[f.length-1]),M=E(F(ne.sm)),_=E("#components"),C=E("/components/layout/service-navigation-nested-mobile/mobile-nav"),I=F({counter:0,dataset:{lastHref:null},functionAsString:`function (href, event) {
  window.alert(
    'The onNavigate function has been triggered. Open the 'Event Handlers' panel to see updated values.'
  );
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  this.functionElements.counter += 1;
  this.functionElements.dataset.lastHref = href;
  activeDetailHref = href;
  try {
    const currentSections = JSON.parse(getValue('sections'));
    const parentSection = currentSections.find(section => {
      if (!section.items) return false;
      return section.items.some(item => {
        if ('items' in item && Array.isArray(item.items)) {
          return item.items.some(subItem => subItem.href === href);
        } else if ('href' in item) {
          return item.href === href;
        }
        return false;
      });
    });
    if (parentSection && parentSection.href) {
      activeSectionHref = parentSection.href;
    }
  } catch (e) {
    console.error('Error finding parent section:', e);
  }
}`}),c=N(()=>pe([{name:"isOpen",category:"State & Behavior",value:!0,description:{markdown:!0,arr:["Controls the visibility of the mobile navigation panel. Set to <code>true</code> to show, <code>false</code> to hide.","This prop is typically controlled by a parent component (e.g., a toggle button in <code>HeaderNav</code>).","When <code>false</code>, the navigation panel is hidden from view and <code>aria-hidden</code> is set to true."]}},{name:"sections",category:"Content & Structure",rows:20,value:[{title:"Home",href:"#home",items:[{text:"Overview",href:"/#home-overview-wrapper"}]},{title:"Components",href:"#components",items:[{title:"Layout",items:[{text:"HeaderNav",href:"/components/layout/service-navigation-nested-mobile/header-nav"},{text:"MobileNav",href:"/components/layout/service-navigation-nested-mobile/mobile-nav"},{text:"SideNav",href:"/components/layout/service-navigation-nested-mobile/side-nav"}]},{text:"Button",href:"/components/ui/button"}]},{title:"Patterns",href:"/#patterns-wrapper",items:[{text:"Forms",href:"/patterns/forms"},{text:"Tables",href:"/patterns/tables"}]},{title:"Community",href:"/#community-wrapper",items:[{text:"Updates",href:"/community/updates"},{text:"Contributing",href:"/community/contributing"}]}],description:{markdown:!0,arr:["An array of <code>NavSection</code> objects that define the structure and content of the mobile navigation.","Each section object has a <code>title</code>, optional <code>href</code> (for the section header link), and an <code>items</code> array.","The <code>items</code> array can contain <code>SubNavItem</code> objects (with <code>text</code> and <code>href</code>) or group objects (with <code>title</code> and an <code>items</code> array of <code>SubNavItem</code>).","The active state of sections and items is determined by <code>activeSectionHref</code> and <code>activeDetailHref</code> props, not by a <code>current</code> property.","Use hash-based hrefs (e.g. <code>#some-id</code>) for in-page navigation or demo purposes."]}},{name:"activeSectionHref",category:"State & Behavior",isBinded:!0,value:e(_),description:{markdown:!0,arr:["The <code>href</code> of the currently active main section (e.g., a top-level category like <code>'/components'</code> or <code>'#components'</code>).","This highlights the active section header and determines which section is initially expanded if the user hasn't toggled any section.","Should match the <code>href</code> of one of the <code>NavSection</code> objects in the <code>sections</code> array.","If the user toggles a section, that explicit state takes precedence over this prop for expansion."]}},{name:"activeDetailHref",category:"State & Behavior",isBinded:!0,value:e(C),description:{markdown:!0,arr:["The <code>href</code> of the currently active navigation item (e.g., a link to a specific page or component).","This highlights the specific active link within an expanded section.","Should match the <code>href</code> of a <code>SubNavItem</code> within the <code>sections</code> array.","This prop is used for visual highlighting only; navigation is handled by the <code>onNavigate</code> event handler."]}},{name:"onNavigate",category:"Event Handlers",propType:"fixed",isRequired:!0,value(t,a){window.alert("The onNavigate function has been triggered. Open the 'Event Handlers' panel to see updated values."),a&&typeof a.preventDefault=="function"&&a.preventDefault(),I.counter+=1,I.dataset.lastHref=t,h(C,t,!0);try{const s=JSON.parse(v("sections")).find(d=>d.items?d.items.some(P=>"items"in P&&Array.isArray(P.items)?P.items.some(x=>x.href===t):"href"in P?P.href===t:!1):!1);s&&s.href&&h(_,s.href,!0)}catch(n){console.error("Error finding parent section:",n)}},functionElements:I,description:{markdown:!0,arr:["Event handler called when a navigation link (<code>SubNavItem</code>) is clicked in the mobile menu.","Receives the <code>href</code> of the clicked item and the original <code>MouseEvent</code> as arguments.","By default, updates <code>activeDetailHref</code> to the clicked item's href, and finds and updates <code>activeSectionHref</code> to the parent section's href.","In a real app, this handler would handle actual navigation to another location (e.g., using SvelteKit's <code>goto</code>) and may close the mobile menu.","If <code>event.preventDefault()</code> is called, default browser navigation is prevented.","The demo implementation also increments a counter and tracks the last href for demonstration purposes."]}}])),V=function(t,a,n){return t.map(s=>{let d=n[s.name]??s.value;return s.isEditable===a&&d!=null?typeof d=="object"?JSON.stringify(d,null,2):d:null})},v=function(t){var a;return e(r)[(a=e(c))==null?void 0:a.findIndex(n=>n.name===t)]},r=E(F(V(e(c),!0,{}))),i=N(()=>({})),l=N(()=>V(e(c),!1,e(i))),j=N(()=>fe(e(c),e(r))),y=N(()=>ve(e(c),e(r),e(l))),m=N(()=>e(y)[0]),S=N(()=>e(y)[1]),o=F({});te(()=>{e(S).forEach(t=>{o[t]=!0}),Object.keys(o).forEach(t=>{e(S).includes(t)||(o[t]=!1)})});let O=N(()=>Object.fromEntries(Object.entries(e(m)).map(([t,a])=>{var n,s;return[t,typeof a=="function"?(s=(n=e(c).find(d=>d.name===t))==null?void 0:n.functionElements)==null?void 0:s.functionAsString:a]})));var u=$e(),W=R(u);se(W,{wrapper:{component:{WrapperInformation:Z,WrapperNameAndStatus:Y},name:T},homepage:!1});var U=H(W,2);ce(U,{get parametersParsingErrorsArray(){return e(S)},get parametersParsingErrorsObject(){return o},onCloseFunction:t=>e(S).filter(a=>a!=t)});var q=H(U,2);le(q,{Component:D,get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(l)},get parametersVisibleArray(){return e(j)},get parametersParsingErrorsObject(){return o},get copyParametersToClipboardObject(){return e(O)},get demoScreenWidth(){return e(M)},set demoScreenWidth(t){h(M,t,!0)},get statedParametersValuesArray(){return e(r)},set statedParametersValuesArray(t){h(r,t,!0)}});var J=H(q,2),ee=w(J);Pe(ee,{}),A(J),g(b,u),K()}const et=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Z,WrapperNameAndStatus:Y,default:Be},Symbol.toStringTag,{value:"Module"}));export{et as _};
