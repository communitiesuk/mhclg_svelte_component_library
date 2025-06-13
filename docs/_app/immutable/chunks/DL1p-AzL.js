import"./CWj6FrbW.js";import{p as K,G as D,f as m,s as n,a as z,c as i,r as l,I as G,z as r,t as L,D as V,a9 as F,y as x,u as X}from"./BQOcVDnD.js";import{t as u,c as Z,a as d,s as Y}from"./Dp3jeoTR.js";import{s as ee}from"./Bx8udYmP.js";import{B as te,d as ae}from"./D6uVBQnT.js";import{W as re,P as oe,C as se,B as ie,a as le,t as ne,c as de}from"./Byzigwih.js";import{p as ce}from"./D9-BLNeQ.js";import{k as ue}from"./lMwbQCpd.js";import{S as v}from"./CnmdaPo8.js";import{e as pe,i as me}from"./hy64cfae.js";import{s as ve}from"./ByC2DMpr.js";import{A as ge,a as be}from"./DlNGJXaH.js";import"./69_IOA4Y.js";import{C as h}from"./B8qjdm4g.js";const he=`
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
`,fe=`
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
`,ye=`
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
`,we=`
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
`,_e=`
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
`,ke=`
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
`,Oe=`
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
`;var Pe=u('<div class="p-5 bg-white"><!></div> <!>',1),Ae=u('<div class="p-5 bg-white"><!></div> <!>',1),Ee=u('<div class="p-5 bg-white"><!></div> <!>',1),Ce=u('<div class="p-5 bg-white"><!></div> <!>',1),Re=u('<div class="p-5 bg-white"><!></div> <!>',1),Be=u('<div class="p-5 bg-white"><!></div> <!>',1),Ve=u('<div class="p-5 bg-white"><!></div> <!>',1),$e=u('<div class="p-5 bg-white"><div id="extra-description" class="govuk-body-s govuk-!-margin-bottom-1">This text provides extra context.</div> <!></div> <!>',1),Te=u('<div class="p-5 bg-white"><div class="govuk-body mb-2"><p>Selected value (bound): <code class="bg-gray-200 p-1 rounded"> </code></p></div> <!></div> <!>',1),Me=u('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),We=u('<span slot="header" class="text-lg"> </span>'),je=u('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ie(y,w){K(w,!0);const E=s=>{var a=Pe(),e=m(a),t=i(e);v(t,{id:"sort-basic",name:"sort-basic",items:g}),l(e);var o=n(e,2);h(o,{get code(){return he},language:"svelte"}),d(s,a)},_=s=>{var a=Ae(),e=m(a),t=i(e);v(t,{id:"sort-default",name:"sort-default",label:"Sort by (Default Value - with Placeholder)",items:M}),l(e);var o=n(e,2);h(o,{get code(){return fe},language:"svelte"}),d(s,a)},C=s=>{var a=Ee(),e=m(a),t=i(e);v(t,{id:"sort-hint",name:"sort-hint",label:"Sort by",hint:"Choose the order items are displayed in.",items:g,value:"updated"}),l(e);var o=n(e,2);h(o,{get code(){return xe},language:"svelte"}),d(s,a)},$=s=>{var a=Ce(),e=m(a),t=i(e);v(t,{id:"sort-error",name:"sort-error",label:"Sort by",error:"You must select a sort option.",items:U,value:""}),l(e);var o=n(e,2);h(o,{get code(){return ye},language:"svelte"}),d(s,a)},R=s=>{var a=Re(),e=m(a),t=i(e);v(t,{id:"sort-heading-full",name:"sort-heading-full",label:"Sort results by",labelIsPageHeading:!0,fullWidth:!0,items:g,value:"updated"}),l(e);var o=n(e,2);h(o,{get code(){return we},language:"svelte"}),d(s,a)},f=s=>{var a=Be(),e=m(a),t=i(e);v(t,{id:"sort-disabled",name:"sort-disabled",label:"Sort by (with disabled option)",items:W,value:"published"}),l(e);var o=n(e,2);h(o,{get code(){return Se},language:"svelte"}),d(s,a)},T=s=>{var a=Ve(),e=m(a),t=i(e);v(t,{id:"sort-validation",name:"sort-validation",label:"Select (with validation)",hint:"Try selecting the disallowed option.",items:O,value:"",validate:N}),l(e);var o=n(e,2);h(o,{get code(){return _e},language:"svelte"}),d(s,a)},k=s=>{var a=$e(),e=m(a),t=n(i(e),2);v(t,{id:"sort-extra-props",name:"sort-extra-props",label:"Select with extra props",items:S,value:"beta",formGroupClasses:"my-custom-form-group another-class",describedBy:"extra-description","data-custom-attribute":"example-value"}),l(e);var o=n(e,2);h(o,{get code(){return ke},language:"svelte"}),d(s,a)},H=s=>{var a=Te(),e=m(a),t=i(e),o=i(t),c=n(i(o)),p=i(c,!0);l(c),l(o),l(t);var q=n(t,2);v(q,{id:"sort-bind",name:"sort-bind",label:"Sort by (bind:value)",items:g,get value(){return r(P)},set value(B){G(P,B,!0)}}),l(e);var b=n(e,2);h(b,{get code(){return Oe},language:"svelte"}),L(()=>Y(p,r(P))),d(s,a)};let g=[{value:"published",text:"Recently published"},{value:"updated",text:"Recently updated"},{value:"views",text:"Most views"},{value:"comments",text:"Most comments"}],U=[{value:"",text:"Please select"},...g],M=[{value:"",text:"Please select"},...g],W=[{value:"published",text:"Recently published"},{value:"updated",text:"Recently updated",disabled:!0},{value:"views",text:"Most views"},{value:"comments",text:"Most comments"}],O=[{value:"",text:"Please select"},{value:"allowed",text:"Allowed Option"},{value:"disallowed",text:"Disallowed Option (Client Validation)"},{value:"other",text:"Other Option"}],S=[{value:"alpha",text:"Alpha"},{value:"beta",text:"Beta"},{value:"gamma",text:"Gamma"}];function N(s){if(!s)return"You must select an option.";if(s==="disallowed")return"This option is not permitted."}let j=[{id:"1",heading:"1. Minimum required usage",content:E},{id:"2",heading:"2. Default value selection (with placeholder)",content:_},{id:"3",heading:"3. With hint text",content:C},{id:"4",heading:"4. With server-side error message",content:$},{id:"5",heading:"5. As page heading and full width",content:R},{id:"6",heading:"6. With a disabled option",content:f},{id:"7",heading:"7. With client-side validation",content:T},{id:"8",heading:"8. With other props (formGroupClasses, describedBy, attributes)",content:k},{id:"9",heading:"9. Using bind:value",content:H}],P=D("updated");var A=je(),I=n(i(A),2);ge(I,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(s,a)=>{var e=Z(),t=m(e);pe(t,17,()=>j,me,(o,c)=>{be(o,{children:(p,q)=>{var b=Me(),B=i(b);ve(B,()=>r(c).content),l(b),d(p,b)},$$slots:{default:!0,header:(p,q)=>{var b=We(),B=i(b,!0);l(b),L(()=>Y(B,r(c).heading)),d(p,b)}}})}),d(s,e)},$$slots:{default:!0}}),l(A),d(y,A),z()}const J=(y,w=V,E=V,_=V,C=V)=>{te(y,{get name(){return w()},get folder(){return E()},get subFolder(){return _()},get homepage(){return C()},statusObject:De,parentFolder:"components-update"})},Q=(y,w=V)=>{ie(y,{get homepage(){return w()},detailsArray:Ue,connectedComponentsArray:Ne})};let De={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!0},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ge=["Renders a standard HTML <code>select</code> dropdown component styled according to the GOV.UK Design System.",'Based on the <a href="https://design-system.service.gov.uk/components/select/" target="_blank" rel="noopener noreferrer">GOV.UK Design System Select component</a>.'],He=["Use this component when you need to ask users to select one option from a predefined list.","GOV.UK recommends avoiding select components for multiple selections due to usability and accessibility issues. Use checkboxes instead for multi-select scenarios.",'Be aware of <a href="https://design-system.service.gov.uk/components/select/#research-on-this-component" target="_blank" rel="noopener noreferrer">known usability issues</a> with select components, especially on smaller devices. Consider alternatives like radios if appropriate.'],Ue=[{label:"Description",arr:Ge,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:He,visibleOnHomepage:!1,markdown:!0}],Ne=[];var qe=u('<div class="p-8"><!></div>'),Fe=u('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Le(y,w){K(w,!0);const E=e=>{var t=qe(),o=i(t);v(o,ee(()=>r(W),{get value(){return r(R)},set value(c){G(R,c,!0)}})),l(t),d(e,t)};let _=ce.url.pathname.split("/"),C=ue(_[_.length-1]),$=D(F(ae.md)),R=D("govuk-2"),f=x(()=>le([{name:"id",category:"Core attributes",isRequired:!0,value:"select-example",description:{markdown:!0,arr:["The ID attribute for the <code>select</code> element. Used to link the label and hint/error messages."]}},{name:"name",category:"Core attributes",isRequired:!0,value:"select-example-name",description:{markdown:!0,arr:["The name attribute for the <code>select</code> element, submitted with form data."]}},{name:"items",category:"Core attributes",isRequired:!0,isEditable:!0,value:[{value:"govuk-1",text:"Option 1"},{value:"govuk-2",text:"Option 2"},{value:"govuk-3",text:"Option 3",disabled:!0},{value:"govuk-4",text:"Option 4"}],description:{markdown:!0,arr:["An array of objects defining the options for the dropdown. Each object should have:","<code>value</code>: The value attribute for the option.","<code>text</code>: The text displayed for the option.","<code>disabled</code> (optional): Set to <code>true</code> to disable the option."]}},{name:"value",category:"Core attributes",isBinded:!0,value:r(R),options:["govuk-1","govuk-2","govuk-4"],description:{markdown:!0,arr:["The value of the currently selected option. Use <code>bind:value</code> to enable two-way data binding.","This prop is bound using <code>bind:value</code> in this demo."]}},{name:"label",category:"Label and hints",isRequired:!1,value:"Select an option",description:{markdown:!0,arr:["The text for the <code>label</code> element associated with the select."]}},{name:"labelIsPageHeading",category:"Label and hints",value:!1,description:{markdown:!0,arr:["If <code>true</code>, wraps the label in an <code>h1</code> element and applies larger heading styles."]}},{name:"hint",category:"Label and hints",value:"This is a hint to help the user.",description:{markdown:!0,arr:["Optional hint text displayed below the label."]},rows:2},{name:"error",category:"Error handling",value:"",description:{markdown:!0,arr:["Optional error message string. If present, indicates a server-side error and displays this message (unless overridden by client-side validation)."]},rows:2},{name:"validate",category:"Error handling",propType:"fixed",value(e){if(e==null||e==="")return"Please make a selection (client-side).";if(e==="govuk-1")return"Option 1 is not allowed (client-side)."},functionElements:{functionAsString:`function (value) {
  if (value === undefined || value === null || value === "") {
    return "Please make a selection (client-side).";
  }
  if (value === "govuk-1") {
    return "Option 1 is not allowed (client-side).";
  }
  return undefined; // No error
}`},description:{markdown:!0,arr:["A client-side validation function <code>(value) => string | undefined</code>.","Receives the current selected value and should return an error message string if invalid, or <code>undefined</code> if valid."]}},{name:"formGroupClasses",category:"Styling and layout",value:"extra-form-group-class",description:{markdown:!0,arr:["Optional additional CSS classes to apply to the wrapping <code>govuk-form-group</code> div."]}},{name:"fullWidth",category:"Styling and layout",value:!1,description:{markdown:!0,arr:["If <code>true</code>, applies the <code>govuk-!-width-full</code> class to make the select element take up the full width of its container."]}},{name:"describedBy",category:"Styling and layout",value:"",description:{markdown:!0,arr:["Optional override for the <code>aria-describedby</code> attribute. If not provided, it's automatically generated based on the presence of hint and error messages."]}},{name:"data-testid",category:"Other Attributes",value:"my-select-component",isProp:!1,description:{markdown:!0,arr:["An example of passing additional HTML attributes (like <code>data-testid</code>) which will be spread onto the <code>select</code> element using <code>{...attributes}</code>."]}}])),T=function(e,t,o){return e.map(c=>{let p=o[c.name]??c.value;return c.isEditable===t&&p!=null?typeof p=="object"?JSON.stringify(p,null,2):p:null})},k=D(F(T(r(f),!0,{}))),H=x(()=>({})),g=x(()=>T(r(f),!1,r(H))),U=x(()=>ne(r(f),r(k))),M=x(()=>de(r(f),r(k),r(g))),W=x(()=>r(M)[0]),O=x(()=>r(M)[1]),S=F({});X(()=>{r(O).forEach(e=>{S[e]=!0}),Object.keys(S).forEach(e=>{r(O).includes(e)||(S[e]=!1)})});let N=x(()=>Object.fromEntries(Object.entries(r(W)).map(([e,t])=>{var o,c;return[e,typeof t=="function"?(c=(o=r(f).find(p=>p.name===e))==null?void 0:o.functionElements)==null?void 0:c.functionAsString:t]})));var j=Fe(),P=m(j);re(P,{wrapper:{component:{WrapperInformation:Q,WrapperNameAndStatus:J},name:C},homepage:!1});var A=n(P,2);oe(A,{get parametersParsingErrorsArray(){return r(O)},get parametersParsingErrorsObject(){return S},onCloseFunction:e=>r(O).filter(t=>t!=e)});var I=n(A,2);se(I,{Component:E,get parametersSourceArray(){return r(f)},get derivedParametersValuesArray(){return r(g)},get parametersVisibleArray(){return r(U)},get parametersParsingErrorsObject(){return S},get copyParametersToClipboardObject(){return r(N)},get demoScreenWidth(){return r($)},set demoScreenWidth(e){G($,e,!0)},get statedParametersValuesArray(){return r(k)},set statedParametersValuesArray(e){G(k,e,!0)}});var s=n(I,2),a=i(s);Ie(a,{}),l(s),d(y,j),z()}const lt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Q,WrapperNameAndStatus:J,default:Le},Symbol.toStringTag,{value:"Module"}));export{lt as _};
