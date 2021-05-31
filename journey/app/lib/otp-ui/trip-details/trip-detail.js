import PropTypes from "prop-types";
import React, { Component } from "react";
import { QuestionCircle } from "@styled-icons/fa-solid";
import { Button, Popover, OverlayTrigger } from 'react-bootstrap'

export default class TripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggle = () => {
    const { expanded } = this.state;
    if (expanded) this.onHideClick();
    else this.onExpandClick();
  };

  onExpandClick = () => {
    this.setState({ expanded: true });
  };

  onHideClick = () => {
    this.setState({ expanded: false });
  };

  render() {
    const { icon, summary, description } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        {icon} {summary}
        {description && (
          <OverlayTrigger
            trigger="click"
            placement="right"
            rootClose
            overlay={
              <Popover>{description}</Popover>
            }
          >
            <Button bsStyle="link" style={{
              paddingTop: 0,
              paddingBottom: 0,
              verticalAlign: 'bottom'
            }}>
              <QuestionCircle size="16px"/>
            </Button>
          </OverlayTrigger>
        )}
      </div>
    );
  }
}

TripDetail.propTypes = {
  icon: PropTypes.node.isRequired,
  summary: PropTypes.node.isRequired,
  description: PropTypes.node
};

TripDetail.defaultProps = {
  description: undefined
};
