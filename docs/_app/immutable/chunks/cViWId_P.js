import"./CWj6FrbW.js";import{p as J,f as A,s as p,a as K,c as d,r as u,J as m,X as H,y as e,t as G,N as ee,D as F,I as j,ab as R,u as te,G as y,ac as ae}from"./I52qY7cu.js";import{f,c as re,a as c}from"./BBh-6AA0.js";import{s as ne}from"./BHp14Q1u.js";import{B as oe,d as se}from"./CksXbiQj.js";import{W as ie,P as de,C as ue,B as le,a as pe,t as me,c as ce}from"./RBHAvJlU.js";import{p as ge}from"./DdYFA_Ud.js";import{k as ve}from"./lMwbQCpd.js";import{D as O}from"./COTzZZCa.js";import"./69_IOA4Y.js";import{s as U,e as he}from"./5F35P8og.js";import{s as ye}from"./BvNl7SXi.js";import{e as fe,i as be}from"./n63ZiD1W.js";import{i as xe}from"./MVh4sFtc.js";import{A as we,a as _e}from"./BS_vHGGP.js";import{C as M}from"./BN7FUiX4.js";const ke=`
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
/>`,De=`
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
/>`,Ie=`
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
/>`,Ve=`
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
/>`,Ae=`
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
`,Pe=o=>{var r=Oe(),a=A(r),i=d(a);O(i,{id:"passport-issued",namePrefix:"passport-issued",fieldset:{legend:{text:"When was your passport issued?",isPageHeading:!0}},hint:{text:"For example, 27 3 2007"},items:[{name:"day",classes:"govuk-input--width-2",value:""},{name:"month",classes:"govuk-input--width-2",value:""},{name:"year",classes:"govuk-input--width-4",value:""}]}),u(a);var n=p(a,2);M(n,{get code(){return ke},language:"svelte"}),c(o,r)},Ce=o=>{var r=Se(),a=A(r),i=d(a);O(i,{id:"dob-errors",namePrefix:"dob",fieldset:{legend:{text:"What is your date of birth?"}},hint:{text:"For example, 31 3 1980"},errorMessage:"Date of birth must include a year",items:[{name:"day",classes:"govuk-input--width-2",value:"6"},{name:"month",classes:"govuk-input--width-2",value:"3"},{name:"year",classes:"govuk-input--width-4",value:"",hasError:!0}]}),u(a);var n=p(a,2);M(n,{get code(){return De},language:"svelte"}),c(o,r)},$e=o=>{var r=We(),a=A(r),i=d(a);O(i,{id:"bday",namePrefix:"bday",fieldset:{legend:{text:"What is your birthday?"}},hint:{text:"For example, 5 12"},items:[{name:"day",classes:"govuk-input--width-2",value:""},{name:"month",classes:"govuk-input--width-2",value:""}]}),u(a);var n=p(a,2);M(n,{get code(){return Ie},language:"svelte"}),c(o,r)},Ee=o=>{var r=Be(),a=A(r),i=d(a);O(i,{id:"dob-autocomplete",namePrefix:"dob",fieldset:{legend:{text:"What is your date of birth?"}},hint:{text:"For example, 31 3 1980"},items:[{name:"day",classes:"govuk-input--width-2",value:"",autocomplete:"bday-day"},{name:"month",classes:"govuk-input--width-2",value:"",autocomplete:"bday-month"},{name:"year",classes:"govuk-input--width-4",value:"",autocomplete:"bday-year"}]}),u(a);var n=p(a,2);M(n,{get code(){return Ve},language:"svelte"}),c(o,r)};var Oe=f('<div class="p-5 bg-white"><!></div> <!>',1),Se=f('<div class="p-5 bg-white"><!></div> <!>',1),We=f('<div class="p-5 bg-white"><!></div> <!>',1),Be=f('<div class="p-5 bg-white"><!></div> <!>',1),je=f('<div class="p-5 bg-white"><!> <div class="mt-4 p-3 border border-gray-200 rounded bg-gray-50"><p class="text-sm">Current date value: <strong> </strong></p> <button class="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Reset Date</button></div></div> <!>',1),Fe=f('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Me=f('<span slot="header" class="text-lg"> </span>'),Te=f('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function He(o,r){J(r,!1);let i=[{id:"1",heading:"1. Basic Date Input",content:Pe},{id:"2",heading:"2. Date Input with Errors",content:Ce},{id:"3",heading:"3. Date Input with Day and Month Only",content:$e},{id:"4",heading:"4. Date Input with Autocomplete",content:Ee},{id:"5",heading:"5. Date Input with Bindable Values",content:D=>{var B=je(),x=A(B),P=d(x);O(P,{id:"bound-date-input",namePrefix:"bound-date",fieldset:{legend:{text:"Enter a date with bindable values"}},hint:{text:"Values are bound to variables in the parent component"},items:[{name:"day"},{name:"month"},{name:"year"}],get dayValue(){return e(n)},set dayValue(v){m(n,v)},get monthValue(){return e(k)},set monthValue(v){m(k,v)},get yearValue(){return e(b)},set yearValue(v){m(b,v)},$$legacy:!0});var C=p(P,2),w=d(C),_=p(d(w)),I=d(_,!0);u(_),u(w);var s=p(w,2);u(C),u(x);var V=p(x,2);M(V,{get code(){return Ae},language:"svelte"}),G(v=>U(I,v),[S],ee),he("click",s,W),c(D,B)}}],n=H(""),k=H(""),b=H("");function S(){return!e(n)||!e(k)||!e(b)?"Incomplete date":`${e(n)}/${e(k)}/${e(b)}`}function W(){m(n,""),m(k,""),m(b,"")}xe();var g=Te(),T=p(d(g),2);we(T,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(D,B)=>{var x=re(),P=A(x);fe(P,1,()=>i,be,(C,w)=>{_e(C,{children:(_,I)=>{var s=Fe(),V=d(s);ye(V,()=>e(w).content),u(s),c(_,s)},$$slots:{default:!0,header:(_,I)=>{var s=Me(),V=d(s,!0);u(s),G(()=>U(V,e(w).heading)),c(_,s)}}})}),c(D,x)},$$slots:{default:!0}}),u(g),c(o,g),K()}const L=(o,r=F,a=F,i=F,n=F)=>{oe(o,{get name(){return r()},get folder(){return a()},get subFolder(){return i()},get homepage(){return n()},get statusObject(){return Re},parentFolder:"components-update"})},X=(o,r=F)=>{le(o,{get homepage(){return r()},get detailsArray(){return ze},get connectedComponentsArray(){return Ye}})};let Re={progress:"Baseline completed",statusRows:[{obj:{Accessible:!1,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!0,Tested:!0},visibleOnHomepage:!1}]},Ne=["The date input component helps users enter a memorable date or one they can easily look up.","It uses text fields for entering day, month, and year numbers, with appropriate validation and error handling.",'Based on the <a href="https://design-system.service.gov.uk/components/date-input/" target="_blank" rel="noopener noreferrer">GOV.UK Design System date input component</a> pattern.'],qe=["Use this component when asking users for a known date, like a birth date, passport issuance date, or appointment date.","For dates that users might not remember precisely, consider using a more flexible date input approach.","The component can be configured to collect just day and month, or month and year, depending on what information is needed."],ze=[{label:"Description",arr:Ne,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:qe,visibleOnHomepage:!1,markdown:!0}],Ye=[];var Ge=f('<div class="p-8"><!></div>'),Ue=f('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Je(o,r){J(r,!0);const a=t=>{var h=Ge(),$=d(h);O($,ne(()=>e(_),{get dayValue(){return e(b)},set dayValue(l){m(b,l,!0)},get monthValue(){return e(S)},set monthValue(l){m(S,l,!0)},get yearValue(){return e(W)},set yearValue(l){m(W,l,!0)}})),u(h),c(t,h)};let i=ge.url.pathname.split("/"),n=ve(i[i.length-1]),k=j(R(se.md)),b=j(""),S=j(""),W=j(""),g=y(()=>pe([{name:"id",category:"Content",isRequired:!0,value:"date-input-example",description:{markdown:!0,arr:["Required. This is used for the main component and to compose the ID attribute for each item."]}},{name:"namePrefix",category:"Content",value:"date",description:{markdown:!0,arr:["Optional prefix that is used to prefix each item name, separated by hyphens."]}},{name:"classes",category:"Styling & Attributes",value:"",description:{markdown:!0,arr:["Classes to add to the date-input container."]}},{name:"attributes",category:"Styling & Attributes",value:{},description:{markdown:!0,arr:["HTML attributes (for example data attributes) to add to the date input container."]}},{name:"formGroup",category:"Content",value:{classes:"",attributes:{}},description:{markdown:!0,arr:["Options for the form group containing the date input component."]}},{name:"fieldset",category:"Content",value:{legend:{text:"When was your passport issued?",isPageHeading:!1,classes:""},role:"group",classes:"",attributes:{}},description:{markdown:!0,arr:["Options for the fieldset element that contains the date input component.",'Example: { text: "Date must include a year" }']}},{name:"hint",category:"Content",value:{text:"For example, 27 3 2007",classes:"",attributes:{}},description:{markdown:!0,arr:["Hint text that explains the expected format of the date."]}},{name:"errorMessage",category:"Error Handling",value:"",description:{markdown:!0,arr:["Optional error message string, typically used for server-side validation errors. Not displayed if set to a falsy value (e.g., empty string, null, undefined).","If the client-side `validate` function is also provided and returns an error string, the `validate` function's error message will take precedence and be displayed instead of this one."]},rows:2},{name:"items",category:"Content",isRequired:!0,value:[{name:"day",label:"Day"},{name:"month",label:"Month"},{name:"year",label:"Year"}],description:{markdown:!0,arr:["Required. Array of input items for the date input (typically day, month, year).","Each item should have a name, and can have additional properties like value, classes, label, etc. ","Setting `hasError: true` on an item will only apply error styling to that specific input if the top-level `errorMessage` prop is also set to a non-empty string."]}},{name:"legendSize",category:"Styling & Attributes",options:["l","m","s"],value:"m",description:{markdown:!0,arr:["Controls the size of the fieldset legend (`l`, `m`, or `s`)."]}},{name:"dayValue",category:"Content",isBinded:!0,value:e(b),description:{markdown:!0,arr:["Bindable value for the day input."]}},{name:"monthValue",category:"Content",isBinded:!0,value:e(S),description:{markdown:!0,arr:["Bindable value for the month input."]}},{name:"yearValue",category:"Content",isBinded:!0,value:e(W),description:{markdown:!0,arr:["Bindable value for the year input."]}},{name:"validate",category:"Error Handling",propType:"fixed",value(t){if(!t.day||!t.month||!t.year)return"Date must include a day, month and year (client-side)";if(t.year&&parseInt(t.year.toString(),10)<1900)return"Year must be after 1900 (client-side)"},functionElements:{functionAsString:`function (values) {
  if (!values.day || !values.month || !values.year) {
    return "Date must include a day, month and year (client-side)";
  }
  if (values.year && parseInt(values.year.toString(), 10) < 1900) {
    return "Year must be after 1900 (client-side)";
  }
  return undefined; // No error
}`},description:{markdown:!0,arr:["A client-side validation function <code>(values: { day?, month?, year? }) => string | undefined</code>.","Receives an object with the current day, month, and year values and should return an error message string if invalid, or <code>undefined</code> if valid.","This validation runs in the browser and overrides the <code>errorMessage</code> if it returns an error string."]}}])),T=function(t,h,$){return t.map(l=>{let E=$[l.name]??l.value;return l.isEditable===h&&E!=null?typeof E=="object"?JSON.stringify(E,null,2):E:null})},D=j(R(T(e(g),!0,{}))),B=y(()=>({})),x=y(()=>T(e(g),!1,e(B))),P=y(()=>me(e(g),e(D))),C=y(()=>ce(e(g),e(D),e(x))),w=y(()=>ae(e(C),2)),_=y(()=>e(w)[0]),I=y(()=>e(w)[1]),s=R({});te(()=>{e(I).forEach(t=>{s[t]=!0}),Object.keys(s).forEach(t=>{e(I).includes(t)||(s[t]=!1)})});let V=y(()=>Object.fromEntries(Object.entries(e(_)).map(([t,h])=>{var $,l;return[t,typeof h=="function"?(l=($=e(g).find(E=>E.name===t))==null?void 0:$.functionElements)==null?void 0:l.functionAsString:h]})));var v=Ue(),N=A(v);const Q=y(()=>({component:{WrapperInformation:X,WrapperNameAndStatus:L},name:n}));ie(N,{get wrapper(){return e(Q)},homepage:!1});var q=p(N,2);de(q,{get parametersParsingErrorsArray(){return e(I)},get parametersParsingErrorsObject(){return s},onCloseFunction:t=>e(I).filter(h=>h!=t)});var z=p(q,2);ue(z,{get Component(){return a},get parametersSourceArray(){return e(g)},get derivedParametersValuesArray(){return e(x)},get parametersVisibleArray(){return e(P)},get parametersParsingErrorsObject(){return s},get copyParametersToClipboardObject(){return e(V)},get demoScreenWidth(){return e(k)},set demoScreenWidth(t){m(k,t,!0)},get statedParametersValuesArray(){return e(D)},set statedParametersValuesArray(t){m(D,t,!0)}});var Y=p(z,2),Z=d(Y);He(Z,{}),u(Y),c(o,v),K()}const pt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:X,WrapperNameAndStatus:L,default:Je},Symbol.toStringTag,{value:"Module"}));export{pt as _};
