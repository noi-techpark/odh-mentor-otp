import {
  calculateFares,
  calculatePhysicalActivity
} from "../core-utils/itinerary";
import { mergeMessages } from "../core-utils/messages";
import { formatTime } from "../core-utils/time";
import {
  itineraryType,
  timeOptionsType
} from "../core-utils/types";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { CalendarAlt, Heartbeat, MoneyBillAlt } from "@styled-icons/fa-solid";
import { withNamespaces } from "react-i18next"
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap"

import TripDetail from "./trip-detail";

function TripDetails({
  className,
  itinerary,
  longDateFormat,
  messages,
  routingType,
  timeOptions,
  t
}) {
  const date = moment(itinerary.startTime);
  messages = mergeMessages(TripDetails.defaultProps.messages, messages);

  // process the transit fare
  const {
    centsToString,
    dollarsToString,
    maxTNCFare,
    minTNCFare,
    transitFare
  } = calculateFares(itinerary);
  let companies;
  itinerary.legs.forEach(leg => {
    if (leg.tncData) {
      companies = leg.tncData.company;
    }
  });
  let fare;
  if (transitFare || minTNCFare) {
    fare = (
      <span>
        {transitFare && (
          <span>
            {t(messages.transitFare)}: <b>{centsToString(transitFare)}</b>
          </span>
        )}
        {minTNCFare !== 0 && (
          <span>
            <br />
            <span className="text-uppercase">
              {companies.toLowerCase()}
            </span>{" "}
            {t(messages.fare)}:{" "}
            <strong>
              {dollarsToString(minTNCFare)} - {dollarsToString(maxTNCFare)}
            </strong>
          </span>
        )}
      </span>
    );
  }

  // Compute calories burned.
  const {
    bikeDuration,
    caloriesBurned,
    walkDuration
  } = calculatePhysicalActivity(itinerary);

  return (
    <div className={className}>
      <br/>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            {t(messages.title)}
          </Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <ListGroupItem>
            <TripDetail
              description={messages.departDescription ? t(messages.departDescription) : ''}
              icon={<CalendarAlt size={17} />}
              summary={
                <>
                  <span>
                    {t(messages.depart)} <b>{date.format(longDateFormat)}</b>
                  </span>
                  {routingType === "ITINERARY" && (
                    <span>
                      {" "}
                      {t(messages.at)}{" "}
                      <strong>{formatTime(itinerary.startTime, timeOptions)}</strong>
                    </span>
                  )}
                </>
              }
            />
          </ListGroupItem>
          {
            fare && (
              <ListGroupItem>
                <TripDetail
                  description={messages.transitFareDescription ? t(messages.transitFareDescription) : ''}
                  icon={<MoneyBillAlt size={17} />}
                  summary={fare}
                />
              </ListGroupItem>
          )}
          {
            caloriesBurned > 0 && (
              <ListGroupItem>
                <TripDetail
                  icon={<Heartbeat size={17} />}
                  summary={
                    <>
                      {t(messages.caloriesBurned)}: <b>{Math.round(caloriesBurned)}</b>
                    </>
                  }
                  description={
                    <>
                      {t('calories_info_1')}{" "}
                      <b>{Math.round(walkDuration / 60)} minute(s)</b> spent walking
                      and <b>{Math.round(bikeDuration / 60)} minute(s)</b> spent
                      biking during this trip. Adapted from{" "}
                      <a
                        href="https://health.gov/dietaryguidelines/dga2005/document/html/chapter3.htm#table4"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Dietary Guidelines for Americans 2005, page 16, Table 4
                      </a>
                      .
                    </>
                  }
                />
              </ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    </div>
  );
}

TripDetails.propTypes = {
  /** Used for additional styling with styled components for example. */
  className: PropTypes.string,
  /** Itinerary that the user has selected to view, contains multiple legs */
  itinerary: itineraryType.isRequired,
  /** the desired format to use for a long date */
  longDateFormat: PropTypes.string,
  /**
   * messages to use for l10n/i8n
   *
   * Note: messages with default null values included here for visibility.
   * Overriding with a truthy string value will cause the expandable help
   * message to appear in trip details.
   */
  messages: PropTypes.shape({
    at: PropTypes.string,
    caloriesBurned: PropTypes.string,
    // FIXME: Add templated string description.
    caloriesBurnedDescription: PropTypes.string,
    depart: PropTypes.string,
    departDescription: PropTypes.string,
    title: PropTypes.string,
    fare: PropTypes.string,
    transitFare: PropTypes.string,
    transitFareDescription: PropTypes.string
  }),
  /** whether the routing type is an itinerary or a profile result */
  routingType: PropTypes.string,
  /** Contains the preferred format string for time display and a timezone offset */
  timeOptions: timeOptionsType
};

TripDetails.defaultProps = {
  className: null,
  longDateFormat: null,
  messages: {
    at: "at_time",
    caloriesBurned: "calories",
    // FIXME: Add templated string description.
    caloriesBurnedDescription: null,
    depart: "departure",
    departDescription: null,
    title: "details_trip",
    fare: "fare",
    transitFare: "transit_fare",
    transitFareDescription: null
  },
  routingType: "ITINERARY",
  timeOptions: null
};

export default withNamespaces()(TripDetails)
