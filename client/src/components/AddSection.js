import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import { ListItemIcon } from '@material-ui/core'

import { CREATE_STANZA_MUTATION } from '../graphql/mutations'
import { snackbarMessage } from '../utils/snackbarMessage'
import handleError from '../utils/handleError'
import Context from '../context'

const AddSection = ({
	classes,
	sections,
	setSections,
	poemId
}) => {
	const { dispatch } = useContext(Context)
	const [ stanzas, setStanzas ] = useState([])
	// will need to keep stanza data in local state til creating the section then assign them all ids once section is created
	const [ firstLine, setFirstLine ] = useState('')

	const handleCreateSection = createSection => {
		return async () => {
			const {
				data: { createSection: section },
				errors,
			} = await createSection({
				variables: {
					poem: poemId,
					firstLine,
					stanzas,
				},
			})

			if (errors) return handleError(errors, dispatch)

			setSections([ ...sections, section ])
			setFirstLine('')
			snackbarMessage('Section added', dispatch)
		}
	}
	return (
		<List>
			{!sections.length && (
				<ListItem>
					<ListItemText primary="Click the plus button to create a section." />
				</ListItem>
			)}
			<ListItem className={classes.addSection}>
				<div className={classes.centerVertical}>
					{/* <ListItemIcon
						className={classes.pointer}
						onClick={() => setAddSection(!addSection)}>
						<AddIcon />
					</ListItemIcon> */}
					{/* {addSection && ( */}
						<div>
							<TextField
								placeholder="First Line"
								label="First Line"
								className={`${classes.textField} ${classes.addSection}`}
								margin="none"
								value={firstLine}
								onChange={e => setFirstLine(e.target.value)}
							/>
							{/* <AddStanza sectionId={section.} /> */}
						</div>
					{/* )} */}
				</div>
				{/* {addSection && ( */}
					<Mutation mutation={CREATE_STANZA_MUTATION}>
						{createSection => (
							<Button onClick={handleCreateSection(createSection)}>
								Add Section
							</Button>
						)}
					</Mutation>
				{/* )} */}
			</ListItem>
		</List>
	)
}

const styles = {
	textField: {
		margin: '0 15px 0 0',
	},
	formControl: {
		width: '100%',
		marginTop: 15,
	},
	addSection: {
		width: 200,
		marginTop: 0,
	},
	addSection: {
		minHeight: 78,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	centerVertical: {
		display: 'flex',
		alignItems: 'center',
	},
	formItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}

export default withStyles(styles)(AddSection)
