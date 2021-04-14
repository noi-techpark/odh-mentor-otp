/**
 * To customize certain UI features, create a file like this one and specify it
 * during build/start to override this default version of the file:
 *    yarn start --env.JS_CONFIG=/path/to/config.js
 *
 * Caveats: This file cannot import the following:
 * - other files
 * - modules not installed in the node_modules of this project.
 */
import { TriMetLegIcon, ClassicModeIcon } from './otp-react-redux/otp-ui/icons'
import React from 'react'

/**
 * @param  {Object} otpConfig The contents of the yml config file as json.
 * @return  This function must return an object with the following attributes:
 * - getItineraryFooter (React component(*), optional)
 * - LegIcon (React component(*), required, it is recommended to import an
 *    existing LegIcon component from @opentripplanner/icons, but it is possible
 *    to create a custom component if desired.)
 * - ModeIcon (React component(*), required, it is recommended to import an
 *    existing ModeIcon component from @opentripplanner/icons, but it is
 *    possible to create a custom component if desired.)
 *
 *   (*) These attributes can also be a function returning a React element,
 *       e.g. () => <div>{content}</div>
 */
export function configure (otpConfig) {
  return {
    /**
     * This is a function that will return a React Element of the itinerary
     * footer. This function is ran once on application startup.
     */
    getItineraryFooter: () => (
      <div className='disclaimer'>
            $_disclaimer_$
        <div className='link-row'>
          <a href='https://openmove.com' target='_blank'>
            $_tnc_$
          </a> •{' '}
          <a href='https://openmove.com' target='_blank'>
            $_privacy_policy_$
          </a>
        </div>
      </div>
    ),
    LegIcon: TriMetLegIcon,
    ModeIcon: ClassicModeIcon
  }
}
