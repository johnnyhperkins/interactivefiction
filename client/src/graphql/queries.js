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
		}
	}
`

export const GET_POEM_QUERY = `
	query($_id: ID!) {
		getPoem(_id: $_id) {
			_id
			title
			url
			createdBy {
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
