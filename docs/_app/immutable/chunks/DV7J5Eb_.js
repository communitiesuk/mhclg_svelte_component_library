import"./CWj6FrbW.js";import{p as F,f as k,s as O,a as H,c as b,r as h,t as K,F as e,C,I as W,ab as T,u as M,J as N,G as n,ac as z}from"./DAeYpASc.js";import{f as y,c as q,a as m}from"./BAP9DKun.js";import{s as Q}from"./CDnlRnBP.js";import{B as X,d as Y}from"./FLOBqqeq.js";import{W as Z,P as ee,C as re,B as ae,a as te,t as oe,c as se}from"./D9YvIc1u.js";import{p as ne}from"./CMjediXt.js";import{k as ie}from"./DLSzT-Iv.js";import{T as le}from"./CWT6Y9A_.js";import"./69_IOA4Y.js";import{s as pe}from"./oN6NPT6s.js";import{s as ce}from"./5CLvz9iT.js";import{e as me,i as de}from"./DtT6GxuX.js";import{i as ue}from"./DFpCoyn2.js";import{A as fe,a as ge}from"./D7Z_5HJW.js";import{C as ve}from"./ip80KjXp.js";import"./XE8Cmq_2.js";const be=`
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
></Template>`,he=i=>{var a=ye(),l=k(a),t=b(l);Template(t,{componentNameProp:"Example 1",checkboxProp:!0,dropdownProp:"Dragonfruit",jsObjectProp:[{name:"Borussia Dortmund",country:"Germany",color:"#fdff7d"},{name:"Liverpool FC",country:"UK",color:"#f59fad"},{name:"SSC Napoli",country:"Italy",color:"#69bfff"},{name:"S.L. Benfica",country:"Portugal",color:"#ff8c96"}],functionProp(){window.alert("Example 1 functionProp has been triggered.")}}),h(l);var p=O(l,2);ve(p,{get code(){return be},language:"svelte"}),m(i,a)};var ye=y('<div class="p-5 bg-white"><!></div> <!>',1),Pe=y('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),_e=y('<span slot="header" class="text-lg"> </span>'),xe=y('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ae(i,a){F(a,!1);let l=[{id:"1",heading:"1. Example 1 - describe the use case here",content:he}];ue();var t=xe(),p=O(b(t),2);fe(p,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(j,c)=>{var P=q(),d=k(P);me(d,1,()=>l,de,(w,_)=>{ge(w,{children:(x,S)=>{var o=Pe(),u=b(o);ce(u,()=>e(_).content),h(o),m(x,o)},$$slots:{default:!0,header:(x,S)=>{var o=_e(),u=b(o,!0);h(o),K(()=>pe(u,e(_).heading)),m(x,o)}}})}),m(j,P)},$$slots:{default:!0}}),h(t),m(i,t),H()}const L=(i,a=C,l=C,t=C,p=C)=>{X(i,{get name(){return a()},get folder(){return l()},get subFolder(){return t()},get homepage(){return p()},get statusObject(){return Ce},parentFolder:"components-update"})},G=(i,a=C)=>{ae(i,{get homepage(){return a()},get detailsArray(){return Ee},get connectedComponentsArray(){return we}})};let Ce={progress:"To be developed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Oe=["Explain here what the component does."],je=["Explain here the different contexts in which the component should be used."],Ee=[{label:"Description",arr:Oe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:je,visibleOnHomepage:!1,markdown:!0}],we=[];var Se=y("<div><!></div>"),Te=y('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function ke(i,a){F(a,!0);const l=r=>{var s=Se(),f=b(s);le(f,Q(()=>e(u))),h(s),m(r,s)};let t=ne.url.pathname.split("/"),p=ie(t[t.length-1]),j=W(T(Y.md)),c=n(()=>te([{name:"componentNameProp",category:"Input props",propType:"fixed",value:p},{name:"data",category:"Data",visible:!1,value:a.data.deprivationData},{name:"metaData",category:"Data",visible:!1,value:a.data.deprivationMetaData},{name:"caption",category:"Input props",value:"This is the table caption",description:{markdown:!0,arr:["This is the caption of the table. It sits above the table."]},rows:2},{name:"colourScale",category:"Input props",propType:"radio",options:["Off","On"],description:{markdown:!0,arr:["Turn the colour scale on if you want to more easily gauge the magnitude of the value relative to highest and lowest values of that metric."]}}])),P=function(r,s,f){return r.map(g=>{let v=f[g.name]??g.value;return g.isEditable===s&&v!=null?typeof v=="object"?JSON.stringify(v,null,2):v:null})},d=W(T(P(e(c),!0,{}))),w=n(()=>({})),_=n(()=>P(e(c),!1,e(w))),x=n(()=>oe(e(c),e(d))),S=n(()=>se(e(c),e(d),e(_))),o=n(()=>z(e(S),2)),u=n(()=>e(o)[0]),E=n(()=>e(o)[1]),A=T({});M(()=>{e(E).forEach(r=>{A[r]=!0}),Object.keys(A).forEach(r=>{e(E).includes(r)||(A[r]=!1)})});let R=n(()=>Object.fromEntries(Object.entries(e(u)).map(([r,s])=>{var f,g;return[r,typeof s=="function"?(g=(f=e(c).find(v=>v.name===r))==null?void 0:f.functionElements)==null?void 0:g.functionAsString:s]})));var I=Te(),D=k(I);const U=n(()=>({component:{WrapperInformation:G,WrapperNameAndStatus:L},name:p}));Z(D,{get wrapper(){return e(U)},homepage:!1});var $=O(D,2);ee($,{get parametersParsingErrorsArray(){return e(E)},get parametersParsingErrorsObject(){return A},onCloseFunction:r=>e(E).filter(s=>s!=r)});var B=O($,2);re(B,{get Component(){return l},get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(_)},get parametersVisibleArray(){return e(x)},get parametersParsingErrorsObject(){return A},get copyParametersToClipboardObject(){return e(R)},get demoScreenWidth(){return e(j)},set demoScreenWidth(r){N(j,r,!0)},get statedParametersValuesArray(){return e(d)},set statedParametersValuesArray(r){N(d,r,!0)}});var V=O(B,2),J=b(V);Ae(J,{}),h(V),m(i,I),H()}const qe=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:G,WrapperNameAndStatus:L,default:ke},Symbol.toStringTag,{value:"Module"}));export{qe as _};
