import { createContext } from 'react'

const Context = createContext({
  ignoreMobileWarning: false,
  currentUser: null,
  isAuth: false,
  isGoogle: false,
  ui: {
    snackbar: {
      open: false,
      message: ''
    },
    drawer: {
      open: false,
      leadWord: '',
      body: '',
      sectionId: '',
      idx: null
    }
  },
  warningModal: {
    modalOpen: false,
    title: '',
    message: '',
    action: null
  },
  infoModal: {
    modalOpen: false,
    title: '',
    message: ''
  },
  poems: [],
  currentPoem: null,
  currentSections: []
})

export default Context
