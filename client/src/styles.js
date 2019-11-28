import { makeStyles } from '@material-ui/styles'
export default makeStyles({
  active: {
    color: '#222'
  },
  addPoemItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 78
  },
  border: {
    border: '1px solid #444',
    padding: 15
  },
  center: {
    textAlign: 'center'
  },
  centerVertical: {
    alignItems: 'center',
    display: 'flex'
  },
  deleteIcon: {
    '&:hover': {
      color: '#bd0b0b'
    },
    color: '#ffb8a2',
    cursor: 'pointer',
    transition: '.2s ease-in-out all'
  },
  divider: {
    margin: '15px 0'
  },
  dragContainer: {
    cursor: 'pointer'
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '35px',
    width: '350px'
  },
  editFirstLine: {
    minHeight: 70,
    textAlign: 'center'
  },
  editTitle: {
    width: '50%'
  },
  editTitleField: {
    fontSize: '24px',
    width: '100%'
  },
  editTitleFieldInput: {
    color: '#222',
    textOverflow: 'ellipsis'
  },
  firstLine: {
    color: '#444',
    textAlign: 'center'
  },
  formControl: {
    marginTop: 15,
    width: '100%'
  },
  formItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  largeIcon: {
    '&:hover': {
      color: '#444'
    },
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '36px',
    transition: '.2s ease-in-out all'
  },
  leadWord: {
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center'
  },
  marginBottom30: {
    marginBottom: 30
  },
  marginTop30: {
    marginTop: 30
  },
  navBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0
  },
  navRoot: {
    padding: 0
  },
  pointer: {
    cursor: 'pointer'
  },
  regularIcon: {
    '&:hover': {
      color: '#444'
    },
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '24px',
    transition: '.2s ease-in-out all'
  },
  reorderIcon: {
    '&:hover': {
      color: '#444'
    },
    color: '#aaa',
    cursor: 'grab',
    transition: '.2s ease-in-out all'
  },
  root: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '50px 0 0 0'
  },
  siteTitle: {
    color: '#fff',
    fontFamily: 'PT Mono',
    textTransform: 'uppercase'
  },
  smallIcon: {
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '16px'
  },
  smallLink: {
    color: '#777',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginRight: 10,
    marginTop: 10,
    textDecoration: 'underline'
  },
  snackbarMessage: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  submitButton: {
    margin: '15px 0'
  },
  textField: {
    background: '#fff',
    flexGrow: 2,
    margin: '0 15px',
    width: '90%'
  }
})
