import"./CWj6FrbW.js";import{p as U,f as A,s as l,a as J,c as i,r as d,I as c,W as H,z as e,t as Y,M as X,D as F,G as j,a9 as R,y as V,u as Z}from"./BQOcVDnD.js";import{t as f,c as ee,a as g,s as G,g as te}from"./Dp3jeoTR.js";import{s as ae}from"./Bx8udYmP.js";import{B as re,d as ne}from"./Dd_cy6ks.js";import{W as oe,P as se,C as ie,B as de,a as ue,t as le,c as pe}from"./ChVnBZzg.js";import{p as me}from"./CiGxh9O0.js";import{k as ce}from"./lMwbQCpd.js";import{D as O}from"./7CT5dakd.js";import"./69_IOA4Y.js";import{e as ge,i as ve}from"./hy64cfae.js";import{s as he}from"./ByC2DMpr.js";import{i as ye}from"./B_4Nsh1l.js";import{A as fe,a as be}from"./QWzEfDHy.js";import{C as M}from"./B8qjdm4g.js";const xe=`
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
<\/script>

<DateInput 
  id="passport-issued"
  namePrefix="passport-issued"
  fieldset={{
    legend: {
      text: "When was your passport issued?",
      isPageHeading: true
    }
  }}
  hint={{
    text: "For example, 27 3 2007"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: ""
    }
  ]}
/>`,we=`
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
<\/script>

<DateInput 
  id="dob-errors"
  namePrefix="dob"
  fieldset={{
    legend: {
      text: "What is your date of birth?"
    }
  }}
  hint={{
    text: "For example, 31 3 1980"
  }}
  errorMessage="Date of birth must include a year"
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: "6"
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: "3"
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: "",
      hasError: true
    }
  ]}
/>`,ke=`
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
<\/script>

<DateInput 
  id="bday"
  namePrefix="bday"
  fieldset={{
    legend: {
      text: "What is your birthday?"
    }
  }}
  hint={{
    text: "For example, 5 12"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: ""
    }
  ]}
/>`,_e=`
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
<\/script>

<DateInput 
  id="dob-autocomplete"
  namePrefix="dob"
  fieldset={{
    legend: {
      text: "What is your date of birth?"
    }
  }}
  hint={{
    text: "For example, 31 3 1980"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: "",
      autocomplete: "bday-day"
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: "",
      autocomplete: "bday-month"
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: "",
      autocomplete: "bday-year"
    }
  ]}
/>`,De=`
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
  
  // Initialize bindable values
  let day = "";
  let month = "";
  let year = "";
  
  // Function to format the date for display
  function getFormattedDate() {
    if (!day || !month || !year) return "Incomplete date";
    return \`\${day}/\${month}/\${year}\`;
  }
  
  // Function to reset the values
  function resetValues() {
    day = "";
    month = "";
    year = "";
  }
<\/script>

<DateInput 
  id="bound-date-input"
  namePrefix="bound-date"
  fieldset={{
    legend: {
      text: "Enter a date with bindable values"
    }
  }}
  hint={{
    text: "Values are bound to variables in the parent component"
  }}
  bind:dayValue={day}
  bind:monthValue={month}
  bind:yearValue={year}
  items={[
    { name: "day" },
    { name: "month" },
    { name: "year" }
  ]}
/>

<div class="govuk-!-margin-top-4">
  <p class="govuk-body">Current date value: <strong>{getFormattedDate()}</strong></p>
  <button class="govuk-button govuk-button--secondary govuk-!-margin-top-2" on:click={resetValues}>
    Reset Date
  </button>
</div>
`,Ie=o=>{var r=Ce(),a=A(r),s=i(a);O(s,{id:"passport-issued",namePrefix:"passport-issued",fieldset:{legend:{text:"When was your passport issued?",isPageHeading:!0}},hint:{text:"For example, 27 3 2007"},items:[{name:"day",classes:"govuk-input--width-2",value:""},{name:"month",classes:"govuk-input--width-2",value:""},{name:"year",classes:"govuk-input--width-4",value:""}]}),d(a);var n=l(a,2);M(n,{get code(){return xe},language:"svelte"}),g(o,r)},Ve=o=>{var r=Ee(),a=A(r),s=i(a);O(s,{id:"dob-errors",namePrefix:"dob",fieldset:{legend:{text:"What is your date of birth?"}},hint:{text:"For example, 31 3 1980"},errorMessage:"Date of birth must include a year",items:[{name:"day",classes:"govuk-input--width-2",value:"6"},{name:"month",classes:"govuk-input--width-2",value:"3"},{name:"year",classes:"govuk-input--width-4",value:"",hasError:!0}]}),d(a);var n=l(a,2);M(n,{get code(){return we},language:"svelte"}),g(o,r)},Pe=o=>{var r=$e(),a=A(r),s=i(a);O(s,{id:"bday",namePrefix:"bday",fieldset:{legend:{text:"What is your birthday?"}},hint:{text:"For example, 5 12"},items:[{name:"day",classes:"govuk-input--width-2",value:""},{name:"month",classes:"govuk-input--width-2",value:""}]}),d(a);var n=l(a,2);M(n,{get code(){return ke},language:"svelte"}),g(o,r)},Ae=o=>{var r=Oe(),a=A(r),s=i(a);O(s,{id:"dob-autocomplete",namePrefix:"dob",fieldset:{legend:{text:"What is your date of birth?"}},hint:{text:"For example, 31 3 1980"},items:[{name:"day",classes:"govuk-input--width-2",value:"",autocomplete:"bday-day"},{name:"month",classes:"govuk-input--width-2",value:"",autocomplete:"bday-month"},{name:"year",classes:"govuk-input--width-4",value:"",autocomplete:"bday-year"}]}),d(a);var n=l(a,2);M(n,{get code(){return _e},language:"svelte"}),g(o,r)};var Ce=f('<div class="p-5 bg-white"><!></div> <!>',1),Ee=f('<div class="p-5 bg-white"><!></div> <!>',1),$e=f('<div class="p-5 bg-white"><!></div> <!>',1),Oe=f('<div class="p-5 bg-white"><!></div> <!>',1),We=f('<div class="p-5 bg-white"><!> <div class="mt-4 p-3 border border-gray-200 rounded bg-gray-50"><p class="text-sm">Current date value: <strong> </strong></p> <button class="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Reset Date</button></div></div> <!>',1),Se=f('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Be=f('<span slot="header" class="text-lg"> </span>'),je=f('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Fe(o,r){U(r,!1);let s=[{id:"1",heading:"1. Basic Date Input",content:Ie},{id:"2",heading:"2. Date Input with Errors",content:Ve},{id:"3",heading:"3. Date Input with Day and Month Only",content:Pe},{id:"4",heading:"4. Date Input with Autocomplete",content:Ae},{id:"5",heading:"5. Date Input with Bindable Values",content:D=>{var B=We(),x=A(B),C=i(x);O(C,{id:"bound-date-input",namePrefix:"bound-date",fieldset:{legend:{text:"Enter a date with bindable values"}},hint:{text:"Values are bound to variables in the parent component"},items:[{name:"day"},{name:"month"},{name:"year"}],get dayValue(){return e(n)},set dayValue(h){c(n,h)},get monthValue(){return e(_)},set monthValue(h){c(_,h)},get yearValue(){return e(b)},set yearValue(h){c(b,h)},$$legacy:!0});var P=l(C,2),w=i(P),p=l(i(w)),k=i(p,!0);d(p),d(w);var m=l(w,2);d(P),d(x);var I=l(x,2);M(I,{get code(){return De},language:"svelte"}),Y(h=>G(k,h),[W],X),te("click",m,S),g(D,B)}}],n=H(""),_=H(""),b=H("");function W(){return!e(n)||!e(_)||!e(b)?"Incomplete date":`${e(n)}/${e(_)}/${e(b)}`}function S(){c(n,""),c(_,""),c(b,"")}ye();var v=je(),T=l(i(v),2);fe(T,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(D,B)=>{var x=ee(),C=A(x);ge(C,1,()=>s,ve,(P,w)=>{be(P,{children:(p,k)=>{var m=Se(),I=i(m);he(I,()=>e(w).content),d(m),g(p,m)},$$slots:{default:!0,header:(p,k)=>{var m=Be(),I=i(m,!0);d(m),Y(()=>G(I,e(w).heading)),g(p,m)}}})}),g(D,x)},$$slots:{default:!0}}),d(v),g(o,v),J()}const K=(o,r=F,a=F,s=F,n=F)=>{re(o,{get name(){return r()},get folder(){return a()},get subFolder(){return s()},get homepage(){return n()},statusObject:Me,parentFolder:"components-update"})},L=(o,r=F)=>{de(o,{get homepage(){return r()},detailsArray:Re,connectedComponentsArray:Ne})};let Me={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!0,Tested:!0},visibleOnHomepage:!1}]},Te=["The date input component helps users enter a memorable date or one they can easily look up.","It uses text fields for entering day, month, and year numbers, with appropriate validation and error handling.",'Based on the <a href="https://design-system.service.gov.uk/components/date-input/" target="_blank" rel="noopener noreferrer">GOV.UK Design System date input component</a> pattern.'],He=["Use this component when asking users for a known date, like a birth date, passport issuance date, or appointment date.","For dates that users might not remember precisely, consider using a more flexible date input approach.","The component can be configured to collect just day and month, or month and year, depending on what information is needed."],Re=[{label:"Description",arr:Te,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:He,visibleOnHomepage:!1,markdown:!0}],Ne=[];var qe=f('<div class="p-8"><!></div>'),ze=f('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ye(o,r){U(r,!0);const a=t=>{var y=qe(),E=i(y);O(E,ae(()=>e(w),{get dayValue(){return e(b)},set dayValue(u){c(b,u,!0)},get monthValue(){return e(W)},set monthValue(u){c(W,u,!0)},get yearValue(){return e(S)},set yearValue(u){c(S,u,!0)}})),d(y),g(t,y)};let s=me.url.pathname.split("/"),n=ce(s[s.length-1]),_=j(R(ne.md)),b=j(""),W=j(""),S=j(""),v=V(()=>ue([{name:"id",category:"Content",isRequired:!0,value:"date-input-example",description:{markdown:!0,arr:["Required. This is used for the main component and to compose the ID attribute for each item."]}},{name:"namePrefix",category:"Content",value:"date",description:{markdown:!0,arr:["Optional prefix that is used to prefix each item name, separated by hyphens."]}},{name:"classes",category:"Styling & Attributes",value:"",description:{markdown:!0,arr:["Classes to add to the date-input container."]}},{name:"attributes",category:"Styling & Attributes",value:{},description:{markdown:!0,arr:["HTML attributes (for example data attributes) to add to the date input container."]}},{name:"formGroup",category:"Content",value:{classes:"",attributes:{}},description:{markdown:!0,arr:["Options for the form group containing the date input component."]}},{name:"fieldset",category:"Content",value:{legend:{text:"When was your passport issued?",isPageHeading:!1,classes:""},role:"group",classes:"",attributes:{}},description:{markdown:!0,arr:["Options for the fieldset element that contains the date input component.",'Example: { text: "Date must include a year" }']}},{name:"hint",category:"Content",value:{text:"For example, 27 3 2007",classes:"",attributes:{}},description:{markdown:!0,arr:["Hint text that explains the expected format of the date."]}},{name:"errorMessage",category:"Error Handling",value:"",description:{markdown:!0,arr:["Optional error message string, typically used for server-side validation errors. Not displayed if set to a falsy value (e.g., empty string, null, undefined).","If the client-side `validate` function is also provided and returns an error string, the `validate` function's error message will take precedence and be displayed instead of this one."]},rows:2},{name:"items",category:"Content",isRequired:!0,value:[{name:"day",label:"Day"},{name:"month",label:"Month"},{name:"year",label:"Year"}],description:{markdown:!0,arr:["Required. Array of input items for the date input (typically day, month, year).","Each item should have a name, and can have additional properties like value, classes, label, etc. ","Setting `hasError: true` on an item will only apply error styling to that specific input if the top-level `errorMessage` prop is also set to a non-empty string."]}},{name:"legendSize",category:"Styling & Attributes",options:["l","m","s"],value:"m",description:{markdown:!0,arr:["Controls the size of the fieldset legend (`l`, `m`, or `s`)."]}},{name:"dayValue",category:"Content",isBinded:!0,value:e(b),description:{markdown:!0,arr:["Bindable value for the day input."]}},{name:"monthValue",category:"Content",isBinded:!0,value:e(W),description:{markdown:!0,arr:["Bindable value for the month input."]}},{name:"yearValue",category:"Content",isBinded:!0,value:e(S),description:{markdown:!0,arr:["Bindable value for the year input."]}},{name:"validate",category:"Error Handling",propType:"fixed",value(t){if(!t.day||!t.month||!t.year)return"Date must include a day, month and year (client-side)";if(t.year&&parseInt(t.year.toString(),10)<1900)return"Year must be after 1900 (client-side)"},functionElements:{functionAsString:`function (values) {
  if (!values.day || !values.month || !values.year) {
    return "Date must include a day, month and year (client-side)";
  }
  if (values.year && parseInt(values.year.toString(), 10) < 1900) {
    return "Year must be after 1900 (client-side)";
  }
  return undefined; // No error
}`},description:{markdown:!0,arr:["A client-side validation function <code>(values: { day?, month?, year? }) => string | undefined</code>.","Receives an object with the current day, month, and year values and should return an error message string if invalid, or <code>undefined</code> if valid.","This validation runs in the browser and overrides the <code>errorMessage</code> if it returns an error string."]}}])),T=function(t,y,E){return t.map(u=>{let $=E[u.name]??u.value;return u.isEditable===y&&$!=null?typeof $=="object"?JSON.stringify($,null,2):$:null})},D=j(R(T(e(v),!0,{}))),B=V(()=>({})),x=V(()=>T(e(v),!1,e(B))),C=V(()=>le(e(v),e(D))),P=V(()=>pe(e(v),e(D),e(x))),w=V(()=>e(P)[0]),p=V(()=>e(P)[1]),k=R({});Z(()=>{e(p).forEach(t=>{k[t]=!0}),Object.keys(k).forEach(t=>{e(p).includes(t)||(k[t]=!1)})});let m=V(()=>Object.fromEntries(Object.entries(e(w)).map(([t,y])=>{var E,u;return[t,typeof y=="function"?(u=(E=e(v).find($=>$.name===t))==null?void 0:E.functionElements)==null?void 0:u.functionAsString:y]})));var I=ze(),h=A(I);oe(h,{wrapper:{component:{WrapperInformation:L,WrapperNameAndStatus:K},name:n},homepage:!1});var N=l(h,2);se(N,{get parametersParsingErrorsArray(){return e(p)},get parametersParsingErrorsObject(){return k},onCloseFunction:t=>e(p).filter(y=>y!=t)});var q=l(N,2);ie(q,{Component:a,get parametersSourceArray(){return e(v)},get derivedParametersValuesArray(){return e(x)},get parametersVisibleArray(){return e(C)},get parametersParsingErrorsObject(){return k},get copyParametersToClipboardObject(){return e(m)},get demoScreenWidth(){return e(_)},set demoScreenWidth(t){c(_,t,!0)},get statedParametersValuesArray(){return e(D)},set statedParametersValuesArray(t){c(D,t,!0)}});var z=l(q,2),Q=i(z);Fe(Q,{}),d(z),g(o,I),J()}const it=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:L,WrapperNameAndStatus:K,default:Ye},Symbol.toStringTag,{value:"Module"}));export{it as _};
