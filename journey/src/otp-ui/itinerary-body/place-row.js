import {
  configType,
  fareType,
  legType,
  timeOptionsType
} from "../core-utils/types";
import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";

import DefaultTimeColumnContent from "./defaults/time-column-content";
import AccessLegBody from "./AccessLegBody";
import TransitLegBody from "./TransitLegBody";

import BaseMapIcon from "../icons/trimet/Map";

/** Looks up an operator from the provided configuration */
const getTransitOperatorFromConfig = (id, config) =>
  config.transitOperators.find(transitOperator => transitOperator.id === id) ||
  null;

/*
  TODO: Wondering if it's possible for us to destructure the time
  preferences from the config object and avoid making the props list so long
*/
const PlaceRow = ({
  config,
  diagramVisible,
  fare,
  followsTransit,
  frameLeg,
  isDestination,
  lastLeg,
  leg,
  LegIcon,
  legIndex,
  LineColumnContent,
  PlaceName,
  RouteDescription,
  setActiveLeg,
  setLegDiagram,
  setViewedTrip,
  showAgencyInfo,
  showElevationProfile,
  showLegIcon,
  showMapButtonColumn,
  showViewTripButton,
  TimeColumnContent,
  timeOptions,
  toRouteAbbreviation,
  TransitLegSubheader,
  TransitLegSummary
}) => {
  // NOTE: Previously there was a check for itineraries that changed vehicles
  // at a single stop, which would render the stop place the same as the
  // interline stop. However, this prevents the user from being able to click
  // on the stop viewer in this case, which they may want to do in order to
  // check the real-time arrival information for the next leg of their journey.
  const interline = !!(!isDestination && leg.interlineWithPreviousLeg);
  const hideBorder = interline || !legIndex;
  const place = isDestination ? leg.to : leg.from;

  const { longDateFormat, timeFormat } = config.dateTime;
  return (
    <div className="otp-ui-placeRowWrapper" key={legIndex || "destination-place"}>
      <div className="otp-ui-placeRowWrapper__timeColumn">
        {/* Custom rendering of the departure/arrival time of the specified leg. */}
        <TimeColumnContent
          isDestination={isDestination}
          leg={leg}
          timeOptions={timeOptions}
        />
      </div>
      <div className="otp-ui-placeRowWrapper__lineColumn">
        <LineColumnContent
          interline={interline}
          isDestination={isDestination}
          lastLeg={lastLeg}
          leg={leg}
          LegIcon={LegIcon}
          legIndex={legIndex}
          toRouteAbbreviation={toRouteAbbreviation}
        />
      </div>
      <div className={`otp-ui-placeRowWrapper__detailsColumn ${hideBorder.toString() === 'true' ? 'has-hidden-border' : ''} `}>
        {/* Dot separating interlined segments, if applicable */}
        <div className="otp-ui-placeRowWrapper__placeHeader">
          {/*
            TODO: Need to rework this -- Need to display a marker
            for an interline place
          */}
          {interline && <div className="otp-ui-placeRowWrapper__interlineDot">&bull;</div>}
          <div className="otp-ui-placeRowWrapper__placeName">
            <PlaceName config={config} interline={interline} place={place} />
          </div>
        </div>

        {/* Show the leg, if not rendering the destination */}
        {!isDestination &&
          (leg.transitLeg ? (
            /* This is a transit leg */
            <TransitLegBody
              config={config}
              fare={fare}
              leg={leg}
              LegIcon={LegIcon}
              legIndex={legIndex}
              setActiveLeg={setActiveLeg}
              longDateFormat={longDateFormat}
              RouteDescription={RouteDescription}
              setViewedTrip={setViewedTrip}
              showAgencyInfo={showAgencyInfo}
              showViewTripButton={showViewTripButton}
              timeFormat={timeFormat}
              TransitLegSubheader={TransitLegSubheader}
              TransitLegSummary={TransitLegSummary}
              transitOperator={
                leg.agencyId &&
                getTransitOperatorFromConfig(leg.agencyId, config)
              }
            />
          ) : (
            /* This is an access (e.g. walk/bike/etc.) leg */
            <AccessLegBody
              config={config}
              diagramVisible={diagramVisible}
              followsTransit={followsTransit}
              leg={leg}
              LegIcon={LegIcon}
              legIndex={legIndex}
              setActiveLeg={setActiveLeg}
              setLegDiagram={setLegDiagram}
              showElevationProfile={showElevationProfile}
              showLegIcon={showLegIcon}
              timeOptions={timeOptions}
            />
          ))}
      </div>
      {showMapButtonColumn && (
        <div className={`otp-ui-placeRowWrapper__mapColumn ${hideBorder.toString() === 'true' ? 'has-hidden-border' : ''}`}>
          <Button bsStyle="link"
            onClick={() => frameLeg({ isDestination, leg, legIndex, place })}
          >
            <BaseMapIcon width={15} height={15} fill="00FFFF" />
          </Button>
        </div>
      )}
    </div>
  );
};

// A lot of these props are passed through from the ItineraryBody. See the
// documentation in that component for more information.
PlaceRow.propTypes = {
  config: configType.isRequired,
  diagramVisible: legType,
  fare: fareType,
  /** Indicates whether this leg directly follows a transit leg */
  followsTransit: PropTypes.bool,
  frameLeg: PropTypes.func.isRequired,
  /** whether this place row represents the destination */
  isDestination: PropTypes.bool.isRequired,
  /** Contains details about the leg object prior to the current one */
  lastLeg: legType,
  /** Contains details about leg object that is being displayed */
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  /** The index value of this specific leg within the itinerary */
  legIndex: PropTypes.number.isRequired,
  LineColumnContent: PropTypes.elementType.isRequired,
  PlaceName: PropTypes.elementType.isRequired,
  RouteDescription: PropTypes.elementType.isRequired,
  setActiveLeg: PropTypes.func.isRequired,
  setLegDiagram: PropTypes.func.isRequired,
  setViewedTrip: PropTypes.func.isRequired,
  showAgencyInfo: PropTypes.bool.isRequired,
  showElevationProfile: PropTypes.bool.isRequired,
  showLegIcon: PropTypes.bool.isRequired,
  showMapButtonColumn: PropTypes.bool.isRequired,
  showViewTripButton: PropTypes.bool.isRequired,
  TimeColumnContent: PropTypes.elementType,
  timeOptions: timeOptionsType,
  toRouteAbbreviation: PropTypes.func.isRequired,
  TransitLegSubheader: PropTypes.elementType,
  TransitLegSummary: PropTypes.elementType.isRequired
};

PlaceRow.defaultProps = {
  diagramVisible: null,
  fare: null,
  followsTransit: false,
  // can be null if this is the origin place
  lastLeg: null,
  TimeColumnContent: DefaultTimeColumnContent,
  timeOptions: null,
  TransitLegSubheader: undefined
};

export default PlaceRow;
