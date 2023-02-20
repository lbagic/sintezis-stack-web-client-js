import { googleInstance } from "@/services/google/goolgeInstance";
import { watchOnce, type MaybeRef } from "@vueuse/shared";
import { isRef, onMounted, ref, watchEffect, type Ref } from "vue";

export namespace GoogleMap {
  export type Map = google.maps.Map;
  export type MapOptions = google.maps.MapOptions;
  export type Marker = google.maps.Marker;
  export type MarkerOptions = google.maps.MarkerOptions;
  export type InfoWindow = google.maps.InfoWindow & { isShown?: boolean };
  export type InfoWindowOptions = google.maps.InfoWindowOptions & {
    isShown?: boolean;
  };
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

  const setMarkerMap = (marker: Marker) =>
    map.value && marker.setMap(map.value);
  const unsetMarkerMap = (marker: Marker) => marker.setMap(null);
  const openInfoWindow = (info: InfoWindow, marker: Marker) => {
    info.isShown = true;
    info.open({ map: map.value, anchor: marker });
  };
  const closeInfoWindow = (info: InfoWindow) => {
    info.isShown = false;
    info.close();
  };

  const controller = {
    set: async (
      key: string,
      options: { marker: MarkerOptions; infoWindow?: InfoWindowOptions }
    ) => {
      const marker = await controller.setMarker(key, options.marker);
      if (options.infoWindow)
        await controller.setInfoWindow(key, options.infoWindow);
      return marker;
    },
    setMarker: async (key: string, options: MarkerOptions) => {
      let marker = markers.get(key);
      if (marker) marker.setOptions(options);
      else {
        const { Marker } = (await googleInstance).maps;
        marker = new Marker(options);
        markers.set(key, marker);

        if (map.value) setMarkerMap(marker);
        // else watchOnce(map, () => marker && setMarkerMap(marker));
        else
          await new Promise((resolve) => {
            watchOnce(map, () => resolve(marker && setMarkerMap(marker)));
          });
      }
      return marker;
    },
    setInfoWindow: async (key: string, options: InfoWindowOptions) => {
      const marker = markers.get(key);
      if (!marker) throw new Error(`Can't set info until marker is created.`);

      let info = infoWindows.get(key);
      if (info) info.setOptions(options);
      else {
        const { InfoWindow } = (await googleInstance).maps;
        if (!Object.hasOwn(options, "isShown")) options.isShown = false;
        info = new InfoWindow(options) as GoogleMap.InfoWindow;
        infoWindows.set(key, info);

        marker.addListener("click", () => {
          if (!info) return;
          if (info.isShown) info.close();
          else info.open({ anchor: marker, map: map.value });
          info.isShown = !info.isShown;
        });
      }
      if (info.isShown) openInfoWindow(info, marker);
      else closeInfoWindow(info);
    },
    show: (key: string) => {
      controller.showMarker(key);
      controller.showInfoWindow(key);
    },
    showMarker: (key: string) => {
      const marker = markers.get(key);
      if (marker) setMarkerMap(marker);
    },
    showInfoWindow: (key: string) => {
      const marker = markers.get(key);
      const infoWindow = infoWindows.get(key);
      if (infoWindow && marker) openInfoWindow(infoWindow, marker);
    },
    showAll: () => [...markers.keys()].forEach(controller.show),
    showAllMarkers: () => [...markers.keys()].forEach(controller.showMarker),
    showAllInfoWindows: () =>
      [...infoWindows.keys()].forEach(controller.showInfoWindow),
    hide: (key: string) => {
      controller.hideMarker(key);
      controller.hideInfoWindow(key);
    },
    hideMarker: (key: string) => {
      const marker = markers.get(key);
      if (marker) unsetMarkerMap(marker);
    },
    hideInfoWindow: (key: string) => {
      const infoWindow = infoWindows.get(key);
      if (infoWindow) closeInfoWindow(infoWindow);
    },
    hideAll: () => {
      controller.hideAllMarkers();
      controller.hideAllInfoWindows();
    },
    hideAllMarkers: () => {
      [...markers.keys()].forEach(controller.hideMarker);
    },
    hideAllInfoWindows: () => {
      [...infoWindows.keys()].forEach(controller.hideInfoWindow);
    },
    delete: (key: string) => {
      controller.deleteMarker(key);
      controller.deleteInfoWindow(key);
    },
    deleteMarker: (key: string) => {
      controller.hideMarker(key);
      markers.delete(key);
    },
    deleteInfoWindow: (key: string) => {
      controller.hideInfoWindow(key);
      infoWindows.delete(key);
    },
    deleteAll: () => {
      controller.deleteAllMarkers();
      controller.deleteAllInfoWindows();
    },
    deleteAllMarkers: () => {
      [...markers.keys()].forEach(controller.deleteMarker);
    },
    deleteAllInfoWindows: () => {
      [...infoWindows.keys()].forEach(controller.deleteInfoWindow);
    },
    getMarker: (key: string) => markers.get(key),
    getAllMarkers: () => [...markers.values()],
    getInfoWindow: (key: string) => infoWindows.get(key),
    getAllInfoWindows: () => [...infoWindows.values()],
  };

  return controller;
}
