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
		_id: ID!
		firstLine: String
		order: Int
		poem: Poem!
		stanzas: [Stanza!]
	}

	input SectionInput {
		firstLine: String!
		stanzas: [StanzaInput!]
		order: Int
	}

	type Stanza {
		body: String
		leadWord: String
	}

	input StanzaInput {
		body: String
		leadWord: String
	}

	type Query {
		me: User
		getPoems: [Poem!]!
		getPoem(_id: ID!): Poem!
		getSections(poemId: ID!): [Section!]!
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
		
		# createStanza(input: StanzaInput): Stanza
		# updateStanza(_id: ID!, input: StanzaInput): Stanza
		# deleteStanza(_id: ID!, sectionId: ID!): Section
	}
`
