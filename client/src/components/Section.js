import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Stanza from './Stanza'
import styles from '../styles'
import Context from '../context'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'

import { UPDATE_SECTION_MUTATION } from '../graphql/mutations'

const Section = ({ section, classes, provided, poemId }) => {
  const { dispatch } = useContext(Context)
  const [firstLine, setFirstLine] = useState('')
  const [editFirstLine, setEditFirstLine] = useState(false)

  useEffect(() => {
    setFirstLine(section.firstLine)
  }, [])

  const startUpdateStanza = (stanza, idx) => {
    const { leadWord, body } = stanza
    dispatch({
      type: 'TOGGLE_DRAWER',
      payload: {
        open: true,
        sectionId: section._id,
        idx,
        leadWord,
        body
      }
    })
  }

  const handleUpdateSection = updateSection => {
    return async () => {
      const { errors } = await updateSection({
        variables: {
          _id: section._id,
          firstLine
        }
      })

      if (errors) return handleError(errors, dispatch)
      setEditFirstLine(false)
      snackbarMessage('Saved', dispatch)
    }
  }

  const renderFirstLine = bool => {
    if (bool) {
      return (
        <div className={classes.editTitle}>
          <Mutation
            mutation={UPDATE_SECTION_MUTATION}
            errorPolicy='all'>
            {updateSection => (
              <>
                <TextField
                  placeholder='FirstLine'
                  label='FirstLine'
                  className={classes.editFirstLine}
                  value={firstLine}
                  onChange={e => setFirstLine(e.target.value)}
                />
                <Button onClick={handleUpdateSection(updateSection)}>
                  Save
                </Button>
              </>
            )}
          </Mutation>
        </div>
      )
    }
    return (
      <Typography variant='body1' align='center' className={classes.marginBottom30}>
        {firstLine}
        <EditIcon
          onClick={() => {
            setEditFirstLine(!editFirstLine)
          }}
        />
      </Typography>
    )
  }

  return (

    <Grid container justify='center' spacing={32}>
      <Grid item sm={12}>
        {renderFirstLine(editFirstLine)}
      </Grid>
      {section.stanzas.map((stanza, idx) => {
        return (
          <Grid item sm={4} key={idx} onClick={() => startUpdateStanza(stanza, idx)} className={classes.pointer}>
            <Stanza stanza={stanza} />
          </Grid>
        )
      })
      }
    </Grid>
  )
}

export default withStyles(styles)(Section)
