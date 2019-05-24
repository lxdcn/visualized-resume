import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UI_STATE = gql`
  query {
    uiState @client {
      state
    }
  }
`

const UPDATE_STATE = gql`
  mutation UpdateState($state: String!) {
    updateState(state: $state) @client
  }
`

class LoginCover extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_STATE} refetchQueries={[{ query: gql` query { allBlips { quadrant name score desc } } ` }]}>
        {(updateState, { data, client }) => {
          console.log('LoginCover Query rendering')
          return (
            <button onClick={() => {
                updateState({ variables: { state: 'SOME_LOADING_COMPLETED' } })
            }}>
              hehe
            </button>
          )
        }}
      </Mutation>
    )
  }
}

export default LoginCover
