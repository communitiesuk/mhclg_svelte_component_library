<script lang="ts">
  import defaultCopyrightLogo from "./../../assets/images/govuk-crest.svg";
  // Define component props with default values
  // sections: array of footer navigation sections
  // inlineLinks: array of inline footer links
  // metaCustomContent: custom HTML content for meta section
  // containerWidth: width class for the container
  // showLicence: toggle for OGL license display
  // showCopyright: toggle for crown copyright display
  // copyrightLogoUrl: URL for the crown copyright logo background image (overrides the default CSS background-image)
  // copyrightText: Text to display for the crown copyright notice
  // crownSvgPath: SVG path data for the crown logo used in the license section
  // licenceHref: URL for the Open Government Licence link
  // licenceLinkText: Text for the Open Government Licence link
  // licenceTextBefore: Text to display before the licence link
  // licenceTextAfter: Text to display after the licence link
  // copyrightHref: URL for the crown copyright link

  // Define types for component props
  interface FooterItem {
    href: string;
    label: string;
    lang?: string;
    hrefLang?: string;
  }

  interface FooterSection {
    title: string;
    columns?: number;
    items: FooterItem[];
  }

  // Define component props with types and default values
  let {
    sections = [] as FooterSection[],
    inlineLinks = [] as FooterItem[],
    metaCustomContent = "",
    containerWidth = "govuk-width-container",
    showLicence = true,
    showCopyright = true,
    copyrightLogoUrl,
    copyrightText = "© Crown copyright",
    crownSvgPath = "M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145",
    licenceHref = "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    licenceLinkText = "Open Government Licence v3.0",
    licenceTextBefore = "All content is available under the ",
    licenceTextAfter = ", except where otherwise stated",
    copyrightHref = "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",
  } = $props<{
    sections?: FooterSection[];
    inlineLinks?: FooterItem[];
    metaCustomContent?: string;
    containerWidth?: string;
    showLicence?: boolean;
    showCopyright?: boolean;
    copyrightLogoUrl?: string;
    copyrightText?: string;
    crownSvgPath?: string;
    licenceHref?: string;
    licenceLinkText?: string;
    licenceTextBefore?: string;
    licenceTextAfter?: string;
    copyrightHref?: string;
  }>();
</script>

<!-- Main footer container -->
<footer class="govuk-footer">
  <div class={containerWidth}>
    <!-- Navigation sections (optional) -->
    {#if sections.length > 0}
      <div class="govuk-footer__navigation">
        <!-- Iterate through each footer section -->
        {#each sections as section}
          <div
            class="govuk-footer__section {section.columns === 2
              ? 'govuk-grid-column-two-thirds'
              : 'govuk-grid-column-one-third'}"
          >
            <h2 class="govuk-footer__heading govuk-heading-m">
              {section.title}
            </h2>
            <ul
              class="govuk-footer__list {section.columns === 2
                ? 'govuk-footer__list--columns-2'
                : ''}"
            >
              {#each section.items as item}
                <li class="govuk-footer__list-item">
                  <a
                    class="govuk-footer__link"
                    href={item.href}
                    lang={item.lang}
                    hreflang={item.hrefLang}
                  >
                    {item.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
      <hr class="govuk-footer__section-break" />
    {/if}

    <!-- Footer meta section -->
    <div class="govuk-footer__meta">
      <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
        <!-- Inline links section (optional) -->
        {#if inlineLinks.length > 0}
          <h2 class="govuk-visually-hidden">Support links</h2>
          <ul class="govuk-footer__inline-list">
            {#each inlineLinks as link}
              <li class="govuk-footer__inline-list-item">
                <a
                  class="govuk-footer__link"
                  href={link.href}
                  lang={link.lang}
                  hreflang={link.hrefLang}
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Custom meta content (optional) -->
        {#if metaCustomContent}
          <div class="govuk-footer__meta-custom">
            {@html metaCustomContent}
          </div>
        {/if}

        <!-- Open Government License section (optional) -->
        {#if showLicence}
          <svg
            aria-hidden="true"
            focusable="false"
            class="govuk-footer__licence-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 483.2 195.7"
            height="17"
            width="41"
          >
            <path fill="currentColor" d={crownSvgPath}></path>
          </svg>
          <span class="govuk-footer__licence-description">
            {licenceTextBefore}
            <a class="govuk-footer__link" href={licenceHref} rel="license"
              >{licenceLinkText}</a
            >{licenceTextAfter}
          </span>
        {/if}
      </div>

      <!-- Crown copyright section (optional) -->
      {#if showCopyright}
        <div class="govuk-footer__meta-item">
          <a
            class="govuk-footer__link govuk-footer__copyright-logo"
            href={copyrightHref}
            style="background-image: url({copyrightLogoUrl ??
              defaultCopyrightLogo});"
          >
            {copyrightText}
          </a>
        </div>
      {/if}
    </div>
  </div>
</footer>
