import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import logoPlaceholder from '../../images/credits/logo-placeholder.png'

class ModalCredits extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showCredits: false
    }
  }

  render () {
    const { t, show} = this.props

    return (
        <Modal bsSize="large" show={show} onHide={ () => this.props.onClose() }>
          <Modal.Header closeButton>
            <Modal.Title>{t('credits_title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 className="credits-title">{t('credits_title_developed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_designed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_data_provided')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
    )
  }
}

export default withNamespaces()(ModalCredits)
