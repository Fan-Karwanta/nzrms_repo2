import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'

import { frFR as corefrFR, enUS as coreenUS } from '@mui/material/locale'
import { frFR, enUS } from '@mui/x-date-pickers/locales'
import { frFR as dataGridfrFR, enUS as dataGridenUS } from '@mui/x-data-grid/locales'
import { disableDevTools } from ':disable-react-devtools'
import * as helper from '@/common/helper'
import * as UserService from '@/services/UserService'
import { strings as commonStrings } from '@/lang/common'
import env from '@/config/env.config'
import App from '@/App'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '@/assets/css/theme.css'
import '@/assets/css/common.css'
import '@/assets/css/forms.css'
import '@/assets/css/cards.css'
import '@/assets/css/tables.css'
import '@/assets/css/buttons.css'
import '@/assets/css/layout.css'
import '@/assets/css/modals.css'
import '@/assets/css/alerts.css'
import '@/assets/css/navigation.css'
import '@/assets/css/loaders.css'
import '@/assets/css/tooltips.css'
import '@/assets/css/utilities.css'
import '@/assets/css/dashboard.css'
import '@/assets/css/index.css'

if (import.meta.env.VITE_NODE_ENV === 'production') {
  disableDevTools()
}

let language = env.DEFAULT_LANGUAGE
const user = JSON.parse(localStorage.getItem('mi-user') ?? 'null')
let lang = UserService.getQueryLanguage()

if (lang) {
  if (!env.LANGUAGES.includes(lang)) {
    lang = localStorage.getItem('mi-language')

    if (lang && !env.LANGUAGES.includes(lang)) {
      lang = env.DEFAULT_LANGUAGE
    }
  }

  try {
    if (user) {
      language = user.language
      if (lang && lang.length === 2 && user.language !== lang) {
        const data = {
          id: user.id,
          language: lang,
        }

        const status = await UserService.validateAccessToken()

        if (status === 200) {
          const _status = await UserService.updateLanguage(data)
          if (_status !== 200) {
            helper.error(null, commonStrings.CHANGE_LANGUAGE_ERROR)
          }
        }

        language = lang
      }
    } else if (lang) {
      language = lang
    }
    UserService.setLanguage(language)
    commonStrings.setLanguage(language)
  } catch (err) {
    helper.error(err, commonStrings.CHANGE_LANGUAGE_ERROR)
  }
}

language = UserService.getLanguage()
const isFr = language === 'fr'

const theme = createTheme(
  {
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
      },
    },
    palette: {
      primary: {
        main: '#00A86B', // Jade Green
        light: '#4CD194',
        dark: '#007C4E',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#50C878', // Emerald Green
        light: '#7AD599',
        dark: '#3A9359',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#FF5252',
        light: '#FF7E7E',
        dark: '#D32F2F',
      },
      warning: {
        main: '#FFC107',
        light: '#FFD54F',
        dark: '#FFA000',
      },
      info: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
      },
      success: {
        main: '#00A86B',
        light: '#4CD194',
        dark: '#007C4E',
      },
      background: {
        default: '#FAFAFA',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#121212',
        secondary: '#757575',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.03)',
      '0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.03),0px 1px 5px 0px rgba(0,0,0,0.03)',
      '0px 3px 3px -2px rgba(0,0,0,0.05),0px 3px 4px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.03)',
      '0px 2px 4px -1px rgba(0,0,0,0.05),0px 4px 5px 0px rgba(0,0,0,0.03),0px 1px 10px 0px rgba(0,0,0,0.03)',
      '0px 3px 5px -1px rgba(0,0,0,0.05),0px 5px 8px 0px rgba(0,0,0,0.03),0px 1px 14px 0px rgba(0,0,0,0.03)',
      '0px 3px 5px -1px rgba(0,0,0,0.05),0px 6px 10px 0px rgba(0,0,0,0.03),0px 1px 18px 0px rgba(0,0,0,0.03)',
      '0px 4px 5px -2px rgba(0,0,0,0.05),0px 7px 10px 1px rgba(0,0,0,0.03),0px 2px 16px 1px rgba(0,0,0,0.03)',
      '0px 5px 5px -3px rgba(0,0,0,0.05),0px 8px 10px 1px rgba(0,0,0,0.03),0px 3px 14px 2px rgba(0,0,0,0.03)',
      '0px 5px 6px -3px rgba(0,0,0,0.05),0px 9px 12px 1px rgba(0,0,0,0.03),0px 3px 16px 2px rgba(0,0,0,0.03)',
      '0px 6px 6px -3px rgba(0,0,0,0.05),0px 10px 14px 1px rgba(0,0,0,0.03),0px 4px 18px 3px rgba(0,0,0,0.03)',
      '0px 6px 7px -4px rgba(0,0,0,0.05),0px 11px 15px 1px rgba(0,0,0,0.03),0px 4px 20px 3px rgba(0,0,0,0.03)',
      '0px 7px 8px -4px rgba(0,0,0,0.05),0px 12px 17px 2px rgba(0,0,0,0.03),0px 5px 22px 4px rgba(0,0,0,0.03)',
      '0px 7px 8px -4px rgba(0,0,0,0.05),0px 13px 19px 2px rgba(0,0,0,0.03),0px 5px 24px 4px rgba(0,0,0,0.03)',
      '0px 7px 9px -4px rgba(0,0,0,0.05),0px 14px 21px 2px rgba(0,0,0,0.03),0px 5px 26px 4px rgba(0,0,0,0.03)',
      '0px 8px 9px -5px rgba(0,0,0,0.05),0px 15px 22px 2px rgba(0,0,0,0.03),0px 6px 28px 5px rgba(0,0,0,0.03)',
      '0px 8px 10px -5px rgba(0,0,0,0.05),0px 16px 24px 2px rgba(0,0,0,0.03),0px 6px 30px 5px rgba(0,0,0,0.03)',
      '0px 8px 11px -5px rgba(0,0,0,0.05),0px 17px 26px 2px rgba(0,0,0,0.03),0px 6px 32px 5px rgba(0,0,0,0.03)',
      '0px 9px 11px -5px rgba(0,0,0,0.05),0px 18px 28px 2px rgba(0,0,0,0.03),0px 7px 34px 6px rgba(0,0,0,0.03)',
      '0px 9px 12px -6px rgba(0,0,0,0.05),0px 19px 29px 2px rgba(0,0,0,0.03),0px 7px 36px 6px rgba(0,0,0,0.03)',
      '0px 10px 13px -6px rgba(0,0,0,0.05),0px 20px 31px 3px rgba(0,0,0,0.03),0px 8px 38px 7px rgba(0,0,0,0.03)',
      '0px 10px 13px -6px rgba(0,0,0,0.05),0px 21px 33px 3px rgba(0,0,0,0.03),0px 8px 40px 7px rgba(0,0,0,0.03)',
      '0px 10px 14px -6px rgba(0,0,0,0.05),0px 22px 35px 3px rgba(0,0,0,0.03),0px 8px 42px 7px rgba(0,0,0,0.03)',
      '0px 11px 14px -7px rgba(0,0,0,0.05),0px 23px 36px 3px rgba(0,0,0,0.03),0px 9px 44px 8px rgba(0,0,0,0.03)',
      '0px 11px 15px -7px rgba(0,0,0,0.05),0px 24px 38px 3px rgba(0,0,0,0.03),0px 9px 46px 8px rgba(0,0,0,0.03)',
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#fafafa',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-1px)',
            },
            padding: '8px 20px',
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#007C4E',
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: '#3A9359',
            },
          },
          outlined: {
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
            },
          },
          text: {
            '&:hover': {
              backgroundColor: 'rgba(0, 168, 107, 0.08)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          },
          rounded: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00A86B',
              borderWidth: 2,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#757575',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: '#00A86B',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
          colorPrimary: {
            backgroundColor: 'rgba(0, 168, 107, 0.1)',
            color: '#00A86B',
          },
          colorSecondary: {
            backgroundColor: 'rgba(80, 200, 120, 0.1)',
            color: '#50C878',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
            borderRadius: 9999,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '12px 16px',
          },
          standardSuccess: {
            backgroundColor: 'rgba(0, 168, 107, 0.1)',
            color: '#00A86B',
          },
          standardInfo: {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            color: '#2196F3',
          },
          standardWarning: {
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            color: '#FFC107',
          },
          standardError: {
            backgroundColor: 'rgba(255, 82, 82, 0.1)',
            color: '#FF5252',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: '#E8F5E9',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(even)': {
              backgroundColor: '#FAFAFA',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 168, 107, 0.04)',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#00A86B',
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#00A86B',
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': {
              color: '#00A86B',
              '& + .MuiSwitch-track': {
                backgroundColor: '#00A86B',
                opacity: 0.5,
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#121212',
            borderRadius: 4,
            fontSize: '0.75rem',
            padding: '4px 8px',
          },
        },
      },
    },
  },
  isFr ? corefrFR : coreenUS,
  isFr ? frFR : enUS,
  isFr ? dataGridfrFR : dataGridenUS
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  </React.StrictMode>
)
