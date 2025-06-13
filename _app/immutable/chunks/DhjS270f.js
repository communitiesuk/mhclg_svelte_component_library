import"./CWj6FrbW.js";import{p as Pe,a9 as Ae,G as he,I as ye,z as h,x as e,c as r,r as a,s as o,f as ae,t as R,a as Ie,y as We,D as ke,u as He}from"./DRw07N7P.js";import{t as v,s as D,a as c,b as Ve,c as Fe,f as je,v as Ye}from"./Bdkmpx2T.js";import{p as de,s as Ue}from"./CGhnogCl.js";import{a as Ee,B as qe,d as Ge}from"./13XYjU8c.js";import{W as ze,P as Je,C as Ke,B as Qe,a as Xe,t as Ze,c as $e}from"./C5b5R5gE.js";import{p as ge}from"./VCpaEtP1.js";import{k as et}from"./lMwbQCpd.js";import{i as O}from"./DIhpdVoS.js";import{e as be,i as Ce}from"./Dsl0KG63.js";import{r as Re,a as b,f as Oe,g as tt,s as xe,b as at}from"./CZFFhi0W.js";import{R as rt}from"./DNfaO_mG.js";import{h as lt}from"./D1Z9diki.js";import{s as Me}from"./dbxAgBfZ.js";import{c as it}from"./Bcd31h8w.js";import{o as st}from"./dDcDF3j6.js";import{S as nt}from"./IUP_gVTR.js";import{D as Te}from"./CorcKUv-.js";import{A as ot,a as dt}from"./DYgl-gtB.js";import"./69_IOA4Y.js";import{e as Be}from"./h08LFi4D.js";import{C as De}from"./B5yEtBhb.js";var ct=v('<h1 class="govuk-fieldset__heading"> </h1>'),ut=v('<div class="govuk-hint" role="note"> </div>'),mt=v('<p class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> </p>'),vt=v('<div class="govuk-checkboxes__divider" role="separator" aria-orientation="horizontal">or</div>'),ft=(te,l,re)=>l(e(re)),pt=v('<div class="govuk-hint govuk-checkboxes__hint" role="note"> </div>'),gt=v('<div role="region"><!></div>'),bt=v('<!> <div class="govuk-checkboxes__item" role="checkbox"><input type="checkbox" class="govuk-checkboxes__input"> <label class="govuk-label govuk-checkboxes__label"> </label> <!></div> <!>',1),ht=v('<div role="group"><fieldset class="govuk-fieldset"><legend><!></legend> <!> <!> <div data-module="govuk-checkboxes" role="group"></div></fieldset></div>');function yt(te,l){Pe(l,!0);let re=de(l,"isPageHeading",3,!1),ce=de(l,"legendSize",3,"l"),ue=de(l,"small",3,!1),le=de(l,"options",19,()=>[]),K=de(l,"validate",3,void 0),Q=de(l,"selectedValues",31,()=>Ae([])),Y=he(!1);st(()=>{var t;ye(Y,((t=document.body)==null?void 0:t.classList.contains("govuk-frontend-supported"))??!1,!0)});let ie=h(()=>t=>Q().includes(t)),q=h(()=>e(Y)&&K()?K()(Q()):void 0);function me(t){e(Y)&&(t.exclusive?Q(Q().includes(t.value)?[]:[t.value]):Q(Q().includes(t.value)?Q().filter(i=>i!==t.value):[...Q().filter(i=>!le().find(u=>u.value===i&&u.exclusive)),t.value]))}var z=ht(),se=r(z),J=r(se),X=r(J);{var $=t=>{var i=ct(),u=r(i,!0);a(i),R(()=>D(u,l.legend)),c(t,i)},ve=t=>{var i=Ve();R(()=>D(i,l.legend)),c(t,i)};O(X,t=>{re()?t($):t(ve,!1)})}a(J);var ne=o(J,2);{var fe=t=>{var i=ut(),u=r(i,!0);a(i),R(()=>{b(i,"id",`${l.name??""}-hint`),D(u,l.hint)}),c(t,i)};O(ne,t=>{l.hint&&t(fe)})}var g=o(ne,2);{var k=t=>{var i=mt(),u=o(r(i));a(i),R(()=>{b(i,"id",`${l.name??""}-error`),D(u,` ${(e(q)||l.error)??""}`)}),c(t,i)};O(g,t=>{(e(Y)&&e(q)||l.error)&&t(k)})}var p=o(g,2);be(p,21,le,Ce,(t,i,u)=>{var j=bt(),_=ae(j);{var E=x=>{var F=vt();c(x,F)};O(_,x=>{e(i).exclusive&&u>0&&x(E)})}var s=o(_,2),n=r(s);Re(n),n.__change=[ft,me,i];var d=o(n,2),y=r(d,!0);a(d);var P=o(d,2);{var A=x=>{var F=pt(),Z=r(F,!0);a(F),R(()=>{b(F,"id",`${l.name??""}-${u??""}-hint`),D(Z,e(i).hint)}),c(x,F)};O(P,x=>{e(i).hint&&x(A)})}a(s);var H=o(s,2);{var M=x=>{var F=gt(),Z=r(F);{var T=S=>{var V=Fe(),m=ae(V);lt(m,()=>e(i).conditional.content),c(S,V)},w=(S,V)=>{{var m=f=>{var I=Fe(),L=ae(I);Me(L,()=>e(i).conditional.content),c(f,I)},C=f=>{var I=Fe(),L=ae(I);it(L,()=>e(i).conditional.content,(U,ee)=>{ee(U,{})}),c(f,I)};O(S,f=>{e(i).conditional.content?f(m):f(C,!1)},V)}};O(Z,S=>{typeof e(i).conditional.content=="string"?S(T):S(w,!1)})}a(F),R(S=>{b(F,"id",e(i).conditional.id),xe(F,1,`govuk-checkboxes__conditional${S??""}`),b(F,"aria-labelledby",`${l.name??""}-$${u??""}-label`)},[()=>!e(Y)||!e(ie)(e(i).value)?" govuk-checkboxes__conditional--hidden":""]),c(x,F)};O(H,x=>{e(i).conditional&&x(M)})}R((x,F,Z,T)=>{var w;b(s,"aria-checked",x),b(n,"name",l.name),b(n,"id",`${l.name??""}-${u??""}`),Oe(n,e(i).value),b(n,"data-aria-controls",(w=e(i).conditional)==null?void 0:w.id),b(n,"aria-expanded",F),b(n,"aria-describedby",Z),tt(n,T),b(n,"data-behaviour",e(i).exclusive?"exclusive":void 0),b(d,"for",`${l.name??""}-${u??""}`),b(d,"id",`${l.name??""}-$${u??""}-label`),D(y,e(i).label)},[()=>e(Y)?e(ie)(e(i).value):null,()=>e(Y)?e(ie)(e(i).value):null,()=>[e(i).hint?`${l.name}-${u}-hint`:null,e(i).conditional?e(i).conditional.id:null].filter(Boolean).join(" "),()=>e(ie)(e(i).value)]),c(t,j)}),a(p),a(se),a(z),R(t=>{xe(z,1,`govuk-form-group${(e(q)||l.error?" govuk-form-group--error":"")??""}`),b(z,"aria-labelledby",`${l.name??""}-legend`),b(se,"aria-describedby",t),b(J,"id",`${l.name??""}-legend`),xe(J,1,`govuk-fieldset__legend govuk-fieldset__legend--${ce()??""}`),xe(p,1,`govuk-checkboxes${(ue()?" govuk-checkboxes--small":"")??""}`),b(p,"aria-labelledby",`${l.name??""}-legend`)},[()=>[l.hint?`${l.name}-hint`:null,l.error||e(q)?`${l.name}-error`:null].filter(Boolean).join(" ")]),c(te,z),Ie()}je(["change"]);function _t(te,l){ye(l,!e(l))}var xt=v('<span class="govuk-visually-hidden">Filter by</span>'),St=v('<div class="govuk-form-group govuk-!-margin-bottom-2"><!></div>'),Dt=v('<div data-ga4-section="Updated after"><!></div> <div data-ga4-section="Updated before"><!></div>',1),kt=v("<div><!></div>"),Ct=v('<div data-module="gem-checkboxes govuk-checkboxes" class="gem-c-checkboxes govuk-form-group govuk-checkboxes--small"><!></div>'),At=v('<details data-module="filter-section"><summary class="app-c-filter-section__summary svelte-1y8e532" data-ga4-expandable=""><h2 class="app-c-filter-section__summary-heading svelte-1y8e532"><!> </h2></summary> <div class="app-c-filter-section__content"><!></div></details>'),Ft=v('<div class="app-c-filter-panel__content svelte-1y8e532" role="region"><!> <div class="app-c-filter-panel__actions svelte-1y8e532"><input type="submit" class="govuk-button app-c-filter-panel__action app-c-filter-panel__action--submit svelte-1y8e532"></div></div>'),wt=v('<div data-module="filter-panel ga4-event-tracker" class="app-c-filter-panel svelte-1y8e532"><div class="app-c-filter-panel__header svelte-1y8e532"><button class="app-c-filter-panel__button govuk-link svelte-1y8e532" data-ga4-expandable=""><span class="app-c-filter-panel__button-inner svelte-1y8e532"> </span></button> <h2 id="js-result-count" class="app-c-filter-panel__count svelte-1y8e532"> </h2></div> <!></div>');function _e(te,l){const re=Ye();let ce=de(l,"resultsCount",3,"0 results"),ue=de(l,"sectionsData",19,()=>[]),le=de(l,"filterButtonText",3,"Filter and sort"),K=de(l,"applyButtonText",3,"Apply"),Q=de(l,"ga4BaseEvent",19,()=>({event_name:"select_content",type:"finder"})),Y=h(ue),ie=he(!0);const q=`filter-panel-${re}`,me=`filter-button-${re}`;function z(t){return JSON.stringify({...Q(),...t})}function se(t){return[{name:"day",label:"Day",value:t==null?void 0:t.day,attributes:{spellcheck:"false"}},{name:"month",label:"Month",value:t==null?void 0:t.month,attributes:{spellcheck:"false"}},{name:"year",label:"Year",value:t==null?void 0:t.year,attributes:{spellcheck:"false"}}]}var J=wt(),X=r(J),$=r(X);b($,"id",me),b($,"aria-controls",q),$.__click=[_t,ie];var ve=r($),ne=r(ve,!0);a(ve),a($);var fe=o($,2),g=r(fe,!0);a(fe),a(X);var k=o(X,2);{var p=t=>{var i=Ft();b(i,"id",q),b(i,"aria-labelledby",me);var u=r(i);be(u,17,()=>e(Y),E=>E.id,(E,s)=>{var n=At(),d=r(n),y=r(d),P=r(y);{var A=T=>{var w=xt();c(T,w)};O(P,T=>{e(s).type!=="radios"&&T(A)})}var H=o(P);a(y),a(d);var M=o(d,2),x=r(M);{var F=T=>{var w=St();const S=h(()=>e(s));var V=r(w);const m=h(()=>e(S).options.map(C=>({...C})));rt(V,{get name(){return e(S).name},get legend(){return e(S).legend},legendSize:"m",isPageHeading:!1,get options(){return e(m)},get selectedValue(){return e(S).selectedValue},small:!0}),a(w),c(T,w)},Z=(T,w)=>{{var S=m=>{var C=Dt();const f=h(()=>e(s));var I=ae(C),L=r(I);const U=h(()=>`${e(f).id}-from`),ee=h(()=>se(e(f).fromInitialValue)),G=h(()=>({legend:{text:e(f).fromLegend,isPageHeading:!1}})),W=h(()=>({text:e(f).fromHint}));Te(L,{get id(){return e(U)},get namePrefix(){return e(f).fromNamePrefix},get items(){return e(ee)},get fieldset(){return e(G)},get hint(){return e(W)},legendSize:void 0}),a(I);var B=o(I,2),oe=r(B);const N=h(()=>`${e(f).id}-to`),pe=h(()=>se(e(f).toInitialValue)),we=h(()=>({legend:{text:e(f).toLegend,isPageHeading:!1}})),Se=h(()=>({text:e(f).toHint}));Te(oe,{get id(){return e(N)},get namePrefix(){return e(f).toNamePrefix},get items(){return e(pe)},get fieldset(){return e(we)},get hint(){return e(Se)},legendSize:void 0}),a(B),c(m,C)},V=(m,C)=>{{var f=L=>{var U=Fe();const ee=h(()=>e(s));var G=ae(U);be(G,19,()=>e(ee).selects,W=>W.id,(W,B,oe)=>{var N=kt(),pe=r(N);const we=h(()=>e(B).options.map(Se=>({value:Se.value,text:Se.label,disabled:Se.disabled})));nt(pe,{get id(){return e(B).id},get name(){return e(B).name},get label(){return e(B).label},get items(){return e(we)},get value(){return e(B).value},get fullWidth(){return e(B).fullWidth},labelIsPageHeading:!1}),a(N),R(()=>{xe(N,1,`govuk-form-group gem-c-select ${e(oe)===1?"js-required":""}`,"svelte-1y8e532"),at(N,e(oe)===1?"display: block;":void 0),b(N,"data-ga4-section",e(oe)===1?e(B).label:void 0)}),c(W,N)}),c(L,U)},I=(L,U)=>{{var ee=G=>{var W=Ct();const B=h(()=>e(s));var oe=r(W);const N=h(()=>e(B).options.map(pe=>({...pe})));yt(oe,{get name(){return e(B).name},get legend(){return e(B).legend},legendSize:"m",isPageHeading:!1,get options(){return e(N)},get selectedValues(){return e(B).selectedValues},small:!0}),a(W),R(()=>b(W,"id",`checkboxes-${e(B).id}`)),c(G,W)};O(L,G=>{e(s).type==="checkboxes"&&G(ee)},U)}};O(m,L=>{e(s).type==="select"?L(f):L(I,!1)},C)}};O(T,m=>{e(s).type==="date"?m(S):m(V,!1)},w)}};O(x,T=>{e(s).type==="radios"?T(F):T(Z,!1)})}a(M),a(n),R((T,w,S)=>{b(n,"data-ga4-index",T),b(n,"data-ga4-section",e(s).ga4Section),b(n,"data-ga4-filter-parent",e(s).ga4Section),b(n,"data-ga4-change-category",w),xe(n,1,`app-c-filter-section ${(e(s).type==="select"&&e(s).title==="Topic"?"js-all-content-finder-taxonomy-select":"")??""}`,"svelte-1y8e532"),n.open=e(s).openByDefault===void 0?!0:e(s).openByDefault,b(d,"data-ga4-event",S),D(H,` ${e(s).title??""}`)},[()=>JSON.stringify({index_section:e(s).ga4IndexSection,index_section_count:e(s).ga4IndexSectionCount}),()=>`update-filter ${e(s).type==="radios"||e(s).type==="checkboxes"?e(s).type.slice(0,-2):e(s).type}`,()=>z({section:e(s).ga4Section,text:e(s).ga4Section,index_section:e(s).ga4IndexSection,index_section_count:e(s).ga4IndexSectionCount})]),c(E,n)});var j=o(u,2),_=r(j);Re(_),a(j),a(i),R(E=>{Oe(_,K()),b(_,"data-ga4-event",E),b(_,"data-disable-with",K())},[()=>z({text:K(),section:le(),action:"apply",index_section:0,index_section_count:e(Y).length})]),c(t,i)};O(k,t=>{e(ie)&&t(p)})}a(J),R(t=>{b($,"aria-expanded",e(ie)),b($,"data-ga4-event",t),D(ne,le()),D(g,ce())},[()=>z({section:le(),text:le(),index_section:0,index_section_count:e(Y).length})]),c(te,J)}je(["click"]);const Pt=`
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  import { page } from '$app/state';
  
  // Accept form prop from parent (server form submission response)
  let { form } = $props();
  
  // Sample filter sections (typically derived from your data)
  const filterSections = [
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "metric-select",
          name: "metric",
          label: "Select metric",
          options: [
            { value: "", label: "All metrics", disabled: false },
            { value: "metric1", label: "Metric 1" },
            { value: "metric2", label: "Metric 2" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Areas",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select areas",
      options: [
        { value: "area1", label: "Area 1" },
        { value: "area2", label: "Area 2" },
        { value: "area3", label: "Area 3" }
      ]
    },
    {
      id: "years",
      type: "radios",
      title: "Years",
      ga4Section: "years_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "year",
      legend: "Select year",
      options: [
        { value: "all", label: "All years" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" }
      ],
      selectedValue: "all"
    }
  ];
<\/script>

<!-- Server form example -->
<form method="POST">
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={form?.filterData?.count !== undefined ? \`\${form.filterData.count} results found\` : "Select filters"}
    filterButtonText="Filter metrics"
    applyButtonText="Submit to server"
    ga4BaseEvent={{ event_name: "filter_submit", type: "server" }}
  />
</form>

<!-- Results displayed using \`form\` prop -->
{#if form?.filterData?.results && form.filterData.results.length > 0}
  <div class="mt-8 border-t pt-4">
    <div
      class="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="form-success"
    >
      <h2 class="govuk-notification-banner__title" id="form-success">
        Form submitted to server
      </h2>
      <div class="govuk-notification-banner__content">
        <p>
          The server processed your request and found {form.filterData
            .count} results.
        </p>
        <p class="mt-2 text-sm italic">
          Selected Filters: Metric: {form.filterData.metric || "Any"},
          Areas: {form.filterData["areas[]"]?.length > 0
            ? form.filterData["areas[]"].join(", ")
            : "Any"}, Year: {form.filterData.year || "Any"}
        </p>
      </div>
    </div>

    <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each form.filterData.results.slice(0, 5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.x).join(", ")}</td
              >
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.y).join(", ")}</td
              >
            </tr>
          {/each}
          {#if form.filterData.results.length > 5}
            <tr>
              <td colspan="4" class="px-4 py-2 border text-center italic">
                ...and {form.filterData.results.length - 5} more results
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
{:else if form?.filterData?.count === 0 && form?.filterData?.results !== undefined}
  <div class="mt-8 border-t pt-4">
    <p class="italic">
      No results match your filter criteria (processed by server).
    </p>
  </div>
{/if}

<!-- In +page.server.js -->
// Example implementation (should read and filter actual data)
/*
import { fail } from '@sveltejs/kit';
import { read } from '$app/server'; // Import the read function

// Define types for filtered results (mirroring the client-side definition)
interface FilteredResult {
	metric: string;
	areaCode: string;
	areaName: string;
	data: { x: string | number; y: string | number }[];
}


export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const metric = formData.get("metric")?.toString() || null;
    const areas = Array.from(formData.getAll("areas[]")).map(value => value.toString());
    const year = formData.get("year")?.toString() || "all";

		// --- Server-side Data Loading and Transformation ---
		// Read the testData.json file
		let testData;
		try {
			const dataContent = await read('static/data/testData.json');
			testData = JSON.parse(dataContent.toString());
		} catch (e) {
			console.error("Failed to read testData.json:", e);
			return fail(500, { message: "Failed to load data." });
		}

		// Replicate data transformation to get dataInFormatForLineChart
		const metrics = [...new Set(testData.flatMetricData.map(d => d.metric))];
		const areaCodes = [...new Set(testData.flatMetricData.map(el => el.areaCode))];

		let dataInFormatForLineChart = metrics.map(m => ({
			metric: m,
			lines: areaCodes.map(a => ({
				areaCode: a,
				data: testData.flatMetricData.filter(el => el.areaCode === a && el.metric === m),
			})),
		}));
		// --- End Data Loading and Transformation ---


		// --- Replicate Client-side Filtering Logic ---
		let results: FilteredResult[] = [];

		if (dataInFormatForLineChart) {
			// Start with all line chart data
			let filteredData = [...dataInFormatForLineChart];

			// Filter by metric if selected
			if (metric && metric !== "all") { // Check if metric is not 'all' or empty
				filteredData = filteredData.filter(item => item.metric === metric);
			}

			// For each metric grouping
			filteredData.forEach(metricGroup => {
				// Filter lines by selected areas or use all if none selected
				const areaLines = areas.length > 0
					? metricGroup.lines.filter(line => areas.includes(line.areaCode))
					: metricGroup.lines;

				// Filter by year if not "all"
				areaLines.forEach(line => {
					const yearData = year === "all" || !year // Check if year is 'all' or empty
						? line.data
						: line.data.filter(point => point.x.toString() === year);

					if (yearData.length > 0) {
						results.push({
							metric: metricGroup.metric,
							areaCode: line.areaCode,
							areaName: testData.areaCodeLookup?.[line.areaCode] || line.areaCode,
							data: yearData,
						});
					}
				});
			});
		}
		// --- End Filtering Logic ---


    return {
      filterData: {
        metric,
        'areas[]': areas,
        year,
        results,
        count: results.length
      }
    };
  }
};
*/
`,It=`
<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // For tracking filtered results client-side
  let clientResults = $state([]);
  let resultsCount = $state("Ready to filter");
  let clientFormSubmitted = $state(false);
  
  // Sample filter sections (typically derived from your data)
  const filterSections = [
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "metric-select",
          name: "metric",
          label: "Select metric",
          options: [
            { value: "", label: "All metrics", disabled: false },
            { value: "metric1", label: "Metric 1" },
            { value: "metric2", label: "Metric 2" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Areas",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select areas",
      options: [
        { value: "area1", label: "Area 1" },
        { value: "area2", label: "Area 2" },
        { value: "area3", label: "Area 3" }
      ]
    },
    {
      id: "years",
      type: "radios",
      title: "Years",
      ga4Section: "years_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "year",
      legend: "Select year",
      options: [
        { value: "all", label: "All years" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" }
      ],
      selectedValue: "all"
    }
  ];
  
  // Filter helper function (client-side implementation)
  function filterData(metric, areas, year) {
    // Sample data for demonstration - IN A REAL APP, THIS WOULD COME FROM A SHARED SOURCE OR PAGE DATA
    const allData = [
      { metric: "metric1", areaCode: "area1", areaName: "Area One", data: [{x: "2023", y: 123}, {x: "2022", y: 100}] },
      { metric: "metric1", areaCode: "area2", areaName: "Area Two", data: [{x: "2023", y: 456}] },
      { metric: "metric2", areaCode: "area1", areaName: "Area One", data: [{x: "2022", y: 789}] },
      { metric: "metric2", areaCode: "area3", areaName: "Area Three", data: [{x: "2022", y: 321}, {x:"2021", y:300}] }
    ];
    
    let results = [];

		if (allData) { // Assuming allData is structured like dataInFormatForLineChart
			let filteredDataSource = [...allData]; // Use a more descriptive name

			// Filter by metric if selected
			if (metric && metric !== "all" && metric !== "") {
				filteredDataSource = filteredDataSource.filter(item => item.metric === metric);
			}

			// For each item in the (potentially metric-filtered) data source
			filteredDataSource.forEach(item => {
				let itemMatchesArea = true;
				if (areas && areas.length > 0) {
					if (!areas.includes(item.areaCode)) {
						itemMatchesArea = false;
					}
				}

				if (itemMatchesArea) {
					const yearDataPoints = (year && year !== "all" && year !== "")
						? item.data.filter(point => point.x.toString() === year)
						: item.data;

					if (yearDataPoints.length > 0) {
						results.push({
							metric: item.metric,
							areaCode: item.areaCode,
							areaName: item.areaName,
							data: yearDataPoints,
						});
					}
				}
			});
		}
		return results;
  }
<\/script>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // Get filter values
    const metric = formData.get("metric")?.toString() || null; // Ensure toString for safety
    const areas = Array.from(formData.getAll("areas[]")).map(value => value.toString()); 
    const year = formData.get("year")?.toString() || "all"; // Ensure toString
    
    // Cancel server submission and process client-side
    cancel();
    
    // Filter data
    const results = filterData(metric, areas, year);
    
    // Update state variables
    clientResults = results;
    resultsCount = \`\${results.length} results found\`;
    clientFormSubmitted = true;
    
    // No server action needed
    return;
  }}
>
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={resultsCount} // Use client-side count
    filterButtonText="Filter metrics"
    applyButtonText="Apply with enhancement"
    ga4BaseEvent={{ event_name: "filter_data", type: "enhanced" }}
  />
  
  <!-- Display clientResults -->
  {#if clientFormSubmitted && clientResults.length > 0}
    <div class="mt-8 border-t pt-4">
      <div class="success-banner" role="alert">
        <h2>Enhanced Form Processing (Client-side)</h2>
        <div>
          <p>Client-side processing completed with {clientResults.length} results.</p>
          <p class="italic text-sm">
            (With JavaScript disabled, this would have been processed by the server instead.)
          </p>
        </div>
      </div>
      
      <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
      <table class="min-w-full bg-white border">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each clientResults.slice(0,5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border">{result.data.map((d) => d.x).join(", ")}</td>
              <td class="px-4 py-2 border">{result.data.map((d) => d.y).join(", ")}</td>
            </tr>
          {/each}
          {#if clientResults.length > 5}
             <tr><td colspan="4" class="text-center italic p-2 border">...and {clientResults.length - 5} more results</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  {:else if clientFormSubmitted}
    <div class="mt-8 border-t pt-4">
      <p class="italic">No results match your filter criteria (processed client-side).</p>
    </div>
  {/if}
</form>

<!-- In +page.server.js (handles non-JS fallback) -->
/*
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    // Process server-side when JavaScript is disabled
    // ... (this should mirror the logic in the client-side filterData and server-side data loading)
    return { filterData: { // results } };
  }
};
*/
`,Et=`
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  import { page } from '$app/state';
  import { enhance } from "$app/forms"; // Added for use:enhance

  // Accept form prop from parent (server form submission response)
  let { form } = $props();

  // Sample filter sections (typically derived from your data)
  // This would usually come from a load function or be defined based on page.data
  const filterSections = [
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "metric-select",
          name: "metric",
          label: "Select metric",
          options: [
            { value: "", label: "All metrics", disabled: false },
            { value: "metric1", label: "Metric 1" },
            { value: "metric2", label: "Metric 2" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Areas",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select areas",
      options: [
        { value: "area1", label: "Area 1" },
        { value: "area2", label: "Area 2" },
        { value: "area3", label: "Area 3" }
      ]
    },
    {
      id: "years",
      type: "radios",
      title: "Years",
      ga4Section: "years_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "year",
      legend: "Select year",
      options: [
        { value: "all", label: "All years" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" }
      ],
      selectedValue: "all"
    }
  ];
<\/script>

<!-- Server form example with basic use:enhance -->
<form method="POST" use:enhance>
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={form?.filterData?.count !== undefined ? \`\${form.filterData.count} results found\` : "Select filters"}
    filterButtonText="Filter metrics"
    applyButtonText="Submit (Enhanced)"
    ga4BaseEvent={{ event_name: "filter_submit", type: "server_enhanced" }}
  />
</form>

<!-- Results displayed using \`form\` prop (updated by SvelteKit automatically) -->
{#if form?.filterData?.results && form.filterData.results.length > 0}
  <div class="mt-8 border-t pt-4">
    <div
      class="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="form-success-enhanced"
    >
      <h2 class="govuk-notification-banner__title" id="form-success-enhanced">
        Form submitted (Enhanced by SvelteKit)
      </h2>
      <div class="govuk-notification-banner__content">
        <p>
          The server processed your request and found {form.filterData.count} results.
          (Submitted without full page reload thanks to use:enhance)
        </p>
        <p class="mt-2 text-sm italic">
          Selected Filters: Metric: {form.filterData.metric || "Any"},
          Areas: {form.filterData["areas[]"]?.length > 0
            ? form.filterData["areas[]"].join(", ")
            : "Any"}, Year: {form.filterData.year || "Any"}
        </p>
      </div>
    </div>

    <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each form.filterData.results.slice(0, 5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.x).join(", ")}</td
              >
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.y).join(", ")}</td
              >
            </tr>
          {/each}
          {#if form.filterData.results.length > 5}
            <tr>
              <td colspan="4" class="px-4 py-2 border text-center italic">
                ...and {form.filterData.results.length - 5} more results
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
{:else if form?.filterData?.count === 0 && form?.filterData?.results !== undefined}
  <div class="mt-8 border-t pt-4">
    <p class="italic">
      No results match your filter criteria (processed by server with enhancement).
    </p>
  </div>
{/if}

<!-- 
  In +page.server.js, the same action as the non-enhanced server form
  would handle this submission. SvelteKit's 'use:enhance' intercepts
  the form submission, sends it via fetch, and updates the 'form' prop
  with the action's return value.
-->
`,Tt=`
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // Define filter sections
  const basicFilterSections = [
    {
      id: "categories",
      type: "checkboxes",
      title: "Categories",
      ga4Section: "categories_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 2,
      name: "categories[]",
      legend: "Select categories",
      options: [
        { value: "food", label: "Food & Drink" },
        { value: "travel", label: "Travel" },
        { value: "tech", label: "Technology" }
      ]
    },
    {
      id: "rating",
      type: "radios",
      title: "Rating",
      ga4Section: "rating_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 2,
      name: "rating",
      legend: "Select minimum rating",
      options: [
        { value: "any", label: "Any rating" },
        { value: "3", label: "3 stars & above" },
        { value: "4", label: "4 stars & above" },
        { value: "5", label: "5 stars only" }
      ],
      selectedValue: "any"
    }
  ];
  
  // Track results count
  let resultsCountText = $state("Select filters to begin");
<\/script>

<FilterPanel
  sectionsData={basicFilterSections}
  resultsCount={resultsCountText}
  filterButtonText="Show filters"
  applyButtonText="Apply filters"
  ga4BaseEvent={{ event_name: "filter_items", type: "basic" }}
/>
`,Bt=`
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // Define more complex filter sections including select and date range
  const advancedFilterSections = [
    {
      id: "location",
      type: "select",
      title: "Location",
      ga4Section: "location_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "region-select",
          name: "region",
          label: "Select region",
          options: [
            { value: "", label: "All regions", disabled: false },
            { value: "north", label: "North" },
            { value: "south", label: "South" },
            { value: "east", label: "East" },
            { value: "west", label: "West" }
          ],
          fullWidth: true
        },
        {
          id: "city-select",
          name: "city",
          label: "Select city (optional)",
          options: [
            { value: "", label: "All cities", disabled: false },
            { value: "london", label: "London" },
            { value: "manchester", label: "Manchester" },
            { value: "birmingham", label: "Birmingham" },
            { value: "leeds", label: "Leeds" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "price",
      type: "radios",
      title: "Price Range",
      ga4Section: "price_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "price",
      legend: "Select price range",
      options: [
        { value: "any", label: "Any price" },
        { value: "low", label: "£ (Budget)" },
        { value: "medium", label: "££ (Mid-range)" },
        { value: "high", label: "£££ (Premium)" }
      ],
      selectedValue: "any"
    },
    {
      id: "features",
      type: "checkboxes",
      title: "Features",
      ga4Section: "features_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "features[]",
      legend: "Select desired features",
      options: [
        { value: "wifi", label: "Free Wi-Fi" },
        { value: "parking", label: "Parking" },
        { value: "accessible", label: "Wheelchair accessible" },
        { value: "pets", label: "Pet friendly" }
      ]
    }
  ];
<\/script>

<FilterPanel
  sectionsData={advancedFilterSections}
  resultsCount="56 results found"
  filterButtonText="View filters"
  applyButtonText="Update results"
  ga4BaseEvent={{ event_name: "filter_listings", type: "advanced" }}
/>
`;var jt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Basic Filter Panel</h3> <p class="mb-4">This example demonstrates a simple filter panel with checkboxes and radio
      buttons for category and rating filters.</p> <!></div> <!>`,1),Rt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Advanced Filter Panel</h3> <p class="mb-4">This example demonstrates a more complex filter panel with select
      dropdowns, radio buttons, and checkboxes for location, price, and feature
      filters.</p> <!></div> <!>`,1),Ot=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Mt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Nt=v('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="region" aria-labelledby="form-success"><h2 class="govuk-notification-banner__title" id="form-success">Form submitted to server</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),Lt=v('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server).</p></div>'),Wt=v('<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server-side Form Submission</h3> <p class="mb-4">This example demonstrates a traditional form submission that sends data to\n      the server (`+page.server.ts`) and causes a full page reload. The results\n      are passed back via the `form` prop.</p> <form method="POST"><!></form> <!></div> <!>',1),Ht=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Vt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Yt=v('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="form-success-basic-enhance"><h2 class="govuk-notification-banner__title" id="form-success-basic-enhance">Form submitted (Enhanced by SvelteKit)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),Ut=v(`<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server with
          enhancement).</p></div>`),qt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server Submission with Basic use:enhance</h3> <p class="mb-4">This example is identical to the server form submission above, but adds <code>use:enhance</code> to the form. SvelteKit handles the submission via a fetch request, preventing
      a full page reload and automatically updating the <code>form</code> prop with
      the server's response.</p> <form method="POST"><!></form> <!></div> <!>`,1),Gt=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),zt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Jt=v(`<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="enhance-success"><h2 class="govuk-notification-banner__title" id="enhance-success">Enhanced Form Processing (Client-side)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="italic text-sm mt-2">(With JavaScript disabled, this would have been processed by the
                server instead.)</p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>`),Kt=v('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed client-side).</p></div>'),Qt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Progressive Enhancement with use:enhance</h3> <p class="mb-4">This example demonstrates progressive enhancement with <code>use:enhance</code> - it works without JavaScript (falling back to the server action above),
      but when JavaScript is available, it provides a better user experience by processing
      client-side without page reloads.</p> <form method="POST"><!> <!></form></div> <!>`,1),Xt=v('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Zt=v('<span slot="header" class="text-lg"> </span>'),$t=v('<div><h5 class="underline underline-offset-4 my-6">Form Submission Examples</h5> <!></div>');function ea(te,l){Pe(l,!0);const re=g=>{var k=jt(),p=ae(k),t=o(r(p),4);_e(t,{sectionsData:se,resultsCount:"26 results found",filterButtonText:"Show filters",applyButtonText:"Apply filters",ga4BaseEvent:{event_name:"filter_items",type:"basic"}}),a(p);var i=o(p,2);De(i,{code:Tt,language:"svelte"}),c(g,k)},ce=g=>{var k=Rt(),p=ae(k),t=o(r(p),4);_e(t,{sectionsData:J,resultsCount:"56 results found",filterButtonText:"View filters",applyButtonText:"Update results",ga4BaseEvent:{event_name:"filter_listings",type:"advanced"}}),a(p);var i=o(p,2);De(i,{code:Bt,language:"svelte"}),c(g,k)},ue=g=>{var k=Wt(),p=ae(k),t=o(r(p),4),i=r(t);const u=h(()=>{var n,d;return((d=(n=l.form)==null?void 0:n.filterData)==null?void 0:d.count)!==void 0?`${l.form.filterData.count} results found`:"Select filters"});_e(i,{get sectionsData(){return e(X)},get resultsCount(){return e(u)},filterButtonText:"Filter metrics",applyButtonText:"Submit to server",ga4BaseEvent:{event_name:"filter_data",type:"server_submit"}}),a(t);var j=o(t,2);{var _=n=>{var d=Nt(),y=r(d),P=o(r(y),2),A=r(P),H=r(A);a(A);var M=o(A,2),x=r(M);a(M),a(P),a(y);var F=o(y,4),Z=r(F),T=o(r(Z)),w=r(T);be(w,17,()=>l.form.filterData.results.slice(0,5),Ce,(m,C)=>{var f=Ot(),I=r(f),L=r(I,!0);a(I);var U=o(I),ee=r(U,!0);a(U);var G=o(U),W=r(G,!0);a(G);var B=o(G),oe=r(B,!0);a(B),a(f),R((N,pe)=>{D(L,e(C).metric),D(ee,e(C).areaName),D(W,N),D(oe,pe)},[()=>e(C).data.map(N=>N.x).join(", "),()=>e(C).data.map(N=>N.y).join(", ")]),c(m,f)});var S=o(w);{var V=m=>{var C=Mt(),f=r(C),I=r(f);a(f),a(C),R(()=>D(I,`...and ${l.form.filterData.results.length-5} more results`)),c(m,C)};O(S,m=>{l.form.filterData.results.length>5&&m(V)})}a(T),a(Z),a(F),a(d),R(m=>{D(H,`The server processed your request and found ${l.form.filterData.count??""} results.`),D(x,`Selected Filters: Metric: ${l.form.filterData.metric||"Any"},
              Areas: ${m??""}, Year: ${l.form.filterData.year||"Any"}`)},[()=>{var m;return((m=l.form.filterData["areas[]"])==null?void 0:m.length)>0?l.form.filterData["areas[]"].join(", "):"Any"}]),c(n,d)},E=(n,d)=>{{var y=P=>{var A=Lt();c(P,A)};O(n,P=>{var A,H,M,x;((H=(A=l.form)==null?void 0:A.filterData)==null?void 0:H.count)===0&&((x=(M=l.form)==null?void 0:M.filterData)==null?void 0:x.results)!==void 0&&P(y)},d)}};O(j,n=>{var d,y;(y=(d=l.form)==null?void 0:d.filterData)!=null&&y.results&&l.form.filterData.results.length>0?n(_):n(E,!1)})}a(p);var s=o(p,2);De(s,{code:Pt,language:"svelte"}),c(g,k)},le=g=>{var k=qt(),p=ae(k),t=o(r(p),4),i=r(t);const u=h(()=>{var n,d;return((d=(n=l.form)==null?void 0:n.filterData)==null?void 0:d.count)!==void 0?`${l.form.filterData.count} results found`:"Select filters"});_e(i,{get sectionsData(){return e(X)},get resultsCount(){return e(u)},filterButtonText:"Filter metrics",applyButtonText:"Submit (Enhanced)",ga4BaseEvent:{event_name:"filter_data",type:"server_enhanced_submit"}}),a(t),Ee(t,n=>{var d;return(d=Be)==null?void 0:d(n)});var j=o(t,2);{var _=n=>{var d=Yt(),y=r(d),P=o(r(y),2),A=r(P),H=r(A);a(A);var M=o(A,2),x=r(M);a(M),a(P),a(y);var F=o(y,4),Z=r(F),T=o(r(Z)),w=r(T);be(w,17,()=>l.form.filterData.results.slice(0,5),Ce,(m,C)=>{var f=Ht(),I=r(f),L=r(I,!0);a(I);var U=o(I),ee=r(U,!0);a(U);var G=o(U),W=r(G,!0);a(G);var B=o(G),oe=r(B,!0);a(B),a(f),R((N,pe)=>{D(L,e(C).metric),D(ee,e(C).areaName),D(W,N),D(oe,pe)},[()=>e(C).data.map(N=>N.x).join(", "),()=>e(C).data.map(N=>N.y).join(", ")]),c(m,f)});var S=o(w);{var V=m=>{var C=Vt(),f=r(C),I=r(f);a(f),a(C),R(()=>D(I,`...and ${l.form.filterData.results.length-5} more results`)),c(m,C)};O(S,m=>{l.form.filterData.results.length>5&&m(V)})}a(T),a(Z),a(F),a(d),R(m=>{D(H,`The server processed your request and found ${l.form.filterData.count??""} results. (Submitted without full page reload.)`),D(x,`Selected Filters: Metric: ${l.form.filterData.metric||"Any"},
              Areas: ${m??""}, Year: ${l.form.filterData.year||"Any"}`)},[()=>{var m;return((m=l.form.filterData["areas[]"])==null?void 0:m.length)>0?l.form.filterData["areas[]"].join(", "):"Any"}]),c(n,d)},E=(n,d)=>{{var y=P=>{var A=Ut();c(P,A)};O(n,P=>{var A,H,M,x;((H=(A=l.form)==null?void 0:A.filterData)==null?void 0:H.count)===0&&((x=(M=l.form)==null?void 0:M.filterData)==null?void 0:x.results)!==void 0&&P(y)},d)}};O(j,n=>{var d,y;(y=(d=l.form)==null?void 0:d.filterData)!=null&&y.results&&l.form.filterData.results.length>0?n(_):n(E,!1)})}a(p);var s=o(p,2);De(s,{code:Et,language:"svelte"}),c(g,k)},K=g=>{var k=Qt(),p=ae(k),t=o(r(p),4),i=r(t);_e(i,{get sectionsData(){return e(X)},get resultsCount(){return e(me)},filterButtonText:"Filter metrics",applyButtonText:"Apply with enhancement",ga4BaseEvent:{event_name:"filter_data",type:"enhanced"}});var u=o(i,2);{var j=s=>{var n=Jt(),d=r(n),y=o(r(d),2),P=r(y),A=r(P);a(P),We(2),a(y),a(d);var H=o(d,4),M=r(H),x=o(r(M)),F=r(x);be(F,17,()=>e(q).slice(0,5),Ce,(w,S)=>{var V=Gt(),m=r(V),C=r(m,!0);a(m);var f=o(m),I=r(f,!0);a(f);var L=o(f),U=r(L,!0);a(L);var ee=o(L),G=r(ee,!0);a(ee),a(V),R((W,B)=>{D(C,e(S).metric),D(I,e(S).areaName),D(U,W),D(G,B)},[()=>e(S).data.map(W=>W.x).join(", "),()=>e(S).data.map(W=>W.y).join(", ")]),c(w,V)});var Z=o(F);{var T=w=>{var S=zt(),V=r(S),m=r(V);a(V),a(S),R(()=>D(m,`...and ${e(q).length-5} more results`)),c(w,S)};O(Z,w=>{e(q).length>5&&w(T)})}a(x),a(M),a(H),a(n),R(()=>D(A,`Client-side processing completed with ${e(q).length??""}
                results.`)),c(s,n)},_=(s,n)=>{{var d=y=>{var P=Kt();c(y,P)};O(s,y=>{e(z)&&y(d)},n)}};O(u,s=>{e(z)&&e(q).length>0?s(j):s(_,!1)})}a(t),Ee(t,(s,n)=>{var d;return(d=Be)==null?void 0:d(s,n)},()=>({formData:s,cancel:n})=>{var H,M;const d=((H=s.get("metric"))==null?void 0:H.toString())||null,y=Array.from(s.getAll("areas[]")).map(x=>x.toString()),P=((M=s.get("year"))==null?void 0:M.toString())||"all";n();const A=$(d,y,P);ye(q,A,!0),ye(me,`${A.length} results found`),ye(z,!0)}),a(p);var E=o(p,2);De(E,{code:It,language:"svelte"}),c(g,k)};let Q=h(()=>ge.data.metrics||[]),Y=h(()=>ge.data.areas||[]),ie=h(()=>ge.data.years||[]),q=he(Ae([])),me=he("Ready to filter"),z=he(!1);const se=[{id:"categories",type:"checkboxes",title:"Categories",ga4Section:"categories_filter",ga4IndexSection:1,ga4IndexSectionCount:2,name:"categories[]",legend:"Select categories",options:[{value:"food",label:"Food & Drink"},{value:"travel",label:"Travel"},{value:"tech",label:"Technology"}]},{id:"rating",type:"radios",title:"Rating",ga4Section:"rating_filter",ga4IndexSection:2,ga4IndexSectionCount:2,name:"rating",legend:"Select minimum rating",options:[{value:"any",label:"Any rating"},{value:"3",label:"3 stars & above"},{value:"4",label:"4 stars & above"},{value:"5",label:"5 stars only"}],selectedValue:"any"}],J=[{id:"location",type:"select",title:"Location",ga4Section:"location_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"region-select",name:"region",label:"Select region",options:[{value:"",label:"All regions",disabled:!1},{value:"north",label:"North"},{value:"south",label:"South"},{value:"east",label:"East"},{value:"west",label:"West"}],fullWidth:!0},{id:"city-select",name:"city",label:"Select city (optional)",options:[{value:"",label:"All cities",disabled:!1},{value:"london",label:"London"},{value:"manchester",label:"Manchester"},{value:"birmingham",label:"Birmingham"},{value:"leeds",label:"Leeds"}],fullWidth:!0}]},{id:"price",type:"radios",title:"Price Range",ga4Section:"price_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"price",legend:"Select price range",options:[{value:"any",label:"Any price"},{value:"low",label:"£ (Budget)"},{value:"medium",label:"££ (Mid-range)"},{value:"high",label:"£££ (Premium)"}],selectedValue:"any"},{id:"features",type:"checkboxes",title:"Features",ga4Section:"features_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"features[]",legend:"Select desired features",options:[{value:"wifi",label:"Free Wi-Fi"},{value:"parking",label:"Parking"},{value:"accessible",label:"Wheelchair accessible"},{value:"pets",label:"Pet friendly"}]}];let X=h(()=>[{id:"metrics",type:"select",title:"Metrics",ga4Section:"metrics_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"metric-select",name:"metric",label:"Select metric",options:[{value:"",label:"All metrics",disabled:!1},...e(Q).map(g=>({value:g,label:g}))],fullWidth:!0}]},{id:"areas",type:"checkboxes",title:"Local Authorities",ga4Section:"areas_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"areas[]",legend:"Select local authorities",options:e(Y).slice(0,5).map(g=>{var k;return{value:g,label:((k=ge.data.areaCodeLookup)==null?void 0:k[g])||g}})},{id:"years",type:"radios",title:"Years",ga4Section:"years_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"year",legend:"Select year",options:[{value:"all",label:"All years"},...e(ie).map(g=>({value:g.toString(),label:g.toString()}))],selectedValue:"all"}]);function $(g,k,p){let t=[];if(ge.data.dataInFormatForLineChart){let i=[...ge.data.dataInFormatForLineChart];g&&g!=="all"&&(i=i.filter(u=>u.metric===g)),i.forEach(u=>{(k.length>0?u.lines.filter(_=>k.includes(_.areaCode)):u.lines).forEach(_=>{var s;const E=p==="all"?_.data:_.data.filter(n=>n.x.toString()===p);E.length>0&&t.push({metric:u.metric,areaCode:_.areaCode,areaName:((s=ge.data.areaCodeLookup)==null?void 0:s[_.areaCode])||_.areaCode,data:E})})})}return t}let ve=[{id:"1",heading:"1. Basic Filter Panel Example",content:re},{id:"2",heading:"2. Advanced Filter Panel with Multiple Select and Options",content:ce},{id:"3",heading:"3. Server Form Submission (Full Page Reload)",content:ue},{id:"4",heading:"4 Server Submission with Basic use:enhance for progressive enhancement",content:le},{id:"5",heading:"5. Progressive Enhancement with use:enhance to cancel form submission and process client-side, server-side submission as fallback",content:K}];var ne=$t(),fe=o(r(ne),2);ot(fe,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(g,k)=>{var p=Fe(),t=ae(p);be(t,17,()=>ve,Ce,(i,u)=>{dt(i,{children:(j,_)=>{var E=Xt(),s=r(E);Me(s,()=>e(u).content),a(E),c(j,E)},$$slots:{default:!0,header:(j,_)=>{var E=Zt(),s=r(E,!0);a(E),R(()=>D(s,e(u).heading)),c(j,E)}}})}),c(g,p)},$$slots:{default:!0}}),a(ne),c(te,ne),Ie()}const Ne=(te,l=ke,re=ke,ce=ke,ue=ke)=>{qe(te,{get name(){return l()},get folder(){return re()},get subFolder(){return ce()},get homepage(){return ue()},statusObject:ta,parentFolder:"components-update"})},Le=(te,l=ke)=>{Qe(te,{get homepage(){return l()},detailsArray:la,connectedComponentsArray:ia})};let ta={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},aa=["A collapsible filter panel component that allows users to refine search results or content listings. <a href='https://github.com/alphagov/finder-frontend/blob/main/spec/javascripts/components/filter-panel-spec.js' target='_blank' rel='noopener noreferrer'>Based on the GOV.UK Finder Frontend component</a>, it supports various filter types including radio buttons, date inputs, dropdowns, and checkboxes.","The component includes built-in GA4 event tracking, responsive design, and accessibility features like ARIA labels and keyboard navigation.","An example of the original component in use can be seen on the <a href='https://www.gov.uk/search/all?keywords=tax&order=relevance' target='_blank' rel='noopener noreferrer'>GOV.UK search page</a>."],ra=["Use this component on pages where users need to filter through large sets of content or search results.","Common use cases include:","- Document or publication finders","- Search results refinement","- Content listing pages with multiple filter options","- Any interface where users need to narrow down a large dataset using multiple criteria"],la=[{label:"Description",arr:aa,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:ra,visibleOnHomepage:!1,markdown:!0}],ia=[];var sa=v('<div class="p-8"><!></div>'),na=v('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function oa(te,l){Pe(l,!0);const re=t=>{var i=sa(),u=r(i);_e(u,Ue(()=>e(se))),a(i),c(t,i)};let ce=ge.url.pathname.split("/"),ue=et(ce[ce.length-1]),le=he(Ae(Ge.md)),K=h(()=>Xe([{name:"resultsCount",category:"Display props",value:"125 results",description:{markdown:!0,arr:["The total number of results to display in the header. Usually updated when filters change."]}},{name:"sectionsData",category:"Content props",value:[{id:"document-type",type:"radios",title:"Document type",ga4Section:"document_type",ga4IndexSection:1,ga4IndexSectionCount:4,name:"document_type",legend:"Select document type",options:[{value:"all",label:"All document types"},{value:"policy",label:"Policy papers"},{value:"guidance",label:"Guidance"},{value:"news",label:"News and communications"}],selectedValue:"all"},{id:"date-range",type:"date",title:"Date published",ga4Section:"date_published",ga4IndexSection:2,ga4IndexSectionCount:4,fromLegend:"Published after",fromNamePrefix:"published_at[from]",fromHint:"For example, 2020 or 21/11/2020",toLegend:"Published before",toNamePrefix:"published_at[to]",toHint:"For example, 2023 or 21/11/2023",legendSize:{undefined:void 0}},{id:"topic",type:"select",title:"Topic",ga4Section:"topic",ga4IndexSection:3,ga4IndexSectionCount:4,selects:[{id:"level-one",name:"topics[]",label:"All topics",options:[{value:"",label:"Please select",disabled:!0},{value:"business",label:"Business and industry"},{value:"health",label:"Health and social care"},{value:"education",label:"Education"}],fullWidth:!0}]},{id:"organisations",type:"checkboxes",title:"Organisations",ga4Section:"organisations",ga4IndexSection:4,ga4IndexSectionCount:4,name:"organisations[]",legend:"Select organisations",options:[{value:"cabinet-office",label:"Cabinet Office"},{value:"dfe",label:"Department for Education"},{value:"dhsc",label:"Department of Health and Social Care"}]}],description:{markdown:!0,arr:["An array of filter sections. Each section can be one of four types:","- `radios`: Single-select options with radio buttons","- `date`: Date range inputs with from/to fields","- `select`: Dropdown select menus","- `checkboxes`: Multi-select options with checkboxes","Each section type has its own required properties and optional configurations."]}},{name:"filterButtonText",category:"Display props",value:"Filter and sort",description:{markdown:!0,arr:["The text to display on the main filter toggle button."]}},{name:"applyButtonText",category:"Display props",value:"Apply filters",description:{markdown:!0,arr:["The text to display on the apply button at the bottom of the filter panel."]}},{name:"ga4BaseEvent",category:"Analytics props",propType:"fixed",value:{event_name:"select_content",type:"finder"},description:{markdown:!0,arr:["Base GA4 event data that will be merged with section-specific data for analytics tracking."]}}])),Q=function(t,i,u){return t.map(j=>{let _=u[j.name]??j.value;return j.isEditable===i&&_!=null?typeof _=="object"?JSON.stringify(_,null,2):_:null})},Y=he(Ae(Q(e(K),!0,{}))),ie=h(()=>({})),q=h(()=>Q(e(K),!1,e(ie))),me=h(()=>Ze(e(K),e(Y))),z=h(()=>$e(e(K),e(Y),e(q))),se=h(()=>e(z)[0]),J=h(()=>e(z)[1]),X=Ae({});He(()=>{e(J).forEach(t=>{X[t]=!0}),Object.keys(X).forEach(t=>{e(J).includes(t)||(X[t]=!1)})});let $=h(()=>Object.fromEntries(Object.entries(e(se)).map(([t,i])=>{var u,j;return[t,typeof i=="function"?(j=(u=e(K).find(_=>_.name===t))==null?void 0:u.functionElements)==null?void 0:j.functionAsString:i]})));var ve=na(),ne=ae(ve);ze(ne,{wrapper:{component:{WrapperInformation:Le,WrapperNameAndStatus:Ne},name:ue},homepage:!1});var fe=o(ne,2);Je(fe,{get parametersParsingErrorsArray(){return e(J)},get parametersParsingErrorsObject(){return X},onCloseFunction:t=>e(J).filter(i=>i!=t)});var g=o(fe,2);Ke(g,{Component:re,get parametersSourceArray(){return e(K)},get derivedParametersValuesArray(){return e(q)},get parametersVisibleArray(){return e(me)},get parametersParsingErrorsObject(){return X},get copyParametersToClipboardObject(){return e($)},get demoScreenWidth(){return e(le)},set demoScreenWidth(t){ye(le,t,!0)},get statedParametersValuesArray(){return e(Y)},set statedParametersValuesArray(t){ye(Y,t,!0)}});var k=o(g,2),p=r(k);ea(p,{get form(){return l.form}}),a(k),c(te,ve),Ie()}const Ea=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Le,WrapperNameAndStatus:Ne,default:oa},Symbol.toStringTag,{value:"Module"}));export{Ea as _};
