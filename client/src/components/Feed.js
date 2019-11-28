import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from './misc/Link'
import moment from 'moment'
import ReactLoading from 'react-loading'
import { GET_FEED_QUERY } from '../graphql/queries'
import useStyles from '../styles'

import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'

export default function Feed ({ history, client }) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_FEED_QUERY)

  if (loading) return <ReactLoading color='#2196f3' />
  if (error) return <Typography>{error.message}</Typography>

  const renderFeed = poems => {
    return poems.map(poem => {
      return (
        <Link to={poem.url} key={poem._id}>
          <ListItem disableGutters>
            <ListItemText primary={poem.title} secondary={`By ${poem.author.name} // ${moment(parseInt(poem.createdAt)).format('MMMM Do YYYY')}`} className={classes.pointer} />
          </ListItem>
        </Link>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={12}>
          <Typography variant='h5' className={classes.marginBottom30}>Recently Published</Typography>
          <List>
            {renderFeed(data.getFeed)}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}
