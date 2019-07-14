import { createContext } from 'react'

const Context = createContext({
	currentUser: null,
	isAuth: false,
	isGoogle: false,
	ui: {
		snackbar: {
			open: false,
			message: '',
		},
		drawer: {
			open: false,
			label: '',
			type: '',
			_id: '',
		},
	},
	warningModal: {
		modalOpen: false,
		title: '',
		message: '',
		action: null,
	},
	poems: [],
	currentPoem: null,
	currentSections: [],
})

export default Context
