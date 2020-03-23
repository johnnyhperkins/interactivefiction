import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import ReactLoading from 'react-loading'
import Link from './misc/Link'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'

import Context from '../context'
import { GET_FEED_QUERY } from '../graphql/queries'
import { TOGGLE_LIKE_MUTATION } from '../graphql/mutations'
import useStyles from '../styles'

const likeComponents = {
  liked: FavoriteIcon,
  unliked: FavoriteBorderIcon
}

export default function Feed ({ history, client }) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_FEED_QUERY)
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION,
    {
      update (cache, { data }) {
        const existingPoems = cache.readQuery({ query: GET_FEED_QUERY })
        const newPoems = existingPoems.poems.map(poem => {
          if (poem._id === data.toggleLike._id) {
            return { ...poem, ...data.toggleLike }
          } else {
            return poem
          }
        })

        cache.writeQuery({
          query: GET_FEED_QUERY,
          data: { poems: newPoems }
        })
      }
    })
  const { state: { currentUser: { _id: userId } } } = useContext(Context)

  const handleToggleLike = async (poemId) => toggleLike({ variables: { poemId } })

  const renderLike = (userIds = [], poemId) => {
    const LikeIcon = userIds.includes(userId) ? likeComponents['liked'] : likeComponents['unliked']

    return <LikeIcon className={classes.likeIcon} onClick={() => handleToggleLike(poemId)} />
  }

  if (loading) return <ReactLoading color='#2196f3' />
  if (error) return <Typography>{error.message}</Typography>

  const renderFeed = poems => {
    return poems.map(poem => {
      return (
        <ListItem disableGutters key={poem._id}>
          {renderLike(poem.likes, poem._id)}
          <Link to={poem.url}>
            <ListItemText
              primary={poem.title}
              secondary={`By ${poem.author.name} // ${moment(parseInt(poem.createdAt)).format('MMMM Do YYYY')} // ${poem.likes.length} likes`}
              className={classes.pointer} />
          </Link>
        </ListItem>
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
