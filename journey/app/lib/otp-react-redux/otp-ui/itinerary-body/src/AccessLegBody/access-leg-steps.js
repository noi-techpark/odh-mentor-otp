import {
  getStepDirection,
  getStepStreetName
} from "../../../core-utils/src/itinerary";
import { stepsType } from "../../../core-utils/src/types";
import { DirectionIcon } from "../../../icons/src/directions";
import React from "react";

import * as Styled from "../styled";

export default function AccessLegSteps({ steps }) {
  return (
    <Styled.Steps>
      {steps.map((step, k) => {
        return (
          <Styled.StepRow key={k}>
            <Styled.StepIconContainer>
              <DirectionIcon relativeDirection={step.relativeDirection} />
            </Styled.StepIconContainer>

            <Styled.StepDescriptionContainer>
              {getStepDirection(step)}
              <span>
                {step.relativeDirection === "ELEVATOR" ? " $_to_$ " : " $_on_$ "}
              </span>
              <Styled.StepStreetName>
                {getStepStreetName(step)}
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
