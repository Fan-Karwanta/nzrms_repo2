import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    DASHBOARD: 'Tableau de bord',
    HOME: 'Accueil',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Lieux',
    PROPERTIES: 'Propriétés',
    USERS: 'Utilisateurs',
    ABOUT: 'À propos',
    TOS: "Conditions d'utilisation",
    CONTACT: 'Contact',
    LANGUAGE: 'Langue',
    SETTINGS: 'Paramètres',
    SIGN_OUT: 'Déconnexion',
    COUNTRIES: 'Pays',
    REPORTS_ANALYTICS: 'Rapports & Analyses',
  },
  en: {
    DASHBOARD: 'Dashboard',
    HOME: 'Home',
    AGENCIES: 'Agents',
    LOCATIONS: 'Locations',
    PROPERTIES: 'Properties',
    USERS: 'Users',
    ABOUT: 'About',
    TOS: 'Terms of Service',
    CONTACT: 'Contact',
    LANGUAGE: 'Language',
    SETTINGS: 'Settings',
    SIGN_OUT: 'Sign out',
    COUNTRIES: 'Countries',
    REPORTS_ANALYTICS: 'Reports & Analytics',
  },
})

langHelper.setLanguage(strings)
export { strings }
