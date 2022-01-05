import React, { Component } from "react";
import PropTypes from "prop-types";

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            label,
            checked,
            onChange,
            value
        } = this.props;

        return (            
            <label title={title} className="otp-ui-toggleSwitch">
                <div>
                    <input 
                        type="checkbox"
                        className="otp-ui-toggleSwitch__selector"  
                        checked={checked}
                        value={value}
                        onChange={() => onChange(value)}                       
                    />
                    <span>{label}</span>
                </div>
            </label>            
        )
    }
}

ToggleSwitch.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

ToggleSwitch.defaultProps = {
    label: '',
    title: '',
    value: undefined,
    checked: false,
    onChange: () => {}
}

export default ToggleSwitch
