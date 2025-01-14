import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_BOOKING: 'Nouvelle réservation',
  },
  en: {
    NEW_BOOKING: 'New Entry',
  },
})

langHelper.setLanguage(strings)
export { strings }
