import { makeStyles } from '@material-ui/styles'
export default makeStyles({
  active: {
    color: '#222'
  },
  activeRegularIcon: {
    '&:hover': {
      color: '#aaa'
    },
    color: '#444',
    cursor: 'pointer',
    fontSize: '24px',
    transition: '.2s ease-in-out all'
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
  buttonIcon: {
    marginLeft: '5px'
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
    margin: '15px 0!important'
  },
  dragContainer: {
    cursor: 'pointer'
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '35px!important',
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
    fontSize: '24px!important',
    width: '100%'
  },
  editTitleFieldInput: {
    color: '#222',
    textOverflow: 'ellipsis'
  },
  editUsernameField: {
    fontSize: '50px!important',
    width: '100%'
  },
  editUsernameFieldInput: {
    color: '#222',
    fontSize: '50px!important',
    textOverflow: 'ellipsis'
  },
  firstLine: {
    color: '#444',
    textAlign: 'center'
  },
  formControl: {
    marginTop: '15px!important',
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
    marginBottom: '20px!important',
    textAlign: 'center'
  },
  likeIcon: {
    cursor: 'pointer',
    marginRight: '15px!important'
  },
  marginBottom30: {
    marginBottom: '30px!important'
  },
  marginTop30: {
    marginTop: '30px!important'
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
  picture: {
    borderRadius: '90%',
    height: '40px'
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
  signout: {
    cursor: 'pointer',
    display: 'flex'
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
  stanza: {
    border: '1px dotted #ccc',
    cursor: 'pointer'
  },
  submitButton: {
    margin: '15px 0'
  },
  textField: {
    background: '#fff',
    flexGrow: 2,
    margin: '0 15px',
    width: '90%'
  },
  white: {
    color: 'white'
  }
})
