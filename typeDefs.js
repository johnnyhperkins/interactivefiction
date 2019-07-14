const { gql } = require('apollo-server')

module.exports = gql`
	type User {
		_id: ID
		email: String
		name: String
		picture: String
	}

	type Poem {
		_id: ID!
		author: User!
		sections: [Section!]
		title: String!
		url: String
	}
	
	type Section {
		firstLine: String
		order: Int
		poem: Poem!
		stanzas: [Stanza!]
	}

	type Stanza {
		_id: ID!
		body: String
		leadWord: String
		section: Section!
		poem: Poem!
	}

	input SectionInput {
		poem: ID!
		firstLine: String!
		order: Int
	}

	input StanzaInput {
		section: ID!
		poem: ID!
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
		deleteSection(_id: ID!, poemId: ID!): Poem
		
		createStanza(input: StanzaInput): Stanza
		updateStanza(_id: ID!, input: StanzaInput): Stanza
		deleteStanza(_id: ID!, sectionId: ID!): Section
	}
`
