<script lang="ts">
  import homepageIllustration from "./../../assets/images/homepage-illustration.svg";

  // Define component props with types and default values
  let {
    title = "Design your service using GOV.UK styles, components and patterns",
    description = "Use this design system to make government services consistent with GOV.UK. Learn from the research and experience of other service teams and avoid repeating work that's already been done.",
    buttonText = "Get started",
    buttonHref = "/get-started/",
    imageSrc = homepageIllustration,
    imageAlt = "",
    backgroundColor = "#1d70b8", // GOV.UK blue by default
  } = $props<{
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    imageSrc?: string;
    imageAlt?: string;
    backgroundColor?: string;
  }>();
</script>

<div
  class="app-masthead"
  style="background-color: {backgroundColor}; border-bottom-color: {backgroundColor};"
>
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds-from-desktop">
        <h1 class="govuk-heading-xl app-masthead__title">{@html title}</h1>
        <p class="app-masthead__description">{description}</p>

        <a
          href={base + buttonHref}
          role="button"
          draggable="false"
          class="govuk-button govuk-button--inverse govuk-!-margin-top-6 govuk-!-margin-bottom-0 govuk-button--start"
          data-module="govuk-button"
        >
          {buttonText}
          <svg
            class="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
          </svg>
        </a>
      </div>

      <div class="govuk-grid-column-one-third-from-desktop">
        <img
          class="app-masthead__image"
          src={imageSrc}
          alt={imageAlt}
          role="presentation"
        />
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure our masthead styles take precedence over global GOV.UK styles using specificity */
  .app-masthead.app-masthead {
    /* @include govuk-responsive-padding(6, "top"); */
    padding-top: 20px;
    /* @include govuk-responsive-padding(6, "bottom"); */
    padding-bottom: 20px;
    /* border-bottom: 1px solid govuk-colour("blue"); - now set via inline style */
    border-bottom-width: 1px;
    border-bottom-style: solid;
    /* color: govuk-colour("white"); */
    color: #ffffff;
    /* background-color: govuk-colour("blue"); - now set via inline style */
  }

  @media (min-width: 40.0625em) {
    .app-masthead.app-masthead {
      /* Responsive spacing unit 6: 30px on large screens */
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }

  .app-masthead .app-masthead__title.app-masthead__title {
    /* color: govuk-colour("white"); */
    color: #ffffff;
    /* @include govuk-responsive-margin(6, "bottom"); */
    margin-bottom: 20px;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .app-masthead__title.app-masthead__title {
      /* Responsive spacing unit 6: 30px on large screens */
      margin-bottom: 30px;
    }
  }

  .app-masthead .app-masthead__description.app-masthead__description {
    /* @include govuk-font(24); - Font size 24 from the typography scale */
    font-family: "GDS Transport", arial, sans-serif;
    font-weight: 400;
    font-size: 1.25rem; /* 20px */
    line-height: 1.25;
    margin-bottom: 0;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .app-masthead__description.app-masthead__description {
      font-size: 1.5rem; /* 24px */
      line-height: 1.25;
    }
  }

  .app-masthead .app-masthead__image.app-masthead__image {
    display: none;
  }

  /* @include govuk-media-query($from: desktop) - Desktop breakpoint is 769px */
  @media (min-width: 48.0625em) {
    .app-masthead .app-masthead__image.app-masthead__image {
      display: block;
      width: 100%;
      /* margin-top: govuk-spacing(3); - Static spacing unit 3 is 15px */
      margin-top: 15px;
    }
  }

  /* GOV.UK Button Styles - Scoped to our component with high specificity */
  .app-masthead .govuk-button.govuk-button {
    /* @include govuk-font($size: 19, $line-height: 19px); */
    font-family: "GDS Transport", arial, sans-serif;
    font-weight: 400;
    font-size: 1.1875rem; /* 19px */
    line-height: 1.1875; /* 19px line height */
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    margin-bottom: 1.375rem; /* 22px - adjusted for shadow */
    /* Padding calculation: govuk-spacing(2) - border-width - shadow adjustment */
    padding: 0.4375rem 0.625rem 0.3125rem; /* 7px 10px 5px */
    border: 0.125rem solid transparent; /* 2px border */
    border-radius: 0;
    color: #ffffff; /* $govuk-button-text-colour */
    background-color: #00703c; /* $govuk-button-colour (green) */
    box-shadow: 0 0.125rem 0 #002d18; /* 2px shadow */
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    text-decoration: none;
    -webkit-appearance: none;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .govuk-button.govuk-button {
      width: auto;
      margin-bottom: 1.375rem;
    }
  }

  /* Link states for buttons */
  .app-masthead .govuk-button.govuk-button:link,
  .app-masthead .govuk-button.govuk-button:visited,
  .app-masthead .govuk-button.govuk-button:active {
    color: #ffffff;
    text-decoration: none;
  }

  .app-masthead .govuk-button.govuk-button:hover {
    background-color: #005a30; /* $govuk-button-hover-colour */
    box-shadow: 0 0.25rem 0 #002d18; /* 4px shadow on hover */
    color: #ffffff;
    text-decoration: none;
  }

  .app-masthead .govuk-button.govuk-button:active {
    top: 0.125rem; /* 2px - button pressed down */
    box-shadow: 0 0 0 #002d18; /* No shadow when pressed */
  }

  .app-masthead .govuk-button.govuk-button:focus {
    border-color: #ffdd00; /* $govuk-focus-colour */
    outline: 0.1875rem solid transparent; /* 3px */
    box-shadow: inset 0 0 0 1px #ffdd00;
  }

  .app-masthead .govuk-button.govuk-button:focus:not(:active):not(:hover) {
    border-color: #ffdd00;
    color: #0b0c0c; /* $govuk-focus-text-colour */
    background-color: #ffdd00;
    box-shadow: 0 0.125rem 0 #0b0c0c;
  }

  /* Inverse button styles - white button with blue text */
  .app-masthead .govuk-button.govuk-button--inverse {
    background-color: #ffffff; /* $govuk-inverse-button-colour */
    box-shadow: 0 0.125rem 0 #0b0c0c; /* $govuk-inverse-button-shadow-colour */
    color: #1d70b8; /* $govuk-inverse-button-text-colour - BLUE text, not white! */
  }

  .app-masthead .govuk-button.govuk-button--inverse:link,
  .app-masthead .govuk-button.govuk-button--inverse:visited,
  .app-masthead .govuk-button.govuk-button--inverse:active {
    color: #1d70b8; /* Blue text for all states */
  }

  .app-masthead .govuk-button.govuk-button--inverse:hover {
    background-color: #f3f2f1; /* $govuk-inverse-button-hover-colour */
    color: #1d70b8; /* Keep blue text on hover */
  }

  /* Start button styles */
  .app-masthead .govuk-button.govuk-button--start {
    /* @include govuk-typography-weight-bold; @include govuk-font-size($size: 24, $line-height: 1); */
    font-weight: 700;
    font-size: 1.5rem; /* 24px */
    line-height: 1;
    display: inline-flex;
    min-height: auto;
    justify-content: center;
  }

  .app-masthead .govuk-button .govuk-button__start-icon {
    /* margin-left: govuk-spacing(1); on mobile, govuk-spacing(2) on desktop */
    margin-left: 0.3125rem; /* 5px - govuk-spacing(1) */
    vertical-align: middle;
    flex-shrink: 0;
    align-self: center;
    forced-color-adjust: auto;
  }

  @media (min-width: 48.0625em) {
    .app-masthead .govuk-button .govuk-button__start-icon {
      margin-left: 0.625rem; /* 10px - govuk-spacing(2) */
    }
  }

  /* GOV.UK Typography - Scoped to our component with high specificity */
  .app-masthead .govuk-heading-xl.govuk-heading-xl {
    color: #ffffff; /* Override to white for masthead */
    font-family: "GDS Transport", arial, sans-serif;
    font-weight: 700;
    font-size: 2rem;
    line-height: 1.09375;
    display: block;
    margin-top: 0;
    margin-bottom: 1.875rem;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .govuk-heading-xl.govuk-heading-xl {
      font-size: 3rem;
      line-height: 1.04167;
      margin-bottom: 3.125rem;
    }
  }
</style>
