import"./CWj6FrbW.js";import{p as z,G as B,f as b,s as p,a as Y,c as r,r as l,I as j,z as e,t as D,D as I,a9 as W,y as k,u as L}from"./BQOcVDnD.js";import{t as u,c as q,a as c,s as F}from"./Dp3jeoTR.js";import{s as Q}from"./Bx8udYmP.js";import{B as X,d as Z}from"./B6m_pxSd.js";import{f as ee,W as te,P as ae,C as oe,B as ne,a as ie,t as se,c as re}from"./CLFiL4q3.js";import{p as le}from"./Cj0BxRoH.js";import{k as de}from"./lMwbQCpd.js";import{R as C}from"./ByzYw69i.js";import{e as pe,i as ce}from"./hy64cfae.js";import{s as ue}from"./ByC2DMpr.js";import{r as me}from"./CM6Y-JJe.js";import{A as ve,a as ge}from"./mB5DyMkE.js";import"./69_IOA4Y.js";import{C as E}from"./B8qjdm4g.js";const fe=`<script>
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
/>`,be=`<script>
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
/>`,he=`<script lang="ts">
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
/>`,ye=`<script>
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
/>`,_e=`<script>
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
/>`,Pe=`<script>
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
/>`,ke=`<script>
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
{/snippet}`,Ce=i=>{var a=Ae(),t=b(a),s=r(t);C(s,{legend:"Select one option",name:"basic-options",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}]}),l(t);var o=p(t,2);E(o,{get code(){return fe},language:"svelte"}),c(i,a)},xe=i=>{var a=we(),t=b(a),s=r(t);C(s,{legend:"Choose your subscriptions",hint:"Please select one",name:"subscriptions",options:[{value:"news",label:"Newsletter",hint:"Receive monthly updates"},{value:"updates",label:"Product Updates",hint:"New feature alerts"}]}),l(t);var o=p(t,2);E(o,{get code(){return be},language:"svelte"}),c(i,a)},Oe=i=>{var a=$e(),t=b(a),s=r(t);C(s,{legend:"Terms and Conditions",name:"terms",options:[{value:"agree",label:"I agree to the terms and conditions"},{value:"disagree",label:"I do not agree"}],validate:h=>{if(!h)return"Please select one option."}}),l(t);var o=p(t,2);E(o,{get code(){return he},language:"svelte"}),c(i,a)},Se=i=>{var a=Ve(),t=b(a),s=r(t);C(s,{legend:"Choose your method",name:"method",options:[{value:"carrier-pigeon",label:"Carrier Pigeon"},{value:"postal-mail",label:"Postal Mail"},{value:"none",label:"I do not wish to receive updates",exclusive:!0}]}),l(t);var o=p(t,2);E(o,{get code(){return ye},language:"svelte"}),c(i,a)},Ee=i=>{var a=Ie(),t=b(a),s=r(t);C(s,{legend:"Preferred Contact",name:"preferred-contact",options:[{value:"email",label:"Email",conditional:{id:"email-settings",content:`
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `}},{value:"sms",label:"SMS",conditional:{id:"sms-settings",content:`
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="phone">Phone Number</label>
                    <input class="govuk-input" id="phone" name="phone" type="tel">
                  </div>
                `}}]}),l(t);var o=p(t,2);E(o,{get code(){return _e},language:"svelte"}),c(i,a)},Re=i=>{var a=je(),t=b(a),s=r(t);C(s,{legend:"Contact Method",name:"contact-method-snippets",options:snippetSections}),l(t);var o=p(t,2);E(o,{get code(){return Pe},language:"svelte"}),c(i,a)};var Ae=u('<div class="p-5 bg-white"><!></div> <!>',1),we=u('<div class="p-5 bg-white"><!></div> <!>',1),$e=u('<div class="p-5 bg-white"><!></div> <!>',1),Ve=u('<div class="p-5 bg-white"><!></div> <!>',1),Ie=u('<div class="p-5 bg-white"><!></div> <!>',1),je=u('<div class="p-5 bg-white"><!></div> <!>',1),Be=u(`<div class="p-5 bg-white"><div class="govuk-form-group"><label class="govuk-label" for="option-input">Type 'option1', 'option2', or 'option3' to select a radio button</label> <input class="govuk-input" id="option-input" placeholder="Type an option value..."></div> <div class="mt-4"><!></div> <p class="govuk-body mt-4"> </p></div> <!>`,1),We=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ne=u('<span slot="header" class="text-lg"> </span>'),Te=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ue(i,a){z(a,!0);let s=[{id:"1",heading:"1. Basic Usage",content:Ce},{id:"2",heading:"2. With Hint",content:xe},{id:"3",heading:"3. With Validation",content:Oe},{id:"4",heading:"4. Exclusive Option",content:Se},{id:"5",heading:"5. With Conditional Content",content:Ee},{id:"6",heading:"6. Inline Layout",content:Re},{id:"7",heading:"7. Using Snippets and Nested Components for Conditional Content",content:g=>{var R=Be(),m=b(R),x=r(m),O=p(r(x),2);me(O),l(x);var y=p(x,2),_=r(y);C(_,{legend:"Select an option",name:"bindable-demo",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],get selectedValue(){return e(o)},set selectedValue(V){j(o,V,!0)}}),l(y);var S=p(y,2),d=r(S);l(S),l(m);var v=p(m,2);E(v,{get code(){return ke},language:"svelte"}),D(()=>F(d,`Currently selected: ${e(o)??""}`)),ee(O,()=>e(o),V=>j(o,V)),c(g,R)}}],o=B("option2");var h=Te(),$=p(r(h),2);ve($,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(g,R)=>{var m=q(),x=b(m);pe(x,17,()=>s,ce,(O,y)=>{ge(O,{children:(_,S)=>{var d=We(),v=r(d);ue(v,()=>e(y).content),l(d),c(_,d)},$$slots:{default:!0,header:(_,S)=>{var d=Ne(),v=r(d,!0);l(d),D(()=>F(v,e(y).heading)),c(_,d)}}})}),c(g,m)},$$slots:{default:!0}}),l(h),c(i,h),Y()}const G=(i,a=I,t=I,s=I,o=I)=>{X(i,{get name(){return a()},get folder(){return t()},get subFolder(){return s()},get homepage(){return o()},statusObject:He,parentFolder:"components-update"})},K=(i,a=I)=>{ne(i,{get homepage(){return a()},detailsArray:Fe,connectedComponentsArray:ze})};let He={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Me=["A radios component that allows users to select exactly one option from a list.",'Based on the <a href="https://design-system.service.gov.uk/components/radios/" target="_blank" rel="noopener noreferrer">GOV.UK Design System radios component</a> pattern.'],De=["Use the radios component when you need to let users select a single option from a list.","Radio buttons should only be used when the user must choose exactly one item."],Fe=[{label:"Description",arr:Me,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:De,visibleOnHomepage:!1,markdown:!0}],ze=[];var Ye=u('<div class="px-6"><!></div>'),Ge=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ke(i,a){z(a,!0);const t=n=>{var f=Ye(),A=r(f);C(A,Q(()=>e(S),{get selectedValue(){return e($)},set selectedValue(P){j($,P,!0)}})),l(f),c(n,f)};let s=le.url.pathname.split("/"),o=de(s[s.length-1]),h=B(W(Z.md)),$=B(null),g=k(()=>ie([{name:"legend",category:"Content",value:"How would you like to be contacted?"},{name:"hint",category:"Content",value:""},{name:"selectedValue",category:"Content",isBinded:!0,value:e($)},{name:"name",category:"Form",value:"contact-method"},{name:"options",category:"Content",value:[{value:"email",label:"Email",hint:"We'll send updates to your inbox"},{value:"sms",label:"Text message",hint:"UK mobile numbers only"},{value:"phone",label:"Phone",hint:"We'll call during business hours"},{value:"none",label:"Do not contact me"}]},{name:"error",category:"Validation",value:""},{name:"isPageHeading",category:"UI Options",value:!1},{name:"small",category:"UI Options",value:!1},{name:"legendSize",category:"UI Options",options:["l","m","s"]},{name:"validate",category:"Validation",value(n){if(!n)return"Please select at least one option";if(n==="none")return"You have opted out of all communications"},functionElements:{functionAsString:`function validateContactPreference(value) {
  if (!value) {
    return "Please select at least one option";
  }
  if (value === "none") {
    return "You have opted out of all communications";
  }
  return undefined;
}`}},{name:"inline",category:"UI Options",value:!1}])),R=function(n,f,A){return n.map(P=>{let w=A[P.name]??P.value;return P.isEditable===f&&w!=null?typeof w=="object"?JSON.stringify(w,null,2):w:null})},m=B(W(R(e(g),!0,{}))),x=k(()=>({})),O=k(()=>R(e(g),!1,e(x))),y=k(()=>se(e(g),e(m))),_=k(()=>re(e(g),e(m),e(O))),S=k(()=>e(_)[0]),d=k(()=>e(_)[1]),v=W({});L(()=>{e(d).forEach(n=>{v[n]=!0}),Object.keys(v).forEach(n=>{e(d).includes(n)||(v[n]=!1)})});let V=k(()=>Object.fromEntries(Object.entries(e(S)).map(([n,f])=>{var A,P;return[n,typeof f=="function"?(P=(A=e(g).find(w=>w.name===n))==null?void 0:A.functionElements)==null?void 0:P.functionAsString:f]})));var N=Ge(),T=b(N);te(T,{wrapper:{component:{WrapperInformation:K,WrapperNameAndStatus:G},name:o},homepage:!1});var U=p(T,2);ae(U,{get parametersParsingErrorsArray(){return e(d)},get parametersParsingErrorsObject(){return v},onCloseFunction:n=>e(d).filter(f=>f!=n)});var H=p(U,2);oe(H,{Component:t,get parametersSourceArray(){return e(g)},get derivedParametersValuesArray(){return e(O)},get parametersVisibleArray(){return e(y)},get parametersParsingErrorsObject(){return v},get copyParametersToClipboardObject(){return e(V)},get demoScreenWidth(){return e(h)},set demoScreenWidth(n){j(h,n,!0)},get statedParametersValuesArray(){return e(m)},set statedParametersValuesArray(n){j(m,n,!0)}});var M=p(H,2),J=r(M);Ue(J,{}),l(M),c(i,N),Y()}const dt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:K,WrapperNameAndStatus:G,default:Ke},Symbol.toStringTag,{value:"Module"}));export{dt as _};
