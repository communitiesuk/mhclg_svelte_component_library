import {
  PRIVATE_OS_API_KEY,
  PRIVATE_MAPTILER_API_KEY,
} from "$env/static/private";

// export async function load() {
//   console.log(OS_API_KEY, MAPTILER_API_KEY, "hi");
// }
export function load() {
  return { PRIVATE_OS_API_KEY, PRIVATE_MAPTILER_API_KEY };
}
