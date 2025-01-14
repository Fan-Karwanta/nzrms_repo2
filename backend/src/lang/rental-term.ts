import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    MONTHLY: 'Mensuel',
    WEEKLY: 'Hebdomadaire',
    DAILY: 'Journalier',
    YEARLY: 'Annuel',
    MONTH: 'mois',
    WEEK: 'semaine',
    DAY: 'jour',
    YEAR: 'an',
  },
  en: {
    MONTHLY: 'Rent (Monthly)',
    WEEKLY: 'Rent (Weekly)',
    DAILY: 'Rent (Daily)',
    YEARLY: 'Buy (Installment)',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    YEAR: '',
  },
})

langHelper.setLanguage(strings)
export { strings }
