import React from 'react';
import { Source } from 'react-map-gl';

const OTPVectorSource = ({ tilejsonUrl }) => {
  return <Source id="otp-source" type="vector" url={tilejsonUrl} />;
};

export default OTPVectorSource;
