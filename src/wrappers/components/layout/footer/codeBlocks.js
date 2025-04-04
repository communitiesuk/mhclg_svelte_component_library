export const codeBlock1 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<Footer />`;

export const codeBlock2 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms and conditions" }
  ];
</script>

<Footer {inlineLinks} />`;

export const codeBlock3 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];
</script>

<Footer {sections} />`;

export const codeBlock4 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/cookies", label: "Cookies" },
    { href: "/contact", label: "Contact" }
  ];

  const metaCustomContent = 'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>';
</script>

<Footer
  {sections}
  {inlineLinks}
  {metaCustomContent}
  showLicence={true}
  showCopyright={true}
  copyrightLogoUrl="/assets/images/govuk-crest.svg"
  copyrightText="© Crown copyright"
  copyrightHref="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Open Government Licence v3.0"
  licenceTextAfter=", except where otherwise stated"
  licenceHref="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
  crownSvgPath="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
/>`;

export const codeBlock5 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { 
      href: "/welsh", 
      label: "Rhestr o Wasanaethau Cymraeg",
      lang: "cy",        // ISO 639-1 Welsh language code
      hrefLang: "cy"     // Indicates linked document is in Welsh
    }
  ];
</script>

<Footer {inlineLinks} />`;

export const codeBlock6 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<!-- Using a custom logo image for the crown copyright section -->
<Footer copyrightLogoUrl="/path/to/your/custom-crest.svg" />`;

export const codeBlock7 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<!-- Using custom copyright text -->
<Footer copyrightText="© Your Organization 2024" />`;

export const codeBlock8 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<!-- Using both custom logo and text -->
<Footer 
  copyrightLogoUrl="/path/to/your/organization-logo.svg"
  copyrightText="© Your Organization 2024"
/>`;

export const codeBlock9 = `<script>
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<!-- Fully customised footer with all customisable props -->
<Footer 
  copyrightLogoUrl="/path/to/your/logo.svg"
  copyrightText="© Your Organization 2024" 
  copyrightHref="https://your-org.com/copyright"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Custom Licence v1.0"
  licenceTextAfter=", except where otherwise noted"
  licenceHref="https://your-org.com/licence"
  crownSvgPath="M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z" 
/>`;
