import type { PageServerLoad } from './$types';

export const load = (async () => {
  const hello = 100;

  return { hello };
}) satisfies PageServerLoad;
