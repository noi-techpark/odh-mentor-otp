// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// import this polyfill in order to make webapp compatible with IE 11
import 'es6-math'

import { hot } from 'react-hot-loader/root'

// import necessary React/Redux libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { I18nextProvider } from "react-i18next";
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import ReactGA from 'react-ga'

// import OTP-RR components
import { createHashHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import createOtpReducer from './reducers/create-otp-reducer'
import createUserReducer from './reducers/create-user-reducer'

// CSS imports
import './styles/index.scss'

import i18n from "./i18n";
import JourneyWebapp from './app'

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

// load the OTP configuration
const otpConfig = require(YAML_CONFIG)
// const { whyDidYouUpdate } = require('why-did-you-update')
// whyDidYouUpdate(React)

// const initialQuery = {
//   from: {
//     lat: 45.5246,
//     lon: -122.6710
//   },
//   to: {
//     lat: 45.5307,
//     lon: -122.6647
//   },
//   type: 'ITINERARY'
// }

const history = createHashHistory()

const middleware = [
  thunk,
  routerMiddleware(history) // for dispatching history actions
]

// check if webpack is being ran in development mode. If so, enable redux-logger
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

// set up the Redux store
const store = createStore(
  combineReducers({
    otp: createOtpReducer(otpConfig),
    user: createUserReducer(otpConfig),
    router: connectRouter(history) // add optional initial query here
  }),
  compose(applyMiddleware(...middleware))
)

let matomoInstance = null;

if (otpConfig.analytics?.matomo?.baseUrl && otpConfig.analytics?.matomo?.siteId) {
  matomoInstance = createInstance({
    urlBase: otpConfig.analytics.matomo.baseUrl,
    siteId: otpConfig.analytics.matomo.siteId,
    // trackerUrl: 'https://digital.matomo.cloud/tracking.php', // optional, default value: `${urlBase}matomo.php`
    // srcUrl: 'https://digital.matomo.cloud/tracking.js', // optional, default value: `${urlBase}matomo.js`
    // disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    // linkTracking: true, // optional, default value: true
  });
}

// render the app
const render = App => ReactDOM.render(
  <Provider store={store}>
    {matomoInstance ? (
      <MatomoProvider value={matomoInstance}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </MatomoProvider>
    ) : (
      <I18nextProvider i18n={i18n}>
          <App />
      </I18nextProvider>
    )}
  </Provider>,
  document.getElementById('main')
)

// The package react-hot-loader package says that it is fine to use the tool in
// production mode: https://www.npmjs.com/package/react-hot-loader#install
//
// "Note: You can safely install react-hot-loader as a regular dependency
// instead of a dev dependency as it automatically ensures it is not executed in
// production and the footprint is minimal."
//
// There have been some issues noticed with changing font-awesome icons while
// react-hot-loader is enabled. A refresh of the page/build script may be
// necessary in rare occasions.
hot(
  render(JourneyWebapp)
)

// analytics
if (otpConfig.analytics?.google?.globalSiteTag) {
  ReactGA.initialize(otpConfig.analytics.google.globalSiteTag)
  ReactGA.pageview(window.location.pathname + window.location.search)
}
