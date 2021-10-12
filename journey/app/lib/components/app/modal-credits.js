import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import imageLogo from '../../images/credits/logo-placeholder.png'
import interregLogo from '../../images/credits/interreg.png'
import imageLogo2 from '../../images/credits/openmove.png'
import imageLogo3 from '../../images/credits/NOI.png'
import imageLogo4 from '../../images/credits/AzSoggiorno.png'

//ADD MORE LOGO IMAGES HERE:
//import imageLogo2 from '../../images/credits/logo-2.png'
//import imageLogo3 from '../../images/credits/logo-3.png'

class ModalCredits extends Component {
  render () {
    const { t, show} = this.props
    return (
        <Modal bsSize="large" show={show} onHide={ () => this.props.onClose() }>
          <Modal.Header closeButton><Modal.Title>{t('credits_title')}</Modal.Title></Modal.Header>
          <Modal.Body>

          <img src={interregLogo} />

          {/* START CONTENTS of CREDITS */}

            <h6 className="credits-title">{t('credits_title_developed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="https://www.openmove.com/" target="_blank">
                  <img src={imageLogo2} />
                </a>
              </li>
              <li>
                <a href="https://noi.bz.it/" target="_blank">
                  <img src={imageLogo3} />
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_designed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="https://www.merano-suedtirol.it" target="_blank">
                  <img src={imageLogo4} />
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_data_provided')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={imageLogo} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={imageLogo} />
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_supported')}</h6>

            {/* END CONTENTS of CREDITS */}

          </Modal.Body>
        </Modal>
    )
  }
}
export default withNamespaces()(ModalCredits)
