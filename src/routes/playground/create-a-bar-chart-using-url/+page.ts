import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params, url }) => {
  let urlParams = {};

  for (const p of url.searchParams) {
    urlParams[p[0]] = p[1];
  }

  let urlParamsString = url.searchParams.toString();
  return {
    urlParams,
    urlParamsString,
    url,
  };
};
