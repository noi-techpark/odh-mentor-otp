import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import imageLogo from '../../images/credits/logo-placeholder.png'
import interregLogo from '../../images/credits/interreg.png'
import imageLogo2 from '../../images/credits/openmove.png'
import imageLogo3 from '../../images/credits/NOI.png'
import imageLogo4 from '../../images/credits/merano.png'
import imageLogo5 from '../../images/credits/STA.png'
import imageLogo6 from '../../images/credits/ComuneMerano.png'
import imageLogo7 from '../../images/credits/ecospazio_3.png'
import imageLogo8 from '../../images/credits/papinSport.png'
import imageLogo9 from '../../images/credits/ComuneBolzano.png'
import imageLogo10 from '../../images/credits/CSAA_3.png'
import imageLogo11 from '../../images/credits/neogy.png'
import imageLogo12 from '../../images/credits/route220_3.png'
import imageLogo13 from '../../images/credits/easymobil.png'


//ADD MORE LOGO IMAGES HERE:
//import imageLogo2 from '../../images/credits/logo-2.png'
//import imageLogo3 from '../../images/credits/logo-3.png'

class ModalCredits extends Component {
  render () {
    const { t, show} = this.props
    return (
        <Modal className="credits-modal" bsSize="large" show={show} onHide={ () => this.props.onClose() }>
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
                <a href="https://www.sta.bz.it" target="_blank">
                  <img src={imageLogo5} />
                </a>
              </li>
              <li>
                <a href="https://www.comune.merano.bz.it" target="_blank">
                  <img src={imageLogo6} />
                </a>
              </li>
              <li>
                <a href="https://www.ecospazio.it/" target="_blank">
                  <img src={imageLogo7} />
                </a>
              </li>
              <li>
                <a href="https://www.papinsport.com/" target="_blank">
                  <img src={imageLogo8} />
                </a>
              </li>
              <li>
                <a href="https://www.comune.bolzano.it" target="_blank">
                  <img src={imageLogo9} />
                </a>
              </li>
              <li>
                <a href="https://www.carsharing.bz.it" target="_blank">
                  <img src={imageLogo10} />
                </a>
              </li>
              <li>
                <a href="https://neogy.it/" target="_blank">
                  <img src={imageLogo11} />
                </a>
              </li>
              <li>
                <a href="https://route220.it/" target="_blank">
                  <img src={imageLogo12} />
                </a>
              </li>
              <li>
                <a href="https://www.easymobil.it" target="_blank">
                  <img src={imageLogo13} />
                </a>
              </li>
            </ul>

            {/* END CONTENTS of CREDITS */}

          </Modal.Body>
        </Modal>
    )
  }
}
export default withNamespaces()(ModalCredits)
