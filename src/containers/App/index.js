import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import Resume from '../Resume'
import LoginCover from '../LoginCover'
import { LAYERS } from '../../reducers/ui-state'


const styles = {
}

class App extends Component {
  componentWillMount() {
    const { match } = this.props
    if (match.params.key) {
      sessionStorage.setItem('key', match.params.key)
    }
  }

  render() {
    const { showLayer, classes } = this.props
    return (
      <div className={classes.root}>
        {showLayer === LAYERS.LOGIN && <LoginCover />}
        <Resume />
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
)(withStyles(styles)(App))
