import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";
import type { LayoutServerLoad } from "./$types.js";
import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";

// Helper function to format directory name into display name

export const load: LayoutServerLoad = async () => {
  // In development, or if the cache is not populated yet in production, generate the tree.
  // In production, if the cache is populated, return it.

  throw redirect(302, "https://mhclg-svelte-component-library.netlify.app/");
};
