import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import ToggleSwitch from "../toggle-switch"

class LocationFilter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { 
            t,
            title,
            filters,
            show,
            onClose,
            onChange,
            onReset
        } = this.props

        return (
            <div className={`otp-ui-locationFilter ${show ? 'is-visible' : ''}`}>
                <div className="otp-ui-locationFilter__header">
                    <h4 className="otp-ui-locationFilter__title">{title}</h4>
                    <button className="otp-ui-locationFilter__close" onClick={onClose}></button>
                </div>
                <button className="otp-ui-locationFilter__activeAll" onClick={onReset}>{t('reset_filters')}</button>
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
                                                return (      
                                                    <ToggleSwitch 
                                                        key={`${filterGroup.label}-${i}`}
                                                        label={item.label||item.value}
                                                        value={item.value}
                                                        checked={item.enabled}
                                                        onChange={() => onChange(key, item.value)}
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
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onChange: PropTypes.func,    
    onReset: PropTypes.func    
}

LocationFilter.defaultProps = {    
    title: '',
    filters: {},
    show: false,
    onClose: () => {},
    onChange: () => {},
    onReset: () => {}
}

export default withNamespaces()(LocationFilter)
