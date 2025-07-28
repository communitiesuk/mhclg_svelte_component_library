<script lang="ts">
  import SearchAutocomplete from "./SearchAutocomplete.svelte";
  import { capitalise } from "./../../utils/text-string-conversion/textStringConversion";
  import {
    geoNames,
    geoCodesLookup,
    essGeocodes,
  } from "./../../utils/area-search/geoConfig";
  import defaultPlacesData from "./../../data/places.json";

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
    customTypeLookup?: Record<
      string,
      { label: string; plural: string; childGroup?: boolean }
    >;
    customEssGeocodes?: string[];
    customGetTypeLabel?: (type: string) => string;

    // Postcode API configuration
    postcodeApiUrl?: string;
    postcodeApiKey?: string; // Key in response containing suggestions
    postcodeApiProperty?: string; // Property to extract from API objects
    postcodeApiPathBased?: boolean; // Whether the API uses path-based URLs

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
    customTypeLookup = undefined,
    customEssGeocodes = undefined,
    customGetTypeLabel = undefined,
    postcodeApiUrl = "https://api.postcodes.io/postcodes",
    postcodeApiKey = "result",
    postcodeApiProperty = "postcode",
    postcodeApiPathBased = false,
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
  const typeLookup =
    customTypeLookup && Object.keys(customTypeLookup).length > 0
      ? customTypeLookup
      : geoNames;
  const essGeocodesArray =
    customEssGeocodes && customEssGeocodes.length > 0
      ? customEssGeocodes
      : essGeocodes;

  // --- Helper Functions ---
  const getTypeLabel = (type: string) => {
    // If custom function is provided and returns a non-null value, use it
    if (customGetTypeLabel) {
      const customLabel = customGetTypeLabel(type);
      if (customLabel !== null && customLabel !== undefined) {
        return customLabel;
      }
    }
    // Otherwise use lookup table (custom or default)
    return typeLookup[type]
      ? typeLookup[type].label
      : geoCodesLookup[type]?.label || type;
  };

  // Default source selector: use API for postcode-like inputs, options for area names
  const defaultSourceSelector = (query: string, options: Suggestion[]) => {
    // If input has 3+ chars and contains a digit, likely a postcode
    return query.length >= 3 && /\d/.test(query) ? "api" : "options";
  };

  const sourceSelector = (query: string, options: Suggestion[]) => {
    // If custom function is provided and returns a non-null value, use it
    if (customSourceSelector) {
      const customResult = customSourceSelector(query, options);
      if (customResult !== null && customResult !== undefined) {
        return customResult;
      }
    }
    // Otherwise use default selector
    return defaultSourceSelector(query, options);
  };

  // --- Process Places Data ---
  const places = $derived.by(() => {
    // Use custom data if provided and not empty, otherwise use default
    let placesData =
      customPlacesData && customPlacesData.length > 0
        ? customPlacesData
        : defaultPlacesData;

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
    pathBasedApi: postcodeApiPathBased,
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
