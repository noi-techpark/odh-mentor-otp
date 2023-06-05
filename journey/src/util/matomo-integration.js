// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import "../styles/cookieconsent/cookieconsent.css";
import "./cookieconsent.js";

const MatomoIntegration = ({ t }) => {
  const { trackPageView } = useMatomo()

  React.useEffect(() => {
    const cc = window.initCookieConsent();

    cc.run({
      current_lang : "en",
      autoclear_cookies : true,
      cookie_expiration : 365,
      page_scripts: true,
  
      gui_options: {
          consent_modal: {
              layout: 'box',
              position: 'bottom right',
              transition: 'slide'
          },
          settings_modal: {
              layout: 'box',
              transition: 'slide'
          }
      },
  
      onFirstAction: function() {},
  
      onAccept: function (cookie) {
        if (cookie.categories.includes("targeting")) trackPageView();
      },
  
      onChange: function (cookie, changed_preferences) {},
  
      languages: {
          'en': {
              consent_modal: {
                  title: t("cookie_title"),
                  description: t("cookie_main_desc"),
                  primary_btn: {
                      text: t("cookie_accept_all"),
                      role: 'accept_all'
                  },
                  secondary_btn: {
                      text: t("cookie_reject_all"),
                      role: 'accept_necessary'
                  }
              },
              settings_modal: {
                  title: t("cookie_settings"),
                  save_settings_btn: t("cookie_save"),
                  accept_all_btn: t("cookie_accept_all"),
                  reject_all_btn: t("cookie_reject_all"),
                  close_btn_label: t("cookie_close"),
                  cookie_table_headers: [
                      {col1: t("cookie_name_col")},
                      {col2: t("cookie_domain_col")},
                      {col3: t("cookie_expiration_col")},
                      {col4: t("cookie_description_col")}
                  ],
                  blocks: [
                      {
                          description: t("cookie_block1_desc")
                      }, {
                          title: t("cookie_block2_title"),
                          description: t("cookie_block2_desc"),
                          toggle: {
                              value: 'necessary',
                              enabled: true,
                              readonly: true
                          }
                      }, {
                          title: t("cookie_block3_title"),
                          description: t("cookie_block3_desc"),
                          toggle: {
                              value: 'targeting',
                              enabled: false,
                              readonly: false
                          }
                      }, {
                          title: t("cookie_block4_title"),
                          description: t("cookie_block4_desc"),
                      }
                  ]
              }
          }
      }
  });

}, []);

  return ( <></> )
}

export default MatomoIntegration
