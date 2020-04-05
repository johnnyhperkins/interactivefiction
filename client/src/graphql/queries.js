import gql from 'graphql-tag'

export const ME_QUERY = `
  query {
    me {
      name
      _id
      email
      picture
    }
  }
`

export const GET_POEMS_QUERY = gql`
  query {
    getPoems {
      _id
      title
      url
      published
      createdAt
      updatedAt
      likes
    }
  }
`

export const GET_FEED_QUERY = gql`
  query {
    getFeed {
      _id
      title
      url
      published
      createdAt
      likes
      author {
        _id
        name
        picture
      }
    }
  }
`

export const GET_FAVORITES_QUERY = gql`
  query {
    getFavorites {
      _id
      title
      url
      published
      createdAt
      likes
      author {
        _id
        name
        picture
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
      published
      createdAt
      likes
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
      published
      createdAt
      likes
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

// export const UPLOAD_TO_DRIVE_QUERY = `
//   query($_id: ID, $title: String, $payload: String) {
//     uploadToDrive(_id: $_id, title: $title, payload: $payload) {
//       title
//     }
//   }
// `
