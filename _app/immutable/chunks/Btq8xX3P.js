import"./CWj6FrbW.js";import{p as K,f as g,s as u,a as J,c as i,r as l,J as I,I as D,y as a,t as L,D as V,ab as F,u as X,G as b,ac as Z}from"./I52qY7cu.js";import{f as p,c as ee,a as c}from"./BBh-6AA0.js";import{s as te}from"./BHp14Q1u.js";import{B as ae,d as re}from"./DImQRQIn.js";import{W as oe,P as se,C as ie,B as le,a as ne,t as de,c as ue}from"./pjHBbLSa.js";import{p as ce}from"./D7CmsDtu.js";import{k as pe}from"./lMwbQCpd.js";import{S as h}from"./C1_WJPR1.js";import{s as Y}from"./5F35P8og.js";import{s as me}from"./BvNl7SXi.js";import{e as ve,i as ge}from"./n63ZiD1W.js";import{A as be,a as he}from"./DFHrQqYn.js";import"./69_IOA4Y.js";import{C as y}from"./BN7FUiX4.js";const fe=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-basic"
  name="sort-basic"
  {items}
/>
`,ye=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, // Add placeholder
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-default"
  name="sort-default"
  label="Sort by (Default Value - with Placeholder)"
  {items}
  // No 'value' prop passed - defaults to placeholder
/>
`,xe=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-hint"
  name="sort-hint"
  label="Sort by"
  hint="Choose the order items are displayed in."
  {items}
  value="updated"
/>
`,we=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, // Example with empty value
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-error"
  name="sort-error"
  label="Sort by"
  error="You must select a sort option."
  {items}
  value=""
/>
`,_e=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-heading-full"
  name="sort-heading-full"
  label="Sort results by"
  labelIsPageHeading={true}
  fullWidth={true}
  {items}
  value="updated"
/>
`,Se=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated", disabled: true }, // Disabled item
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
<\/script>

<Select 
  id="sort-disabled"
  name="sort-disabled"
  label="Sort by (with disabled option)"
  {items}
  value="published" // Select a non-disabled option initially
/>
`,ke=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, 
    { value: "allowed", text: "Allowed Option" },
    { value: "disallowed", text: "Disallowed Option (Client Validation)" },
    { value: "other", text: "Other Option" },
  ];
  
  // Client-side validation function
  function validateSelect(value) {
    if (!value) {
      return "You must select an option.";
    }
    if (value === "disallowed") {
      return "This option is not permitted.";
    }
    return undefined; // Valid
  }
<\/script>

<Select 
  id="sort-validation"
  name="sort-validation"
  label="Select (with validation)"
  hint="Try selecting the disallowed option."
  {items}
  value=""
  validate={validateSelect} // Pass validation function
/>
`,Oe=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "alpha", text: "Alpha" },
    { value: "beta", text: "Beta" },
    { value: "gamma", text: "Gamma" },
  ];
<\/script>

<div id="extra-description" class="govuk-body-s govuk-!-margin-bottom-1">This text provides extra context.</div>

<Select 
  id="sort-extra-props"
  name="sort-extra-props"
  label="Select with extra props"
  {items}
  value="beta"
  formGroupClasses="my-custom-form-group another-class"
  describedBy="extra-description" // Override default describedBy
  data-custom-attribute="example-value" // Example of spreading other attributes
/>
`,Pe=`
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];

  // Reactive state variable for the selected value
  let selectedValue = $state("updated"); 
<\/script>

<div class="govuk-body">
  <p>Selected value (bound): <code class="bg-gray-200 p-1 rounded">{selectedValue}</code></p>
</div>

<Select 
  id="sort-bind"
  name="sort-bind"
  label="Sort by (bind:value)"
  {items}
  bind:value={selectedValue} // Bind the value
/>
`;var Ae=p('<div class="p-5 bg-white"><!></div> <!>',1),Ce=p('<div class="p-5 bg-white"><!></div> <!>',1),Ee=p('<div class="p-5 bg-white"><!></div> <!>',1),Re=p('<div class="p-5 bg-white"><!></div> <!>',1),Be=p('<div class="p-5 bg-white"><!></div> <!>',1),$e=p('<div class="p-5 bg-white"><!></div> <!>',1),Ve=p('<div class="p-5 bg-white"><!></div> <!>',1),Te=p('<div class="p-5 bg-white"><div id="extra-description" class="govuk-body-s govuk-!-margin-bottom-1">This text provides extra context.</div> <!></div> <!>',1),Me=p('<div class="p-5 bg-white"><div class="govuk-body mb-2"><p>Selected value (bound): <code class="bg-gray-200 p-1 rounded"> </code></p></div> <!></div> <!>',1),je=p('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),We=p('<span slot="header" class="text-lg"> </span>'),Ie=p('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function De(w,_){K(_,!0);const E=o=>{var r=Ae(),t=g(r),s=i(t);h(s,{id:"sort-basic",name:"sort-basic",get items(){return f}}),l(t);var e=u(t,2);y(e,{get code(){return fe},language:"svelte"}),c(o,r)},k=o=>{var r=Ce(),t=g(r),s=i(t);h(s,{id:"sort-default",name:"sort-default",label:"Sort by (Default Value - with Placeholder)",get items(){return U}}),l(t);var e=u(t,2);y(e,{get code(){return ye},language:"svelte"}),c(o,r)},R=o=>{var r=Ee(),t=g(r),s=i(t);h(s,{id:"sort-hint",name:"sort-hint",label:"Sort by",hint:"Choose the order items are displayed in.",get items(){return f},value:"updated"}),l(t);var e=u(t,2);y(e,{get code(){return xe},language:"svelte"}),c(o,r)},T=o=>{var r=Re(),t=g(r),s=i(t);h(s,{id:"sort-error",name:"sort-error",label:"Sort by",error:"You must select a sort option.",get items(){return H},value:""}),l(t);var e=u(t,2);y(e,{get code(){return we},language:"svelte"}),c(o,r)},B=o=>{var r=Be(),t=g(r),s=i(t);h(s,{id:"sort-heading-full",name:"sort-heading-full",label:"Sort results by",labelIsPageHeading:!0,fullWidth:!0,get items(){return f},value:"updated"}),l(t);var e=u(t,2);y(e,{get code(){return _e},language:"svelte"}),c(o,r)},x=o=>{var r=$e(),t=g(r),s=i(t);h(s,{id:"sort-disabled",name:"sort-disabled",label:"Sort by (with disabled option)",get items(){return j},value:"published"}),l(t);var e=u(t,2);y(e,{get code(){return Se},language:"svelte"}),c(o,r)},M=o=>{var r=Ve(),t=g(r),s=i(t);h(s,{id:"sort-validation",name:"sort-validation",label:"Select (with validation)",hint:"Try selecting the disallowed option.",get items(){return W},value:"",validate:S}),l(t);var e=u(t,2);y(e,{get code(){return ke},language:"svelte"}),c(o,r)},O=o=>{var r=Te(),t=g(r),s=u(i(t),2);h(s,{id:"sort-extra-props",name:"sort-extra-props",label:"Select with extra props",get items(){return P},value:"beta",formGroupClasses:"my-custom-form-group another-class",describedBy:"extra-description","data-custom-attribute":"example-value"}),l(t);var e=u(t,2);y(e,{get code(){return Oe},language:"svelte"}),c(o,r)},G=o=>{var r=Me(),t=g(r),s=i(t),e=i(s),n=u(i(e)),m=i(n,!0);l(n),l(e),l(s);var v=u(s,2);h(v,{id:"sort-bind",name:"sort-bind",label:"Sort by (bind:value)",get items(){return f},get value(){return a(A)},set value($){I(A,$,!0)}}),l(t);var d=u(t,2);y(d,{get code(){return Pe},language:"svelte"}),L(()=>Y(m,a(A))),c(o,r)};let f=[{value:"published",text:"Recently published"},{value:"updated",text:"Recently updated"},{value:"views",text:"Most views"},{value:"comments",text:"Most comments"}],H=[{value:"",text:"Please select"},...f],U=[{value:"",text:"Please select"},...f],j=[{value:"published",text:"Recently published"},{value:"updated",text:"Recently updated",disabled:!0},{value:"views",text:"Most views"},{value:"comments",text:"Most comments"}],W=[{value:"",text:"Please select"},{value:"allowed",text:"Allowed Option"},{value:"disallowed",text:"Disallowed Option (Client Validation)"},{value:"other",text:"Other Option"}],P=[{value:"alpha",text:"Alpha"},{value:"beta",text:"Beta"},{value:"gamma",text:"Gamma"}];function S(o){if(!o)return"You must select an option.";if(o==="disallowed")return"This option is not permitted."}let N=[{id:"1",heading:"1. Minimum required usage",content:E},{id:"2",heading:"2. Default value selection (with placeholder)",content:k},{id:"3",heading:"3. With hint text",content:R},{id:"4",heading:"4. With server-side error message",content:T},{id:"5",heading:"5. As page heading and full width",content:B},{id:"6",heading:"6. With a disabled option",content:x},{id:"7",heading:"7. With client-side validation",content:M},{id:"8",heading:"8. With other props (formGroupClasses, describedBy, attributes)",content:O},{id:"9",heading:"9. Using bind:value",content:G}],A=D("updated");var C=Ie(),q=u(i(C),2);be(q,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(o,r)=>{var t=ee(),s=g(t);ve(s,17,()=>N,ge,(e,n)=>{he(e,{children:(m,v)=>{var d=je(),$=i(d);me($,()=>a(n).content),l(d),c(m,d)},$$slots:{default:!0,header:(m,v)=>{var d=We(),$=i(d,!0);l(d),L(()=>Y($,a(n).heading)),c(m,d)}}})}),c(o,t)},$$slots:{default:!0}}),l(C),c(w,C),J()}const z=(w,_=V,E=V,k=V,R=V)=>{ae(w,{get name(){return _()},get folder(){return E()},get subFolder(){return k()},get homepage(){return R()},get statusObject(){return Ge},parentFolder:"components-update"})},Q=(w,_=V)=>{le(w,{get homepage(){return _()},get detailsArray(){return Ne},get connectedComponentsArray(){return qe}})};let Ge={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},He=["Renders a standard HTML <code>select</code> dropdown component styled according to the GOV.UK Design System.",'Based on the <a href="https://design-system.service.gov.uk/components/select/" target="_blank" rel="noopener noreferrer">GOV.UK Design System Select component</a>.'],Ue=["Use this component when you need to ask users to select one option from a predefined list.","GOV.UK recommends avoiding select components for multiple selections due to usability and accessibility issues. Use checkboxes instead for multi-select scenarios.",'Be aware of <a href="https://design-system.service.gov.uk/components/select/#research-on-this-component" target="_blank" rel="noopener noreferrer">known usability issues</a> with select components, especially on smaller devices. Consider alternatives like radios if appropriate.'],Ne=[{label:"Description",arr:He,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Ue,visibleOnHomepage:!1,markdown:!0}],qe=[];var Fe=p('<div class="p-8"><!></div>'),Le=p('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ye(w,_){K(_,!0);const E=e=>{var n=Fe(),m=i(n);h(m,te(()=>a(W),{get value(){return a(B)},set value(v){I(B,v,!0)}})),l(n),c(e,n)};let k=ce.url.pathname.split("/"),R=pe(k[k.length-1]),T=D(F(re.md)),B=D("govuk-2"),x=b(()=>ne([{name:"id",category:"Core attributes",isRequired:!0,value:"select-example",description:{markdown:!0,arr:["The ID attribute for the <code>select</code> element. Used to link the label and hint/error messages."]}},{name:"name",category:"Core attributes",isRequired:!0,value:"select-example-name",description:{markdown:!0,arr:["The name attribute for the <code>select</code> element, submitted with form data."]}},{name:"items",category:"Core attributes",isRequired:!0,isEditable:!0,value:[{value:"govuk-1",text:"Option 1"},{value:"govuk-2",text:"Option 2"},{value:"govuk-3",text:"Option 3",disabled:!0},{value:"govuk-4",text:"Option 4"}],description:{markdown:!0,arr:["An array of objects defining the options for the dropdown. Each object should have:","<code>value</code>: The value attribute for the option.","<code>text</code>: The text displayed for the option.","<code>disabled</code> (optional): Set to <code>true</code> to disable the option."]}},{name:"value",category:"Core attributes",isBinded:!0,value:a(B),options:["govuk-1","govuk-2","govuk-4"],description:{markdown:!0,arr:["The value of the currently selected option. Use <code>bind:value</code> to enable two-way data binding.","This prop is bound using <code>bind:value</code> in this demo."]}},{name:"label",category:"Label and hints",isRequired:!1,value:"Select an option",description:{markdown:!0,arr:["The text for the <code>label</code> element associated with the select."]}},{name:"labelIsPageHeading",category:"Label and hints",value:!1,description:{markdown:!0,arr:["If <code>true</code>, wraps the label in an <code>h1</code> element and applies larger heading styles."]}},{name:"hint",category:"Label and hints",value:"This is a hint to help the user.",description:{markdown:!0,arr:["Optional hint text displayed below the label."]},rows:2},{name:"error",category:"Error handling",value:"",description:{markdown:!0,arr:["Optional error message string. If present, indicates a server-side error and displays this message (unless overridden by client-side validation)."]},rows:2},{name:"validate",category:"Error handling",propType:"fixed",value(e){if(e==null||e==="")return"Please make a selection (client-side).";if(e==="govuk-1")return"Option 1 is not allowed (client-side)."},functionElements:{functionAsString:`function (value) {
  if (value === undefined || value === null || value === "") {
    return "Please make a selection (client-side).";
  }
  if (value === "govuk-1") {
    return "Option 1 is not allowed (client-side).";
  }
  return undefined; // No error
}`},description:{markdown:!0,arr:["A client-side validation function <code>(value) => string | undefined</code>.","Receives the current selected value and should return an error message string if invalid, or <code>undefined</code> if valid."]}},{name:"formGroupClasses",category:"Styling and layout",value:"extra-form-group-class",description:{markdown:!0,arr:["Optional additional CSS classes to apply to the wrapping <code>govuk-form-group</code> div."]}},{name:"fullWidth",category:"Styling and layout",value:!1,description:{markdown:!0,arr:["If <code>true</code>, applies the <code>govuk-!-width-full</code> class to make the select element take up the full width of its container."]}},{name:"describedBy",category:"Styling and layout",value:"",description:{markdown:!0,arr:["Optional override for the <code>aria-describedby</code> attribute. If not provided, it's automatically generated based on the presence of hint and error messages."]}},{name:"data-testid",category:"Other Attributes",value:"my-select-component",isProp:!1,description:{markdown:!0,arr:["An example of passing additional HTML attributes (like <code>data-testid</code>) which will be spread onto the <code>select</code> element using <code>{...attributes}</code>."]}}])),M=function(e,n,m){return e.map(v=>{let d=m[v.name]??v.value;return v.isEditable===n&&d!=null?typeof d=="object"?JSON.stringify(d,null,2):d:null})},O=D(F(M(a(x),!0,{}))),G=b(()=>({})),f=b(()=>M(a(x),!1,a(G))),H=b(()=>de(a(x),a(O))),U=b(()=>ue(a(x),a(O),a(f))),j=b(()=>Z(a(U),2)),W=b(()=>a(j)[0]),P=b(()=>a(j)[1]),S=F({});X(()=>{a(P).forEach(e=>{S[e]=!0}),Object.keys(S).forEach(e=>{a(P).includes(e)||(S[e]=!1)})});let N=b(()=>Object.fromEntries(Object.entries(a(W)).map(([e,n])=>{var m,v;return[e,typeof n=="function"?(v=(m=a(x).find(d=>d.name===e))==null?void 0:m.functionElements)==null?void 0:v.functionAsString:n]})));var A=Le(),C=g(A);const q=b(()=>({component:{WrapperInformation:Q,WrapperNameAndStatus:z},name:R}));oe(C,{get wrapper(){return a(q)},homepage:!1});var o=u(C,2);se(o,{get parametersParsingErrorsArray(){return a(P)},get parametersParsingErrorsObject(){return S},onCloseFunction:e=>a(P).filter(n=>n!=e)});var r=u(o,2);ie(r,{get Component(){return E},get parametersSourceArray(){return a(x)},get derivedParametersValuesArray(){return a(f)},get parametersVisibleArray(){return a(H)},get parametersParsingErrorsObject(){return S},get copyParametersToClipboardObject(){return a(N)},get demoScreenWidth(){return a(T)},set demoScreenWidth(e){I(T,e,!0)},get statedParametersValuesArray(){return a(O)},set statedParametersValuesArray(e){I(O,e,!0)}});var t=u(r,2),s=i(t);De(s,{}),l(t),c(w,A),J()}const dt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Q,WrapperNameAndStatus:z,default:Ye},Symbol.toStringTag,{value:"Module"}));export{dt as _};
