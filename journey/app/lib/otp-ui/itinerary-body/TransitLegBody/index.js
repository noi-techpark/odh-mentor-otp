import { getTransitFare } from "../../core-utils/itinerary";
import { formatDuration } from "../../core-utils/time";
import {
  configType,
  fareType,
  legType,
  transitOperatorType
} from "../../core-utils/types";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ExclamationTriangle } from "@styled-icons/fa-solid";
import { VelocityTransitionGroup } from "velocity-react";
import { withNamespaces } from "react-i18next"
import { CaretDown, CaretUp } from "@styled-icons/fa-solid";
import { Button } from 'react-bootstrap'

import AlertsBody from "./alerts-body";
import IntermediateStops from "./intermediate-stops";
import ViewTripButton from "./view-trip-button";

// TODO use pluralize that for internationalization (and complex plurals, i.e., not just adding 's')
function pluralize(str, list) {
  return `${str}${list.length > 1 ? "s" : ""}`;
}

class TransitLegBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsExpanded: false,
      stopsExpanded: false
    };
  }

  getFareForLeg = (leg, fare) => {
    let fareForLeg;
    if (fare && fare.details && fare.details.regular) {
      fare.details.regular.forEach(fareComponent => {
        if (fareComponent.routes.includes(leg.routeId)) {
          fareForLeg = getTransitFare(fareComponent.price);
        }
      });
    }
    return fareForLeg;
  };

  onToggleStopsClick = () => {
    const { stopsExpanded } = this.state;
    this.setState({ stopsExpanded: !stopsExpanded });
  };

  onToggleAlertsClick = () => {
    const { alertsExpanded } = this.state;
    this.setState({ alertsExpanded: !alertsExpanded });
  };

  onSummaryClick = () => {
    const { leg, legIndex, setActiveLeg } = this.props;
    setActiveLeg(legIndex, leg);
  };

  render() {
    const {
      config,
      fare,
      leg,
      LegIcon,
      longDateFormat,
      RouteDescription,
      setViewedTrip,
      showAgencyInfo,
      showViewTripButton,
      timeFormat,
      TransitLegSubheader,
      TransitLegSummary,
      transitOperator,
      t
    } = this.props;
    const { language: languageConfig } = config;
    const { agencyBrandingUrl, agencyName, agencyUrl, alerts } = leg;
    const { alertsExpanded, stopsExpanded } = this.state;

    // If the config contains an operator with a logo URL, prefer that over the
    // one provided by OTP (which is derived from agency.txt#agency_branding_url)
    const logoUrl =
      transitOperator && transitOperator.logo
        ? transitOperator.logo
        : agencyBrandingUrl;

    const expandAlerts =
      alertsExpanded || (leg.alerts && leg.alerts.length < 3);
    const fareForLeg = this.getFareForLeg(leg, fare);
    return (
      <>
        {TransitLegSubheader && (
          <TransitLegSubheader languageConfig={languageConfig} leg={leg} />
        )}
        <div className="otp-ui-transitLegBody">
          {/* The Route Icon/Name Bar; clickable to set as active leg */}
          <Button bsStyle="link" onClick={this.onSummaryClick}>
            <RouteDescription
              leg={leg}
              LegIcon={LegIcon}
              transitOperator={transitOperator}
            />
          </Button>

          {/* Agency information */}
          {showAgencyInfo && (
            <div>
              {t('service')}
              <br/>
              <Button bsSize="small" bsStyle="link" href={agencyUrl} rel="noopener noreferrer" target="_blank">
                {agencyName}
                {logoUrl && (
                  <img alt={`${agencyName} logo`} src={logoUrl} height={20} style={{marginLeft: 8}}/>
                )}
              </Button>
            </div>
          )}

          {/* Alerts toggle */}
          {alerts && alerts.length > 2 && (
            <Button bsSize="small" bsStyle="link" onClick={this.onToggleAlertsClick}>
              <ExclamationTriangle size={15} /> {alerts.length}{" "}
              {pluralize("alert", alerts)}{" "}
              {alertsExpanded ? <CaretUp size={15} /> : <CaretDown size={15} />}
            </Button>
          )}

          {/* The Alerts body, if visible */}
          <VelocityTransitionGroup
            enter={{ animation: "slideDown" }}
            leave={{ animation: "slideUp" }}
          >
            {expandAlerts && (
              <AlertsBody
                alerts={leg.alerts}
                longDateFormat={longDateFormat}
                timeFormat={timeFormat}
              />
            )}
          </VelocityTransitionGroup>
          {/* The "Ride X Min / X Stops" Row, including IntermediateStops body */}
          {leg.intermediateStops && leg.intermediateStops.length > 0 && (
            <div className="otp-ui-transitLegBody__details">
              {/* The header summary row, clickable to expand intermediate stops */}
              <div className="otp-ui-transitLegBody__detailsHeader">
                <TransitLegSummary
                  leg={leg}
                  onClick={this.onToggleStopsClick}
                  stopsExpanded={stopsExpanded}
                />

                {showViewTripButton && (
                  <ViewTripButton
                    tripId={leg.tripId}
                    fromIndex={leg.from.stopIndex}
                    setViewedTrip={setViewedTrip}
                    toIndex={leg.to.stopIndex}
                  />
                )}
              </div>
              {/* IntermediateStops expanded body */}
              <VelocityTransitionGroup
                enter={{ animation: "slideDown" }}
                leave={{ animation: "slideUp" }}
              >
                {stopsExpanded ? (
                  <div>
                    <IntermediateStops stops={leg.intermediateStops} />
                    {fareForLeg && (
                      <div>
                        {t('fare')}: {fareForLeg.centsToString(fareForLeg.transitFare)}
                      </div>
                    )}
                  </div>
                ) : null}
              </VelocityTransitionGroup>

              {/* Average wait details, if present */}
              {leg.averageWait && (
                <span>{t('typical_wait')}: {formatDuration(leg.averageWait)}</span>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

TransitLegBody.propTypes = {
  config: configType.isRequired,
  fare: fareType,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  legIndex: PropTypes.number.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  RouteDescription: PropTypes.elementType.isRequired,
  setActiveLeg: PropTypes.func.isRequired,
  setViewedTrip: PropTypes.func.isRequired,
  showAgencyInfo: PropTypes.bool.isRequired,
  showViewTripButton: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  TransitLegSubheader: PropTypes.elementType,
  TransitLegSummary: PropTypes.elementType.isRequired,
  transitOperator: transitOperatorType
};

TransitLegBody.defaultProps = {
  fare: null,
  TransitLegSubheader: undefined,
  transitOperator: null
};

export default withNamespaces()(TransitLegBody)
