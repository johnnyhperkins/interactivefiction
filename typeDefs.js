const { gql } = require('apollo-server')

module.exports = gql`
	type User {
		_id: ID
		name: String
		email: String
		picture: String
	}

	type Poem {
		_id: ID!
		createdBy: User!
		title: String!
		url: String
		sections: [Section!]
	}

	type Stanza {
		_id: ID!
		body: String
		leadWord: String
		section: Section!
	}

	type Section {
		firstLine: String
		order: Number
		poem: Poem!
		stanzas: [Stanza!]!
	}

	input SectionInput {
		poem: ID!
		firstLine: String!
		order: Number
	}

	input StanzaInput {
		section: ID!
		leadWord: String!
		body: String
	}

	type Query {
		me: User
		getPoems: [Poem!]!
		getPoem(_id: ID!): Poem!
	}

	type AuthPayload {
		token: String
		user: User
	}

	type Mutation {
		createPoem(title: String!): Poem
		updatePoem(_id: ID!, title: String): Poem
		deletePoem(_id: ID!): Poem

		signup(email: String!, password: String!, name: String!): AuthPayload
		login(email: String!, password: String!): AuthPayload
		
		createSection(poemId: ID!, input: SectionInput): Section
		updateSection(_id: ID!, input: SectionInput): Section
		deleteSection(_id: ID!): Poem
		
		createStanza(stanzaId: ID!, input: StanzaInput): Stanza
		updateStanza(_id: ID!, input: StanzaInput): Stanza
		deleteStanza(_id: ID!): Section
	}
`
