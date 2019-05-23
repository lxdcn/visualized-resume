import React, { Component } from 'react'

import Radar from '../Radar'

class App extends Component {
  componentDidMount() {
    const { match } = this.props
    if (match.params.key) {
      sessionStorage.setItem('key', match.params.key)
    }
  }

  render() {
    return (
      <Radar />
    )
  }
}

export default App
