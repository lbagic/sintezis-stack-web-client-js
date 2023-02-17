import { Loader } from "@googlemaps/js-api-loader";

export const googleInstance = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
}).load();
