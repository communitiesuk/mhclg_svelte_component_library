import"./CWj6FrbW.js";import{p as ye,y as C,z as e,G as be,u as Ae,c as o,s as _,t as Y,a as xe,r as n,I as ce,D,f as H,x as je,a9 as _e}from"./BQOcVDnD.js";import{t as c,s as Z,a as i,f as We,c as we}from"./Dp3jeoTR.js";import{p as O,s as qe}from"./Bx8udYmP.js";import{B as Be,d as Fe}from"./kqoadxQb.js";import{W as He,P as Ve,C as Me,B as Ue,a as Re,t as De,c as Ne}from"./JWqNqQUs.js";import{p as ze}from"./D5heuD2C.js";import{k as Ge}from"./lMwbQCpd.js";import{i as R}from"./w59L6Jp2.js";import{e as ke,i as Te}from"./hy64cfae.js";import{s as Le}from"./ByC2DMpr.js";import{s as F,a as Se}from"./CM6Y-JJe.js";import{o as Ke}from"./wh8Qo9IY.js";import{S as Je}from"./R6G2DfxP.js";import"./69_IOA4Y.js";import{i as Qe}from"./B_4Nsh1l.js";import{A as Xe,a as Ye}from"./JE6QcVhM.js";import{C as de}from"./B8qjdm4g.js";import{L as Ze}from"./DG6JX9Mt.js";function $e(d,a,r,m,S){e(a)?e(m).clear():e(r).forEach(V=>e(m).add(V.uniqueid)),ce(S,"off")}var et=(d,a,r)=>a(r().uniqueid),tt=c('<span class="govuk-visually-hidden govuk-accordion__section-heading-divider">,</span> <span class="govuk-accordion__section-summary govuk-body"><span class="govuk-accordion__section-summary-focus"> </span></span>',1),at=c('<button type="button" class="govuk-accordion__section-button"><span class="govuk-accordion__section-heading-text"><span class="govuk-accordion__section-heading-text-focus"> </span></span> <!> <span class="govuk-accordion__section-toggle" data-nosnippet=""><span class="govuk-accordion__section-toggle-focus"><span></span> <span class="govuk-accordion__section-toggle-text"> </span></span></span></button>'),ot=c('<h2 class="govuk-accordion__section-heading"><!></h2>'),nt=c('<h3 class="govuk-accordion__section-heading"><!></h3>'),rt=c('<h4 class="govuk-accordion__section-heading"><!></h4>'),it=c('<h5 class="govuk-accordion__section-heading"><!></h5>'),st=c('<h6 class="govuk-accordion__section-heading"><!></h6>'),lt=c('<p class="govuk-body"> </p>'),ct=c('<div><div class="govuk-accordion__section-header"><!></div> <div class="govuk-accordion__section-content"><!></div></div>'),dt=c('<div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default"><div class="govuk-accordion__controls"><button type="button" class="govuk-accordion__show-all"><span class="govuk-accordion__show-all-text"> </span> <span></span></button></div> <!></div>');function oe(d,a){ye(a,!0);let r=O(a,"sections",19,()=>[]),m=O(a,"hideAllSections",3,"Hide all sections"),S=O(a,"hideSection",3,"Hide"),V=O(a,"hideSectionAriaLabel",3,"Hide this section"),P=O(a,"showAllSections",3,"Show all sections"),N=O(a,"showSection",3,"Show"),I=O(a,"showSectionAriaLabel",3,"Show this section"),$=O(a,"allSectionToggle",3,!0),h=O(a,"minSectionsAllSectionToggle",3,2),b=O(a,"rememberIsExpandedState",3,!0),s=O(a,"headingLevel",3,"h4"),v=C(()=>r().map(t=>{var w;return{...t,uniqueid:t.id+t.heading.slice(1,3)+(((w=t==null?void 0:t.summary)==null?void 0:w.slice(0,2))??"")}})),l=C(()=>new Je(e(v).filter(t=>t.expanded).map(t=>t.uniqueid))),A=C(()=>e(l).size===r().length),W=be("polite");function z(t){e(l).has(t)?e(l).delete(t):e(l).add(t),ce(W,"polite")}Ke(()=>{b()?e(v).forEach(t=>{t.expanded?e(l).add(t.uniqueid):sessionStorage.getItem(t.uniqueid)==="true"&&e(l).add(t.uniqueid)}):e(v).forEach(t=>{t.expanded&&e(l).add(t.uniqueid)})}),Ae(()=>{b()&&e(v).forEach(t=>{sessionStorage.setItem(t.uniqueid,e(l).has(t.uniqueid).toString())})});var y=dt();{const t=(L,u=D,q=D)=>{var f=at();f.__click=[et,z,u];var K=o(f),J=o(K),ge=o(J,!0);n(J),n(K);var ne=_(K,2);{var ve=k=>{var le=tt(),B=_(H(le),2),M=o(B),ee=o(M,!0);n(M),n(B),Y(()=>Z(ee,u().summary)),i(k,le)};R(ne,k=>{u().summary&&k(ve)})}var j=_(ne,2),re=o(j),ie=o(re);let se;var p=_(ie,2),x=o(p,!0);n(p),n(re),n(j),n(f),Y(k=>{F(f,"aria-controls",`${u().uniqueid??""}-content`),F(f,"id",`${u().uniqueid??""}-button`),F(f,"aria-expanded",q()),F(f,"aria-label",`${u().heading??""}, ${(u().summary?u().summary+",":"")??""} ${(q()?V():I())??""}`),Z(ge,u().heading),se=Se(ie,1,"govuk-accordion-nav__chevron",null,se,k),Z(x,q()?S():N())},[()=>({"govuk-accordion-nav__chevron--down":!q()})]),i(L,f)};var E=o(y),U=o(E);U.__click=[$e,A,v,l,W];var G=o(U),ue=o(G,!0);n(G);var g=_(G,2);let w;n(U),n(E);var T=_(E,2);ke(T,17,()=>e(v),Te,(L,u)=>{var q=ct();const f=C(()=>e(l).has(e(u).uniqueid));let K;var J=o(q),ge=o(J);{var ne=p=>{var x=ot(),k=o(x);t(k,()=>e(u),()=>e(f)),n(x),i(p,x)},ve=(p,x)=>{{var k=B=>{var M=nt(),ee=o(M);t(ee,()=>e(u),()=>e(f)),n(M),i(B,M)},le=(B,M)=>{{var ee=Q=>{var te=rt(),pe=o(te);t(pe,()=>e(u),()=>e(f)),n(te),i(Q,te)},Oe=(Q,te)=>{{var pe=X=>{var ae=it(),me=o(ae);t(me,()=>e(u),()=>e(f)),n(ae),i(X,ae)},Pe=(X,ae)=>{{var me=he=>{var fe=st(),Ie=o(fe);t(Ie,()=>e(u),()=>e(f)),n(fe),i(he,fe)};R(X,he=>{s().toLowerCase()=="h6"&&he(me)},ae)}};R(Q,X=>{s().toLowerCase()=="h5"?X(pe):X(Pe,!1)},te)}};R(B,Q=>{s().toLowerCase()=="h4"?Q(ee):Q(Oe,!1)},M)}};R(p,B=>{s().toLowerCase()=="h3"?B(k):B(le,!1)},x)}};R(ge,p=>{s().toLowerCase()=="h2"?p(ne):p(ve,!1)})}n(J);var j=_(J,2),re=o(j);{var ie=p=>{var x=lt(),k=o(x,!0);n(x),Y(()=>Z(k,e(u).content)),i(p,x)},se=p=>{var x=we(),k=H(x);Le(k,()=>e(u).content),i(p,x)};R(re,p=>{typeof e(u).content=="string"?p(ie):p(se,!1)})}n(j),n(q),Y(p=>{K=Se(q,1,"govuk-accordion__section",null,K,p),F(j,"id",`${e(u).uniqueid??""}-content`),F(j,"aria-live",e(W)),j.hidden=!e(f),F(j,"role",e(v).length<6?"region":""),F(j,"aria-labelledby",e(v).length<6?e(u).uniqueid+"-button":"")},[()=>({"govuk-accordion__section--expanded":e(f)})]),i(L,q)}),n(y),Y(L=>{E.hidden=!$()||e(v).length<h(),F(U,"aria-expanded",e(A)),Z(ue,e(A)?m():P()),w=Se(g,1,"govuk-accordion-nav__chevron",null,w,L)},[()=>({"govuk-accordion-nav__chevron--down":!e(A)})])}i(d,y),xe()}We(["click"]);const ut=`
<script>
  import Accordion from '$lib/components/ui/Accordion.svelte';
  import Line from '$lib/components/data-vis/line-chart/Line.svelte';

  const sampleLineData = [
    { x: 0, y: 0 },
    { x: 10, y: 30 },
    { x: 20, y: 10 },
    { x: 30, y: 50 },
  ];

  function simpleLineFunction(dArray) {
    let path = 'M ' + (dArray[0].x * 10) + ' ' + (200 - dArray[0].y * 4);
    for (let i = 1; i < dArray.length; i++) {
      path += ' L ' + (dArray[i].x * 10) + ' ' + (200 - dArray[i].y * 4);
    }
    return path;
  }

  let snippetSections = [
    {
      id: '1',
      heading: 'Section 1',
      content: content1,
    },
    {
      id: '2',
      heading: 'Section 2',
      content: content2,
    },
    {
      id: '3',
      heading: 'Section 3',
      content: content3,
    },
  ];
<\/script>

  {#snippet content1()}
  <p>This is a more complex content for section 1, including <strong>HTML elements</strong>.</p>
  {/snippet}

  {#snippet content2()}
  <p>
    For section 2, you can have <em>even more markup</em> such as lists and headings:
  </p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
  {/snippet}

  {#snippet content3()}
  <p>
    Section 3 snippet: advanced <strong>HTML</strong> or media elements could go here.
  </p>
  <svg viewBox="0 0 300 200" width="300" height="200">
    <Line
      dataArray={sampleLineData}
      xFunction={(val) => val * 10}
      yFunction={(val) => 200 - val * 4}
      lineFunction={simpleLineFunction}
      pathStrokeColor="blue"
      pathStrokeWidth={2}
      includeMarkers={true}
      markerRadius={4}
    />
  </svg>
  {/snippet}

<Accordion sections={snippetSections} />
`,gt=`
<Accordion
  sections={[{
    id: 'example1',
    heading: 'Title One',
    content: 'Some content for the first section.',
  }]}
  allSectionToggle={true}
  minSectionsAllSectionToggle={2}
/>
`,vt=`
<Accordion
  sections={[{
    id: 'example2',
    heading: 'Remember state 1',
    content: 'This section's expansion will be saved in sessionStorage.',
    expanded: true,
  }, {
    id: 'example3',
    heading: 'Remember state 2',
    content: 'Session state is also saved here.',
  }]}
  rememberIsExpandedState={true}
/>
`,pt=`
<Accordion
  sections={[{
    id: 'example4',
    heading: 'Custom Toggle Section',
    summary: 'Showing override for labels',
    content: 'This accordion uses custom hide/show labels.',
  }]}
  minSectionsAllSectionToggle={0}
  hideAllSections="Collapse All"
  hideSection="Collapse"
  showAllSections="Expand All"
  showSection="Expand"
/>`,mt=d=>{var a=yt(),r=H(a),m=o(r);oe(m,{sections:[{id:"example1",heading:"Title One",content:"Some content for the first section."}],allSectionToggle:!0,minSectionsAllSectionToggle:2}),n(r);var S=_(r,2);de(S,{get code(){return gt},language:"svelte"}),i(d,a)},ht=d=>{var a=xt(),r=H(a),m=o(r);oe(m,{sections:[{id:"example2",heading:"Remember state 1",content:"This section's expansion will be saved in sessionStorage.",expanded:!0},{id:"example3",heading:"Remember state 2",content:"Session state is also saved here."}],rememberIsExpandedState:!0}),n(r);var S=_(r,2);de(S,{get code(){return vt},language:"svelte"}),i(d,a)},ft=d=>{var a=At(),r=H(a),m=o(r);oe(m,{sections:[{id:"example4",heading:"Custom Toggle Section",summary:"Showing override for labels",content:"This accordion uses custom hide/show labels."}],minSectionsAllSectionToggle:0,hideAllSections:"Collapse All",hideSection:"Collapse",showAllSections:"Expand All",showSection:"Expand"}),n(r);var S=_(r,2);de(S,{get code(){return pt},language:"svelte"}),i(d,a)},_t=d=>{var a=wt();i(d,a)},St=d=>{var a=kt();je(2),i(d,a)};var bt=c('<div class="p-5 bg-white"><!></div> <!>',1),yt=c('<div class="p-5 bg-white"><!></div> <!>',1),xt=c('<div class="p-5 bg-white"><!></div> <!>',1),At=c('<div class="p-5 bg-white"><!></div> <!>',1),wt=c("<p>This is a more complex content for section 1, including <strong>HTML elements</strong>.</p>"),kt=c("<p>For section 2, you can have <em>even more markup</em> such as lists and headings:</p> <ul><li>List item 1</li> <li>List item 2</li></ul>",1),Tt=c(`<p>Section 3 snippet: advanced <strong>HTML</strong> or media elements could go
    here.</p> <svg viewBox="0 0 300 200" width="300" height="200"><!></svg>`,1),Lt=c('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Ct=c('<span slot="header" class="text-lg"> </span>'),Et=c('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Ot(d,a){ye(a,!1);const r=h=>{var b=bt(),s=H(b),v=o(s);oe(v,{sections:V}),n(s);var l=_(s,2);de(l,{get code(){return ut},language:"svelte"}),i(h,b)},m=h=>{var b=Tt(),s=_(H(b),2),v=o(s);Ze(v,{dataArray:P,xFunction:l=>l*10,yFunction:l=>200-l*4,lineFunction:N,pathStrokeColor:"blue",pathStrokeWidth:2,includeMarkers:!0,markerRadius:4}),n(s),i(h,b)};let S=[{id:"1",heading:"1. Accordion with snippet-based content",content:r},{id:"2",heading:"2. Accordion with minimum sections for toggle",content:mt},{id:"3",heading:"3. Accordion respecting expanded session state",content:ht},{id:"4",heading:"4. Accordion with custom toggle labels",content:ft}],V=[{id:"1",heading:"Section 1",content:_t},{id:"2",heading:"Section 2",content:St},{id:"3",heading:"Section 3",content:m}];const P=[{x:0,y:0},{x:10,y:30},{x:20,y:10},{x:30,y:50}];function N(h){let b="M "+h[0].x*10+" "+(200-h[0].y*4);for(let s=1;s<h.length;s++)b+=" L "+h[s].x*10+" "+(200-h[s].y*4);return b}Qe();var I=Et(),$=_(o(I),2);Xe($,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(h,b)=>{var s=we(),v=H(s);ke(v,1,()=>S,Te,(l,A)=>{Ye(l,{children:(W,z)=>{var y=Lt(),E=o(y);Le(E,()=>e(A).content),n(y),i(W,y)},$$slots:{default:!0,header:(W,z)=>{var y=Ct(),E=o(y,!0);n(y),Y(()=>Z(E,e(A).heading)),i(W,y)}}})}),i(h,s)},$$slots:{default:!0}}),n(I),i(d,I),xe()}const Ce=(d,a=D,r=D,m=D,S=D)=>{Be(d,{get name(){return a()},get folder(){return r()},get subFolder(){return m()},get homepage(){return S()},statusObject:Pt,parentFolder:"components-update"})},Ee=(d,a=D)=>{Ue(d,{get homepage(){return a()},detailsArray:Wt,connectedComponentsArray:qt})};let Pt={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!0},visibleOnHompepage:!1},{obj:{Reviewed:!0,Tested:!1},visibleOnHomepage:!1}]},It=["An expandable and collapsible section component that allows users to show and hide content.",'Based on the <a href="https://design-system.service.gov.uk/components/accordion/" target="_blank" rel="noopener noreferrer">GOV.UK Design System accordion component</a> pattern.'],jt=["Use the accordion component to let users show and hide sections of related content on a page.","Only use an accordion if there is evidence it is helpful for users."],Wt=[{label:"Description",arr:It,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:jt,visibleOnHomepage:!1,markdown:!0}],qt=[];var Bt=c('<div class="px-5"><!></div>'),Ft=c('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Ht(d,a){ye(a,!0);const r=g=>{var T=Bt(),t=o(T);oe(t,qe(()=>e(v))),n(T),i(g,T)};let m=ze.url.pathname.split("/"),S=Ge(m[m.length-1]),V=be(_e(Fe.md)),P=C(()=>Re([{name:"sections",category:"Content",value:[{id:"1",heading:"Writing well for the web",summary:"Learn about writing content for your website",content:"This is the content for Writing well for the web.",expanded:!0},{id:"2",heading:"Writing well for specialists",summary:"Guidance for writing technical content",content:"This is the content for Writing well for specialists.",expanded:!1},{id:"3",heading:"Know your audience",summary:"Understanding who your users are",content:"This is the content for Know your audience."}]},{name:"headingLevel",category:"Content",value:"h4"},{name:"hideAllSections",category:"UI Toggle Labels",value:"Hide all sections"},{name:"hideSection",category:"UI Toggle Labels",value:"Hide"},{name:"hideSectionAriaLabel",category:"UI Toggle Labels",value:"Hide this section"},{name:"showAllSections",category:"UI Toggle Labels",value:"Show all sections"},{name:"showSection",category:"UI Toggle Labels",value:"Show"},{name:"showSectionAriaLabel",category:"UI Toggle Labels",value:"Show this section"},{name:"allSectionToggle",category:"Accordion Toggle Options",value:!0},{name:"minSectionsAllSectionToggle",category:"Accordion Toggle Options",value:2},{name:"rememberIsExpandedState",category:"Accordion Toggle Options",value:!0}])),N=function(g,T,t){return g.map(w=>{let L=t[w.name]??w.value;return w.isEditable===T&&L!=null?typeof L=="object"?JSON.stringify(L,null,2):L:null})},I=be(_e(N(e(P),!0,{}))),$=C(()=>({})),h=C(()=>N(e(P),!1,e($))),b=C(()=>De(e(P),e(I))),s=C(()=>Ne(e(P),e(I),e(h))),v=C(()=>e(s)[0]),l=C(()=>e(s)[1]),A=_e({});Ae(()=>{e(l).forEach(g=>{A[g]=!0}),Object.keys(A).forEach(g=>{e(l).includes(g)||(A[g]=!1)})});let W=C(()=>Object.fromEntries(Object.entries(e(v)).map(([g,T])=>{var t,w;return[g,typeof T=="function"?(w=(t=e(P).find(L=>L.name===g))==null?void 0:t.functionElements)==null?void 0:w.functionAsString:T]})));var z=Ft(),y=H(z);He(y,{wrapper:{component:{WrapperInformation:Ee,WrapperNameAndStatus:Ce},name:S},homepage:!1});var E=_(y,2);Ve(E,{get parametersParsingErrorsArray(){return e(l)},get parametersParsingErrorsObject(){return A},onCloseFunction:g=>e(l).filter(T=>T!=g)});var U=_(E,2);Me(U,{Component:r,get parametersSourceArray(){return e(P)},get derivedParametersValuesArray(){return e(h)},get parametersVisibleArray(){return e(b)},get parametersParsingErrorsObject(){return A},get copyParametersToClipboardObject(){return e(W)},get demoScreenWidth(){return e(V)},set demoScreenWidth(g){ce(V,g,!0)},get statedParametersValuesArray(){return e(I)},set statedParametersValuesArray(g){ce(I,g,!0)}});var G=_(U,2),ue=o(G);Ot(ue,{}),n(G),i(d,z),xe()}const na=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Ee,WrapperNameAndStatus:Ce,default:Ht},Symbol.toStringTag,{value:"Module"}));export{na as _};
