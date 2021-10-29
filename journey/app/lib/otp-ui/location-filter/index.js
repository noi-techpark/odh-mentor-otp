import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import ToggleSwitch from "../toggle-switch"

class LocationFilter extends Component {
    constructor(props) {
        super(props)

        console.log('FILTERS')
        console.log(this.props.filters)
    }

    render() {
        const { 
            t,
            title,
            filters,
            onClose
        } = this.props

        return (
            <div className="otp-ui-locationFilter">
                <div className="otp-ui-locationFilter__header">
                    <h4 className="otp-ui-locationFilter__title">{title}</h4>
                    <button className="otp-ui-locationFilter__close" onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        onClose()
                    }}></button>
                </div>
                <button className="otp-ui-locationFilter__activeAll">Attiva tutti</button>
                <div className="otp-ui-locationFilter__container">
                    {
                        Object.keys(filters).map((key, index) => {
                            const filterGroup = filters[key]

                            if (!filterGroup.enabled) return false

                            return (
                                <div className="otp-ui-locationFilter__group">
                                    <div className="otp-ui-locationFilter__label">{t(filterGroup.label)}</div>
                                    <div className="otp-ui-locationFilter__panel">
                                        {
                                            filterGroup.values.map((item, i) => {
                                                console.log(item)
                                                return (      
                                                    <ToggleSwitch 
                                                        key={`${filterGroup.label}-${i}`}
                                                        label={item.value}
                                                        value={item.value}
                                                        checked={item.enabled}
                                                        // onChange={this.onOverlayToggle}
                                                    />                                
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

LocationFilter.propTypes = {
    title: PropTypes.string,
    filters: PropTypes.object,
    onClose: PropTypes.func,
}

LocationFilter.defaultProps = {    
    title: '',
    filters: {},
    onClose: () => {}
}

export default withNamespaces()(LocationFilter)
