import gql from 'graphql-tag'

export const ME_QUERY = `query{
  me {
    name
    _id
    email
    picture
  }
}`

export const GET_POEMS_QUERY = gql`
	query {
		getPoems {
			_id
			title
			url
			author {
				_id
				name
			}
			sections {
				_id
				firstLine
				stanzas {
					leadWord
					body
				}
			}
		}
	}
`

export const GET_POEM_QUERY = gql`
	query($_id: ID!) {
		getPoem(_id: $_id) {
			_id
			title
			url
			author {
				_id
				name
			}
			sections {
				_id
				firstLine
				stanzas {
					leadWord
					body
				}
			}
		}
	}
`

export const GET_POEM_QUERY_STRING = `
	query($_id: ID!) {
		getPoem(_id: $_id) {
			_id
			title
			url
			author {
				_id
				name
			}
			sections {
				_id
				firstLine
				stanzas {
					leadWord
					body
				}
			}
		}
	}
`

// export const GET_SECTION_QUERY = gql`
// 	query($_id: ID!) {
// 		getSection(_id: $_id) {
// 			firstLine
// 			stanzas {
// 				leadWord
// 				body
// 			}
// 		}
// 	}
// `

export const GET_STANZAS_QUERY = `
	query($sectionId: ID!) {
		getStanzas(sectionId: $sectionId) {
			stanzas {
				leadWord
				body
			}
		}
	}
`
