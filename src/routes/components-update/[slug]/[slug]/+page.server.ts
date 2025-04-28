export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const search = formData.get("search");
    return { search };
  },
};
