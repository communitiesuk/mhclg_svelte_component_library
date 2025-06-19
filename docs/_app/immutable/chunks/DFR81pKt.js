import"./CWj6FrbW.js";import{p as ye,u as Ae,G as w,I as be,c as o,s as S,t as J,y as e,a as xe,r as n,J as ce,D as M,f as B,z as je,ab as _e,ac as We}from"./I52qY7cu.js";import{f as c,a as s,c as we}from"./BBh-6AA0.js";import{p as O,s as qe}from"./BHp14Q1u.js";import{B as Be,d as Fe}from"./DImQRQIn.js";import{W as He,P as Ve,C as Me,B as Ue,a as Re,t as De,c as Ne}from"./pjHBbLSa.js";import{p as ze}from"./D7CmsDtu.js";import{k as Ge}from"./lMwbQCpd.js";import{o as Ke}from"./CUqUSu4U.js";import{s as Q,d as Je}from"./5F35P8og.js";import{i as V}from"./HAye_oo1.js";import{e as ke,i as Te}from"./n63ZiD1W.js";import{s as Le}from"./BvNl7SXi.js";import{a as q,s as Se}from"./vwgBT8YE.js";import{S as Qe}from"./CY7It5Zd.js";import"./69_IOA4Y.js";import{i as Xe}from"./MVh4sFtc.js";import{A as Ye,a as Ze}from"./DFHrQqYn.js";import{C as de}from"./BN7FUiX4.js";import{L as $e}from"./BzA6VxcV.js";function et(d,a,i,p,b){e(a)?e(p).clear():e(i).forEach(F=>e(p).add(F.uniqueid)),ce(b,"off")}var tt=(d,a,i)=>a(i().uniqueid),at=c('<span class="govuk-visually-hidden govuk-accordion__section-heading-divider">,</span> <span class="govuk-accordion__section-summary govuk-body"><span class="govuk-accordion__section-summary-focus"> </span></span>',1),ot=c('<button type="button" class="govuk-accordion__section-button"><span class="govuk-accordion__section-heading-text"><span class="govuk-accordion__section-heading-text-focus"> </span></span> <!> <span class="govuk-accordion__section-toggle" data-nosnippet=""><span class="govuk-accordion__section-toggle-focus"><span></span> <span class="govuk-accordion__section-toggle-text"> </span></span></span></button>'),nt=c('<h2 class="govuk-accordion__section-heading"><!></h2>'),rt=c('<h3 class="govuk-accordion__section-heading"><!></h3>'),it=c('<h4 class="govuk-accordion__section-heading"><!></h4>'),st=c('<h5 class="govuk-accordion__section-heading"><!></h5>'),lt=c('<h6 class="govuk-accordion__section-heading"><!></h6>'),ct=c('<p class="govuk-body"> </p>'),dt=c('<div><div class="govuk-accordion__section-header"><!></div> <div class="govuk-accordion__section-content"><!></div></div>'),ut=c('<div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default"><div class="govuk-accordion__controls"><button type="button" class="govuk-accordion__show-all"><span class="govuk-accordion__show-all-text"> </span> <span></span></button></div> <!></div>');function te(d,a){ye(a,!0);let i=O(a,"sections",19,()=>[]),p=O(a,"hideAllSections",3,"Hide all sections"),b=O(a,"hideSection",3,"Hide"),F=O(a,"hideSectionAriaLabel",3,"Hide this section"),P=O(a,"showAllSections",3,"Show all sections"),U=O(a,"showSection",3,"Show"),I=O(a,"showSectionAriaLabel",3,"Show this section"),X=O(a,"allSectionToggle",3,!0),h=O(a,"minSectionsAllSectionToggle",3,2),y=O(a,"rememberIsExpandedState",3,!0),l=O(a,"headingLevel",3,"h4"),g=w(()=>i().map(t=>{var m;return{...t,uniqueid:t.id+t.heading.slice(1,3)+(((m=t==null?void 0:t.summary)==null?void 0:m.slice(0,2))??"")}})),u=w(()=>new Qe(e(g).filter(t=>t.expanded).map(t=>t.uniqueid))),L=w(()=>e(u).size===i().length),k=be("polite");function Y(t){e(u).has(t)?e(u).delete(t):e(u).add(t),ce(k,"polite")}Ke(()=>{y()?e(g).forEach(t=>{t.expanded?e(u).add(t.uniqueid):sessionStorage.getItem(t.uniqueid)==="true"&&e(u).add(t.uniqueid)}):e(g).forEach(t=>{t.expanded&&e(u).add(t.uniqueid)})}),Ae(()=>{y()&&e(g).forEach(t=>{sessionStorage.setItem(t.uniqueid,e(u).has(t.uniqueid).toString())})});var x=ut();{const t=(C,r=M,f=M)=>{var _=ot();_.__click=[tt,Y,r];var N=o(_),z=o(N),ge=o(z,!0);n(z),n(N);var ne=S(N,2);{var ve=T=>{var le=at(),W=S(B(le),2),H=o(W),Z=o(H,!0);n(H),n(W),J(()=>Q(Z,r().summary)),s(T,le)};V(ne,T=>{r().summary&&T(ve)})}var j=S(ne,2),re=o(j),ie=o(re);let se;var v=S(ie,2),A=o(v,!0);n(v),n(re),n(j),n(_),J(T=>{q(_,"aria-controls",`${r().uniqueid??""}-content`),q(_,"id",`${r().uniqueid??""}-button`),q(_,"aria-expanded",f()),q(_,"aria-label",`${r().heading??""}, ${r().summary?r().summary+",":""} ${(f()?F():I())??""}`),Q(ge,r().heading),se=Se(ie,1,"govuk-accordion-nav__chevron",null,se,T),Q(A,f()?b():U())},[()=>({"govuk-accordion-nav__chevron--down":!f()})]),s(C,_)};var E=o(x),R=o(E);R.__click=[et,L,g,u,k];var D=o(R),ae=o(D,!0);n(D);var oe=S(D,2);let m;n(R),n(E);var ue=S(E,2);ke(ue,17,()=>e(g),Te,(C,r)=>{var f=dt();const _=w(()=>e(u).has(e(r).uniqueid));let N;var z=o(f),ge=o(z);{var ne=v=>{var A=nt(),T=o(A);t(T,()=>e(r),()=>e(_)),n(A),s(v,A)},ve=(v,A)=>{{var T=W=>{var H=rt(),Z=o(H);t(Z,()=>e(r),()=>e(_)),n(H),s(W,H)},le=(W,H)=>{{var Z=G=>{var $=it(),pe=o($);t(pe,()=>e(r),()=>e(_)),n($),s(G,$)},Oe=(G,$)=>{{var pe=K=>{var ee=st(),me=o(ee);t(me,()=>e(r),()=>e(_)),n(ee),s(K,ee)},Pe=(K,ee)=>{{var me=he=>{var fe=lt(),Ie=o(fe);t(Ie,()=>e(r),()=>e(_)),n(fe),s(he,fe)};V(K,he=>{l().toLowerCase()=="h6"&&he(me)},ee)}};V(G,K=>{l().toLowerCase()=="h5"?K(pe):K(Pe,!1)},$)}};V(W,G=>{l().toLowerCase()=="h4"?G(Z):G(Oe,!1)},H)}};V(v,W=>{l().toLowerCase()=="h3"?W(T):W(le,!1)},A)}};V(ge,v=>{l().toLowerCase()=="h2"?v(ne):v(ve,!1)})}n(z);var j=S(z,2),re=o(j);{var ie=v=>{var A=ct(),T=o(A,!0);n(A),J(()=>Q(T,e(r).content)),s(v,A)},se=v=>{var A=we(),T=B(A);Le(T,()=>e(r).content),s(v,A)};V(re,v=>{typeof e(r).content=="string"?v(ie):v(se,!1)})}n(j),n(f),J(v=>{N=Se(f,1,"govuk-accordion__section",null,N,v),q(j,"id",`${e(r).uniqueid??""}-content`),q(j,"aria-live",e(k)),j.hidden=!e(_),q(j,"role",e(g).length<6?"region":""),q(j,"aria-labelledby",e(g).length<6?e(r).uniqueid+"-button":"")},[()=>({"govuk-accordion__section--expanded":e(_)})]),s(C,f)}),n(x),J(C=>{E.hidden=!X()||e(g).length<h(),q(R,"aria-expanded",e(L)),Q(ae,e(L)?p():P()),m=Se(oe,1,"govuk-accordion-nav__chevron",null,m,C)},[()=>({"govuk-accordion-nav__chevron--down":!e(L)})])}s(d,x),xe()}Je(["click"]);const gt=`
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
`,vt=`
<Accordion
  sections={[{
    id: 'example1',
    heading: 'Title One',
    content: 'Some content for the first section.',
  }]}
  allSectionToggle={true}
  minSectionsAllSectionToggle={2}
/>
`,pt=`
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
`,mt=`
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
/>`,ht=d=>{var a=xt(),i=B(a),p=o(i);te(p,{sections:[{id:"example1",heading:"Title One",content:"Some content for the first section."}],allSectionToggle:!0,minSectionsAllSectionToggle:2}),n(i);var b=S(i,2);de(b,{get code(){return vt},language:"svelte"}),s(d,a)},ft=d=>{var a=At(),i=B(a),p=o(i);te(p,{sections:[{id:"example2",heading:"Remember state 1",content:"This section's expansion will be saved in sessionStorage.",expanded:!0},{id:"example3",heading:"Remember state 2",content:"Session state is also saved here."}],rememberIsExpandedState:!0}),n(i);var b=S(i,2);de(b,{get code(){return pt},language:"svelte"}),s(d,a)},_t=d=>{var a=wt(),i=B(a),p=o(i);te(p,{sections:[{id:"example4",heading:"Custom Toggle Section",summary:"Showing override for labels",content:"This accordion uses custom hide/show labels."}],minSectionsAllSectionToggle:0,hideAllSections:"Collapse All",hideSection:"Collapse",showAllSections:"Expand All",showSection:"Expand"}),n(i);var b=S(i,2);de(b,{get code(){return mt},language:"svelte"}),s(d,a)},St=d=>{var a=kt();s(d,a)},bt=d=>{var a=Tt();je(2),s(d,a)};var yt=c('<div class="p-5 bg-white"><!></div> <!>',1),xt=c('<div class="p-5 bg-white"><!></div> <!>',1),At=c('<div class="p-5 bg-white"><!></div> <!>',1),wt=c('<div class="p-5 bg-white"><!></div> <!>',1),kt=c("<p>This is a more complex content for section 1, including <strong>HTML elements</strong>.</p>"),Tt=c("<p>For section 2, you can have <em>even more markup</em> such as lists and headings:</p> <ul><li>List item 1</li> <li>List item 2</li></ul>",1),Lt=c(`<p>Section 3 snippet: advanced <strong>HTML</strong> or media elements could go
    here.</p> <svg viewBox="0 0 300 200" width="300" height="200"><!></svg>`,1),Ct=c('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Et=c('<span slot="header" class="text-lg"> </span>'),Ot=c('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Pt(d,a){ye(a,!1);const i=h=>{var y=yt(),l=B(y),g=o(l);te(g,{get sections(){return F}}),n(l);var u=S(l,2);de(u,{get code(){return gt},language:"svelte"}),s(h,y)},p=h=>{var y=Lt(),l=S(B(y),2),g=o(l);$e(g,{get dataArray(){return P},xFunction:u=>u*10,yFunction:u=>200-u*4,lineFunction:U,pathStrokeColor:"blue",pathStrokeWidth:2,includeMarkers:!0,markerRadius:4}),n(l),s(h,y)};let b=[{id:"1",heading:"1. Accordion with snippet-based content",content:i},{id:"2",heading:"2. Accordion with minimum sections for toggle",content:ht},{id:"3",heading:"3. Accordion respecting expanded session state",content:ft},{id:"4",heading:"4. Accordion with custom toggle labels",content:_t}],F=[{id:"1",heading:"Section 1",content:St},{id:"2",heading:"Section 2",content:bt},{id:"3",heading:"Section 3",content:p}];const P=[{x:0,y:0},{x:10,y:30},{x:20,y:10},{x:30,y:50}];function U(h){let y="M "+h[0].x*10+" "+(200-h[0].y*4);for(let l=1;l<h.length;l++)y+=" L "+h[l].x*10+" "+(200-h[l].y*4);return y}Xe();var I=Ot(),X=S(o(I),2);Ye(X,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(h,y)=>{var l=we(),g=B(l);ke(g,1,()=>b,Te,(u,L)=>{Ze(u,{children:(k,Y)=>{var x=Ct(),E=o(x);Le(E,()=>e(L).content),n(x),s(k,x)},$$slots:{default:!0,header:(k,Y)=>{var x=Et(),E=o(x,!0);n(x),J(()=>Q(E,e(L).heading)),s(k,x)}}})}),s(h,l)},$$slots:{default:!0}}),n(I),s(d,I),xe()}const Ce=(d,a=M,i=M,p=M,b=M)=>{Be(d,{get name(){return a()},get folder(){return i()},get subFolder(){return p()},get homepage(){return b()},get statusObject(){return It},parentFolder:"components-update"})},Ee=(d,a=M)=>{Ue(d,{get homepage(){return a()},get detailsArray(){return qt},get connectedComponentsArray(){return Bt}})};let It={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!0},visibleOnHompepage:!1},{obj:{Reviewed:!0,Tested:!1},visibleOnHomepage:!1}]},jt=["An expandable and collapsible section component that allows users to show and hide content.",'Based on the <a href="https://design-system.service.gov.uk/components/accordion/" target="_blank" rel="noopener noreferrer">GOV.UK Design System accordion component</a> pattern.'],Wt=["Use the accordion component to let users show and hide sections of related content on a page.","Only use an accordion if there is evidence it is helpful for users."],qt=[{label:"Description",arr:jt,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:Wt,visibleOnHomepage:!1,markdown:!0}],Bt=[];var Ft=c('<div class="px-5"><!></div>'),Ht=c('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function Vt(d,a){ye(a,!0);const i=t=>{var m=Ft(),C=o(m);te(C,qe(()=>e(u))),n(m),s(t,m)};let p=ze.url.pathname.split("/"),b=Ge(p[p.length-1]),F=be(_e(Fe.md)),P=w(()=>Re([{name:"sections",category:"Content",value:[{id:"1",heading:"Writing well for the web",summary:"Learn about writing content for your website",content:"This is the content for Writing well for the web.",expanded:!0},{id:"2",heading:"Writing well for specialists",summary:"Guidance for writing technical content",content:"This is the content for Writing well for specialists.",expanded:!1},{id:"3",heading:"Know your audience",summary:"Understanding who your users are",content:"This is the content for Know your audience."}]},{name:"headingLevel",category:"Content",value:"h4"},{name:"hideAllSections",category:"UI Toggle Labels",value:"Hide all sections"},{name:"hideSection",category:"UI Toggle Labels",value:"Hide"},{name:"hideSectionAriaLabel",category:"UI Toggle Labels",value:"Hide this section"},{name:"showAllSections",category:"UI Toggle Labels",value:"Show all sections"},{name:"showSection",category:"UI Toggle Labels",value:"Show"},{name:"showSectionAriaLabel",category:"UI Toggle Labels",value:"Show this section"},{name:"allSectionToggle",category:"Accordion Toggle Options",value:!0},{name:"minSectionsAllSectionToggle",category:"Accordion Toggle Options",value:2},{name:"rememberIsExpandedState",category:"Accordion Toggle Options",value:!0}])),U=function(t,m,C){return t.map(r=>{let f=C[r.name]??r.value;return r.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},I=be(_e(U(e(P),!0,{}))),X=w(()=>({})),h=w(()=>U(e(P),!1,e(X))),y=w(()=>De(e(P),e(I))),l=w(()=>Ne(e(P),e(I),e(h))),g=w(()=>We(e(l),2)),u=w(()=>e(g)[0]),L=w(()=>e(g)[1]),k=_e({});Ae(()=>{e(L).forEach(t=>{k[t]=!0}),Object.keys(k).forEach(t=>{e(L).includes(t)||(k[t]=!1)})});let Y=w(()=>Object.fromEntries(Object.entries(e(u)).map(([t,m])=>{var C,r;return[t,typeof m=="function"?(r=(C=e(P).find(f=>f.name===t))==null?void 0:C.functionElements)==null?void 0:r.functionAsString:m]})));var x=Ht(),E=B(x);const R=w(()=>({component:{WrapperInformation:Ee,WrapperNameAndStatus:Ce},name:b}));He(E,{get wrapper(){return e(R)},homepage:!1});var D=S(E,2);Ve(D,{get parametersParsingErrorsArray(){return e(L)},get parametersParsingErrorsObject(){return k},onCloseFunction:t=>e(L).filter(m=>m!=t)});var ae=S(D,2);Me(ae,{get Component(){return i},get parametersSourceArray(){return e(P)},get derivedParametersValuesArray(){return e(h)},get parametersVisibleArray(){return e(y)},get parametersParsingErrorsObject(){return k},get copyParametersToClipboardObject(){return e(Y)},get demoScreenWidth(){return e(F)},set demoScreenWidth(t){ce(F,t,!0)},get statedParametersValuesArray(){return e(I)},set statedParametersValuesArray(t){ce(I,t,!0)}});var oe=S(ae,2),ue=o(oe);Pt(ue,{}),n(oe),s(d,x),xe()}const ia=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Ee,WrapperNameAndStatus:Ce,default:Vt},Symbol.toStringTag,{value:"Module"}));export{ia as _};
