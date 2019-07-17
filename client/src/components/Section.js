import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Stanza from './Stanza'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'

const SectionContainer = styled.div`
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #777;
`

const Section = ({ section, classes
	// provided 
}) => {

	return (
		<SectionContainer>
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
		// <Grid container justify="center"
		// 	{...provided.draggableProps}
		// 	{...provided.dragHandleProps}
		// 	ref={provided.innerRef}> 
		// 	{section.stanzas.map((stanza, idx) => {				
		// 	return (
		// 		<Grid item sm={4}>
		// 			<Stanza key={idx} stanza={stanza} />
		// 		</Grid>
		// 		)
		// 	})
		// })
		// </Grid>
	)
}

export default withStyles(styles)(Section)
