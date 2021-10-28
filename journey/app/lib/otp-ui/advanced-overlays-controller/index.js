import React, { Component } from "react";
import PropTypes from "prop-types";
import { LayersControl } from "react-leaflet";

import ToggleSwitch from "../toggle-switch"

class AdvancedOverlaysController extends Component {
    constructor(props) {
        super(props);
    }

    createWrap = (el, wrapper) => {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    componentDidMount() {
        const {
            overlays,
            onFilterRequest
        } = this.props;

        const $mainContainer = document.querySelector('.leaflet-control-layers-overlays')

        overlays.map((item, index) => {
            const $wrapper = document.createElement('div')
            const $filterButton = document.createElement('button')
    
            $wrapper.classList.add('otp-ui-advanced-overlays-controller')

            $filterButton.classList.add('otp-ui-advanced-overlays-controller__filterButton')

            if (!item.props.filters) {
                $filterButton.setAttribute('disabled', 'disabled')
            }

            console.log(item)

            $filterButton.addEventListener('click', () => {
                onFilterRequest(item.props.type)
            })
    
            this.createWrap($mainContainer.children[index], $wrapper)
            $wrapper.appendChild($filterButton)
        })
    }

    render() {
        const {
            overlays
        } = this.props;

        return (
            <LayersControl>
                {
                    overlays.map((child, i) => {
                        return (                
                            <LayersControl.Overlay
                                key={i}
                                name={child.props.name}
                                checked={child.props.visible}
                            >       
                                {child}
                            </LayersControl.Overlay>
                        );
                    })
                }
            </LayersControl>
        )

        // return (
        //     <div className="otp-ui-advancedOverlaysController">
        //         <button 
        //             className="otp-ui-advancedOverlaysController__toggle"
        //             onClick={() => this.setState({ showList: true })}
        //         >
        //         </button>
        //         <div className="otp-ui-advancedOverlaysController__panel">
        //             {
        //                 overlays.map((child, i) => {
        //                     console.log(child)
        //                     return (      
        //                         <ToggleSwitch 
        //                             key={i}
        //                             label={child.props.name}
        //                             value={child.props.value}
        //                             checked={child.props.visible}
        //                             onChange={this.onOverlayToggle}
        //                         />                                
        //                     );
        //                 })
        //             }
        //         </div>
        //     </div>
        // )
    }
}

AdvancedOverlaysController.propTypes = {
    overlays: PropTypes.array,
    onFilterRequest: PropTypes.func
}

AdvancedOverlaysController.defaultProps = {    
    overlays: [],
    onFilterRequest: () => {}
}

export default AdvancedOverlaysController
