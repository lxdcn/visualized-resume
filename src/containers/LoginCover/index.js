import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import { actions as uiStateActions } from '../../reducers/ui-state'
import { validKey } from '../../auth'

const styles = {
  root: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  form: {
    width: '21em',
    maxWidth: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
  textField: {
    fontFamily: 'monospace',
  }
}

class LoginCover extends Component {
  keyTyped(value) {
    const { sendRequest } = this.props
    if (validKey(value)) {
      sendRequest()
    }
  }

  render() {
    const { classes, unauthorizedLoginCount } = this.props

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off" className={classes.form}>
          <FormControl fullWidth>
            {unauthorizedLoginCount > 0 &&
              <FormHelperText error={unauthorizedLoginCount > 0}>
                Invalid key
              </FormHelperText>}
            <TextField
              error={unauthorizedLoginCount > 0}
              className={classes.textField}
              placeholder="Please enter the key (hash in URL)"
              margin="normal"
              variant="outlined"
              autoFocus
              spellCheck={false}
              onChange={event => this.keyTyped(event.target.value)}
            />
          </FormControl>
        </form>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  unauthorizedLoginCount: state.uiState.unauthorizedLoginCount
})

const mapDispatchToProps = {
  ...uiStateActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginCover))
