import { getValueFromParametersArray } from '../data-transformations/getValueFromParametersArray.js';

export function trackVisibleParameters(
  parametersSourceArray,
  parametersValuesArray
) {
  return parametersSourceArray.map((el) =>
    !('visible' in el)
      ? true
      : typeof el.visible === 'boolean'
        ? el.visible
        : Array.isArray(el.visible)
          ? el.visible
              .map(
                (elm) =>
                  getValueFromParametersArray(
                    parametersSourceArray,
                    parametersValuesArray,
                    elm.name
                  ) === elm.value
              )
              .every((elm) => elm === true)
          : getValueFromParametersArray(
              parametersSourceArray,
              parametersValuesArray,
              el.visible.name
            ) === el.visible.value
  );
}
