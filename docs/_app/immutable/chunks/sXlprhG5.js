import"./CWj6FrbW.js";import{p as ee,f as h,s,a as te,c as d,r as c,t as re,y as o,D as $,I as Y,ab as Q,u as le,J as Z,G as b,ac as de}from"./I52qY7cu.js";import{f as p,c as ce,a as r}from"./BBh-6AA0.js";import{s as pe}from"./BHp14Q1u.js";import{B as he,d as ue}from"./DIhqKctk.js";import{W as ge,P as me,C as be,B as ve,a as ye,t as _e,c as fe}from"./DfXfdoaB.js";import{p as ke}from"./B46OMWYY.js";import{k as we}from"./lMwbQCpd.js";import{R as u}from"./DGUGEBDY.js";import"./69_IOA4Y.js";import{s as Ce}from"./5F35P8og.js";import{s as Re}from"./BvNl7SXi.js";import{e as xe,i as Se}from"./n63ZiD1W.js";import{i as Ee}from"./MVh4sFtc.js";import{A as Ae,a as Te}from"./232r4Ubb.js";import{C as g}from"./BN7FUiX4.js";const $e=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte"; // Assuming type export

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "ordered-items-example",
      title: "Related content", // Main title for the whole component
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
        { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
      ],
      linkStyle: "other", // Main section uses 'other' style by default
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Pe=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main", // Need a main section for the title
      id: "main-browse-title",
      title: "Related content",
      links: [], // Main section might not have links itself
    },
    {
      type: "subheading",
      id: "browse-pages-example",
      subheading: "Explore the topic",
      links: [
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
      ],
      // linkStyle defaults to 'normal' for subheading
    },
  ];
<\/script>

<RelatedContent {sections} />
`,De=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-taxons-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "taxons-example",
      subheading: "Explore the topic",
      links: [
        { title: "Driving instruction and driving lessons", base_path: "/transport/driving-instruction-and-driving-lessons" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Be=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  // Mainstream browse pages take precedence for "Explore the topic"
  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-precedence-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "browse-precedence-example",
      subheading: "Explore the topic",
      links: [
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        { title: "Driving tests and learning to drive or ride", base_path: "/browse/driving/learning-to-drive" },
      ],
      // Taxon links are omitted as mainstream links are present for this subheading ID
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Oe=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-collections-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "collections-example",
      subheading: "Collection",
      links: [
        { title: "Recruit an apprentice (formerly apprenticeship vacancies)", base_path: "/government/collections/apprenticeship-vacancies" },
        { title: "The future of jobs and skills", base_path: "/government/collections/the-future-of-jobs-and-skills" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,je=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-topical-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "topical-events-example",
      subheading: "Topical event",
      links: [
        { title: "UK-China High-Level People to People Dialogue 2017", base_path: "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,We=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-world-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "world-locations-example",
      subheading: "World locations",
      links: [
        { title: "South Sudan", base_path: "/world/south-sudan/news" },
        { title: "USA", base_path: "/world/usa/news" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Ue=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-external-title",
      title: "Related content",
      links: [],
    },
    {
      type: "other", // External links use 'other' type
      id: "external-links-example",
      subheading: "Elsewhere on the web",
      links: [
        { url: "http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf", title: "Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)" },
        { url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan", title: "The Student Room: repaying your student loan" },
      ],
      // linkStyle defaults to 'other' for other type
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Ke=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-world-trunc-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "world-locations-trunc-example",
      subheading: "World locations",
      links: [
          { title: "Algeria", base_path: "/world/algeria/news" },
          { title: "Austria", base_path: "/world/austria/news" },
          { title: "Belarus", base_path: "/world/belarus/news" },
          { title: "Belgium", base_path: "/world/belgium/news" },
          { title: "Bolivia", base_path: "/world/bolivia/news" }, // Default threshold is 5
          { title: "Brazil", base_path: "/world/brazil/news" },
          { title: "Canada", base_path: "/world/canada/news" },
          { title: "Chile", base_path: "/world/chile/news" },
          { title: "China", base_path: "/world/china/news" },
      ],
      // Uses default listTruncateThreshold (5)
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Ve=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-stats-title",
      title: "Related content",
      links: [],
    },
    {
      type: "subheading",
      id: "statistical-data-sets-example",
      subheading: "Statistical data set",
      links: [
        { title: "International road fuel prices", base_path: "/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures" },
        { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Ge=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-contacts-title",
      title: "Related content",
      links: [],
    },
    {
      type: "other",
      id: "other-contacts-example",
      subheading: "Other contacts",
      links: [
        { title: "Pest Control", base_path: "/pest-control" },
      ],
    },
  ];
<\/script>

<RelatedContent {sections} />
`,Ie=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
    {
      type: "main",
      id: "main-lang-title",
      title: "Cynnwys cysylltiedig", // Welsh title
      links: [
         { title: "Dod o hyd i brentisiaeth", base_path: "/apply-apprenticeship.cy", locale: "cy" },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "browse-lang-example",
      subheading: "Archwiliwch y pwnc", // Welsh subheading
      links: [
         { title: "Apprenticeships, 14 to 19 education... (Korean)", base_path: "/browse/education/find-course.ko", locale: "ko" },
         // Add other links with locale property here
      ],
    },
    // ... Define other language-specific sections
  ];
<\/script>

<RelatedContent {sections} />
`,Fe=`
<script lang="ts">
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const sections: RelatedContentSection[] = [
     {
      type: "main",
      id: "main-combined-title",
      title: "Related content",
      links: [
        { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
        { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
      ],
      linkStyle: "other",
    },
    {
      type: "subheading",
      id: "collections-combined",
      subheading: "Collection",
      links: [
         { title: "Recruit an apprentice", base_path: "/government/collections/apprenticeship-vacancies" },
      ],
    },
    {
      type: "subheading",
      id: "explore-combined",
      subheading: "Explore the topic",
      links: [
        { title: "Driving licences", base_path: "/browse/driving/driving-licences" },
        // Taxons ignored if mainstream links are present under the same subheading/id conceptually
      ],
    },
    {
      type: "subheading",
      id: "topical-combined",
      subheading: "Topical event",
      links: [
         { title: "UK-China Dialogue 2017", base_path: "/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017" },
      ]
    },
    {
      type: "subheading",
      id: "world-combined",
      subheading: "World locations",
      links: [
        { title: "South Sudan", base_path: "/world/south-sudan/news" },
      ]
    },
    {
      type: "subheading",
      id: "stats-combined",
      subheading: "Statistical data set",
      links: [
        { title: "Weekly road fuel prices", base_path: "/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" },
      ]
    },
     {
      type: "other",
      id: "external-combined",
      subheading: "Elsewhere on the web",
      links: [
        { url: "https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan", title: "The Student Room: repaying your student loan" },
      ],
    },
    {
      type: "other",
      id: "contacts-combined",
      subheading: "Other contacts",
      links: [
         { title: "Pest Control", base_path: "/pest-control" },
      ]
    }
  ];
<\/script>

<RelatedContent {sections} />
`,Le=`
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
    { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
    { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
  ];
<\/script>

<RelatedContent orderedRelatedItems={items} disableGa4={true} />
`;var Me=p('<div class="p-5 bg-white"><!></div> <!>',1),Ne=p(`<p class="govuk-body text-sm">Shows the component when the 'Explore the topic' section in the \`sections\`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'mainstream browse pages'.</p> <p class="govuk-body text-sm"><i>(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the \`sections\` data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),He=p(`<p class="govuk-body text-sm">Shows the component when the 'Explore the topic' section in the \`sections\`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'taxons' (a type of topic link distinct from 'mainstream browse pages').</p> <p class="govuk-body text-sm"><i>(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the \`sections\` data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),qe=p(`<p class="govuk-body text-sm">Demonstrates how a user would mimic the GOV.UK precedence rule: If both
    'mainstream browse pages' and 'taxons' *could* apply to an 'Explore the
    topic' section, the \`sections\` data passed to this component must be
    prepared <strong>by the user</strong> to only include the mainstream browse links
    for that specific section object.</p> <p class="govuk-body text-sm"><i>(Note: The original GOV.UK component handled this precedence internally
      based on link type. This Svelte component requires the user to prepare the
      data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),ze=p('<div class="p-5 bg-white"><!></div> <!>',1),Je=p('<div class="p-5 bg-white"><!></div> <!>',1),Qe=p('<div class="p-5 bg-white"><!></div> <!>',1),Xe=p('<div class="p-5 bg-white"><!></div> <!>',1),Ye=p('<div class="p-5 bg-white"><!></div> <!>',1),Ze=p('<div class="p-5 bg-white"><!></div> <!>',1),et=p('<div class="p-5 bg-white"><!></div> <!>',1),tt=p('<div class="p-5 bg-white"><!></div> <!>',1),nt=p('<div class="p-5 bg-white"><!></div> <!>',1),it=p('<div class="p-5 bg-white"><!></div> <!>',1),at=p('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),ot=p('<span slot="header" class="text-lg"> </span>'),st=p('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function rt(k,w){ee(w,!1);const A=n=>{var t=Me(),e=h(t),i=d(e);u(i,{get sections(){return C}}),c(e);var a=s(e,2);g(a,{get code(){return $e},language:"svelte"}),r(n,t)},x=n=>{var t=Ne(),e=s(h(t),4),i=d(e);u(i,{get sections(){return M}}),c(e);var a=s(e,2);g(a,{get code(){return Pe},language:"svelte"}),r(n,t)},T=n=>{var t=He(),e=s(h(t),4),i=d(e);u(i,{get sections(){return W}}),c(e);var a=s(e,2);g(a,{get code(){return De},language:"svelte"}),r(n,t)},P=n=>{var t=qe(),e=s(h(t),4),i=d(e);u(i,{get sections(){return U}}),c(e);var a=s(e,2);g(a,{get code(){return Be},language:"svelte"}),r(n,t)},v=n=>{var t=ze(),e=h(t),i=d(e);u(i,{get sections(){return N}}),c(e);var a=s(e,2);g(a,{get code(){return Oe},language:"svelte"}),r(n,t)},D=n=>{var t=Je(),e=h(t),i=d(e);u(i,{get sections(){return K}}),c(e);var a=s(e,2);g(a,{get code(){return je},language:"svelte"}),r(n,t)},S=n=>{var t=Qe(),e=h(t),i=d(e);u(i,{get sections(){return V}}),c(e);var a=s(e,2);g(a,{get code(){return We},language:"svelte"}),r(n,t)},I=n=>{var t=Xe(),e=h(t),i=d(e);u(i,{get sections(){return G}}),c(e);var a=s(e,2);g(a,{get code(){return Ue},language:"svelte"}),r(n,t)},B=n=>{var t=Ye(),e=h(t),i=d(e);u(i,{get sections(){return H}}),c(e);var a=s(e,2);g(a,{get code(){return Ke},language:"svelte"}),r(n,t)},F=n=>{var t=Ze(),e=h(t),i=d(e);u(i,{get sections(){return l}}),c(e);var a=s(e,2);g(a,{get code(){return Ve},language:"svelte"}),r(n,t)},L=n=>{var t=et(),e=h(t),i=d(e);u(i,{get sections(){return m}}),c(e);var a=s(e,2);g(a,{get code(){return Ge},language:"svelte"}),r(n,t)},O=n=>{var t=tt(),e=h(t),i=d(e);u(i,{get sections(){return y}}),c(e);var a=s(e,2);g(a,{get code(){return Ie},language:"svelte"}),r(n,t)},j=n=>{var t=nt(),e=h(t),i=d(e);u(i,{get sections(){return _}}),c(e);var a=s(e,2);g(a,{get code(){return Fe},language:"svelte"}),r(n,t)},E=n=>{var t=it(),e=h(t),i=d(e);u(i,{get sections(){return f},disableGa4:!0}),c(e);var a=s(e,2);g(a,{get code(){return Le},language:"svelte"}),r(n,t)},C=[{type:"main",id:"ordered-items-example",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"},{title:"Careers helpline for teenagers",base_path:"/careers-helpline-for-teenagers"}],linkStyle:"other"}],M=[{type:"main",id:"main-browse-title",title:"Related content",links:[]},{type:"subheading",id:"browse-pages-example",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"},{title:"Driving tests and learning to drive or ride",base_path:"/browse/driving/learning-to-drive"}]}],W=[{type:"main",id:"main-taxons-title",title:"Related content",links:[]},{type:"subheading",id:"taxons-example",subheading:"Explore the topic",links:[{title:"Driving instruction and driving lessons",base_path:"/transport/driving-instruction-and-driving-lessons"}]}],U=[{type:"main",id:"main-precedence-title",title:"Related content",links:[]},{type:"subheading",id:"browse-precedence-example",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"},{title:"Driving tests and learning to drive or ride",base_path:"/browse/driving/learning-to-drive"}]}],N=[{type:"main",id:"main-collections-title",title:"Related content",links:[]},{type:"subheading",id:"collections-example",subheading:"Collection",links:[{title:"Recruit an apprentice (formerly apprenticeship vacancies)",base_path:"/government/collections/apprenticeship-vacancies"},{title:"The future of jobs and skills",base_path:"/government/collections/the-future-of-jobs-and-skills"}]}],K=[{type:"main",id:"main-topical-title",title:"Related content",links:[]},{type:"subheading",id:"topical-events-example",subheading:"Topical event",links:[{title:"UK-China High-Level People to People Dialogue 2017",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017"}]}],V=[{type:"main",id:"main-world-title",title:"Related content",links:[]},{type:"subheading",id:"world-locations-example",subheading:"World locations",links:[{title:"South Sudan",base_path:"/world/south-sudan/news"},{title:"USA",base_path:"/world/usa/news"}]}],G=[{type:"main",id:"main-external-title",title:"Related content",links:[]},{type:"other",id:"external-links-example",subheading:"Elsewhere on the web",links:[{url:"http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",title:"Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)"},{url:"https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",title:"The Student Room: repaying your student loan"}]}],H=[{type:"main",id:"main-world-trunc-title",title:"Related content",links:[]},{type:"subheading",id:"world-locations-trunc-example",subheading:"World locations",links:[{title:"Algeria",base_path:"/world/algeria/news"},{title:"Austria",base_path:"/world/austria/news"},{title:"Belarus",base_path:"/world/belarus/news"},{title:"Belgium",base_path:"/world/belgium/news"},{title:"Bolivia",base_path:"/world/bolivia/news"},{title:"Brazil",base_path:"/world/brazil/news"},{title:"Canada",base_path:"/world/canada/news"},{title:"Chile",base_path:"/world/chile/news"},{title:"China",base_path:"/world/china/news"}]}],l=[{type:"main",id:"main-stats-title",title:"Related content",links:[]},{type:"subheading",id:"statistical-data-sets-example",subheading:"Statistical data set",links:[{title:"International road fuel prices",base_path:"/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures"},{title:"Weekly road fuel prices",base_path:"/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics"}]}],m=[{type:"main",id:"main-contacts-title",title:"Related content",links:[]},{type:"other",id:"other-contacts-example",subheading:"Other contacts",links:[{title:"Pest Control",base_path:"/pest-control"}]}],y=[{type:"main",id:"main-lang-title",title:"Cynnwys cysylltiedig",links:[{title:"Dod o hyd i brentisiaeth",base_path:"/apply-apprenticeship.cy",locale:"cy"}],linkStyle:"other"},{type:"subheading",id:"browse-lang-example",subheading:"Archwiliwch y pwnc",links:[{title:"Apprenticeships, 14 to 19 education... (Korean)",base_path:"/browse/education/find-course.ko",locale:"ko"}]},{type:"subheading",id:"topical-lang-example",subheading:"Digwyddiad cyfoes",links:[{title:"UK-China High-Level People to People Dialogue 2017 (Spanish)",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017.es",locale:"es"}]},{type:"other",id:"contacts-lang-example",subheading:"Cysylltiadau eraill",links:[{title:"Jam producers (Spanish)",base_path:"/jam-producers.es",locale:"es"}]},{type:"subheading",id:"stats-lang-example",subheading:"Set data ystadegol",links:[{title:"International road fuel prices (Italian)",base_path:"/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures.it",locale:"it"}]},{type:"subheading",id:"collections-lang-example",subheading:"Casgliad",links:[{title:"Recruit an apprentice (formerly apprenticeship vacancies)",base_path:"/government/collections/apprenticeship-vacancies",locale:"en"}]},{type:"subheading",id:"world-lang-example",subheading:"Lleoliadau'r byd",links:[{title:"South Sudan (Arabic)",base_path:"/world/south-sudan/news.ar",locale:"ar"}]},{type:"other",id:"external-lang-example",subheading:"Mewn mannau eraill ar y we",links:[{url:"http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",title:"Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)",locale:"en"}]}],_=[{type:"main",id:"main-combined-title",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"}],linkStyle:"other"},{type:"subheading",id:"collections-combined",subheading:"Collection",links:[{title:"Recruit an apprentice",base_path:"/government/collections/apprenticeship-vacancies"}]},{type:"subheading",id:"explore-combined",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"}]},{type:"subheading",id:"topical-combined",subheading:"Topical event",links:[{title:"UK-China Dialogue 2017",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017"}]},{type:"subheading",id:"world-combined",subheading:"World locations",links:[{title:"South Sudan",base_path:"/world/south-sudan/news"}]},{type:"subheading",id:"stats-combined",subheading:"Statistical data set",links:[{title:"Weekly road fuel prices",base_path:"/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics"}]},{type:"other",id:"external-combined",subheading:"Elsewhere on the web",links:[{url:"https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",title:"The Student Room: repaying your student loan"}]},{type:"other",id:"contacts-combined",subheading:"Other contacts",links:[{title:"Pest Control",base_path:"/pest-control"}]}],f=[{type:"main",id:"main-no-ga4",title:"Related content (GA4 Disabled)",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"}],linkStyle:"other"}];let ae=[{id:"1",heading:"1. Default (Main Section Links)",content:A},{id:"2",heading:"2. Explore the Topic (Mainstream Browse Pages)",content:x},{id:"3",heading:"3. Explore the Topic (Taxons)",content:T},{id:"4",heading:"4. Explore the Topic (Mainstream Precedence)",content:P},{id:"5",heading:"5. Collections",content:v},{id:"6",heading:"6. Topical Events",content:D},{id:"7",heading:"7. World Locations",content:S},{id:"8",heading:"8. External Links",content:I},{id:"9",heading:"9. Extensive World Locations (Truncation)",content:B},{id:"10",heading:"10. Statistical Data Sets",content:F},{id:"11",heading:"11. Other Contacts",content:L},{id:"12",heading:"12. With Different Languages",content:O},{id:"13",heading:"13. All Types Combined",content:j},{id:"14",heading:"14. Disable GA4 Tracking",content:E}];Ee();var q=st(),oe=s(d(q),2);Ae(oe,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(n,t)=>{var e=ce(),i=h(e);xe(i,1,()=>ae,Se,(a,X)=>{Te(a,{children:(z,se)=>{var R=at(),J=d(R);Re(J,()=>o(X).content),c(R),r(z,R)},$$slots:{default:!0,header:(z,se)=>{var R=ot(),J=d(R,!0);c(R),re(()=>Ce(J,o(X).heading)),r(z,R)}}})}),r(n,e)},$$slots:{default:!0}}),c(q),r(k,q),te()}const ne=(k,w=$,A=$,x=$,T=$)=>{he(k,{get name(){return w()},get folder(){return A()},get subFolder(){return x()},get homepage(){return T()},get statusObject(){return lt},parentFolder:"components-update"})},ie=(k,w=$)=>{ve(k,{get homepage(){return w()},get detailsArray(){return pt},get connectedComponentsArray(){return ht}})};let lt={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},dt=["Displays lists of related content links, such as related pages, topics, collections, or external resources.",'Based on the <a href="https://components.publishing.service.gov.uk/component-guide/related_navigation" target="_blank" rel="noopener noreferrer">GOV.UK Publishing Components related navigation</a>.'],ct=["Use this component to provide supplementary navigation for users.","Different types of links are grouped under specific subheadings (e.g., 'Collection', 'Explore the topic')."],pt=[{label:"Description",arr:dt,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:ct,visibleOnHomepage:!1,markdown:!0}],ht=[];var ut=p('<div class="p-8"><!></div>'),gt=p('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function mt(k,w){ee(w,!0);const A=l=>{var m=ut(),y=d(m);u(y,pe(()=>o(j))),c(m),r(l,m)};let x=ke.url.pathname.split("/"),T=we(x[x.length-1]),P=Y(Q(ue.md)),v=b(()=>ye([{name:"sections",category:"Content",value:[{type:"main",id:"main-related",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"},{title:"Careers helpline for teenagers",base_path:"/careers-helpline-for-teenagers"}],linkStyle:"other"},{type:"subheading",id:"collections",subheading:"Collection",links:[]},{type:"subheading",id:"explore-topic",subheading:"Explore the topic",links:[]},{type:"subheading",id:"topical-events",subheading:"Topical event",links:[]},{type:"subheading",id:"world-locations",subheading:"World locations",links:[]},{type:"subheading",id:"statistical-data-sets",subheading:"Statistical data set",links:[]},{type:"other",id:"external-links",subheading:"Elsewhere on the web",links:[]},{type:"other",id:"other-contacts",subheading:"Other contacts",links:[]}],description:{markdown:!0,arr:["An array of section objects defining the structure and content. Each object requires:","<code>type</code>: ('main', 'subheading', 'other')","<code>id</code>: (Unique string)","<code>links</code>: (Array of link objects {title, base_path/url})","Optional fields:","&nbsp;<code>title</code>: (string, for type 'main')","&nbsp;<code>subheading</code>: (string, for type 'subheading'/'other')","&nbsp;<code>linkStyle</code>: ('normal'/'other')","&nbsp;<code>truncateThreshold</code>: (number)","&nbsp;<code>disableTruncation</code>: (boolean)"]},rows:20},{name:"headingLevel",category:"Accessibility",options:[1,2,3,4,5,6],value:2,description:{markdown:!0,arr:["Sets the semantic heading level (h1-h6) for the main heading."]}},{name:"disableGa4",category:"Tracking",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> to disable GA4 link tracking attributes on the links."]}},{name:"listTruncateThreshold",category:"Behaviour",value:5,description:{markdown:!0,arr:["The default number of links to display in each section before showing the 'Show more' toggle. Can be overridden per-section."]}}])),D=function(l,m,y){return l.map(_=>{let f=y[_.name]??_.value;return _.isEditable===m&&f!=null?typeof f=="object"?JSON.stringify(f,null,2):f:null})},S=Y(Q(D(o(v),!0,{}))),I=b(()=>({})),B=b(()=>D(o(v),!1,o(I))),F=b(()=>_e(o(v),o(S))),L=b(()=>fe(o(v),o(S),o(B))),O=b(()=>de(o(L),2)),j=b(()=>o(O)[0]),E=b(()=>o(O)[1]),C=Q({});le(()=>{o(E).forEach(l=>{C[l]=!0}),Object.keys(C).forEach(l=>{o(E).includes(l)||(C[l]=!1)})});let M=b(()=>Object.fromEntries(Object.entries(o(j)).map(([l,m])=>{var y,_;return[l,typeof m=="function"?(_=(y=o(v).find(f=>f.name===l))==null?void 0:y.functionElements)==null?void 0:_.functionAsString:m]})));var W=gt(),U=h(W);const N=b(()=>({component:{WrapperInformation:ie,WrapperNameAndStatus:ne},name:T}));ge(U,{get wrapper(){return o(N)},homepage:!1});var K=s(U,2);me(K,{get parametersParsingErrorsArray(){return o(E)},get parametersParsingErrorsObject(){return C},onCloseFunction:l=>o(E).filter(m=>m!=l)});var V=s(K,2);be(V,{get Component(){return A},get parametersSourceArray(){return o(v)},get derivedParametersValuesArray(){return o(B)},get parametersVisibleArray(){return o(F)},get parametersParsingErrorsObject(){return C},get copyParametersToClipboardObject(){return o(M)},get demoScreenWidth(){return o(P)},set demoScreenWidth(l){Z(P,l,!0)},get statedParametersValuesArray(){return o(S)},set statedParametersValuesArray(l){Z(S,l,!0)}});var G=s(V,2),H=d(G);rt(H,{}),c(G),r(k,W),te()}const Dt=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:ie,WrapperNameAndStatus:ne,default:mt},Symbol.toStringTag,{value:"Module"}));export{Dt as _};
