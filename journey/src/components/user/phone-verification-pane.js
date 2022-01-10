import React from 'react'
import { Alert, FormControl, FormGroup } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

/**
 * User phone verification pane.
 * TODO: to be completed.
 */
const PhoneVerificationPane = ({ t }) => (
  <div>
    <Alert bsStyle='warning'>
      <strong>{t('under_construction')}</strong>
    </Alert>
    <p>{t('please_check_your_mobile_phone_sms_messaging_app_for_a_text_message_with_a_verification_code_and_copy_the_code_below')}</p>
    <FormGroup bsSize='large'>
      <FormControl type='number' placeholder='_ _ _ _ _ _' />
    </FormGroup>
  </div>
)

export default withNamespaces()(PhoneVerificationPane)
