import"./CWj6FrbW.js";import{p as Y,f as h,s,a as Z,c as d,r as c,t as le,z as o,D as $,G as Q,a9 as q,y as f,u as re,I as X}from"./BQOcVDnD.js";import{t as p,c as de,a as l,s as ce}from"./Dp3jeoTR.js";import{s as pe}from"./Bx8udYmP.js";import{B as he,d as ue}from"./kqoadxQb.js";import{W as ge,P as me,C as be,B as ve,a as ye,t as _e,c as fe}from"./JWqNqQUs.js";import{p as ke}from"./D5heuD2C.js";import{k as we}from"./lMwbQCpd.js";import{R as u}from"./RhLzO9Zn.js";import"./69_IOA4Y.js";import{e as Ce,i as Re}from"./hy64cfae.js";import{s as xe}from"./ByC2DMpr.js";import{i as Se}from"./B_4Nsh1l.js";import{A as Ee,a as Ae}from"./JE6QcVhM.js";import{C as g}from"./B8qjdm4g.js";const Te=`
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
`,$e=`
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
`,Pe=`
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
`,De=`
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
`,Be=`
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
`,Oe=`
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
`,je=`
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
`,We=`
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
`,Ue=`
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
`,Ke=`
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
`,Ve=`
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
`,Ge=`
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
`,Ie=`
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
`,Fe=`
<script>
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";

  const items = [
    { title: "Find an apprenticeship", base_path: "/apply-apprenticeship" },
    { title: "Training and study at work", base_path: "/training-study-work-your-rights" },
    { title: "Careers helpline for teenagers", base_path: "/careers-helpline-for-teenagers" },
  ];
<\/script>

<RelatedContent orderedRelatedItems={items} disableGa4={true} />
`;var Le=p('<div class="p-5 bg-white"><!></div> <!>',1),Me=p(`<p class="govuk-body text-sm">Shows the component when the 'Explore the topic' section in the \`sections\`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'mainstream browse pages'.</p> <p class="govuk-body text-sm"><i>(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the \`sections\` data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),Ne=p(`<p class="govuk-body text-sm">Shows the component when the 'Explore the topic' section in the \`sections\`
    data is prepared <strong>by the user</strong> to only contain links corresponding
    to GOV.UK's 'taxons' (a type of topic link distinct from 'mainstream browse pages').</p> <p class="govuk-body text-sm"><i>(Note: Unlike the original GOV.UK component which handles link type
      precedence internally, this Svelte component requires the user to prepare
      the \`sections\` data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),He=p(`<p class="govuk-body text-sm">Demonstrates how a user would mimic the GOV.UK precedence rule: If both
    'mainstream browse pages' and 'taxons' *could* apply to an 'Explore the
    topic' section, the \`sections\` data passed to this component must be
    prepared <strong>by the user</strong> to only include the mainstream browse links
    for that specific section object.</p> <p class="govuk-body text-sm"><i>(Note: The original GOV.UK component handled this precedence internally
      based on link type. This Svelte component requires the user to prepare the
      data accordingly).</i></p> <div class="p-5 bg-white"><!></div> <!>`,1),ze=p('<div class="p-5 bg-white"><!></div> <!>',1),qe=p('<div class="p-5 bg-white"><!></div> <!>',1),Je=p('<div class="p-5 bg-white"><!></div> <!>',1),Qe=p('<div class="p-5 bg-white"><!></div> <!>',1),Xe=p('<div class="p-5 bg-white"><!></div> <!>',1),Ye=p('<div class="p-5 bg-white"><!></div> <!>',1),Ze=p('<div class="p-5 bg-white"><!></div> <!>',1),et=p('<div class="p-5 bg-white"><!></div> <!>',1),tt=p('<div class="p-5 bg-white"><!></div> <!>',1),nt=p('<div class="p-5 bg-white"><!></div> <!>',1),it=p('<div class="bg-orange-50 p-5 flex flex-col gap-8"><!></div>'),at=p('<span slot="header" class="text-lg"> </span>'),ot=p('<div><h5 class="underline underline-offset-4 my-6">Examples of specific use cases</h5> <!></div>');function st(k,w){Y(w,!1);const A=n=>{var t=Le(),e=h(t),i=d(e);u(i,{sections:L}),c(e);var a=s(e,2);g(a,{get code(){return Te},language:"svelte"}),l(n,t)},x=n=>{var t=Me(),e=s(h(t),4),i=d(e);u(i,{sections:W}),c(e);var a=s(e,2);g(a,{get code(){return $e},language:"svelte"}),l(n,t)},T=n=>{var t=Ne(),e=s(h(t),4),i=d(e);u(i,{sections:U}),c(e);var a=s(e,2);g(a,{get code(){return Pe},language:"svelte"}),l(n,t)},P=n=>{var t=He(),e=s(h(t),4),i=d(e);u(i,{sections:K}),c(e);var a=s(e,2);g(a,{get code(){return De},language:"svelte"}),l(n,t)},b=n=>{var t=ze(),e=h(t),i=d(e);u(i,{sections:V}),c(e);var a=s(e,2);g(a,{get code(){return Be},language:"svelte"}),l(n,t)},D=n=>{var t=qe(),e=h(t),i=d(e);u(i,{sections:G}),c(e);var a=s(e,2);g(a,{get code(){return Oe},language:"svelte"}),l(n,t)},S=n=>{var t=Je(),e=h(t),i=d(e);u(i,{sections:M}),c(e);var a=s(e,2);g(a,{get code(){return je},language:"svelte"}),l(n,t)},I=n=>{var t=Qe(),e=h(t),i=d(e);u(i,{sections:r}),c(e);var a=s(e,2);g(a,{get code(){return We},language:"svelte"}),l(n,t)},B=n=>{var t=Xe(),e=h(t),i=d(e);u(i,{sections:m}),c(e);var a=s(e,2);g(a,{get code(){return Ue},language:"svelte"}),l(n,t)},F=n=>{var t=Ye(),e=h(t),i=d(e);u(i,{sections:v}),c(e);var a=s(e,2);g(a,{get code(){return Ke},language:"svelte"}),l(n,t)},O=n=>{var t=Ze(),e=h(t),i=d(e);u(i,{sections:y}),c(e);var a=s(e,2);g(a,{get code(){return Ve},language:"svelte"}),l(n,t)},j=n=>{var t=et(),e=h(t),i=d(e);u(i,{sections:_}),c(e);var a=s(e,2);g(a,{get code(){return Ge},language:"svelte"}),l(n,t)},E=n=>{var t=tt(),e=h(t),i=d(e);u(i,{sections:ne}),c(e);var a=s(e,2);g(a,{get code(){return Ie},language:"svelte"}),l(n,t)},C=n=>{var t=nt(),e=h(t),i=d(e);u(i,{sections:ie,disableGa4:!0}),c(e);var a=s(e,2);g(a,{get code(){return Fe},language:"svelte"}),l(n,t)},L=[{type:"main",id:"ordered-items-example",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"},{title:"Careers helpline for teenagers",base_path:"/careers-helpline-for-teenagers"}],linkStyle:"other"}],W=[{type:"main",id:"main-browse-title",title:"Related content",links:[]},{type:"subheading",id:"browse-pages-example",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"},{title:"Driving tests and learning to drive or ride",base_path:"/browse/driving/learning-to-drive"}]}],U=[{type:"main",id:"main-taxons-title",title:"Related content",links:[]},{type:"subheading",id:"taxons-example",subheading:"Explore the topic",links:[{title:"Driving instruction and driving lessons",base_path:"/transport/driving-instruction-and-driving-lessons"}]}],K=[{type:"main",id:"main-precedence-title",title:"Related content",links:[]},{type:"subheading",id:"browse-precedence-example",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"},{title:"Driving tests and learning to drive or ride",base_path:"/browse/driving/learning-to-drive"}]}],V=[{type:"main",id:"main-collections-title",title:"Related content",links:[]},{type:"subheading",id:"collections-example",subheading:"Collection",links:[{title:"Recruit an apprentice (formerly apprenticeship vacancies)",base_path:"/government/collections/apprenticeship-vacancies"},{title:"The future of jobs and skills",base_path:"/government/collections/the-future-of-jobs-and-skills"}]}],G=[{type:"main",id:"main-topical-title",title:"Related content",links:[]},{type:"subheading",id:"topical-events-example",subheading:"Topical event",links:[{title:"UK-China High-Level People to People Dialogue 2017",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017"}]}],M=[{type:"main",id:"main-world-title",title:"Related content",links:[]},{type:"subheading",id:"world-locations-example",subheading:"World locations",links:[{title:"South Sudan",base_path:"/world/south-sudan/news"},{title:"USA",base_path:"/world/usa/news"}]}],r=[{type:"main",id:"main-external-title",title:"Related content",links:[]},{type:"other",id:"external-links-example",subheading:"Elsewhere on the web",links:[{url:"http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",title:"Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)"},{url:"https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",title:"The Student Room: repaying your student loan"}]}],m=[{type:"main",id:"main-world-trunc-title",title:"Related content",links:[]},{type:"subheading",id:"world-locations-trunc-example",subheading:"World locations",links:[{title:"Algeria",base_path:"/world/algeria/news"},{title:"Austria",base_path:"/world/austria/news"},{title:"Belarus",base_path:"/world/belarus/news"},{title:"Belgium",base_path:"/world/belgium/news"},{title:"Bolivia",base_path:"/world/bolivia/news"},{title:"Brazil",base_path:"/world/brazil/news"},{title:"Canada",base_path:"/world/canada/news"},{title:"Chile",base_path:"/world/chile/news"},{title:"China",base_path:"/world/china/news"}]}],v=[{type:"main",id:"main-stats-title",title:"Related content",links:[]},{type:"subheading",id:"statistical-data-sets-example",subheading:"Statistical data set",links:[{title:"International road fuel prices",base_path:"/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures"},{title:"Weekly road fuel prices",base_path:"/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics"}]}],y=[{type:"main",id:"main-contacts-title",title:"Related content",links:[]},{type:"other",id:"other-contacts-example",subheading:"Other contacts",links:[{title:"Pest Control",base_path:"/pest-control"}]}],_=[{type:"main",id:"main-lang-title",title:"Cynnwys cysylltiedig",links:[{title:"Dod o hyd i brentisiaeth",base_path:"/apply-apprenticeship.cy",locale:"cy"}],linkStyle:"other"},{type:"subheading",id:"browse-lang-example",subheading:"Archwiliwch y pwnc",links:[{title:"Apprenticeships, 14 to 19 education... (Korean)",base_path:"/browse/education/find-course.ko",locale:"ko"}]},{type:"subheading",id:"topical-lang-example",subheading:"Digwyddiad cyfoes",links:[{title:"UK-China High-Level People to People Dialogue 2017 (Spanish)",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017.es",locale:"es"}]},{type:"other",id:"contacts-lang-example",subheading:"Cysylltiadau eraill",links:[{title:"Jam producers (Spanish)",base_path:"/jam-producers.es",locale:"es"}]},{type:"subheading",id:"stats-lang-example",subheading:"Set data ystadegol",links:[{title:"International road fuel prices (Italian)",base_path:"/government/statistical-data-sets/comparisons-of-industrial-and-domestic-energy-prices-monthly-figures.it",locale:"it"}]},{type:"subheading",id:"collections-lang-example",subheading:"Casgliad",links:[{title:"Recruit an apprentice (formerly apprenticeship vacancies)",base_path:"/government/collections/apprenticeship-vacancies",locale:"en"}]},{type:"subheading",id:"world-lang-example",subheading:"Lleoliadau'r byd",links:[{title:"South Sudan (Arabic)",base_path:"/world/south-sudan/news.ar",locale:"ar"}]},{type:"other",id:"external-lang-example",subheading:"Mewn mannau eraill ar y we",links:[{url:"http://media.slc.co.uk/sfe/1718/ft/sfe_terms_and_conditions_guide_1718_d.pdf",title:"Student loans: terms and conditions 2017 to 2018 (PDF, 136KB)",locale:"en"}]}],ne=[{type:"main",id:"main-combined-title",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"}],linkStyle:"other"},{type:"subheading",id:"collections-combined",subheading:"Collection",links:[{title:"Recruit an apprentice",base_path:"/government/collections/apprenticeship-vacancies"}]},{type:"subheading",id:"explore-combined",subheading:"Explore the topic",links:[{title:"Driving licences",base_path:"/browse/driving/driving-licences"}]},{type:"subheading",id:"topical-combined",subheading:"Topical event",links:[{title:"UK-China Dialogue 2017",base_path:"/government/topical-events/uk-china-high-level-people-to-people-dialogue-2017"}]},{type:"subheading",id:"world-combined",subheading:"World locations",links:[{title:"South Sudan",base_path:"/world/south-sudan/news"}]},{type:"subheading",id:"stats-combined",subheading:"Statistical data set",links:[{title:"Weekly road fuel prices",base_path:"/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics"}]},{type:"other",id:"external-combined",subheading:"Elsewhere on the web",links:[{url:"https://www.thestudentroom.co.uk/content.php?r=5967-Repaying-your-student-loan",title:"The Student Room: repaying your student loan"}]},{type:"other",id:"contacts-combined",subheading:"Other contacts",links:[{title:"Pest Control",base_path:"/pest-control"}]}],ie=[{type:"main",id:"main-no-ga4",title:"Related content (GA4 Disabled)",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"}],linkStyle:"other"}];let ae=[{id:"1",heading:"1. Default (Main Section Links)",content:A},{id:"2",heading:"2. Explore the Topic (Mainstream Browse Pages)",content:x},{id:"3",heading:"3. Explore the Topic (Taxons)",content:T},{id:"4",heading:"4. Explore the Topic (Mainstream Precedence)",content:P},{id:"5",heading:"5. Collections",content:b},{id:"6",heading:"6. Topical Events",content:D},{id:"7",heading:"7. World Locations",content:S},{id:"8",heading:"8. External Links",content:I},{id:"9",heading:"9. Extensive World Locations (Truncation)",content:B},{id:"10",heading:"10. Statistical Data Sets",content:F},{id:"11",heading:"11. Other Contacts",content:O},{id:"12",heading:"12. With Different Languages",content:j},{id:"13",heading:"13. All Types Combined",content:E},{id:"14",heading:"14. Disable GA4 Tracking",content:C}];Se();var N=ot(),oe=s(d(N),2);Ee(oe,{activeClass:"text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]",inactiveClass:"text-gray-500 dark:text-gray-400 hover:bg-slate-100",defaultClass:"w-full",children:(n,t)=>{var e=de(),i=h(e);Ce(i,1,()=>ae,Re,(a,J)=>{Ae(a,{children:(H,se)=>{var R=it(),z=d(R);xe(z,()=>o(J).content),c(R),l(H,R)},$$slots:{default:!0,header:(H,se)=>{var R=at(),z=d(R,!0);c(R),le(()=>ce(z,o(J).heading)),l(H,R)}}})}),l(n,e)},$$slots:{default:!0}}),c(N),l(k,N),Z()}const ee=(k,w=$,A=$,x=$,T=$)=>{he(k,{get name(){return w()},get folder(){return A()},get subFolder(){return x()},get homepage(){return T()},statusObject:lt,parentFolder:"components-update"})},te=(k,w=$)=>{ve(k,{get homepage(){return w()},detailsArray:ct,connectedComponentsArray:pt})};let lt={progress:"Baseline completed",statusRows:[{obj:{Accessible:!0,Responsive:!0,"Prog. enhanced":!1},visibleOnHompepage:!1},{obj:{Reviewed:!1,Tested:!1},visibleOnHomepage:!1}]},rt=["Displays lists of related content links, such as related pages, topics, collections, or external resources.",'Based on the <a href="https://components.publishing.service.gov.uk/component-guide/related_navigation" target="_blank" rel="noopener noreferrer">GOV.UK Publishing Components related navigation</a>.'],dt=["Use this component to provide supplementary navigation for users.","Different types of links are grouped under specific subheadings (e.g., 'Collection', 'Explore the topic')."],ct=[{label:"Description",arr:rt,visibleOnHomepage:!0,markdown:!0},{label:"Context",arr:dt,visibleOnHomepage:!1,markdown:!0}],pt=[];var ht=p('<div class="p-8"><!></div>'),ut=p('<!> <!> <!> <div id="examples" data-role="examples-section"><!></div>',1);function gt(k,w){Y(w,!0);const A=r=>{var m=ht(),v=d(m);u(v,pe(()=>o(j))),c(m),l(r,m)};let x=ke.url.pathname.split("/"),T=we(x[x.length-1]),P=Q(q(ue.md)),b=f(()=>ye([{name:"sections",category:"Content",value:[{type:"main",id:"main-related",title:"Related content",links:[{title:"Find an apprenticeship",base_path:"/apply-apprenticeship"},{title:"Training and study at work",base_path:"/training-study-work-your-rights"},{title:"Careers helpline for teenagers",base_path:"/careers-helpline-for-teenagers"}],linkStyle:"other"},{type:"subheading",id:"collections",subheading:"Collection",links:[]},{type:"subheading",id:"explore-topic",subheading:"Explore the topic",links:[]},{type:"subheading",id:"topical-events",subheading:"Topical event",links:[]},{type:"subheading",id:"world-locations",subheading:"World locations",links:[]},{type:"subheading",id:"statistical-data-sets",subheading:"Statistical data set",links:[]},{type:"other",id:"external-links",subheading:"Elsewhere on the web",links:[]},{type:"other",id:"other-contacts",subheading:"Other contacts",links:[]}],description:{markdown:!0,arr:["An array of section objects defining the structure and content. Each object requires:","<code>type</code>: ('main', 'subheading', 'other')","<code>id</code>: (Unique string)","<code>links</code>: (Array of link objects {title, base_path/url})","Optional fields:","&nbsp;<code>title</code>: (string, for type 'main')","&nbsp;<code>subheading</code>: (string, for type 'subheading'/'other')","&nbsp;<code>linkStyle</code>: ('normal'/'other')","&nbsp;<code>truncateThreshold</code>: (number)","&nbsp;<code>disableTruncation</code>: (boolean)"]},rows:20},{name:"headingLevel",category:"Accessibility",options:[1,2,3,4,5,6],value:2,description:{markdown:!0,arr:["Sets the semantic heading level (h1-h6) for the main heading."]}},{name:"disableGa4",category:"Tracking",value:!1,description:{markdown:!0,arr:["Set to <code>true</code> to disable GA4 link tracking attributes on the links."]}},{name:"listTruncateThreshold",category:"Behaviour",value:5,description:{markdown:!0,arr:["The default number of links to display in each section before showing the 'Show more' toggle. Can be overridden per-section."]}}])),D=function(r,m,v){return r.map(y=>{let _=v[y.name]??y.value;return y.isEditable===m&&_!=null?typeof _=="object"?JSON.stringify(_,null,2):_:null})},S=Q(q(D(o(b),!0,{}))),I=f(()=>({})),B=f(()=>D(o(b),!1,o(I))),F=f(()=>_e(o(b),o(S))),O=f(()=>fe(o(b),o(S),o(B))),j=f(()=>o(O)[0]),E=f(()=>o(O)[1]),C=q({});re(()=>{o(E).forEach(r=>{C[r]=!0}),Object.keys(C).forEach(r=>{o(E).includes(r)||(C[r]=!1)})});let L=f(()=>Object.fromEntries(Object.entries(o(j)).map(([r,m])=>{var v,y;return[r,typeof m=="function"?(y=(v=o(b).find(_=>_.name===r))==null?void 0:v.functionElements)==null?void 0:y.functionAsString:m]})));var W=ut(),U=h(W);ge(U,{wrapper:{component:{WrapperInformation:te,WrapperNameAndStatus:ee},name:T},homepage:!1});var K=s(U,2);me(K,{get parametersParsingErrorsArray(){return o(E)},get parametersParsingErrorsObject(){return C},onCloseFunction:r=>o(E).filter(m=>m!=r)});var V=s(K,2);be(V,{Component:A,get parametersSourceArray(){return o(b)},get derivedParametersValuesArray(){return o(B)},get parametersVisibleArray(){return o(F)},get parametersParsingErrorsObject(){return C},get copyParametersToClipboardObject(){return o(L)},get demoScreenWidth(){return o(P)},set demoScreenWidth(r){X(P,r,!0)},get statedParametersValuesArray(){return o(S)},set statedParametersValuesArray(r){X(S,r,!0)}});var G=s(V,2),M=d(G);st(M,{}),c(G),l(k,W),Z()}const $t=Object.freeze(Object.defineProperty({__proto__:null,WrapperInformation:te,WrapperNameAndStatus:ee,default:gt},Symbol.toStringTag,{value:"Module"}));export{$t as _};
