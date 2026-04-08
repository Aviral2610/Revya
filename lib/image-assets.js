const IMAGE_DIMENSIONS = {
  "/images/patient-dashboard-mockup.svg": {
    width: 1200,
    height: 900
  }
};

const DEFAULT_DIMENSIONS = {
  width: 1024,
  height: 1024
};

export function getImageDimensions(src) {
  return IMAGE_DIMENSIONS[src] || DEFAULT_DIMENSIONS;
}
