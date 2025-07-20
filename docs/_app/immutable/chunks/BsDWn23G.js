import"./CWj6FrbW.js";import{p as K,f as R,s as A,a as L,c as N,r as w,I as P,F as e,t as z,J as h,C as B,ab as F,u as oe,G as v,ac as re}from"./DAeYpASc.js";import{f as H,c as ne,a as g}from"./BAP9DKun.js";import{i as X}from"./BRrZqxBe.js";import{s as ie}from"./CDnlRnBP.js";import{B as se,d as ce}from"./FLOBqqeq.js";import{W as le,P as de,C as pe,B as fe,a as ve,t as ue,c as me}from"./D9YvIc1u.js";import{p as he}from"./CMjediXt.js";import{k as ge}from"./DLSzT-Iv.js";import{M as Y}from"./CusBf2rB.js";import{d as be,s as G}from"./oN6NPT6s.js";import{s as ye}from"./5CLvz9iT.js";import{e as Se,i as xe}from"./DtT6GxuX.js";import{A as Ne,a as we}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{C as Ae}from"./ip80KjXp.js";const He=`
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
`;function _e(b,f){h(f,!e(f))}var ke=H('<p class="text-center text-gray-500 italic p-4">MobileNav is closed. Click the button above to open.</p>'),Oe=H(`<div class="p-5 bg-white border border-neutral-300 relative"><p class="govuk-body mb-4">This example shows how to control the <code>MobileNav</code> component's visibility
      using an external button. Click the button below to toggle the navigation panel.
      The panel is styled to appear even on desktop for this demo.</p> <button class="govuk-button mb-4"> </button> <div class="demo-mobile-nav-container relative min-h-[300px] border border-dashed border-gray-400 bg-gray-50 p-2 svelte-1ow9ruc"><!></div></div> <!>`,1),Ce=H('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Pe=H('<span slot="header" class="text-lg"> </span>'),Ee=H('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Te(b,f){K(f,!0);const D=m=>{var r=Oe(),n=R(r),l=A(N(n),2);l.__click=[_e,u];var I=N(l);w(l);var k=A(l,2),y=N(k);{var O=S=>{Y(S,{get isOpen(){return e(u)},get sections(){return E},get activeSectionHref(){return e(M)},get activeDetailHref(){return e(_)},onNavigate:T})},o=S=>{var W=ke();g(S,W)};X(y,S=>{e(u)?S(O):S(o,!1)})}w(k),w(n);var d=A(n,2);Ae(d,{get code(){return He},language:"svelte"}),z(()=>G(I,`${e(u)?"Close":"Open"} Mobile Menu`)),g(m,r)};let u=P(!1);const E=[{title:"Dashboard",href:"#/dashboard",items:[{text:"Overview",href:"#/dashboard/overview"},{text:"Analytics",href:"#/dashboard/analytics"}]},{title:"Settings",href:"#/settings",items:[{text:"Profile",href:"#/settings/profile"},{text:"Account",href:"#/settings/account"},{title:"Preferences",items:[{text:"Notifications",href:"#/settings/preferences/notifications"},{text:"Theme",href:"#/settings/preferences/theme"}]}]},{title:"Help",href:"#/help",items:[{text:"FAQ",href:"#/help/faq"},{text:"Support",href:"#/help/support"}]}];let M=P("#/dashboard"),_=P("#/dashboard/overview");function T(m,r){r&&typeof r.preventDefault=="function"&&r.preventDefault(),alert(`Example 1: Navigating to ${m}. Default navigation prevented.`);const n=E.find(l=>m.startsWith(l.href||"@@@no-href@@@"));n&&n.href&&h(M,n.href,!0),h(_,m,!0)}let j=[{id:"1",heading:"1. MobileNav with External Toggle Button",content:D}];var c=Ee(),V=A(N(c),2);Ne(V,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(m,r)=>{var n=ne(),l=R(n);Se(l,17,()=>j,xe,(I,k)=>{we(I,{children:(y,O)=>{var o=Ce(),d=N(o);ye(d,()=>e(k).content),w(o),g(y,o)},$$slots:{default:!0,header:(y,O)=>{var o=Pe(),d=N(o,!0);w(o),z(()=>G(d,e(k).heading)),g(y,o)}}})}),g(m,n)},$$slots:{default:!0}}),w(c),g(b,c),L()}be(["click"]);const Z=(b,f=B,D=B,u=B,E=B)=>{se(b,{get name(){return f()},get folder(){return D()},get subFolder(){return u()},get homepage(){return E()},get statusObject(){return De},parentFolder:"components-update"})},ee=(b,f=B)=>{fe(b,{get homepage(){return f()},get detailsArray(){return Ie},get connectedComponentsArray(){return $e}})};let De={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Me=["The <code>MobileNav</code> component provides a mobile-specific navigation panel.","It typically appears as a fly-out or full-screen menu, triggered by a toggle button in a primary header (like <code>HeaderNav</code>).","It displays a structured list of navigation sections and items, allowing users to navigate the application on smaller screens.","This component is often managed by the <code>ServiceNavigationNestedMobile</code> component, which coordinates its state and interactions with <code>HeaderNav</code>."],je=["This component is used in responsive web designs to offer a compact and accessible navigation solution for mobile users.","It works in conjunction with a main header component that handles its visibility (e.g., <code>HeaderNav</code>'s mobile menu toggle), often orchestrated by <code>ServiceNavigationNestedMobile</code>.","The structure of the navigation links (<code>sections</code> prop) can be tailored to match the application's information architecture and should usually match the nav items in <code>SideNav</code>."],Ie=[{label:"Description",arr:Me,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:je,visibleOnHomepage:!1,markdown:!0}],$e=[{label:"Orchestrating Parent",arr:[{name:"ServiceNavigationNestedMobile",folder:"layout/service-navigation-nested-mobile"}]},{label:"Sibling Component (Controls Visibility)",arr:[{name:"HeaderNav",folder:"layout/service-navigation-nested-mobile"}]},{label:"Related Component (Part of Navigation Pattern)",arr:[{name:"SideNav",folder:"layout/service-navigation-nested-mobile"}]}];var Be=H(`<p class="p-4 text-gray-500 italic">MobileNav is currently closed (<code>isOpen</code> is false). Toggle it via
        the prop in the "State & Behavior" panel to see it.</p>`),Ve=H(`<p class="govuk-body p-4">This demo attempts to keep the navigation panel visible even on wider
    screens for easier inspection. In a real application, <code>MobileNav</code> would typically only appear on mobile viewports due
    to its internal styling, and its <code>isOpen</code> state would be
    controlled by a component like <code>HeaderNav</code>.</p> <div class="border border-neutral-300 min-h-[400px] bg-gray-50 demo-mobile-nav-container svelte-lf2kjm"><!></div>`,1),We=H('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Fe(b,f){K(f,!0);const D=t=>{var a=Ve(),i=A(R(a),2),s=N(i);{var p=x=>{Y(x,ie(()=>e(O),{get activeSectionHref(){return e(_)},set activeSectionHref($){h(_,$,!0)},get activeDetailHref(){return e(T)},set activeDetailHref($){h(T,$,!0)}}))},C=x=>{var $=Be();g(x,$)};X(s,x=>{e(O).isOpen?x(p):x(C,!1)})}w(i),g(t,a)};let u=he.url.pathname.split("/"),E=ge(u[u.length-1]),M=P(F(ce.sm)),_=P("#components"),T=P("/components/layout/service-navigation-nested-mobile/mobile-nav"),j=F({counter:0,dataset:{lastHref:null},functionAsString:`function (href, event) {
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
}`}),c=v(()=>ve([{name:"isOpen",category:"State & Behavior",value:!0,description:{markdown:!0,arr:["Controls the visibility of the mobile navigation panel. Set to <code>true</code> to show, <code>false</code> to hide.","This prop is typically controlled by a parent component (e.g., a toggle button in <code>HeaderNav</code>).","When <code>false</code>, the navigation panel is hidden from view and <code>aria-hidden</code> is set to true."]}},{name:"sections",category:"Content & Structure",rows:20,value:[{title:"Home",href:"#home",items:[{text:"Overview",href:"/#home-overview-wrapper"}]},{title:"Components",href:"#components",items:[{title:"Layout",items:[{text:"HeaderNav",href:"/components/layout/service-navigation-nested-mobile/header-nav"},{text:"MobileNav",href:"/components/layout/service-navigation-nested-mobile/mobile-nav"},{text:"SideNav",href:"/components/layout/service-navigation-nested-mobile/side-nav"}]},{text:"Button",href:"/components/ui/button"}]},{title:"Patterns",href:"/#patterns-wrapper",items:[{text:"Forms",href:"/patterns/forms"},{text:"Tables",href:"/patterns/tables"}]},{title:"Community",href:"/#community-wrapper",items:[{text:"Updates",href:"/community/updates"},{text:"Contributing",href:"/community/contributing"}]}],description:{markdown:!0,arr:["An array of <code>NavSection</code> objects that define the structure and content of the mobile navigation.","Each section object has a <code>title</code>, optional <code>href</code> (for the section header link), and an <code>items</code> array.","The <code>items</code> array can contain <code>SubNavItem</code> objects (with <code>text</code> and <code>href</code>) or group objects (with <code>title</code> and an <code>items</code> array of <code>SubNavItem</code>).","The active state of sections and items is determined by <code>activeSectionHref</code> and <code>activeDetailHref</code> props, not by a <code>current</code> property.","Use hash-based hrefs (e.g. <code>#some-id</code>) for in-page navigation or demo purposes."]}},{name:"activeSectionHref",category:"State & Behavior",isBinded:!0,value:e(_),description:{markdown:!0,arr:["The <code>href</code> of the currently active main section (e.g., a top-level category like <code>'/components'</code> or <code>'#components'</code>).","This highlights the active section header and determines which section is initially expanded if the user hasn't toggled any section.","Should match the <code>href</code> of one of the <code>NavSection</code> objects in the <code>sections</code> array.","If the user toggles a section, that explicit state takes precedence over this prop for expansion."]}},{name:"activeDetailHref",category:"State & Behavior",isBinded:!0,value:e(T),description:{markdown:!0,arr:["The <code>href</code> of the currently active navigation item (e.g., a link to a specific page or component).","This highlights the specific active link within an expanded section.","Should match the <code>href</code> of a <code>SubNavItem</code> within the <code>sections</code> array.","This prop is used for visual highlighting only; navigation is handled by the <code>onNavigate</code> event handler."]}},{name:"onNavigate",category:"Event Handlers",propType:"fixed",isRequired:!0,value(t,a){window.alert("The onNavigate function has been triggered. Open the 'Event Handlers' panel to see updated values."),a&&typeof a.preventDefault=="function"&&a.preventDefault(),j.counter+=1,j.dataset.lastHref=t,h(T,t,!0);try{const s=JSON.parse(m("sections")).find(p=>p.items?p.items.some(C=>"items"in C&&Array.isArray(C.items)?C.items.some(x=>x.href===t):"href"in C?C.href===t:!1):!1);s&&s.href&&h(_,s.href,!0)}catch(i){console.error("Error finding parent section:",i)}},functionElements:j,description:{markdown:!0,arr:["Event handler called when a navigation link (<code>SubNavItem</code>) is clicked in the mobile menu.","Receives the <code>href</code> of the clicked item and the original <code>MouseEvent</code> as arguments.","By default, updates <code>activeDetailHref</code> to the clicked item's href, and finds and updates <code>activeSectionHref</code> to the parent section's href.","In a real app, this handler would handle actual navigation to another location (e.g., using SvelteKit's <code>goto</code>) and may close the mobile menu.","If <code>event.preventDefault()</code> is called, default browser navigation is prevented.","The demo implementation also increments a counter and tracks the last href for demonstration purposes."]}}])),V=function(t,a,i){return t.map(s=>{let p=i[s.name]??s.value;return s.isEditable===a&&p!=null?typeof p=="object"?JSON.stringify(p,null,2):p:null})},m=function(t){var a;return e(r)[(a=e(c))==null?void 0:a.findIndex(i=>i.name===t)]},r=P(F(V(e(c),!0,{}))),n=v(()=>({})),l=v(()=>V(e(c),!1,e(n))),I=v(()=>ue(e(c),e(r))),k=v(()=>me(e(c),e(r),e(l))),y=v(()=>re(e(k),2)),O=v(()=>e(y)[0]),o=v(()=>e(y)[1]),d=F({});oe(()=>{e(o).forEach(t=>{d[t]=!0}),Object.keys(d).forEach(t=>{e(o).includes(t)||(d[t]=!1)})});let S=v(()=>Object.fromEntries(Object.entries(e(O)).map(([t,a])=>{var i,s;return[t,typeof a=="function"?(s=(i=e(c).find(p=>p.name===t))==null?void 0:i.functionElements)==null?void 0:s.functionAsString:a]})));var W=We(),J=R(W);const te=v(()=>({component:{WrapperInformation:ee,WrapperNameAndStatus:Z},name:E}));le(J,{get wrapper(){return e(te)},homepage:!1});var U=A(J,2);de(U,{get parametersParsingErrorsArray(){return e(o)},get parametersParsingErrorsObject(){return d},onCloseFunction:t=>e(o).filter(a=>a!=t)});var q=A(U,2);pe(q,{get Component(){return D},get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(l)},get parametersVisibleArray(){return e(I)},get parametersParsingErrorsObject(){return d},get copyParametersToClipboardObject(){return e(S)},get demoScreenWidth(){return e(M)},set demoScreenWidth(t){h(M,t,!0)},get statedParametersValuesArray(){return e(r)},set statedParametersValuesArray(t){h(r,t,!0)}});var Q=A(q,2),ae=N(Q);Te(ae,{}),w(Q),g(b,W),L()}const rt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:ee,WrapperNameAndStatus:Z,default:Fe},Symbol.toStringTag,{value:"Module"}));export{rt as _};
