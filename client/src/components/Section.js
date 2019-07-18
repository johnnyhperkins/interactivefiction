import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Stanza from './Stanza'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'
import {GET_POEM_QUERY} from '../graphql/queries'
import {UPDATE_SECTION_MUTATION} from '../graphql/mutations'

const SectionContainer = styled.div`
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #777;
`

const Section = ({ section, classes, provided, poemId }) => {
	// const renderFirstLine = bool => {
	// 	if (bool) {
	// 		return (
	// 			<div className={classes.editTitle}>
	// 				<Mutation
	// 					mutation={UPDATE_SECTION_MUTATION}
	// 					errorPolicy="all"
	// 					update={(cache, { data: { updateSection } }) => {
	// 						const { getPoem } = cache.readQuery({
	// 							query: GET_POEM_QUERY,
	// 							variables: { _id: poemId }
	// 						})

	// 						cache.writeQuery({
	// 							query: GET_POEM_QUERY,
	// 							data: { getPoem: getPoem.concat([ updatePoem ]) },
	// 						})
	// 					}}>
	// 					{updatePoem => (
	// 						<>
	// 						<TextField
	// 							placeholder="Title"
	// 							label="Title"
	// 							className={classes.editTitleField}
	// 							value={title}
	// 							onChange={e => setTitle(e.target.value)}
	// 						/>
	// 						<Button onClick={handleUpdatePoem(updatePoem)}>
	// 							Save
	// 						</Button>
	// 						</>
	// 					)}
	// 				</Mutation>
	// 			</div>
	// 		)
	// 	}
	// 	return (
	// 		<Typography variant="h4">
	// 			{title}
	// 			<EditIcon
	// 				onClick={() => {
	// 					setEditTitle(!editTitle)
	// 				}}
	// 			/>
	// 		</Typography>
	// 	)
	// }

	return (
		<SectionContainer
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}>
			<Grid container justify="center">
				<Grid item sm={12}>
					<Typography variant="body1" align='center' className={classes.marginBottom30}>{section.firstLine}</Typography>
				</Grid>
				{section.stanzas.map((stanza, idx) => {
					return (
						<Grid item sm={4} key={idx}>
							<Stanza stanza={stanza} />
						</Grid>
					)
				})
				}
			</Grid>
		</SectionContainer>
	)
}

export default withStyles(styles)(Section)
