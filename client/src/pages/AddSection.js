import React, { useState, useContext } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '../components/Container'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import Stanza from '../components/Stanza'

import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'

import { CREATE_SECTION_MUTATION, CREATE_STANZA_MUTATION } from '../graphql/mutations'

const SectionContainer = styled.div`
	padding: 10px;
	margin-bottom: 10px;
`

const AddSection = ({ classes, match, history }) => {
	const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
  const [ firstLine, setFirstLine ] = useState('')
  const [ body, setBody ] = useState('')
  const [ leadWord, setLeadWord ] = useState('')
  const [ stanzas, setStanzas ] = useState([])
  
	// const [ addStanza, setStanza ] = useState(false)

	const { id: poemId } = match.params

	const client = useClient()

  const handleAddStanza = () => {
    setStanzas([...stanzas, { leadWord, body }])
    setLeadWord('')
    setBody('')
  }

	const handleCreateSection = async () => {
		try {
			await client.request(CREATE_SECTION_MUTATION, {
        poemId,
        firstLine,
        stanzas
			})

      snackbarMessage('Saved', dispatch)
      history.push(`/poem/${poemId}`)
		} catch (err) {
			handleError(err, dispatch)
			history.push('/')
		}
	}

	return (
    <Container>
      <TextField
        placeholder="First Line"
        label="First Line"
        className={classes.editFirstLineField}
        value={firstLine}
        onChange={e => setFirstLine(e.target.value)}
      />
      <Grid container justify="center">
        {stanzas.map((stanza, idx) => {
          return (
            <Grid key={idx} item sm={4} className={classes.border}>
              <Stanza stanza={stanza} />
            </Grid>
            )
          })
        }
        {Boolean(stanzas.length < 3) && 
          <Grid item sm={4} className={classes.border}>
            <TextField
              placeholder="Lead Word"
              label="Lead Word"
              className={classes.editFirstLineField}
              value={leadWord}
              onChange={e => setLeadWord(e.target.value)}
            />
            <Divider className={classes.divider} />
            <TextField
              placeholder="Stanza Body"
              label="Stanza Body"
              multiline
              rows={10}
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <Button onClick={handleAddStanza}>Add</Button>
          </Grid>
          }
      </Grid>
      <Button onClick={handleCreateSection}>Save</Button>
    </Container>
	)
}

const styles = {
	
	snackbarMessage: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	border: {
    border: '1px solid #444',
    padding: 15
  },
	editFirstLineField: {
		fontSize: '24px',
	},
	textField: {
		margin: '0 15px 0 0',
	},
	deleteIcon: {
		color: 'red',
	},
	smallLink: {
		color: '#777',
		display: 'inline-block',
		marginRight: 10,
		textDecoration: 'underline',
		marginTop: 10,
		fontSize: 14,
		cursor: 'pointer',
		fontFamily: 'Roboto',
	},
	formControl: {
		width: '100%',
		marginTop: 15,
	},
	formItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	submitButton: {
		marginTop: 15,
	},
	divider: {
		margin: '15px 0',
	},
}

export default withStyles(styles)(AddSection)
