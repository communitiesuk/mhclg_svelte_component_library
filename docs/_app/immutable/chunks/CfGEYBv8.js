import"./CWj6FrbW.js";import{p as Pe,ab as Ae,J as he,I as ye,c as a,r as t,s as o,y as e,G as g,f as ae,t as O,a as Ie,z as We,D as ke,u as He,ac as Ve}from"./I52qY7cu.js";import{f as v,a as u,t as Ye,c as Fe,p as Ue}from"./BBh-6AA0.js";import{p as de,s as qe}from"./BHp14Q1u.js";import{a as Ee,B as Ge,d as Je}from"./Dso6Mmak.js";import{W as ze,P as Ke,C as Qe,B as Xe,a as Ze,t as $e,c as et}from"./C-NMf74u.js";import{p as ge}from"./D5I35bDD.js";import{k as tt}from"./lMwbQCpd.js";import{s as k,d as je}from"./5F35P8og.js";import{i as R}from"./HAye_oo1.js";import{e as be,i as Ce}from"./n63ZiD1W.js";import{r as Oe,a as b,g as Re,h as at,s as xe,b as rt}from"./vwgBT8YE.js";import{R as lt}from"./CNUvwmkK.js";import{o as it}from"./CUqUSu4U.js";import{h as st}from"./B-AqiMg2.js";import{s as Me}from"./BvNl7SXi.js";import{c as nt}from"./OJoj-rvW.js";import{S as ot}from"./C1_WJPR1.js";import{D as Te}from"./COTzZZCa.js";import{A as dt,a as ct}from"./CSiiXlo3.js";import"./69_IOA4Y.js";import{e as Be}from"./DHNPtfbR.js";import{C as De}from"./BN7FUiX4.js";var ut=v('<h1 class="govuk-fieldset__heading"> </h1>'),mt=v('<div class="govuk-hint" role="note"> </div>'),vt=v('<p class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> </p>'),ft=v('<div class="govuk-checkboxes__divider" role="separator" aria-orientation="horizontal">or</div>'),pt=(te,r,re)=>r(e(re)),gt=v('<div class="govuk-hint govuk-checkboxes__hint" role="note"> </div>'),bt=v('<div role="region"><!></div>'),ht=v('<!> <div class="govuk-checkboxes__item" role="checkbox"><input type="checkbox" class="govuk-checkboxes__input"/> <label class="govuk-label govuk-checkboxes__label"> </label> <!></div> <!>',1),yt=v('<div role="group"><fieldset class="govuk-fieldset"><legend><!></legend> <!> <!> <div data-module="govuk-checkboxes" role="group"></div></fieldset></div>');function _t(te,r){Pe(r,!0);let re=de(r,"isPageHeading",3,!1),ce=de(r,"legendSize",3,"l"),ue=de(r,"small",3,!1),le=de(r,"options",19,()=>[]),z=de(r,"validate",3,void 0),K=de(r,"selectedValues",31,()=>Ae([])),Y=ye(!1);it(()=>{var l;he(Y,((l=document.body)==null?void 0:l.classList.contains("govuk-frontend-supported"))??!1,!0)});let ie=g(()=>l=>K().includes(l)),G=g(()=>e(Y)&&z()?z()(K()):void 0);function me(l){e(Y)&&(l.exclusive?K(K().includes(l.value)?[]:[l.value]):K(K().includes(l.value)?K().filter(i=>i!==l.value):[...K().filter(i=>!le().find(d=>d.value===i&&d.exclusive)),l.value]))}var Q=yt(),se=a(Q),Z=a(se),$=a(Z);{var U=l=>{var i=ut(),d=a(i,!0);t(i),O(()=>k(d,r.legend)),u(l,i)},pe=l=>{var i=Ye();O(()=>k(i,r.legend)),u(l,i)};R($,l=>{re()?l(U):l(pe,!1)})}t(Z);var ne=o(Z,2);{var ve=l=>{var i=mt(),d=a(i,!0);t(i),O(()=>{b(i,"id",`${r.name??""}-hint`),k(d,r.hint)}),u(l,i)};R(ne,l=>{r.hint&&l(ve)})}var h=o(ne,2);{var C=l=>{var i=vt(),d=o(a(i));t(i),O(()=>{b(i,"id",`${r.name??""}-error`),k(d,` ${(e(G)||r.error)??""}`)}),u(l,i)};R(h,l=>{(e(Y)&&e(G)||r.error)&&l(C)})}var p=o(h,2);be(p,21,le,Ce,(l,i,d)=>{var F=ht(),x=ae(F);{var y=S=>{var P=ft();u(S,P)};R(x,S=>{e(i).exclusive&&d>0&&S(y)})}var s=o(x,2),n=a(s);Oe(n),n.__change=[pt,me,i];var c=o(n,2),_=a(c,!0);t(c);var E=o(c,2);{var w=S=>{var P=gt(),X=a(P,!0);t(P),O(()=>{b(P,"id",`${r.name??""}-${d}-hint`),k(X,e(i).hint)}),u(S,P)};R(E,S=>{e(i).hint&&S(w)})}t(s);var H=o(s,2);{var M=S=>{var P=bt(),X=a(P);{var B=D=>{var V=Fe(),m=ae(V);st(m,()=>e(i).conditional.content),u(D,V)},I=(D,V)=>{{var m=f=>{var T=Fe(),L=ae(T);Me(L,()=>e(i).conditional.content),u(f,T)},A=f=>{var T=Fe(),L=ae(T);nt(L,()=>e(i).conditional.content,(q,ee)=>{ee(q,{})}),u(f,T)};R(D,f=>{e(i).conditional.content?f(m):f(A,!1)},V)}};R(X,D=>{typeof e(i).conditional.content=="string"?D(B):D(I,!1)})}t(P),O(D=>{b(P,"id",e(i).conditional.id),xe(P,1,`govuk-checkboxes__conditional${D??""}`),b(P,"aria-labelledby",`${r.name??""}-$${d}-label`)},[()=>!e(Y)||!e(ie)(e(i).value)?" govuk-checkboxes__conditional--hidden":""]),u(S,P)};R(H,S=>{e(i).conditional&&S(M)})}O((S,P,X,B)=>{var I;b(s,"aria-checked",S),b(n,"name",r.name),b(n,"id",`${r.name??""}-${d}`),Re(n,e(i).value),b(n,"data-aria-controls",(I=e(i).conditional)==null?void 0:I.id),b(n,"aria-expanded",P),b(n,"aria-describedby",X),at(n,B),b(n,"data-behaviour",e(i).exclusive?"exclusive":void 0),b(c,"for",`${r.name??""}-${d}`),b(c,"id",`${r.name??""}-$${d}-label`),k(_,e(i).label)},[()=>e(Y)?e(ie)(e(i).value):null,()=>e(Y)?e(ie)(e(i).value):null,()=>[e(i).hint?`${r.name}-${d}-hint`:null,e(i).conditional?e(i).conditional.id:null].filter(Boolean).join(" "),()=>e(ie)(e(i).value)]),u(l,F)}),t(p),t(se),t(Q),O(l=>{xe(Q,1,`govuk-form-group${e(G)||r.error?" govuk-form-group--error":""}`),b(Q,"aria-labelledby",`${r.name??""}-legend`),b(se,"aria-describedby",l),b(Z,"id",`${r.name??""}-legend`),xe(Z,1,`govuk-fieldset__legend govuk-fieldset__legend--${ce()??""}`),xe(p,1,`govuk-checkboxes${ue()?" govuk-checkboxes--small":""}`),b(p,"aria-labelledby",`${r.name??""}-legend`)},[()=>[r.hint?`${r.name}-hint`:null,r.error||e(G)?`${r.name}-error`:null].filter(Boolean).join(" ")]),u(te,Q),Ie()}je(["change"]);function xt(te,r){he(r,!e(r))}var St=v('<span class="govuk-visually-hidden">Filter by</span>'),Dt=v('<div class="govuk-form-group govuk-!-margin-bottom-2"><!></div>'),kt=v('<div data-ga4-section="Updated after"><!></div> <div data-ga4-section="Updated before"><!></div>',1),Ct=v("<div><!></div>"),At=v('<div data-module="gem-checkboxes govuk-checkboxes" class="gem-c-checkboxes govuk-form-group govuk-checkboxes--small"><!></div>'),Ft=v('<details data-module="filter-section"><summary class="app-c-filter-section__summary svelte-1y8e532" data-ga4-expandable=""><h2 class="app-c-filter-section__summary-heading svelte-1y8e532"><!> </h2></summary> <div class="app-c-filter-section__content"><!></div></details>'),wt=v('<div class="app-c-filter-panel__content svelte-1y8e532" role="region"><!> <div class="app-c-filter-panel__actions svelte-1y8e532"><input type="submit" class="govuk-button app-c-filter-panel__action app-c-filter-panel__action--submit svelte-1y8e532"/></div></div>'),Pt=v('<div data-module="filter-panel ga4-event-tracker" class="app-c-filter-panel svelte-1y8e532"><div class="app-c-filter-panel__header svelte-1y8e532"><button class="app-c-filter-panel__button govuk-link svelte-1y8e532" data-ga4-expandable=""><span class="app-c-filter-panel__button-inner svelte-1y8e532"> </span></button> <h2 id="js-result-count" class="app-c-filter-panel__count svelte-1y8e532"> </h2></div> <!></div>');function _e(te,r){const re=Ue();let ce=de(r,"resultsCount",3,"0 results"),ue=de(r,"sectionsData",19,()=>[]),le=de(r,"filterButtonText",3,"Filter and sort"),z=de(r,"applyButtonText",3,"Apply"),K=de(r,"ga4BaseEvent",19,()=>({event_name:"select_content",type:"finder"})),Y=g(ue),ie=ye(!0);const G=`filter-panel-${re}`,me=`filter-button-${re}`;function Q(l){return JSON.stringify({...K(),...l})}function se(l){return[{name:"day",label:"Day",value:l==null?void 0:l.day,attributes:{spellcheck:"false"}},{name:"month",label:"Month",value:l==null?void 0:l.month,attributes:{spellcheck:"false"}},{name:"year",label:"Year",value:l==null?void 0:l.year,attributes:{spellcheck:"false"}}]}var Z=Pt(),$=a(Z),U=a($);U.__click=[xt,ie];var pe=a(U),ne=a(pe,!0);t(pe),t(U);var ve=o(U,2),h=a(ve,!0);t(ve),t($);var C=o($,2);{var p=l=>{var i=wt(),d=a(i);be(d,17,()=>e(Y),y=>y.id,(y,s)=>{var n=Ft(),c=a(n),_=a(c),E=a(_);{var w=B=>{var I=St();u(B,I)};R(E,B=>{e(s).type!=="radios"&&B(w)})}var H=o(E);t(_),t(c);var M=o(c,2),S=a(M);{var P=B=>{var I=Dt();const D=g(()=>e(s));var V=a(I);const m=g(()=>e(D).options.map(A=>({...A})));lt(V,{get name(){return e(D).name},get legend(){return e(D).legend},legendSize:"m",isPageHeading:!1,get options(){return e(m)},get selectedValue(){return e(D).selectedValue},small:!0}),t(I),u(B,I)},X=(B,I)=>{{var D=m=>{var A=kt();const f=g(()=>e(s));var T=ae(A),L=a(T);const q=g(()=>`${e(f).id}-from`),ee=g(()=>se(e(f).fromInitialValue)),J=g(()=>({legend:{text:e(f).fromLegend,isPageHeading:!1}})),W=g(()=>({text:e(f).fromHint}));Te(L,{get id(){return e(q)},get namePrefix(){return e(f).fromNamePrefix},get items(){return e(ee)},get fieldset(){return e(J)},get hint(){return e(W)},legendSize:void 0}),t(T);var j=o(T,2),oe=a(j);const N=g(()=>`${e(f).id}-to`),fe=g(()=>se(e(f).toInitialValue)),we=g(()=>({legend:{text:e(f).toLegend,isPageHeading:!1}})),Se=g(()=>({text:e(f).toHint}));Te(oe,{get id(){return e(N)},get namePrefix(){return e(f).toNamePrefix},get items(){return e(fe)},get fieldset(){return e(we)},get hint(){return e(Se)},legendSize:void 0}),t(j),u(m,A)},V=(m,A)=>{{var f=L=>{var q=Fe();const ee=g(()=>e(s));var J=ae(q);be(J,19,()=>e(ee).selects,W=>W.id,(W,j,oe)=>{var N=Ct(),fe=a(N);const we=g(()=>e(j).options.map(Se=>({value:Se.value,text:Se.label,disabled:Se.disabled})));ot(fe,{get id(){return e(j).id},get name(){return e(j).name},get label(){return e(j).label},get items(){return e(we)},get value(){return e(j).value},get fullWidth(){return e(j).fullWidth},labelIsPageHeading:!1}),t(N),O(()=>{xe(N,1,`govuk-form-group gem-c-select ${e(oe)===1?"js-required":""}`,"svelte-1y8e532"),rt(N,e(oe)===1?"display: block;":void 0),b(N,"data-ga4-section",e(oe)===1?e(j).label:void 0)}),u(W,N)}),u(L,q)},T=(L,q)=>{{var ee=J=>{var W=At();const j=g(()=>e(s));var oe=a(W);const N=g(()=>e(j).options.map(fe=>({...fe})));_t(oe,{get name(){return e(j).name},get legend(){return e(j).legend},legendSize:"m",isPageHeading:!1,get options(){return e(N)},get selectedValues(){return e(j).selectedValues},small:!0}),t(W),O(()=>b(W,"id",`checkboxes-${e(j).id}`)),u(J,W)};R(L,J=>{e(s).type==="checkboxes"&&J(ee)},q)}};R(m,L=>{e(s).type==="select"?L(f):L(T,!1)},A)}};R(B,m=>{e(s).type==="date"?m(D):m(V,!1)},I)}};R(S,B=>{e(s).type==="radios"?B(P):B(X,!1)})}t(M),t(n),O((B,I,D)=>{b(n,"data-ga4-index",B),b(n,"data-ga4-section",e(s).ga4Section),b(n,"data-ga4-filter-parent",e(s).ga4Section),b(n,"data-ga4-change-category",I),xe(n,1,`app-c-filter-section ${e(s).type==="select"&&e(s).title==="Topic"?"js-all-content-finder-taxonomy-select":""}`,"svelte-1y8e532"),n.open=e(s).openByDefault===void 0?!0:e(s).openByDefault,b(c,"data-ga4-event",D),k(H,` ${e(s).title??""}`)},[()=>JSON.stringify({index_section:e(s).ga4IndexSection,index_section_count:e(s).ga4IndexSectionCount}),()=>`update-filter ${e(s).type==="radios"||e(s).type==="checkboxes"?e(s).type.slice(0,-2):e(s).type}`,()=>Q({section:e(s).ga4Section,text:e(s).ga4Section,index_section:e(s).ga4IndexSection,index_section_count:e(s).ga4IndexSectionCount})]),u(y,n)});var F=o(d,2),x=a(F);Oe(x),t(F),t(i),O(y=>{b(i,"id",G),b(i,"aria-labelledby",me),Re(x,z()),b(x,"data-ga4-event",y),b(x,"data-disable-with",z())},[()=>Q({text:z(),section:le(),action:"apply",index_section:0,index_section_count:e(Y).length})]),u(l,i)};R(C,l=>{e(ie)&&l(p)})}t(Z),O(l=>{b(U,"id",me),b(U,"aria-expanded",e(ie)),b(U,"aria-controls",G),b(U,"data-ga4-event",l),k(ne,le()),k(h,ce())},[()=>Q({section:le(),text:le(),index_section:0,index_section_count:e(Y).length})]),u(te,Z)}je(["click"]);const It=`
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
`,Et=`
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
`,Tt=`
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
`,Bt=`
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
`,jt=`
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
`;var Ot=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Basic Filter Panel</h3> <p class="mb-4">This example demonstrates a simple filter panel with checkboxes and radio
      buttons for category and rating filters.</p> <!></div> <!>`,1),Rt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Advanced Filter Panel</h3> <p class="mb-4">This example demonstrates a more complex filter panel with select
      dropdowns, radio buttons, and checkboxes for location, price, and feature
      filters.</p> <!></div> <!>`,1),Mt=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Nt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Lt=v('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="region" aria-labelledby="form-success"><h2 class="govuk-notification-banner__title" id="form-success">Form submitted to server</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),Wt=v('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server).</p></div>'),Ht=v('<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server-side Form Submission</h3> <p class="mb-4">This example demonstrates a traditional form submission that sends data to\n      the server (`+page.server.ts`) and causes a full page reload. The results\n      are passed back via the `form` prop.</p> <form method="POST"><!></form> <!></div> <!>',1),Vt=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),Yt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Ut=v('<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="form-success-basic-enhance"><h2 class="govuk-notification-banner__title" id="form-success-basic-enhance">Form submitted (Enhanced by SvelteKit)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="mt-2 text-sm italic"> </p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>'),qt=v(`<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed by server with
          enhancement).</p></div>`),Gt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Server Submission with Basic use:enhance</h3> <p class="mb-4">This example is identical to the server form submission above, but adds <code>use:enhance</code> to the form. SvelteKit handles the submission via a fetch request, preventing
      a full page reload and automatically updating the <code>form</code> prop with
      the server's response.</p> <form method="POST"><!></form> <!></div> <!>`,1),Jt=v('<tr><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td><td class="px-4 py-2 border"> </td></tr>'),zt=v('<tr><td colspan="4" class="px-4 py-2 border text-center italic"> </td></tr>'),Kt=v(`<div class="mt-8 border-t pt-4"><div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="enhance-success"><h2 class="govuk-notification-banner__title" id="enhance-success">Enhanced Form Processing (Client-side)</h2> <div class="govuk-notification-banner__content"><p> </p> <p class="italic text-sm mt-2">(With JavaScript disabled, this would have been processed by the
                server instead.)</p></div></div> <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4> <div class="overflow-x-auto"><table class="min-w-full bg-white border"><thead><tr class="bg-gray-100"><th class="px-4 py-2 border">Metric</th><th class="px-4 py-2 border">Area</th><th class="px-4 py-2 border">Years</th><th class="px-4 py-2 border">Data Points</th></tr></thead><tbody><!><!></tbody></table></div></div>`),Qt=v('<div class="mt-8 border-t pt-4"><p class="italic">No results match your filter criteria (processed client-side).</p></div>'),Xt=v(`<div class="p-5 bg-white"><h3 class="text-xl font-bold mb-4">Progressive Enhancement with use:enhance</h3> <p class="mb-4">This example demonstrates progressive enhancement with <code>use:enhance</code> - it works without JavaScript (falling back to the server action above),
      but when JavaScript is available, it provides a better user experience by processing
      client-side without page reloads.</p> <form method="POST"><!> <!></form></div> <!>`,1),Zt=v('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),$t=v('<span slot="header" class="text-lg"> </span>'),ea=v('<div><h5 class="underline underline-offset-4 my-6">Form Submission Examples</h5> <!></div>');function ta(te,r){Pe(r,!0);const re=h=>{var C=Ot(),p=ae(C),l=o(a(p),4);_e(l,{get sectionsData(){return se},resultsCount:"26 results found",filterButtonText:"Show filters",applyButtonText:"Apply filters",ga4BaseEvent:{event_name:"filter_items",type:"basic"}}),t(p);var i=o(p,2);De(i,{get code(){return Bt},language:"svelte"}),u(h,C)},ce=h=>{var C=Rt(),p=ae(C),l=o(a(p),4);_e(l,{get sectionsData(){return Z},resultsCount:"56 results found",filterButtonText:"View filters",applyButtonText:"Update results",ga4BaseEvent:{event_name:"filter_listings",type:"advanced"}}),t(p);var i=o(p,2);De(i,{get code(){return jt},language:"svelte"}),u(h,C)},ue=h=>{var C=Ht(),p=ae(C),l=o(a(p),4),i=a(l);const d=g(()=>{var n,c;return((c=(n=r.form)==null?void 0:n.filterData)==null?void 0:c.count)!==void 0?`${r.form.filterData.count} results found`:"Select filters"});_e(i,{get sectionsData(){return e($)},get resultsCount(){return e(d)},filterButtonText:"Filter metrics",applyButtonText:"Submit to server",ga4BaseEvent:{event_name:"filter_data",type:"server_submit"}}),t(l);var F=o(l,2);{var x=n=>{var c=Lt(),_=a(c),E=o(a(_),2),w=a(E),H=a(w);t(w);var M=o(w,2),S=a(M);t(M),t(E),t(_);var P=o(_,4),X=a(P),B=o(a(X)),I=a(B);be(I,17,()=>r.form.filterData.results.slice(0,5),Ce,(m,A)=>{var f=Mt(),T=a(f),L=a(T,!0);t(T);var q=o(T),ee=a(q,!0);t(q);var J=o(q),W=a(J,!0);t(J);var j=o(J),oe=a(j,!0);t(j),t(f),O((N,fe)=>{k(L,e(A).metric),k(ee,e(A).areaName),k(W,N),k(oe,fe)},[()=>e(A).data.map(N=>N.x).join(", "),()=>e(A).data.map(N=>N.y).join(", ")]),u(m,f)});var D=o(I);{var V=m=>{var A=Nt(),f=a(A),T=a(f);t(f),t(A),O(()=>k(T,`...and ${r.form.filterData.results.length-5} more results`)),u(m,A)};R(D,m=>{r.form.filterData.results.length>5&&m(V)})}t(B),t(X),t(P),t(c),O(m=>{k(H,`The server processed your request and found ${r.form.filterData.count??""} results.`),k(S,`Selected Filters: Metric: ${r.form.filterData.metric||"Any"},
              Areas: ${m??""}, Year: ${r.form.filterData.year||"Any"}`)},[()=>{var m;return((m=r.form.filterData["areas[]"])==null?void 0:m.length)>0?r.form.filterData["areas[]"].join(", "):"Any"}]),u(n,c)},y=(n,c)=>{{var _=E=>{var w=Wt();u(E,w)};R(n,E=>{var w,H,M,S;((H=(w=r.form)==null?void 0:w.filterData)==null?void 0:H.count)===0&&((S=(M=r.form)==null?void 0:M.filterData)==null?void 0:S.results)!==void 0&&E(_)},c)}};R(F,n=>{var c,_;(_=(c=r.form)==null?void 0:c.filterData)!=null&&_.results&&r.form.filterData.results.length>0?n(x):n(y,!1)})}t(p);var s=o(p,2);De(s,{get code(){return It},language:"svelte"}),u(h,C)},le=h=>{var C=Gt(),p=ae(C),l=o(a(p),4),i=a(l);const d=g(()=>{var n,c;return((c=(n=r.form)==null?void 0:n.filterData)==null?void 0:c.count)!==void 0?`${r.form.filterData.count} results found`:"Select filters"});_e(i,{get sectionsData(){return e($)},get resultsCount(){return e(d)},filterButtonText:"Filter metrics",applyButtonText:"Submit (Enhanced)",ga4BaseEvent:{event_name:"filter_data",type:"server_enhanced_submit"}}),t(l),Ee(l,n=>{var c;return(c=Be)==null?void 0:c(n)});var F=o(l,2);{var x=n=>{var c=Ut(),_=a(c),E=o(a(_),2),w=a(E),H=a(w);t(w);var M=o(w,2),S=a(M);t(M),t(E),t(_);var P=o(_,4),X=a(P),B=o(a(X)),I=a(B);be(I,17,()=>r.form.filterData.results.slice(0,5),Ce,(m,A)=>{var f=Vt(),T=a(f),L=a(T,!0);t(T);var q=o(T),ee=a(q,!0);t(q);var J=o(q),W=a(J,!0);t(J);var j=o(J),oe=a(j,!0);t(j),t(f),O((N,fe)=>{k(L,e(A).metric),k(ee,e(A).areaName),k(W,N),k(oe,fe)},[()=>e(A).data.map(N=>N.x).join(", "),()=>e(A).data.map(N=>N.y).join(", ")]),u(m,f)});var D=o(I);{var V=m=>{var A=Yt(),f=a(A),T=a(f);t(f),t(A),O(()=>k(T,`...and ${r.form.filterData.results.length-5} more results`)),u(m,A)};R(D,m=>{r.form.filterData.results.length>5&&m(V)})}t(B),t(X),t(P),t(c),O(m=>{k(H,`The server processed your request and found ${r.form.filterData.count??""} results. (Submitted without full page reload.)`),k(S,`Selected Filters: Metric: ${r.form.filterData.metric||"Any"},
              Areas: ${m??""}, Year: ${r.form.filterData.year||"Any"}`)},[()=>{var m;return((m=r.form.filterData["areas[]"])==null?void 0:m.length)>0?r.form.filterData["areas[]"].join(", "):"Any"}]),u(n,c)},y=(n,c)=>{{var _=E=>{var w=qt();u(E,w)};R(n,E=>{var w,H,M,S;((H=(w=r.form)==null?void 0:w.filterData)==null?void 0:H.count)===0&&((S=(M=r.form)==null?void 0:M.filterData)==null?void 0:S.results)!==void 0&&E(_)},c)}};R(F,n=>{var c,_;(_=(c=r.form)==null?void 0:c.filterData)!=null&&_.results&&r.form.filterData.results.length>0?n(x):n(y,!1)})}t(p);var s=o(p,2);De(s,{get code(){return Tt},language:"svelte"}),u(h,C)},z=h=>{var C=Xt(),p=ae(C),l=o(a(p),4),i=a(l);_e(i,{get sectionsData(){return e($)},get resultsCount(){return e(me)},filterButtonText:"Filter metrics",applyButtonText:"Apply with enhancement",ga4BaseEvent:{event_name:"filter_data",type:"enhanced"}});var d=o(i,2);{var F=s=>{var n=Kt(),c=a(n),_=o(a(c),2),E=a(_),w=a(E);t(E),We(2),t(_),t(c);var H=o(c,4),M=a(H),S=o(a(M)),P=a(S);be(P,17,()=>e(G).slice(0,5),Ce,(I,D)=>{var V=Jt(),m=a(V),A=a(m,!0);t(m);var f=o(m),T=a(f,!0);t(f);var L=o(f),q=a(L,!0);t(L);var ee=o(L),J=a(ee,!0);t(ee),t(V),O((W,j)=>{k(A,e(D).metric),k(T,e(D).areaName),k(q,W),k(J,j)},[()=>e(D).data.map(W=>W.x).join(", "),()=>e(D).data.map(W=>W.y).join(", ")]),u(I,V)});var X=o(P);{var B=I=>{var D=zt(),V=a(D),m=a(V);t(V),t(D),O(()=>k(m,`...and ${e(G).length-5} more results`)),u(I,D)};R(X,I=>{e(G).length>5&&I(B)})}t(S),t(M),t(H),t(n),O(()=>k(w,`Client-side processing completed with ${e(G).length??""}
                results.`)),u(s,n)},x=(s,n)=>{{var c=_=>{var E=Qt();u(_,E)};R(s,_=>{e(Q)&&_(c)},n)}};R(d,s=>{e(Q)&&e(G).length>0?s(F):s(x,!1)})}t(l),Ee(l,(s,n)=>{var c;return(c=Be)==null?void 0:c(s,n)},()=>({formData:s,cancel:n})=>{var H,M;const c=((H=s.get("metric"))==null?void 0:H.toString())||null,_=Array.from(s.getAll("areas[]")).map(S=>S.toString()),E=((M=s.get("year"))==null?void 0:M.toString())||"all";n();const w=U(c,_,E);he(G,w,!0),he(me,`${w.length} results found`),he(Q,!0)}),t(p);var y=o(p,2);De(y,{get code(){return Et},language:"svelte"}),u(h,C)};let K=g(()=>ge.data.metrics||[]),Y=g(()=>ge.data.areas||[]),ie=g(()=>ge.data.years||[]),G=ye(Ae([])),me=ye("Ready to filter"),Q=ye(!1);const se=[{id:"categories",type:"checkboxes",title:"Categories",ga4Section:"categories_filter",ga4IndexSection:1,ga4IndexSectionCount:2,name:"categories[]",legend:"Select categories",options:[{value:"food",label:"Food & Drink"},{value:"travel",label:"Travel"},{value:"tech",label:"Technology"}]},{id:"rating",type:"radios",title:"Rating",ga4Section:"rating_filter",ga4IndexSection:2,ga4IndexSectionCount:2,name:"rating",legend:"Select minimum rating",options:[{value:"any",label:"Any rating"},{value:"3",label:"3 stars & above"},{value:"4",label:"4 stars & above"},{value:"5",label:"5 stars only"}],selectedValue:"any"}],Z=[{id:"location",type:"select",title:"Location",ga4Section:"location_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"region-select",name:"region",label:"Select region",options:[{value:"",label:"All regions",disabled:!1},{value:"north",label:"North"},{value:"south",label:"South"},{value:"east",label:"East"},{value:"west",label:"West"}],fullWidth:!0},{id:"city-select",name:"city",label:"Select city (optional)",options:[{value:"",label:"All cities",disabled:!1},{value:"london",label:"London"},{value:"manchester",label:"Manchester"},{value:"birmingham",label:"Birmingham"},{value:"leeds",label:"Leeds"}],fullWidth:!0}]},{id:"price",type:"radios",title:"Price Range",ga4Section:"price_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"price",legend:"Select price range",options:[{value:"any",label:"Any price"},{value:"low",label:"£ (Budget)"},{value:"medium",label:"££ (Mid-range)"},{value:"high",label:"£££ (Premium)"}],selectedValue:"any"},{id:"features",type:"checkboxes",title:"Features",ga4Section:"features_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"features[]",legend:"Select desired features",options:[{value:"wifi",label:"Free Wi-Fi"},{value:"parking",label:"Parking"},{value:"accessible",label:"Wheelchair accessible"},{value:"pets",label:"Pet friendly"}]}];let $=g(()=>[{id:"metrics",type:"select",title:"Metrics",ga4Section:"metrics_filter",ga4IndexSection:1,ga4IndexSectionCount:3,selects:[{id:"metric-select",name:"metric",label:"Select metric",options:[{value:"",label:"All metrics",disabled:!1},...e(K).map(h=>({value:h,label:h}))],fullWidth:!0}]},{id:"areas",type:"checkboxes",title:"Local Authorities",ga4Section:"areas_filter",ga4IndexSection:2,ga4IndexSectionCount:3,name:"areas[]",legend:"Select local authorities",options:e(Y).slice(0,5).map(h=>{var C;return{value:h,label:((C=ge.data.areaCodeLookup)==null?void 0:C[h])||h}})},{id:"years",type:"radios",title:"Years",ga4Section:"years_filter",ga4IndexSection:3,ga4IndexSectionCount:3,name:"year",legend:"Select year",options:[{value:"all",label:"All years"},...e(ie).map(h=>({value:h.toString(),label:h.toString()}))],selectedValue:"all"}]);function U(h,C,p){let l=[];if(ge.data.dataInFormatForLineChart){let i=[...ge.data.dataInFormatForLineChart];h&&h!=="all"&&(i=i.filter(d=>d.metric===h)),i.forEach(d=>{(C.length>0?d.lines.filter(x=>C.includes(x.areaCode)):d.lines).forEach(x=>{var s;const y=p==="all"||!p?x.data:x.data.filter(n=>n.x.toString()===p);y.length>0&&l.push({metric:d.metric,areaCode:x.areaCode,areaName:((s=ge.data.areaCodeLookup)==null?void 0:s[x.areaCode])||x.areaCode,data:y})})})}return l}let pe=[{id:"1",heading:"1. Basic Filter Panel Example",content:re},{id:"2",heading:"2. Advanced Filter Panel with Multiple Select and Options",content:ce},{id:"3",heading:"3. Server Form Submission (Full Page Reload)",content:ue},{id:"4",heading:"4 Server Submission with Basic use:enhance for progressive enhancement",content:le},{id:"5",heading:"5. Progressive Enhancement with use:enhance to cancel form submission and process client-side, server-side submission as fallback",content:z}];var ne=ea(),ve=o(a(ne),2);dt(ve,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(h,C)=>{var p=Fe(),l=ae(p);be(l,17,()=>pe,Ce,(i,d)=>{ct(i,{children:(F,x)=>{var y=Zt(),s=a(y);Me(s,()=>e(d).content),t(y),u(F,y)},$$slots:{default:!0,header:(F,x)=>{var y=$t(),s=a(y,!0);t(y),O(()=>k(s,e(d).heading)),u(F,y)}}})}),u(h,p)},$$slots:{default:!0}}),t(ne),u(te,ne),Ie()}const Ne=(te,r=ke,re=ke,ce=ke,ue=ke)=>{Ge(te,{get name(){return r()},get folder(){return re()},get subFolder(){return ce()},get homepage(){return ue()},get statusObject(){return aa},parentFolder:"components-update"})},Le=(te,r=ke)=>{Xe(te,{get homepage(){return r()},get detailsArray(){return ia},get connectedComponentsArray(){return sa}})};let aa={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},ra=["A collapsible filter panel component that allows users to refine search results or content listings. <a href='https://github.com/alphagov/finder-frontend/blob/main/spec/javascripts/components/filter-panel-spec.js' target='_blank' rel='noopener noreferrer'>Based on the GOV.UK Finder Frontend component</a>, it supports various filter types including radio buttons, date inputs, dropdowns, and checkboxes.","The component includes built-in GA4 event tracking, responsive design, and accessibility features like ARIA labels and keyboard navigation.","An example of the original component in use can be seen on the <a href='https://www.gov.uk/search/all?keywords=tax&order=relevance' target='_blank' rel='noopener noreferrer'>GOV.UK search page</a>."],la=["Use this component on pages where users need to filter through large sets of content or search results.","Common use cases include:","- Document or publication finders","- Search results refinement","- Content listing pages with multiple filter options","- Any interface where users need to narrow down a large dataset using multiple criteria"],ia=[{label:"Description",arr:ra,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:la,visibleOnHomepage:!1,markdown:!0}],sa=[];var na=v('<div class="p-8"><!></div>'),oa=v('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function da(te,r){Pe(r,!0);const re=d=>{var F=na(),x=a(F);_e(x,qe(()=>e(Z))),t(F),u(d,F)};let ce=ge.url.pathname.split("/"),ue=tt(ce[ce.length-1]),le=ye(Ae(Je.md)),z=g(()=>Ze([{name:"resultsCount",category:"Display props",value:"125 results",description:{markdown:!0,arr:["The total number of results to display in the header. Usually updated when filters change."]}},{name:"sectionsData",category:"Content props",value:[{id:"document-type",type:"radios",title:"Document type",ga4Section:"document_type",ga4IndexSection:1,ga4IndexSectionCount:4,name:"document_type",legend:"Select document type",options:[{value:"all",label:"All document types"},{value:"policy",label:"Policy papers"},{value:"guidance",label:"Guidance"},{value:"news",label:"News and communications"}],selectedValue:"all"},{id:"date-range",type:"date",title:"Date published",ga4Section:"date_published",ga4IndexSection:2,ga4IndexSectionCount:4,fromLegend:"Published after",fromNamePrefix:"published_at[from]",fromHint:"For example, 2020 or 21/11/2020",toLegend:"Published before",toNamePrefix:"published_at[to]",toHint:"For example, 2023 or 21/11/2023",legendSize:{undefined:void 0}},{id:"topic",type:"select",title:"Topic",ga4Section:"topic",ga4IndexSection:3,ga4IndexSectionCount:4,selects:[{id:"level-one",name:"topics[]",label:"All topics",options:[{value:"",label:"Please select",disabled:!0},{value:"business",label:"Business and industry"},{value:"health",label:"Health and social care"},{value:"education",label:"Education"}],fullWidth:!0}]},{id:"organisations",type:"checkboxes",title:"Organisations",ga4Section:"organisations",ga4IndexSection:4,ga4IndexSectionCount:4,name:"organisations[]",legend:"Select organisations",options:[{value:"cabinet-office",label:"Cabinet Office"},{value:"dfe",label:"Department for Education"},{value:"dhsc",label:"Department of Health and Social Care"}]}],description:{markdown:!0,arr:["An array of filter sections. Each section can be one of four types:","- `radios`: Single-select options with radio buttons","- `date`: Date range inputs with from/to fields","- `select`: Dropdown select menus","- `checkboxes`: Multi-select options with checkboxes","Each section type has its own required properties and optional configurations."]}},{name:"filterButtonText",category:"Display props",value:"Filter and sort",description:{markdown:!0,arr:["The text to display on the main filter toggle button."]}},{name:"applyButtonText",category:"Display props",value:"Apply filters",description:{markdown:!0,arr:["The text to display on the apply button at the bottom of the filter panel."]}},{name:"ga4BaseEvent",category:"Analytics props",propType:"fixed",value:{event_name:"select_content",type:"finder"},description:{markdown:!0,arr:["Base GA4 event data that will be merged with section-specific data for analytics tracking."]}}])),K=function(d,F,x){return d.map(y=>{let s=x[y.name]??y.value;return y.isEditable===F&&s!=null?typeof s=="object"?JSON.stringify(s,null,2):s:null})},Y=ye(Ae(K(e(z),!0,{}))),ie=g(()=>({})),G=g(()=>K(e(z),!1,e(ie))),me=g(()=>$e(e(z),e(Y))),Q=g(()=>et(e(z),e(Y),e(G))),se=g(()=>Ve(e(Q),2)),Z=g(()=>e(se)[0]),$=g(()=>e(se)[1]),U=Ae({});He(()=>{e($).forEach(d=>{U[d]=!0}),Object.keys(U).forEach(d=>{e($).includes(d)||(U[d]=!1)})});let pe=g(()=>Object.fromEntries(Object.entries(e(Z)).map(([d,F])=>{var x,y;return[d,typeof F=="function"?(y=(x=e(z).find(s=>s.name===d))==null?void 0:x.functionElements)==null?void 0:y.functionAsString:F]})));var ne=oa(),ve=ae(ne);const h=g(()=>({component:{WrapperInformation:Le,WrapperNameAndStatus:Ne},name:ue}));ze(ve,{get wrapper(){return e(h)},homepage:!1});var C=o(ve,2);Ke(C,{get parametersParsingErrorsArray(){return e($)},get parametersParsingErrorsObject(){return U},onCloseFunction:d=>e($).filter(F=>F!=d)});var p=o(C,2);Qe(p,{get Component(){return re},get parametersSourceArray(){return e(z)},get derivedParametersValuesArray(){return e(G)},get parametersVisibleArray(){return e(me)},get parametersParsingErrorsObject(){return U},get copyParametersToClipboardObject(){return e(pe)},get demoScreenWidth(){return e(le)},set demoScreenWidth(d){he(le,d,!0)},get statedParametersValuesArray(){return e(Y)},set statedParametersValuesArray(d){he(Y,d,!0)}});var l=o(p,2),i=a(l);ta(i,{get form(){return r.form}}),t(l),u(te,ne),Ie()}const Ba=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Le,WrapperNameAndStatus:Ne,default:da},Symbol.toStringTag,{value:"Module"}));export{Ba as _};
