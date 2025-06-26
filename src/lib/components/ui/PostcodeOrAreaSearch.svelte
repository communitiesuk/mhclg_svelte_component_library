<script lang="ts">
  import SearchAutocomplete from "./SearchAutocomplete.svelte";
  import { capitalise } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import {
    geoNames,
    geoCodesLookup,
    essGeocodes,
  } from "$lib/utils/area-search/geoConfig";
  import defaultPlacesData from "$lib/data/places.json";

  // --- Define Types ---
  type SuggestionObject = { label: string; value: any; [key: string]: any };
  type Suggestion = string | SuggestionObject;

  type Place = SuggestionObject & {
    areacd: string;
    areanm: string;
    parentcd?: string;
    group?: string;
  };

  type Props = {
    // Data source configuration
    customPlacesData?: any[]; // Custom places data (JSON format: [{areacd, areanm, parentcd}])
    essOnly?: boolean; // Whether to filter to essential geocodes only

    // Custom lookup functions/data (for flexibility)
    customGeoNames?: Record<
      string,
      { label: string; plural: string; childGroup?: boolean }
    >;
    customGeoCodesLookup?: Record<string, { label: string; plural?: string }>;
    customEssGeocodes?: string[];
    customGetTypeLabel?: (type: string) => string;

    // Postcode API configuration
    postcodeApiUrl?: string;
    postcodeApiKey?: string; // Key in response containing suggestions
    postcodeApiProperty?: string; // Property to extract from API objects

    // Source selection logic
    customSourceSelector?: (
      query: string,
      options: Suggestion[],
    ) => "api" | "options";

    // Pass-through props to SearchAutocomplete
    selectedValue?: any;
    label_text?: string;
    button_text?: string;
    name?: string;
    placeholder?: string;
    hint?: string;
    size?: "large" | "";
    on_govuk_blue?: boolean;
    homepage?: boolean;
    minLength?: number;
    required?: boolean;
    [key: string]: any; // Allow other props
  };

  let {
    customPlacesData = undefined,
    essOnly = false,
    customGeoNames = undefined,
    customGeoCodesLookup = undefined,
    customEssGeocodes = undefined,
    customGetTypeLabel = undefined,
    postcodeApiUrl = "https://api.postcodes.io/postcodes",
    postcodeApiKey = "result",
    postcodeApiProperty = "postcode",
    customSourceSelector = undefined,
    selectedValue = $bindable(),
    label_text = "Search for a postcode or area",
    button_text = "Search",
    name = "location",
    placeholder = "e.g. SW1A 1AA or Westminster",
    hint = "Enter a UK postcode or area name",
    size = "",
    on_govuk_blue = false,
    homepage = false,
    minLength = 2,
    required = false,
    ...restProps
  }: Props = $props();

  // --- Use custom lookups or defaults ---
  const geoNamesLookup = customGeoNames || geoNames;
  const geoCodesLookupTable = customGeoCodesLookup || geoCodesLookup;
  const essGeocodesArray = customEssGeocodes || essGeocodes;

  // --- Helper Functions ---
  const getTypeLabel =
    customGetTypeLabel ||
    ((type: string) =>
      geoNamesLookup[type]
        ? geoNamesLookup[type].label
        : geoCodesLookupTable[type]?.label || type);

  // Default source selector: use API for postcode-like inputs, options for area names
  const defaultSourceSelector = (query: string, options: Suggestion[]) => {
    // If input has 3+ chars and contains a digit, likely a postcode
    return query.length >= 3 && /\d/.test(query) ? "api" : "options";
  };

  const sourceSelector = customSourceSelector || defaultSourceSelector;

  // --- Process Places Data ---
  const places = $derived.by(() => {
    // Use custom data if provided, otherwise use default
    let placesData = customPlacesData || defaultPlacesData;

    // Filter to essential geocodes if requested
    if (essOnly) {
      placesData = placesData.filter((p: any) =>
        essGeocodesArray.includes(p.areacd.slice(0, 3)),
      );
    }

    // Sort by area name
    const sortedData = [...placesData].sort((a: any, b: any) =>
      a.areanm.localeCompare(b.areanm),
    );

    // Create lookup for parent relationships
    const lookup: Record<string, any> = {};
    for (const p of sortedData) lookup[p.areacd] = p;

    // Add group information and format for autocomplete
    const processedPlaces: Place[] = sortedData.map((p: any) => {
      const type = p.areacd.slice(0, 3);
      const group =
        type === "K02"
          ? ""
          : p.parentcd && lookup[p.parentcd]
            ? `${capitalise(getTypeLabel(type))} in ${lookup[p.parentcd].areanm}`
            : capitalise(getTypeLabel(type));

      return {
        areacd: p.areacd,
        areanm: p.areanm,
        parentcd: p.parentcd,
        group,
        label: p.areanm,
        value: p.areacd,
      };
    });

    return processedPlaces;
  });

  // --- Autocomplete Configuration ---
  const autocompleteProps = $derived({
    options: places,
    source_url: postcodeApiUrl,
    source_key: postcodeApiKey,
    source_property: postcodeApiProperty,
    groupKey: "group",
    sourceSelector,
    label_text,
    button_text,
    name,
    placeholder,
    hint,
    size,
    on_govuk_blue,
    homepage,
    minLength,
    required,
    ...restProps,
  });
</script>

<SearchAutocomplete {...autocompleteProps} bind:selectedValue />
