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

import { CREATE_SECTION_MUTATION } from '../graphql/mutations'
import styles from '../styles'

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

	const { id: poemId } = match.params

	const client = useClient()

  const handleAddStanza = () => {
    setStanzas([...stanzas, { leadWord, body }])
    setLeadWord('')
    setBody('')
  }

  const handleCancel = () => {
    history.goBack()
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
    <Container justify="center">
      <Grid container>
        <Grid item xs={12}>
          <TextField
            placeholder="First Line"
            label="First Line"
            fullWidth
            className={classes.marginBottom30}
            value={firstLine}
            onChange={e => setFirstLine(e.target.value)}
          />
        </Grid>
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
      <Button onClick={handleCreateSection} className={classes.submitButton}>Save</Button>
      <Button onClick={handleCancel} className={classes.submitButton}>Cancel</Button>
    </Container>
	)
}

export default withStyles(styles)(AddSection)
