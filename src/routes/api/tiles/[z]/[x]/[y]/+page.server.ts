// import { json } from "@sveltejs/kit";
import { PRIVATE_OS_API_KEY } from "$env/static/private";

// The base URL for the API
const BASE_URL = "https://api.os.uk/maps/raster/v1/zxy/Light_3857";

export async function load({ params }) {
  const { z, x, y } = params;
  //   console.log(params);
  // Define your API key here (you could also use environment variables for added security)
  const apiKey = PRIVATE_OS_API_KEY;

  // Construct the URL to fetch from the external API
  const apiUrl = `${BASE_URL}/${z}/${x}/${y}.png?key=${apiKey}`;
  console.log(apiUrl);
  //   // Fetch the tile image from the external API
  const response = await fetch(apiUrl);

  //   // If the request fails, return an error
  //   if (!response.ok) {
  //     console.log("fail");
  //     return { fail: "fail" };
  //   } else {
  //     console.log("success");
  //   }
  //   console.log(response);
  // return { response: response };
  //   // Return the image as a response
  const imageBuffer = await response.arrayBuffer().then(() => {
    return { imageBuffer };
  });
}
