export const displayMap = place => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidW5pdmVyc2l0eW1hdGNoZXIiLCJhIjoiY2syZGMyb3llMGU3cjNvcWI4ZXBtenF5NCJ9.l9S9ooBj7yen7PFIlZwddA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/universitymatcher/ck2drvf7e0gww1cmnlsrbpyy1',
    // center: [47.912932, 29.282543],
    // zoom: 7,
    scrollZoom: false
  });

  const bound = new mapboxgl.LngLatBounds();

  //Creat marker
  const el = document.createElement('div');
  el.className = 'marker';

  //  Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(place.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(place.coordinates)
    .setHTML(`<p>Address ${place.address}: ${place.description}</p>`)
    .addTo(map);

  //   Extend map bounds to include current location
  bound.extend(place.coordinates);

  map.addControl(new mapboxgl.NavigationControl());

  map.fitBounds(bound, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
