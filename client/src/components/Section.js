import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Stanza from './Stanza'
// import styled from 'styled-components'
import styles from '../styles'
import Context from '../context'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'

// import { GET_POEM_QUERY, GET_POEMS_QUERY } from '../graphql/queries'
import { UPDATE_SECTION_MUTATION } from '../graphql/mutations'

const Section = ({ section, classes, provided, poemId }) => {
  const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
  const [firstLine, setFirstLine] = useState('')

  // const [ sections, setSections ] = useState([])
  const [editFirstLine, setEditFirstLine] = useState(false)

  useEffect(() => {
    setFirstLine(section.firstLine)
  }, [])

  // const startUpdateField = field => {
  // 	const { type, label, _id } = field
  // 	dispatch({
  // 		type: 'TOGGLE_DRAWER',
  // 		payload: {
  // 			open: true,
  // 			label,
  // 			type,
  // 			_id,
  // 		},
  // 	})
  // }

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
    console.log(bool)
    if (bool) {
      return (
        <div className={classes.editTitle}>
          <Mutation
            mutation={UPDATE_SECTION_MUTATION}
            errorPolicy='all'
          // update={(cache, { data: { updateSection } }) => {
          //   // const { getPoems } = cache.readQuery({
          //   // query: GET_POEMS_QUERY,
          //   // variables: { _id: poemId }
          //   // })

          //   // cache.writeQuery({
          //   //  query: GET_POEMS_QUERY,
          //   //  data: { getPoem: getPoem.concat([ updatePoem ]) },
          //   // })
          // }}
          >
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

    <Grid container justify='center'>
      <Grid item sm={12}>
        {renderFirstLine(editFirstLine)}
      </Grid>
      {section.stanzas.map((stanza, idx) => {
        return (
          <Grid item sm={4} key={idx}>
            <Stanza stanza={stanza} />
          </Grid>
        )
      })
      }
    </Grid>
  )
}

export default withStyles(styles)(Section)
