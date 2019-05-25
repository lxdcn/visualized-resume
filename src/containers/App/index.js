import React, { Component } from 'react'
import { connect } from 'react-redux'

import SkillSetRadar from '../SkillSetRadar'


class App extends Component {
  componentWillMount() {
    const { match } = this.props
    if (match.params.key) {
      sessionStorage.setItem('key', match.params.key)
    }
  }

  render() {
    const { showLayer } = this.props
    return (
      <div>
        {showLayer}
        <SkillSetRadar />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  showLayer: state.uiState.showLayer
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
