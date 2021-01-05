/* eslint-disable no-undef */
import Businesses from './Businesses';

const mapbox = {
  load: () => {
    // get user location
    const getLocation = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            resolve({ lat: coords.latitude, lon: coords.longitude });
          },
          (error) => {
            reject(new Error(getErrorByCode(error.code)));
          },
        );
      } else reject(new Error('No location was found.'));
    });
    // after location is received setup mapbox
    getLocation.then(async (location) => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia29iZWRldiIsImEiOiJja2pobGNyMnQ5OXV5MnlsYjNlM2ZsaHdsIn0._0AaGmn1b5SjwlwubRFB2g';
      // add map
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lon, location.lat],
        zoom: 14,
      });
      // add user dot
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );

      // get all registered businesses
      await Businesses.locationRegistered()
        .then((results) => {
          const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
          // for each business object create a marker
          // eslint-disable-next-line no-restricted-syntax
          for (const [, value] of Object.entries(results)) {
            mapboxClient.geocoding
              .forwardGeocode({
                query: `${value.location}, Ghent`,
                autocomplete: false,
                limit: 1,
              })
              .send()
              // eslint-disable-next-line no-loop-func
              .then((response) => {
                if (
                  response
                    && response.body
                    && response.body.features
                    && response.body.features.length
                ) {
                  const feature = response.body.features[0];
                  new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
                }
              });
          }
        });
    });
  },
};

export default mapbox;
