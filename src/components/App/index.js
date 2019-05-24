import React, { Component } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import Radar from '../Radar'
import LoginCover from '../LoginCover'

const UI_STATE = gql`
  query {
    uiState @client {
      state
    }
  }
`

class App extends Component {
  componentDidMount() {
    const { match } = this.props
    if (match.params.key) {
      sessionStorage.setItem('key', match.params.key)
    }
  }

  render() {
    return (
      <div>
        <LoginCover />
        <Radar />
      </div>
    )
  }
}

export default App
