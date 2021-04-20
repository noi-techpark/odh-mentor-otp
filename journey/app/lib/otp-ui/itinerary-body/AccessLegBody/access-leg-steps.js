import {
  getStepDirection,
  getStepStreetName
} from "../../core-utils/itinerary";
import { stepsType } from "../../core-utils/types";
import { DirectionIcon } from "../../icons/directions";
import React from "react";
import { withNamespaces } from "react-i18next"

import * as Styled from "../styled";

function AccessLegSteps({ steps, t }) {
  return (
    <Styled.Steps>
      {steps.map((step, k) => {
        return (
          <Styled.StepRow key={k}>
            <Styled.StepIconContainer>
              <DirectionIcon relativeDirection={step.relativeDirection} />
            </Styled.StepIconContainer>

            <Styled.StepDescriptionContainer>
              {t(getStepDirection(step))}
              <span>
                {` ${t(step.relativeDirection === "ELEVATOR" ? "to" : "on")} `}
              </span>
              <Styled.StepStreetName>
                {t(getStepStreetName(step))}
              </Styled.StepStreetName>
            </Styled.StepDescriptionContainer>
          </Styled.StepRow>
        );
      })}
    </Styled.Steps>
  );
}

AccessLegSteps.propTypes = {
  steps: stepsType.isRequired
};

export default withNamespaces()(AccessLegSteps)
