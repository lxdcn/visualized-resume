import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import queryString from 'query-string'

import { AUTH_SESSION_STORAGE_KEY } from '../../auth'
import Resume from '../Resume'
import LoginCover from '../LoginCover'
import LoadingCover from '../LoadingCover'
import { LAYERS } from '../../reducers/ui-state'
import { actions as uiStateActions } from '../../reducers/ui-state'


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

class App extends Component {
  componentDidMount() {
    const { location, sendRequest, showLoginDirectly } = this.props
    const queryParams = queryString.parse(location.search)

    if (queryParams.key) {
      sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, queryParams.key)
      sendRequest()
    } else {
      if (sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)) {
        sendRequest()
      } else {
        showLoginDirectly()
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { showLayer } = this.props
    if (showLayer === LAYERS.LOGIN && showLayer !== prevProps.showLayer) {
      window.history.pushState({}, document.title, "/")
    }
  }

  render() {
    const { showLayer, classes } = this.props
    return (
      <div className={classes.root}>
        {showLayer === LAYERS.LOGIN && <LoginCover />}
        {showLayer === LAYERS.LOADING && <LoadingCover />}
        <Resume />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  showLayer: state.uiState.showLayer
})

const mapDispatchToProps = {
  ...uiStateActions
}

export const StyledApp = withStyles(styles)(App)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledApp)
