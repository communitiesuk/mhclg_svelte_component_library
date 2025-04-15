<script lang="ts">
  import { clsx } from "clsx";

  type ContentItem = {
    href?: string;
    text: string;
    active?: boolean;
    items?: ContentItem[];
  };

  type Props = {
    contents: ContentItem[];
    title?: string;
    marginBottom?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    underlineLinks?: boolean; // Default false (meaning no underline)
    formatNumbers?: boolean;
    alternativeLineStyle?: boolean;
    disableGa4?: boolean;
    brand?: string;
    id?: string;
    classes?: string;
    dataAttributes?: Record<string, string>;
    aria?: Record<string, string>;
    dir?: "rtl" | "ltr" | "auto" | "";
    lang?: string;
  };

  let {
    contents,
    title = "Contents",
    marginBottom = 4, // Default margin bottom level (20px)
    underlineLinks = false,
    formatNumbers = false,
    alternativeLineStyle = false,
    disableGa4 = false,
    brand = undefined,
    id = undefined,
    classes = "",
    dataAttributes = {},
    aria = {},
    dir = undefined,
    lang = undefined,
  }: Props = $props();

  // Reactive check: True if any top-level item in 'contents' has a non-empty 'items' array.
  const anyTopLevelHasSubItems = $derived(
    contents.some((item) => {
      // Get the potential sub-items array
      const subItemsArray = item.items;
      // Check if the array exists and has items
      const hasPopulatedSubItems = subItemsArray
        ? subItemsArray.length > 0
        : false;
      // Return true for this item if it has a sub-items array that's not empty
      return hasPopulatedSubItems;
    }),
  );

  // Regex to capture a leading number format (e.g., "1", "1.", "1.2", "1.2.", "123.45")
  // followed by whitespace and the rest of the text.
  // Group 1: Captures the number part (e.g., "1", "1.", "1.2", "123.45")
  //   - \d{1,3} : 1-3 digits
  //   - (?:\.\d{1,2})? : Optional non-capturing group for a decimal point and 1-2 digits
  //   - \.? : Optional trailing decimal point
  //   - | : OR
  //   - \d : A single digit (alternative)
  // Group 2: Captures the remaining text after the first whitespace following the number
  const numberFormatRegex = /^(\d{1,3}(?:\.\d{1,2})?\.?|\d)\s+(.*)/;

  function parseFormattedNumber(
    text: string,
  ): { num: string; rest: string } | null {
    if (!text) return null;
    const match = text.match(numberFormatRegex);
    if (match) {
      const numberPart = match[1];
      const textPart = match[2];
      return { num: numberPart, rest: textPart };
    }
    return null;
  }

  const navClasses = $derived(
    clsx(
      "gem-c-contents-list",
      `govuk-!-margin-bottom-${marginBottom}`,
      alternativeLineStyle && "gem-c-contents-list--alternative-line-style",
      brand && `brand--${brand}`,
      classes,
    ),
  );

  const listClasses = "gem-c-contents-list__list";

  const ga4Attributes = $derived(
    disableGa4
      ? {}
      : {
          "data-module": "ga4-link-tracker",
          "data-ga4-track-links-only": "",
          "data-ga4-module-type": "contents-list",
        },
  );

  const defaultAriaLabel = title; // Use title as default ARIA label
</script>

<nav
  class={navClasses}
  aria-label={aria?.label || defaultAriaLabel}
  {id}
  dir={dir || undefined}
  {lang}
  {...dataAttributes}
  {...ga4Attributes}
  {...aria}
>
  {#if title}
    <h2 class="gem-c-contents-list__title">{title}</h2>
  {/if}

  <ol class={listClasses}>
    {#each contents as item, i ((item.href || "") + item.text + i)}
      {@const hasSubItems = item.items && item.items.length > 0}
      {@const parsed = formatNumbers ? parseFormattedNumber(item.text) : null}
      {@const isDashed = !formatNumbers && !anyTopLevelHasSubItems}

      <li
        aria-current={item.active ? "true" : undefined}
        class={clsx(
          "gem-c-contents-list__list-item",
          {
            "gem-c-contents-list__list-item--dashed": isDashed,
            "gem-c-contents-list__list-item--numbered": formatNumbers && parsed,
            "gem-c-contents-list__list-item--parent": anyTopLevelHasSubItems,
            "gem-c-contents-list__list-item--active": item.active,
          },
          brand && item.active && alternativeLineStyle
            ? "brand__border-color"
            : "",
        )}
      >
        {#if isDashed}
          <span class="gem-c-contents-list__list-item-dash" aria-hidden="true"
          ></span>
        {/if}

        {#if item.active}
          {#if parsed}
            <span class="gem-c-contents-list__number">{parsed.num}</span>
            <span class="gem-c-contents-list__numbered-text">{parsed.rest}</span
            >
          {:else}
            {item.text}
          {/if}
        {:else}
          <a
            href={item.href || "#"}
            class={clsx(
              "gem-c-contents-list__link",
              "govuk-link",
              "gem-c-force-print-link-styles",
              underlineLinks ? null : "govuk-link--no-underline",
              brand ? "brand__color" : "",
            )}
          >
            {#if parsed}
              <span class="gem-c-contents-list__number">{parsed.num}</span>
              <span class="gem-c-contents-list__numbered-text"
                >{parsed.rest}</span
              >
            {:else}
              {item.text}
            {/if}
          </a>
        {/if}

        {#if hasSubItems}
          {@const subItems = item.items as ContentItem[]}
          <ol class="gem-c-contents-list__nested-list">
            {#each subItems as subItem, j ((subItem.href || "") + subItem.text + j)}
              {@const subParsed = null}
              {@const subHasSubItems =
                subItem.items && subItem.items.length > 0}
              {@const subIsDashed = !subHasSubItems}

              <li
                aria-current={subItem.active ? "true" : undefined}
                class={clsx(
                  "gem-c-contents-list__list-item",
                  {
                    "gem-c-contents-list__list-item--dashed": subIsDashed,
                    "gem-c-contents-list__list-item--numbered": false,
                    "gem-c-contents-list__list-item--active": subItem.active,
                  },
                  brand && subItem.active && alternativeLineStyle
                    ? "brand__border-color"
                    : "",
                )}
              >
                {#if subIsDashed}
                  <span
                    class="gem-c-contents-list__list-item-dash"
                    aria-hidden="true"
                  ></span>
                {/if}
                {#if subItem.active}
                  {subItem.text}
                {:else}
                  <a
                    href={subItem.href || "#"}
                    class={clsx(
                      "gem-c-contents-list__link",
                      "govuk-link",
                      "gem-c-force-print-link-styles",
                      underlineLinks ? null : "govuk-link--no-underline",
                      brand ? "brand__color" : "",
                    )}
                  >
                    {subItem.text}
                  </a>
                {/if}
              </li>
            {/each}
          </ol>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .gem-c-contents-list__list-item--numbered .gem-c-contents-list__link {
    display: table;
  }

  .gem-c-contents-list__number,
  .gem-c-contents-list__numbered-text {
    display: table-cell;
  }

  .gem-c-contents-list__number {
    min-width: 1.5em;
  }

  .gem-c-contents-list__numbered-text {
    padding-left: 0.3em;
  }

  [dir="rtl"] .gem-c-contents-list__numbered-text {
    padding-left: 0;
    padding-right: 0.3em;
  }

  .gem-c-contents-list {
    position: relative;
    z-index: 1;
    background: #fff;
    box-shadow: 0 20px 15px -10px #fff;
  }

  .gem-c-contents-list__title {
    margin: 0;
    color: #0b0c0c;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
  }

  @media print {
    .gem-c-contents-list__title {
      color: #000;
    }
  }

  @media print {
    .gem-c-contents-list__title {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-contents-list__title {
      font-size: 14pt;
      line-height: 1.5;
    }
  }

  .gem-c-contents-list__list,
  .gem-c-contents-list__nested-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    color: #0b0c0c;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
  }

  @media print {
    .gem-c-contents-list__list,
    .gem-c-contents-list__nested-list {
      color: #000;
    }
  }

  @media print {
    .gem-c-contents-list__list,
    .gem-c-contents-list__nested-list {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-contents-list__list,
    .gem-c-contents-list__nested-list {
      font-size: 14pt;
      line-height: 1.2;
    }
  }

  .gem-c-contents-list__link:focus,
  .gem-c-contents-list__link:active:focus,
  .gem-c-contents-list__link:link:focus,
  .gem-c-contents-list__link:visited:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important;
  }

  .gem-c-contents-list__link--underlined {
    text-decoration: underline;
  }

  .gem-c-contents-list__link--active {
    font-weight: bold;
    text-decoration: none;
    color: #0b0c0c;
  }

  .gem-c-contents-list__list-item--parent > .gem-c-contents-list__link {
    font-weight: 700;
  }

  .gem-c-contents-list__list-item {
    padding-top: 10px;
    line-height: 1.3;
    list-style-type: none;
  }

  @media (min-width: 40.0625em) {
    .gem-c-contents-list__list-item {
      padding-top: 7.5px;
    }
  }

  .gem-c-contents-list__list-item--dashed {
    position: relative;
    padding-left: 25px;
    padding-right: 25px;
  }

  .gem-c-contents-list__list-item--dashed
    .gem-c-contents-list__list-item-dash::before {
    content: "—";
    position: absolute;
    left: 0;
    width: 20px;
    overflow: hidden;
  }

  [dir="rtl"] .gem-c-contents-list__list-item--dashed {
    padding-left: 25px;
    padding-right: 25px;
  }

  [dir="rtl"]
    .gem-c-contents-list__list-item--dashed
    .gem-c-contents-list__list-item-dash::before {
    left: auto;
    right: 0;
  }

  .lte-ie8 .gem-c-contents-list__list-item--dashed .gem-c-contents-list__link {
    display: inline-block;
    vertical-align: top;
  }

  .gem-c-contents-list--alternative-line-style .gem-c-contents-list__title {
    margin-bottom: 15px;
  }

  .gem-c-contents-list--alternative-line-style .gem-c-contents-list__list-item {
    padding: 10px 0;
    margin: 0;
  }

  .gem-c-contents-list--alternative-line-style
    .gem-c-contents-list__list-item-dash::before {
    display: none;
  }

  .gem-c-contents-list--alternative-line-style
    .gem-c-contents-list__list-item--active {
    padding: 5px 10px;
    margin: 5px 0;
    border-left: 4px solid #1d70b8;
    color: #1d70b8;
    font-weight: 700;
  }

  @media print {
    .gem-c-contents-list__list,
    .gem-c-contents-list__nested-list {
      padding-left: 0;
      margin-left: 0;
    }

    .gem-c-contents-list__list-item--numbered,
    .gem-c-contents-list__list-item--parent {
      list-style-type: none;
    }
  }

  .brand--attorney-generals-office.brand__border-color,
  .brand--attorney-generals-office .brand__border-color {
    border-left-color: #a91c8e !important;
    color: #a91c8e !important;
  }

  .brand--attorney-generals-office .brand__color,
  .brand--attorney-generals-office .brand__color:link,
  .brand--attorney-generals-office .brand__color:visited,
  .brand--attorney-generals-office .brand__color:active,
  .brand--attorney-generals-office .brand__color:hover,
  .brand--attorney-generals-office .brand__color:focus {
    color: #a91c8e;
  }

  .brand--cabinet-office.brand__border-color,
  .brand--cabinet-office .brand__border-color {
    border-left-color: #0056b8 !important;
    color: #0056b8 !important;
  }

  .brand--cabinet-office .brand__color,
  .brand--cabinet-office .brand__color:link,
  .brand--cabinet-office .brand__color:visited,
  .brand--cabinet-office .brand__color:active,
  .brand--cabinet-office .brand__color:hover,
  .brand--cabinet-office .brand__color:focus {
    color: #0056b8;
  }

  .brand--civil-service.brand__border-color,
  .brand--civil-service .brand__border-color {
    border-left-color: #b2292e !important;
    color: #b2292e !important;
  }

  .brand--civil-service .brand__color,
  .brand--civil-service .brand__color:link,
  .brand--civil-service .brand__color:visited,
  .brand--civil-service .brand__color:active,
  .brand--civil-service .brand__color:hover,
  .brand--civil-service .brand__color:focus {
    color: #b2292e;
  }

  .brand--department-for-business-trade.brand__border-color,
  .brand--department-for-business-trade .brand__border-color {
    border-left-color: #e52d13 !important;
    color: #e52d13 !important;
  }

  .brand--department-for-business-trade .brand__color,
  .brand--department-for-business-trade .brand__color:link,
  .brand--department-for-business-trade .brand__color:visited,
  .brand--department-for-business-trade .brand__color:active,
  .brand--department-for-business-trade .brand__color:hover,
  .brand--department-for-business-trade .brand__color:focus {
    color: #e52d13;
  }

  .brand--department-for-business-energy-industrial-strategy.brand__border-color,
  .brand--department-for-business-energy-industrial-strategy
    .brand__border-color {
    border-left-color: #003479 !important;
    color: #003479 !important;
  }

  .brand--department-for-business-energy-industrial-strategy .brand__color,
  .brand--department-for-business-energy-industrial-strategy .brand__color:link,
  .brand--department-for-business-energy-industrial-strategy
    .brand__color:visited,
  .brand--department-for-business-energy-industrial-strategy
    .brand__color:active,
  .brand--department-for-business-energy-industrial-strategy
    .brand__color:hover,
  .brand--department-for-business-energy-industrial-strategy
    .brand__color:focus {
    color: #003479;
  }

  .brand--department-for-business-innovation-skills.brand__border-color,
  .brand--department-for-business-innovation-skills .brand__border-color {
    border-left-color: #003479 !important;
    color: #003479 !important;
  }

  .brand--department-for-business-innovation-skills .brand__color,
  .brand--department-for-business-innovation-skills .brand__color:link,
  .brand--department-for-business-innovation-skills .brand__color:visited,
  .brand--department-for-business-innovation-skills .brand__color:active,
  .brand--department-for-business-innovation-skills .brand__color:hover,
  .brand--department-for-business-innovation-skills .brand__color:focus {
    color: #003479;
  }

  .brand--department-for-communities-local-government.brand__border-color,
  .brand--department-for-communities-local-government .brand__border-color {
    border-left-color: #099 !important;
    color: #099 !important;
  }

  .brand--department-for-communities-local-government .brand__color,
  .brand--department-for-communities-local-government .brand__color:link,
  .brand--department-for-communities-local-government .brand__color:visited,
  .brand--department-for-communities-local-government .brand__color:active,
  .brand--department-for-communities-local-government .brand__color:hover,
  .brand--department-for-communities-local-government .brand__color:focus {
    color: #099;
  }

  .brand--department-for-culture-media-sport.brand__border-color,
  .brand--department-for-culture-media-sport .brand__border-color {
    border-left-color: #ed1588 !important;
    color: #ed1588 !important;
  }

  .brand--department-for-culture-media-sport .brand__color,
  .brand--department-for-culture-media-sport .brand__color:link,
  .brand--department-for-culture-media-sport .brand__color:visited,
  .brand--department-for-culture-media-sport .brand__color:active,
  .brand--department-for-culture-media-sport .brand__color:hover,
  .brand--department-for-culture-media-sport .brand__color:focus {
    color: #ed1588;
  }

  .brand--department-for-digital-culture-media-sport.brand__border-color,
  .brand--department-for-digital-culture-media-sport .brand__border-color {
    border-left-color: #d40072 !important;
    color: #d40072 !important;
  }

  .brand--department-for-digital-culture-media-sport .brand__color,
  .brand--department-for-digital-culture-media-sport .brand__color:link,
  .brand--department-for-digital-culture-media-sport .brand__color:visited,
  .brand--department-for-digital-culture-media-sport .brand__color:active,
  .brand--department-for-digital-culture-media-sport .brand__color:hover,
  .brand--department-for-digital-culture-media-sport .brand__color:focus {
    color: #d40072;
  }

  .brand--department-for-education.brand__border-color,
  .brand--department-for-education .brand__border-color {
    border-left-color: #003764 !important;
    color: #003764 !important;
  }

  .brand--department-for-education .brand__color,
  .brand--department-for-education .brand__color:link,
  .brand--department-for-education .brand__color:visited,
  .brand--department-for-education .brand__color:active,
  .brand--department-for-education .brand__color:hover,
  .brand--department-for-education .brand__color:focus {
    color: #003764;
  }

  .brand--department-for-energy-security-net-zero.brand__border-color,
  .brand--department-for-energy-security-net-zero .brand__border-color {
    border-left-color: #00a33b !important;
    color: #00a33b !important;
  }

  .brand--department-for-energy-security-net-zero .brand__color,
  .brand--department-for-energy-security-net-zero .brand__color:link,
  .brand--department-for-energy-security-net-zero .brand__color:visited,
  .brand--department-for-energy-security-net-zero .brand__color:active,
  .brand--department-for-energy-security-net-zero .brand__color:hover,
  .brand--department-for-energy-security-net-zero .brand__color:focus {
    color: #00a33b;
  }

  .brand--department-for-environment-food-rural-affairs.brand__border-color,
  .brand--department-for-environment-food-rural-affairs .brand__border-color {
    border-left-color: #00a33b !important;
    color: #00a33b !important;
  }

  .brand--department-for-environment-food-rural-affairs .brand__color,
  .brand--department-for-environment-food-rural-affairs .brand__color:link,
  .brand--department-for-environment-food-rural-affairs .brand__color:visited,
  .brand--department-for-environment-food-rural-affairs .brand__color:active,
  .brand--department-for-environment-food-rural-affairs .brand__color:hover,
  .brand--department-for-environment-food-rural-affairs .brand__color:focus {
    color: #00a33b;
  }

  .brand--department-for-exiting-the-european-union.brand__border-color,
  .brand--department-for-exiting-the-european-union .brand__border-color {
    border-left-color: #009fe3 !important;
    color: #009fe3 !important;
  }

  .brand--department-for-exiting-the-european-union .brand__color,
  .brand--department-for-exiting-the-european-union .brand__color:link,
  .brand--department-for-exiting-the-european-union .brand__color:visited,
  .brand--department-for-exiting-the-european-union .brand__color:active,
  .brand--department-for-exiting-the-european-union .brand__color:hover,
  .brand--department-for-exiting-the-european-union .brand__color:focus {
    color: #009fe3;
  }

  .brand--department-for-international-development.brand__border-color,
  .brand--department-for-international-development .brand__border-color {
    border-left-color: #002878 !important;
    color: #002878 !important;
  }

  .brand--department-for-international-development .brand__color,
  .brand--department-for-international-development .brand__color:link,
  .brand--department-for-international-development .brand__color:visited,
  .brand--department-for-international-development .brand__color:active,
  .brand--department-for-international-development .brand__color:hover,
  .brand--department-for-international-development .brand__color:focus {
    color: #002878;
  }

  .brand--department-for-international-trade.brand__border-color,
  .brand--department-for-international-trade .brand__border-color {
    border-left-color: #cf102d !important;
    color: #cf102d !important;
  }

  .brand--department-for-international-trade .brand__color,
  .brand--department-for-international-trade .brand__color:link,
  .brand--department-for-international-trade .brand__color:visited,
  .brand--department-for-international-trade .brand__color:active,
  .brand--department-for-international-trade .brand__color:hover,
  .brand--department-for-international-trade .brand__color:focus {
    color: #cf102d;
  }

  .brand--department-for-levelling-up-housing-communities.brand__border-color,
  .brand--department-for-levelling-up-housing-communities .brand__border-color {
    border-left-color: #012169 !important;
    color: #012169 !important;
  }

  .brand--department-for-levelling-up-housing-communities .brand__color,
  .brand--department-for-levelling-up-housing-communities .brand__color:link,
  .brand--department-for-levelling-up-housing-communities .brand__color:visited,
  .brand--department-for-levelling-up-housing-communities .brand__color:active,
  .brand--department-for-levelling-up-housing-communities .brand__color:hover,
  .brand--department-for-levelling-up-housing-communities .brand__color:focus {
    color: #012169;
  }

  .brand--department-for-science-innovation-technology.brand__border-color,
  .brand--department-for-science-innovation-technology .brand__border-color {
    border-left-color: #00f8f8 !important;
    color: #00f8f8 !important;
  }

  .brand--department-for-science-innovation-technology .brand__color,
  .brand--department-for-science-innovation-technology .brand__color:link,
  .brand--department-for-science-innovation-technology .brand__color:visited,
  .brand--department-for-science-innovation-technology .brand__color:active,
  .brand--department-for-science-innovation-technology .brand__color:hover,
  .brand--department-for-science-innovation-technology .brand__color:focus {
    color: #00f8f8;
  }

  .brand--department-for-transport.brand__border-color,
  .brand--department-for-transport .brand__border-color {
    border-left-color: #006853 !important;
    color: #006853 !important;
  }

  .brand--department-for-transport .brand__color,
  .brand--department-for-transport .brand__color:link,
  .brand--department-for-transport .brand__color:visited,
  .brand--department-for-transport .brand__color:active,
  .brand--department-for-transport .brand__color:hover,
  .brand--department-for-transport .brand__color:focus {
    color: #006853;
  }

  .brand--department-for-work-pensions.brand__border-color,
  .brand--department-for-work-pensions .brand__border-color {
    border-left-color: #00bcb5 !important;
    color: #00bcb5 !important;
  }

  .brand--department-for-work-pensions .brand__color,
  .brand--department-for-work-pensions .brand__color:link,
  .brand--department-for-work-pensions .brand__color:visited,
  .brand--department-for-work-pensions .brand__color:active,
  .brand--department-for-work-pensions .brand__color:hover,
  .brand--department-for-work-pensions .brand__color:focus {
    color: #00bcb5;
  }

  .brand--department-of-energy-climate-change.brand__border-color,
  .brand--department-of-energy-climate-change .brand__border-color {
    border-left-color: #009ddb !important;
    color: #009ddb !important;
  }

  .brand--department-of-energy-climate-change .brand__color,
  .brand--department-of-energy-climate-change .brand__color:link,
  .brand--department-of-energy-climate-change .brand__color:visited,
  .brand--department-of-energy-climate-change .brand__color:active,
  .brand--department-of-energy-climate-change .brand__color:hover,
  .brand--department-of-energy-climate-change .brand__color:focus {
    color: #009ddb;
  }

  .brand--department-of-health.brand__border-color,
  .brand--department-of-health .brand__border-color {
    border-left-color: #00ad93 !important;
    color: #00ad93 !important;
  }

  .brand--department-of-health .brand__color,
  .brand--department-of-health .brand__color:link,
  .brand--department-of-health .brand__color:visited,
  .brand--department-of-health .brand__color:active,
  .brand--department-of-health .brand__color:hover,
  .brand--department-of-health .brand__color:focus {
    color: #00ad93;
  }

  .brand--department-of-health-social-care.brand__border-color,
  .brand--department-of-health-social-care .brand__border-color {
    border-left-color: #00a990 !important;
    color: #00a990 !important;
  }

  .brand--department-of-health-social-care .brand__color,
  .brand--department-of-health-social-care .brand__color:link,
  .brand--department-of-health-social-care .brand__color:visited,
  .brand--department-of-health-social-care .brand__color:active,
  .brand--department-of-health-social-care .brand__color:hover,
  .brand--department-of-health-social-care .brand__color:focus {
    color: #00a990;
  }

  .brand--foreign-commonwealth-office.brand__border-color,
  .brand--foreign-commonwealth-office .brand__border-color {
    border-left-color: #003e74 !important;
    color: #003e74 !important;
  }

  .brand--foreign-commonwealth-office .brand__color,
  .brand--foreign-commonwealth-office .brand__color:link,
  .brand--foreign-commonwealth-office .brand__color:visited,
  .brand--foreign-commonwealth-office .brand__color:active,
  .brand--foreign-commonwealth-office .brand__color:hover,
  .brand--foreign-commonwealth-office .brand__color:focus {
    color: #003e74;
  }

  .brand--foreign-commonwealth-development-office.brand__border-color,
  .brand--foreign-commonwealth-development-office .brand__border-color {
    border-left-color: #012069 !important;
    color: #012069 !important;
  }

  .brand--foreign-commonwealth-development-office .brand__color,
  .brand--foreign-commonwealth-development-office .brand__color:link,
  .brand--foreign-commonwealth-development-office .brand__color:visited,
  .brand--foreign-commonwealth-development-office .brand__color:active,
  .brand--foreign-commonwealth-development-office .brand__color:hover,
  .brand--foreign-commonwealth-development-office .brand__color:focus {
    color: #012069;
  }

  .brand--government-equalities-office.brand__border-color,
  .brand--government-equalities-office .brand__border-color {
    border-left-color: #0056b8 !important;
    color: #0056b8 !important;
  }

  .brand--government-equalities-office .brand__color,
  .brand--government-equalities-office .brand__color:link,
  .brand--government-equalities-office .brand__color:visited,
  .brand--government-equalities-office .brand__color:active,
  .brand--government-equalities-office .brand__color:hover,
  .brand--government-equalities-office .brand__color:focus {
    color: #0056b8;
  }

  .brand--hm-government.brand__border-color,
  .brand--hm-government .brand__border-color {
    border-left-color: #266ebc !important;
    color: #266ebc !important;
  }

  .brand--hm-government .brand__color,
  .brand--hm-government .brand__color:link,
  .brand--hm-government .brand__color:visited,
  .brand--hm-government .brand__color:active,
  .brand--hm-government .brand__color:hover,
  .brand--hm-government .brand__color:focus {
    color: #266ebc;
  }

  .brand--hm-revenue-customs.brand__border-color,
  .brand--hm-revenue-customs .brand__border-color {
    border-left-color: #008476 !important;
    color: #008476 !important;
  }

  .brand--hm-revenue-customs .brand__color,
  .brand--hm-revenue-customs .brand__color:link,
  .brand--hm-revenue-customs .brand__color:visited,
  .brand--hm-revenue-customs .brand__color:active,
  .brand--hm-revenue-customs .brand__color:hover,
  .brand--hm-revenue-customs .brand__color:focus {
    color: #008476;
  }

  .brand--hm-treasury.brand__border-color,
  .brand--hm-treasury .brand__border-color {
    border-left-color: #b2292e !important;
    color: #b2292e !important;
  }

  .brand--hm-treasury .brand__color,
  .brand--hm-treasury .brand__color:link,
  .brand--hm-treasury .brand__color:visited,
  .brand--hm-treasury .brand__color:active,
  .brand--hm-treasury .brand__color:hover,
  .brand--hm-treasury .brand__color:focus {
    color: #b2292e;
  }

  .brand--home-office.brand__border-color,
  .brand--home-office .brand__border-color {
    border-left-color: #732282 !important;
    color: #732282 !important;
  }

  .brand--home-office .brand__color,
  .brand--home-office .brand__color:link,
  .brand--home-office .brand__color:visited,
  .brand--home-office .brand__color:active,
  .brand--home-office .brand__color:hover,
  .brand--home-office .brand__color:focus {
    color: #732282;
  }

  .brand--ministry-of-defence.brand__border-color,
  .brand--ministry-of-defence .brand__border-color {
    border-left-color: #532a45 !important;
    color: #532a45 !important;
  }

  .brand--ministry-of-defence .brand__color,
  .brand--ministry-of-defence .brand__color:link,
  .brand--ministry-of-defence .brand__color:visited,
  .brand--ministry-of-defence .brand__color:active,
  .brand--ministry-of-defence .brand__color:hover,
  .brand--ministry-of-defence .brand__color:focus {
    color: #532a45;
  }

  .brand--ministry-of-housing-communities-local-government.brand__border-color,
  .brand--ministry-of-housing-communities-local-government
    .brand__border-color {
    border-left-color: #00625e !important;
    color: #00625e !important;
  }

  .brand--ministry-of-housing-communities-local-government .brand__color,
  .brand--ministry-of-housing-communities-local-government .brand__color:link,
  .brand--ministry-of-housing-communities-local-government
    .brand__color:visited,
  .brand--ministry-of-housing-communities-local-government .brand__color:active,
  .brand--ministry-of-housing-communities-local-government .brand__color:hover,
  .brand--ministry-of-housing-communities-local-government .brand__color:focus {
    color: #00625e;
  }

  .brand--ministry-of-justice.brand__border-color,
  .brand--ministry-of-justice .brand__border-color {
    border-left-color: #000 !important;
    color: #000 !important;
  }

  .brand--ministry-of-justice .brand__color,
  .brand--ministry-of-justice .brand__color:link,
  .brand--ministry-of-justice .brand__color:visited,
  .brand--ministry-of-justice .brand__color:active,
  .brand--ministry-of-justice .brand__color:hover,
  .brand--ministry-of-justice .brand__color:focus {
    color: #000;
  }

  .brand--northern-ireland-office.brand__border-color,
  .brand--northern-ireland-office .brand__border-color {
    border-left-color: #00205c !important;
    color: #00205c !important;
  }

  .brand--northern-ireland-office .brand__color,
  .brand--northern-ireland-office .brand__color:link,
  .brand--northern-ireland-office .brand__color:visited,
  .brand--northern-ireland-office .brand__color:active,
  .brand--northern-ireland-office .brand__color:hover,
  .brand--northern-ireland-office .brand__color:focus {
    color: #00205c;
  }

  .brand--office-of-the-advocate-general-for-scotland.brand__border-color,
  .brand--office-of-the-advocate-general-for-scotland .brand__border-color {
    border-left-color: #00205c !important;
    color: #00205c !important;
  }

  .brand--office-of-the-advocate-general-for-scotland .brand__color,
  .brand--office-of-the-advocate-general-for-scotland .brand__color:link,
  .brand--office-of-the-advocate-general-for-scotland .brand__color:visited,
  .brand--office-of-the-advocate-general-for-scotland .brand__color:active,
  .brand--office-of-the-advocate-general-for-scotland .brand__color:hover,
  .brand--office-of-the-advocate-general-for-scotland .brand__color:focus {
    color: #00205c;
  }

  .brand--office-of-the-leader-of-the-house-of-commons.brand__border-color,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__border-color {
    border-left-color: #497629 !important;
    color: #497629 !important;
  }

  .brand--office-of-the-leader-of-the-house-of-commons .brand__color,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__color:link,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__color:visited,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__color:active,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__color:hover,
  .brand--office-of-the-leader-of-the-house-of-commons .brand__color:focus {
    color: #497629;
  }

  .brand--office-of-the-leader-of-the-house-of-lords.brand__border-color,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__border-color {
    border-left-color: #9c182f !important;
    color: #9c182f !important;
  }

  .brand--office-of-the-leader-of-the-house-of-lords .brand__color,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__color:link,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__color:visited,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__color:active,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__color:hover,
  .brand--office-of-the-leader-of-the-house-of-lords .brand__color:focus {
    color: #9c182f;
  }

  .brand--office-of-the-secretary-of-state-for-scotland.brand__border-color,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__border-color {
    border-left-color: #00205c !important;
    color: #00205c !important;
  }

  .brand--office-of-the-secretary-of-state-for-scotland .brand__color,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__color:link,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__color:visited,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__color:active,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__color:hover,
  .brand--office-of-the-secretary-of-state-for-scotland .brand__color:focus {
    color: #00205c;
  }

  .brand--office-of-the-secretary-of-state-for-wales.brand__border-color,
  .brand--office-of-the-secretary-of-state-for-wales .brand__border-color {
    border-left-color: #a8353a !important;
    color: #a8353a !important;
  }

  .brand--office-of-the-secretary-of-state-for-wales .brand__color,
  .brand--office-of-the-secretary-of-state-for-wales .brand__color:link,
  .brand--office-of-the-secretary-of-state-for-wales .brand__color:visited,
  .brand--office-of-the-secretary-of-state-for-wales .brand__color:active,
  .brand--office-of-the-secretary-of-state-for-wales .brand__color:hover,
  .brand--office-of-the-secretary-of-state-for-wales .brand__color:focus {
    color: #a8353a;
  }

  .brand--prime-ministers-office-10-downing-street.brand__border-color,
  .brand--prime-ministers-office-10-downing-street .brand__border-color {
    border-left-color: #0b0c0c !important;
    color: #0b0c0c !important;
  }

  .brand--prime-ministers-office-10-downing-street .brand__color,
  .brand--prime-ministers-office-10-downing-street .brand__color:link,
  .brand--prime-ministers-office-10-downing-street .brand__color:visited,
  .brand--prime-ministers-office-10-downing-street .brand__color:active,
  .brand--prime-ministers-office-10-downing-street .brand__color:hover,
  .brand--prime-ministers-office-10-downing-street .brand__color:focus {
    color: #0b0c0c;
  }

  .brand--scotland-office.brand__border-color,
  .brand--scotland-office .brand__border-color {
    border-left-color: #00205c !important;
    color: #00205c !important;
  }

  .brand--scotland-office .brand__color,
  .brand--scotland-office .brand__color:link,
  .brand--scotland-office .brand__color:visited,
  .brand--scotland-office .brand__color:active,
  .brand--scotland-office .brand__color:hover,
  .brand--scotland-office .brand__color:focus {
    color: #00205c;
  }

  .brand--serious-fraud-office.brand__border-color,
  .brand--serious-fraud-office .brand__border-color {
    border-left-color: #82368c !important;
    color: #82368c !important;
  }

  .brand--serious-fraud-office .brand__color,
  .brand--serious-fraud-office .brand__color:link,
  .brand--serious-fraud-office .brand__color:visited,
  .brand--serious-fraud-office .brand__color:active,
  .brand--serious-fraud-office .brand__color:hover,
  .brand--serious-fraud-office .brand__color:focus {
    color: #82368c;
  }

  .brand--uk-export-finance.brand__border-color,
  .brand--uk-export-finance .brand__border-color {
    border-left-color: #cf102d !important;
    color: #cf102d !important;
  }

  .brand--uk-export-finance .brand__color,
  .brand--uk-export-finance .brand__color:link,
  .brand--uk-export-finance .brand__color:visited,
  .brand--uk-export-finance .brand__color:active,
  .brand--uk-export-finance .brand__color:hover,
  .brand--uk-export-finance .brand__color:focus {
    color: #cf102d;
  }

  .brand--uk-trade-investment.brand__border-color,
  .brand--uk-trade-investment .brand__border-color {
    border-left-color: #c80651 !important;
    color: #c80651 !important;
  }

  .brand--uk-trade-investment .brand__color,
  .brand--uk-trade-investment .brand__color:link,
  .brand--uk-trade-investment .brand__color:visited,
  .brand--uk-trade-investment .brand__color:active,
  .brand--uk-trade-investment .brand__color:hover,
  .brand--uk-trade-investment .brand__color:focus {
    color: #c80651;
  }

  .brand--wales-office.brand__border-color,
  .brand--wales-office .brand__border-color {
    border-left-color: #a33038 !important;
    color: #a33038 !important;
  }

  .brand--wales-office .brand__color,
  .brand--wales-office .brand__color:link,
  .brand--wales-office .brand__color:visited,
  .brand--wales-office .brand__color:active,
  .brand--wales-office .brand__color:hover,
  .brand--wales-office .brand__color:focus {
    color: #a33038;
  }

  .brand--the-office-of-the-leader-of-the-house-of-commons.brand__border-color,
  .brand--the-office-of-the-leader-of-the-house-of-commons
    .brand__border-color {
    border-left-color: #497629 !important;
    color: #497629 !important;
  }

  .brand--the-office-of-the-leader-of-the-house-of-commons .brand__color,
  .brand--the-office-of-the-leader-of-the-house-of-commons .brand__color:link,
  .brand--the-office-of-the-leader-of-the-house-of-commons
    .brand__color:visited,
  .brand--the-office-of-the-leader-of-the-house-of-commons .brand__color:active,
  .brand--the-office-of-the-leader-of-the-house-of-commons .brand__color:hover,
  .brand--the-office-of-the-leader-of-the-house-of-commons .brand__color:focus {
    color: #497629;
  }

  .brand--department-for-science-innovation-and-technology.brand__border-color,
  .brand--department-for-science-innovation-and-technology
    .brand__border-color {
    border-left-color: #00f8f8 !important;
    color: #00f8f8 !important;
  }

  .brand--department-for-science-innovation-and-technology .brand__color,
  .brand--department-for-science-innovation-and-technology .brand__color:link,
  .brand--department-for-science-innovation-and-technology
    .brand__color:visited,
  .brand--department-for-science-innovation-and-technology .brand__color:active,
  .brand--department-for-science-innovation-and-technology .brand__color:hover,
  .brand--department-for-science-innovation-and-technology .brand__color:focus {
    color: #00f8f8;
  }
</style>
