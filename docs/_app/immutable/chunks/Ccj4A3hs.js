import"./CWj6FrbW.js";import{p as F,f as T,s as w,a as H,c as x,r as _,t as J,y as e,D as P,I as W,ab as E,u as z,J as N,G as s,ac as M}from"./I52qY7cu.js";import{f as A,c as q,a as g}from"./BBh-6AA0.js";import{s as Q}from"./BHp14Q1u.js";import{B as X,d as Y}from"./DIhqKctk.js";import{W as Z,P as ee,C as te,B as re,a as ae,t as oe,c as ne}from"./DfXfdoaB.js";import{p as se}from"./B46OMWYY.js";import{k as ie}from"./lMwbQCpd.js";import{B as pe}from"./mri3FSx-.js";import"./69_IOA4Y.js";import{s as le}from"./5F35P8og.js";import{s as ce}from"./BvNl7SXi.js";import{e as de,i as me}from"./n63ZiD1W.js";import{i as ue}from"./MVh4sFtc.js";import{A as fe,a as ge}from"./232r4Ubb.js";import{C as be}from"./BN7FUiX4.js";const ve=`
<script>

  import Template from "$lib/package-wrapping/Template.svelte";

<\/script>

<Template
checkboxProp={true}
dropdownProp="Dragonfruit"
jsObjectProp={[
  {
    name: "Borussia Dortmund",
    country: "Germany",
    color: "#fdff7d",
  },
  { name: "Liverpool FC", country: "UK", color: "#f59fad" },
  {
    name: "SSC Napoli",
    country: "Italy",
    color: "#69bfff",
  },
  {
    name: "S.L. Benfica",
    country: "Portugal",
    color: "#ff8c96",
  },
]}
functionProp={function (event, pokemon) {
  window.alert("Example 1 functionProp has been triggered.");
}}
></Template>`,he=i=>{var a=ye(),p=T(a),o=x(p);Template(o,{componentNameProp:"Example 1",checkboxProp:!0,dropdownProp:"Dragonfruit",jsObjectProp:[{name:"Borussia Dortmund",country:"Germany",color:"#fdff7d"},{name:"Liverpool FC",country:"UK",color:"#f59fad"},{name:"SSC Napoli",country:"Italy",color:"#69bfff"},{name:"S.L. Benfica",country:"Portugal",color:"#ff8c96"}],functionProp(){window.alert("Example 1 functionProp has been triggered.")}}),_(p);var r=w(p,2);be(r,{get code(){return ve},language:"svelte"}),g(i,a)};var ye=A('<div class="p-5 bg-white"><!></div> <!>',1),Pe=A('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),we=A('<span slot="header" class="text-lg"> </span>'),xe=A('<div class="my-20 p-2"><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function _e(i,a){F(a,!1);let p=[{id:"1",heading:"1. Example 1 - describe the use case here",content:he}];ue();var o=xe(),r=w(x(o),2);fe(r,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"",children:(k,l)=>{var b=q(),c=T(b);de(c,1,()=>p,me,(O,v)=>{ge(O,{children:(h,j)=>{var n=Pe(),d=x(n);ce(d,()=>e(v).content),_(n),g(h,n)},$$slots:{default:!0,header:(h,j)=>{var n=we(),d=x(n,!0);_(n),J(()=>le(d,e(v).heading)),g(h,n)}}})}),g(k,b)},$$slots:{default:!0}}),_(o),g(i,o),H()}const U=(i,a=P,p=P,o=P,r=P)=>{X(i,{get name(){return a()},get folder(){return p()},get subFolder(){return o()},get homepage(){return r()},get statusObject(){return Ae},parentFolder:"components-update"})},G=(i,a=P)=>{re(i,{get homepage(){return a()},get detailsArray(){return Se},get connectedComponentsArray(){return Oe}})};let Ae={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},ke=["Enables the user to carry out some action by clicking on it, e.g. Sign in or Save and continue",'Based on the <a href="https://design-system.service.gov.uk/components/button/" target="_blank" rel="noopener noreferrer">GOV.UK Design System button component</a> pattern.'],Ce=["The text in the button should accurately describe the action, e.g. 'Accept and claim a tax refund'","It will often be a stand alone component on a webpage. It normally won't have a parent component. It will never have a child component.","Use a default button for the main call to action on a page. Avoid using multiple default buttons on a single page. Having more than one main call to action reduces their impact, and makes it harder for users to know what to do next."],Se=[{label:"Description",arr:ke,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ce,visibleOnHomepage:!1,markdown:!0}],Oe=[];var je=A('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ee(i,a){F(a,!0);const p=t=>{pe(t,Q(()=>e(d)))};let o=se.url.pathname.split("/"),r=ie(o[o.length-1]),k=W(E(Y.md)),l=s(()=>ae([{name:"componentNameProp",category:"Input props",propType:"fixed",value:r},{name:"textContent",category:"Input props",value:"Click me",description:{markdown:!0,arr:[`This is the text that you want to appear on the <code>${r}</code>.`]},rows:2},{name:"buttonType",category:"Input props",options:["default","secondary","start","warning","dark background","disabled","table header"],description:{markdown:!0,arr:[`This is the type of <code>${r}</code> you want.`]},rows:5},{name:"onClickFunction",category:"Input props",value(){window.alert("The button function has been triggered.")},functionElements:{functionAsString:`function () {
          window.alert('The button function has been triggered.');
        }`},description:{markdown:!0,arr:[`This prop passes a function to the <code>${r}</code> component that is executed when the button is clicked`]},rows:5}])),b=function(t,m,S){return t.map(u=>{let f=S[u.name]??u.value;return u.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},c=W(E(b(e(l),!0,{}))),O=s(()=>({})),v=s(()=>b(e(l),!1,e(O))),h=s(()=>oe(e(l),e(c))),j=s(()=>ne(e(l),e(c),e(v))),n=s(()=>M(e(j),2)),d=s(()=>e(n)[0]),C=s(()=>e(n)[1]),y=E({});z(()=>{e(C).forEach(t=>{y[t]=!0}),Object.keys(y).forEach(t=>{e(C).includes(t)||(y[t]=!1)})});let L=s(()=>Object.fromEntries(Object.entries(e(d)).map(([t,m])=>{var S,u;return[t,typeof m=="function"?(u=(S=e(l).find(f=>f.name===t))==null?void 0:S.functionElements)==null?void 0:u.functionAsString:m]})));var $=je(),I=T($);const K=s(()=>({component:{WrapperInformation:G,WrapperNameAndStatus:U},name:r}));Z(I,{get wrapper(){return e(K)},homepage:!1});var B=w(I,2);ee(B,{get parametersParsingErrorsArray(){return e(C)},get parametersParsingErrorsObject(){return y},onCloseFunction:t=>e(C).filter(m=>m!=t)});var V=w(B,2);te(V,{get Component(){return p},get parametersSourceArray(){return e(l)},get derivedParametersValuesArray(){return e(v)},get parametersVisibleArray(){return e(h)},get parametersParsingErrorsObject(){return y},get copyParametersToClipboardObject(){return e(L)},get demoScreenWidth(){return e(k)},set demoScreenWidth(t){N(k,t,!0)},get statedParametersValuesArray(){return e(c)},set statedParametersValuesArray(t){N(c,t,!0)}});var D=w(V,2),R=x(D);_e(R,{}),_(D),g(i,$),H()}const ze=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:G,WrapperNameAndStatus:U,default:Ee},Symbol.toStringTag,{value:"Module"}));export{ze as _};
