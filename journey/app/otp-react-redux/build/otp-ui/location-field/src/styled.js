"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopRoutes = exports.StopName = exports.StopIconAndDistanceContainer = exports.StopDistance = exports.StopContentContainer = exports.StaticMenuItemList = exports.RouteName = exports.OptionIconContainer = exports.OptionContent = exports.OptionContainer = exports.MenuItemList = exports.MenuItemLi = exports.MenuItemHeader = exports.MenuItemA = exports.MenuItem = exports.InputGroupAddon = exports.InputGroup = exports.Input = exports.FormGroup = exports.DropdownContainer = exports.DropdownButton = exports.Dropdown = exports.ClearBoth = exports.Button = exports.BaseButton = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BaseButton = _styledComponents.default.button`
  border: none;
  background: none;
`;
exports.BaseButton = BaseButton;
const Button = (0, _styledComponents.default)(BaseButton)`
  color: #888;
  margin: 0;
  padding: 2px 5px;
`;
exports.Button = Button;
const ClearBoth = _styledComponents.default.div`
  clear: both;
`;
exports.ClearBoth = ClearBoth;

const Dropdown = ({
  children,
  locationType,
  open,
  onToggle,
  title
}) => {
  const dropdownButtonAriaLabel = `List the suggested ${locationType} locations as you type`;
  return /*#__PURE__*/_react.default.createElement(DropdownContainer, null, /*#__PURE__*/_react.default.createElement(DropdownButton, {
    "aria-label": dropdownButtonAriaLabel,
    onClick: onToggle
  }, title), open && /*#__PURE__*/_react.default.createElement(MenuItemList, null, children));
};

exports.Dropdown = Dropdown;
Dropdown.propTypes = {
  children: _propTypes.default.node.isRequired,
  locationType: _propTypes.default.string.isRequired,
  open: _propTypes.default.bool.isRequired,
  onToggle: _propTypes.default.func,
  title: _propTypes.default.node.isRequired
};
Dropdown.defaultProps = {
  onToggle: () => {}
};
const DropdownButton = (0, _styledComponents.default)(BaseButton)`
  width: 30px;
`;
exports.DropdownButton = DropdownButton;
const DropdownContainer = _styledComponents.default.span`
  position: relative;
`;
exports.DropdownContainer = DropdownContainer;
const FormGroup = _styledComponents.default.div`
  border-collapse: separate;
  display: table;
  margin-bottom: 15px;
  position: relative;
`;
exports.FormGroup = FormGroup;
const Input = _styledComponents.default.input`
  border: none;
  box-shadow: none;
  font-size: 17px;
  outline: none;
`;
exports.Input = Input;
const InputGroup = _styledComponents.default.span`
  border-bottom: 1px solid #000;
  border-collapse: separate;
  display: table;
  position: relative;
`;
exports.InputGroup = InputGroup;
const InputGroupAddon = _styledComponents.default.span`
  background: none;
  border-radius: 4px;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  padding: 6px 12px;
  text-align: center;
`;
exports.InputGroupAddon = InputGroupAddon;

class MenuItem extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", () => {
      const {
        disabled,
        onClick
      } = this.props;
      if (!disabled) onClick();
    });
  }

  render() {
    const {
      active,
      centeredText,
      children,
      disabled,
      header
    } = this.props;
    return header ? /*#__PURE__*/_react.default.createElement(MenuItemHeader, {
      centeredText: centeredText
    }, children) : /*#__PURE__*/_react.default.createElement(MenuItemLi, {
      disabled: disabled,
      role: "presentation"
    }, /*#__PURE__*/_react.default.createElement(MenuItemA, {
      active: active,
      onClick: this.onClick,
      role: "menuitem",
      tabIndex: -1
    }, children));
  }

}

exports.MenuItem = MenuItem;
MenuItem.propTypes = {
  active: _propTypes.default.bool,
  centeredText: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  disabled: _propTypes.default.bool,
  header: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
MenuItem.defaultProps = {
  active: false,
  centeredText: false,
  disabled: false,
  header: false,
  onClick: null
};
const MenuItemA = _styledComponents.default.a`
  background-color: ${props => props.active ? "#337ab7" : "transparent"};
  clear: both;
  color: ${props => props.active ? "#fff" : "#333"};
  display: block;
  font-weight: 400;
  line-height: 1.42857143;
  padding: 3px 20px;
  text-decoration: none;
  white-space: nowrap;
`;
exports.MenuItemA = MenuItemA;
const MenuItemHeader = _styledComponents.default.li`
  color: navy;
  display: block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.42857143;
  padding: 3px 20px;
  text-align: ${props => props.centeredText ? "center" : "left"};
  white-space: nowrap;
`;
exports.MenuItemHeader = MenuItemHeader;
const MenuItemLi = _styledComponents.default.li`
  &:hover {
    background-color: ${props => !props.disabled && "#f5f5f5"};
  }
`;
exports.MenuItemLi = MenuItemLi;
const MenuItemList = _styledComponents.default.ul`
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  float: left;
  font-size: 14px;
  left: 0;
  list-style: none;
  margin: 2px 0 0;
  min-width: 160px;
  padding: 5px 0;
  position: absolute;
  text-align: left;
  top: 100%;
  z-index: 1000;
`;
exports.MenuItemList = MenuItemList;
const OptionContainer = _styledComponents.default.div`
  padding-top: 5px;
  padding-bottom: 3px;
`;
exports.OptionContainer = OptionContainer;
const OptionContent = _styledComponents.default.div`
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
exports.OptionContent = OptionContent;
const OptionIconContainer = _styledComponents.default.div`
  float: left;
`;
exports.OptionIconContainer = OptionIconContainer;
const RouteName = _styledComponents.default.span`
  background-color: gray;
  color: white;
  padding: 2px 3px 0px;
  margin-right: 5px;
`;
exports.RouteName = RouteName;
const StaticMenuItemList = (0, _styledComponents.default)(MenuItemList)`
  border: none;
  box-shadow: none;
  display: block;
  position: static;

  li:hover {
    background-color: transparent;
  }
`;
exports.StaticMenuItemList = StaticMenuItemList;
const StopContentContainer = _styledComponents.default.div`
  margin-left: 30px;
`;
exports.StopContentContainer = StopContentContainer;
const StopDistance = _styledComponents.default.div`
  font-size: 8px;
`;
exports.StopDistance = StopDistance;
const StopIconAndDistanceContainer = _styledComponents.default.div`
  float: left;
  padding-top: 3px;
`;
exports.StopIconAndDistanceContainer = StopIconAndDistanceContainer;
const StopName = _styledComponents.default.div``;
exports.StopName = StopName;
const StopRoutes = _styledComponents.default.div`
  font-size: 9px;
`;
exports.StopRoutes = StopRoutes;

//# sourceMappingURL=styled.js