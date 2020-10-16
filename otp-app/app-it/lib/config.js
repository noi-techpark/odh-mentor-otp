/**
 * To customize certain UI features, create a file like this one and specify it
 * during build/start to override this default version of the file:
 *    yarn start --env.JS_CONFIG=/path/to/config.js
 *
 * Caveats: This file cannot import the following:
 * - other files
 * - modules not installed in the node_modules of this project.
 */
import { TriMetLegIcon, ClassicModeIcon } from '@opentripplanner/icons'
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
        Prima di partire controlla gli arrivi in tempo reale alla fermata e gli avvisi sul servizio che possono influire sul tuo viaggio.
        Tempi e percorsi sono solo a scopo di pianificazione e possono subire variazioni a causa del traffico, la condizione della strada, deviazioni e altri fattori.
        <div className='link-row'>
          <a href='https://trimet.org/legal/index.htm' target='_blank'>
            Termini d'uso
          </a> •{' '}
          <a href='https://trimet.org/legal/privacy.htm' target='_blank'>
            Privacy Policy
          </a>
        </div>
      </div>
    ),
    LegIcon: TriMetLegIcon,
    ModeIcon: ClassicModeIcon
  }
}
