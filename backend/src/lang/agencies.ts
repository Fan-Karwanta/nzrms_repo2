import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_AGENCY: 'Nouvelle agence',
    AGENCY: 'agence',
    AGENCIES: 'agences',
  },
  en: {
    NEW_AGENCY: 'New AGENT',
    AGENCY: 'AGENT',
    AGENCIES: 'total agents',
  },
})

langHelper.setLanguage(strings)
export { strings }
