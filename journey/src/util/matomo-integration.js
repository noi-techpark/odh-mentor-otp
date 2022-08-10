import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const MatomoIntegration = () => {
  const { trackPageView } = useMatomo()

  React.useEffect(() => {
    trackPageView()
  }, [])

  return ( <></> )
}

export default MatomoIntegration
