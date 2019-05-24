import React, { Component } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const UI_STATE = gql`
  query {
    uiState @client {
      state
    }
  }
`

class LoginCover extends Component {
  render() {
    return (
      <Query query={UI_STATE}>
        {({ data, client }) => {
          console.log('LoginCover Query rendering')
          setTimeout( () => client.writeData({ data: { uiState: {__typename: 'UiState',state: 'XXX',skipQueries: true,} } }), 4000)
          return (
            <div>
              {data.uiState.state}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LoginCover
