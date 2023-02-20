import { googleInstance } from "@/services/google/goolgeInstance";

export namespace GoogleApi {
  export type PlacePrediction = google.maps.places.AutocompletePrediction;
  export type Geocode = google.maps.GeocoderResult;
}

export const googleApiService = {
  async getPlacePredictions(request: google.maps.places.AutocompletionRequest) {
    const instance = await googleInstance;
    const service = new instance.maps.places.AutocompleteService();
    return service.getPlacePredictions(request);
  },
  async geocode(request: google.maps.GeocoderRequest) {
    const instance = await googleInstance;
    const geocoder = new instance.maps.Geocoder();
    return geocoder.geocode(request);
  },
};
