export const geolocationService = {
  getCurrentPosition(options?: PositionOptions) {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        options ?? {
          maximumAge: 1000 * 60 * 60,
          timeout: 7000,
        }
      );
    });
  },
  getPermissionStatus() {
    return navigator.permissions.query({ name: "geolocation" });
  },
};
