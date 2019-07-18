import gql from 'graphql-tag'

// Auth

export const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			user {
				_id
				name
				email
			}
			token
		}
	}
`

export const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				_id
				name
				email
			}
			token
		}
	}
`

// Poem

export const CREATE_POEM_MUTATION = gql`
	mutation($title: String!) {
		createPoem(title: $title) {
			_id
			url
			author {
				_id
			}
			title
			sections {
				_id
			}
		}
	}
`

export const UPDATE_POEM_MUTATION = gql`
	mutation($_id: ID!, $title: String, $sections: [ID!]) {
		updatePoem(_id: $_id, input: { title: $title, sections: $sections }) {
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

// export const UPDATE_SECTION_ORDER_MUTATION = `
// 	mutation($poemId: ID!, $sections: [ID!]) {
// 		updateSectionOrder(poemId: $poemId, sections: $sections) {
// 			_id
// 		}
// 	}
// `

export const UPDATE_POEM_MUTATION_STRING = `
mutation($_id: ID!, $title: String, $sections: [ID!]) {
	updatePoem(_id: $_id, input: {title: $title, sections: $sections}) {
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
			order
			stanzas {
				leadWord
				body
			}
		}
	}
}
`

export const DELETE_POEM_MUTATION = gql`
	mutation($_id: ID!) {
		deletePoem(_id: $_id) {
			_id
		}
	}
`
// Section

export const CREATE_SECTION_MUTATION = `
	mutation($poemId: ID!, $firstLine: String, $order: Int, $stanzas: [StanzaInput!]) {
		createSection(poemId: $poemId, input: { firstLine: $firstLine, order: $order, stanzas: $stanzas }) {
			_id
			firstLine
			order
			poem {
				_id
			}
		}
	}
`

export const UPDATE_SECTION_MUTATION = gql`
	mutation($_id: ID!, $firstLine: String, $order: Int, $stanzas: [StanzaInput!]) {
		updateSection(_id: $_id, input: { 
			firstLine: $firstLine, 
			order: $order,
			stanzas: $stanzas }) {
			_id
			firstLine
			stanzas {
				leadWord
				body
			}
			order
		}
	}
`

export const DELETE_SECTION_MUTATION = gql`
	mutation($_id: ID!, $poemId: ID!) {
		deleteSection(_id: $_id, poemId: $poemId) {
			_id
		}
	}
`

// Stanza

// export const CREATE_STANZA_MUTATION = gql`
// 	mutation($poem: ID!, $section: ID!, $leadWord: String, $body: String) {
// 		createStanza(input: { poem: $poem, section: $section, leadWord: $leadWord, body: $body }) {
// 			_id
// 			leadWord
// 			body
// 			section {
// 				_id
// 			}
// 		}
// 	}
// `

// export const UPDATE_STANZA_MUTATION = `
// 	mutation($_id: ID!, $leadWord: String, $body: String, ) {
// 		updateStanza(_id: $_id, input: { leadWord: $leadWord, body: $body }) {
// 			leadWord
// 			body
// 		}
// 	}
// `

// export const DELETE_STANZA_MUTATION = `
// 	mutation($_id: ID!, $sectionId: ID!) {
// 		deleteStanza(_id: $_id, sectionId: $sectionId) {
// 			_id
// 		}
// 	}
// `
