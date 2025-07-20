import"./CWj6FrbW.js";import{p as F,f as T,s as w,a as H,c as x,r as _,t as J,F as e,C as P,I as D,ab as E,u as z,J as N,G as s,ac as M}from"./DAeYpASc.js";import{f as A,c as q,a as g}from"./BAP9DKun.js";import{s as Q}from"./CDnlRnBP.js";import{B as X,d as Y}from"./FLOBqqeq.js";import{W as Z,P as ee,C as te,B as re,a as ae,t as oe,c as ne}from"./D9YvIc1u.js";import{p as se}from"./CMjediXt.js";import{k as ie}from"./DLSzT-Iv.js";import{B as pe}from"./XE8Cmq_2.js";import"./69_IOA4Y.js";import{s as le}from"./oN6NPT6s.js";import{s as ce}from"./5CLvz9iT.js";import{e as de,i as me}from"./DtT6GxuX.js";import{i as ue}from"./DFpCoyn2.js";import{A as fe,a as ge}from"./D7Z_5HJW.js";import{C as be}from"./ip80KjXp.js";const ve=`
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
></Template>`,he=i=>{var a=ye(),p=T(a),o=x(p);Template(o,{componentNameProp:"Example 1",checkboxProp:!0,dropdownProp:"Dragonfruit",jsObjectProp:[{name:"Borussia Dortmund",country:"Germany",color:"#fdff7d"},{name:"Liverpool FC",country:"UK",color:"#f59fad"},{name:"SSC Napoli",country:"Italy",color:"#69bfff"},{name:"S.L. Benfica",country:"Portugal",color:"#ff8c96"}],functionProp(){window.alert("Example 1 functionProp has been triggered.")}}),_(p);var r=w(p,2);be(r,{get code(){return ve},language:"svelte"}),g(i,a)};var ye=A('<div class="p-5 bg-white"><!></div> <!>',1),Pe=A('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),we=A('<span slot="header" class="text-lg"> </span>'),xe=A('<div class="my-20 p-2"><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function _e(i,a){F(a,!1);let p=[{id:"1",heading:"1. Example 1 - describe the use case here",content:he}];ue();var o=xe(),r=w(x(o),2);fe(r,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"",children:(C,l)=>{var b=q(),c=T(b);de(c,1,()=>p,me,(O,v)=>{ge(O,{children:(h,j)=>{var n=Pe(),d=x(n);ce(d,()=>e(v).content),_(n),g(h,n)},$$slots:{default:!0,header:(h,j)=>{var n=we(),d=x(n,!0);_(n),J(()=>le(d,e(v).heading)),g(h,n)}}})}),g(C,b)},$$slots:{default:!0}}),_(o),g(i,o),H()}const U=(i,a=P,p=P,o=P,r=P)=>{X(i,{get name(){return a()},get folder(){return p()},get subFolder(){return o()},get homepage(){return r()},get statusObject(){return Ae},parentFolder:"components-update"})},G=(i,a=P)=>{re(i,{get homepage(){return a()},get detailsArray(){return Se},get connectedComponentsArray(){return Oe}})};let Ae={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ce=["Enables the user to carry out some action by clicking on it, e.g. Sign in or Save and continue",'Based on the <a href="https://design-system.service.gov.uk/components/button/" target="_blank" rel="noopener noreferrer">GOV.UK Design System button component</a> pattern.'],ke=["The text in the button should accurately describe the action, e.g. 'Accept and claim a tax refund'","It will often be a stand alone component on a webpage. It normally won't have a parent component. It will never have a child component.","Use a default button for the main call to action on a page. Avoid using multiple default buttons on a single page. Having more than one main call to action reduces their impact, and makes it harder for users to know what to do next."],Se=[{label:"Description",arr:Ce,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:ke,visibleOnHomepage:!1,markdown:!0}],Oe=[];var je=A('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ee(i,a){F(a,!0);const p=t=>{pe(t,Q(()=>e(d)))};let o=se.url.pathname.split("/"),r=ie(o[o.length-1]),C=D(E(Y.md)),l=s(()=>ae([{name:"componentNameProp",category:"Input props",propType:"fixed",value:r},{name:"textContent",category:"Input props",value:"Click me",description:{markdown:!0,arr:[`This is the text that you want to appear on the <code>${r}</code>.`]},rows:2},{name:"buttonType",category:"Input props",options:["default","secondary","start","warning","dark background","disabled","table header"],description:{markdown:!0,arr:[`This is the type of <code>${r}</code> you want.`]},rows:5},{name:"onClickFunction",category:"Input props",value(){window.alert("The button function has been triggered.")},functionElements:{functionAsString:`function () {
          window.alert('The button function has been triggered.');
        }`},description:{markdown:!0,arr:[`This prop passes a function to the <code>${r}</code> component that is executed when the button is clicked`]},rows:5}])),b=function(t,m,S){return t.map(u=>{let f=S[u.name]??u.value;return u.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},c=D(E(b(e(l),!0,{}))),O=s(()=>({})),v=s(()=>b(e(l),!1,e(O))),h=s(()=>oe(e(l),e(c))),j=s(()=>ne(e(l),e(c),e(v))),n=s(()=>M(e(j),2)),d=s(()=>e(n)[0]),k=s(()=>e(n)[1]),y=E({});z(()=>{e(k).forEach(t=>{y[t]=!0}),Object.keys(y).forEach(t=>{e(k).includes(t)||(y[t]=!1)})});let L=s(()=>Object.fromEntries(Object.entries(e(d)).map(([t,m])=>{var S,u;return[t,typeof m=="function"?(u=(S=e(l).find(f=>f.name===t))==null?void 0:S.functionElements)==null?void 0:u.functionAsString:m]})));var $=je(),I=T($);const K=s(()=>({component:{WrapperInformation:G,WrapperNameAndStatus:U},name:r}));Z(I,{get wrapper(){return e(K)},homepage:!1});var B=w(I,2);ee(B,{get parametersParsingErrorsArray(){return e(k)},get parametersParsingErrorsObject(){return y},onCloseFunction:t=>e(k).filter(m=>m!=t)});var V=w(B,2);te(V,{get Component(){return p},get parametersSourceArray(){return e(l)},get derivedParametersValuesArray(){return e(v)},get parametersVisibleArray(){return e(h)},get parametersParsingErrorsObject(){return y},get copyParametersToClipboardObject(){return e(L)},get demoScreenWidth(){return e(C)},set demoScreenWidth(t){N(C,t,!0)},get statedParametersValuesArray(){return e(c)},set statedParametersValuesArray(t){N(c,t,!0)}});var W=w(V,2),R=x(W);_e(R,{}),_(W),g(i,$),H()}const ze=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:G,WrapperNameAndStatus:U,default:Ee},Symbol.toStringTag,{value:"Module"}));export{ze as _};
