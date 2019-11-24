import React from 'react'
import { Query } from 'react-apollo'
import Link from './misc/Link'
import moment from 'moment'
import ReactLoading from 'react-loading'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { GET_FEED_QUERY } from '../graphql/queries'
import useStyles from '../styles'

export default function Feed ({ history, client }) {
  const classes = useStyles()

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
