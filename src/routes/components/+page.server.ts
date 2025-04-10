// This file is needed for SSR but doesn't need to do anything special
// since the code in +page.svelte directly loads wrappers using import.meta.glob
export async function load() {
  return {};
}
