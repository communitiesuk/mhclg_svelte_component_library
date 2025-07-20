import"./CWj6FrbW.js";import{p as Me,ab as Pe,J as De,I as Ce,c as a,r as t,s as l,F as e,G as y,f as re,t as j,a as Ne,y as qe,C as Ee,u as Je,ac as Ge}from"./DAeYpASc.js";import{f as g,a as c,t as ze,c as Te,p as Ke}from"./BAP9DKun.js";import{p as ue,s as Qe}from"./CDnlRnBP.js";import{a as Oe,B as Xe,d as Ze}from"./FLOBqqeq.js";import{k as $e,W as et,P as tt,C as at,B as rt,a as lt,t as it,c as st}from"./D9YvIc1u.js";import{p as ke}from"./CMjediXt.js";import{k as nt}from"./DLSzT-Iv.js";import{s as k,d as Le}from"./oN6NPT6s.js";import{i as M}from"./BRrZqxBe.js";import{e as Fe,i as Be}from"./DtT6GxuX.js";import{r as We,s as S,g as He,h as ot,a as Ie,b as ct}from"./BYRFjNIU.js";import{R as dt}from"./CCtWB3O0.js";import{o as ut}from"./mMANI47B.js";import{h as mt}from"./CJp10wTC.js";import{s as Ve}from"./5CLvz9iT.js";import{c as vt}from"./CgDP17d5.js";import{S as ft}from"./BO19Vzan.js";import{D as Re}from"./e-bOYzJn.js";import{A as pt,a as gt}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{e as je}from"./BfRbetfY.js";import{C as we}from"./ip80KjXp.js";import{T as bt}from"./CWT6Y9A_.js";var ht=g('<h1 class="govuk-fieldset__heading"> </h1>'),yt=g('<div class="govuk-hint" role="note"> </div>'),_t=g('<p class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> </p>'),xt=g('<div class="govuk-checkboxes__divider" role="separator" aria-orientation="horizontal">or</div>'),St=(se,r,me)=>r(e(me)),Dt=g('<div class="govuk-hint govuk-checkboxes__hint" role="note"> </div>'),kt=g('<div role="region"><!></div>'),Ct=g('<!> <div class="govuk-checkboxes__item" role="checkbox"><input type="checkbox" class="govuk-checkboxes__input"/> <label class="govuk-label govuk-checkboxes__label"> </label> <!></div> <!>',1),At=g('<div role="group"><fieldset class="govuk-fieldset"><legend><!></legend> <!> <!> <div data-module="govuk-checkboxes" role="group"></div></fieldset></div>');function Ft(se,r){Me(r,!0);let me=ue(r,"isPageHeading",3,!1),ge=ue(r,"legendSize",3,"l"),_e=ue(r,"small",3,!1),ve=ue(r,"options",19,()=>[]),$=ue(r,"validate",3,void 0),ee=ue(r,"selectedValues",31,()=>Pe([])),J=Ce(!1);ut(()=>{var b;De(J,((b=document.body)==null?void 0:b.classList.contains("govuk-frontend-supported"))??!1,!0)});let fe=y(()=>b=>ee().includes(b)),ne=y(()=>e(J)&&$()?$()(ee()):void 0);function le(b){e(J)&&(b.exclusive?ee(ee().includes(b.value)?[]:[b.value]):ee(ee().includes(b.value)?ee().filter(n=>n!==b.value):[...ee().filter(n=>!ve().find(f=>f.value===n&&f.exclusive)),b.value]))}var oe=At(),ce=a(oe),X=a(ce),pe=a(X);{var Z=b=>{var n=ht(),f=a(n,!0);t(n),j(()=>k(f,r.legend)),c(b,n)},be=b=>{var n=ze();j(()=>k(n,r.legend)),c(b,n)};M(pe,b=>{me()?b(Z):b(be,!1)})}t(X);var H=l(X,2);{var he=b=>{var n=yt(),f=a(n,!0);t(n),j(()=>{S(n,"id",`${r.name??""}-hint`),k(f,r.hint)}),c(b,n)};M(H,b=>{r.hint&&b(he)})}var ye=l(H,2);{var te=b=>{var n=_t(),f=l(a(n));t(n),j(()=>{S(n,"id",`${r.name??""}-error`),k(f,` ${(e(ne)||r.error)??""}`)}),c(b,n)};M(ye,b=>{(e(J)&&e(ne)||r.error)&&b(te)})}var ie=l(ye,2);Fe(ie,21,ve,Be,(b,n,f)=>{var G=Ct(),u=re(G);{var m=s=>{var i=xt();c(s,i)};M(u,s=>{e(n).exclusive&&f>0&&s(m)})}var o=l(u,2),v=a(o);We(v),v.__change=[St,le,n];var w=l(v,2),N=a(w,!0);t(w);var L=l(w,2);{var d=s=>{var i=Dt(),h=a(i,!0);t(i),j(()=>{S(i,"id",`${r.name??""}-${f}-hint`),k(h,e(n).hint)}),c(s,i)};M(L,s=>{e(n).hint&&s(d)})}t(o);var C=l(o,2);{var _=s=>{var i=kt(),h=a(i);{var F=x=>{var A=Te(),I=re(A);mt(I,()=>e(n).conditional.content),c(x,A)},D=(x,A)=>{{var I=O=>{var W=Te(),Y=re(W);Ve(Y,()=>e(n).conditional.content),c(O,W)},P=O=>{var W=Te(),Y=re(W);vt(Y,()=>e(n).conditional.content,(R,U)=>{U(R,{})}),c(O,W)};M(x,O=>{e(n).conditional.content?O(I):O(P,!1)},A)}};M(h,x=>{typeof e(n).conditional.content=="string"?x(F):x(D,!1)})}t(i),j(x=>{S(i,"id",e(n).conditional.id),Ie(i,1,`govuk-checkboxes__conditional${x??""}`),S(i,"aria-labelledby",`${r.name??""}-$${f}-label`)},[()=>!e(J)||!e(fe)(e(n).value)?" govuk-checkboxes__conditional--hidden":""]),c(s,i)};M(C,s=>{e(n).conditional&&s(_)})}j((s,i,h,F)=>{var D;S(o,"aria-checked",s),S(v,"name",r.name),S(v,"id",`${r.name??""}-${f}`),He(v,e(n).value),S(v,"data-aria-controls",(D=e(n).conditional)==null?void 0:D.id),S(v,"aria-expanded",i),S(v,"aria-describedby",h),ot(v,F),S(v,"data-behaviour",e(n).exclusive?"exclusive":void 0),S(w,"for",`${r.name??""}-${f}`),S(w,"id",`${r.name??""}-$${f}-label`),k(N,e(n).label)},[()=>e(J)?e(fe)(e(n).value):null,()=>e(J)?e(fe)(e(n).value):null,()=>[e(n).hint?`${r.name}-${f}-hint`:null,e(n).conditional?e(n).conditional.id:null].filter(Boolean).join(" "),()=>e(fe)(e(n).value)]),c(b,G)}),t(ie),t(ce),t(oe),j(b=>{Ie(oe,1,`govuk-form-group${e(ne)||r.error?" govuk-form-group--error":""}`),S(oe,"aria-labelledby",`${r.name??""}-legend`),S(ce,"aria-describedby",b),S(X,"id",`${r.name??""}-legend`),Ie(X,1,`govuk-fieldset__legend govuk-fieldset__legend--${ge()??""}`),Ie(ie,1,`govuk-checkboxes${_e()?" govuk-checkboxes--small":""}`),S(ie,"aria-labelledby",`${r.name??""}-legend`)},[()=>[r.hint?`${r.name}-hint`:null,r.error||e(ne)?`${r.name}-error`:null].filter(Boolean).join(" ")]),c(se,oe),Ne()}Le(["change"]);function wt(se,r){De(r,!e(r))}var It=g('<span class="govuk-visually-hidden">Filter by</span>'),Pt=g('<div class="govuk-form-group govuk-!-margin-bottom-2"><!></div>'),Tt=g('<div data-ga4-section="Updated after"><!></div> <div data-ga4-section="Updated before"><!></div>',1),Et=g("<div><!></div>"),Bt=g('<div data-module="gem-checkboxes govuk-checkboxes" class="gem-c-checkboxes govuk-form-group govuk-checkboxes--small"><!></div>'),Ot=g('<details data-module="filter-section"><summary class="app-c-filter-section__summary svelte-1y8e532" data-ga4-expandable=""><h2 class="app-c-filter-section__summary-heading svelte-1y8e532"><!> </h2></summary> <div class="app-c-filter-section__content"><!></div></details>'),jt=g('<div class="app-c-filter-panel__content svelte-1y8e532" role="region"><!> <div class="app-c-filter-panel__actions svelte-1y8e532"><input type="submit" class="govuk-button app-c-filter-panel__action app-c-filter-panel__action--submit svelte-1y8e532"/></div></div>'),Mt=g('<div data-module="filter-panel ga4-event-tracker" class="app-c-filter-panel svelte-1y8e532"><div class="app-c-filter-panel__header svelte-1y8e532"><button class="app-c-filter-panel__button govuk-link svelte-1y8e532" data-ga4-expandable=""><span class="app-c-filter-panel__button-inner svelte-1y8e532"> </span></button> <h2 id="js-result-count" class="app-c-filter-panel__count svelte-1y8e532"> </h2></div> <!></div>');function Ae(se,r){const me=Ke();let ge=ue(r,"resultsCount",3,"0 results"),_e=ue(r,"sectionsData",19,()=>[]),ve=ue(r,"filterButtonText",3,"Filter and sort"),$=ue(r,"applyButtonText",3,"Apply"),ee=ue(r,"ga4BaseEvent",19,()=>({event_name:"select_content",type:"finder"})),J=ue(r,"filterPanelSectionsExpanded",3,!1),fe=ue(r,"filterPanelExpanded",3,!0),ne=y(_e),le=y(fe);const oe=`filter-panel-${me}`,ce=`filter-button-${me}`;function X(H){return JSON.stringify({...ee(),...H})}function pe(H){return[{name:"day",label:"Day",value:H==null?void 0:H.day,attributes:{spellcheck:"false"}},{name:"month",label:"Month",value:H==null?void 0:H.month,attributes:{spellcheck:"false"}},{name:"year",label:"Year",value:H==null?void 0:H.year,attributes:{spellcheck:"false"}}]}var Z=Te(),be=re(Z);$e(be,()=>`${fe()}-${J()}`,H=>{var he=Mt(),ye=a(he),te=a(ye);te.__click=[wt,le];var ie=a(te),b=a(ie,!0);t(ie),t(te);var n=l(te,2),f=a(n,!0);t(n),t(ye);var G=l(ye,2);{var u=m=>{var o=jt(),v=a(o);Fe(v,17,()=>e(ne),L=>L.id,(L,d)=>{var C=Ot(),_=a(C),s=a(_),i=a(s);{var h=P=>{var O=It();c(P,O)};M(i,P=>{e(d).type!=="radios"&&P(h)})}var F=l(i);t(s),t(_);var D=l(_,2),x=a(D);{var A=P=>{var O=Pt();const W=y(()=>e(d));var Y=a(O);const R=y(()=>e(W).options.map(U=>({...U})));dt(Y,{get name(){return e(W).name},get legend(){return e(W).legend},legendSize:"m",isPageHeading:!1,get options(){return e(R)},get selectedValue(){return e(W).selectedValue},small:!0}),t(O),c(P,O)},I=(P,O)=>{{var W=R=>{var U=Tt();const p=y(()=>e(d));var B=re(U),T=a(B);const V=y(()=>`${e(p).id}-from`),de=y(()=>pe(e(p).fromInitialValue)),z=y(()=>({legend:{text:e(p).fromLegend,isPageHeading:!1}})),K=y(()=>({text:e(p).fromHint}));Re(T,{get id(){return e(V)},get namePrefix(){return e(p).fromNamePrefix},get items(){return e(de)},get fieldset(){return e(z)},get hint(){return e(K)},legendSize:void 0}),t(B);var E=l(B,2),Q=a(E);const q=y(()=>`${e(p).id}-to`),xe=y(()=>pe(e(p).toInitialValue)),ae=y(()=>({legend:{text:e(p).toLegend,isPageHeading:!1}})),Se=y(()=>({text:e(p).toHint}));Re(Q,{get id(){return e(q)},get namePrefix(){return e(p).toNamePrefix},get items(){return e(xe)},get fieldset(){return e(ae)},get hint(){return e(Se)},legendSize:void 0}),t(E),c(R,U)},Y=(R,U)=>{{var p=T=>{var V=Te();const de=y(()=>e(d));var z=re(V);Fe(z,19,()=>e(de).selects,K=>K.id,(K,E,Q)=>{var q=Et(),xe=a(q);const ae=y(()=>e(E).options.map(Se=>({value:Se.value,text:Se.label,disabled:Se.disabled})));ft(xe,{get id(){return e(E).id},get name(){return e(E).name},get label(){return e(E).label},get items(){return e(ae)},get value(){return e(E).value},get fullWidth(){return e(E).fullWidth},labelIsPageHeading:!1}),t(q),j(()=>{Ie(q,1,`govuk-form-group gem-c-select ${e(Q)===1?"js-required":""}`,"svelte-1y8e532"),ct(q,e(Q)===1?"display: block;":void 0),S(q,"data-ga4-section",e(Q)===1?e(E).label:void 0)}),c(K,q)}),c(T,V)},B=(T,V)=>{{var de=z=>{var K=Bt();const E=y(()=>e(d));var Q=a(K);const q=y(()=>e(E).options.map(xe=>({...xe})));Ft(Q,{get name(){return e(E).name},get legend(){return e(E).legend},legendSize:"m",isPageHeading:!1,get options(){return e(q)},get selectedValues(){return e(E).selectedValues},small:!0}),t(K),j(()=>S(K,"id",`checkboxes-${e(E).id}`)),c(z,K)};M(T,z=>{e(d).type==="checkboxes"&&z(de)},V)}};M(R,T=>{e(d).type==="select"?T(p):T(B,!1)},U)}};M(P,R=>{e(d).type==="date"?R(W):R(Y,!1)},O)}};M(x,P=>{e(d).type==="radios"?P(A):P(I,!1)})}t(D),t(C),j((P,O,W)=>{S(C,"data-ga4-index",P),S(C,"data-ga4-section",e(d).ga4Section),S(C,"data-ga4-filter-parent",e(d).ga4Section),S(C,"data-ga4-change-category",O),Ie(C,1,`app-c-filter-section ${e(d).type==="select"&&e(d).title==="Topic"?"js-all-content-finder-taxonomy-select":""}`,"svelte-1y8e532"),C.open=e(d).openByDefault!==void 0?e(d).openByDefault:J(),S(_,"data-ga4-event",W),k(F,` ${e(d).title??""}`)},[()=>JSON.stringify({index_section:e(d).ga4IndexSection,index_section_count:e(d).ga4IndexSectionCount}),()=>`update-filter ${e(d).type==="radios"||e(d).type==="checkboxes"?e(d).type.slice(0,-2):e(d).type}`,()=>X({section:e(d).ga4Section,text:e(d).ga4Section,index_section:e(d).ga4IndexSection,index_section_count:e(d).ga4IndexSectionCount})]),c(L,C)});var w=l(v,2),N=a(w);We(N),t(w),t(o),j(L=>{S(o,"id",oe),S(o,"aria-labelledby",ce),He(N,$()),S(N,"data-ga4-event",L),S(N,"data-disable-with",$())},[()=>X({text:$(),section:ve(),action:"apply",index_section:0,index_section_count:e(ne).length})]),c(m,o)};M(G,m=>{e(le)&&m(u)})}t(he),j(m=>{S(te,"id",ce),S(te,"aria-expanded",e(le)),S(te,"aria-controls",oe),S(te,"data-ga4-event",m),k(b,ve()),k(f,ge())},[()=>X({section:ve(),text:ve(),index_section:0,index_section_count:e(ne).length})]),c(H,he)}),c(se,Z)}Le(["click"]);const Nt=`
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
`,Rt=`
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
`,Lt=`
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
`,Wt=`
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
`,Ht=`
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
`,Vt=`
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  import Table from '$lib/components/data-vis/table/Table.svelte';
  import { enhance } from '$app/forms';
  
  // Simple client-side only data
  const simpleItems = [
    { id: 1, name: "Laptop", category: "electronics" },
    { id: 2, name: "Mouse", category: "electronics" },
    { id: 3, name: "Coffee Mug", category: "home" },
    { id: 4, name: "Desk Chair", category: "home" },
  ];

  // Metadata for the Table component
  const simpleMetaData = {
    id: { shortLabel: "ID", explainer: "Item ID" },
    name: { shortLabel: "Name", explainer: "Item name" },
    category: { shortLabel: "Category", explainer: "Item category" },
  };

  // Client-side state
  let filteredItems = $state(simpleItems);
  let selectedCategory = $state("all");

  // One simple filter function
  function filterItems(category) {
    return category === "all" ? simpleItems : simpleItems.filter(item => item.category === category);
  }

  // One filter section
  const oneFilterSection = [
    {
      id: "category",
      type: "radios",
      title: "Category",
      ga4Section: "category_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 1,
      name: "category",
      legend: "Select category",
      options: [
        { value: "all", label: "All items" },
        { value: "electronics", label: "Electronics" },
        { value: "home", label: "Home" },
      ],
      selectedValue: "all",
    },
  ];
<\/script>

<!-- Form with use:enhance and cancel() -->
<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // Cancel server submission - process client-side only
    cancel();
    
    // Extract form value
    const category = formData.get("category")?.toString() || "all";
    
    // Update state
    selectedCategory = category;
    filteredItems = filterItems(category);
    
    // No return needed - we cancelled the submission
  }}
>
  <FilterPanel
    sectionsData={oneFilterSection}
    resultsCount={\`\${filteredItems.length} items found\`}
    filterButtonText="Filter items"
    applyButtonText="Apply filter (Client-side only)"
    ga4BaseEvent={{ event_name: "filter_items", type: "client_only" }}
  />
</form>

<!-- Display current filter -->
<p class="govuk-body">
  <strong>Selected Category:</strong>
  {selectedCategory === "all" ? "All items" : selectedCategory}
</p>

<!-- Display results using Table component -->
<div class="mt-8 border-t pt-4">
  <h4 class="text-lg font-semibold mb-4">Results ({filteredItems.length} items)</h4>
  <Table 
    data={filteredItems} 
    metaData={simpleMetaData}
    caption="Filtered Items"
    colourScale="Off"
  />
  
  {#if filteredItems.length === 0}
    <p class="text-gray-500 italic mt-4">No items match your filter.</p>
  {/if}
</div>
`;var Yt=g(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Basic Filter Panel</h3> <p class="mb-4">This example demonstrates a simple filter panel with checkboxes and radio
      buttons for category and rating filters.</p> <!></div> <!>`,1),Ut=g(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Advanced Filter Panel</h3> <p class="mb-4">This example demonstrates a more complex filter panel with select
      dropdowns, radio buttons, and checkboxes for location, price, and feature
      filters.</p> <!></div> <!>`,1),qt=g('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Jt=g('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Gt=g('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="region" aria-labelledby="form-success"><h2 class="govuk-notification-banner__title" id="form-success">Form submitted to server</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),zt=g('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server).</p></div>'),Kt=g('<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server-side Form Submission</h3> <p class="mb-4">This example demonstrates a traditional form submission that sends data to\n      the server (`+page.server.ts`) and causes a full page reload. The results\n      are passed back via the `form` prop.</p> <form method="POST"><!></form> <!></div> <!>',1),Qt=g('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Xt=g('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Zt=g('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="form-success-basic-enhance"><h2 class="govuk-notification-banner__title" id="form-success-basic-enhance">Form submitted (Enhanced by SvelteKit)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),$t=g(`<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server with
          enhancement).</p></div>`),ea=g(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server Submission with Basic use:enhance</h3> <p class="mb-4">This example is identical to the server form submission above, but adds <code>use:enhance</code> to the form. SvelteKit handles the submission via a fetch request, preventing
      a full page reload and automatically updating the <code>form</code> prop with
      the server's response.</p> <form method="POST"><!></form> <!></div> <!>`,1),ta=g('<p class="text-gray-500 italic mt-4">No items match your filter.</p>'),aa=g('<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Client-Side Only with use:enhance cancel()</h3> <p class="mb-4">This example demonstrates <code>use:enhance</code> with <code>cancel()</code> to prevent server submission entirely. All processing happens client-side only. <strong>No server fallback</strong> - this requires JavaScript to work.</p> <form method="POST"><!></form> <p class="govuk-body"><strong>Selected Category:</strong> </p> <div class="mt-8 border-t pt-4"><h4 class="text-lg font-semibold mb-4"> </h4> <!> <!></div></div> <!>',1),ra=g('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),la=g('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),ia=g(`<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="enhance-success"><h2 class="govuk-notification-banner__title" id="enhance-success">Enhanced Form Processing (Client-side)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="italic text-sm mt-2">(With JavaScript disabled, this would have been processed by the
                server instead.)</p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>`),sa=g('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed client-side).</p></div>'),na=g(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Progressive Enhancement with use:enhance</h3> <p class="mb-4">This example demonstrates progressive enhancement with <code>use:enhance</code> - it works without JavaScript (falling back to the server action above),
      but when JavaScript is available, it provides a better user experience by processing
      client-side without page reloads.</p> <form method="POST"><!> <!></form></div> <!>`,1),oa=g('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),ca=g('<span slot="header" class="text-lg"> </span>'),da=g('<div><h5 class="underline underline-offset-4 my-6">Form Submission Examples</h5> <!></div>');function ua(se,r){Me(r,!0);const me=u=>{var m=Yt(),o=re(m),v=l(a(o),4);Ae(v,{get sectionsData(){return ye},resultsCount:"26 results found",filterButtonText:"Show filters",applyButtonText:"Apply filters",ga4BaseEvent:{event_name:"filter_items",type:"basic"}}),t(o);var w=l(o,2);we(w,{get code(){return Wt},language:"svelte"}),c(u,m)},ge=u=>{var m=Ut(),o=re(m),v=l(a(o),4);Ae(v,{get sectionsData(){return te},resultsCount:"56 results found",filterButtonText:"View filters",applyButtonText:"Update results",ga4BaseEvent:{event_name:"filter_listings",type:"advanced"}}),t(o);var w=l(o,2);we(w,{get code(){return Ht},language:"svelte"}),c(u,m)},_e=u=>{var m=Kt(),o=re(m),v=l(a(o),4),w=a(v);const N=y(()=>{var s,i;return((i=(s=r.form)==null?void 0:s.filterData)==null?void 0:i.count)!==void 0?`${r.form.filterData.count} results found`:"Select filters"});Ae(w,{get sectionsData(){return e(ie)},get resultsCount(){return e(N)},filterButtonText:"Filter metrics",applyButtonText:"Submit to server",ga4BaseEvent:{event_name:"filter_data",type:"server_submit"}}),t(v);var L=l(v,2);{var d=s=>{var i=Gt(),h=a(i),F=l(a(h),2),D=a(F),x=a(D);t(D);var A=l(D,2),I=a(A);t(A),t(F),t(h);var P=l(h,4),O=a(P),W=l(a(O)),Y=a(W);Fe(Y,17,()=>r.form.filterData.results.slice(0,5),Be,(p,B)=>{var T=qt(),V=a(T),de=a(V,!0);t(V);var z=l(V),K=a(z,!0);t(z);var E=l(z),Q=a(E,!0);t(E);var q=l(E),xe=a(q,!0);t(q),t(T),j((ae,Se)=>{k(de,e(B).metric),k(K,e(B).areaName),k(Q,ae),k(xe,Se)},[()=>e(B).data.map(ae=>ae.x).join(", "),()=>e(B).data.map(ae=>ae.y).join(", ")]),c(p,T)});var R=l(Y);{var U=p=>{var B=Jt(),T=a(B),V=a(T);t(T),t(B),j(()=>k(V,`...and ${r.form.filterData.results.length-5} more results`)),c(p,B)};M(R,p=>{r.form.filterData.results.length>5&&p(U)})}t(W),t(O),t(P),t(i),j(p=>{k(x,`The server processed your request and found ${r.form.filterData.count??""} results.`),k(I,`Selected Filters: Metric: ${r.form.filterData.metric||"Any"},
              Areas: ${p??""}, Year: ${r.form.filterData.year||"Any"}`)},[()=>{var p;return((p=r.form.filterData["areas[]"])==null?void 0:p.length)>0?r.form.filterData["areas[]"].join(", "):"Any"}]),c(s,i)},C=(s,i)=>{{var h=F=>{var D=zt();c(F,D)};M(s,F=>{var D,x,A,I;((x=(D=r.form)==null?void 0:D.filterData)==null?void 0:x.count)===0&&((I=(A=r.form)==null?void 0:A.filterData)==null?void 0:I.results)!==void 0&&F(h)},i)}};M(L,s=>{var i,h;(h=(i=r.form)==null?void 0:i.filterData)!=null&&h.results&&r.form.filterData.results.length>0?s(d):s(C,!1)})}t(o);var _=l(o,2);we(_,{get code(){return Nt},language:"svelte"}),c(u,m)},ve=u=>{var m=ea(),o=re(m),v=l(a(o),4),w=a(v);const N=y(()=>{var s,i;return((i=(s=r.form)==null?void 0:s.filterData)==null?void 0:i.count)!==void 0?`${r.form.filterData.count} results found`:"Select filters"});Ae(w,{get sectionsData(){return e(ie)},get resultsCount(){return e(N)},filterButtonText:"Filter metrics",applyButtonText:"Submit (Enhanced)",ga4BaseEvent:{event_name:"filter_data",type:"server_enhanced_submit"}}),t(v),Oe(v,s=>{var i;return(i=je)==null?void 0:i(s)});var L=l(v,2);{var d=s=>{var i=Zt(),h=a(i),F=l(a(h),2),D=a(F),x=a(D);t(D);var A=l(D,2),I=a(A);t(A),t(F),t(h);var P=l(h,4),O=a(P),W=l(a(O)),Y=a(W);Fe(Y,17,()=>r.form.filterData.results.slice(0,5),Be,(p,B)=>{var T=Qt(),V=a(T),de=a(V,!0);t(V);var z=l(V),K=a(z,!0);t(z);var E=l(z),Q=a(E,!0);t(E);var q=l(E),xe=a(q,!0);t(q),t(T),j((ae,Se)=>{k(de,e(B).metric),k(K,e(B).areaName),k(Q,ae),k(xe,Se)},[()=>e(B).data.map(ae=>ae.x).join(", "),()=>e(B).data.map(ae=>ae.y).join(", ")]),c(p,T)});var R=l(Y);{var U=p=>{var B=Xt(),T=a(B),V=a(T);t(T),t(B),j(()=>k(V,`...and ${r.form.filterData.results.length-5} more results`)),c(p,B)};M(R,p=>{r.form.filterData.results.length>5&&p(U)})}t(W),t(O),t(P),t(i),j(p=>{k(x,`The server processed your request and found ${r.form.filterData.count??""} results. (Submitted without full page reload.)`),k(I,`Selected Filters: Metric: ${r.form.filterData.metric||"Any"},
              Areas: ${p??""}, Year: ${r.form.filterData.year||"Any"}`)},[()=>{var p;return((p=r.form.filterData["areas[]"])==null?void 0:p.length)>0?r.form.filterData["areas[]"].join(", "):"Any"}]),c(s,i)},C=(s,i)=>{{var h=F=>{var D=$t();c(F,D)};M(s,F=>{var D,x,A,I;((x=(D=r.form)==null?void 0:D.filterData)==null?void 0:x.count)===0&&((I=(A=r.form)==null?void 0:A.filterData)==null?void 0:I.results)!==void 0&&F(h)},i)}};M(L,s=>{var i,h;(h=(i=r.form)==null?void 0:i.filterData)!=null&&h.results&&r.form.filterData.results.length>0?s(d):s(C,!1)})}t(o);var _=l(o,2);we(_,{get code(){return Lt},language:"svelte"}),c(u,m)},$=u=>{var m=aa(),o=re(m),v=l(a(o),4),w=a(v);const N=y(()=>`${e(Z).length} items found`);Ae(w,{get sectionsData(){return he},get resultsCount(){return e(N)},filterButtonText:"Filter items",applyButtonText:"Apply filter (Client-side only)",ga4BaseEvent:{event_name:"filter_items",type:"client_only"}}),t(v),Oe(v,(x,A)=>{var I;return(I=je)==null?void 0:I(x,A)},()=>({formData:x,cancel:A})=>{var P;A();const I=((P=x.get("category"))==null?void 0:P.toString())||"all";De(be,I,!0),De(Z,H(I),!0)});var L=l(v,2),d=l(a(L));t(L);var C=l(L,2),_=a(C),s=a(_);t(_);var i=l(_,2);bt(i,{get data(){return e(Z)},get metaData(){return pe},caption:"Filtered Items",colourScale:"Off"});var h=l(i,2);{var F=x=>{var A=ta();c(x,A)};M(h,x=>{e(Z).length===0&&x(F)})}t(C),t(o);var D=l(o,2);we(D,{get code(){return Vt},language:"svelte"}),j(()=>{k(d,` ${(e(be)==="all"?"All items":e(be))??""}`),k(s,`Results (${e(Z).length??""} items)`)}),c(u,m)},ee=u=>{var m=na(),o=re(m),v=l(a(o),4),w=a(v);Ae(w,{get sectionsData(){return e(ie)},get resultsCount(){return e(oe)},filterButtonText:"Filter metrics",applyButtonText:"Apply with enhancement",ga4BaseEvent:{event_name:"filter_data",type:"enhanced"}});var N=l(w,2);{var L=_=>{var s=ia(),i=a(s),h=l(a(i),2),F=a(h),D=a(F);t(F),qe(2),t(h),t(i);var x=l(i,4),A=a(x),I=l(a(A)),P=a(I);Fe(P,17,()=>e(le).slice(0,5),Be,(Y,R)=>{var U=ra(),p=a(U),B=a(p,!0);t(p);var T=l(p),V=a(T,!0);t(T);var de=l(T),z=a(de,!0);t(de);var K=l(de),E=a(K,!0);t(K),t(U),j((Q,q)=>{k(B,e(R).metric),k(V,e(R).areaName),k(z,Q),k(E,q)},[()=>e(R).data.map(Q=>Q.x).join(", "),()=>e(R).data.map(Q=>Q.y).join(", ")]),c(Y,U)});var O=l(P);{var W=Y=>{var R=la(),U=a(R),p=a(U);t(U),t(R),j(()=>k(p,`...and ${e(le).length-5} more results`)),c(Y,R)};M(O,Y=>{e(le).length>5&&Y(W)})}t(I),t(A),t(x),t(s),j(()=>k(D,`Client-side processing completed with ${e(le).length??""}
                results.`)),c(_,s)},d=(_,s)=>{{var i=h=>{var F=sa();c(h,F)};M(_,h=>{e(ce)&&h(i)},s)}};M(N,_=>{e(ce)&&e(le).length>0?_(L):_(d,!1)})}t(v),Oe(v,(_,s)=>{var i;return(i=je)==null?void 0:i(_,s)},()=>({formData:_,cancel:s})=>{var x,A;const i=((x=_.get("metric"))==null?void 0:x.toString())||null,h=Array.from(_.getAll("areas[]")).map(I=>I.toString()),F=((A=_.get("year"))==null?void 0:A.toString())||"all";s();const D=b(i,h,F);De(le,D,!0),De(oe,`${D.length} results found`),De(ce,!0)}),t(o);var C=l(o,2);we(C,{get code(){return Rt},language:"svelte"}),c(u,m)};let J=y(()=>ke.data.metrics||[]),fe=y(()=>ke.data.areas||[]),ne=y(()=>ke.data.years||[]),le=Ce(Pe([])),oe=Ce("Ready to filter"),ce=Ce(!1);const X=[{id:1,name:"Laptop",category:"electronics"},{id:2,name:"Mouse",category:"electronics"},{id:3,name:"Coffee Mug",category:"home"},{id:4,name:"Desk Chair",category:"home"}],pe={id:{shortLabel:"ID",explainer:"Item ID"},name:{shortLabel:"Name",explainer:"Item name"},category:{shortLabel:"Category",explainer:"Item category"}};let Z=Ce(Pe(X)),be=Ce("all");function H(u){return u==="all"?X:X.filter(m=>m.category===u)}let he=[{id:"category",type:"radios",title:"Category",ga4Section:"category_filter",ga4IndexSection:1,ga4IndexSectionCount:1,name:"category",legend:"Select category",options:[{value:"all",label:"All items"},{value:"electronics",label:"Electronics"},{value:"home",label:"Home"}],selectedValue:e(be)}];const ye=[{id:"categories",type:"checkboxes",title:"Categories",ga4Section:"categories_filter",ga4IndexSection:1,ga4IndexSectionCount:2,name:"categories[]",legend:"Select categories",options:[{value:"food",label:"Food & Drink"},{value:"travel",label:"Travel"},{value:"tech",label:"Technology"}]},{id:"rating",type:"radios",title:"Rating",ga4Section:"rating_filter",ga4IndexSection:2,ga4IndexSectionCount:2,name:"rating",legend:"Select minimum rating",options:[{value:"any",label:"Any rating"},{value:"3",label:"3 stars & above"},{value:"4",label:"4 stars & above"},{value:"5",label:"5 stars only"}],selectedValue:"any"}],te=[{id:"location",type:"select",title:"Location",ga4Section:"location_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"region-select",name:"region",label:"Select region",options:[{value:"",label:"All regions",disabled:!1},{value:"north",label:"North"},{value:"south",label:"South"},{value:"east",label:"East"},{value:"west",label:"West"}],fullWidth:!0},{id:"city-select",name:"city",label:"Select city (optional)",options:[{value:"",label:"All cities",disabled:!1},{value:"london",label:"London"},{value:"manchester",label:"Manchester"},{value:"birmingham",label:"Birmingham"},{value:"leeds",label:"Leeds"}],fullWidth:!0}]},{id:"price",type:"radios",title:"Price Range",ga4Section:"price_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"price",legend:"Select price range",options:[{value:"any",label:"Any price"},{value:"low",label:"£ (Budget)"},{value:"medium",label:"££ (Mid-range)"},{value:"high",label:"£££ (Premium)"}],selectedValue:"any"},{id:"features",type:"checkboxes",title:"Features",ga4Section:"features_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"features[]",legend:"Select desired features",options:[{value:"wifi",label:"Free Wi-Fi"},{value:"parking",label:"Parking"},{value:"accessible",label:"Wheelchair accessible"},{value:"pets",label:"Pet friendly"}]}];let ie=y(()=>[{id:"metrics",type:"select",title:"Metrics",ga4Section:"metrics_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"metric-select",name:"metric",label:"Select metric",options:[{value:"",label:"All metrics",disabled:!1},...e(J).map(u=>({value:u,label:u}))],fullWidth:!0}]},{id:"areas",type:"checkboxes",title:"Local Authorities",ga4Section:"areas_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"areas[]",legend:"Select local authorities",options:e(fe).slice(0,5).map(u=>{var m;return{value:u,label:((m=ke.data.areaCodeLookup)==null?void 0:m[u])||u}})},{id:"years",type:"radios",title:"Years",ga4Section:"years_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"year",legend:"Select year",options:[{value:"all",label:"All years"},...e(ne).map(u=>({value:u.toString(),label:u.toString()}))],selectedValue:"all"}]);function b(u,m,o){let v=[];if(ke.data.dataInFormatForLineChart){let w=[...ke.data.dataInFormatForLineChart];u&&u!=="all"&&(w=w.filter(N=>N.metric===u)),w.forEach(N=>{(m.length>0?N.lines.filter(d=>m.includes(d.areaCode)):N.lines).forEach(d=>{var _;const C=o==="all"||!o?d.data:d.data.filter(s=>s.x.toString()===o);C.length>0&&v.push({metric:N.metric,areaCode:d.areaCode,areaName:((_=ke.data.areaCodeLookup)==null?void 0:_[d.areaCode])||d.areaCode,data:C})})})}return v}let n=[{id:"1",heading:"1. Basic Filter Panel Example",content:me},{id:"2",heading:"2. Advanced Filter Panel with Multiple Select and Options",content:ge},{id:"3",heading:"3. Server Form Submission (Full Page Reload)",content:_e},{id:"4",heading:"4 Server Submission with Basic use:enhance for progressive enhancement",content:ve},{id:"5",heading:"5. Client-Side Only with use:enhance cancel() - No Server Fallback",content:$},{id:"6",heading:"6. Progressive Enhancement with use:enhance to cancel form submission and process client-side, server-side submission as fallback",content:ee}];var f=da(),G=l(a(f),2);pt(G,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(u,m)=>{var o=Te(),v=re(o);Fe(v,17,()=>n,Be,(w,N)=>{gt(w,{children:(L,d)=>{var C=oa(),_=a(C);Ve(_,()=>e(N).content),t(C),c(L,C)},$$slots:{default:!0,header:(L,d)=>{var C=ca(),_=a(C,!0);t(C),j(()=>k(_,e(N).heading)),c(L,C)}}})}),c(u,o)},$$slots:{default:!0}}),t(f),c(se,f),Ne()}const Ye=(se,r=Ee,me=Ee,ge=Ee,_e=Ee)=>{Xe(se,{get name(){return r()},get folder(){return me()},get subFolder(){return ge()},get homepage(){return _e()},get statusObject(){return ma},parentFolder:"components-update"})},Ue=(se,r=Ee)=>{rt(se,{get homepage(){return r()},get detailsArray(){return pa},get connectedComponentsArray(){return ga}})};let ma={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},va=["A collapsible filter panel component that allows users to refine search results or content listings. <a href='https://github.com/alphagov/finder-frontend/blob/main/spec/javascripts/components/filter-panel-spec.js' target='_blank' rel='noopener noreferrer'>Based on the GOV.UK Finder Frontend component</a>, it supports various filter types including radio buttons, date inputs, dropdowns, and checkboxes.","The component includes built-in GA4 event tracking, responsive design, and accessibility features like ARIA labels and keyboard navigation.","An example of the original component in use can be seen on the <a href='https://www.gov.uk/search/all?keywords=tax&order=relevance' target='_blank' rel='noopener noreferrer'>GOV.UK search page</a>."],fa=["Use this component on pages where users need to filter through large sets of content or search results.","Common use cases include:","- Document or publication finders","- Search results refinement","- Content listing pages with multiple filter options","- Any interface where users need to narrow down a large dataset using multiple criteria"],pa=[{label:"Description",arr:va,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:fa,visibleOnHomepage:!1,markdown:!0}],ga=[];var ba=g('<div class="p-8"><!></div>'),ha=g('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function ya(se,r){Me(r,!0);const me=f=>{var G=ba(),u=a(G);Ae(u,Qe(()=>e(X))),t(G),c(f,G)};let ge=ke.url.pathname.split("/"),_e=nt(ge[ge.length-1]),ve=Ce(Pe(Ze.md)),$=y(()=>lt([{name:"resultsCount",category:"Display props",value:"125 results",description:{markdown:!0,arr:["The total number of results to display in the header. Usually updated when filters change."]}},{name:"sectionsData",category:"Content props",value:[{id:"document-type",type:"radios",title:"Document type",openByDefault:!0,ga4Section:"document_type",ga4IndexSection:1,ga4IndexSectionCount:4,name:"document_type",legend:"Select document type",options:[{value:"all",label:"All document types"},{value:"policy",label:"Policy papers"},{value:"guidance",label:"Guidance"},{value:"news",label:"News and communications"}],selectedValue:"all"},{id:"date-range",type:"date",title:"Date published",ga4Section:"date_published",ga4IndexSection:2,ga4IndexSectionCount:4,fromLegend:"Published after",fromNamePrefix:"published_at[from]",fromHint:"For example, 2020 or 21/11/2020",toLegend:"Published before",toNamePrefix:"published_at[to]",toHint:"For example, 2023 or 21/11/2023",legendSize:{undefined:void 0}},{id:"topic",type:"select",title:"Topic",ga4Section:"topic",ga4IndexSection:3,ga4IndexSectionCount:4,selects:[{id:"level-one",name:"topics[]",label:"All topics",options:[{value:"",label:"Please select",disabled:!0},{value:"business",label:"Business and industry"},{value:"health",label:"Health and social care"},{value:"education",label:"Education"}],fullWidth:!0}]},{id:"organisations",type:"checkboxes",title:"Organisations",ga4Section:"organisations",ga4IndexSection:4,ga4IndexSectionCount:4,name:"organisations[]",legend:"Select organisations",options:[{value:"cabinet-office",label:"Cabinet Office"},{value:"dfe",label:"Department for Education"},{value:"dhsc",label:"Department of Health and Social Care"}]}],description:{markdown:!0,arr:["An array of filter sections. Each section can be one of four types:","- `radios`: Single-select options with radio buttons","- `date`: Date range inputs with from/to fields","- `select`: Dropdown select menus","- `checkboxes`: Multi-select options with checkboxes","Each section type has its own required properties and optional configurations."]}},{name:"filterButtonText",category:"Display props",value:"Filter and sort",description:{markdown:!0,arr:["The text to display on the main filter toggle button."]}},{name:"applyButtonText",category:"Display props",value:"Apply filters",description:{markdown:!0,arr:["The text to display on the apply button at the bottom of the filter panel."]}},{name:"filterPanelSectionsExpanded",category:"Display props",value:!1,options:[!0,!1],propType:"radio",description:{markdown:!0,arr:["Controls whether individual filter sections (like 'Document type', 'Date published') are expanded or collapsed.","This works reactively - changing the value will immediately expand/collapse all sections.","Individual sections can override this setting using their `openByDefault` property."]}},{name:"filterPanelExpanded",category:"Display props",value:!0,options:[!0,!1],propType:"radio",description:{markdown:!0,arr:["Controls whether the entire filter panel is visible or hidden.","This works reactively - changing the value will immediately show/hide the filter panel.","When `false`, users need to click the 'Filter and sort' button to reveal the filter options."]}},{name:"ga4BaseEvent",category:"Analytics props",propType:"fixed",value:{event_name:"select_content",type:"finder"},description:{markdown:!0,arr:["Base GA4 event data that will be merged with section-specific data for analytics tracking."]}}])),ee=function(f,G,u){return f.map(m=>{let o=u[m.name]??m.value;return m.isEditable===G&&o!=null?typeof o=="object"?JSON.stringify(o,null,2):o:null})},J=Ce(Pe(ee(e($),!0,{}))),fe=y(()=>({})),ne=y(()=>ee(e($),!1,e(fe))),le=y(()=>it(e($),e(J))),oe=y(()=>st(e($),e(J),e(ne))),ce=y(()=>Ge(e(oe),2)),X=y(()=>e(ce)[0]),pe=y(()=>e(ce)[1]),Z=Pe({});Je(()=>{e(pe).forEach(f=>{Z[f]=!0}),Object.keys(Z).forEach(f=>{e(pe).includes(f)||(Z[f]=!1)})});let be=y(()=>Object.fromEntries(Object.entries(e(X)).map(([f,G])=>{var u,m;return[f,typeof G=="function"?(m=(u=e($).find(o=>o.name===f))==null?void 0:u.functionElements)==null?void 0:m.functionAsString:G]})));var H=ha(),he=re(H);const ye=y(()=>({component:{WrapperInformation:Ue,WrapperNameAndStatus:Ye},name:_e}));et(he,{get wrapper(){return e(ye)},homepage:!1});var te=l(he,2);tt(te,{get parametersParsingErrorsArray(){return e(pe)},get parametersParsingErrorsObject(){return Z},onCloseFunction:f=>e(pe).filter(G=>G!=f)});var ie=l(te,2);at(ie,{get Component(){return me},get parametersSourceArray(){return e($)},get derivedParametersValuesArray(){return e(ne)},get parametersVisibleArray(){return e(le)},get parametersParsingErrorsObject(){return Z},get copyParametersToClipboardObject(){return e(be)},get demoScreenWidth(){return e(ve)},set demoScreenWidth(f){De(ve,f,!0)},get statedParametersValuesArray(){return e(J)},set statedParametersValuesArray(f){De(J,f,!0)}});var b=l(ie,2),n=a(b);ua(n,{get form(){return r.form}}),t(b),c(se,H),Ne()}const Ua=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Ue,WrapperNameAndStatus:Ye,default:ya},Symbol.toStringTag,{value:"Module"}));export{Ua as _};
