<script lang="ts">
  import legacyDefaultCopyrightLogo from "./../../assets/images/govuk-crest.svg";
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
  // rebrand: whether to use the new rebranded crown logo
  // borderTopColor: custom color for the footer's top border (overrides default #1d70b8)

  // Define types for component props
  interface FooterItem {
    href: string;
    label: string;
    lang?: string;
    hrefLang?: string;
    onclick?: (event: Event) => void;
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
    rebrand = true,
    borderTopColor = "#00625E",
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
    rebrand?: boolean;
    borderTopColor?: string;
  }>();
</script>

<!-- Main footer container -->
<footer
  class="govuk-footer"
  class:govuk-footer--rebranded={rebrand}
  style:border-top-color={borderTopColor}
>
  <div class={containerWidth}>
    {#if rebrand}
      <!-- New rebranded crown logo for footer -->
      <svg
        focusable="false"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 60"
        height="30"
        width="32"
        fill="currentcolor"
        class="govuk-footer__crown"
      >
        <g>
          <circle cx="20" cy="17.6" r="3.7"></circle>
          <circle cx="10.2" cy="23.5" r="3.7"></circle>
          <circle cx="3.7" cy="33.2" r="3.7"></circle>
          <circle cx="31.7" cy="30.6" r="3.7"></circle>
          <circle cx="43.3" cy="17.6" r="3.7"></circle>
          <circle cx="53.2" cy="23.5" r="3.7"></circle>
          <circle cx="59.7" cy="33.2" r="3.7"></circle>
          <circle cx="31.7" cy="30.6" r="3.7"></circle>
          <path
            d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z"
          ></path>
        </g>
      </svg>
    {/if}

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
                  onclick={link.onclick}
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
          <!-- 
            Copyright logo handling:
            
            The GOV.UK Frontend CSS uses a ::before pseudo-element on .govuk-footer__copyright-logo
            to display the crown logo. This creates conflicts when we want to use custom logos.
            
            Our approach:
            1. When using a custom logo (copyrightLogoUrl provided):
               - Remove the govuk-footer__copyright-logo class to disable the pseudo-element
               - Apply explicit background-image styles to show the custom logo
            
            2. When using default logos:
               - Rebrand mode: Let the CSS pseudo-element handle it (uses rebrand assets)
               - Legacy mode: Always use explicit styling (uses legacy assets)
            
            This prevents logo duplication/overlap while maintaining backward compatibility.
          -->
          <a
            class={[
              "govuk-footer__link",
              {
                "govuk-footer__copyright-logo": !copyrightLogoUrl && rebrand,
              },
            ]}
            href={copyrightHref}
            style={copyrightLogoUrl || !rebrand
              ? `background-image: url(${copyrightLogoUrl ?? legacyDefaultCopyrightLogo}); display: block; width: 100%; padding-top: 112px; background-repeat: no-repeat; background-position: 50% 0; background-size: 125px 102px; text-align: center;`
              : ""}
          >
            {copyrightText}
          </a>
        </div>
      {/if}
    </div>
  </div>
</footer>
