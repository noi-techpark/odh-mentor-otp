"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = require("@opentripplanner/core-utils/lib/map");

var _types = require("@opentripplanner/core-utils/lib/types");

var _geocoder = _interopRequireDefault(require("../otp-ui/geocoder/src"));

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _faSolid = require("styled-icons/fa-solid");

var _throttleDebounce = require("throttle-debounce");

var _options = require("./options");

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // FIXME have a better key generator for options


let optionKey = 0;

function DefaultLocationIcon({
  locationType
}) {
  return /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    size: 13,
    type: locationType
  });
}

DefaultLocationIcon.propTypes = {
  locationType: _propTypes.default.string.isRequired
};

class LocationField extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "geocodeAutocomplete", (0, _throttleDebounce.debounce)(800, text => {
      if (!text) {
        console.warn("No text entry provided for geocode autocomplete search.");
        return;
      }

      const {
        geocoderConfig
      } = this.props;
      (0, _geocoder.default)(geocoderConfig).autocomplete({
        text
      }).then(result => {
        this.setState({
          geocodedFeatures: result.features
        });
      }).catch(err => {
        console.error(err);
      });
    }));

    _defineProperty(this, "getValueFromLocation", () => {
      const {
        hideExistingValue,
        location
      } = this.props;
      return location && !hideExistingValue ? location.name : "";
    });

    _defineProperty(this, "useCurrentLocation", () => {
      const {
        currentPosition,
        getCurrentPosition,
        onLocationSelected,
        locationType
      } = this.props;
      const location = (0, _map.currentPositionToLocation)(currentPosition);

      if (location) {
        // If geolocation is successful (i.e., user has granted app geolocation
        // permission and coords exist), set location.
        onLocationSelected({
          locationType,
          location,
          resultType: "CURRENT_LOCATION"
        });
      } else {
        // Call geolocation.getCurrentPosition and set as from/to locationType
        getCurrentPosition(locationType);
      }

      this.setState({
        menuVisible: false
      });
    });

    _defineProperty(this, "geolocationAlert", () => {
      const {
        currentPosition
      } = this.props;
      window.alert(`Geolocation either has been disabled for ${window.location.host} or is not available in your browser.\n\nReason: ${currentPosition.error.message || "Unknown reason"}`);
    });

    _defineProperty(this, "onClearButtonClick", () => {
      const {
        clearLocation,
        locationType
      } = this.props;
      clearLocation({
        locationType
      });
      this.setState({
        value: "",
        geocodedFeatures: []
      });
      /* eslint-disable-next-line */

      _reactDom.default.findDOMNode(this.inputRef).focus();

      this.onTextInputClick();
    });

    _defineProperty(this, "onDropdownToggle", () => {
      const {
        menuVisible
      } = this.state;
      this.setState({
        menuVisible: !menuVisible
      });
    });

    _defineProperty(this, "onBlurFormGroup", e => {
      // IE does not use relatedTarget, so this check handles cross-browser support.
      // see https://stackoverflow.com/a/49325196/915811
      const target = e.relatedTarget !== null ? e.relatedTarget : document.activeElement;

      if (!target || target.getAttribute("role") !== "menuitem") {
        this.setState({
          geocodedFeatures: [],
          menuVisible: false,
          value: this.getValueFromLocation()
        });
      }
    });

    _defineProperty(this, "onTextInputChange", evt => {
      this.setState({
        value: evt.target.value,
        menuVisible: true
      });
      this.geocodeAutocomplete(evt.target.value);
    });

    _defineProperty(this, "onTextInputClick", () => {
      const {
        currentPosition,
        findNearbyStops,
        geocoderConfig,
        nearbyStops,
        onTextInputClick
      } = this.props;
      if (typeof onTextInputClick === "function") onTextInputClick();
      this.setState({
        menuVisible: true
      });

      if (nearbyStops.length === 0 && currentPosition && currentPosition.coords) {
        findNearbyStops({
          lat: currentPosition.coords.latitude,
          lon: currentPosition.coords.longitude,
          max: geocoderConfig.maxNearbyStops || 4
        });
      }
    });

    _defineProperty(this, "onKeyDown", evt => {
      const {
        activeIndex,
        menuVisible
      } = this.state;

      switch (evt.key) {
        // 'Down' arrow key pressed: move selected menu item down by one position
        case "ArrowDown":
          // Suppress default 'ArrowDown' behavior which moves cursor to end
          evt.preventDefault();

          if (!menuVisible) {
            // If the menu is not visible, simulate a text input click to show it.
            this.onTextInputClick();
          } else if (activeIndex === this.menuItemCount - 1) {
            this.setState({
              activeIndex: null
            });
          } else {
            this.setState({
              activeIndex: activeIndex === null ? 0 : activeIndex + 1
            });
          }

          break;
        // 'Up' arrow key pressed: move selection up by one position

        case "ArrowUp":
          // Suppress default 'ArrowUp' behavior which moves cursor to beginning
          evt.preventDefault();

          if (activeIndex === 0) {
            this.setState({
              activeIndex: null
            });
          } else {
            this.setState({
              activeIndex: activeIndex === null ? this.menuItemCount - 1 : activeIndex - 1
            });
          }

          break;
        // 'Enter' keypress serves two purposes:
        //  - If pressed when typing in search string, switch from 'autocomplete'
        //    to 'search' geocoding
        //  - If pressed when dropdown results menu is active, apply the location
        //    associated with current selected menu item

        case "Enter":
          if (typeof activeIndex === "number") {
            // Menu is active
            // Retrieve location selection handler from lookup object and invoke
            const locationSelected = this.locationSelectedLookup[activeIndex];
            if (locationSelected) locationSelected(); // Clear selection & hide the menu

            this.setState({
              menuVisible: false,
              activeIndex: null
            });
          } else {
            // Menu not active; get geocode 'search' results
            this.geocodeSearch(evt.target.value); // Ensure menu is visible.

            this.setState({
              menuVisible: true
            });
          } // Suppress default 'Enter' behavior which causes page to reload


          evt.preventDefault();
          break;

        case "Escape":
        case "Tab":
          // Clear selection & hide the menu
          this.setState({
            menuVisible: false,
            activeIndex: null
          });
          break;
        // Any other key pressed: clear active selection

        default:
          this.setState({
            activeIndex: null
          });
          break;
      }
    });

    this.state = {
      value: this.getValueFromLocation(),
      menuVisible: false,
      geocodedFeatures: [],
      activeIndex: null
    };
  }

  componentDidUpdate(prevProps) {
    // If location is updated externally, replace value and geocoded features
    // in internal state.
    // TODO: This might be considered an anti-pattern. There may be a more
    // effective way to handle this.
    const {
      location
    } = this.props;

    if (location !== prevProps.location) {
      /* FIXME only disabled this because it'd take longer to refactor */

      /* eslint-disable-next-line */
      this.setState({
        value: location !== null ? location.name : "",
        geocodedFeatures: []
      });
    }
  }

  getFormControlClassname() {
    const {
      locationType
    } = this.props;
    return `${locationType}-form-control`;
  }
  /**
   * Gets the initial value to place in the input field.
   */


  setLocation(location, resultType) {
    const {
      onLocationSelected,
      locationType
    } = this.props;
    onLocationSelected({
      locationType,
      location,
      resultType
    });
    this.setState({
      menuVisible: false
    });
  }

  geocodeSearch(text) {
    const {
      geocoderConfig
    } = this.props;

    if (!text) {
      console.warn("No text entry provided for geocode search.");
      return;
    }

    (0, _geocoder.default)(geocoderConfig).search({
      text
    }).then(result => {
      if (result.features && result.features.length > 0) {
        // Only replace geocode items if results were found
        this.setState({
          geocodedFeatures: result.features
        });
      } else {
        console.warn("No results found for geocode search. Not replacing results.");
      }
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const {
      addLocationSearch,
      autoFocus,
      className,
      currentPosition,
      currentPositionIcon,
      currentPositionUnavailableIcon,
      GeocodedOptionIconComponent,
      geocoderConfig,
      inputPlaceholder,
      location,
      LocationIconComponent,
      locationType,
      sessionOptionIcon,
      showClearButton,
      showUserSettings,
      static: isStatic,
      stopOptionIcon,
      stopsIndex,
      suppressNearby,
      userLocationsAndRecentPlaces,
      UserLocationIconComponent,
      nearbyStops
    } = this.props;
    const {
      menuVisible,
      value
    } = this.state;
    const {
      activeIndex
    } = this.state;
    let {
      geocodedFeatures
    } = this.state;
    const maxGeocoderResults = parseInt(geocoderConfig.maxResults) || 30; //console.log('GEOCODER ff',geocoderConfig)

    if (geocodedFeatures.length > maxGeocoderResults) geocodedFeatures = geocodedFeatures.slice(0, maxGeocoderResults);
    let {
      sessionSearches
    } = this.props;
    if (sessionSearches.length > maxGeocoderResults) sessionSearches = sessionSearches.slice(0, maxGeocoderResults); // Assemble menu contents, to be displayed either as dropdown or static panel.
    // Menu items are created in four phases: (1) the current location, (2) any
    // geocoder search results; (3) nearby transit stops; and (4) saved searches

    let menuItems = []; // array of menu items for display (may include non-selectable items e.g. dividers/headings)

    let itemIndex = 0; // the index of the current location-associated menu item (excluding non-selectable items)

    this.locationSelectedLookup = {}; // maps itemIndex to a location selection handler (for use by the onKeyDown method)

    /* 1) Process geocode search result option(s) */

    if (geocodedFeatures.length > 0) {
      // Add the menu sub-heading (not a selectable item)
      // menuItems.push(<MenuItem header key='sr-header'>Search Results</MenuItem>)
      // Iterate through the geocoder results
      menuItems = menuItems.concat(geocodedFeatures.map(feature => {
        // Create the selection handler
        const locationSelected = () => {
          (0, _geocoder.default)(geocoderConfig).getLocationFromGeocodedFeature(feature).then(geocodedLocation => {
            // Set the current location
            this.setLocation(geocodedLocation, "GEOCODE"); // Add to the location search history. This is intended to
            // populate the sessionSearches array.

            addLocationSearch({
              location: geocodedLocation
            });
          });
        }; // Add to the selection handler lookup (for use in onKeyDown)


        this.locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

        const option = /*#__PURE__*/_react.default.createElement(_options.Option, {
          icon: /*#__PURE__*/_react.default.createElement(GeocodedOptionIconComponent, {
            feature: feature
          }),
          key: optionKey++,
          title: feature.properties.label,
          onClick: locationSelected,
          isActive: itemIndex === activeIndex
        });

        itemIndex++;
        return option;
      }));
    }
    /* 2) Process nearby transit stop options */


    if (nearbyStops.length > 0 && !suppressNearby) {
      // Add the menu sub-heading (not a selectable item)
      menuItems.push( /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
        header: true,
        key: "ns-header"
      }, "Nearby Stops")); // Iterate through the found nearby stops

      menuItems = menuItems.concat(nearbyStops.map(stopId => {
        // Constuct the location
        const stop = stopsIndex[stopId];
        const stopLocation = {
          id: stopId,
          lat: stop.lat,
          lon: stop.lon,
          name: stop.name
        }; // Create the location selected handler

        const locationSelected = () => {
          this.setLocation(stopLocation, "STOP");
        }; // Add to the selection handler lookup (for use in onKeyDown)


        this.locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

        const option = /*#__PURE__*/_react.default.createElement(_options.TransitStopOption, {
          isActive: itemIndex === activeIndex,
          key: optionKey++,
          onClick: locationSelected,
          stop: stop,
          stopOptionIcon: stopOptionIcon
        });

        itemIndex++;
        return option;
      }));
    }
    /* 3) Process recent search history options */


    if (sessionSearches.length > 0) {
      // Add the menu sub-heading (not a selectable item)
      menuItems.push( /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
        header: true,
        key: "ss-header"
      }, "Recently Searched")); // Iterate through any saved locations

      menuItems = menuItems.concat(sessionSearches.map(sessionLocation => {
        // Create the location-selected handler
        const locationSelected = () => {
          this.setLocation(sessionLocation, "SESSION");
        }; // Add to the selection handler lookup (for use in onKeyDown)


        this.locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

        const option = /*#__PURE__*/_react.default.createElement(_options.Option, {
          icon: sessionOptionIcon,
          key: optionKey++,
          title: sessionLocation.name,
          onClick: locationSelected,
          isActive: itemIndex === activeIndex
        });

        itemIndex++;
        return option;
      }));
    }
    /* 3b) Process stored user locations */


    if (userLocationsAndRecentPlaces.length > 0 && showUserSettings) {
      // Add the menu sub-heading (not a selectable item)
      menuItems.push( /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
        header: true,
        key: "mp-header"
      }, "My Places")); // Iterate through any saved locations

      menuItems = menuItems.concat(userLocationsAndRecentPlaces.map(userLocation => {
        // Create the location-selected handler
        const locationSelected = () => {
          this.setLocation(userLocation, "SAVED");
        }; // Add to the selection handler lookup (for use in onKeyDown)


        this.locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

        const option = /*#__PURE__*/_react.default.createElement(_options.Option, {
          icon: /*#__PURE__*/_react.default.createElement(UserLocationIconComponent, {
            userLocation: userLocation
          }),
          key: optionKey++,
          title: (0, _map.formatStoredPlaceName)(userLocation),
          onClick: locationSelected,
          isActive: itemIndex === activeIndex
        });

        itemIndex++;
        return option;
      }));
    }
    /* 4) Process the current location */


    let locationSelected;
    let optionIcon;
    let optionTitle;
    let positionUnavailable;

    if (currentPosition && !currentPosition.error) {
      // current position detected successfully
      locationSelected = this.useCurrentLocation;
      optionIcon = currentPositionIcon;
      optionTitle = "$_use_current_position_$";
      positionUnavailable = false;
    } else {
      // error detecting current position
      locationSelected = this.geolocationAlert;
      optionIcon = currentPositionUnavailableIcon;
      optionTitle = "Current location not available";
      positionUnavailable = true;
    } // Add to the selection handler lookup (for use in onKeyDown)


    this.locationSelectedLookup[itemIndex] = locationSelected;

    if (!suppressNearby) {
      // Create and add the option item to the menu items array
      const currentLocationOption = /*#__PURE__*/_react.default.createElement(_options.Option, {
        icon: optionIcon,
        key: optionKey++,
        title: optionTitle,
        onClick: locationSelected,
        isActive: itemIndex === activeIndex,
        disabled: positionUnavailable
      });

      menuItems.push(currentLocationOption);
      itemIndex++;
    } // Store the number of location-associated items for reference in the onKeyDown method


    this.menuItemCount = itemIndex;
    /** the text input element * */
    // Use this text for aria-label below.

    const defaultPlaceholder = inputPlaceholder || locationType;
    const placeholder = currentPosition && currentPosition.fetching ? "Fetching location..." : defaultPlaceholder;

    const textControl = /*#__PURE__*/_react.default.createElement(Styled.Input, {
      ref: ref => {
        this.inputRef = ref;
      },
      "aria-label": defaultPlaceholder,
      autoFocus: autoFocus,
      className: this.getFormControlClassname(),
      value: value,
      placeholder: placeholder,
      onChange: this.onTextInputChange,
      onClick: this.onTextInputClick,
      onKeyDown: this.onKeyDown
    }); // Only include the clear ('X') button add-on if a location is selected
    // or if the input field has text.


    const clearButton = showClearButton && location ? /*#__PURE__*/_react.default.createElement(Styled.InputGroupAddon, null, /*#__PURE__*/_react.default.createElement(Styled.Button, {
      "aria-label": "Clear location",
      onClick: this.onClearButtonClick
    }, /*#__PURE__*/_react.default.createElement(_faSolid.Times, {
      size: 13
    }))) : null;

    if (isStatic) {
      // 'static' mode (menu is displayed alongside input, e.g., for mobile view)
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className
      }, /*#__PURE__*/_react.default.createElement(Styled.FormGroup, null, /*#__PURE__*/_react.default.createElement(Styled.InputGroup, null, /*#__PURE__*/_react.default.createElement(Styled.InputGroupAddon, null, /*#__PURE__*/_react.default.createElement(LocationIconComponent, {
        locationType: locationType
      })), textControl, clearButton)), /*#__PURE__*/_react.default.createElement(Styled.StaticMenuItemList, null, menuItems.length > 0 ? // Show typing prompt to avoid empty screen
      menuItems : /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
        header: true,
        centeredText: true
      }, "Begin typing to search for locations")));
    } // default display mode with dropdown menu


    return /*#__PURE__*/_react.default.createElement(Styled.FormGroup, {
      onBlur: this.onBlurFormGroup,
      className: className
    }, /*#__PURE__*/_react.default.createElement(Styled.InputGroup, null, /*#__PURE__*/_react.default.createElement(Styled.Dropdown, {
      locationType: locationType,
      open: menuVisible,
      onToggle: this.onDropdownToggle,
      title: /*#__PURE__*/_react.default.createElement(LocationIconComponent, {
        locationType: locationType
      })
    }, menuItems), textControl, clearButton));
  }

}

LocationField.propTypes = {
  /**
   * Dispatched upon selecting a geocoded result
   * Provides an argument in the format:
   *
   * ```js
   * { location: geocodedLocation }
   * ```
   */
  addLocationSearch: _propTypes.default.func,

  /**
   * Determines whether the input field of this component should auto-focus on first display.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Used for additional styling with styled components for example.
   */
  className: _propTypes.default.string,

  /**
   * Dispatched whenever the clear location button is clicked.
   * Provides an argument in the format:
   *
   * ```js
   * { locationType: string }
   * ```
   */
  clearLocation: _propTypes.default.func,

  /**
   * The current position of the user if it is available.
   */
  currentPosition: _propTypes.default.shape({
    coords: _propTypes.default.shape({
      latitude: _propTypes.default.number,
      longitude: _propTypes.default.number
    }),
    error: _propTypes.default.string,
    fetching: _propTypes.default.bool
  }),

  /**
   * A slot for the icon to display for the current position
   */
  currentPositionIcon: _propTypes.default.node,

  /**
   * A slot for the icon to display for when the current position is unavailable
   */
  currentPositionUnavailableIcon: _propTypes.default.node,

  /**
   * Invoked whenever the currentPosition is set, but the nearbyStops are not.
   * Sends the following argument:
   *
   * ```js
   * {
   *   lat: currentPosition.coords.latitude,
   *   lon: currentPosition.coords.longitude,
   *   max: geocoderConfig.maxNearbyStops || 4
   * }
   * ```
   */
  findNearbyStops: _propTypes.default.func,

  /**
   * A slot for a compnent that can be used to display a custom icon for a
   * geocoded option. This component is passed a single property called
   * `feature` which will be in the geocodedFeatureType shape.
   */
  GeocodedOptionIconComponent: _propTypes.default.elementType,

  /**
   * A configuration object describing what geocoder should be used.
   */
  geocoderConfig: _propTypes.default.shape({
    baseUrl: _propTypes.default.string,
    boundary: _propTypes.default.shape({
      // TriMet-specific default
      rect: _propTypes.default.shape({
        minLon: _propTypes.default.number,
        maxLon: _propTypes.default.number,
        minLat: _propTypes.default.number,
        maxLat: _propTypes.default.number
      })
    }),
    maxResults: _propTypes.default.number,
    maxNearbyStops: _propTypes.default.number,
    type: _propTypes.default.string.isRequired
  }).isRequired,

  /**
   * This is dispatched when the current position is null. This indicates that
   * the user has requested to use the current position, but that the current
   * position is not currently available. This method sends back the
   * locationType value supplied to the component.
   */
  getCurrentPosition: _propTypes.default.func.isRequired,

  /**
   * Whether the provided location (if one is provided) should not be shown upon
   * initial render.
   */
  hideExistingValue: _propTypes.default.bool,

  /**
   * Placeholder text to show in the input element. If the current position is
   * set to have a true fetching property, then the text "Fetching location..."
   * will display. If this value isn't provided, the locationType will be shown.
   */
  inputPlaceholder: _propTypes.default.string,

  /**
   * The location that this component is currently set with.
   */
  location: _propTypes.default.shape({
    lat: _propTypes.default.number,
    lon: _propTypes.default.number,
    name: _propTypes.default.string
  }),

  /**
   * A custom component for rendering the icon displayed to the left of the text
   * input. This component is passed a single prop of `locationType`.
   */
  LocationIconComponent: _propTypes.default.elementType,

  /**
   * Either `from` or `to`
   */
  locationType: _propTypes.default.string.isRequired,

  /**
   * A list of stopIds of the stops that should be shown as being nearby. These
   * must be referencable in the stopsIndex prop.
   */
  nearbyStops: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * Invoked whenever the text input is clicked or when the clear button is
   * clicked.
   */
  onTextInputClick: _propTypes.default.func,

  /**
   * A function to handle when a location is selected. This is always dispatched
   * with an object of the following form:
   *
   * ```js
   * {
   *  locationType: string,
   *  location: object,
   *  resultType: string
   * }
   * '''
   *
   * The locationType string will be either "from" or "to" as was set by the
   * locationType prop for the instance of this component.
   *
   * The location object will be an object in the form below:
   * ```js
   * {
   *  id: string, // only populated for stops and user-saved locations
   *  lat: number,
   *  lon: number,
   *  name: string
   * }
   *
   * The resultType string indicates the type of location that was selected.
   * It can be one of the following:
   *
   * "CURRENT_LOCATION": The user's current location.
   * "GEOCODE": A location that was found via a geocode search result
   * "SAVED": A location that was saved by the user.
   * "SESSION": A geocoded search result that was recently selected by the user.
   * "STOP": A transit stop
   */
  onLocationSelected: _propTypes.default.func.isRequired,

  /**
   * A slot for the icon to display for an option that was used during the
   * current session.
   */
  sessionOptionIcon: _propTypes.default.node,

  /**
   * A list of recent searches to show to the user. These are typically only
   * geocode results that a user has previously selected.
   */
  sessionSearches: _propTypes.default.arrayOf(_propTypes.default.shape({
    lat: _propTypes.default.number.isRequired,
    lon: _propTypes.default.number.isRequired,
    name: _propTypes.default.string.isRequired
  })),

  /**
   * Whether or not to show the clear button
   */
  showClearButton: _propTypes.default.bool,

  /**
   * Whether or not to show user settings dialog
   */
  showUserSettings: _propTypes.default.bool,

  /**
   * show autocomplete options as fixed/inline element rather than dropdown
   */
  static: _propTypes.default.bool,

  /**
   * An index of stops by StopId
   */
  stopsIndex: _propTypes.default.objectOf(_types.transitIndexStopWithRoutes),

  /**
   * A slot for the icon to display for a stop option
   */
  stopOptionIcon: _propTypes.default.node,

  /**
   * If true, do not show nearbyStops or current location as options
   */
  suppressNearby: _propTypes.default.bool,

  /**
   * An array of recent locations and places a user has searched for.
   */
  userLocationsAndRecentPlaces: _propTypes.default.arrayOf(_types.userLocationType),

  /**
   * A custom component for rendering the icon for options that are either saved
   * user locations or recent places. The component will be sent a single prop
   * of `userLocation` which is a userLocationType.
   */
  UserLocationIconComponent: _propTypes.default.elementType
};
LocationField.defaultProps = {
  autoFocus: false,
  addLocationSearch: () => {},
  className: null,
  clearLocation: () => {},
  currentPosition: null,
  currentPositionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.LocationArrow, {
    size: 13
  }),
  currentPositionUnavailableIcon: /*#__PURE__*/_react.default.createElement(_faSolid.Ban, {
    size: 13
  }),
  findNearbyStops: () => {},
  GeocodedOptionIconComponent: _options.GeocodedOptionIcon,
  hideExistingValue: false,
  inputPlaceholder: null,
  location: null,
  LocationIconComponent: DefaultLocationIcon,
  nearbyStops: [],
  onTextInputClick: null,
  sessionOptionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.Search, {
    size: 13
  }),
  sessionSearches: [],
  showClearButton: true,
  showUserSettings: false,
  static: false,
  stopOptionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.Bus, {
    size: 13
  }),
  stopsIndex: null,
  suppressNearby: false,
  userLocationsAndRecentPlaces: [],
  UserLocationIconComponent: _options.UserLocationIcon
};
var _default = LocationField;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js