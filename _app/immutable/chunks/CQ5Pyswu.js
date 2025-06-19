import"./CWj6FrbW.js";import{p as L,f as v,s as g,a as R,c as d,r as l,z as J,t as K,y as a,D as N,I as D,ab as E,u as M,J as U,G as m,ac as Q}from"./I52qY7cu.js";import{f as c,c as X,a as s}from"./BBh-6AA0.js";import{s as Z}from"./BHp14Q1u.js";import{B as ee,d as te}from"./DImQRQIn.js";import{W as ae,P as ne,C as re,B as oe,a as ie,t as se,c as ce}from"./pjHBbLSa.js";import{p as de}from"./D7CmsDtu.js";import{k as le}from"./lMwbQCpd.js";import{N as h}from"./Df9-8L6b.js";import"./69_IOA4Y.js";import{s as pe}from"./5F35P8og.js";import{s as ue}from"./BvNl7SXi.js";import{e as me,i as ge}from"./n63ZiD1W.js";import{i as ve}from"./MVh4sFtc.js";import{A as fe,a as he}from"./DFHrQqYn.js";import{C}from"./BN7FUiX4.js";const be=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
<\/script>

<NotificationBanner
  type="neutral"
  content="There may be a delay in processing your application because of the coronavirus outbreak."
/>
`,ye=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
<\/script>

<NotificationBanner
  type="neutral"
  content="You have 7 days left to send your application."
  linkText="View application"
  linkHref="#"
/>
`,_e=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
<\/script>

<NotificationBanner
  type="outcome"
  content="Your details have been updated."
/>
`,ke=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
<\/script>

<NotificationBanner
  type="outcome"
  additionalContentHeading="Training outcome recorded and trainee withdrawn"
  content="Contact example@department.gov.uk if you think there's a problem."
/>
`,we=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";

  {#snippet ContentSnippet()}
    <p class="govuk-notification-banner__heading">Service update</p>
    <p class="govuk-body">
      We are experiencing high demand. Please check <a href="#" class="govuk-notification-banner__link">status page</a> or try again later.
    </p>
  {/snippet}
<\/script>

<NotificationBanner type="neutral" content={ContentSnippet} />
`,Ce=`
<script>
  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
<\/script>

<NotificationBanner
  type="outcome"
  title="Update Complete"
  titleHeadingLevel="h3"
  additionalContentHeading="Optional Details"
  additionalContentHeadingLevel="h4"
  content="Your profile was updated successfully."
/>
`,xe=n=>{var t=Pe(),e=v(t),r=d(e);h(r,{type:"neutral",content:"There may be a delay in processing your application because of the coronavirus outbreak."}),l(e);var o=g(e,2);C(o,{get code(){return be},language:"svelte"}),s(n,t)},Be=n=>{var t=$e(),e=v(t),r=d(e);h(r,{type:"neutral",content:"You have 7 days left to send your application.",linkText:"View application",linkHref:"#"}),l(e);var o=g(e,2);C(o,{get code(){return ye},language:"svelte"}),s(n,t)},Ae=n=>{var t=Ee(),e=v(t),r=d(e);h(r,{type:"outcome",content:"Your details have been updated."}),l(e);var o=g(e,2);C(o,{get code(){return _e},language:"svelte"}),s(n,t)},Oe=n=>{var t=je(),e=v(t),r=d(e);h(r,{type:"outcome",additionalContentHeading:"Training outcome recorded and trainee withdrawn",content:"Contact example@department.gov.uk if you think there's a problem."}),l(e);var o=g(e,2);C(o,{get code(){return ke},language:"svelte"}),s(n,t)},Ne=n=>{var t=Te();J(2),s(n,t)},Se=n=>{var t=Ie(),e=v(t),r=d(e);h(r,{type:"neutral",get content(){return Ne}}),l(e);var o=g(e,2);C(o,{get code(){return we},language:"svelte"}),s(n,t)},He=n=>{var t=Ve(),e=v(t),r=d(e);h(r,{type:"outcome",title:"Update Complete",titleHeadingLevel:"h3",additionalContentHeading:"Optional Details",additionalContentHeadingLevel:"h4",content:"Your profile was updated successfully."}),l(e);var o=g(e,2);C(o,{get code(){return Ce},language:"svelte"}),s(n,t)};var Pe=c('<div class="p-5 bg-white"><!></div> <!>',1),$e=c('<div class="p-5 bg-white"><!></div> <!>',1),Ee=c('<div class="p-5 bg-white"><!></div> <!>',1),je=c('<div class="p-5 bg-white"><!></div> <!>',1),Te=c('<p class="govuk-notification-banner__heading">Service update</p> <p class="govuk-body">We are experiencing high demand. Please check <a href="#" class="govuk-notification-banner__link">status page</a> or try again later.</p>',1),Ie=c('<div class="p-5 bg-white"><!></div> <!>',1),Ve=c('<div class="p-5 bg-white"><!></div> <!>',1),We=c('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),De=c('<span slot="header" class="text-lg"> </span>'),Ue=c('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Le(n,t){L(t,!1);let e=[{id:"1",heading:"1. Neutral banner with string content",content:xe},{id:"2",heading:"2. Neutral banner with string content and link",content:Be},{id:"3",heading:"3. Outcome (success) banner with string content",content:Ae},{id:"4",heading:"4. Outcome banner with heading and body content",content:Oe},{id:"5",heading:"5. Neutral banner with snippet content",content:Se},{id:"6",heading:"6. Outcome banner with custom title (H3) and content heading (H4)",content:He}];ve();var r=Ue(),o=g(d(r),2);fe(o,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(S,f)=>{var x=X(),b=v(x);me(b,1,()=>e,ge,(P,B)=>{he(P,{children:(A,$)=>{var p=We(),y=d(p);ue(y,()=>a(B).content),l(p),s(A,p)},$$slots:{default:!0,header:(A,$)=>{var p=De(),y=d(p,!0);l(p),K(()=>pe(y,a(B).heading)),s(A,p)}}})}),s(S,x)},$$slots:{default:!0}}),l(r),s(n,r),R()}const Y=(n,t=N,e=N,r=N,o=N)=>{ee(n,{get name(){return t()},get folder(){return e()},get subFolder(){return r()},get homepage(){return o()},get statusObject(){return Re},parentFolder:"components-update"})},q=(n,t=N)=>{oe(n,{get homepage(){return t()},get detailsArray(){return Fe},get connectedComponentsArray(){return ze}})};let Re={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!0},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Ye=["Use the notification banner component to tell the user about something they need to know about, but that's not directly related to the page content.",'Based on the <a href="https://design-system.service.gov.uk/components/notification-banner/" target="_blank" rel="noopener noreferrer">GOV.UK Design System notification banner component</a>.'],qe=["Use the 'neutral' type for general information (e.g., service delays, upcoming deadlines).","Use the 'outcome' type (green banner) with role='alert' to confirm a user action has succeeded.","Avoid showing more than one banner per page."],Fe=[{label:"Description",arr:Ye,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:qe,visibleOnHomepage:!1,markdown:!0}],ze=[];var Ge=c('<div class="p-8"><!></div>'),Je=c('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ke(n,t){L(t,!0);const e=i=>{var u=Ge(),_=d(u);h(_,Z(()=>a(y))),l(u),s(i,u)};let r=de.url.pathname.split("/"),o=le(r[r.length-1]),S=D(E(te.md)),f=m(()=>ie([{name:"type",category:"Appearance",options:["neutral","outcome"],value:"neutral",description:{markdown:!0,arr:["Determines the banner style. 'neutral' is blue, 'outcome' is green (success)."]}},{name:"title",category:"Content",value:"",description:{markdown:!0,arr:['Overrides the default title text (e.g., "Important" for neutral, "Success" for outcome). Leave blank to use default.']},rows:1},{name:"titleHeadingLevel",category:"Accessibility",options:["h1","h2","h3","h4","h5","h6"],value:"h2",description:{markdown:!0,arr:["Sets the semantic heading level for the banner title."]}},{name:"content",category:"Content",isRequired:!0,value:"There may be a delay in processing your application because of the coronavirus outbreak.",description:{markdown:!0,arr:["The main content. Can be a string or a Svelte Snippet.",'If using as a string with <code>additionalContentHeading</code>, this content will be wrapped in a <code>&lt;p class="govuk-body"&gt;</code>.','If used as a string *without* <code>additionalContentHeading</code>, it will be wrapped in a <code>&lt;p class="govuk-notification-banner__heading"&gt;</code>.',"Snippets are rendered directly. See examples for snippet usage."]},rows:3},{name:"additionalContentHeading",category:"Content",value:"",description:{markdown:!0,arr:['Optional heading rendered as an <code>&lt;h3 class="govuk-notification-banner__heading"&gt;</code>.',"<strong>Use this when you also want to provide separate body text via the <code>content</code> prop.</strong>",'When this is set, the <code>content</code> prop (if a string) will be rendered as body text (<code>&lt;p class="govuk-body"&gt;</code>).','If this prop is omitted, the <code>content</code> prop (if a string) is rendered as the primary heading (<code>&lt;p class="govuk-notification-banner__heading"&gt;</code>).']},rows:1},{name:"additionalContentHeadingLevel",category:"Accessibility",options:["h3","h4","h5","h6"],value:"h3",description:{markdown:!0,arr:["Sets the semantic heading level (h3-h6) for the <code>additionalContentHeading</code>.","Only visible/relevant if <code>additionalContentHeading</code> is provided."]}},{name:"linkText",category:"Content",value:"",description:{markdown:!0,arr:["Optional text for a link rendered after the heading element (unless content is a snippet without an <code>additionalContentHeading</code>).","<strong>Requires <code>linkHref</code>.</strong>"]},rows:1},{name:"linkHref",category:"Content",value:"",description:{markdown:!0,arr:["Optional URL for the link.","<strong>Requires <code>linkText</code>.</strong>"]},rows:1},{name:"titleId",category:"Accessibility",value:"govuk-notification-banner-title",propType:"fixed",description:{markdown:!0,arr:["Sets the ID for the title element, used by `aria-labelledby`."]}}])),x=function(i,u,_){return i.map(k=>{let w=_[k.name]??k.value;return k.isEditable===u&&w!=null?typeof w=="object"?JSON.stringify(w,null,2):w:null})},b=D(E(x(a(f),!0,{}))),P=m(()=>({})),B=m(()=>x(a(f),!1,a(P))),A=m(()=>se(a(f),a(b))),$=m(()=>ce(a(f),a(b),a(B))),p=m(()=>Q(a($),2)),y=m(()=>a(p)[0]),H=m(()=>a(p)[1]),O=E({});M(()=>{a(H).forEach(i=>{O[i]=!0}),Object.keys(O).forEach(i=>{a(H).includes(i)||(O[i]=!1)})});let F=m(()=>Object.fromEntries(Object.entries(a(y)).map(([i,u])=>{var _,k;return[i,typeof u=="function"?(k=(_=a(f).find(w=>w.name===i))==null?void 0:_.functionElements)==null?void 0:k.functionAsString:u]})));var j=Je(),T=v(j);const z=m(()=>({component:{WrapperInformation:q,WrapperNameAndStatus:Y},name:o}));ae(T,{get wrapper(){return a(z)},homepage:!1});var I=g(T,2);ne(I,{get parametersParsingErrorsArray(){return a(H)},get parametersParsingErrorsObject(){return O},onCloseFunction:i=>a(H).filter(u=>u!=i)});var V=g(I,2);re(V,{get Component(){return e},get parametersSourceArray(){return a(f)},get derivedParametersValuesArray(){return a(B)},get parametersVisibleArray(){return a(A)},get parametersParsingErrorsObject(){return O},get copyParametersToClipboardObject(){return a(F)},get demoScreenWidth(){return a(S)},set demoScreenWidth(i){U(S,i,!0)},get statedParametersValuesArray(){return a(b)},set statedParametersValuesArray(i){U(b,i,!0)}});var W=g(V,2),G=d(W);Le(G,{}),l(W),s(n,j),R()}const ut=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:q,WrapperNameAndStatus:Y,default:Ke},Symbol.toStringTag,{value:"Module"}));export{ut as _};
