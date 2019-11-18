import React, { useState, useContext } from 'react'
import { Query } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Link from './misc/Link'

// import Button from '@material-ui/core/Button' // Set up a search feature eventually
import Typography from '@material-ui/core/Typography'
// import TextField from '@material-ui/core/TextField' // Set up a search feature eventually
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import Tooltip from '@material-ui/core/Tooltip'

import ReactLoading from 'react-loading'

// import handleError from '../utils/handleError'
// import { snackbarMessage } from '../utils/snackbarMessage'
// import Context from '../context'

import { GET_FEED_QUERY } from '../graphql/queries'

import useStyles from '../styles'

export default function Feed ({ history, client }) {
  const classes = useStyles()
  // const { dispatch } = useContext(Context)
  // const [poemFeed, setPoemFeed] = useState([])

  const renderFeed = poems => {
    return poems.map(poem => {
      return (
        <Link to={poem.url} key={poem._id}>
          <ListItem disableGutters>
            <ListItemText primary={poem.title} className={classes.pointer} />
          </ListItem>
        </Link>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={12}>
          <Typography variant='h5' className={classes.marginBottom30}>Featured Poems</Typography>
          <List>
            <Query query={GET_FEED_QUERY}>
              {({ loading, error, data: { getFeed: poems } }) => {
                if (loading) return <ReactLoading color='#2196f3' />
                if (error) {
                  return <Typography>{error.message}</Typography>
                }
                return renderFeed(poems)
              }}
            </Query>
          </List>
        </Grid>
      </Grid>
    </div>
  )
}
