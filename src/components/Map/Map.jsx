import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { defaultTheme } from './Theme';
import { FaMapMarkerAlt } from 'react-icons/fa';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultOptions = {
  panControl: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  isAdvancedMarkersAvailable: true,

  styles: defaultTheme,
};

const containerStyle = {
  width: '420px',
  height: '220px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  backgroundColor: '#2a324a',
};

export const Map = ({ location }) => {
  const center = {
    lat: location.lat,
    lng: location.long,
  };

  console.log(center);
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={defaultOptions}
      >
        <Marker
          position={center}
          icon={<FaMapMarkerAlt fill="D8D8D8" size={'10em'} />}
        />
      </GoogleMap>
    </LoadScript>
  );
};
