import {
  isBikeshareStation,
  isCarWalkTransition,
  isEScooterStation
} from "../core-utils/map";

const STYLES = {};

function getSegmentStyle(segment) {
  switch (segment.type) {
    case "WALK":
      return 'is-walk';
    case "BICYCLE":
    case "BICYCLE_RENT":
      return 'is-bicycle';
    case "CAR":
      return 'is-car';
    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return 'is-micromobility';
    default:
      return 'is-transit';
  }
}
/**
 * Transitive style overrides for places (basically any point that isn't a
 * transit stop)
 *
 * This style rule draws nothing except when a bikeshare station or e-scooter
 * station is encountered.
 *
 * The from/to locations are drawn outside of transitive and there are separate
 * renderers for transit stops.
 */
STYLES.places = {
  display: (display, place) =>
    isBikeshareStation(place) ||
    isEScooterStation(place) ||
    isCarWalkTransition(place)
      ? true
      : "none",
  fill: (display, place) => {
    if (isBikeshareStation(place)) {
      return "#f00";
    }
    if (isCarWalkTransition(place)) {
      return "#888";
    }
    if (isEScooterStation(place)) {
      return "#f5a729";
    }
    return 'null';
  },
  stroke: "#fff",
  "stroke-width": 2,
  r: 7
};

/**
 * Transitive style overrides for transit stops. All this does is sets the
 * radius to 6 pixels.
 */
STYLES.stops_merged = {
  r() {
    return 6;
  },
  stroke: function() {
    return '#095980';
  },  
};

const style = {
  fill: function(display, segment) {
    if (segment.type ==='TRANSIT')
      return '#095980';
  },
  stroke: function(display, segment) {
    if (segment.type ==='TRANSIT')
      return '#095980';
  },
  background: function(display, segment) {
    if (segment.type ==='TRANSIT')
      return '#095980';
  }
}

STYLES.segments = style;

STYLES.segment_label_containers = style;

STYLES.segment_labels = style;

STYLES.labels = style;

/*

possible customizations

wireframe_edges: wireframeEdges,
wireframe_vertices: wireframeVertices,
stops_merged: stopsMerged,
stops_pattern: stopsPattern,
places,
multipoints_merged: multipointsMerged,
multipoints_pattern: multipointsPattern,
labels,
segments,
segments_front: segmentsFront,
segments_halo: segmentsHalo,
segment_labels: segmentLabels,
segment_label_containers: segmentLabelContainers

DEFAULT VALUES/COLORS https://github.com/conveyal/transitive-demo/blob/master/styles.js
*/

export default STYLES;
