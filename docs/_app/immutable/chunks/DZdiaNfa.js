import"./CWj6FrbW.js";import{p as Y,f as _,s,a as Z,c as a,r,y as X,J as j,I as $,F as e,t as D,C as K,ab as H,u as ne,G as O,ac as ie}from"./DAeYpASc.js";import{f as m,c as Q,a as c}from"./BAP9DKun.js";import{i as z}from"./BRrZqxBe.js";import{W as le,P as ce,C as ue,B as de,a as pe,t as me,c as he,k as ge}from"./D9YvIc1u.js";import{b as ve}from"./BYRFjNIU.js";import{s as fe}from"./CDnlRnBP.js";import{a as be,B as ye,d as _e}from"./FLOBqqeq.js";import{p as we}from"./CMjediXt.js";import{k as Se}from"./DLSzT-Iv.js";import{S as A}from"./ReB-LZpF.js";import{s as M}from"./oN6NPT6s.js";import{s as Ae}from"./5CLvz9iT.js";import{e as ke,i as xe}from"./DtT6GxuX.js";import{A as Ee,a as Ce}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{e as Oe}from"./BfRbetfY.js";import{C as k}from"./ip80KjXp.js";const Pe=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Type a fruit..."
/>`,Be=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  source_url="https://api.postcodes.io/postcodes"
  source_key="result" // Assumes results are under 'result' key
  source_property="postcode"
  placeholder="Enter postcode query..."
  minLength={1}
  tNoResults={() => "No matching postcodes found"}
/>`,Te=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={['Alpha', 'Beta', 'Gamma', 'Delta']}
  minLength={1}
  placeholder="Start typing (min 1)..."
/>`,Ue=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={['X', 'Y', 'Z']}
  tNoResults={() => 'Sorry, no matches found'}
/>`,Ne=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={[
    { label: 'Apple', value: 'fruit_a' },
    { label: 'Banana', value: 'fruit_b' },
    { label: 'Cherry', value: 'fruit_c' },
  ]}
  placeholder="Select a fruit object..."
/>`,Ve=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={[
    { label: "London", value: "london", region: "A large city in England" },
    { label: "Birmingham", value: "birmingham", region: "England" },
    { label: "Manchester", value: "manchester", region: "England" },
    { label: "Edinburgh", value: "edinburgh", region: "Scotland" },
    { label: "Glasgow", value: "glasgow", region: "Scotland" },
    { label: "Cardiff", value: "cardiff", region: "Wales" },
    { label: "Swansea", value: "swansea", region: "Wales" },
    { label: "Belfast", value: "belfast", region: "Northern Ireland" },
  ]}
  groupKey="region"
  placeholder="Search UK cities..."
  label_text="Select a UK city"
/>`,Ie=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  source_url="https://api.zippopotam.us/us"
  source_key="places"
  source_property="place name"
  pathBasedApi={true}
  placeholder="Enter a US zip code (e.g., 90210, 10001)..."
  label_text="Search US locations by zip code"
  minLength={5}
  hint="Uses Zippopotam.us RESTful API - enter a 5-digit zip code"
/>

<!-- 
  pathBasedApi={true} constructs URLs like:
  https://api.zippopotam.us/us/90210
  
  Instead of query parameter URLs like:
  https://api.zippopotam.us/us?q=90210
-->`,qe=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={[
    { label: "London", value: "london", region: "England" },
    { label: "Birmingham", value: "birmingham", region: "England" },
    { label: "Manchester", value: "manchester", region: "England" },
    { label: "Edinburgh", value: "edinburgh", region: "Scotland" },
  ]}
  source_url="https://www.gov.uk/api/search.json?suggest=autocomplete"
  source_key="suggested_autocomplete"
  groupKey="region"
  placeholder="Type a city name or search term..."
  label_text="Search cities or GOV.UK content"
  minLength={3}
/>

<!-- Example sourceSelector function (not used in this example):
  sourceSelector={(query, options) => {
    // If input has 3+ chars and contains a digit, use API (postcode search)
    // Otherwise use local options
    return query.length >= 3 && /\\d/.test(query) ? 'api' : 'options';
  }}
-->`,je=`
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
<\/script>

<SearchAutocomplete
  options={['One', 'Two', 'Three']}
  defaultValue="Two"
  confirmOnBlur={true}
  placeholder="Confirm on blur..."
/>`,Le=`
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';

  let demoSelectedAutocompleteValue: string | null = $state(null); // Initialise as null
<\/script>

<div class="mt-4">
  <SearchAutocomplete
    label_text="Select a country"
    options={[
      { label: "United States of America", value: "USA" },
      { label: "Canada", value: "CAN" },
      { label: "Mexico", value: "MEX" },
      { label: "United Kingdom", value: "GBR" },
    ]}
    bind:selectedValue={demoSelectedAutocompleteValue}
    placeholder="Start typing a country name..."
  />
</div>

{#if demoSelectedAutocompleteValue !== null}
  <p class="govuk-body mt-4">
    Confirmed selected value: {demoSelectedAutocompleteValue}
  </p>
{:else}
   <p class="govuk-body mt-4 text-gray-500">
    No value selected yet.
  </p>
{/if}
`,Re=`
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
  let { form } = $props(); // Accept form prop from parent (form request processed by server +page.server.ts)
<\/script>

<form method="POST" class="govuk-form-group">
  <SearchAutocomplete
    name="search"
    options={[
      { label: "United States of America", value: "USA" },
      { label: "Canada", value: "CAN" },
      { label: "Mexico", value: "MEX" },
    ]}
    placeholder="Search countries..."
  />
  <p class="govuk-body mt-4">
    <strong>Note:</strong> submitting this form will trigger a page refresh...
  </p>
</form>
{#if form?.search}
  <div
    class="govuk-notification-banner govuk-notification-banner--success mt-4"
    role="region"
    aria-labelledby="submission-success"
  >
    <h2 class="govuk-notification-banner__title" id="submission-success">
      Search submitted
    </h2>
    <p class="govuk-notification-banner__content">
      You searched for: <strong>{form.search}</strong>
    </p>
  </div>
{/if}
`,Fe=`
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
  import { enhance } from '$app/forms';

  let searchValue: string = $state("");
  let showSuccessBanner: boolean = $state(false);

  let { form } = $props(); // Accept form prop from parent (form request processed by server +page.server.ts)
<\/script>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // bind to selectedValue prop
    searchValue = searchValue;
    showSuccessBanner = true;
    // Prevent server submission
    cancel();
  }}
  // alternatively could still allow server submission to handle data processing and use "use:enhance" to just prevent the default refresh behaviour
  class="govuk-form-group"
>
  <SearchAutocomplete
    name="search"
    options={[
      { label: "United States of America", value: "USA" },
      { label: "Canada", value: "CAN" },
      { label: "Mexico", value: "MEX" },
    ]}
    placeholder="Search countries (client-side handling)..."
  />
  <!-- icon button inside SearchAutocomplete handles submission -->
</form>

{#if showSuccessBanner}
  <div
    class="govuk-notification-banner govuk-notification-banner--success mt-4"
    role="alert" 
    aria-labelledby="enhance-success-title"
  >
    <h2 class="govuk-notification-banner__title" id="enhance-success-title">
      Client-side Search Handled
    </h2>
    <div class="govuk-notification-banner__content">
      <p>You searched for: <strong>{searchValue}</strong></p>
    </div>
  </div>
{/if}
{#if form?.search}
  <div
    class="govuk-notification-banner govuk-notification-banner--success mt-4"
    role="region"
    aria-labelledby="submission-success"
  >
    <h2 class="govuk-notification-banner__title" id="submission-success">
      Search submitted
    </h2>
    <p class="govuk-notification-banner__content">
      You searched for: <strong>{form.search}</strong>
    </p>
  </div>
{/if}
`,De=n=>{var o=Xe(),t=_(o),i=a(t);A(i,{options:["Apple","Banana","Cherry","Date","Elderberry"],placeholder:"Type a fruit..."}),r(t);var u=s(t,2);k(u,{get code(){return Pe},language:"svelte"}),c(n,o)},$e=n=>{var o=Ye(),t=_(o),i=a(t);A(i,{source_url:"https://api.postcodes.io/postcodes",source_key:"result",source_property:"postcode",placeholder:"Enter postcode query...",minLength:1,tNoResults:()=>"No matching postcodes found"}),r(t);var u=s(t,2);k(u,{get code(){return Be},language:"svelte"}),c(n,o)},Me=n=>{var o=Ze(),t=_(o),i=a(t);A(i,{options:["Alpha","Beta","Gamma","Delta"],minLength:1,placeholder:"Start typing (min 1)..."}),r(t);var u=s(t,2);k(u,{get code(){return Te},language:"svelte"}),c(n,o)},Ke=n=>{var o=Qe(),t=_(o),i=a(t);A(i,{options:["X","Y","Z"],tNoResults:()=>"Sorry, no matches found"}),r(t);var u=s(t,2);k(u,{get code(){return Ue},language:"svelte"}),c(n,o)},ze=n=>{var o=et(),t=_(o),i=a(t);A(i,{options:[{label:"Apple",value:"fruit_a"},{label:"Banana",value:"fruit_b"},{label:"Cherry",value:"fruit_c"}],placeholder:"Select a fruit object..."}),r(t);var u=s(t,2);k(u,{get code(){return Ne},language:"svelte"}),c(n,o)},We=n=>{var o=tt(),t=_(o),i=a(t);A(i,{options:[{label:"London",value:"london",region:" A large city in England"},{label:"Birmingham",value:"birmingham",region:"England"},{label:"Manchester",value:"manchester",region:"England"},{label:"Edinburgh",value:"edinburgh",region:"Scotland"},{label:"Glasgow",value:"glasgow",region:"Scotland"},{label:"Cardiff",value:"cardiff",region:"Wales"},{label:"Swansea",value:"swansea",region:"Wales"},{label:"Belfast",value:"belfast",region:"Northern Ireland"}],groupKey:"region",placeholder:"Search UK cities...",label_text:"Select a UK city"}),r(t);var u=s(t,2);k(u,{get code(){return Ve},language:"svelte"}),c(n,o)},Ge=n=>{var o=ot(),t=_(o),i=a(t);A(i,{source_url:"https://api.zippopotam.us/us",source_key:"places",source_property:"place name",pathBasedApi:!0,placeholder:"Enter a US zip code (e.g., 90210, 10001)...",label_text:"Search US locations by zip code",minLength:5,hint:"Uses Zippopotam.us RESTful API - enter a 5-digit zip code"});var u=s(i,2),P=s(a(u));P.textContent="pathBasedApi=true",X(5),r(u),r(t);var U=s(t,2);k(U,{get code(){return Ie},language:"svelte"}),c(n,o)},Je=n=>{var o=at(),t=_(o),i=a(t);A(i,{options:[{label:"London",value:"london",region:"England"},{label:"Birmingham",value:"birmingham",region:"England"},{label:"Manchester",value:"manchester",region:"England"},{label:"Edinburgh",value:"edinburgh",region:"Scotland"}],source_url:"https://www.gov.uk/api/search.json?suggest=autocomplete",source_key:"suggested_autocomplete",groupKey:"region",placeholder:"Type a city name or search term...",label_text:"Search cities or GOV.UK content",minLength:3}),X(2),r(t);var u=s(t,2);k(u,{get code(){return qe},language:"svelte"}),c(n,o)},He=n=>{var o=rt(),t=_(o),i=a(t);A(i,{options:["One","Two","Three"],defaultValue:"Two",confirmOnBlur:!0,placeholder:"Confirm on blur..."}),r(t);var u=s(t,2);k(u,{get code(){return je},language:"svelte"}),c(n,o)};var Xe=m('<div class="p-5 bg-white"><!></div> <!>',1),Ye=m('<div class="p-5 bg-white"><!></div> <!>',1),Ze=m('<div class="p-5 bg-white"><!></div> <!>',1),Qe=m('<div class="p-5 bg-white"><!></div> <!>',1),et=m('<div class="p-5 bg-white"><!></div> <!>',1),tt=m('<div class="p-5 bg-white"><!></div> <!>',1),ot=m(`<div class="p-5 bg-white"><!> <p class="govuk-body mt-2 text-sm text-gray-600">This example demonstrates <code></code> for RESTful
      APIs like Zippopotam.us that expect URLs like <code>/us/90210</code> instead of <code>/us?q=90210</code>.</p></div> <!>`,1),at=m(`<div class="p-5 bg-white"><!> <p class="govuk-body mt-2 text-sm text-gray-600">This example shows both local options and API configuration. Since no <code>sourceSelector</code> function is provided, it will use the local options (since they're available)
      as the primary source. To enable dynamic switching, you would need to provide
      a <code>sourceSelector</code> function.</p></div> <!>`,1),rt=m('<div class="p-5 bg-white"><!></div> <!>',1),st=m('<p class="govuk-body mt-4"> </p>'),nt=m('<p class="govuk-body mt-4 text-gray-500">No value selected yet.</p>'),it=m('<div class="p-5 bg-white"><div class="mt-4"><!></div> <!></div> <!>',1),lt=m('<div class="govuk-notification-banner govuk-notification-banner--success mt-4" role="region" aria-labelledby="submission-success"><h2 class="govuk-notification-banner__title" id="submission-success">Search submitted</h2> <p class="govuk-notification-banner__content">You searched for: <strong> </strong></p></div>'),ct=m(`<div class="p-5 bg-white"><form method="POST" class="govuk-form-group"><!> <p class="govuk-body mt-4"><strong>Note:</strong> submitting this form will trigger a page refresh,
        come back to this section to see if this submission worked and we retrieve
        the value searched from the server. This ensures that the component will
        submit without JavaScript on a fully progressively enhancened site (our site
        isn't fully progressively enhanced yet so the examples accordian won't render
        without JS).</p></form> <!></div> <!>`,1),ut=m('<div class="govuk-notification-banner govuk-notification-banner--success mt-4" role="alert" aria-labelledby="enhance-success-title"><h2 class="govuk-notification-banner__title" id="enhance-success-title">Client-side Search Handled</h2> <div class="govuk-notification-banner__content"><p>You searched for: <strong> </strong></p></div></div>'),dt=m('<div class="govuk-notification-banner govuk-notification-banner--success mt-4" role="region" aria-labelledby="submission-success"><h2 class="govuk-notification-banner__title" id="submission-success">Search submitted</h2> <p class="govuk-notification-banner__content">You searched for: <strong> </strong></p></div>'),pt=m('<div class="p-5 bg-white"><form method="POST" class="govuk-form-group"><!></form> <!> <!></div> <!>',1),mt=m('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),ht=m('<span slot="header" class="text-lg"> </span>'),gt=m('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function vt(n,o){Y(o,!0);const t=B=>{var E=it(),b=_(E),f=a(b),l=a(f);A(l,{label_text:"Select a country",options:[{label:"United States of America",value:"USA"},{label:"Canada",value:"CAN"},{label:"Mexico",value:"MEX"},{label:"United Kingdom",value:"GBR"}],placeholder:"Start typing a country name...",get selectedValue(){return e(x)},set selectedValue(d){j(x,d,!0)}}),r(f);var w=s(f,2);{var y=d=>{var p=st(),h=a(p);r(p),D(()=>M(h,`Confirmed selected value: ${e(x)??""}`)),c(d,p)},T=d=>{var p=nt();c(d,p)};z(w,d=>{e(x)!==null?d(y):d(T,!1)})}r(b);var v=s(b,2);k(v,{get code(){return Le},language:"svelte"}),c(B,E)},i=B=>{var E=ct(),b=_(E),f=a(b),l=a(f);A(l,{name:"search",options:[{label:"United States of America",value:"USA"},{label:"Canada",value:"CAN"},{label:"Mexico",value:"MEX"}],placeholder:"Search countries..."}),X(2),r(f);var w=s(f,2);{var y=v=>{var d=lt(),p=s(a(d),2),h=s(a(p)),S=a(h,!0);r(h),r(p),r(d),D(()=>M(S,o.form.search)),c(v,d)};z(w,v=>{var d;(d=o.form)!=null&&d.search&&v(y)})}r(b);var T=s(b,2);k(T,{get code(){return Re},language:"svelte"}),c(B,E)},u=B=>{var E=pt(),b=_(E),f=a(b),l=a(f);A(l,{name:"search",options:[{label:"United States of America",value:"USA"},{label:"Canada",value:"CAN"},{label:"Mexico",value:"MEX"}],placeholder:"Search countries (client-side handling)...",get selectedValue(){return e(P)},set selectedValue(p){j(P,p,!0)}}),r(f),be(f,(p,h)=>{var S;return(S=Oe)==null?void 0:S(p,h)},()=>({formData:p,cancel:h})=>{j(P,e(P),!0),j(U,!0),h()});var w=s(f,2);{var y=p=>{var h=ut(),S=s(a(h),2),V=a(S),L=s(a(V)),g=a(L,!0);r(L),r(V),r(S),r(h),D(()=>M(g,e(P))),c(p,h)};z(w,p=>{e(U)&&p(y)})}var T=s(w,2);{var v=p=>{var h=dt(),S=s(a(h),2),V=s(a(S)),L=a(V,!0);r(V),r(S),r(h),D(()=>M(L,o.form.search)),c(p,h)};z(T,p=>{var h;(h=o.form)!=null&&h.search&&p(v)})}r(b);var d=s(b,2);k(d,{get code(){return Fe},language:"svelte"}),c(B,E)};let P=$(""),U=$(!1),x=$(null),W=[{id:"1",heading:"1. Local options list",content:De},{id:"2",heading:"2. Remote API source",content:$e},{id:"3",heading:"3. Custom minLength & placeholder",content:Me},{id:"4",heading:"4. Custom 'no results' text",content:Ke},{id:"5",heading:"5. Options as objects",content:ze},{id:"6",heading:"6. Options with grouping",content:We},{id:"7",heading:"7. RESTful Path-based API",content:Ge},{id:"8",heading:"8. Dynamic source selection",content:Je},{id:"9",heading:"9. Behaviour (Default & Confirm)",content:He},{id:"10",heading:"10. With Selected Value Binding",content:t},{id:"11",heading:"11. Used Inside a Form for progressive enhancement",content:i},{id:"12",heading:"12. Using enhance for Progressive Enhancement",content:u}];var N=gt(),J=s(a(N),2);Ee(J,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(B,E)=>{var b=Q(),f=_(b);ke(f,17,()=>W,xe,(l,w)=>{Ce(l,{children:(y,T)=>{var v=mt(),d=a(v);Ae(d,()=>e(w).content),r(v),c(y,v)},$$slots:{default:!0,header:(y,T)=>{var v=ht(),d=a(v,!0);r(v),D(()=>M(d,e(w).heading)),c(y,v)}}})}),c(B,b)},$$slots:{default:!0}}),r(N),c(n,N),Z()}const ee=(n,o=K,t=K,i=K,u=K)=>{ye(n,{get name(){return o()},get folder(){return t()},get subFolder(){return i()},get homepage(){return u()},get statusObject(){return ft},parentFolder:"components-update"})},te=(n,o=K)=>{de(n,{get homepage(){return o()},get detailsArray(){return _t},get connectedComponentsArray(){return wt}})};let ft={progress:"In progress",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!0},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},bt=["A search box that provides autocomplete suggestions as the user types.",'Based on the <a href="https://components.publishing.service.gov.uk/component-guide/search_with_autocomplete" target="_blank" rel="noopener noreferrer">GOV.UK Publishing Components search with autocomplete box</a>.','Uses the <a href="https://github.com/alphagov/accessible-autocomplete" target="_blank" rel="noopener noreferrer">accessible-autocomplete</a> library.'],yt=['The component should ideally be used within an HTML <code>&lt;form&gt;</code> to allow standard form submission (works with or without JavaScript). Consider giving the form <code>role="search"</code> for accessibility.',"For client-side handling (e.g., in Single Page Applications where a full form submission isn't desired), you can use the <code>bind:selectedValue</code> prop to reactively get the confirmed selection without submitting the form.","Use when you want to help users find specific items by suggesting results from a predefined list or API endpoint as they type. Requires setting up either <code>options</code> or <code>source_url</code>/<code>source_key</code>."],_t=[{label:"Description",arr:bt,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:yt,visibleOnHomepage:!1,markdown:!0}],wt=[{label:"Parent Component",visibleOnHomepage:!1,arr:[{name:"Search",folder:"ui"}]}];var St=m("<p class=\"text-red-600 font-bold\">Error: Please provide both `source_url` and `source_key` props in the\n        'Autocomplete' category below.</p>"),At=m('<div class="p-8"><!></div>'),kt=m('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function xt(n,o){Y(o,!0);const t=g=>{var C=At();const R=O(()=>e(l).homepage||e(l).on_govuk_blue?"#1d70b8":"#fff");var I=a(C);{var q=F=>{var G=Q(),ae=_(G);ge(ae,()=>[e(l).source_url,e(l).source_key,e(l).minLength,e(l).confirmOnBlur,e(l).showNoOptionsFound,e(l).defaultValue,e(l).placeholder,e(l).required,JSON.stringify(e(l).menuAttributes),e(l).menuClasses,JSON.stringify(e(l).options)].join("|"),re=>{A(re,fe(()=>e(l),{get selectedValue(){return e(U)},set selectedValue(se){j(U,se,!0)}}))}),c(F,G)},oe=F=>{var G=St();c(F,G)};z(I,F=>{e(l).source_url&&e(l).source_key?F(q):F(oe,!1)})}r(C),D(()=>ve(C,`background-color: ${e(R)??""};`)),c(g,C)};let i=we.url.pathname.split("/"),u=Se(i[i.length-1]),P=$(H(_e.md)),U=$(""),x=O(()=>pe([{name:"options",category:"Autocomplete",isEditable:!0,value:[],description:{markdown:!0,arr:["An array of suggestion strings or objects with <code>{ label: string, value: any }</code> to use instead of an API endpoint.","If this prop is provided with a non-empty array, it will be used as the suggestion source instead of <code>source_url</code> and <code>source_key</code>.",'Example (strings): <code>["Apple", "Banana", "Cherry"]</code>','Example (objects, requires valid JSON in input): <code>[ { "label": "Aberdeen City", "value": "S12000033" }, { "label": "Aberdeenshire", "value": "S12000034" }, ... ]</code>','For grouping: Objects can include additional properties (e.g., <code>{ "label": "London", "value": "london", "region": "England" }</code>) that can be used with the <code>groupKey</code> prop to display group information.']}},{name:"source_url",category:"Autocomplete",value:"https://www.gov.uk/api/search.json?suggest=autocomplete",description:{markdown:!0,arr:["Required. The URL endpoint that the component will query to fetch autocomplete suggestions.","The query parameter will be appended automatically (e.g., <code>/api/suggestions?q=user_input</code>).","The endpoint should return JSON."]},rows:1,isRequired:!0},{name:"source_key",category:"Autocomplete",value:"suggested_autocomplete",description:{markdown:!0,arr:["Required. The key within the JSON response from <code>source_url</code> that contains the array of suggestion strings."]},rows:1,isRequired:!0},{name:"source_property",category:"Autocomplete",value:"",description:{markdown:!0,arr:["Optional. Specifies the property name within the fetched JSON objects to use as the primary suggestion label. Useful when the API response doesn't use 'label' or 'postcode'.","If left empty or the property is not found, the component falls back to checking for 'label', then 'postcode'.",'Example: If your API returns <code>[{ "name": "London", ... }]</code>, set this to <code>"name"</code>.']},rows:1,isRequired:!1},{name:"pathBasedApi",category:"Autocomplete",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> for RESTful APIs that expect the query as part of the URL path instead of query parameters.","When <code>true</code>: constructs URLs like <code>https://api.example.com/search/london</code>","When <code>false</code> (default): constructs URLs like <code>https://api.example.com/search?q=london</code>","Use <code>true</code> for APIs like Zippopotam.us that use path-based routing."]}},{name:"groupKey",category:"Autocomplete",value:"",description:{markdown:!0,arr:["Optional. Specifies which attribute in your options contains group information for displaying groups as muted text next to the option label.","Only works when using the <code>options</code> prop with object-based suggestions.",'Example: If your options are <code>[{ "label": "London", "region": "England" }]</code>, set this to <code>"region"</code> to show "England" as muted text next to "London".',"Leave empty to disable grouping."]},rows:1,isRequired:!1},{name:"sourceSelector",category:"Autocomplete",value:()=>null,propType:"fixed",functionElements:{functionAsString:`// Example function (not active to prevent interference with demo UI):
  // (query, options) => {
  //   // If input has 3+ chars and contains a digit, use API (postcode search)
  //   // Otherwise use local options
  //   return query.length >= 3 && /\\d/.test(query) ? 'api' : 'options'; }`},description:{markdown:!0,arr:["Optional. Function to dynamically determine whether to use the API source or options source based on the user's input.","The function receives <code>(query: string, options: Suggestion[])</code> and should return <code>'api'</code> or <code>'options'</code>.","Example use case: Use API for postcode-like inputs (3+ chars with digits), otherwise use local options.","Currently set to a dummy function that doesn't affect behavior. Replace with actual logic as needed.","See the example function code below for implementation reference."]}},{name:"minLength",category:"Autocomplete",value:3,description:{markdown:!0,arr:["The minimum number of characters the user must type before suggestions appear. Defaults to 3.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"confirmOnBlur",category:"Autocomplete",value:!1,description:{markdown:!0,arr:["If <code>true</code>, selecting a suggestion happens when the user blurs the input. If <code>false</code> (default), the user must press Enter or click a suggestion.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"showNoOptionsFound",category:"Autocomplete",value:!0,description:{markdown:!0,arr:['If <code>true</code> (default), displays a "No results found" message when the query yields no suggestions.','From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"defaultValue",category:"Autocomplete",value:"",description:{markdown:!0,arr:["Sets the initial value of the input field when the component loads.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']},rows:1},{name:"placeholder",category:"Autocomplete",value:"",description:{markdown:!0,arr:["Sets the placeholder text for the input field. Defaults to empty string.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']},rows:1},{name:"required",category:"Autocomplete",value:!1,description:{markdown:!0,arr:["Adds the <code>required</code> attribute to the input field. Defaults to <code>false</code>.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"tNoResults",category:"Autocomplete Text Customisation",value:()=>"No results found",propType:"fixed",functionElements:{functionAsString:'() => "No results found"'},description:{markdown:!0,arr:["Function that returns the text to display when no results are found.","Default: <code>() => 'No results found'</code>",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"tAssistiveHint",category:"Autocomplete Text Customisation",value:()=>"When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.",propType:"fixed",functionElements:{functionAsString:'() => "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures."'},description:{markdown:!0,arr:["Function that returns the text for the assistive hint (hidden text read by screen readers).",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']}},{name:"menuAttributes",category:"Autocomplete Styling & Attributes",value:{},description:{markdown:!0,arr:["An object containing attributes to add to the suggestions menu <code>&lt;ul&gt;</code> element. Provide as a JSON object.",'Example: <code>{"data-testid": "my-menu"}</code>','From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']},rows:3},{name:"menuClasses",category:"Autocomplete Styling & Attributes",value:"",description:{markdown:!0,arr:["Optional string of CSS classes to add to the suggestions menu <code>&lt;ul&gt;</code> element. Defaults to <code>null</code>.",'From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.']},rows:1},{name:"label_text",category:"Content",value:"Search GOV.UK",description:{markdown:!0,arr:["The text content for the <code>label</code> element. Allows HTML.","Note: Autocomplete component always uses a separate label (not inline)."]},rows:1},{name:"selectedValue",category:"Content",isBinded:!0,value:e(U),description:{markdown:!0,arr:["The current value of the search input field. Can be bound to reactively get the confirmed selection without submitting a form.","Shows the <code>label</code> of the selected suggestion by default <strong>unless</strong> a <code>value</code> for the option was also parsed with the label intially as an object."]}},{name:"button_text",category:"Content",value:"Search",description:{markdown:!0,arr:['Sets the visually hidden text content for the submit button, read by screen readers. Defaults to "Search".']},rows:1},{name:"name",category:"Content",value:"q",description:{markdown:!0,arr:['Sets the <code>name</code> attribute for the search input field. Defaults to "q".']},rows:1,isRequired:!0},{name:"hint",category:"Content",value:"Try 'benefits' or 'driving'",description:{markdown:!0,arr:["Optional hint text displayed below the label (if not ongovuk_blue or homepage).","Note: Autocomplete functionality does not directly use this hint."]},rows:2},{name:"on_govuk_blue",category:"Styling",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> to apply styling for use on a dark blue (<code>#003078</code>) background."]}},{name:"homepage",category:"Styling",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> to apply specific styling for homepage use (e.g., large size, different button colors). This automatically applies the necessary styles for a dark blue background, effectively incorporating the behaviour of <code>on_govuk_blue: true</code>."]}},{name:"size",category:"Styling",options:["","large"],value:"",description:{markdown:!0,arr:["Sets the size variant. Leave empty for default, or set to <code>large</code>."]}},{name:"label_size",category:"Styling",options:["","s","m","l","xl"],value:"",description:{markdown:!0,arr:["Sets the size of the label text using GOV.UK typography classes. Options: <code>s</code>, <code>m</code>, <code>l</code>, <code>xl</code>."]}},{name:"label_margin_bottom",category:"Styling",options:[null,0,1,2,3,4,5,6,7,8,9],value:null,description:{markdown:!0,arr:["Sets the bottom margin for the label using the GOV.UK spacing scale (0-9)."]}},{name:"label_custom_class",category:"Styling",value:"",description:{markdown:!0,arr:["Adds a custom CSS class to the label element."]},rows:1},{name:"input_width",category:"Styling",options:["","full","three-quarters","two-thirds","one-half","one-third","one-quarter"],value:"",description:{markdown:!0,arr:["Sets the maximum width of the entire search component using GOV.UK Frontend utility classes (e.g., <code>govuk-!-width-two-thirds</code>). The input and button will fill this width. Leave empty for default (stretches to fit its parent container)."]}},{name:"button_background_color",category:"Styling",value:"",description:{markdown:!0,arr:["Sets a custom background color for the search submit button using a valid CSS color value (e.g., <code>#ff0000</code>).","<strong>Note:</strong> This custom color will be overridden by the default styles if <code>on_govuk_blue</code> or <code>homepage</code> props are set to <code>true</code>."]},rows:1},{name:"outerClasses",category:"Styling",value:"",description:{markdown:!0,arr:["Optional. Adds custom CSS classes to the outermost wrapping <code>div</code> element of the autocomplete component."]},rows:1},{name:"wrap_label_in_a_heading",category:"Accessibility & Attributes",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> to wrap the label content within a heading tag."]}},{name:"heading_level",category:"Accessibility & Attributes",options:[1,2,3,4,5,6],value:2,description:{markdown:!0,arr:["Sets the heading level (1-6) if <code>wrap_label_in_a_heading</code> is <code>true</code>. Defaults to 2."]},visible:{name:"wrap_label_in_a_heading",value:!0}},{name:"label_id",category:"Accessibility & Attributes",value:"",description:{markdown:!0,arr:["Sets the <code>id</code> attribute for the input field and the <code>for</code> attribute of the label. If left empty, a unique ID will be generated."]},rows:1},{name:"aria_controls",category:"Accessibility & Attributes",value:"",description:{markdown:!0,arr:["Sets the <code>aria-controls</code> attribute on the input field, pointing to the ID of the element whose content is controlled by the search.","Note: accessible-autocomplete might add its own aria attributes."]},rows:1},{name:"disable_corrections",category:"Accessibility & Attributes",value:!1,description:{markdown:!0,arr:['Set to <code>true</code> to disable mobile browser autocorrect and autocapitalization features on the input field by adding <code>autocorrect="off"</code> and <code>autocapitalize="off"</code>.']}},{name:"id",category:"Accessibility & Attributes",value:"",description:{markdown:!0,arr:["Sets the <code>id</code> attribute on the outermost wrapping <code>div</code> element."]},rows:1},{name:"outerDataAttributes",category:"Accessibility & Attributes",value:{},description:{markdown:!0,arr:['Adds custom <code>data-*</code> attributes to the outermost wrapping <code>div</code> element. Provide as a JSON object. Note: <code>data-module="gem-search-with-autocomplete"</code> is added by the component.']},rows:5},{name:"aria",category:"Accessibility & Attributes",value:{},description:{markdown:!0,arr:['Adds custom <code>aria-*</code> attributes to the outermost wrapping <code>div</code> element. Provide as a JSON object (e.g., <code>{"labelledby": "element-id"}</code>).']},rows:5},{name:"role",category:"Accessibility & Attributes",value:"",description:{markdown:!0,arr:['Sets the <code>role</code> attribute on the outermost wrapping <code>div</code> element. Consider using <code>role="search"</code> on the parent <code>form</code> element instead.']},rows:1},{name:"lang",category:"Accessibility & Attributes",value:"",description:{markdown:!0,arr:["Sets the language (<code>lang</code> attribute) for the component."]},rows:1},{name:"dir",category:"Accessibility & Attributes",options:["","ltr","rtl","auto"],value:"",description:{markdown:!0,arr:["Sets the text direction (<code>dir</code> attribute) for the component. Empty string means default behavior."]}}])),W=function(g,C,R){return g.map(I=>{let q=R[I.name]??I.value;return I.isEditable===C&&q!=null?typeof q=="object"?JSON.stringify(q,null,2):q:null})},N=$(H(W(e(x),!0,{}))),J=O(()=>({})),B=O(()=>W(e(x),!1,e(J))),E=O(()=>me(e(x),e(N))),b=O(()=>he(e(x),e(N),e(B))),f=O(()=>ie(e(b),2)),l=O(()=>e(f)[0]),w=O(()=>e(f)[1]),y=H({});ne(()=>{e(w).forEach(g=>{y[g]=!0}),Object.keys(y).forEach(g=>{e(w).includes(g)||(y[g]=!1)})});let T=O(()=>Object.fromEntries(Object.entries(e(l)).map(([g,C])=>{var R,I;return[g,typeof C=="function"?(I=(R=e(x).find(q=>q.name===g))==null?void 0:R.functionElements)==null?void 0:I.functionAsString:C]})));var v=kt(),d=_(v);const p=O(()=>({component:{WrapperInformation:te,WrapperNameAndStatus:ee},name:u}));le(d,{get wrapper(){return e(p)},homepage:!1});var h=s(d,2);ce(h,{get parametersParsingErrorsArray(){return e(w)},get parametersParsingErrorsObject(){return y},onCloseFunction:g=>e(w).filter(C=>C!=g)});var S=s(h,2);ue(S,{get Component(){return t},get parametersSourceArray(){return e(x)},get derivedParametersValuesArray(){return e(B)},get parametersVisibleArray(){return e(E)},get parametersParsingErrorsObject(){return y},get copyParametersToClipboardObject(){return e(T)},get demoScreenWidth(){return e(P)},set demoScreenWidth(g){j(P,g,!0)},get statedParametersValuesArray(){return e(N)},set statedParametersValuesArray(g){j(N,g,!0)}});var V=s(S,2),L=a(V);vt(L,{get form(){return o.form}}),r(V),c(n,v),Z()}const Kt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:te,WrapperNameAndStatus:ee,default:xt},Symbol.toStringTag,{value:"Module"}));export{Kt as _};
