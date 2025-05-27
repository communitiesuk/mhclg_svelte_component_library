<script lang="ts">
  import homepageIllustration from "$lib/assets/images/homepage-illustration.svg";

  // Define component props with types and default values
  let {
    title = "Design your service using GOV.UK styles, components and patterns",
    description = "Use this design system to make government services consistent with GOV.UK. Learn from the research and experience of other service teams and avoid repeating work that's already been done.",
    buttonText = "Get started",
    buttonHref = "/get-started/",
    imageSrc = homepageIllustration,
    imageAlt = "",
  } = $props<{
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    imageSrc?: string;
    imageAlt?: string;
  }>();
</script>

<div class="app-masthead">
  <div class="app-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds-from-desktop">
        <h1 class="govuk-heading-xl app-masthead__title">{@html title}</h1>
        <p class="app-masthead__description">{description}</p>

        <a
          href={buttonHref}
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
    /* border-bottom: 1px solid govuk-colour("blue"); */
    border-bottom: 1px solid #1d70b8;
    /* color: govuk-colour("white"); */
    color: #ffffff;
    /* background-color: govuk-colour("blue"); */
    background-color: #1d70b8;
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

  /* GOV.UK Grid System Classes - Scoped to our component with high specificity */
  .app-masthead .app-width-container.app-width-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .app-width-container.app-width-container {
      padding: 0 30px;
    }
  }

  .app-masthead .govuk-grid-row.govuk-grid-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .app-masthead
    .govuk-grid-column-two-thirds-from-desktop.govuk-grid-column-two-thirds-from-desktop,
  .app-masthead
    .govuk-grid-column-one-third-from-desktop.govuk-grid-column-one-third-from-desktop {
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px;
  }

  @media (min-width: 48.0625em) {
    .app-masthead
      .govuk-grid-column-two-thirds-from-desktop.govuk-grid-column-two-thirds-from-desktop {
      width: 66.6666%;
    }

    .app-masthead
      .govuk-grid-column-one-third-from-desktop.govuk-grid-column-one-third-from-desktop {
      width: 33.3333%;
    }
  }

  /* GOV.UK Button Styles - Scoped to our component with high specificity */
  .app-masthead .govuk-button.govuk-button {
    font-family: "GDS Transport", arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.1875;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    margin-bottom: 1.375rem;
    padding: 0.5rem 0.625rem 0.4375rem;
    border: 0.125rem solid transparent;
    border-radius: 0;
    color: #ffffff;
    background-color: #00703c;
    box-shadow: 0 0.125rem 0 #002d18;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    text-decoration: none;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .govuk-button.govuk-button {
      width: auto;
      margin-bottom: 1.375rem;
    }
  }

  .app-masthead .govuk-button.govuk-button:hover {
    background-color: #005a30;
    box-shadow: 0 0.25rem 0 #002d18;
  }

  .app-masthead .govuk-button.govuk-button:active {
    top: 0.125rem;
    box-shadow: 0 0 0 #002d18;
  }

  .app-masthead .govuk-button.govuk-button--inverse {
    background-color: #ffffff;
    box-shadow: 0 0.125rem 0 #0b0c0c;
    color: #0b0c0c;
  }

  .app-masthead .govuk-button.govuk-button--inverse:hover {
    background-color: #f3f2f1;
    color: #0b0c0c;
  }

  .app-masthead .govuk-button.govuk-button--start {
    font-weight: 700;
    display: inline-flex;
    align-items: center;
  }

  .app-masthead .govuk-button .govuk-button__start-icon {
    margin-left: 0.5rem;
    vertical-align: middle;
    flex-shrink: 0;
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

  /* GOV.UK Spacing Utilities - Scoped to our component with high specificity */
  .app-masthead .govuk-\!-margin-top-6.govuk-\!-margin-top-6 {
    margin-top: 20px;
  }

  @media (min-width: 40.0625em) {
    .app-masthead .govuk-\!-margin-top-6.govuk-\!-margin-top-6 {
      margin-top: 30px;
    }
  }

  .app-masthead .govuk-\!-margin-bottom-0.govuk-\!-margin-bottom-0 {
    margin-bottom: 0;
  }
</style>
