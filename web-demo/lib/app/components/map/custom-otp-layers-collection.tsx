import React from 'react';
import OTPVectorSource from './custom-otp-source';
import OTPVectorLayer from './custom-otp-layers';

const OTPVectorLayers = ({ tilejsonUrl, layerNames }) => {
  return (
    <>
      {/* Load the vector source only once */}
      <OTPVectorSource tilejsonUrl={tilejsonUrl} />
      {/* Render an OTPVectorLayer for each layer name */}
      {layerNames.map((name) => (
        <OTPVectorLayer key={name} sourceLayerName={name} />
      ))}
    </>
  );
};

export default OTPVectorLayers;
