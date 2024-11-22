import { base } from '$app/paths';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const jsonData = await (await event.fetch(`${base}/data/test.json`)).json();

  console.log(jsonData);

  return {
    jsonData,
  };
};
