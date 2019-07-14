import React, { useState, useEffect, useContext } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'

import Link from '../components/misc/Link'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'

import AddField from '../components/AddField'
import Fields from '../components/Fields'
import EditDrawerContent from '../components/EditDrawerContent'

import { GET_POEM_QUERY } from '../graphql/queries'
import { UPDATE_POEM_MUTATION } from '../graphql/mutations'

const EditPoem = ({ classes, match, history }) => {
	const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
	const [ title, setTitle ] = useState('')
	const [ url, setUrl ] = useState('')
	const [ sections, setSections ] = useState([])

	const [ addField, setAddField ] = useState(false)
	const [ editTitle, setEditTitle ] = useState(false)

	const { id: poemId } = match.params

	const client = useClient()

	useEffect(() => {
		getPoem()
	}, [])

	const handleUpdatePoem = async () => {
		try {
			await client.request(UPDATE_POEM_MUTATION, {
				_id: poemId,
				title,
			})
			setEditTitle(false)

			snackbarMessage('Saved', dispatch)
		} catch (err) {
			handleError(err, dispatch)
			history.push('/')
		}
	}

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
					<TextField
						placeholder="Title"
						label="Title"
						className={classes.editTitleField}
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Button onClick={() => handleUpdatePoem()}>Save</Button>
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
							<div>
								<Fields
									setSections={setSections}
									poemId={poemId}
									sections={sections}
								/>

								<Divider className={classes.divider} />

								<AddField
									sections={sections}
									poemId={poemId}
									addField={addField}
									setAddField={setAddField}
									setSections={setSections}
								/>
							</div> 
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

const styles = {
	root: {
		padding: '50px 0 0 0',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-start',
		boxSizing: 'border-box',
	},
	snackbarMessage: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	drawer: {
		width: '350px',
		padding: '35px',
		display: 'flex',
		flexDirection: 'column',
	},
	editTitleField: {
		fontSize: '24px',
	},
	textField: {
		margin: '0 15px 0 0',
	},
	deleteIcon: {
		color: 'red',
	},
	smallLink: {
		color: '#777',
		display: 'inline-block',
		marginRight: 10,
		textDecoration: 'underline',
		marginTop: 10,
		fontSize: 14,
		cursor: 'pointer',
		fontFamily: 'Roboto',
	},
	formControl: {
		width: '100%',
		marginTop: 15,
	},
	formItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	submitButton: {
		marginTop: 15,
	},
	divider: {
		margin: '15px 0',
	},
}

export default withStyles(styles)(EditPoem)
