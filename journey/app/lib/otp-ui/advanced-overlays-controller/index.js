import React, { Component } from "react";
import PropTypes from "prop-types";
import { LayersControl } from "react-leaflet";

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
