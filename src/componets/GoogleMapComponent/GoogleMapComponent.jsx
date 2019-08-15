import React from 'react';
import {compose, withProps, withHandlers} from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow,
} from 'react-google-maps';

const GoogleMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDFIeLcSXFoj1sjauT3e9I3V2p0P_hHAgk',
    loadingElement: <div style={{height: '100%'}}/>,
    containerElement: <div style={{height: '100%'}}/>,
    mapElement: <div style={{height: '100%'}}/>,
  }),
  withHandlers(() => {
    let refs = [];

    return {
      markerRef: () => (ref) => {
        if (ref) {
          let id = ref.props.id;
          refs[id] = ref;
        }
      },

      onMarkerDrag: props => (key) => {
        let lat = refs[key].getPosition().lat();
        let lng = refs[key].getPosition().lng();
        props.changeCoordinates(key, lat, lng);
      },

      onMarkerClick: props => (key) => {
        props.onMarkerClick(key);
      },

      onCloseInfoWindow: props => (key) => {
        props.onCloseInfoWindow(key);
      },
    }
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {

  let pathCoordinates = [];
  for (let i = 0; i < props.correspondCoordinates.length; i += 1) {
    pathCoordinates[i] = {
      lat: props.correspondCoordinates[i].coordinates.lat,
      lng: props.correspondCoordinates[i].coordinates.lng,
    }
  }

  console.log(props);

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{lat: 55.751244, lng: 37.618423}}
    >
      {props.correspondCoordinates.map((marker) => {
        return (
          <Marker
            position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}}
            key={marker.key}
            id={marker.key}
            draggable={true}
            ref={props.markerRef}
            onDrag={() => props.onMarkerDrag(marker.key)}
            onClick={() => props.onMarkerClick(marker.key)}
          > { marker.open && <InfoWindow onCloseClick={() => props.onCloseInfoWindow(marker.key)}>
              <div>{marker.text}</div>
            </InfoWindow>}
          </Marker>);
      })}
      <Polyline
        path={pathCoordinates}
        geodesic={true}
        options={{
          strokeColor: "#ff2527",
          strokeOpacity: 0.75,
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
});

export default GoogleMapComponent;
