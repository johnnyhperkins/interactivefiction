import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Mutation } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'

import Link from '../components/misc/Link'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'

import AddSection from '../components/AddSection'
import Section from '../components/Section'
import EditDrawerContent from '../components/EditDrawerContent'

import { GET_POEM_QUERY } from '../graphql/queries'
import { UPDATE_POEM_MUTATION } from '../graphql/mutations'

import styles from '../styles'

const SectionContainer = styled.div`
	padding: 10px;
	margin-bottom: 10px;
`

const EditPoem = ({ classes, match, history }) => {
	const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
	const [ title, setTitle ] = useState('')
	const [ url, setUrl ] = useState('')
	const [ sections, setSections ] = useState([])

	// const [ addStanza, setStanza ] = useState(false)
	const [ editTitle, setEditTitle ] = useState(false)
	// const [ addSection, setAddSection ] = useState(false)

	const { id: poemId } = match.params

	const client = useClient()

	useEffect(() => {
		getPoem()
	}, [])

	const handleUpdatePoem = updatePoem => {
		return async () => {
			const { errors } = await updatePoem({
				variables: { _id: poemId, title },
			})
			if (errors) return handleError(errors, dispatch)
			setEditTitle(false)
			snackbarMessage('Saved', dispatch)
		}
	}

	const addSection = () => history.push(`/poem/${poemId}/section`)

	const getPoem = async () => {
		try {
			const {
				getPoem: { title, url, sections },
			} = await client.request(GET_POEM_QUERY, {
				_id: poemId,
			})
			
			setUrl(url)
			setTitle(title)
			setSections(sections)
		} catch (err) {
			handleError(err, dispatch)
		}
	}

	const onClose = () => {
		return dispatch({
			type: 'TOGGLE_DRAWER',
			payload: {
				open: false,
				label: '',
				type: '',
				_id: '',
			},
		})
	}

	const renderTitle = bool => {
		if (bool) {
			return (
				<div className={classes.editTitle}>
					<Mutation
						mutation={UPDATE_POEM_MUTATION}
						errorPolicy="all"
						update={(cache, { data: { updatePoem } }) => {
							const { getPoem } = cache.readQuery({
								query: GET_POEM_QUERY,
								variables: { _id: poemId }
							})

							cache.writeQuery({
								query: GET_POEM_QUERY,
								data: { getPoem: getPoem.concat([ updatePoem ]) },
							})
						}}>
						{updatePoem => (
							<>
							<TextField
								placeholder="Title"
								label="Title"
								className={classes.editTitleField}
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
							<Button onClick={handleUpdatePoem(updatePoem)}>
								Save
							</Button>
							</>
						)}
					</Mutation>
				</div>
			)
		}
		return (
			<Typography variant="h4">
				{title}
				<EditIcon
					onClick={() => {
						setEditTitle(!editTitle)
					}}
				/>
			</Typography>
		)
	}

	const updateFieldOrderInDB = async sectionIds => {
		try {
			await client.request(UPDATE_POEM_MUTATION, {
				_id: poemId,
				sections: sectionIds,
			})

			snackbarMessage('Updated', dispatch)
		} catch (err) {
			handleError(err, dispatch)
		}
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [ removed ] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const onDragEnd = result => {
		const { destination, source } = result

		if (
			!destination ||
			(destination.droppableId === source.droppableId &&
				destination.index === source.index)
		)
			return

		const newSections = reorder(
			sections,
			result.source.index,
			result.destination.index,
		)

		const sectionIds = newSections.map(section => section._id)

		setSections(newSections)
		updateFieldOrderInDB(sectionIds)
	}

	return (
		sections && (
			<div className={classes.root}>
				<Grid container justify="center">
					<Grid item sm={6}>
						{renderTitle(editTitle)}
						{Boolean(sections.length) && (
							<div>
								<Link to={url} small="true">
									View Poem
								</Link>
							</div>
						)}
						<Divider className={classes.divider} />
						<List>
							<ListItem className={classes.addPoemItem}>
								<div className={classes.centerVertical}>
								<Typography variant="body1">Add Section</Typography>
									<ListItemIcon
										className={classes.pointer}
										onClick={addSection}>
										<AddIcon />
									</ListItemIcon>
								</div>
							</ListItem>
						</List>
						
						{sections.map((section, idx) => {
							return (
								<Section key={idx} section={section} />
							)
						})}
						
						{/* {Boolean(sections.length) &&
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId={poemId}>
									{provided => (
										<SectionContainer ref={provided.innerRef} {...provided.droppableProps}>
											{sections.map((section, idx) => {
												return (
													<Draggable draggableId={section._id} key={section._id} index={idx}>
														{provided => (
															<Section section={section} provided={provided} />
														)}
													</Draggable>
												)
											})}
											{provided.placeholder}
										</SectionContainer>
									)}
								</Droppable>
							</DragDropContext>
						} */}
						
						{/* <AddSection poemId={poemId} sections={sections} setSections={setSections}/> */}
						
					</Grid>

					<Drawer open={open} anchor="right" onClose={onClose}>
						<EditDrawerContent
							classes={classes}
							sections={sections}
							setSections={setSections}
							onClose={onClose}
						/>
					</Drawer>
				</Grid>
			</div>
		)
	)
}

export default withStyles(styles)(EditPoem)