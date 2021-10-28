import React, { Component } from "react";
import PropTypes from "prop-types";

import ToggleSwitch from "../toggle-switch"

class LocationFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="otp-ui-locationFilter">
                <div className="otp-ui-locationFilter__header">
                    <h4 className="otp-ui-locationFilter__title">{this.props.title}</h4>
                    <button className="otp-ui-locationFilter__close" onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        this.props.onClose()
                    }}></button>
                </div>
                <button className="otp-ui-locationFilter__activeAll">Attiva tutti</button>
                <div className="otp-ui-locationFilter__container">
                    <div className="otp-ui-locationFilter__group">
                        <div className="otp-ui-locationFilter__group">
                            <div className="otp-ui-locationFilter__label">Label</div>
                            <div className="otp-ui-locationFilter__panel">

                            </div>
                        </div>
                    </div>
                    <div className="otp-ui-locationFilter__group">
                        <div className="otp-ui-locationFilter__group">
                            <div className="otp-ui-locationFilter__label">Label</div>
                            <div className="otp-ui-locationFilter__panel">

                            </div>
                        </div>
                    </div>
                    <div className="otp-ui-locationFilter__group">
                        <div className="otp-ui-locationFilter__group">
                            <div className="otp-ui-locationFilter__label">Label</div>
                            <div className="otp-ui-locationFilter__panel">

                            </div>
                        </div>
                    </div>
                    {/* {
                        filters.map((child, i) => {
                            console.log(child)
                            return (      
                                <ToggleSwitch 
                                    key={i}
                                    label={child.props.name}
                                    value={child.props.value}
                                    checked={child.props.visible}
                                    onChange={this.onOverlayToggle}
                                />                                
                            );
                        })
                    } */}
                </div>
            </div>
        )
    }
}

LocationFilter.propTypes = {
    title: PropTypes.string,
    filters: PropTypes.array,
    onClose: PropTypes.func,
}

LocationFilter.defaultProps = {    
    title: '',
    filters: [],
    onClose: () => {}
}

export default LocationFilter
