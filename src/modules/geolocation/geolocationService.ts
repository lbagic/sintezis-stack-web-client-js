const defaultOptions: PositionOptions = {
  maximumAge: 1000 * 60 * 60,
  timeout: 10000,
};

function getCurrentPosition(options?: PositionOptions) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      options ?? defaultOptions
    );
  });
}

function getPermissionStatus() {
  return navigator.permissions.query({ name: "geolocation" });
}

export const geolocationService = {
  getCurrentPosition,
  getPermissionStatus,
};
