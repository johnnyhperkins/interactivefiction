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
    published: Boolean
    createdAt: String
    updatedAt: String
    likes: [ID!]
  }

  type Section {
    _id: ID!
    firstLine: String
    order: Int
    poem: Poem!
    stanzas: [Stanza!]
  }

  input SectionInput {
    firstLine: String
    stanzas: [StanzaInput!]
    order: Int
  }

  type Stanza {
    body: String
    leadWord: String
  }

  input StanzaInput {
    leadWord: String
    body: String
  }

  input PoemInput {
    title: String
    published: Boolean
    sections: [ID!]
  }

  type Query {
    me: User
    getPoems: [Poem!]!
    getPoem(_id: ID!): Poem
    getSections(poemId: ID!): [Section!]!
    getFeed: [Poem!]!
    getFavorites: [Poem!]!
  }

  type AuthPayload {
    token: String
    user: User
  }


  type Mutation {
    createPoem(title: String!): Poem
    updatePoem(_id: ID!, input: PoemInput): Poem
    deletePoem(_id: ID!): Poem

    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    
    createSection(poemId: ID!, input: SectionInput): Section
    updateSection(_id: ID!, input: SectionInput): Section
    deleteSection(_id: ID!, poemId: ID!): Poem

    updateUser(name: String, email: String): User
    toggleLike(poemId: ID!): Poem
  }
`
