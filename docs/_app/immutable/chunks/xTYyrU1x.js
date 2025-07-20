import"./CWj6FrbW.js";import{p as z,f as y,s as d,a as Y,c as i,r as l,J as j,I as B,F as e,t as F,C as I,ab as W,u as Q,G as b,ac as X}from"./DAeYpASc.js";import{f as u,c as Z,a as p}from"./BAP9DKun.js";import{s as ee}from"./CDnlRnBP.js";import{B as te,d as ae}from"./FLOBqqeq.js";import{W as oe,P as ne,C as re,B as se,a as ie,t as le,c as de}from"./D9YvIc1u.js";import{p as pe}from"./CMjediXt.js";import{k as ce}from"./DLSzT-Iv.js";import{R as k}from"./CCtWB3O0.js";import{s as D}from"./oN6NPT6s.js";import{s as ue}from"./5CLvz9iT.js";import{e as me,i as ve}from"./DtT6GxuX.js";import{r as ge}from"./BYRFjNIU.js";import{a as fe}from"./CI1v4P9X.js";import{A as be,a as he}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{C as A}from"./ip80KjXp.js";const ye=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
<\/script>

<Radios
  legend="Select one option"
  name="basic-options"
  options={options}
/>`,_e=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "news", label: "Newsletter", hint: "Receive monthly updates" },
    { value: "updates", label: "Product Updates", hint: "New feature alerts" }
  ];
<\/script>

<Radios
  legend="Choose your subscriptions"
  hint="Please select one"
  name="subscriptions"
  options={options}
/>`,Pe=`<script lang="ts">
  import Radios from "$lib/components/ui/Radios.svelte";

  function validateSelection(value: string): string | undefined {
    if (!value) {
      return "Please select one option.";
    }
    return undefined;
  }

  const options = [
    { value: "agree", label: "I agree to the terms and conditions" },
    { value: "disagree", label: "I do not agree" }
  ];
<\/script>

<Radios
  legend="Terms and Conditions"
  name="terms"
  options={options}
  validate={validateSelection}
/>`,Ce=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "carrier-pigeon", label: "Carrier Pigeon" },
    { value: "postal-mail", label: "Postal Mail" },
    { value: "none", label: "I do not wish to receive updates", exclusive: true }
  ];
<\/script>

<Radios
  legend="Choose your method"
  name="method"
  options={options}
/>`,ke=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="email">Email</label>
            <input class="govuk-input" id="email" name="email" type="email">
          </div>
        \`
      }
    },
    {
      value: "sms",
      label: "SMS",
      conditional: {
        id: "sms-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="phone">Phone Number</label>
            <input class="govuk-input" id="phone" name="phone" type="tel">
          </div>
        \`
      }
    }
  ];
<\/script>

<Radios
  legend="Preferred Contact"
  name="preferred-contact"
  options={options}
/>`,xe=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];
<\/script>

<Radios
  legend="Have you changed your name?"
  hint="This includes changing your last name or spelling your name differently"
  name="changedName"
  options={options}
  inline={true}
  isPageHeading={true}
/>`,Oe=`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  let snippetSections = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-details",
        content: content1
      }
    },
    {
      value: "phone",
      label: "Phone",
      conditional: {
        id: "phone-details",
        content: content2
      }
    },
    {
      value: "preferences",
      label: "Communication Preferences",
      conditional: {
        id: "preferences-details",
        content: content3
      }
    }
  ];
<\/script>

<Radios
  legend="Contact Method"
  name="contact-method-snippets"
  options={snippetSections}
/>

{#snippet content1()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="email-input">Email Address</label>
    <div class="govuk-hint">We'll use this for important notifications</div>
    <input class="govuk-input" id="email-input" name="email-input" type="email">
  </div>
{/snippet}

{#snippet content2()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="phone-input">Phone Number</label>
    <div class="govuk-hint">Include country code if international</div>
    <input class="govuk-input" id="phone-input" name="phone-input" type="tel">
  </div>
{/snippet}

{#snippet content3()}
  <div class="govuk-form-group">
    <Radios
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(value) => !value ? "Please select a time slot" : undefined}
      options={[
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
        { value: "evening", label: "Evening (5pm - 8pm)" },
      ]}
    />
  </div>
{/snippet}`,Se=r=>{var a=Ve(),t=y(a),s=i(t);k(s,{legend:"Select one option",name:"basic-options",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}]}),l(t);var o=d(t,2);A(o,{get code(){return ye},language:"svelte"}),p(r,a)},Ee=r=>{var a=Ie(),t=y(a),s=i(t);k(s,{legend:"Choose your subscriptions",hint:"Please select one",name:"subscriptions",options:[{value:"news",label:"Newsletter",hint:"Receive monthly updates"},{value:"updates",label:"Product Updates",hint:"New feature alerts"}]}),l(t);var o=d(t,2);A(o,{get code(){return _e},language:"svelte"}),p(r,a)},Ae=r=>{var a=je(),t=y(a),s=i(t);k(s,{legend:"Terms and Conditions",name:"terms",options:[{value:"agree",label:"I agree to the terms and conditions"},{value:"disagree",label:"I do not agree"}],validate:_=>{if(!_)return"Please select one option."}}),l(t);var o=d(t,2);A(o,{get code(){return Pe},language:"svelte"}),p(r,a)},Re=r=>{var a=Be(),t=y(a),s=i(t);k(s,{legend:"Choose your method",name:"method",options:[{value:"carrier-pigeon",label:"Carrier Pigeon"},{value:"postal-mail",label:"Postal Mail"},{value:"none",label:"I do not wish to receive updates",exclusive:!0}]}),l(t);var o=d(t,2);A(o,{get code(){return Ce},language:"svelte"}),p(r,a)},we=r=>{var a=We(),t=y(a),s=i(t);k(s,{legend:"Preferred Contact",name:"preferred-contact",options:[{value:"email",label:"Email",conditional:{id:"email-settings",content:`
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `}},{value:"sms",label:"SMS",conditional:{id:"sms-settings",content:`
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="phone">Phone Number</label>
                    <input class="govuk-input" id="phone" name="phone" type="tel">
                  </div>
                `}}]}),l(t);var o=d(t,2);A(o,{get code(){return ke},language:"svelte"}),p(r,a)},$e=r=>{var a=Ne(),t=y(a),s=i(t);k(s,{legend:"Contact Method",name:"contact-method-snippets",options:snippetSections}),l(t);var o=d(t,2);A(o,{get code(){return xe},language:"svelte"}),p(r,a)};var Ve=u('<div class="p-5 bg-white"><!></div> <!>',1),Ie=u('<div class="p-5 bg-white"><!></div> <!>',1),je=u('<div class="p-5 bg-white"><!></div> <!>',1),Be=u('<div class="p-5 bg-white"><!></div> <!>',1),We=u('<div class="p-5 bg-white"><!></div> <!>',1),Ne=u('<div class="p-5 bg-white"><!></div> <!>',1),Te=u(`<div class="p-5 bg-white"><div class="govuk-form-group"><label class="govuk-label" for="option-input">Type 'option1', 'option2', or 'option3' to select a radio button</label> <input class="govuk-input" id="option-input" placeholder="Type an option value..."/></div> <div class="mt-4"><!></div> <p class="govuk-body mt-4"> </p></div> <!>`,1),Ue=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),He=u('<span slot="header" class="text-lg"> </span>'),Me=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Fe(r,a){z(a,!0);let s=[{id:"1",heading:"1. Basic Usage",content:Se},{id:"2",heading:"2. With Hint",content:Ee},{id:"3",heading:"3. With Validation",content:Ae},{id:"4",heading:"4. Exclusive Option",content:Re},{id:"5",heading:"5. With Conditional Content",content:we},{id:"6",heading:"6. Inline Layout",content:$e},{id:"7",heading:"7. Using Snippets and Nested Components for Conditional Content",content:v=>{var R=Te(),m=y(R),x=i(m),O=d(i(x),2);ge(O),l(x);var P=d(x,2),S=i(P);k(S,{legend:"Select an option",name:"bindable-demo",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],get selectedValue(){return e(o)},set selectedValue(h){j(o,h,!0)}}),l(P);var E=d(P,2),c=i(E);l(E),l(m);var g=d(m,2);A(g,{get code(){return Oe},language:"svelte"}),F(()=>D(c,`Currently selected: ${e(o)??""}`)),fe(O,()=>e(o),h=>j(o,h)),p(v,R)}}],o=B("option2");var _=Me(),V=d(i(_),2);be(V,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(v,R)=>{var m=Z(),x=y(m);me(x,17,()=>s,ve,(O,P)=>{he(O,{children:(S,E)=>{var c=Ue(),g=i(c);ue(g,()=>e(P).content),l(c),p(S,c)},$$slots:{default:!0,header:(S,E)=>{var c=He(),g=i(c,!0);l(c),F(()=>D(g,e(P).heading)),p(S,c)}}})}),p(v,m)},$$slots:{default:!0}}),l(_),p(r,_),Y()}const G=(r,a=I,t=I,s=I,o=I)=>{te(r,{get name(){return a()},get folder(){return t()},get subFolder(){return s()},get homepage(){return o()},get statusObject(){return De},parentFolder:"components-update"})},J=(r,a=I)=>{se(r,{get homepage(){return a()},get detailsArray(){return Ge},get connectedComponentsArray(){return Je}})};let De={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},ze=["A radios component that allows users to select exactly one option from a list.",'Based on the <a href="https://design-system.service.gov.uk/components/radios/" target="_blank" rel="noopener noreferrer">GOV.UK Design System radios component</a> pattern.'],Ye=["Use the radios component when you need to let users select a single option from a list.","Radio buttons should only be used when the user must choose exactly one item."],Ge=[{label:"Description",arr:ze,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ye,visibleOnHomepage:!1,markdown:!0}],Je=[];var Ke=u('<div class="px-6"><!></div>'),Le=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function qe(r,a){z(a,!0);const t=n=>{var f=Ke(),w=i(f);k(w,ee(()=>e(c),{get selectedValue(){return e(V)},set selectedValue(C){j(V,C,!0)}})),l(f),p(n,f)};let s=pe.url.pathname.split("/"),o=ce(s[s.length-1]),_=B(W(ae.md)),V=B(null),v=b(()=>ie([{name:"legend",category:"Content",value:"How would you like to be contacted?"},{name:"hint",category:"Content",value:""},{name:"selectedValue",category:"Content",isBinded:!0,value:e(V)},{name:"name",category:"Form",value:"contact-method"},{name:"options",category:"Content",value:[{value:"email",label:"Email",hint:"We'll send updates to your inbox"},{value:"sms",label:"Text message",hint:"UK mobile numbers only"},{value:"phone",label:"Phone",hint:"We'll call during business hours"},{value:"none",label:"Do not contact me"}]},{name:"error",category:"Validation",value:""},{name:"isPageHeading",category:"UI Options",value:!1},{name:"small",category:"UI Options",value:!1},{name:"legendSize",category:"UI Options",options:["l","m","s"]},{name:"validate",category:"Validation",value(n){if(!n)return"Please select at least one option";if(n==="none")return"You have opted out of all communications"},functionElements:{functionAsString:`function validateContactPreference(value) {
  if (!value) {
    return "Please select at least one option";
  }
  if (value === "none") {
    return "You have opted out of all communications";
  }
  return undefined;
}`}},{name:"inline",category:"UI Options",value:!1}])),R=function(n,f,w){return n.map(C=>{let $=w[C.name]??C.value;return C.isEditable===f&&$!=null?typeof $=="object"?JSON.stringify($,null,2):$:null})},m=B(W(R(e(v),!0,{}))),x=b(()=>({})),O=b(()=>R(e(v),!1,e(x))),P=b(()=>le(e(v),e(m))),S=b(()=>de(e(v),e(m),e(O))),E=b(()=>X(e(S),2)),c=b(()=>e(E)[0]),g=b(()=>e(E)[1]),h=W({});Q(()=>{e(g).forEach(n=>{h[n]=!0}),Object.keys(h).forEach(n=>{e(g).includes(n)||(h[n]=!1)})});let K=b(()=>Object.fromEntries(Object.entries(e(c)).map(([n,f])=>{var w,C;return[n,typeof f=="function"?(C=(w=e(v).find($=>$.name===n))==null?void 0:w.functionElements)==null?void 0:C.functionAsString:f]})));var N=Le(),T=y(N);const L=b(()=>({component:{WrapperInformation:J,WrapperNameAndStatus:G},name:o}));oe(T,{get wrapper(){return e(L)},homepage:!1});var U=d(T,2);ne(U,{get parametersParsingErrorsArray(){return e(g)},get parametersParsingErrorsObject(){return h},onCloseFunction:n=>e(g).filter(f=>f!=n)});var H=d(U,2);re(H,{get Component(){return t},get parametersSourceArray(){return e(v)},get derivedParametersValuesArray(){return e(O)},get parametersVisibleArray(){return e(P)},get parametersParsingErrorsObject(){return h},get copyParametersToClipboardObject(){return e(K)},get demoScreenWidth(){return e(_)},set demoScreenWidth(n){j(_,n,!0)},get statedParametersValuesArray(){return e(m)},set statedParametersValuesArray(n){j(m,n,!0)}});var M=d(H,2),q=i(M);Fe(q,{}),l(M),p(r,N),Y()}const vt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:J,WrapperNameAndStatus:G,default:qe},Symbol.toStringTag,{value:"Module"}));export{vt as _};
