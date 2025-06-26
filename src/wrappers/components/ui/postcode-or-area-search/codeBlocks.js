export const basicExample = `<script>
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  
  let selectedValue = $state("");
</script>

<PostcodeOrAreaSearch bind:selectedValue />

{#if selectedValue}
  <p>Selected: {selectedValue}</p>
{/if}`;

export const essentialOnly = `<PostcodeOrAreaSearch 
  essOnly={true}
  label_text="Search for a postcode or major area"
  hint="Searches major administrative areas only"
  bind:selectedValue 
/>`;

export const customLabels = `<PostcodeOrAreaSearch 
  label_text="Where do you live?"
  button_text="Find location"
  placeholder="Type your postcode or town name"
  hint="We'll use this to find services in your area"
  name="user_location"
  bind:selectedValue 
/>`;

export const largeSize = `<PostcodeOrAreaSearch 
  size="large"
  label_text="Find your constituency"
  placeholder="Enter your postcode or area name"
  bind:selectedValue 
/>`;

export const onBlueBackground = `<div style="background-color: #1d70b8; padding: 2rem;">
  <PostcodeOrAreaSearch 
    on_govuk_blue={true}
    label_text="Search locations"
    bind:selectedValue 
  />
</div>`;

export const requiredField = `<form>
  <PostcodeOrAreaSearch 
    required={true}
    label_text="Your location (required)"
    name="required_location"
    bind:selectedValue 
  />
  <button class="govuk-button" type="submit">
    Submit
  </button>
</form>`;

export const customSourceSelector = `<script>
  const customSourceFunction = (query, options) => {
    // Use API for inputs that look like postcodes (contain digits and spaces)
    if (/[0-9]/.test(query) && query.includes(' ')) {
      return 'api';
    }
    // Use local options for everything else
    return 'options';
  };
</script>

<PostcodeOrAreaSearch 
  customSourceSelector={customSourceFunction}
  label_text="Location search (custom logic)"
  hint="API used only for full postcodes (with space), otherwise local search"
  bind:selectedValue 
/>`;
