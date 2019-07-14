import React, { useState, useEffect, useContext } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { GET_POEM_QUERY } from '../graphql/queries'
import Context from '../context'
import { useClient } from '../client'

import handleError from '../utils/handleError'
import Link from '../components/misc/Link'
import { snackbarMessage } from '../utils/snackbarMessage'

const DisplayPoem = ({ classes, match, history }) => {
	const { state: { currentUser }, dispatch } = useContext(Context)
	const [ poem, setPoem ] = useState({
		title: '',
		author: '',
	})
	const [ sections, setSections ] = useState([])
	const [ stanzas, setStanzas ] = useState([])

	const { poem_id: poemId } = match.params

	const client = useClient()

	useEffect(() => {
		getPoem()
	}, [])

	const getPoem = async () => {
		try {
			const {
				getPoem: { title, sections, author: { _id, name } },
			} = await client.request(GET_POEM_QUERY, {
				_id: poemId,
			})

			setPoem({
				title,
				author: name,
				authorId: _id
			})
			setSections(sections)
		} catch (err) {
			handleError(err, dispatch)
			history.push('/')
		}
	}

	const renderSection = section => {
		const { stanzas, firstLine, _id } = section
		return (
			<Grid container>
				<Typography variant="h4">{firstLine}</Typography>
			</Grid>
		)
			
	}

	return (
		poem && (
			<div className={classes.root}>
				<Grid container justify="center">
					<Grid item sm={6} className={classes.flexColumn}>
						<Typography variant="h4">{poem.title}</Typography>
						{currentUser &&
						currentUser._id === poem.authorId && (
							<div>
								<Link to={`/poem/${poemId}`} small="true">
									Edit Poem
								</Link>
							</div>
						)}
						<Divider className={classes.divider} />
						<div>
							{sections.map((section, key) => {
								return (
									<div key={key} className={classes.poemItem}>
										{renderSection(section)}
									</div>
								)
							})}
						</div>
					</Grid>
				</Grid>
			</div>
		)
	)
}

const styles = {
	root: {
		padding: '50px 0 0 0',
	},
	flexColumn: {
		display: 'flex',
		flexDirection: 'column',
	},
	snackbarMessage: {
		textTranspoem: 'uppercase',
		fontWeight: 'bold',
	},
	textField: {
		margin: '0 15px 0 0',
	},
	poemItem: {
		marginBottom: 15,
	},
	submitButton: {
		marginTop: 15,
	},
	divider: {
		margin: '15px 0',
	},
}

export default withStyles(styles)(DisplayPoem)
