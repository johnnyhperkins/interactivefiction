import React from 'react'

import Stanza from './Stanza'

import Grid from '@material-ui/core/Grid'

const Section = ({ section, 
	// provided 
}) => {

	return (
		<Grid container justify="center">
		{section.stanzas.map((stanza, idx) => {				
			return (
				<Grid item sm={4}>
					<Stanza key={idx} stanza={stanza} />
				</Grid>
				)
			})
		}
		</Grid>
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

export default Section
