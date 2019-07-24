import React, { useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

import { UPDATE_POEM_MUTATION_STRING } from '../graphql/mutations'
import Section from './Section'
import styles from '../styles'
import Context from '../context'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import { useClient } from '../client'

const SectionContainer = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`
const SectionWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 35px 0
`

const Sections = ({ sections, classes, setSections, poemId }) => {
  const { dispatch } = useContext(Context)
  const client = useClient()

  const updateSectionOrderInDB = async sectionIds => {
    try {
      await client.request(UPDATE_POEM_MUTATION_STRING, {
        _id: poemId,
        sections: sectionIds
      })

      snackbarMessage('Updated', dispatch)
    } catch (err) {
      handleError(err, dispatch)
    }
  }

  const startDeleteSection = (_id, deleteSection) => {
    const action = async () => {
      const res = await deleteSection({ variables: { _id, poemId } })
      if (res) {
        setSections(sections.filter(section => section._id !== _id))
        snackbarMessage('Section Deleted', dispatch)
      }
    }

    dispatch({
      type: 'TOGGLE_WARNING_MODAL',
      payload: {
        modalOpen: true,
        title: 'Are you sure you want to delete this section?',
        message: 'This cannot be undone.',
        action
      }
    })
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = result => {
    const { destination, source } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) { return }

    const newSections = reorder(
      sections,
      result.source.index,
      result.destination.index
    )

    const sectionIds = newSections.map(section => section._id)

    setSections(newSections)
    updateSectionOrderInDB(sectionIds)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={poemId}>
        {provided => (
          <SectionContainer ref={provided.innerRef} {...provided.droppableProps}>
            {sections.map((section, idx) => {
              return (
                <Draggable draggableId={section._id} key={section._id} index={idx}>
                  {provided => (
                    <>
                      <SectionWrapper
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>

                        <Section
                          key={idx}
                          poemId={poemId}
                          startDeleteSection={startDeleteSection}
                          section={section}
                          provided={provided} />
                      </SectionWrapper>
                    </>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </SectionContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default withStyles(styles)(Sections)
