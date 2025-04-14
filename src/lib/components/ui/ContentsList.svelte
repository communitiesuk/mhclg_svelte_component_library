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
    brand?: string; // Not implemented yet, just adding prop
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

  const anyTopLevelHasSubItems = $derived(
    contents.some((item) => item.items && item.items.length > 0),
  );

  const numberFormatRegex = /^(\d{1,3}(?:\.\d{1,2})?\.?|\d)\s+(.*)/;

  function parseFormattedNumber(
    text: string,
  ): { num: string; rest: string } | null {
    if (!text) return null;
    const match = text.match(numberFormatRegex);
    if (match) {
      return { num: match[1], rest: match[2] };
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

  const listClasses = $derived(clsx("gem-c-contents-list__list"));

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
  role="navigation"
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

  .brand--government-digital-service.brand__border-color,
  .brand--government-digital-service .brand__border-color {
    border-color: #16eeee;
  }

  .brand--government-digital-service .brand__color,
  .brand--government-digital-service .brand__color:link,
  .brand--government-digital-service .brand__color:visited,
  .brand--government-digital-service .brand__color:active,
  .brand--government-digital-service .brand__color:hover,
  .brand--government-digital-service .brand__color:focus {
    color: #16eeee;
  }
</style>
