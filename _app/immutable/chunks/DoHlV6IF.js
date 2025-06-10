import"./CWj6FrbW.js";import{p as N,f as j,s as w,a as F,c as x,r as _,t as K,G as e,B as P,D,a9 as O,F as l,u as R,I as W}from"./Cp2qfsB-.js";import{t as A,c as z,a as g}from"./R2PrfaHS.js";import{s as J}from"./ClzGr448.js";import{B as M,d as q}from"./BaIcpsm5.js";import{W as Q,P as X,C as Y,B as Z,a as ee,t as te,c as re}from"./BBQ75O8h.js";import{p as ae}from"./C4bxO8ZZ.js";import{k as oe}from"./lMwbQCpd.js";import{B as ne}from"./D3VNqb4O.js";import"./69_IOA4Y.js";import{s as se}from"./Df23Nigv.js";import{e as ie,i as pe}from"./FoQIP_hg.js";import{s as le}from"./B2Z6IM-T.js";import{i as ce}from"./CFu0OaE2.js";import{A as de,a as me}from"./B7r1Y1cT.js";import{C as ue}from"./BywTUfDC.js";const fe=`
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
></Template>`,ge=s=>{var a=be(),i=j(a),o=x(i);Template(o,{componentNameProp:"Example 1",checkboxProp:!0,dropdownProp:"Dragonfruit",jsObjectProp:[{name:"Borussia Dortmund",country:"Germany",color:"#fdff7d"},{name:"Liverpool FC",country:"UK",color:"#f59fad"},{name:"SSC Napoli",country:"Italy",color:"#69bfff"},{name:"S.L. Benfica",country:"Portugal",color:"#ff8c96"}],functionProp(){window.alert("Example 1 functionProp has been triggered.")}}),_(i);var r=w(i,2);ue(r,{get code(){return fe},language:"svelte"}),g(s,a)};var be=A('<div class="p-5 bg-white"><!></div> <!>',1),ve=A('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),he=A('<span slot="header" class="text-lg"> </span>'),ye=A('<div class="my-20 p-2"><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pe(s,a){N(a,!1);let i=[{id:"1",heading:"1. Example 1 - describe the use case here",content:ge}];ce();var o=ye(),r=w(x(o),2);de(r,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"",children:(k,c)=>{var b=z(),d=j(b);ie(d,1,()=>i,pe,(E,v)=>{me(E,{children:(h,C)=>{var n=ve(),p=x(n);le(p,()=>e(v).content),_(n),g(h,n)},$$slots:{default:!0,header:(h,C)=>{var n=he(),p=x(n,!0);_(n),K(()=>se(p,e(v).heading)),g(h,n)}}})}),g(k,b)},$$slots:{default:!0}}),_(o),g(s,o),F()}const H=(s,a=P,i=P,o=P,r=P)=>{M(s,{get name(){return a()},get folder(){return i()},get subFolder(){return o()},get homepage(){return r()},statusObject:we,parentFolder:"components-update"})},U=(s,a=P)=>{Z(s,{get homepage(){return a()},detailsArray:Ae,connectedComponentsArray:ke})};let we={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},xe=["Enables the user to carry out some action by clicking on it, e.g. Sign in or Save and continue",'Based on the <a href="https://design-system.service.gov.uk/components/button/" target="_blank" rel="noopener noreferrer">GOV.UK Design System button component</a> pattern.'],_e=["The text in the button should accurately describe the action, e.g. 'Accept and claim a tax refund'","It will often be a stand alone component on a webpage. It normally won't have a parent component. It will never have a child component.","Use a default button for the main call to action on a page. Avoid using multiple default buttons on a single page. Having more than one main call to action reduces their impact, and makes it harder for users to know what to do next."],Ae=[{label:"Description",arr:xe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:_e,visibleOnHomepage:!1,markdown:!0}],ke=[];var Ce=A('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Se(s,a){N(a,!0);const i=t=>{ne(t,J(()=>e(n)))};let o=ae.url.pathname.split("/"),r=oe(o[o.length-1]),k=D(O(q.md)),c=l(()=>ee([{name:"componentNameProp",category:"Input props",propType:"fixed",value:r},{name:"textContent",category:"Input props",value:"Click me",description:{markdown:!0,arr:[`This is the text that you want to appear on the <code>${r}</code>.`]},rows:2},{name:"buttonType",category:"Input props",options:["default","secondary","start","warning","dark background","disabled","table header"],description:{markdown:!0,arr:[`This is the type of <code>${r}</code> you want.`]},rows:5},{name:"onClickFunction",category:"Input props",value(){window.alert("The button function has been triggered.")},functionElements:{functionAsString:`function () {
          window.alert('The button function has been triggered.');
        }`},description:{markdown:!0,arr:[`This prop passes a function to the <code>${r}</code> component that is executed when the button is clicked`]},rows:5}])),b=function(t,m,S){return t.map(u=>{let f=S[u.name]??u.value;return u.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},d=D(O(b(e(c),!0,{}))),E=l(()=>({})),v=l(()=>b(e(c),!1,e(E))),h=l(()=>te(e(c),e(d))),C=l(()=>re(e(c),e(d),e(v))),n=l(()=>e(C)[0]),p=l(()=>e(C)[1]),y=O({});R(()=>{e(p).forEach(t=>{y[t]=!0}),Object.keys(y).forEach(t=>{e(p).includes(t)||(y[t]=!1)})});let G=l(()=>Object.fromEntries(Object.entries(e(n)).map(([t,m])=>{var S,u;return[t,typeof m=="function"?(u=(S=e(c).find(f=>f.name===t))==null?void 0:S.functionElements)==null?void 0:u.functionAsString:m]})));var T=Ce(),I=j(T);Q(I,{wrapper:{component:{WrapperInformation:U,WrapperNameAndStatus:H},name:r},homepage:!1});var $=w(I,2);X($,{get parametersParsingErrorsArray(){return e(p)},get parametersParsingErrorsObject(){return y},onCloseFunction:t=>e(p).filter(m=>m!=t)});var B=w($,2);Y(B,{Component:i,get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(v)},get parametersVisibleArray(){return e(h)},get parametersParsingErrorsObject(){return y},get copyParametersToClipboardObject(){return e(G)},get demoScreenWidth(){return e(k)},set demoScreenWidth(t){W(k,t,!0)},get statedParametersValuesArray(){return e(d)},set statedParametersValuesArray(t){W(d,t,!0)}});var V=w(B,2),L=x(V);Pe(L,{}),_(V),g(s,T),F()}const Ke=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:U,WrapperNameAndStatus:H,default:Se},Symbol.toStringTag,{value:"Module"}));export{Ke as _};
