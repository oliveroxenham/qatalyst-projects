declare module '@mapbox/togeojson' {
  /**
   * Convert a KML document to GeoJSON.
   * @param doc - An XML DOM Document containing the KML
   * @returns a GeoJSON object
   */
  export function kml(doc: Document): any;

  /**
   * Convert a GPX document to GeoJSON.
   * @param doc - An XML DOM Document containing the GPX
   * @returns a GeoJSON object
   */
  export function gpx(doc: Document): any;

  /**
   * Convert a TCX document to GeoJSON.
   * @param doc - An XML DOM Document containing the TCX
   * @returns a GeoJSON object
   */
  export function tcx(doc: Document): any;

  const toGeoJSON: {
    kml: typeof kml;
    gpx: typeof gpx;
    tcx: typeof tcx;
  };

  export default toGeoJSON;
}