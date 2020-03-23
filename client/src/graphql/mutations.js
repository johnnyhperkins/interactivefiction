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

// User

export const UPDATE_USER_MUTATION = gql`
  mutation updateUserMutation($name: String, $email: String) {
    updateUser(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`

// Likes

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLikeMutation($poemId: ID!) {
    toggleLike(poemId: $poemId) {
      _id
      likes
    }
  }
`

// Poem

export const CREATE_POEM_MUTATION = gql`
  mutation($title: String!) {
    createPoem(title: $title) {
      _id
      url
      published
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

// the rule is: the mutation takes in variables normally, and the graphql resolver
// (i.e. updatePoem) parses the variables accordingly
export const UPDATE_POEM_MUTATION = gql`
  mutation($_id: ID!, $title: String, $published: Boolean $sections: [ID!]) {
    updatePoem(_id: $_id, input: { title: $title, published: $published, sections: $sections }) {
      _id
      title
      published
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

export const UPDATE_POEM_MUTATION_STRING = `
mutation($_id: ID!, $title: String, $published: Boolean $sections: [ID!]) {
  updatePoem(_id: $_id, input: { title: $title, published: $published, sections: $sections }) {
    _id
    title
    url
    published
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

export const CREATE_SECTION_MUTATION = gql`
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

export const UPDATE_STANZA_MUTATION = `
  mutation($sectionId: ID!, $stanzas: [StanzaInput!]) {
    updateSection(_id: $sectionId, input: {
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
