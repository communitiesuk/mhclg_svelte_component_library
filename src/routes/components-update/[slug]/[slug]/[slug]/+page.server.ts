/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const data = [
    { slug: "data-vis", subslug: "line-chart", subsubslup: "line" },
  ]; // Replace with your data fetching logic
  return data.map((item) => ({
    slug: item.slug,
    subslug: item.subslug,
    subsubslug: item.subsubslup,
  }));
}
