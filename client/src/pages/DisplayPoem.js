import React, { useState, useEffect, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RefreshIcon from '@material-ui/icons/Refresh'

import { GET_POEM_QUERY_STRING } from '../graphql/queries'
import Context from '../context'
import { useClient } from '../client'
import Container from '../components/Container'
import DisplayLeadWords from '../components/DisplayLeadWords'
import Stanza from '../components/Stanza'
import handleError from '../utils/handleError'
import Link from '../components/misc/Link'
import styles from '../styles'
import '../styles/Stanza.css'

const DisplayPoem = ({ classes, match, history }) => {
  const { state: { currentUser }, dispatch } = useContext(Context)
  const [poem, setPoem] = useState(null)
  const [sections, setSections] = useState([])
  const [fadeDirection, setFadeDirection] = useState('')
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [renderedSections, setRenderedSections] = useState([])
  const client = useClient()

  const { poem_id: poemId } = match.params

  useEffect(() => {
    getPoem()
  }, [])

  const getPoem = async () => {
    try {
      const res = await client.request(GET_POEM_QUERY_STRING, {
        _id: poemId
      }) // WHAT THE HELL

      const { getPoem: { title, sections, author: { name, _id } } } = res

      setPoem({
        title: title,
        author: name,
        authorId: _id
      })

      setSections(sections)
    } catch (err) {
      handleError(err, dispatch)
      history.push('/')
    }
  }

  const getFadeDirection = (idx) => {
    switch (idx) {
      case 0:
        return 'from-left'
      case 2:
        return 'from-right'
      default:
        return 'fade-in'
    }
  }

  const handleSelectStanza = (idx) => {
    // transition the stanza from left or right based on idx
    setFadeDirection(getFadeDirection(idx))
    const stanza = sections[currentSectionIdx].stanzas[idx]
    const renderedSection = {
      firstLine: sections[currentSectionIdx].firstLine,
      stanza
    }
    setRenderedSections([...renderedSections, renderedSection])

    if (currentSectionIdx <= sections.length) {
      setCurrentSectionIdx(currentSectionIdx + 1)
    }
  }

  const handleReset = () => {
    setCurrentSectionIdx(0)
    setRenderedSections([])
  }

  const renderCurrentSection = () => {
    const section = sections[currentSectionIdx]

    return section && (
      <Grid container justify='center' spacing={32}>
        <Grid item sm={12}>
          <Typography variant='body1' align='center'>{section.firstLine}</Typography>
        </Grid>
        {section.stanzas.map((stanza, idx) => {
          return (
            <Grid item sm={4} key={idx} className={classes.pointer}>
              <DisplayLeadWords stanza={stanza} idx={idx} selectStanza={handleSelectStanza} />
            </Grid>
          )
        })
        }
      </Grid>
    )
  }

  const renderSections = () => {
    return Boolean(renderedSections.length) && (
      renderedSections.map((section, idx) => {
        return (
          <Grid container spacing={32} key={idx}>
            <Grid item sm={12}>
              <Typography variant='body1' align='center'>{section.firstLine}</Typography>
            </Grid>

            <Grid item sm={4} className={`stanza ${fadeDirection}`}>
              <Stanza stanza={section.stanza} />
            </Grid>
          </Grid>
        )
      }
      )
    )
  }

  const renderResetButton = () => {
    if (currentSectionIdx === sections.length || !sections[currentSectionIdx].stanzas.length) {
      return <RefreshIcon className={classes.pointer} onClick={handleReset} />
    }
  }

  return (
    Boolean(sections.length && poem) && (
      <Container justify='center' spacing={16} >
        <Typography variant='h4'>{poem.title}</Typography>
        <Typography variant='body1'>By {poem.author}</Typography>
        {
          currentUser && currentUser._id === poem.authorId && (
            <Link to={`/poem/${poemId}`} small='true'>
              Edit Poem
            </Link>
          )
        }
        <Divider className={classes.divider} />
        {renderSections()}
        {renderCurrentSection()}
        {renderResetButton()}
      </Container >
    )
  )
}

export default withStyles(styles)(DisplayPoem)
