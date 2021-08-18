import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { ExclamationTriangle } from "@styled-icons/fa-solid";

export default function AlertsBody({ alerts, longDateFormat, timeFormat }) {
  return (
    <div className="otp-ui-transitAlerts">
      {alerts
        .sort((a, b) => b.effectiveStartDate - a.effectiveStartDate)
        .map((alert, i) => {
          // If alert is effective as of +/- one day, use today, tomorrow, or
          // yesterday with time. Otherwise, use long date format.
          const dateTimeString = moment(alert.effectiveStartDate).calendar(
            null,
            {
              sameDay: `${timeFormat}, [Today]`,
              nextDay: `${timeFormat}, [Tomorrow]`,
              lastDay: `${timeFormat}, [Yesterday]`,
              lastWeek: `${longDateFormat}`,
              sameElse: `${longDateFormat}`
            }
          );
          const effectiveDateString = `Effective as of ${dateTimeString}`;
          return (
            <a className="otp-ui-transitAlert" key={i} href={alert.alertUrl}>
              <div className="otp-ui-transitAlert__iconContainer">
                <ExclamationTriangle size={18} />
              </div>
              {alert.alertHeaderText ? (
                <div className="otp-ui-transitAlert__header">
                  {alert.alertHeaderText}
                </div>
              ) : null}
              <div className="otp-ui-transitAlert__body">
                {alert.alertDescriptionText}
              </div>
              <div className="otp-ui-transitAlert__effectiveDate">
                {effectiveDateString}
              </div>
            </a>
          );
        })}
    </div>
  );
}

AlertsBody.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};
