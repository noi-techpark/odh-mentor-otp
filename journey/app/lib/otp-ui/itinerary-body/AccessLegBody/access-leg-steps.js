import {
  getStepDirection,
  getStepStreetName
} from "../../core-utils/itinerary";
import { stepsType } from "../../core-utils/types";
import { DirectionIcon } from "../../icons/directions";
import React from "react";
import { withNamespaces } from "react-i18next"

function AccessLegSteps({ steps, t }) {
  return (
    <ul className="list-unstyled otp-ui-accessLegSteps">
      {steps.map((step, k) => {
        return (
          <li key={k}>
            <DirectionIcon relativeDirection={step.relativeDirection} />
            <span>
              {t(getStepDirection(step))}
              <strong>
                {` ${t(step.relativeDirection === "ELEVATOR" ? "to" : "on")} `}
              </strong>
              {t(getStepStreetName(step))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

AccessLegSteps.propTypes = {
  steps: stepsType.isRequired
};

export default withNamespaces()(AccessLegSteps)
