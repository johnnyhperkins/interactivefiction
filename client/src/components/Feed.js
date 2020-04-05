import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import ReactLoading from 'react-loading'
import Link from './misc/Link'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'

import Context from '../context'
import { outputLikesText } from '../utils/helpers'
import { GET_FEED_QUERY, GET_FAVORITES_QUERY } from '../graphql/queries'
import { TOGGLE_LIKE_MUTATION } from '../graphql/mutations'
import useStyles from '../styles'

const likeComponents = {
  liked: FavoriteIcon,
  unliked: FavoriteBorderIcon
}

export default function Feed ({ history, client }) {
  const classes = useStyles()
  const { loading, error, data, refetch } = useQuery(GET_FEED_QUERY)
  const { refetch: refetchFavorites } = useQuery(GET_FAVORITES_QUERY)
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION)
  const { state: { currentUser: { _id: userId } } } = useContext(Context)

  const handleToggleLike = async (poemId) => {
    await toggleLike({ variables: { poemId } })
    refetch()
    refetchFavorites()
  }

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
              secondary={`By ${poem.author.name} // ${moment(parseInt(poem.createdAt)).format('MMMM Do YYYY')} ${outputLikesText(poem.likes.length)}`}
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
          <Typography variant='h5'>Recently Published Poems By Other Poets</Typography>
          <List>
            {renderFeed(data.getFeed)}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}
