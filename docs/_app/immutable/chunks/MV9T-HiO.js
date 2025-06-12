import"./CWj6FrbW.js";import{p as N,f as j,s as w,a as F,c as x,r as _,t as K,z as e,D as P,G as D,a9 as O,y as p,u as R,I as W}from"./BQOcVDnD.js";import{t as A,c as z,a as g,s as J}from"./Dp3jeoTR.js";import{s as M}from"./Bx8udYmP.js";import{B as q,d as Q}from"./Nx-tZlcz.js";import{W as X,P as Y,C as Z,B as ee,a as te,t as re,c as ae}from"./CRKOA_km.js";import{p as oe}from"./CGlWXs0K.js";import{k as ne}from"./lMwbQCpd.js";import{B as se}from"./BB-JieOF.js";import"./69_IOA4Y.js";import{e as ie,i as le}from"./hy64cfae.js";import{s as pe}from"./ByC2DMpr.js";import{i as ce}from"./B_4Nsh1l.js";import{A as de,a as me}from"./BMGPJADw.js";import{C as ue}from"./B8qjdm4g.js";const fe=`
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
></Template>`,ge=s=>{var a=be(),i=j(a),o=x(i);Template(o,{componentNameProp:"Example 1",checkboxProp:!0,dropdownProp:"Dragonfruit",jsObjectProp:[{name:"Borussia Dortmund",country:"Germany",color:"#fdff7d"},{name:"Liverpool FC",country:"UK",color:"#f59fad"},{name:"SSC Napoli",country:"Italy",color:"#69bfff"},{name:"S.L. Benfica",country:"Portugal",color:"#ff8c96"}],functionProp(){window.alert("Example 1 functionProp has been triggered.")}}),_(i);var r=w(i,2);ue(r,{get code(){return fe},language:"svelte"}),g(s,a)};var be=A('<div class="p-5 bg-white"><!></div> <!>',1),ve=A('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),he=A('<span slot="header" class="text-lg"> </span>'),ye=A('<div class="my-20 p-2"><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pe(s,a){N(a,!1);let i=[{id:"1",heading:"1. Example 1 - describe the use case here",content:ge}];ce();var o=ye(),r=w(x(o),2);de(r,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"",children:(k,c)=>{var b=z(),d=j(b);ie(d,1,()=>i,le,(E,v)=>{me(E,{children:(h,C)=>{var n=ve(),l=x(n);pe(l,()=>e(v).content),_(n),g(h,n)},$$slots:{default:!0,header:(h,C)=>{var n=he(),l=x(n,!0);_(n),K(()=>J(l,e(v).heading)),g(h,n)}}})}),g(k,b)},$$slots:{default:!0}}),_(o),g(s,o),F()}const H=(s,a=P,i=P,o=P,r=P)=>{q(s,{get name(){return a()},get folder(){return i()},get subFolder(){return o()},get homepage(){return r()},statusObject:we,parentFolder:"components-update"})},U=(s,a=P)=>{ee(s,{get homepage(){return a()},detailsArray:Ae,connectedComponentsArray:ke})};let we={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},xe=["Enables the user to carry out some action by clicking on it, e.g. Sign in or Save and continue",'Based on the <a href="https://design-system.service.gov.uk/components/button/" target="_blank" rel="noopener noreferrer">GOV.UK Design System button component</a> pattern.'],_e=["The text in the button should accurately describe the action, e.g. 'Accept and claim a tax refund'","It will often be a stand alone component on a webpage. It normally won't have a parent component. It will never have a child component.","Use a default button for the main call to action on a page. Avoid using multiple default buttons on a single page. Having more than one main call to action reduces their impact, and makes it harder for users to know what to do next."],Ae=[{label:"Description",arr:xe,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:_e,visibleOnHomepage:!1,markdown:!0}],ke=[];var Ce=A('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Se(s,a){N(a,!0);const i=t=>{se(t,M(()=>e(n)))};let o=oe.url.pathname.split("/"),r=ne(o[o.length-1]),k=D(O(Q.md)),c=p(()=>te([{name:"componentNameProp",category:"Input props",propType:"fixed",value:r},{name:"textContent",category:"Input props",value:"Click me",description:{markdown:!0,arr:[`This is the text that you want to appear on the <code>${r}</code>.`]},rows:2},{name:"buttonType",category:"Input props",options:["default","secondary","start","warning","dark background","disabled","table header"],description:{markdown:!0,arr:[`This is the type of <code>${r}</code> you want.`]},rows:5},{name:"onClickFunction",category:"Input props",value(){window.alert("The button function has been triggered.")},functionElements:{functionAsString:`function () {
          window.alert('The button function has been triggered.');
        }`},description:{markdown:!0,arr:[`This prop passes a function to the <code>${r}</code> component that is executed when the button is clicked`]},rows:5}])),b=function(t,m,S){return t.map(u=>{let f=S[u.name]??u.value;return u.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},d=D(O(b(e(c),!0,{}))),E=p(()=>({})),v=p(()=>b(e(c),!1,e(E))),h=p(()=>re(e(c),e(d))),C=p(()=>ae(e(c),e(d),e(v))),n=p(()=>e(C)[0]),l=p(()=>e(C)[1]),y=O({});R(()=>{e(l).forEach(t=>{y[t]=!0}),Object.keys(y).forEach(t=>{e(l).includes(t)||(y[t]=!1)})});let G=p(()=>Object.fromEntries(Object.entries(e(n)).map(([t,m])=>{var S,u;return[t,typeof m=="function"?(u=(S=e(c).find(f=>f.name===t))==null?void 0:S.functionElements)==null?void 0:u.functionAsString:m]})));var T=Ce(),I=j(T);X(I,{wrapper:{component:{WrapperInformation:U,WrapperNameAndStatus:H},name:r},homepage:!1});var $=w(I,2);Y($,{get parametersParsingErrorsArray(){return e(l)},get parametersParsingErrorsObject(){return y},onCloseFunction:t=>e(l).filter(m=>m!=t)});var B=w($,2);Z(B,{Component:i,get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(v)},get parametersVisibleArray(){return e(h)},get parametersParsingErrorsObject(){return y},get copyParametersToClipboardObject(){return e(G)},get demoScreenWidth(){return e(k)},set demoScreenWidth(t){W(k,t,!0)},get statedParametersValuesArray(){return e(d)},set statedParametersValuesArray(t){W(d,t,!0)}});var V=w(B,2),L=x(V);Pe(L,{}),_(V),g(s,T),F()}const Le=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:U,WrapperNameAndStatus:H,default:Se},Symbol.toStringTag,{value:"Module"}));export{Le as _};
