import React, { useState, useEffect, useContext } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RefreshIcon from '@material-ui/icons/Refresh'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import Tooltip from '@material-ui/core/Tooltip'
import { unstable_Box as Box } from '@material-ui/core/Box'

import { GET_POEM_QUERY_STRING } from '../graphql/queries'
import Context from '../context'
import { useClient } from '../client'
import Container from '../components/Container'
import DisplayLeadWords from '../components/DisplayLeadWords'
import Stanza from '../components/Stanza'
import handleError from '../utils/handleError'
import Link from '../components/misc/Link'
import useStyles from '../styles'
import { convertToHtml } from '../utils/helpers'
import '../styles/Stanza.css'

export default function DisplayPoem ({ match, history }) {
  const classes = useStyles()
  const { state: { currentUser }, dispatch } = useContext(Context)
  const [poem, setPoem] = useState(null)
  const [sections, setSections] = useState([])
  const [fadeDirection, setFadeDirection] = useState('')
  const [displayAsHtml, setDisplayAsHtml] = useState(false)
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [renderedSections, setRenderedSections] = useState([])
  const client = useClient()
  const { poem_id: poemId } = match.params

  useEffect(() => {
    async function getPoem () {
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
    getPoem()
  }, [])

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

  const handleDisplayAsHtml = () => setDisplayAsHtml(!displayAsHtml)

  const renderAllSectionsAsHtml = () => <div dangerouslySetInnerHTML={{ __html: convertToHtml(sections) }} />

  const renderCurrentSection = () => {
    const section = sections[currentSectionIdx]

    return section && (
      <Grid container justify='center' spacing={32} className={classes.marginTop30}>
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
          <Grid container spacing={32} key={idx} className={classes.marginTop30}>
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
      return <RefreshIcon className={classes.largeIcon} onClick={handleReset} />
    }
  }

  return (
    Boolean(sections.length && poem) && (
      <Container justify='center' spacing={16} style={{ paddingBottom: '500px' }}>
        <Grid container spacing={0} justify='space-between'>
          <Grid item xs={10}>
            <Typography variant='h4'>{poem.title}</Typography>
            <Typography variant='body1'>By {poem.author}</Typography>
            {currentUser && currentUser._id === poem.authorId && (
              <Link to={`/poem/${poemId}`} small='true'>
                  Edit Poem
              </Link>
            )}
          </Grid>
          <Grid item xs={2} align='right'>
            <Tooltip title='Display full poem as text'>
              <CodeRoundedIcon color={displayAsHtml ? 'primary' : 'disabled'} onClick={handleDisplayAsHtml} />
            </Tooltip>
          </Grid>
        </Grid>

        {displayAsHtml
          ? renderAllSectionsAsHtml()
          : (
            <>
              {renderSections()}
              {renderCurrentSection()}
            </>
          )}

        <Box display='flex' justifyContent='center' className={classes.marginTop30}>
          {renderResetButton()}
        </Box>
      </Container >
    )
  )
}
