import { googleInstance } from "@/services/google/goolgeInstance";
import { watchOnce, type MaybeRef } from "@vueuse/shared";
import { isRef, onMounted, ref, watchEffect, type Ref } from "vue";

export namespace GoogleMap {
  export type Map = google.maps.Map;
  export type MapOptions = google.maps.MapOptions;
  export type Marker = google.maps.Marker;
  export type MarkerOptions = google.maps.MarkerOptions;
  export type InfoWindow = google.maps.InfoWindow;
  export type InfoWindowOptions = google.maps.InfoWindowOptions;
}

type GoogleMapConfig = {
  mapRef: Ref<HTMLDivElement | undefined>;
  mapOptions?: MaybeRef<GoogleMap.MapOptions>;
};

const defaultMapOptions: GoogleMap.MapOptions = {
  zoom: 7,
  center: { lat: 0, lng: 0 },
};

export function useGoogleMap(config: GoogleMapConfig) {
  const map = ref<GoogleMap.Map>();
  const mapOptions = isRef(config.mapOptions)
    ? config.mapOptions
    : ref(config.mapOptions ?? defaultMapOptions);
  watchEffect(() => map.value?.setOptions(mapOptions.value));

  function createMapOptions(options: GoogleMap.MapOptions) {
    mapOptions.value = options;
    return mapOptions;
  }

  onMounted(async () => {
    if (!config.mapRef.value) throw new Error("Can't mount google map.");
    const instance = await googleInstance;
    map.value = new instance.maps.Map(config.mapRef.value);
  });

  return { marker: useMarkers(map), createMapOptions };
}

function useMarkers(map: Ref<GoogleMap.Map | undefined>) {
  type Marker = GoogleMap.Marker;
  type MarkerOptions = GoogleMap.MarkerOptions;
  type InfoWindow = GoogleMap.InfoWindow;
  type InfoWindowOptions = GoogleMap.InfoWindowOptions;

  const markers = new Map<string, Marker>();
  const infoWindows = new Map<string, InfoWindow>();

  const setMap = (marker?: Marker) => map.value && marker?.setMap(map.value);
  const unsetMap = (marker?: Marker) => marker?.setMap(null);

  const controller = {
    set: async (
      key: string,
      options: { marker: MarkerOptions; infoWindow?: InfoWindowOptions }
    ) => {
      const marker = await controller.setMarker(key, options.marker);
      if (options.infoWindow) controller.setInfo(key, options.infoWindow);
      return marker;
    },
    setMarker: async (key: string, options: MarkerOptions) => {
      let marker = markers.get(key);
      if (marker) marker.setOptions(options);
      else {
        const { Marker } = (await googleInstance).maps;
        marker = new Marker(options);
        markers.set(key, marker);

        if (map.value) setMap(marker);
        else watchOnce(map, () => setMap(marker));
      }
      return marker;
    },
    setInfo: async (key: string, options: InfoWindowOptions) => {
      const marker = markers.get(key);
      if (!marker) throw new Error(`Can't set info until marker is created.`);

      let info = infoWindows.get(key);
      if (info) info.setOptions(options);
      else {
        const { InfoWindow } = (await googleInstance).maps;
        info = new InfoWindow(options);
        infoWindows.set(key, info);
        let isShown = false;

        marker.addListener("click", () => {
          if (isShown) info?.close();
          else info?.open({ anchor: marker, map: map.value });
          isShown = !isShown;
        });
      }
    },
    show: (key: string) => setMap(markers.get(key)),
    showAll: () => [...markers.values()].forEach(setMap),
    hide: (key: string) => unsetMap(markers.get(key)),
    hideAll: () => [...markers.values()].forEach((el) => unsetMap(el)),
    delete: (key: string) => {
      controller.hide(key);
      markers.delete(key);
    },
    deleteAll: () => {
      controller.hideAll();
      markers.clear();
    },
    get: (key: string) => markers.get(key),
    getAll: () => [...markers.values()],
  };

  return controller;
}
