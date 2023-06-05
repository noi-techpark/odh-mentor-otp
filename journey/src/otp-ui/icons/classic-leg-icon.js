// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from "react";

import LegIcon from "./leg-icon";
import ClassicModeIcon from "./classic-mode-icon";

const ClassicLegIcon = props => (
  <LegIcon ModeIcon={ClassicModeIcon} {...props} />
);

export default ClassicLegIcon;
