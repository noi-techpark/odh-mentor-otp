import React, { useState, useEffect, useRef } from 'react'
import { Layer, Popup, useMap } from 'react-map-gl'
import ReactDOMServer from 'react-dom/server'
import { ClassicModeIcon } from '@opentripplanner/icons'
import { Parking } from '@styled-icons/fa-solid'
import { filter } from 'lodash'


// --- Default configuration for layers ---
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
      'icon-size': ['match', ['get', 'type'], 'BUS', 0.1, 'RAIL', 0.15, 0.1],
      'icon-allow-overlap': false,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.0],
      'text-size': 12,
      'text-anchor': 'top'
    },
    minzoom: 17,
    maxzoom: 20,
    popupRenderer: (properties) => {
      let routesCount = 0
      try {
        const parsedRoutes =
          typeof properties.routes === 'string'
            ? JSON.parse(properties.routes)
            : properties.routes
        if (Array.isArray(parsedRoutes)) routesCount = parsedRoutes.length
      } catch (err) {
        routesCount = 0
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
      )
    }
  },
  areaStops: {
    // Flex zones – using a circle to indicate an area
    type: 'circle',
    paint: {
      'circle-radius': 8,
      'circle-color': '#FFA500',
      'circle-opacity': 0.8
    },
    minzoom: 14,
    maxzoom: 20
    /*popupRenderer: (properties) => {
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
          <div>
            <strong>Routes:</strong> {routesCount} route
            {routesCount !== 1 ? 's' : ''}
          </div>
        </div>
      );
    }*/
  },
  stations: {
    type: 'symbol',
    filter: [
      'all',
      ['has', 'routes'],
      [
        'case',
        ['==', ['get', 'routes'], '[]'],
        false,
        ['>', ['length', ['get', 'routes']], 0]
      ],
      [">=", ["zoom"],
        ["match", ["get", "type"],
            "BUS",  // rank
            14, // minimum zoom level
            "RAIL",  // etc.
            1,
            "BUS,RAIL",
            1,
            "RAIL,BUS",
            1,
            15  // fallback for ranks > 4
        ]
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
        'BUS,RAIL',
        'rail-icon',
        'RAIL,BUS',
        'rail-icon',
        'rail-icon'
      ],
      'icon-size': [
        'match',
        ['get', 'type'],
        'BUS', 0.1,
        'RAIL,BUS', 0.15,
        'BUS,RAIL', 0.15,
        'RAIL', 0.15,
        0.15
        ],
      'icon-allow-overlap': false,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.0],
      'text-size': 12,
      'text-anchor': 'top',
      'symbol-sort-key':  [
        'match',
        ['get', 'type'],
        'BUS', 10,
        'RAIL,BUS', 1,
        'BUS,RAIL', 1,
        'RAIL', 5,
        10
        ],
    },
    minzoom: 1,
    maxzoom: 17,
    popupRenderer: (properties) => {
      let routesCount = 0
      try {
        const parsedRoutes =
          typeof properties.routes === 'string'
            ? JSON.parse(properties.routes)
            : properties.routes
        if (Array.isArray(parsedRoutes)) routesCount = parsedRoutes.length
      } catch (err) {
        routesCount = 0
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
      )
    }
  },
  citybikes: {
    type: 'symbol',
    layout: {
      'icon-image': 'bicycle-icon', // Supply your bike icon.
      'icon-size': 0.15,
      'icon-allow-overlap': false,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.2],
      'text-size': 10,
      'text-anchor': 'top'
    },
    minzoom: 14,
    maxzoom: 20
    /*popupRenderer: (properties) => (
      <div>
        <div style={{ fontSize: '1.1em', marginBottom: '0.3em' }}>
          <strong>{properties.name}</strong>
        </div>
        <div>
          <strong>Type:</strong> Vehicle Rental
        </div>
      </div>
    )*/
  },
  rentalVehicles: {
    type: 'symbol',
    layout: {
      'icon-image': 'scooter-icon', // Supply your micromobility icon.
      'icon-size': 0.1,
      'icon-allow-overlap': false,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1],
      'text-size': 10,
      'text-anchor': 'top'
    },
    minzoom: 1,
    maxzoom: 20
    /*popupRenderer: (properties) => (
      <div>
        <div style={{ fontSize: '1.1em', marginBottom: '0.3em' }}>
          <strong>{properties.name}</strong>
        </div>
        <div>
          <strong>Vehicle ID:</strong> {properties.vehicleId || 'n/a'}
        </div>
      </div>
    )*/
  },
  rentalStations: {
    type: 'symbol',
    filter: ['!=', 'formFactors', ''],
    layout: {
      'icon-image': [
        'match',
        ['get', 'formFactors'],
        'BICYCLE', 'bicycle-icon',
        'CAR', 'car-icon',
        'BICYCLE,CAR', 'car-icon',
        'CAR,BICYCLE', 'car-icon',
        /* default */ 'default-icon'
      ],
      'icon-size': 0.1,
      'icon-allow-overlap': false,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1],
      'text-size': 12,
      'text-anchor': 'top'
    },
    minzoom: 14,
    maxzoom: 20,
    popupRenderer: (properties) => {
      return (
        <div>
          <div style={{ fontSize: '1.1em', marginBottom: '0.3em' }}>
            <strong>{properties.name}</strong>
          </div>
          <div>
            <strong>Network:</strong> {properties.network || 'n/a'}
          </div>
          <div>
            <strong>Form Factors:</strong> {properties.formFactors || 'n/a'}
          </div>
        </div>
      );
    }
  },
  vehicleParking: {
    type: 'symbol',
    layout: {
    'icon-image': 'parking-icon',
    'icon-size': 0.15,
    'icon-allow-overlap': false,
    'text-field': ['get', 'name'],
    'text-offset': [0, 1],
    'text-size': 12,
    'text-anchor': 'top'
    },
    paint: {
        'icon-color': '#0000FF',               // blue icon
        'icon-opacity': 0.8,

  /*    'text-color': '#FFFFFF',               // white text for contrast
      'text-halo-color': '#0000FF',            // blue border around text
      'text-halo-width': 2,*/
    },
    minzoom: 14,
    maxzoom: 20,
    popupRenderer: (properties) => {
        const name = properties.name && properties.name.trim() ? ` (${properties.name.trim()})` : '';
        return (
            <div>
            <div style={{ fontSize: '1.1em', marginBottom: '0.3em' }}>
                <strong>Parking{name}</strong>
            </div>
            <div>
                {(properties.anyCarPlaces || properties.carPlaces) && (
                <span style={{ marginRight: '8px' }}>
                    <ClassicModeIcon mode="car" style={{ width: '16px', height: '16px' }} />
                </span>
                )}
                {properties.bicyclePlaces && (
                <span>
                    <ClassicModeIcon mode="bicycle" style={{ width: '16px', height: '16px' }} />
                </span>
                )}
            </div>
            </div>
        );
      }
  }
}

const OTPVectorLayer = ({ sourceLayerName, layerStyle = {} }) => {
  const map = useMap().default
  const [hoverInfo, setHoverInfo] = useState(null)
  const [stickyInfo, setStickyInfo] = useState(null)
  // For stops, track parentStation for highlighting.
  const [highlightParentStation, setHighlightParentStation] = useState(null)
  const stickyInfoRef = useRef(null)
  useEffect(() => {
    stickyInfoRef.current = stickyInfo
  }, [stickyInfo])

  // Merge default config with any overrides and ensure required keys.
  const defaultConfig = LAYER_CONFIG[sourceLayerName] || {}
  const mergedConfig = {
    source: 'otp-source',
    'source-layer': sourceLayerName,
    ...defaultConfig,
    ...layerStyle
  }

  // --- Load custom icons for stops (if needed) ---
  useEffect(() => {
    if (!map) return
    const mapInstance = map.getMap()
    if (!mapInstance) return
    // Parking icon
    if (!mapInstance.hasImage('parking-icon')) {
        const busSvgString = ReactDOMServer.renderToStaticMarkup(
          <Parking />
        )
        const busDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          busSvgString
        )}`
        const busIcon = new Image()
        busIcon.onload = () => {
          if (!mapInstance.hasImage('parking-icon')) {
            mapInstance.addImage('parking-icon', busIcon, {sdf: true})
          }
        }
        busIcon.src = busDataUrl
      }
    // Bus icon
    if (!mapInstance.hasImage('bus-icon')) {
      const busSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="bus" />
      )
      const busDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        busSvgString
      )}`
      const busIcon = new Image()
      busIcon.onload = () => {
        if (!mapInstance.hasImage('bus-icon')) {
          mapInstance.addImage('bus-icon', busIcon)
        }
      }
      busIcon.src = busDataUrl
    }
    // Car icon for stations – here using ClassicModeIcon mode "car"
    if (!mapInstance.hasImage('car-icon')) {
      const carSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="car" />
      )
      const carDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        carSvgString
      )}`
      const carIcon = new Image()
      carIcon.onload = () => {
        if (!mapInstance.hasImage('car-icon')) {
          mapInstance.addImage('car-icon', carIcon)
        }
      }
      carIcon.src = carDataUrl
    }
    // Train icon
    if (!mapInstance.hasImage('rail-icon')) {
      const tramSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="rail" />
      )
      const tramDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        tramSvgString
      )}`
      const railIcon = new Image()
      railIcon.onload = () => {
        if (!mapInstance.hasImage('rail-icon')) {
          mapInstance.addImage('rail-icon', railIcon)
        }
      }
      railIcon.src = tramDataUrl
    }
    // Micromobility icon
    if (!mapInstance.hasImage('scooter-icon')) {
      const scooterSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="scooter" />
      )
      const scooterDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        scooterSvgString
      )}`
      const scooterIcon = new Image()
      scooterIcon.onload = () => {
        if (!mapInstance.hasImage('scooter-icon')) {
          mapInstance.addImage('scooter-icon', scooterIcon)
        }
      }
      scooterIcon.src = scooterDataUrl
    }
    // Bicycle icon
    if (!mapInstance.hasImage('bicycle-icon')) {
      const bicycleSvgString = ReactDOMServer.renderToStaticMarkup(
        <ClassicModeIcon mode="bicycle" />
      )
      const bicycleDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        bicycleSvgString
      )}`
      const bicycleIcon = new Image()
      bicycleIcon.onload = () => {
        if (!mapInstance.hasImage('bicycle-icon')) {
          mapInstance.addImage('bicycle-icon', bicycleIcon)
        }
      }
      bicycleIcon.src = bicycleDataUrl
    }
  }, [map, sourceLayerName])


  useEffect(() => {
    console.log(highlightParentStation);
  }, [highlightParentStation]);
  // --- Attach event listeners (hover, click) ---
  useEffect(() => {
    if (!map) return
    const mapInstance = map.getMap()
    if (!mapInstance) return
    const layerId = `otp-${sourceLayerName}`
    const onMouseEnter = (e) => {
      mapInstance.getCanvas().style.cursor = 'pointer'
      if (!stickyInfoRef.current && e.features && e.features.length) {
        const feature = e.features[0]
        setHoverInfo({
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          properties: feature.properties
        })
        if (feature.properties.parentStation) {
          setHighlightParentStation(feature.properties.parentStation)
        }
        if(feature.properties.stops) {
          setHighlightParentStation(feature.properties.gtfsId)
        }
      }
    }
    const onMouseLeave = () => {
      mapInstance.getCanvas().style.cursor = ''
      setHoverInfo(null)
      if (!stickyInfoRef.current) {
        setHighlightParentStation(null)
      }
    }
    const onClick = (e) => {
      setHoverInfo(null)
      if (e.features && e.features.length) {
        const feature = e.features[0]
        if(!feature.properties.stops) {
            setStickyInfo({
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            properties: feature.properties
            })
        }
        if (feature.properties.parentStation) {
          setHighlightParentStation(feature.properties.parentStation)
        }
        if(feature.properties.stops) {
          setHighlightParentStation(feature.properties.gtfsId)
        }
        const mapInstance = map.getMap();
        mapInstance.flyTo({
            center: feature.geometry.coordinates,
            zoom: 19
        });
      }
    }
    if (mapInstance.getLayer(layerId)) {
      mapInstance.on('mouseenter', layerId, onMouseEnter)
      mapInstance.on('mouseleave', layerId, onMouseLeave)
      mapInstance.on('click', layerId, onClick)
    }
    const styleDataHandler = () => {
      if (mapInstance.getLayer(layerId)) {
        mapInstance.off('mouseenter', layerId, onMouseEnter)
        mapInstance.off('mouseleave', layerId, onMouseLeave)
        mapInstance.off('click', layerId, onClick)
        mapInstance.on('mouseenter', layerId, onMouseEnter)
        mapInstance.on('mouseleave', layerId, onMouseLeave)
        mapInstance.on('click', layerId, onClick)
      }
    }
    mapInstance.on('styledata', styleDataHandler)
    return () => {
      if (mapInstance.getLayer(layerId)) {
        mapInstance.off('mouseenter', layerId, onMouseEnter)
        mapInstance.off('mouseleave', layerId, onMouseLeave)
        mapInstance.off('click', layerId, onClick)
      }
      mapInstance.off('styledata', styleDataHandler)
    }
  }, [map, sourceLayerName])

  const onStickyClose = () => {
    setStickyInfo(null)
    setHighlightParentStation(null)
  }

  // --- New default popup renderer: Print all properties ---
  const renderPopupContent = (properties) => {
    if (mergedConfig.popupRenderer) {
      return mergedConfig.popupRenderer(properties)
    }
    return (
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {Object.entries(properties).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {JSON.stringify(value)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Render the main layer */}
      <Layer id={`otp-${sourceLayerName}`} {...mergedConfig} />
      {/* For stops, render extra highlight layers */}
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
            minzoom={17}
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
            minzoom={17}
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
  )
}

export default OTPVectorLayer
