import { makeStyles } from '@material-ui/styles'
export default makeStyles({
  siteTitle: {
    fontFamily: 'PT Mono',
    textTransform: 'uppercase',
    color: '#fff'
  },
  snackbarMessage: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  border: {
    border: '1px solid #444',
    padding: 15
  },

  center: {
    textAlign: 'center'
  },

  dragContainer: {
    cursor: 'pointer'
  },

  smallIcon: {
    fontSize: '16px',
    color: '#aaa',
    marginLeft: '16px',
    cursor: 'pointer'
  },

  largeIcon: {
    fontSize: '36px',
    color: '#aaa',
    cursor: 'pointer',
    transition: '.2s ease-in-out all',
    '&:hover': {
      color: '#444'
    }
  },

  editTitleField: {
    fontSize: '24px'
  },

  regularIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#aaa',
    transition: '.2s ease-in-out all',
    '&:hover': {
      color: '#444'
    }
  },

  leadWord: {
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center'
  },

  formItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submitButton: {
    margin: '15px 0'
  },

  reorderIcon: {
    color: '#aaa',
    cursor: 'grab',
    transition: '.2s ease-in-out all',
    '&:hover': {
      color: '#444'
    }
  },
  deleteIcon: {
    cursor: 'pointer',
    color: '#ffb8a2',
    transition: '.2s ease-in-out all',
    '&:hover': {
      color: '#bd0b0b'
    }
  },

  root: {
    padding: '50px 0 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxSizing: 'border-box'
  },

  navRoot: {
    padding: 0
  },

  marginBottom30: {
    marginBottom: 30
  },

  marginTop30: {
    marginTop: 30
  },

  drawer: {
    width: '350px',
    padding: '35px',
    display: 'flex',
    flexDirection: 'column'
  },
  firstLine: {
    textAlign: 'center',
    color: '#444'
  },
  active: {
    color: '#222'
  },

  editFirstLine: {
    marginTop: 30,
    textAlign: 'center',
    minHeight: 70
  },

  smallLink: {
    color: '#777',
    display: 'inline-block',
    marginRight: 10,
    textDecoration: 'underline',
    marginTop: 10,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'Montserrat'
  },
  formControl: {
    width: '100%',
    marginTop: 15
  },

  textField: {
    margin: '0 15px',
    width: '90%',
    background: '#fff',
    flexGrow: 2
  },
  navBar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },

  addPoemItem: {
    minHeight: 78,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  centerVertical: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    margin: '15px 0'
  },
  pointer: {
    cursor: 'pointer'
  }
})
