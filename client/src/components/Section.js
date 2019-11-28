import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { unstable_Box as Box } from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/Delete'
import ReorderIcon from '@material-ui/icons/ReorderTwoTone'

import Stanza from './Stanza'
import WithTooltip from './misc/WithTooltip'
import useStyles from '../styles'
import Context from '../context'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import '../styles/Section.css'

import { UPDATE_SECTION_MUTATION, DELETE_SECTION_MUTATION } from '../graphql/mutations'

import { Tooltip, Input, Button, Grid } from '@material-ui/core'

export default function Section ({ section, startDeleteSection, provided, poemId }) {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const [firstLine, setFirstLine] = useState('')
  const [editFirstLine, setEditFirstLine] = useState(false)

  const AddStanzaContainer = styled.div`
  display: flex;
  padding-bottom: 15px;
  justify-content: center;
`

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

  const handleAddStanza = (updateSection) => {
    return async () => {
      if (section.stanzas.length < 3) {
        const blankStanza = { leadWord: '', body: 'Click here to edit this stanza' }
        const { errors, data } = await updateSection({
          variables: {
            _id: section._id,
            stanzas: [...section.stanzas, blankStanza]
          }
        })

        if (errors) return handleError(errors, dispatch)
        const { stanzas } = data.updateSection

        startUpdateStanza(blankStanza, stanzas.length - 1)
      } else {
        snackbarMessage('A section can only have 3 stanzas', dispatch)
      }
    }
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

  const renderFirstLine = () => {
    return (
      <Mutation
        mutation={UPDATE_SECTION_MUTATION}
        errorPolicy='all'>
        {updateSection => (
          <div className={classes.editFirstLine}>
            <Tooltip title='Edit First Line'>
              <EditIcon className={`${editFirstLine ? classes.active : ''} ${classes.regularIcon}`} onClick={() => { setEditFirstLine(!editFirstLine) }} />
            </Tooltip>
            <Input
              placeholder='First Line'
              fullWidth
              disabled={!editFirstLine}
              disableUnderline={!editFirstLine}
              inputProps={{ className: classes.firstLine }}
              value={firstLine}
              onChange={e => setFirstLine(e.target.value)}
            />
            {editFirstLine && (
            <>
              <Button onClick={handleUpdateSection(updateSection)}>
                Save
              </Button>
              <Button color='secondary' onClick={() => setEditFirstLine(false)}>
                Cancel
              </Button>
            </>
            )}
          </div>
        )}
      </Mutation>
    )
  }

  return (
    <Grid container justify='center' spacing={4}>
      <Grid item sm={12}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
          <Mutation
            mutation={DELETE_SECTION_MUTATION}
            onError={err => handleError(err, dispatch)}>
            {deletePoem => (
              <Tooltip title='Delete Section'>
                <DeleteIcon color='secondary' className={classes.deleteIcon} onClick={() => startDeleteSection(section._id, deletePoem)} />
              </Tooltip>
            )}
          </Mutation>
          <Tooltip title='Reorder Section'>
            <ReorderIcon className={classes.reorderIcon} />
          </Tooltip>
        </Box>
      </Grid>
      <Grid item sm={12}>
        {renderFirstLine()}
      </Grid>
      <Grid item sm={12}>
        <AddStanzaContainer>
          {section.stanzas.length < 3 && (
            <Mutation
              mutation={UPDATE_SECTION_MUTATION}
              errorPolicy='all'>
              {updateSection => (
                <Tooltip title='Add Stanza'>
                  <AddIcon className={classes.regularIcon} onClick={handleAddStanza(updateSection)} />
                </Tooltip>
              )}
            </Mutation>
          )}
        </AddStanzaContainer>
      </Grid>
      {Boolean(section.stanzas.length) && section.stanzas.map((stanza, idx) => {
        return (
          <Grid item sm={4} key={idx} onClick={() => startUpdateStanza(stanza, idx)} className={classes.pointer}>
            <Tooltip title='Edit Stanza' placement='top'>
              <WithTooltip tooltip>
                <Stanza stanza={stanza} tooltip />
              </WithTooltip>
            </Tooltip>
          </Grid>
        )
      })
      }
    </Grid>
  )
}
