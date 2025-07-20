import"./CWj6FrbW.js";import{p as Ee,c as _,r as A,t as ue,F as e,I as Y,a as Te,J as h,s as G,G as T,f as K,C as ce,ab as Ce,u as He,ac as Ge}from"./DAeYpASc.js";import{f as j,a as I,e as Ne,c as Ye,t as Xe}from"./BAP9DKun.js";import{d as De,b as We,W as ze,P as Je,C as Ue,B as qe,a as Ke,t as Qe,c as Ze}from"./D9YvIc1u.js";import{p as u,s as $e}from"./CDnlRnBP.js";import{B as er,d as rr}from"./FLOBqqeq.js";import{p as tr}from"./CMjediXt.js";import{k as ar}from"./DLSzT-Iv.js";import{s as Se,d as Oe}from"./oN6NPT6s.js";import{i as Le}from"./BRrZqxBe.js";import{b as Be,s as me}from"./BYRFjNIU.js";import{b as nr}from"./CLgDgyuC.js";import"./D3eNeeNp.js";import"./DFOGAo2i.js";import{L as ir}from"./DonY6m4F.js";import{s as je}from"./5CLvz9iT.js";import{l as de}from"./Dr59Tgj7.js";import{w as or,a as sr,c as fe,b as q,x as lr,y as cr,l as xe}from"./BeqImU0F.js";import{e as dr,i as ur}from"./DtT6GxuX.js";import{A as gr,a as hr}from"./D7Z_5HJW.js";import"./69_IOA4Y.js";import{C as te}from"./ip80KjXp.js";var vr=j("<div><div> </div></div>"),mr=j("<div><!></div>"),fr=j("<div><!></div>");function pr(p,r){Ee(r,!0);let k=u(r,"labelColor",3,"red");u(r,"tooltipContent",19,()=>r.activeMarkerId.y);let v=Y(void 0);var D=fr(),R=_(D);{var M=w=>{var i=vr(),b=_(i),a=_(b,!0);A(b),A(i),ue(()=>{Be(i,`background-color: ${k()??""};
  padding: 5px;
  border-radius: 5px;`),Se(a,r.activeMarkerId.y)}),De(b,"contentRect",l=>h(v,l)),I(w,i)},L=w=>{var i=mr(),b=_(i);je(b,()=>r.tooltipSnippet,()=>r.activeMarkerId),A(i),De(i,"contentRect",a=>h(v,a)),I(w,i)};Le(R,w=>{r.tooltipSnippet===void 0?w(M):w(L,!1)})}A(D),ue(()=>{var w,i,b,a,l;return Be(D,`position:absolute;
  top: ${((w=r.markerRect)==null?void 0:w.y)-(((i=e(v))==null?void 0:i.height)??0)-15}px;
left: ${((b=r.markerRect)==null?void 0:b.x)+(((a=r.markerRect)==null?void 0:a.width)??0)/2-(((l=e(v))==null?void 0:l.width)??0)/2}px;
  pointer-events: none;
  `)}),I(p,D),Te()}function yr(p,r,k){var v=null,D=q(!0),R=null,M=fe,L=null,w=or(i);p=typeof p=="function"?p:p===void 0?lr:q(+p),r=typeof r=="function"?r:r===void 0?q(0):q(+r),k=typeof k=="function"?k:k===void 0?cr:q(+k);function i(a){var l,f,C,F=(a=sr(a)).length,P,X=!1,z,U=new Array(F),c=new Array(F);for(R==null&&(L=M(z=w())),l=0;l<=F;++l){if(!(l<F&&D(P=a[l],l,a))===X)if(X=!X)f=l,L.areaStart(),L.lineStart();else{for(L.lineEnd(),L.lineStart(),C=l-1;C>=f;--C)L.point(U[C],c[C]);L.lineEnd(),L.areaEnd()}X&&(U[l]=+p(P,l,a),c[l]=+r(P,l,a),L.point(v?+v(P,l,a):U[l],k?+k(P,l,a):c[l]))}if(z)return L=null,z+""||null}function b(){return xe().defined(D).curve(M).context(R)}return i.x=function(a){return arguments.length?(p=typeof a=="function"?a:q(+a),v=null,i):p},i.x0=function(a){return arguments.length?(p=typeof a=="function"?a:q(+a),i):p},i.x1=function(a){return arguments.length?(v=a==null?null:typeof a=="function"?a:q(+a),i):v},i.y=function(a){return arguments.length?(r=typeof a=="function"?a:q(+a),k=null,i):r},i.y0=function(a){return arguments.length?(r=typeof a=="function"?a:q(+a),i):r},i.y1=function(a){return arguments.length?(k=a==null?null:typeof a=="function"?a:q(+a),i):k},i.lineX0=i.lineY0=function(){return b().x(p).y(r)},i.lineY1=function(){return b().x(p).y(k)},i.lineX1=function(){return b().x(v).y(r)},i.defined=function(a){return arguments.length?(D=typeof a=="function"?a:q(!!a),i):D},i.curve=function(a){return arguments.length?(M=a,R!=null&&(L=M(R)),i):M},i.context=function(a){return arguments.length?(a==null?R=L=null:L=M(R=a),i):R},i}function kr(p,r){r()&&!p.target.closest('[data-id^="line"]')&&!p.target.closest('[data-id^="label"]')&&r(null)}var br=Ne('<g><g data-role="y-axis"><path stroke="black" stroke-width="2px"></path></g><g data-role="x-axis"><path stroke="black" stroke-width="2px"></path></g><g data-role="lines-group"><!></g></g>'),Cr=j('<div style="position: relative"><svg><!></svg> <!></div>');function re(p,r){Ee(r,!0);let k=u(r,"xFunction",3,t=>de().domain([2015,2022]).range([0,g()-m()-V()])(t)),v=u(r,"yFunction",3,t=>de().domain([0,100]).range([E()-B()-N(),0])(t)),D=u(r,"lineFunction",19,()=>xe().x(t=>k()(t[r.x])).y(t=>v()(t[r.y])).curve(fe)),R=u(r,"labelText",3,t=>t[r.series]),M=u(r,"onClickSeries",3,(t,s)=>{C()===t?(C(null),F(null)):(C(t),X(s),F(t),P(s))}),L=u(r,"onMouseLeaveSeries",3,(t,s)=>{F()===t&&(F(null),P(null))}),w=u(r,"onMouseEnterSeries",3,(t,s)=>{F()!==t&&(F(t),P(s))}),i=u(r,"onClickMarker",3,(t,s,O)=>{W(s),l([t.screenX,t.screenY]),f(rect)}),b=u(r,"onMouseEnterMarker",3,(t,s,O,J)=>{if(W(s),n()){const H=n().getBoundingClientRect();l([t.clientX-H.left,t.clientY-H.top]),f({x:J.x-H.left+J.width/2,y:J.y-H.top+J.height/2})}else l([t.clientX,t.clientY]),f(J)}),a=u(r,"onMouseLeaveMarker",3,(t,s,O)=>{W(null)}),l=u(r,"currentMousePosition",7,void 0),f=u(r,"markerRect",7,void 0),C=u(r,"clickedSeries",15,void 0),F=u(r,"hoveredSeries",15,void 0),P=u(r,"hoveredTier",15,void 0),X=u(r,"clickedTier",15,void 0),z=u(r,"overrideLineParams",3,()=>({})),U=u(r,"assignLinesToTiers",3,(t,s)=>t==="hover"?[F()].includes(s.areaCode):t==="clicked"?[C()].includes(s.areaCode):!0),c=u(r,"nothingSelected",3,!0),g=u(r,"svgWidth",15,500),n=u(r,"container",15),E=u(r,"svgHeight",3,500),B=u(r,"paddingTop",3,50),N=u(r,"paddingBottom",3,50),m=u(r,"paddingLeft",3,50),V=u(r,"paddingRight",3,150),W=u(r,"activeMarkerId",7,void 0),Q=u(r,"chartBackgroundColor",3,"#f5f5f5");u(r,"seriesLabels",11,!1);let _e=u(r,"globalTierParams",19,()=>({otherTier:{},secondary:{opacity:c()?1:.5},primary:{opacity:c()?1:.4},hover:{opacity:1},clicked:{opacity:1}})),ge=u(r,"tieredLineParams",19,()=>({all:{},hover:{pathStrokeWidth:4},clicked:{pathStrokeWidth:5}})),pe=u(r,"tooltipSnippet",3,void 0),ye=u(r,"tooltipContent",19,()=>{var t;return(t=W())==null?void 0:t.y}),Ae=u(r,"basicLineParams",19,()=>({})),ke=u(r,"colorLineParams",3,(t,s,O)=>({pathStrokeColor:$[s.areaCode]})),ie=u(r,"colors",19,()=>({teal:"#408A7B",skyBlue:"#509EC8",indigo:"#335F91",ochre:"#BA7F30",coral:"#E46B6C",fuchsia:"#BB2765",lavender:"#736CAC",ashGrey:"#A0A0A0",slateGrey:"#636363",black:"#161616",forestGreen:"#3C6E3C",midnightTeal:"#2C5E5E",dustyRose:"#C86B84",steelBlue:"#4B6E91",burntSienna:"#B65C38",oliveGreen:"#7A8644",slatePurple:"#64587C"}));const ae=Array.isArray(ie())?ie():Object.values(ie()),$={};Object.entries(ge()).forEach(([t,s])=>{const O=r.lineChartData.lines.filter(H=>U()(t,H));let J=0;O.forEach(H=>{const ee=H.areaCode;ee in $||($[ee]=ae[J%ae.length],J++)})});let Pe=T(()=>({xFunction:k(),yFunction:v(),lineFunction:D(),onClickSeries:M(),onMouseEnterSeries:w(),onMouseLeaveSeries:L(),onClickMarker:i(),onMouseEnterMarker:b(),onMouseLeaveMarker:a(),haloColor:Q(),halo:!0,invisibleStrokeWidth:20,placeLabel:!0,showLabel:!0,markerFill:void 0})),he=T(()=>g()-m()-V()),oe=T(()=>E()-B()-N()),Me=T(()=>yr().y0(t=>v()(0)).x(t=>k()(t.x)).y1(t=>v()(t.y)).curve(fe));function be(t,s,O,J,H,ee,ve){const Fe=[...new Set([...Object.keys(ve),...Object.keys(ee(s,t)),...Object.keys(H??{}),...Object.keys(J[s]??{}),...Object.keys(O(s,t))])];return{...Object.fromEntries(Fe.map(le=>{var Ie;return[le,O(s,t)[le]??((Ie=J[s])==null?void 0:Ie[le])??H[le]??ee(s,t)[le]??ve[le]]})),...t,dataId:t[r.series],dataArray:t.data}}let se=T(()=>Object.keys(ge()).reduce((t,s)=>(t[s]=r.lineChartData.lines.filter(O=>U()(s,O)).map((O,J)=>be(O,s,z(),ge(),Ae(),(H,ee)=>ke()(H,ee,J),e(Pe))),t),{}));var ne=Cr(),Z=_(ne);Z.__click=[kr,C];var we=_(Z);{var d=t=>{var s=br(),O=_(s),J=_(O);A(O);var H=G(O),ee=_(H);A(H);var ve=G(H),Fe=_(ve);ir(Fe,{get tieredDataObject(){return e(se)},get dataArray(){return r.lineChartData.lines},get lineFunction(){return D()},get areaFunction(){return e(Me)},get chartWidth(){return e(he)},xFunction:k(),yFunction:v(),get hoveredSeries(){return F()},get clickedSeries(){return C()},get clickedTier(){return X()},get hoveredTier(){return P()},get chartHeight(){return e(oe)},get globalTierParams(){return _e()},get chartBackgroundColor(){return Q()},get nothingSelected(){return c()},onMouseEnterSeries:w(),onClickSeries:M(),onMouseLeaveSeries:L(),onClickMarker:i(),onMouseEnterMarker:b(),onMouseLeaveMarker:a(),get activeMarkerId(){return W()},labelText:R(),get series(){return r.series},get y(){return r.y},get x(){return r.x},get tooltipContent(){return ye()},get currentMousePosition(){return l()},get markerRect(){return f()}}),A(ve),A(s),ue(()=>{me(s,"transform",`translate(${m()??""},${B()??""})`),me(J,"d",`M0 0 l0 ${e(oe)??""}`),me(ee,"d",`M0 ${e(oe)??""} l${e(he)??""} 0`)}),I(t,s)};Le(we,t=>{g()&&t(d)})}A(Z);var o=G(Z,2);{var S=t=>{pr(t,{get activeMarkerId(){return W()},labelColor:"lightgrey",labelTextColor:"black",labelText:R(),get tooltipContent(){return ye()},xFunction:k(),yFunction:v(),get x(){return r.x},get y(){return r.y},get currentMousePosition(){return l()},get markerRect(){return f()},get tooltipSnippet(){return pe()}})};Le(o,t=>{W()&&t(S)})}A(ne),nr(ne,t=>n(t),()=>n()),ue(()=>{me(Z,"width",g()),me(Z,"height",E()),Be(Z,`background-color: ${Q()??""}`)}),We(ne,"clientWidth",g),I(p,ne),Te()}Oe(["click"]);Oe(["click"]);const Sr='<LineChart {lineChartData} x="x" y="y" series="areaCode"></LineChart>',Lr=`<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{ interactiveLines: true }}
      tieredLineParams={{
        all: {},
        hover: { pathStrokeWidth: 4 },
        clicked: {
          pathStrokeWidth: 5,
        },
      }}
      bind:clickedSeries
      bind:hoveredSeries
    ></LineChart>`,xr=`<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      assignLinesToTiers={(tier, el) => {
        if (tier === "primary") {
          return ["E07000224"].includes(el.areaCode);
        } else return true;
      }}
      tieredLineParams={{
        secondary: {
          pathStrokeColor: "grey",
          showLabel: false,
          placeLabel: false,
          lineEnding: "arrow",
        },
        primary: {
          pathStrokeWidth: 5,
          pathStrokeColor: "red",
          lineEnding: "arrow",
        },
      }}
    ></LineChart>`,Er=`{#snippet tooltipSnippet(activeMarkerId)}
  <div
    style="border: 1px solid black; padding: 0.5rem; background-color: white; pointer-events: none"
  >
    {#if activeMarkerId.areaCode === "E07000032"}
      This tooltip has different text
    {:else}
      <i>Value:</i>
      {activeMarkerId.y}<br /><i>Year:</i>
      {activeMarkerId.x}
    {/if}
  </div>
{/snippet}

<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{
        markers: true,
        interactiveMarkers: true,
      }}
      {tooltipSnippet}
    ></LineChart>`,Tr=`<LineChart
      lineChartData={dataForOneLine}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{
        includeArea: true,
        areaFillColor: "lightgrey",
        pathStrokeColor: "darkgrey",
      }}
    ></LineChart>`,_r=`<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      labelText={(dataArray) => {
        const areaNames = {
          E07000224: "A",
          E07000223: "B",
          E07000026: "C",
          E07000170: "D",
          E07000032: "E",
        };
        return areaNames[dataArray["areaCode"]] ?? dataArray["areaCode"];
      }}
      basicLineParams={{ interactiveLines: true }}
      bind:clickedSeries
      bind:hoveredSeries
      bind:clickedTier
      bind:hoveredTier
      {nothingSelected}
      assignLinesToTiers={(tier, el) => {
        if (tier === "primary") {
          return ["E07000224"].includes(el.areaCode);
        }
        if (tier === "secondary") {
          return true;
        }
        if (tier === "hover") {
          return [hoveredSeries].includes(el.areaCode);
        }
        if (tier === "clicked") {
          return [clickedSeries].includes(el.areaCode);
        }
      }}
      tieredLineParams={{
        secondary: { pathStrokeColor: "grey" },
        primary: {
          pathStrokeWidth: 4,
        },
        clicked: {
          pathStrokeWidth: 6,
          pathStrokeColor: clickedTier === "secondary" ? "grey" : null,
          interactiveLines: false,
        },
        hover: {
          pathStrokeWidth: 5,
          pathStrokeColor: hoveredTier === "secondary" ? "grey" : null,
          interactiveLines: false,
        },
      }}
      overrideLineParams={(tier, el) => {
        return {
          placeLabel:
            [hoveredSeries, clickedSeries].includes(el.areaCode) ||
            (tier === "primary" &&
              (nothingSelected ||
                [hoveredTier, clickedTier].includes("primary"))),
          showLabel:
            [hoveredSeries, clickedSeries].includes(el.areaCode) ||
            (tier === "primary" && nothingSelected) ||
            (!clickedSeries && hoveredTier === "primary" && tier === "primary"),
        };
      }}
    ></LineChart>`,Ar=`<LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      colors={["royalblue", "steelblue", "darkblue", "blue", "navy"]}
    ></LineChart>`,Pr=(p,r=ce)=>{var k=Ir(),v=_(k);{var D=M=>{var L=Xe("This tooltip has different text");I(M,L)},R=M=>{var L=Br(),w=G(K(L)),i=G(w,3);ue(()=>{Se(w,` ${r().y??""}`),Se(i,` ${r().x??""}`)}),I(M,L)};Le(v,M=>{r().areaCode==="E07000032"?M(D):M(R,!1)})}A(k),I(p,k)};var Mr=j('<div class="p-5 bg-white"><!></div> <!>',1),wr=j('<div class="p-5 bg-white"><!></div> <!>',1),Fr=j('<div class="p-5 bg-white"><!></div> <!>',1),Br=j("<i>Value:</i> <br/><i>Year:</i> ",1),Ir=j('<div style="border: 1px solid black; padding: 0.5rem; background-color: white; pointer-events: none"><!></div>'),Dr=j('<div class="p-5 bg-white"><!></div> <!>',1),Wr=j('<div class="p-5 bg-white"><!></div> <!>',1),Or=j('<div class="p-5 bg-white"><!></div> <!>',1),jr=j('<div class="p-5 bg-white"><!></div> <!>',1),Rr=j('<div class="p-5 bg-white"><!></div> <!>',1),Vr=j('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),Hr=j('<span slot="header" class="text-lg"> </span>'),Gr=j('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function Nr(p,r){Ee(r,!0);const k=c=>{var g=Mr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode"}),A(n);var B=G(n,2);te(B,{get code(){return Sr},language:"svelte"}),I(c,g)},v=c=>{var g=wr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",basicLineParams:{interactiveLines:!0},tieredLineParams:{all:{},hover:{pathStrokeWidth:4},clicked:{pathStrokeWidth:5}},get clickedSeries(){return e(f)},set clickedSeries(N){h(f,N,!0)},get hoveredSeries(){return e(C)},set hoveredSeries(N){h(C,N,!0)}}),A(n);var B=G(n,2);te(B,{get code(){return Lr},language:"svelte"}),I(c,g)},D=c=>{var g=Fr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",assignLinesToTiers:(N,m)=>N==="primary"?["E07000224"].includes(m.areaCode):!0,tieredLineParams:{secondary:{pathStrokeColor:"grey",showLabel:!1,placeLabel:!1,lineEnding:"arrow"},primary:{pathStrokeWidth:5,pathStrokeColor:"red",lineEnding:"arrow"}}}),A(n);var B=G(n,2);te(B,{get code(){return xr},language:"svelte"}),I(c,g)},R=c=>{var g=Dr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",basicLineParams:{markers:!0,interactiveMarkers:!0},get tooltipSnippet(){return Pr}}),A(n);var B=G(n,2);te(B,{get code(){return Er},language:"svelte"}),I(c,g)},M=c=>{var g=Wr(),n=K(g),E=_(n);re(E,{get lineChartData(){return a},x:"x",y:"y",series:"areaCode",basicLineParams:{includeArea:!0,areaFillColor:"lightgrey",pathStrokeColor:"darkgrey"}}),A(n);var B=G(n,2);te(B,{get code(){return Tr},language:"svelte"}),I(c,g)},L=c=>{var g=Or(),n=K(g),E=_(n);const B=T(()=>({secondary:{pathStrokeColor:"grey"},primary:{pathStrokeWidth:4},clicked:{pathStrokeWidth:6,pathStrokeColor:e(F)==="secondary"?"grey":null,interactiveLines:!1},hover:{pathStrokeWidth:5,pathStrokeColor:e(P)==="secondary"?"grey":null,interactiveLines:!1}}));re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",labelText:m=>({E07000224:"A",E07000223:"B",E07000026:"C",E07000170:"D",E07000032:"E"})[m.areaCode]??m.areaCode,basicLineParams:{interactiveLines:!0},get nothingSelected(){return e(X)},assignLinesToTiers:(m,V)=>{if(m==="primary")return["E07000224"].includes(V.areaCode);if(m==="secondary")return!0;if(m==="hover")return[e(C)].includes(V.areaCode);if(m==="clicked")return[e(f)].includes(V.areaCode)},get tieredLineParams(){return e(B)},overrideLineParams:(m,V)=>({placeLabel:[e(C),e(f)].includes(V.areaCode)||m==="primary"&&(e(X)||[e(P),e(F)].includes("primary")),showLabel:[e(C),e(f)].includes(V.areaCode)||m==="primary"&&e(X)||!e(f)&&e(P)==="primary"&&m==="primary"}),get clickedSeries(){return e(f)},set clickedSeries(m){h(f,m,!0)},get hoveredSeries(){return e(C)},set hoveredSeries(m){h(C,m,!0)},get clickedTier(){return e(F)},set clickedTier(m){h(F,m,!0)},get hoveredTier(){return e(P)},set hoveredTier(m){h(P,m,!0)}}),A(n);var N=G(n,2);te(N,{get code(){return _r},language:"svelte"}),I(c,g)},w=c=>{var g=jr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",colors:["royalblue","steelblue","darkblue","blue","navy"]}),A(n);var B=G(n,2);te(B,{get code(){return Ar},language:"svelte"}),I(c,g)},i=c=>{var g=Rr(),n=K(g),E=_(n);re(E,{get lineChartData(){return b},x:"x",y:"y",series:"areaCode",overrideLineParams:(N,m)=>({pathStrokeColor:{E07000224:"green",E07000223:"seagreen",E07000026:"yellowgreen",E07000170:"darkgreen",E07000032:"lightgreen"}[m.areaCode]})}),A(n);var B=G(n,2);te(B,{get code(){},language:"svelte"}),I(c,g)},b=(()=>{const c=r.data.dataInFormatForLineChart.find(g=>g.metric==="Household waste recycling rate");return c?{...c,lines:c.lines.slice(0,5)}:null})(),a=(()=>{const c=r.data.dataInFormatForLineChart.find(g=>g.metric==="Household waste recycling rate");return c?{...c,lines:c.lines.slice(0,1)}:null})();let l=[{id:"1",heading:"1. Static line chart",content:k},{id:"2",heading:"2. Interactive line chart",content:v},{id:"3",heading:"3. Line chart with different tiers",content:D},{id:"4",heading:"4. Line chart with interactive markers",content:R},{id:"5",heading:"5. Line chart with shaded area",content:M},{id:"6",heading:"6. Line chart with custom labels",content:L},{id:"7",heading:"7. Line chart with custom colours assigned randomly",content:w},{id:"8",heading:"8. Line chart with custom colours assigned to specific lines",content:i}],f=Y(void 0),C=Y(void 0),F=Y(void 0),P=Y(void 0),X=T(()=>[e(f),e(C)].every(c=>c==null));var z=Gr(),U=G(_(z),2);gr(U,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(c,g)=>{var n=Ye(),E=K(n);dr(E,17,()=>l,ur,(B,N)=>{hr(B,{children:(m,V)=>{var W=Vr(),Q=_(W);je(Q,()=>e(N).content),A(W),I(m,W)},$$slots:{default:!0,header:(m,V)=>{var W=Hr(),Q=_(W,!0);A(W),ue(()=>Se(Q,e(N).heading)),I(m,W)}}})}),I(c,n)},$$slots:{default:!0}}),A(z),I(p,z),Te()}const Re=(p,r=ce,k=ce,v=ce,D=ce)=>{er(p,{get name(){return r()},get folder(){return k()},get subFolder(){return v()},get homepage(){return D()},get statusObject(){return Yr},parentFolder:"components-update"})},Ve=(p,r=ce)=>{qe(p,{get homepage(){return r()},get detailsArray(){return Jr},get connectedComponentsArray(){return Ur}})};let Yr={progress:"In progress",statusRows:[{obj:{Accessible:!1,Responsive:!1,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},Xr=["Explain here what the component does."],zr=["Explain here the different contexts in which the component should be used."],Jr=[{label:"Description",arr:Xr,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:zr,visibleOnHomepage:!1,markdown:!0}],Ur=[];var qr=j('<div class="p-8" b=""><!></div>'),Kr=j('<!> <!> <div><!></div> <div id="examples" data-role="examples-section"><!></div>',1);function Qr(p,r){Ee(r,!0);const k=d=>{var o=qr(),S=_(o);re(S,$e(()=>e(ie),{get clickedSeries(){return e(f)},set clickedSeries(t){h(f,t,!0)},get hoveredSeries(){return e(l)},set hoveredSeries(t){h(l,t,!0)},get svgWidth(){return e(b)},set svgWidth(t){h(b,t,!0)},get container(){return e(U)},set container(t){h(U,t,!0)},get activeMarkerId(){return e(P)},set activeMarkerId(t){h(P,t,!0)},get markerRect(){return e(z)},set markerRect(t){h(z,t,!0)},get currentMousePosition(){return e(X)},set currentMousePosition(t){h(X,t,!0)}})),A(o),I(d,o)};let v="areaCode",D="E06000040",R="E07000224",M=tr.url.pathname.split("/"),L=ar(M[M.length-1]),w=Y(Ce(rr.md)),i=Ce({teal:"#408A7B",skyBlue:"#509EC8",indigo:"#335F91",ochre:"#BA7F30",coral:"#E46B6C",fuchsia:"#BB2765",lavender:"#736CAC",ashGrey:"#A0A0A0",slateGrey:"#636363",black:"#161616",forestGreen:"#3C6E3C",midnightTeal:"#2C5E5E",dustyRose:"#C86B84",steelBlue:"#4B6E91",burntSienna:"#B65C38",oliveGreen:"#7A8644",slatePurple:"#64587C"}),b=Y(700),a=T(()=>[e(f),e(l)].every(d=>d==null)),l=Y(void 0),f=Y(void 0),C=Y(void 0),F=Y(void 0),P=Y(void 0),X=Y(void 0),z=Y(void 0),U=Y(void 0),c=T(()=>{var d;return Ke([{name:"x",category:"Data",value:"x",description:"Data variable to be plotted on the x axis"},{name:"y",category:"Data",value:"y",description:"Data variable to be plotted on the y axis"},{name:"series",category:"Data",value:v,description:"Data variable used to distinguish between lines"},{name:"basicLineParams",category:"Customising Lines",description:"Parameters that are shared by all lines."},{name:"assignLinesToTiers",category:"Customising Lines",description:"Function that assigns lines to different tiers.",functionElements:{functionAsString:`function (key, el, param) {
          let primaryLines = [
            "E07000224",
            "E07000225",
            "E07000226",
            "E07000228",
            englandMedian,
            similarAreas,
          ];
          if (key === "primary") {
            return primaryLines.includes(el[series]);
          }
          if (key === "secondary" && !primaryLines.includes(el[series])) {
            return true;
          }
          if (key === "hover") {
            return [lineHovered, labelHovered].includes(el[series]);
          }
          if (key === "clicked") {
            return [clickedSeries, clickedSeries].includes(el[series]);
          }
        },`},value(o,S){let t=["E07000224","E07000225","E07000226","E07000228",D,R];if(o==="primary")return t.includes(S[v]);if(o==="secondary"&&!t.includes(S[v]))return!0;if(o==="hover")return e(l)===S[v];if(o==="clicked")return e(f)===S[v]}},{name:"globalTierParams",category:"Customising Lines",description:"Defines how the entire tier should be rendered. Must be valid SVG attributes",functionElements:{functionAsString:`{otherTier: {},
        secondary: {
          opacity: getValue("nothingSelected") ? 1 : 0.5,
        },
        primary: {
          opacity: getValue("nothingSelected") ? 1 : 0.4,
        },
        hover: { opacity: 1 },
        clicked: { opacity: 1 }}`}},{name:"tieredLineParams",category:"Customising Lines",description:"Parameters that apply to specific tiers. Takes priority over `basicLineParams`. Specify in ascending priority order."},{name:"overrideLineParams",category:"Customising Lines",description:"Parameters that are specific to particular lines. Takes priority over `basicLineParams` and tieredLineParams",functionElements:{functionAsString:`function (tier, el) {
          return {
            placeLabel:
              [hoveredSeries, clickedSeries].includes(el[series]) ||
              (tier === "primary" &&
                (nothingSelected ||s
                  [hoveredTier, clickedTier].includes("primary"))),
            showLabel:
              [hoveredSeries, clickedSeries].includes(el[series]) ||
              (tier === "primary" && nothingSelected) ||
              (!clickedSeries &&
                hoveredTier === "primary" &&
                tier === "primary"),
          };
        }`},value(o,S){return{placeLabel:[e(l),e(f)].includes(S[v])||o==="primary"&&(e(a)||[e(C),e(F)].includes("primary")),showLabel:[e(l),e(f)].includes(S[v])||o==="primary"&&e(a)||!e(f)&&e(C)==="primary"&&o==="primary"}}},{name:"colors",category:"Customising Lines",value:i,description:"Colour palette used for lines that aren't assigned custom colours."},{name:"hoveredSeries",category:"Line Interactions",isBinded:!0,value:e(l),description:"The line or label that a user is hovering on."},{name:"clickedSeries",category:"Line Interactions",isBinded:!0,value:e(f),description:"The line or label that a user has clicked."},{name:"hoveredTier",category:"Line Interactions",isBinded:!0,value:e(C),description:"The tier of the line or label that a user is hovering on."},{name:"clickedTier",category:"Line Interactions",isBinded:!0,value:e(F),description:"The tier of the line or label that a user has clicked."},{name:"nothingSelected",category:"Line Interactions",isBinded:!0,value:e(a),description:"Boolean. True when no line or label is hovered or clicked."},{name:"activeMarkerId",category:"Markers",value:e(P),functionElements:{functionAsString:"activeMarkerId"},description:"The ID of the marker that is being hovered over."},{name:"markerRect",category:"Markers",value:e(z),description:"Dimensions of the marker that is being hovered over."},{name:"onClickSeries",category:"Line Interactions",functionElements:{functionAsString:`function (series, tier) {
          if (clickedSeries === series) {
            clickedSeries = null;
            hoveredSeries = null;
          } else {
            clickedSeries = series;
            clickedTier = tier;
            hoveredSeries = series;
            hoveredTier = tier;
          }
        }`},value(o,S){e(f)===o?(h(f,null),h(l,null)):(h(f,o,!0),h(F,S,!0),h(l,o,!0),h(C,S,!0))},description:"Function that runs when a user clicks on a line or its label."},{name:"onMouseEnterSeries",category:"Line Interactions",functionElements:{functionAsString:`function (series, tier) {
          if (hoveredSeries !== series) {
            hoveredSeries = series;
            hoveredTier = tier;
          }
        }`},value(o,S){e(l)!==o&&(h(l,o,!0),h(C,S,!0))},description:"Function that runs when a user's mouse enters a line or its label."},{name:"onMouseLeaveSeries",category:"Line Interactions",functionElements:{functionAsString:`function (series, tier) {
          if (hoveredSeries === series) {
            hoveredSeries = null;
            hoveredTier = null;
          }
        }`},value(o,S){e(l)===o&&(h(l,null),h(C,null))},description:"Function that runs when a user's mouse leaves a line or its label."},{name:"onMouseEnterMarker",category:"Markers",functionElements:{functionAsString:`function (event, dataArray, dataId) {
              labelHovered = series;
            }`},value(o,S,t,s){if(h(P,S,!0),e(U)){const O=e(U).getBoundingClientRect();h(z,{x:s.x-O.left+s.width/2,y:s.y-O.top+s.height/2},!0)}else h(X,[o.clientX,o.clientY],!0),h(z,s,!0)},description:"Function that runs when a user's mouse enters a marker."},{name:"onMouseLeaveMarker",category:"Markers",functionElements:{functionAsString:`function (event, dataArray, dataId) {
              if (labelClicked !== series) {
                labelHovered = null;
              }
            }`},value(o,S,t){h(P,null)},description:"Function that runs when a user's mouse leaves a marker."},{name:"onClickMarker",category:"Markers",functionElements:{functionAsString:`function (event, dataArray, dataId) {
              labelClicked === series
                ? ((labelClicked = null), (labelHovered = null))
                : (labelClicked = series);
            }`},value(o,S,t){h(P,S,!0)},description:"Function that runs when a user clicks a marker."},{name:"paddingTop",category:"Appearance",value:50},{name:"paddingRight",category:"Appearance",value:150},{name:"paddingBottom",category:"Appearance",value:50},{name:"paddingLeft",category:"Appearance",value:50},{name:"svgHeight",category:"Appearance",value:500},{name:"svgWidth",category:"Appearance",value:e(b)},{name:"labelText",category:"Labels",functionElements:{functionAsString:`function (dataArray) {
          return dataArray[series];
        }`},isProp:!0,value(o){return o[v]},description:"Text for the series labels."},{name:"selectedMetric",category:"Data",visible:!0,options:["Household waste recycling rate","Recycling contamination rate","Residual household waste"]},{name:"lineChartData",category:"Data",visible:!1,isProp:!0},{name:"chartBackgroundColor",category:"Appearance",visible:!0,isProp:!0,value:"#f5f5f5",description:"Background color of the chart. Also used for the 'halo' outline given to lines."},{name:"xFunction",category:"Plotting Functions",value(o){return de().domain([2015,2022]).range([0,e(b)-n("paddingLeft")-n("paddingRight")])(o)},functionElements:{functionAsString:`function (number) {
    return scaleLinear()
      .domain([2015, 2022])
      .range([
        0,
        svgWidth - getValue("paddingLeft") - getValue("paddingRight"),
      ])(number);
  }`},description:"Function translating numerical values to x-axis position."},{name:"yFunction",category:"Plotting Functions",description:"Function translating numerical values to y-axis position.",value(o){return de().domain([0,100]).range([n("svgHeight")-n("paddingTop")-n("paddingBottom"),0])(o)},functionElements:{functionAsString:`function (number) {
          return scaleLinear()
            .domain([0, 100])
            .range([
              getValue("svgHeight") -
                getValue("paddingTop") -
                getValue("paddingBottom"),
              0,
            ])(number);
        }`}},{name:"lineFunction",category:"Plotting Functions",description:"Function that creates a line from a series of x and y values. Uses d3.line().",functionElements:{functionAsString:`line()
          .x((d) => xFunction(d[x]))
          .y((d) => yFunction(d[y]))
          .curve(curveLinear)`},value:xe().x(o=>e(V)(o[x])).y(o=>e(W)(o[y])).curve(fe)},{name:"tooltipContent",category:"Markers",value:(d=e(P))==null?void 0:d.y,description:"Content for the tooltip that appears when hovering over a marker. Can be a string or a snippet."}])}),g=function(d,o,S){return d.map(t=>{let s=S[t.name]??t.value;return t.isEditable===o&&s!=null?typeof s=="object"?JSON.stringify(s,null,2):s:null})},n=function(d){var o;return e(E)[(o=e(c))==null?void 0:o.findIndex(S=>S.name===d)]},E=Y(Ce(g(e(c),!0,{}))),B=T(()=>r.data.dataInFormatForLineChart.find(d=>d.metric===n("selectedMetric"))),N=T(()=>({otherTier:{},secondary:{halo:!1,pathStrokeColor:i.black,pathStrokeWidth:1,opacity:.05,interactiveLines:!1,markers:!1,showLabel:!1},primary:{halo:!0,pathStrokeWidth:5,interactiveLines:!0,markers:!0,interactiveMarkers:!0},clicked:{pathStrokeColor:e(F)==="secondary"?i.ashGrey:null,pathStrokeWidth:7,interactiveLines:!1,markers:!0,interactiveMarkers:!0},hover:{pathStrokeColor:e(C)==="secondary"?i.ashGrey:null,pathStrokeWidth:6,halo:!0,interactiveLines:!1,markers:!0,interactiveMarkers:!0}})),m=T(()=>({otherTier:{},secondary:{opacity:e(a)?1:.5},primary:{opacity:e(a)?1:.4},hover:{opacity:1},clicked:{opacity:1}})),V=T(()=>function(d){return de().domain([2015,2022]).range([0,e(b)-n("paddingLeft")-n("paddingRight")])(d)}),W=T(()=>function(d){return de().domain([0,100]).range([n("svgHeight")-n("paddingTop")-n("paddingBottom"),0])(d)}),Q=T(()=>xe().x(d=>e(V)(d[n("x")])).y(d=>e(W)(d[n("y")])).curve(fe)),_e=T(()=>({xFunction:e(V),yFunction:e(W),lineFunction:e(Q),haloColor:n("chartBackgroundColor"),invisibleStrokeWidth:20})),ge=T(()=>({xFunction:e(V),yFunction:e(W),lineFunction:e(Q),lineChartData:e(B),tieredLineParams:e(N),basicLineParams:e(_e),nothingSelected:e(a),globalTierParams:e(m)})),pe=T(()=>g(e(c),!1,e(ge))),ye=T(()=>Qe(e(c),e(E))),Ae=T(()=>Ze(e(c),e(E),e(pe))),ke=T(()=>Ge(e(Ae),2)),ie=T(()=>e(ke)[0]),ae=T(()=>e(ke)[1]),$=Ce({});He(()=>{e(ae).forEach(d=>{$[d]=!0}),Object.keys($).forEach(d=>{e(ae).includes(d)||($[d]=!1)})});let Pe=T(()=>Object.fromEntries(Object.entries(e(ie)).map(([d,o])=>{var S,t;return[d,typeof o=="function"?(t=(S=e(c).find(s=>s.name===d))==null?void 0:S.functionElements)==null?void 0:t.functionAsString:o]})));var he=Kr(),oe=K(he);const Me=T(()=>({component:{WrapperInformation:Ve,WrapperNameAndStatus:Re},name:L}));ze(oe,{get wrapper(){return e(Me)},homepage:!1});var be=G(oe,2);Je(be,{get parametersParsingErrorsArray(){return e(ae)},get parametersParsingErrorsObject(){return $},onCloseFunction:d=>e(ae).filter(o=>o!=d)});var se=G(be,2),ne=_(se);Ue(ne,{get Component(){return k},get parametersSourceArray(){return e(c)},get derivedParametersValuesArray(){return e(pe)},get parametersVisibleArray(){return e(ye)},get parametersParsingErrorsObject(){return $},get copyParametersToClipboardObject(){return e(Pe)},get demoScreenWidth(){return e(w)},set demoScreenWidth(d){h(w,d,!0)},get statedParametersValuesArray(){return e(E)},set statedParametersValuesArray(d){h(E,d,!0)}}),A(se);var Z=G(se,2),we=_(Z);Nr(we,{get data(){return r.data}}),A(Z),We(se,"clientWidth",d=>h(w,d)),I(p,he),Te()}const Ct=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:Ve,WrapperNameAndStatus:Re,default:Qr},Symbol.toStringTag,{value:"Module"}));export{Ct as _};
