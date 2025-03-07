import React, { useState, useEffect, useRef } from 'react';
import { Source, Layer, Popup, useMap } from 'react-map-gl';
import ReactDOMServer from 'react-dom/server';
import { ClassicModeIcon } from '@opentripplanner/icons';

// --- 1. Define default configuration for layers ---
const LAYER_CONFIG = {
  stops: {
    type: 'symbol',
    filter: [
      'all',
      ['has', 'routes'],
      [
        'case',
        ['==', ['get', 'routes'], '[]'],
        false,
        ['>', ['length', ['get', 'routes']], 0]
      ]
    ],
    layout: {
      'icon-image': [
        'match',
        ['get', 'type'],
        'BUS',
        'bus-icon',
        'RAIL',
        'rail-icon',
        'default-icon'
      ],
      'icon-size': [
        'match',
        ['get', 'type'],
        'BUS',
        0.1,
        'RAIL',
        0.15,
        0.1
      ],
      'icon-allow-overlap': true,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.0],
      'text-size': 12,
      'text-anchor': 'top'
    },
    minzoom: 14,
    maxzoom: 20,
    // Popup renderer for stops
    popupRenderer: (properties) => {
      let routesCount = 0;
      try {
        const parsedRoutes =
          typeof properties.routes === 'string'
            ? JSON.parse(properties.routes)
            : properties.routes;
        if (Array.isArray(parsedRoutes)) routesCount = parsedRoutes.length;
      } catch (err) {
        routesCount = 0;
      }
      return (
        <div>
          <div style={{ fontSize: '1.1em', marginBottom: '0.3em' }}>
            <strong>{properties.name}</strong>
          </div>
          {properties.platform && (
            <div>
              <strong>Platform:</strong> {properties.platform}
            </div>
          )}
          {properties.type && (
            <div>
              <strong>Type:</strong>{' '}
              {properties.type === 'BUS'
                ? 'Bus'
                : properties.type === 'RAIL'
                ? 'Train'
                : properties.type}
            </div>
          )}
          <div>
            <strong>Routes:</strong> {routesCount} route
            {routesCount !== 1 ? 's' : ''}
          </div>
        </div>
      );
    }
  },
  // Additional layer configurations (e.g. rentalVehicles) can be added here.
};

  
// --- 2. Generic OTPVectorLayer Component ---
const OTPVectorLayer = ({
  visible = true,
  tilejsonUrl,
  sourceLayerName,
  layerStyle = {}
}) => {
    
  const map = useMap().default;
  const [hoverInfo, setHoverInfo] = useState(null);
  const [stickyInfo, setStickyInfo] = useState(null);
  // For stops, track the parentStation for highlighting.
  const [highlightParentStation, setHighlightParentStation] = useState(null);
  const stickyInfoRef = useRef(null);
  useEffect(() => {
    stickyInfoRef.current = stickyInfo;
  }, [stickyInfo]);

  // Merge defaults for the given layer from configuration and include required keys.
  const defaultConfig = LAYER_CONFIG[sourceLayerName] || {};
  const mergedConfig = {
    source: 'otp-source',
    'source-layer': sourceLayerName,
    ...defaultConfig,
    ...layerStyle
  };

  console.log("merged config", mergedConfig);

  // --- 3. Load custom icons for stops (if needed) ---
  useEffect(() => {
    if (sourceLayerName !== 'stops') return;
    if (!map) return;
    const mapInstance = map.getMap();
    if (!mapInstance) return;
    // Bus icon: render ClassicModeIcon with mode="bus"
    if (!mapInstance.hasImage('bus-icon')) {
      const busSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="bus" />
      );
      const busDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        busSvgString
      )}`;
      const busIcon = new Image();
      busIcon.onload = () => {
        if (!mapInstance.hasImage('bus-icon')) {
          mapInstance.addImage('bus-icon', busIcon);
        }
      };
      busIcon.src = busDataUrl;
    }
    // Train icon: render ClassicModeIcon with mode="rail"
    if (!mapInstance.hasImage('rail-icon')) {
      const tramSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="rail" />
      );
      const tramDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        tramSvgString
      )}`;
      const railIcon = new Image();
      railIcon.onload = () => {
        if (!mapInstance.hasImage('rail-icon')) {
          mapInstance.addImage('rail-icon', railIcon);
        }
      };
      railIcon.src = tramDataUrl;
    }
  }, [map, sourceLayerName]);

  // --- 4. Attach event listeners for hover/click ---
  useEffect(() => {
    if (!map) return;
    const mapInstance = map.getMap();
    if (!mapInstance) return;
    const layerId = `otp-${sourceLayerName}`;
    const onMouseEnter = (e) => {
      mapInstance.getCanvas().style.cursor = 'pointer';
      if (!stickyInfoRef.current && e.features && e.features.length) {
        const feature = e.features[0];
        setHoverInfo({
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          properties: feature.properties
        });
        if (feature.properties.parentStation) {
          setHighlightParentStation(feature.properties.parentStation);
        }
      }
    };
    const onMouseLeave = () => {
      mapInstance.getCanvas().style.cursor = '';
      setHoverInfo(null);
    };
    const onClick = (e) => {
      setHoverInfo(null);
      if (e.features && e.features.length) {
        const feature = e.features[0];
        setStickyInfo({
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          properties: feature.properties
        });
        if (feature.properties.parentStation) {
          setHighlightParentStation(feature.properties.parentStation);
        }
      }
    };
    if (mapInstance.getLayer(layerId)) {
      mapInstance.on('mouseenter', layerId, onMouseEnter);
      mapInstance.on('mouseleave', layerId, onMouseLeave);
      mapInstance.on('click', layerId, onClick);
    }
    const styleDataHandler = () => {
      if (mapInstance.getLayer(layerId)) {
        mapInstance.off('mouseenter', layerId, onMouseEnter);
        mapInstance.off('mouseleave', layerId, onMouseLeave);
        mapInstance.off('click', layerId, onClick);
        mapInstance.on('mouseenter', layerId, onMouseEnter);
        mapInstance.on('mouseleave', layerId, onMouseLeave);
        mapInstance.on('click', layerId, onClick);
      }
    };
    mapInstance.on('styledata', styleDataHandler);
    return () => {
      if (mapInstance.getLayer(layerId)) {
        mapInstance.off('mouseenter', layerId, onMouseEnter);
        mapInstance.off('mouseleave', layerId, onMouseLeave);
        mapInstance.off('click', layerId, onClick);
      }
      mapInstance.off('styledata', styleDataHandler);
    };
  }, [map, sourceLayerName]);

  const onStickyClose = () => {
    setStickyInfo(null);
    setHighlightParentStation(null);
  };

  const renderPopupContent = (properties) => {
    if (mergedConfig.popupRenderer) {
      return mergedConfig.popupRenderer(properties);
    }
    return <pre>{JSON.stringify(properties, null, 2)}</pre>;
  };

  // --- 5. Render component ---
  if (!visible) return null;
  return (
    <>
      <Source id="otp-source" type="vector" url={tilejsonUrl} />
      <Layer id={`otp-${sourceLayerName}`} {...mergedConfig} />
      {/* Extra highlight layers for stops */}
      {sourceLayerName === 'stops' && highlightParentStation && (
        <>
          <Layer
            id="otp-stops-highlight"
            type="circle"
            source="otp-source"
            {...{ 'source-layer': sourceLayerName }}
            layout={{}}
            paint={{
              'circle-radius': 20,
              'circle-color': '#0000FF',
              'circle-opacity': 0.2
            }}
            filter={[
              'all',
              ['==', ['get', 'parentStation'], highlightParentStation],
              ['has', 'routes'],
              [
                'case',
                ['==', ['get', 'routes'], '[]'],
                false,
                ['>', ['length', ['get', 'routes']], 0]
              ]
            ]}
            minzoom={14}
            maxzoom={20}
          />
          <Layer
            id="otp-stops-platforms"
            type="symbol"
            source="otp-source"
            {...{ 'source-layer': sourceLayerName }}
            beforeId={`otp-${sourceLayerName}`}
            layout={{
              'text-field': ['get', 'platform'],
              'text-size': 12,
              'text-offset': [0, -1.5],
              'text-anchor': 'bottom',
              'text-allow-overlap': true
            }}
            paint={{
              'text-color': '#000000',
              'text-halo-color': '#ffffff',
              'text-halo-width': 1
            }}
            filter={[
              'all',
              ['==', ['get', 'parentStation'], highlightParentStation],
              ['has', 'platform']
            ]}
            minzoom={14}
            maxzoom={20}
          />
        </>
      )}
      {hoverInfo && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          offsetTop={-10}
          anchor="top"
        >
          {renderPopupContent(hoverInfo.properties)}
        </Popup>
      )}
      {stickyInfo && (
        <Popup
          longitude={stickyInfo.longitude}
          latitude={stickyInfo.latitude}
          closeButton={true}
          onClose={onStickyClose}
          offsetTop={-10}
          anchor="top"
        >
          {renderPopupContent(stickyInfo.properties)}
          <br />
          <em>Click outside to dismiss.</em>
        </Popup>
      )}
    </>
  );
};

export default OTPVectorLayer;
