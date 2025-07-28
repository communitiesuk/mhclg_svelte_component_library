<script>
  let {
    textContent = undefined,
    buttonType,
    componentNameProp = undefined,
    onClickFunction = undefined,
    noPadding = false,
  } = $props();

  let buttonClass = $derived(
    buttonType === "default"
      ? "govuk-button"
      : buttonType === "secondary"
        ? "govuk-button govuk-button--secondary"
        : buttonType === "warning"
          ? "govuk-button govuk-button--warning"
          : buttonType === "dark background"
            ? "govuk-button govuk-button--inverse"
            : undefined,
  );
</script>

{#if noPadding}
  {#if buttonType === "start"}
    <a
      href={"#"}
      role="button"
      draggable="false"
      class="govuk-button govuk-button--start"
      data-module="govuk-button"
      onclick={onClickFunction}
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
  {:else if buttonType === "disabled"}
    <button
      type="submit"
      disabled
      aria-disabled="true"
      class="govuk-button"
      data-module="govuk-button"
      onclick={onClickFunction}
    >
      {textContent}
    </button>
  {:else if buttonType === "table header"}
    <button type="button" class="text-header" onclick={onClickFunction}>
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
  {:else}
    <button
      type="submit"
      class={buttonClass}
      data-module="govuk-button"
      onclick={onClickFunction}
    >
      {textContent}
    </button>
  {/if}
{:else}
  <div class="p-4">
    {#if buttonType === "start"}
      <a
        href={"#"}
        role="button"
        draggable="false"
        class="govuk-button govuk-button--start"
        data-module="govuk-button"
        onclick={onClickFunction}
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
    {:else if buttonType === "disabled"}
      <button
        type="submit"
        disabled
        aria-disabled="true"
        class="govuk-button"
        data-module="govuk-button"
        onclick={onClickFunction}
      >
        {textContent}
      </button>
    {:else if buttonType === "table header"}
      <button type="button" class="text-header" onclick={onClickFunction}>
        {textContent}
        <svg
          width="22"
          height="22"
          focusable="false"
          aria-hidden="true"
          role="img"
          viewBox="0 0 22 22"
          fill="none"
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
    {:else}
      <button
        type="button"
        class={buttonClass}
        data-module="govuk-button"
        onclick={onClickFunction}
      >
        {textContent}
      </button>
    {/if}
  </div>
{/if}

<style>
  .text-header {
    display: flex;
    color: #005ea5;
  }
</style>
