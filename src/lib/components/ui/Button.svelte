<script>
  import Icon from "./../../assets/icons/MaterialIcon.svelte";

  let {
    textContent = "Click me",
    buttonType = "default",
    onClickFunction = function () {
      window.alert(`The button function has been triggered.`);
    },
    typeAttribute = "button",
  } = $props();

  const buttonClasses = {
    default: "govuk-button",
    secondary: "govuk-button govuk-button--secondary",
    warning: "govuk-button govuk-button--warning",
    darkBackground: "govuk-button govuk-button--inverse",
    moreInfo: "more-info-button",
    start: "govuk-button govuk-button--start",
    tableHeader: "text-header",
  };

  let buttonClass = $derived(buttonClasses[buttonType]);
</script>

{#if buttonType === "default"}
  <button type={typeAttribute} class={buttonClass} onclick={onClickFunction}>
    {textContent}
  </button>
{:else if buttonType === "secondary"}
  <button type={typeAttribute} class={buttonClass} onclick={onClickFunction}>
    {textContent}
  </button>
{:else if buttonType === "warning"}
  <button type={typeAttribute} class={buttonClass} onclick={onClickFunction}>
    {textContent}
  </button>
{:else if buttonType === "darkBackground"}
  <button type={typeAttribute} class={buttonClass} onclick={onClickFunction}>
    {textContent}
  </button>
{:else if buttonType === "disabled"}
  <button
    type={typeAttribute}
    disabled
    aria-disabled="true"
    class={buttonClass}
    onclick={onClickFunction}
  >
    {textContent}
  </button>
{:else if buttonType === "moreInfo"}
  <button
    type={typeAttribute}
    class={buttonClass}
    onclick={onClickFunction}
    aria-label="More information"
  >
    <Icon kind="info" />
  </button>
{:else if buttonType === "start"}
  <a
    href={"#"}
    role="button"
    draggable="false"
    class={buttonClass}
    onclick={onClickFunction}
    onkeydown={(e) => {
      // pressing space on <a> buttons does not trigger the on click function so adding here
      if (e.code === "Space") {
        e.preventDefault(); // prevent page scroll
        onClickFunction();
      }
    }}
  >
    {textContent}
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
{:else if buttonType === "tableHeader"}
  <button type={typeAttribute} class={buttonClass} onclick={onClickFunction}>
    {textContent}
    <svg
      width="22"
      height="22"
      focusable="false"
      aria-hidden="true"
      role="img"
      viewBox="0 0 22 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="top-triangle"
        d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z"
        fill="currentColor"
      ></path>
      <path
        class="bottom-triangle"
        d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z"
        fill="currentColor"
      ></path>
    </svg>
  </button>
{/if}

<style>
  .text-header {
    display: flex;
    color: #005ea5;
  }

  .more-info-button {
    display: flex;
    flex: none;
    font-size: 1.25rem;
    padding-top: 2px;
    transition: all 75ms ease;
    cursor: pointer;
  }

  /* For the scale on hover of group parent */
  :hover .more-info-button {
    transform: scale(1.25);
  }
  .more-info-button.custom-ring {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 1);
  }
</style>
